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

const pads = circuitJson.filter((element) => element.type === "pcb_smtpad")
const padByBall = new Map(
  pads.map((pad) => [pad.port_hints?.[0], pad]),
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

assert(pads.length === 418, `Expected 418 pads, found ${pads.length}`)
assert(
  new Set(padByBall.keys()).size === 418,
  "Ball names are not unique",
)
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
assert(
  Math.abs(a2.x - a1.x - 0.65) < 1e-9,
  "Horizontal pitch is not 0.65 mm",
)
assert(
  pads.every((pad) => pad.shape === "circle" && pad.radius === 0.15),
  "Pads are not 0.30 mm circles",
)

console.log("RK3326 footprint validation passed: 418 pads, 0.65 mm pitch")
