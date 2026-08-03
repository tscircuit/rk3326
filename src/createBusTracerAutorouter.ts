import {
  BusTracer,
  type BusTracerSimpleRouteJson,
  type SimplifiedPcbTrace,
} from "@tscircuit/bus-tracer"

type AutorouterEventMap = {
  complete: {
    type: "complete"
    traces: SimplifiedPcbTrace[]
  }
  error: {
    type: "error"
    error: Error
  }
  progress: {
    type: "progress"
    steps: number
    progress: number
    phase: string
  }
}

type AutorouterEventName = keyof AutorouterEventMap

const busTracerOptions = {
  traceClearance: 0.075,
  obstacleMargin: 0.075,
} as const

const completedFanoutRegions = [
  {
    obstacleId: "U1",
    center: { x: 0, y: 0 },
    fanoutWidth: 15.3,
    fanoutHeight: 15.3,
    keepoutWidth: 14.8,
    keepoutHeight: 14.8,
  },
  {
    obstacleId: "U2",
    center: { x: 17, y: -4 },
    fanoutWidth: 12,
    fanoutHeight: 12,
    keepoutWidth: 8,
    keepoutHeight: 8,
  },
  {
    obstacleId: "J1",
    center: { x: 0, y: -20 },
    fanoutWidth: 9.999984,
    fanoutHeight: 6.1500298,
    keepoutWidth: 5,
    keepoutHeight: 5,
  },
  {
    obstacleId: "J2",
    center: { x: 0, y: 15.5 },
    fanoutWidth: 16.899894,
    fanoutHeight: 6.0998267,
    keepoutWidth: 14.5,
    keepoutHeight: 4.5,
  },
] as const

const getLayerNames = (layerCount: number) => [
  "top",
  ...Array.from(
    { length: Math.max(0, layerCount - 2) },
    (_, index) => `inner${index + 1}`,
  ),
  ...(layerCount > 1 ? ["bottom"] : []),
]

const prepareBusTracerInput = (
  simpleRouteJson: BusTracerSimpleRouteJson,
): BusTracerSimpleRouteJson => {
  const obstacleIsInsideCompletedFanout = (
    obstacle: BusTracerSimpleRouteJson["obstacles"][number],
  ) =>
    completedFanoutRegions.some(
      (region) =>
        Math.abs(obstacle.center.x - region.center.x) <=
          region.fanoutWidth / 2 + 1e-6 &&
        Math.abs(obstacle.center.y - region.center.y) <=
          region.fanoutHeight / 2 + 1e-6,
    )
  const externalObstacles = simpleRouteJson.obstacles.filter(
    (obstacle) => !obstacleIsInsideCompletedFanout(obstacle),
  )
  const layers = getLayerNames(simpleRouteJson.layerCount)
  const componentKeepouts: BusTracerSimpleRouteJson["obstacles"] =
    completedFanoutRegions.map((region) => ({
      type: "rect",
      obstacleId: `bus-tracer:${region.obstacleId}`,
      center: region.center,
      width: region.keepoutWidth,
      height: region.keepoutHeight,
      layers,
      connectedTo: [],
    }))
  const terminalObstacles: BusTracerSimpleRouteJson["obstacles"] =
    simpleRouteJson.connections.flatMap((connection) =>
      connection.pointsToConnect.map((point, pointIndex) => ({
        type: "rect",
        obstacleId: `bus-tracer:${connection.name}:${pointIndex}`,
        center: { x: point.x, y: point.y },
        width: 0.15,
        height: 0.15,
        layers: ["layer" in point ? point.layer : point.layers[0]!],
        connectedTo: [connection.name, point.pointId, point.pcb_port_id].filter(
          (id): id is string => Boolean(id),
        ),
      })),
    )

  return {
    ...simpleRouteJson,
    obstacles: [
      ...externalObstacles,
      ...componentKeepouts,
      ...terminalObstacles,
    ],
  }
}

/** Adapts BusTracer to the local autorouter API after completed fanout handoff. */
export const createRk3326BusTracerAutorouter = async (
  simpleRouteJson: BusTracerSimpleRouteJson,
) => {
  const listeners: {
    [EventName in AutorouterEventName]: Array<
      (event: AutorouterEventMap[EventName]) => void
    >
  } = {
    complete: [],
    error: [],
    progress: [],
  }

  const emit = <EventName extends AutorouterEventName>(
    eventName: EventName,
    event: AutorouterEventMap[EventName],
  ) => {
    for (const listener of listeners[eventName]) listener(event)
  }

  let stopped = false

  return {
    on<EventName extends AutorouterEventName>(
      eventName: EventName,
      listener: (event: AutorouterEventMap[EventName]) => void,
    ) {
      listeners[eventName].push(listener)
    },
    start() {
      if (stopped) return
      try {
        const solver = new BusTracer({
          simpleRouteJson: prepareBusTracerInput(simpleRouteJson),
          options: busTracerOptions,
        })
        solver.solve()
        if (!solver.solved || solver.failed) {
          throw new Error(solver.error ?? "BusTracer failed to route the bus")
        }
        emit("progress", {
          type: "progress",
          steps: 1,
          progress: 1,
          phase: "complete",
        })
        emit("complete", {
          type: "complete",
          traces: solver.getOutput().traces.map((trace) => ({
            ...trace,
            pcb_trace_id: `pcb_trace_bus_tracer_${trace.connection_name}`,
          })),
        })
      } catch (error) {
        emit("error", {
          type: "error",
          error: error instanceof Error ? error : new Error(String(error)),
        })
      }
    },
    stop() {
      stopped = true
    },
  }
}
