import { readFileSync } from "node:fs"

const circuitJson = JSON.parse(
  readFileSync(new URL("../dist/index/circuit.json", import.meta.url), "utf8"),
)
const pinFunctions = JSON.parse(
  readFileSync(
    new URL("../src/rk3326-pin-functions.json", import.meta.url),
    "utf8",
  ),
)

const rk3326SourceComponent = circuitJson.find(
  (element) =>
    element.type === "source_component" &&
    element.manufacturer_part_number === "RK3326",
)
const rk3326PcbComponent = circuitJson.find(
  (element) =>
    element.type === "pcb_component" &&
    element.source_component_id === rk3326SourceComponent?.source_component_id,
)
const pads = circuitJson.filter(
  (element) =>
    element.type === "pcb_smtpad" &&
    element.pcb_component_id === rk3326PcbComponent?.pcb_component_id,
)
const padByBall = new Map(pads.map((pad) => [pad.port_hints?.[0], pad]))
const sourceTraceById = new Map(
  circuitJson
    .filter((element) => element.type === "source_trace")
    .map((trace) => [trace.source_trace_id, trace]),
)
const pcbTraceById = new Map(
  circuitJson
    .filter((element) => element.type === "pcb_trace")
    .map((trace) => [trace.pcb_trace_id, trace]),
)
const planeSourceTraces = [...sourceTraceById.values()].filter((trace) =>
  trace.name?.startsWith("PLANE_TRACE_"),
)
const planePcbTraces = [...pcbTraceById.values()].filter((trace) =>
  sourceTraceById.get(trace.source_trace_id)?.name?.startsWith("PLANE_TRACE_"),
)
const planeVias = circuitJson.filter(
  (element) =>
    element.type === "pcb_via" &&
    sourceTraceById
      .get(pcbTraceById.get(element.pcb_trace_id)?.source_trace_id)
      ?.name?.startsWith("PLANE_TRACE_"),
)
const fanoutSignalPcbTraces = [...pcbTraceById.values()].filter(
  (trace) =>
    trace.pcb_trace_id.startsWith("fanout:") &&
    sourceTraceById.get(trace.source_trace_id)?.name?.startsWith("BUS_"),
)

const missingBalls = [
  "A6",
  "A13",
  "A15",
  "A17",
  "A19",
  "C1",
  "F1",
  "F6",
  "F7",
  "F20",
  "F21",
  "G6",
  "H1",
  "H6",
  "J21",
  "K1",
  "N1",
  "P1",
  "P2",
  "T1",
  "V1",
  "W12",
  "AA9",
]

const assert = (condition, message) => {
  if (!condition) throw new Error(message)
}

assert(rk3326SourceComponent, "RK3326 source component is missing")
assert(rk3326PcbComponent, "RK3326 PCB component is missing")
assert(pads.length === 418, `Expected 418 pads, found ${pads.length}`)
assert(new Set(padByBall.keys()).size === 418, "Ball names are not unique")
assert(
  Object.keys(pinFunctions).length === 418,
  `Expected 418 pin functions, found ${Object.keys(pinFunctions).length}`,
)
assert(
  [...padByBall.keys()].every((ball) => pinFunctions[ball]),
  "At least one populated ball is missing a function name",
)

for (const missingBall of missingBalls) {
  assert(!padByBall.has(missingBall), `${missingBall} should not be populated`)
}

const a1 = padByBall.get("A1")
const a2 = padByBall.get("A2")
const aa21 = padByBall.get("AA21")

assert(a1 && a2 && aa21, "Corner/reference balls are missing")
assert(a1.x === -6.5 && a1.y === 6.5, "A1 is not at the upper-left")
assert(aa21.x === 6.5 && aa21.y === -6.5, "AA21 is not at the lower-right")
assert(Math.abs(a2.x - a1.x - 0.65) < 1e-9, "Horizontal pitch is not 0.65 mm")
assert(
  pads.every((pad) => pad.shape === "circle" && pad.radius === 0.15),
  "Pads are not 0.30 mm circles",
)

const circuitErrors = circuitJson.filter((element) =>
  element.type.endsWith("_error"),
)
assert(
  circuitErrors.length === 0,
  `Expected no circuit errors, found ${circuitErrors.length}`,
)
assert(
  planeSourceTraces.length === 205,
  `Expected 205 supply-plane source traces, found ${planeSourceTraces.length}`,
)
assert(
  planePcbTraces.length === 205,
  `Expected 205 supply-plane PCB traces, found ${planePcbTraces.length}`,
)
assert(
  planeVias.length === 205,
  `Expected 205 supply-plane vias, found ${planeVias.length}`,
)

const groundVias = planeVias.filter((via) => via.to_layer === "inner1")
const powerVias = planeVias.filter((via) => via.to_layer === "inner2")
assert(
  groundVias.length === 154,
  `Expected 154 ground drops to inner1, found ${groundVias.length}`,
)
assert(
  powerVias.length === 51,
  `Expected 51 power drops to inner2, found ${powerVias.length}`,
)
assert(
  groundVias.every(
    (via) => via.from_layer === "top" && via.layers.join(",") === "top,inner1",
  ),
  "At least one ground via has the wrong layer span",
)
assert(
  powerVias.every(
    (via) =>
      via.from_layer === "top" && via.layers.join(",") === "top,inner1,inner2",
  ),
  "At least one power via has the wrong layer span",
)

const signalFanoutLayers = new Set(
  fanoutSignalPcbTraces.flatMap((trace) =>
    trace.route.flatMap((point) =>
      point.route_type === "wire"
        ? [point.layer]
        : point.route_type === "via"
          ? [point.from_layer, point.to_layer]
          : [],
    ),
  ),
)
assert(
  !signalFanoutLayers.has("inner1") && !signalFanoutLayers.has("inner2"),
  "Signal fanout uses a reserved supply-plane layer",
)

console.log(
  "RK3326 validation passed: 418 pads; 154 ground drops to inner1; 51 power drops to inner2",
)
