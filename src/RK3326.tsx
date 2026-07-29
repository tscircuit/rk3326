import type { ChipProps } from "tscircuit"
import { Fragment } from "react"
import pinFunctions from "./rk3326-pin-functions.json"

/**
 * RK3326 TFBGA418L package data from the Rockchip RK3326 Datasheet Rev 1.4.
 * The older Rev 1.1/LCSC catalog calls C5182195 "TFBGA395L", but that same
 * document's package drawing says 418 balls and its complete ball list matches
 * Rev 1.4 exactly.
 *
 * Package body: 14 mm x 14 mm
 * Ball grid: 21 x 21 at 0.65 mm pitch, 418 populated positions
 * Nominal ball diameter: 0.30 mm
 *
 * The coordinates below are the PCB top-view land pattern. Rockchip publishes
 * the package ball map as a bottom view, so column 1 appears on the left here.
 */
export const RK3326_PACKAGE = {
  bodySizeMm: 14,
  pitchMm: 0.65,
  padDiameterMm: 0.3,
  rowNames: [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "M",
    "N",
    "P",
    "R",
    "T",
    "U",
    "V",
    "W",
    "Y",
    "AA",
  ],
  missingBalls: [
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
  ],
} as const

const missingBallSet = new Set<string>(RK3326_PACKAGE.missingBalls)

export const RK3326_BALLS = RK3326_PACKAGE.rowNames.flatMap((rowName) =>
  Array.from({ length: 21 }, (_, columnIndex) => {
    const column = columnIndex + 1
    return `${rowName}${column}`
  }).filter((ballName) => !missingBallSet.has(ballName)),
)

export const RK3326_PIN_FUNCTIONS = pinFunctions as Record<string, string>

export const RK3326_PIN_LABELS = Object.fromEntries(
  RK3326_BALLS.map((ballName, index) => [
    `pin${index + 1}`,
    [
      ballName,
      ...RK3326_PIN_FUNCTIONS[ballName].split("/").filter(Boolean),
    ] as const,
  ]),
)

export const RK3326_SUPPLIER_PART_NUMBERS = {
  lcsc: ["C5182195"],
} as const

export type RK3326Props = Omit<
  ChipProps,
  | "footprint"
  | "manufacturerPartNumber"
  | "datasheetUrl"
  | "pinLabels"
>

const rowIndexByName = new Map<string, number>(
  RK3326_PACKAGE.rowNames.map((rowName, index) => [rowName, index]),
)

const getBallPosition = (ballName: string) => {
  const match = ballName.match(/^([A-Z]+)(\d+)$/)
  if (!match) {
    throw new Error(`Invalid RK3326 ball name: ${ballName}`)
  }

  const rowIndex = rowIndexByName.get(match[1])
  if (rowIndex === undefined) {
    throw new Error(`Unknown RK3326 ball row: ${match[1]}`)
  }

  const column = Number(match[2])
  const centerIndex = 10

  return {
    pcbX: (column - 1 - centerIndex) * RK3326_PACKAGE.pitchMm,
    pcbY: (centerIndex - rowIndex) * RK3326_PACKAGE.pitchMm,
  }
}

const rk3326Footprint = (
  <footprint name="TFBGA418L_14x14mm_Layout21x21_P0.65mm">
    {RK3326_BALLS.map((ballName) => {
      const { pcbX, pcbY } = getBallPosition(ballName)

      return (
        <Fragment key={ballName}>
          <smtpad
            name={ballName}
            shape="circle"
            radius={RK3326_PACKAGE.padDiameterMm / 2}
            pcbX={pcbX}
            pcbY={pcbY}
            portHints={[ballName]}
          />
        </Fragment>
      )
    })}
    <silkscreenrect
      width={RK3326_PACKAGE.bodySizeMm}
      height={RK3326_PACKAGE.bodySizeMm}
      filled={false}
      stroke="solid"
      strokeWidth={0.15}
    />
    <silkscreencircle
      pcbX={-6.55}
      pcbY={6.55}
      radius={0.3}
      isOutline
      strokeWidth={0.15}
    />
  </footprint>
)

/**
 * Rockchip RK3326 application processor in the TFBGA418L package.
 *
 * Ball selectors use the datasheet names, for example:
 *   .U1 > .A1
 *   .U1 > .AA21
 * Function aliases are also available, for example:
 *   .U1 > .USB_OTG_DP
 *   .U1 > .GPIO0_A0
 *
 * This component intentionally omits a monolithic 418-pin schematic symbol.
 * Use hierarchical functional blocks in a real RK3326 board design.
 */
export const RK3326 = (props: RK3326Props) => (
  <chip
    manufacturerPartNumber="RK3326"
    displayName="Rockchip RK3326"
    datasheetUrl="https://www.rockchip.fr/RK3326%20datasheet%20V1.4.pdf"
    footprint={rk3326Footprint}
    pinLabels={RK3326_PIN_LABELS}
    noConnect={["Y12", "AA12"]}
    noSchematicRepresentation
    {...props}
  />
)
