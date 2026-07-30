import type { BreakoutProps } from "@tscircuit/props"
import { Fragment } from "react"
import {
  RK3326,
  RK3326_BALLS,
  RK3326_PACKAGE,
  RK3326_PIN_FUNCTIONS,
} from "./RK3326"

export const RK3326_BREAKOUT_GEOMETRY = {
  sizeMm: 36,
  paddingMm: 11,
  boundaryPointInsetMm: 0.0001,
  usableHalfSpanMm: 17,
} as const

/**
 * Preliminary HDI rules for escaping the 0.65 mm-pitch BGA.
 *
 * These are routing constraints, not a claim that every board house supports
 * the resulting stackup. Confirm the microvia structure and annular-ring rules
 * with the selected fabricator before production.
 */
export const RK3326_BREAKOUT_RULES = {
  defaultTraceWidth: 0.09,
  minTraceWidth: 0.09,
  minTraceToPadEdgeClearance: 0.075,
  minViaPadDiameter: 0.25,
  minViaHoleDiameter: 0.1,
  minViaEdgeToPadEdgeClearance: 0.075,
  minViaHoleEdgeToViaHoleEdgeClearance: 0.1,
} as const

export const RK3326_FANOUT_BUS_IDS = [
  "ddr-data",
  "ddr-command-address",
  "emmc",
  "sdmmc0",
  "sdmmc1",
  "usb-otg",
  "mipi-dsi",
  "mipi-csi",
] as const

export type RK3326FanoutBusId = (typeof RK3326_FANOUT_BUS_IDS)[number]
export type RK3326FanoutSide = "top" | "right" | "bottom" | "left"
export type RK3326FanoutDirection = "left" | "right" | "up" | "down"
export type RK3326SignalFanoutLayer =
  | "top"
  | "inner3"
  | "inner4"
  | "inner5"
  | "inner6"
  | "inner7"
  | "inner8"
  | "bottom"

export const RK3326_GROUND_PLANE_LAYER = "inner1" as const
export const RK3326_POWER_PLANE_LAYER = "inner2" as const
export const RK3326_DEFAULT_SIGNAL_FANOUT_LAYERS = [
  "top",
  "inner3",
  "inner4",
  "bottom",
] as const satisfies readonly RK3326SignalFanoutLayer[]

/**
 * The interfaces routed by the default, buildable first fanout stage.
 * DDR is mapped and available as an opt-in follow-on stage.
 */
export const RK3326_INITIAL_FANOUT_BUS_IDS = [
  "emmc",
  "usb-otg",
  "mipi-dsi",
] as const satisfies readonly RK3326FanoutBusId[]

export interface RK3326FanoutBus {
  id: RK3326FanoutBusId
  label: string
  side: RK3326FanoutSide
  balls: readonly string[]
}

const getBallFunctions = (ball: string) =>
  RK3326_PIN_FUNCTIONS[ball].split("/").filter(Boolean)

const getBallsMatching = (pattern: RegExp) =>
  RK3326_BALLS.filter((ball) =>
    getBallFunctions(ball).some((pinFunction) => pattern.test(pinFunction)),
  )

const getMatchingFunction = (ball: string, pattern: RegExp) =>
  getBallFunctions(ball).find((pinFunction) => pattern.test(pinFunction)) ??
  ball

const sortByMatchingFunction = (balls: readonly string[], pattern: RegExp) =>
  [...balls].sort((ballA, ballB) =>
    getMatchingFunction(ballA, pattern).localeCompare(
      getMatchingFunction(ballB, pattern),
      undefined,
      { numeric: true },
    ),
  )

const ddrDataPattern = /^DDR_(?:DQ\d+|DQS\d+_[NP]|DM\d+|D_[Mm]\d+)$/
const ddrCommandAddressPattern = /^DDR(?:3|4)_/
const emmcPattern = /^EMMC_/
const sdmmc0Pattern = /^SDMMC0_/
const sdmmc1Pattern = /^SDMMC1_/
const usbOtgPattern = /^(?:USB_OTG_D[PM]|USB_ID|USB_VBUS)$/
const mipiDsiPattern = /^MIPI_TX_(?:D[0-3][PN]|CLK[PN])$/
const mipiCsiPattern = /^MIPI_CSI_(?:D[PN][0-3]|CLK[PN])$/

const busFunctionPatterns: Record<RK3326FanoutBusId, RegExp> = {
  "ddr-data": ddrDataPattern,
  "ddr-command-address": ddrCommandAddressPattern,
  emmc: emmcPattern,
  sdmmc0: sdmmc0Pattern,
  sdmmc1: sdmmc1Pattern,
  "usb-otg": usbOtgPattern,
  "mipi-dsi": mipiDsiPattern,
  "mipi-csi": mipiCsiPattern,
}

export const RK3326_FANOUT_BUSES: readonly RK3326FanoutBus[] = [
  {
    id: "ddr-data",
    label: "DDR data, masks, and strobes",
    side: "left",
    balls: sortByMatchingFunction(
      getBallsMatching(ddrDataPattern),
      ddrDataPattern,
    ),
  },
  {
    id: "ddr-command-address",
    label: "DDR command, address, and clock",
    side: "top",
    balls: sortByMatchingFunction(
      getBallsMatching(ddrCommandAddressPattern),
      ddrCommandAddressPattern,
    ),
  },
  {
    id: "emmc",
    label: "eMMC",
    side: "right",
    balls: sortByMatchingFunction(getBallsMatching(emmcPattern), emmcPattern),
  },
  {
    id: "sdmmc0",
    label: "SDMMC0",
    side: "right",
    balls: sortByMatchingFunction(
      getBallsMatching(sdmmc0Pattern),
      sdmmc0Pattern,
    ),
  },
  {
    id: "sdmmc1",
    label: "SDMMC1",
    side: "right",
    balls: sortByMatchingFunction(
      getBallsMatching(sdmmc1Pattern),
      sdmmc1Pattern,
    ),
  },
  {
    id: "usb-otg",
    label: "USB OTG",
    side: "right",
    balls: sortByMatchingFunction(
      getBallsMatching(usbOtgPattern),
      usbOtgPattern,
    ),
  },
  {
    id: "mipi-dsi",
    label: "MIPI DSI / LVDS transmit",
    side: "top",
    balls: sortByMatchingFunction(
      getBallsMatching(mipiDsiPattern),
      mipiDsiPattern,
    ),
  },
  {
    id: "mipi-csi",
    label: "MIPI CSI receive",
    side: "right",
    balls: sortByMatchingFunction(
      getBallsMatching(mipiCsiPattern),
      mipiCsiPattern,
    ),
  },
]

export interface RK3326FanoutBreakoutPoint {
  ball: string
  busId: RK3326FanoutBusId
  endpointName: string
  netName: string
  traceName: string
  side: RK3326FanoutSide
  pcbX: number
  pcbY: number
}

export interface RK3326PlaneFanoutConnection {
  ball: string
  category: "ground" | "power"
  pinFunction: string
  netName: string
  traceName: string
  layer: typeof RK3326_GROUND_PLANE_LAYER | typeof RK3326_POWER_PLANE_LAYER
  direction: RK3326FanoutDirection
}

const getBreakoutNetName = (busId: RK3326FanoutBusId, ball: string) => {
  const pinFunction = getMatchingFunction(ball, busFunctionPatterns[busId])
  const normalizedFunction = pinFunction
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toUpperCase()

  return `RK3326_${normalizedFunction}`
}

const getPointPosition = (
  side: RK3326FanoutSide,
  index: number,
  pointCount: number,
) => {
  const { sizeMm, boundaryPointInsetMm, usableHalfSpanMm } =
    RK3326_BREAKOUT_GEOMETRY
  const boundaryCoordinate = sizeMm / 2 - boundaryPointInsetMm
  const alongEdge =
    pointCount === 1
      ? 0
      : -usableHalfSpanMm + (index * usableHalfSpanMm * 2) / (pointCount - 1)

  switch (side) {
    case "top":
      return { pcbX: alongEdge, pcbY: boundaryCoordinate }
    case "right":
      return { pcbX: boundaryCoordinate, pcbY: -alongEdge }
    case "bottom":
      return { pcbX: alongEdge, pcbY: -boundaryCoordinate }
    case "left":
      return { pcbX: -boundaryCoordinate, pcbY: -alongEdge }
  }
}

export const getRK3326FanoutBreakoutPoints = (
  selectedBusIds: readonly RK3326FanoutBusId[] = RK3326_FANOUT_BUS_IDS,
): RK3326FanoutBreakoutPoint[] => {
  const selectedBusIdSet = new Set(selectedBusIds)
  const selectedBuses = RK3326_FANOUT_BUSES.filter((bus) =>
    selectedBusIdSet.has(bus.id),
  )
  const breakoutPoints: RK3326FanoutBreakoutPoint[] = []

  for (const side of ["top", "right", "bottom", "left"] as const) {
    const sidePoints = selectedBuses
      .filter((bus) => bus.side === side)
      .flatMap((bus) =>
        bus.balls.map((ball, signalIndex) => ({
          ball,
          busId: bus.id,
          signalIndex,
          side,
        })),
      )

    for (const [index, point] of sidePoints.entries()) {
      const normalizedBusId = point.busId.replace(/-/g, "_").toUpperCase()

      breakoutPoints.push({
        ball: point.ball,
        busId: point.busId,
        endpointName: `FANOUT_${point.ball}`,
        netName: getBreakoutNetName(point.busId, point.ball),
        traceName: `BUS_${normalizedBusId}_${String(
          point.signalIndex + 1,
        ).padStart(2, "0")}`,
        side: point.side,
        ...getPointPosition(side, index, sidePoints.length),
      })
    }
  }

  return breakoutPoints
}

const groundPinFunctionPattern = /^(?:VSS_\d+|AVSS|TVSS)$/
const powerPinFunctionPattern = /(?:VDD|VCC|AVDD)|^PMUIO\d+$/

const getSupplyPin = (ball: string) => {
  const pinFunction = getBallFunctions(ball).find(
    (candidate) =>
      groundPinFunctionPattern.test(candidate) ||
      powerPinFunctionPattern.test(candidate),
  )
  if (!pinFunction) return null

  const category = groundPinFunctionPattern.test(pinFunction)
    ? ("ground" as const)
    : ("power" as const)
  const netName =
    category === "ground"
      ? "GND"
      : pinFunction.replace(/^(CPU_VDD|LOGIC_VDD|DDRIO_VDD)_\d+$/, "$1")

  return { ball, category, pinFunction, netName }
}

const getBallGridPosition = (ball: string) => {
  const match = ball.match(/^([A-Z]+)(\d+)$/)
  if (!match) throw new Error(`Invalid RK3326 ball name: ${ball}`)

  const row = RK3326_PACKAGE.rowNames.indexOf(
    match[1] as (typeof RK3326_PACKAGE.rowNames)[number],
  )
  if (row < 0) throw new Error(`Unknown RK3326 ball row: ${match[1]}`)

  return { row, column: Number(match[2]) - 1 }
}

const getViaCornerKey = (
  ball: string,
  direction: RK3326FanoutDirection,
  handedness: -1 | 1,
) => {
  const { row, column } = getBallGridPosition(ball)
  const x2 = column * 2
  const y2 = row * 2

  switch (direction) {
    case "left":
      return `${x2 - 1}:${y2 - handedness}`
    case "right":
      return `${x2 + 1}:${y2 - handedness}`
    case "up":
      return `${x2 + handedness}:${y2 - 1}`
    case "down":
      return `${x2 + handedness}:${y2 + 1}`
  }
}

const sideToDirection: Record<RK3326FanoutSide, RK3326FanoutDirection> = {
  top: "up",
  right: "right",
  bottom: "down",
  left: "left",
}

const directionToAnchor = {
  left: "center_left",
  right: "center_right",
  up: "top_center",
  down: "bottom_center",
} as const satisfies Record<RK3326FanoutDirection, string>

const allocatePlaneFanoutDirections = (
  planeBalls: readonly string[],
  selectedSignalBusIds: readonly RK3326FanoutBusId[],
): ReadonlyMap<string, RK3326FanoutDirection> => {
  const planeBallSet = new Set(planeBalls)
  const selectedSignalBusIdSet = new Set(selectedSignalBusIds)
  // The solver attempts positive handedness first for each signal bus. Reserve
  // those preferred interstices while leaving enough alternatives for the
  // dense DDR and supply populations to coexist.
  const reservedSignalCorners = new Set(
    RK3326_FANOUT_BUSES.filter((bus) =>
      selectedSignalBusIdSet.has(bus.id),
    ).flatMap((bus) =>
      bus.balls.map((ball) =>
        getViaCornerKey(ball, sideToDirection[bus.side], 1),
      ),
    ),
  )
  const cornerOwner = new Map<string, string>()
  const directionByBall = new Map<string, RK3326FanoutDirection>()

  const tryAssign = (ball: string, visited: Set<string>): boolean => {
    if (visited.has(ball)) return false
    visited.add(ball)

    const { row, column } = getBallGridPosition(ball)
    const directionOrder = [
      "right",
      "down",
      "left",
      "up",
    ] as const satisfies readonly RK3326FanoutDirection[]
    const offset = (column * 3 + row) % directionOrder.length
    const candidates = directionOrder
      .map(
        (_, index) => directionOrder[(index + offset) % directionOrder.length]!,
      )
      .filter(
        (direction) =>
          !reservedSignalCorners.has(getViaCornerKey(ball, direction, 1)),
      )

    for (const direction of candidates) {
      const cornerKey = getViaCornerKey(ball, direction, 1)
      const currentOwner = cornerOwner.get(cornerKey)
      if (
        currentOwner === undefined ||
        (planeBallSet.has(currentOwner) && tryAssign(currentOwner, visited))
      ) {
        cornerOwner.set(cornerKey, ball)
        directionByBall.set(ball, direction)
        return true
      }
    }

    return false
  }

  for (const ball of planeBalls) {
    if (!tryAssign(ball, new Set())) {
      throw new Error(
        `RK3326 could not allocate a unique plane escape via for ${ball}`,
      )
    }
  }

  return directionByBall
}

export const RK3326_SUPPLY_PINS = RK3326_BALLS.flatMap((ball) => {
  const supplyPin = getSupplyPin(ball)
  return supplyPin ? [supplyPin] : []
})

export const RK3326_POWER_RAIL_NETS = Array.from(
  new Set(
    RK3326_SUPPLY_PINS.filter(({ category }) => category === "power").map(
      ({ netName }) => netName,
    ),
  ),
)

export const getRK3326PlaneFanoutConnections = (
  selectedSignalBusIds: readonly RK3326FanoutBusId[] = RK3326_INITIAL_FANOUT_BUS_IDS,
): readonly RK3326PlaneFanoutConnection[] => {
  const planeFanoutDirectionByBall = allocatePlaneFanoutDirections(
    RK3326_SUPPLY_PINS.map((pin) => pin.ball),
    selectedSignalBusIds,
  )

  return RK3326_SUPPLY_PINS.map(({ ball, category, pinFunction, netName }) => ({
    ball,
    category,
    pinFunction,
    netName,
    traceName: `PLANE_TRACE_${ball}`,
    layer:
      category === "ground"
        ? RK3326_GROUND_PLANE_LAYER
        : RK3326_POWER_PLANE_LAYER,
    direction: planeFanoutDirectionByBall.get(ball)!,
  }))
}

export const RK3326_PLANE_FANOUT_CONNECTIONS = getRK3326PlaneFanoutConnections()

type FixedBreakoutProps =
  | "children"
  | "autorouter"
  | "width"
  | "height"
  | "pcbWidth"
  | "pcbHeight"
  | "padding"
  | "paddingLeft"
  | "paddingRight"
  | "paddingTop"
  | "paddingBottom"
  | keyof typeof RK3326_BREAKOUT_RULES

export interface RK3326BreakoutProps extends Omit<
  BreakoutProps,
  FixedBreakoutProps
> {
  chipName?: string
  buses?: readonly RK3326FanoutBusId[]
  signalFanoutLayers?: readonly RK3326SignalFanoutLayer[]
}

/**
 * Initial RK3326 bus fanout.
 *
 * The breakout points are stable physical handoff locations for downstream
 * signal routing. Every ground ball drops to inner1 and every power ball drops
 * to its named rail on inner2. Signals are restricted to the remaining
 * configured fanout layers.
 */
export const RK3326Breakout = ({
  chipName = "U1",
  buses = RK3326_INITIAL_FANOUT_BUS_IDS,
  signalFanoutLayers = RK3326_DEFAULT_SIGNAL_FANOUT_LAYERS,
  name = "RK3326_BREAKOUT",
  ...props
}: RK3326BreakoutProps) => {
  const breakoutPoints = getRK3326FanoutBreakoutPoints(buses)
  const planeFanoutConnections = getRK3326PlaneFanoutConnections(buses)
  const selectedSignalBuses = RK3326_FANOUT_BUSES.filter((bus) =>
    buses.includes(bus.id),
  )
  const busFanoutDirections = Object.fromEntries([
    ...selectedSignalBuses.map(
      (bus) => [bus.id, directionToAnchor[sideToDirection[bus.side]]] as const,
    ),
    ...planeFanoutConnections.map(
      (connection) =>
        [
          connection.traceName,
          directionToAnchor[connection.direction],
        ] as const,
    ),
  ])
  const { sizeMm, paddingMm } = RK3326_BREAKOUT_GEOMETRY
  const breakoutEndpointFootprint = (
    <footprint name="RK3326_FANOUT_ENDPOINT">
      <smtpad
        name="1"
        shape="circle"
        radius={RK3326_BREAKOUT_RULES.minViaPadDiameter / 2}
        portHints={["1"]}
      />
    </footprint>
  )

  return (
    <breakout
      {...props}
      name={name}
      width={sizeMm}
      height={sizeMm}
      padding={paddingMm}
      autorouter="fanout"
      {...RK3326_BREAKOUT_RULES}
    >
      <autoroutingphase
        autorouter="fanout"
        busFanoutDirections={busFanoutDirections}
        fanoutRoutingLayers={[...signalFanoutLayers]}
        fanoutPourNetMap={{
          [RK3326_GROUND_PLANE_LAYER]: "GND",
          [RK3326_POWER_PLANE_LAYER]: RK3326_POWER_RAIL_NETS,
        }}
      />
      <RK3326 name={chipName} pcbX={0} pcbY={0} />
      {planeFanoutConnections.map((connection) => (
        <trace
          key={connection.traceName}
          name={connection.traceName}
          from={`.${chipName} > .${connection.ball}`}
          to={`net.${connection.netName}`}
        />
      ))}
      {breakoutPoints.map(
        ({ ball, busId, endpointName, netName, traceName, pcbX, pcbY }) => (
          <Fragment key={`${busId}-${ball}`}>
            <chip
              name={endpointName}
              displayName={netName}
              footprint={breakoutEndpointFootprint}
              pinLabels={{ pin1: ["1", netName] }}
              noSchematicRepresentation
              pcbX={pcbX}
              pcbY={pcbY}
            />
            <trace
              name={traceName}
              from={`.${chipName} > .${ball}`}
              to={`.${endpointName} > .1`}
            />
          </Fragment>
        ),
      )}
      {selectedSignalBuses.map((bus) => (
        <Fragment key={bus.id}>
          <bus
            name={bus.id}
            connections={breakoutPoints
              .filter((point) => point.busId === bus.id)
              .map((point) => point.traceName)}
          />
        </Fragment>
      ))}
    </breakout>
  )
}
