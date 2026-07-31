import type { ChipProps } from "@tscircuit/props"
import { Fragment } from "react"

const pinLabels = {
  pin1: ["A1"],
  pin2: ["A2"],
  pin3: ["A3", "DAT0"],
  pin4: ["A4", "DAT1"],
  pin5: ["A5", "DAT2"],
  pin6: ["A6"],
  pin7: ["A7"],
  pin8: ["A8"],
  pin9: ["A9"],
  pin10: ["A10"],
  pin11: ["A11"],
  pin12: ["A12"],
  pin13: ["A13"],
  pin14: ["A14"],
  pin15: ["B1"],
  pin16: ["B2", "DAT3"],
  pin17: ["B3", "DAT4"],
  pin18: ["B4", "DAT5"],
  pin19: ["B5", "DAT6"],
  pin20: ["B6", "DAT7"],
  pin21: ["B7"],
  pin22: ["B8"],
  pin23: ["B9"],
  pin24: ["B10"],
  pin25: ["B11"],
  pin26: ["B12"],
  pin27: ["B13"],
  pin28: ["B14"],
  pin29: ["C1"],
  pin30: ["C2"],
  pin31: ["C3"],
  pin32: ["C4"],
  pin33: ["C5"],
  pin34: ["C6"],
  pin35: ["C7"],
  pin36: ["C8"],
  pin37: ["C9"],
  pin38: ["C10"],
  pin39: ["C11"],
  pin40: ["C12"],
  pin41: ["C13"],
  pin42: ["C14"],
  pin43: ["D1"],
  pin44: ["D2"],
  pin45: ["D3"],
  pin46: ["D4"],
  pin47: ["D12"],
  pin48: ["D13"],
  pin49: ["D14"],
  pin50: ["E1"],
  pin51: ["E2"],
  pin52: ["E3"],
  pin53: ["E5"],
  pin54: ["E6"],
  pin55: ["E7"],
  pin56: ["E8"],
  pin57: ["E9"],
  pin58: ["E10"],
  pin59: ["E12"],
  pin60: ["E13"],
  pin61: ["E14"],
  pin62: ["F1"],
  pin63: ["F2"],
  pin64: ["F3"],
  pin65: ["F5"],
  pin66: ["F10"],
  pin67: ["F12"],
  pin68: ["F13"],
  pin69: ["F14"],
  pin70: ["G1"],
  pin71: ["G2"],
  pin72: ["G3"],
  pin73: ["G5"],
  pin74: ["G10"],
  pin75: ["G12"],
  pin76: ["G13"],
  pin77: ["G14"],
  pin78: ["H1"],
  pin79: ["H2"],
  pin80: ["H3"],
  pin81: ["H5", "DATA_STROBE"],
  pin82: ["H10"],
  pin83: ["H12"],
  pin84: ["H13"],
  pin85: ["H14"],
  pin86: ["J1"],
  pin87: ["J2"],
  pin88: ["J3"],
  pin89: ["J5"],
  pin90: ["J10"],
  pin91: ["J12"],
  pin92: ["J13"],
  pin93: ["J14"],
  pin94: ["K1"],
  pin95: ["K2"],
  pin96: ["K3"],
  pin97: ["K5", "RSTN"],
  pin98: ["K6"],
  pin99: ["K7"],
  pin100: ["K8"],
  pin101: ["K9"],
  pin102: ["K10"],
  pin103: ["K12"],
  pin104: ["K13"],
  pin105: ["K14"],
  pin106: ["L1"],
  pin107: ["L2"],
  pin108: ["L3"],
  pin109: ["L12"],
  pin110: ["L13"],
  pin111: ["L14"],
  pin112: ["M1"],
  pin113: ["M2"],
  pin114: ["M3"],
  pin115: ["M4"],
  pin116: ["M5", "CMD"],
  pin117: ["M6", "CLK"],
  pin118: ["M7"],
  pin119: ["M8"],
  pin120: ["M9"],
  pin121: ["M10"],
  pin122: ["M11"],
  pin123: ["M12"],
  pin124: ["M13"],
  pin125: ["M14"],
  pin126: ["N1"],
  pin127: ["N2"],
  pin128: ["N3"],
  pin129: ["N4"],
  pin130: ["N5"],
  pin131: ["N6"],
  pin132: ["N7"],
  pin133: ["N8"],
  pin134: ["N9"],
  pin135: ["N10"],
  pin136: ["N11"],
  pin137: ["N12"],
  pin138: ["N13"],
  pin139: ["N14"],
  pin140: ["P1"],
  pin141: ["P2"],
  pin142: ["P3"],
  pin143: ["P4"],
  pin144: ["P5"],
  pin145: ["P6"],
  pin146: ["P7"],
  pin147: ["P8"],
  pin148: ["P9"],
  pin149: ["P10"],
  pin150: ["P11"],
  pin151: ["P12"],
  pin152: ["P13"],
  pin153: ["P14"],
} as const

const supplyMicrovias = [
  { ball: "A6", toLayer: "inner1" },
  { ball: "C4", toLayer: "inner1" },
  { ball: "E7", toLayer: "inner1" },
  { ball: "G5", toLayer: "inner1" },
  { ball: "H10", toLayer: "inner1" },
  { ball: "J5", toLayer: "inner1" },
  { ball: "K8", toLayer: "inner1" },
  { ball: "N2", toLayer: "inner1" },
  { ball: "N5", toLayer: "inner1" },
  { ball: "P4", toLayer: "inner1" },
  { ball: "P6", toLayer: "inner1" },
  { ball: "E6", toLayer: "inner2" },
  { ball: "F5", toLayer: "inner2" },
  { ball: "J10", toLayer: "inner2" },
  { ball: "K9", toLayer: "inner2" },
  { ball: "C6", toLayer: "inner2" },
  { ball: "M4", toLayer: "inner2" },
  { ball: "N4", toLayer: "inner2" },
  { ball: "P3", toLayer: "inner2" },
  { ball: "P5", toLayer: "inner2" },
] as const

const signalMicrovias = [
  { pin: "pin3", ball: "A3", toLayer: "inner3" },
  { pin: "pin4", ball: "A4", toLayer: "inner3" },
  { pin: "pin5", ball: "A5", toLayer: "inner3" },
  { pin: "pin16", ball: "B2", toLayer: "inner3" },
  { pin: "pin17", ball: "B3", toLayer: "inner3" },
  { pin: "pin18", ball: "B4", toLayer: "inner3" },
  { pin: "pin19", ball: "B5", toLayer: "inner3" },
  { pin: "pin20", ball: "B6", toLayer: "inner3" },
  { pin: "pin97", ball: "K5", toLayer: "inner4" },
  { pin: "pin116", ball: "M5", toLayer: "inner4" },
  { pin: "pin117", ball: "M6", toLayer: "inner4" },
] as const

const emmcBallRows = [
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
]
const emmcBallGridCoordinates = [
  -3.250057, -2.749931, -2.250059, -1.749933, -1.250061, -0.749935, -0.250063,
  0.250063, 0.749935, 1.250061, 1.749933, 2.250059, 2.749931, 3.250057,
] as const

export const getKLM8G1GETF_B041BallPosition = (ball: string) => ({
  x: emmcBallGridCoordinates[Number.parseInt(ball.slice(1), 10) - 1]!,
  y: -emmcBallGridCoordinates[emmcBallRows.indexOf(ball.slice(0, 1))]!,
})

export interface KLM8G1GETF_B041Props extends ChipProps<typeof pinLabels> {
  includeSupplyMicrovias?: boolean
  includeSignalMicrovias?: boolean
}

export const KLM8G1GETF_B041 = ({
  includeSupplyMicrovias = false,
  includeSignalMicrovias = false,
  ...props
}: KLM8G1GETF_B041Props) => {
  return (
    <chip
      pinLabels={pinLabels}
      supplierPartNumbers={{
        jlcpcb: ["C499918"],
      }}
      manufacturerPartNumber="KLM8G1GETF-B041"
      footprint={
        <footprint>
          {includeSignalMicrovias &&
            signalMicrovias.map(({ pin, ball, toLayer }) => {
              const { x, y } = getKLM8G1GETF_B041BallPosition(ball)
              const row = ball.match(/^[A-Z]+/)?.[0]
              const escapeDy = row === "A" || row === "K" ? 0.4 : -0.4
              return (
                <Fragment key={`signal-microvia-${ball}`}>
                  <smtpad
                    portHints={[pin]}
                    pcbX={x}
                    pcbY={y + escapeDy}
                    width="0.15mm"
                    height="0.15mm"
                    shape="rect"
                    layer={toLayer}
                  />
                  <smtpad
                    portHints={[pin]}
                    pcbX={x}
                    pcbY={y + escapeDy / 2}
                    width="0.15mm"
                    height="0.55mm"
                    shape="rect"
                    layer={toLayer}
                  />
                  <via
                    pcbX={x}
                    pcbY={y}
                    outerDiameter="0.25mm"
                    holeDiameter="0.10mm"
                    fromLayer="top"
                    toLayer={toLayer}
                  />
                </Fragment>
              )
            })}
          <smtpad
            portHints={["pin1"]}
            pcbX="-3.250057mm"
            pcbY="3.250057mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin2"]}
            pcbX="-2.749931mm"
            pcbY="3.250057mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin3"]}
            pcbX="-2.250059mm"
            pcbY="3.250057mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin4"]}
            pcbX="-1.749933mm"
            pcbY="3.250057mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin5"]}
            pcbX="-1.250061mm"
            pcbY="3.250057mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin6"]}
            pcbX="-0.749935mm"
            pcbY="3.250057mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin7"]}
            pcbX="-0.250063mm"
            pcbY="3.250057mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin8"]}
            pcbX="0.250063mm"
            pcbY="3.250057mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin9"]}
            pcbX="0.749935mm"
            pcbY="3.250057mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin10"]}
            pcbX="1.250061mm"
            pcbY="3.250057mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin11"]}
            pcbX="1.749933mm"
            pcbY="3.250057mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin12"]}
            pcbX="2.250059mm"
            pcbY="3.250057mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin13"]}
            pcbX="2.749931mm"
            pcbY="3.250057mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin14"]}
            pcbX="3.250057mm"
            pcbY="3.250057mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin15"]}
            pcbX="-3.250057mm"
            pcbY="2.749931mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin16"]}
            pcbX="-2.749931mm"
            pcbY="2.749931mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin17"]}
            pcbX="-2.250059mm"
            pcbY="2.749931mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin18"]}
            pcbX="-1.749933mm"
            pcbY="2.749931mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin19"]}
            pcbX="-1.250061mm"
            pcbY="2.749931mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin20"]}
            pcbX="-0.749935mm"
            pcbY="2.749931mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin21"]}
            pcbX="-0.250063mm"
            pcbY="2.749931mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin22"]}
            pcbX="0.250063mm"
            pcbY="2.749931mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin23"]}
            pcbX="0.749935mm"
            pcbY="2.749931mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin24"]}
            pcbX="1.250061mm"
            pcbY="2.749931mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin25"]}
            pcbX="1.749933mm"
            pcbY="2.749931mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin26"]}
            pcbX="2.250059mm"
            pcbY="2.749931mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin27"]}
            pcbX="2.749931mm"
            pcbY="2.749931mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin28"]}
            pcbX="3.250057mm"
            pcbY="2.749931mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin29"]}
            pcbX="-3.250057mm"
            pcbY="2.250059mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin30"]}
            pcbX="-2.749931mm"
            pcbY="2.250059mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin31"]}
            pcbX="-2.250059mm"
            pcbY="2.250059mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin32"]}
            pcbX="-1.749933mm"
            pcbY="2.250059mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin33"]}
            pcbX="-1.250061mm"
            pcbY="2.250059mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin34"]}
            pcbX="-0.749935mm"
            pcbY="2.250059mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin35"]}
            pcbX="-0.250063mm"
            pcbY="2.250059mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin36"]}
            pcbX="0.250063mm"
            pcbY="2.250059mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin37"]}
            pcbX="0.749935mm"
            pcbY="2.250059mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin38"]}
            pcbX="1.250061mm"
            pcbY="2.250059mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin39"]}
            pcbX="1.749933mm"
            pcbY="2.250059mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin40"]}
            pcbX="2.250059mm"
            pcbY="2.250059mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin41"]}
            pcbX="2.749931mm"
            pcbY="2.250059mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin42"]}
            pcbX="3.250057mm"
            pcbY="2.250059mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin43"]}
            pcbX="-3.250057mm"
            pcbY="1.749933mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin44"]}
            pcbX="-2.749931mm"
            pcbY="1.749933mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin45"]}
            pcbX="-2.250059mm"
            pcbY="1.749933mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin46"]}
            pcbX="-1.749933mm"
            pcbY="1.749933mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin47"]}
            pcbX="2.250059mm"
            pcbY="1.749933mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin48"]}
            pcbX="2.749931mm"
            pcbY="1.749933mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin49"]}
            pcbX="3.250057mm"
            pcbY="1.749933mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin50"]}
            pcbX="-3.250057mm"
            pcbY="1.250061mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin51"]}
            pcbX="-2.749931mm"
            pcbY="1.250061mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin52"]}
            pcbX="-2.250059mm"
            pcbY="1.250061mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin53"]}
            pcbX="-1.250061mm"
            pcbY="1.250061mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin54"]}
            pcbX="-0.749935mm"
            pcbY="1.250061mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin55"]}
            pcbX="-0.250063mm"
            pcbY="1.250061mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin56"]}
            pcbX="0.250063mm"
            pcbY="1.250061mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin57"]}
            pcbX="0.749935mm"
            pcbY="1.250061mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin58"]}
            pcbX="1.250061mm"
            pcbY="1.250061mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin59"]}
            pcbX="2.250059mm"
            pcbY="1.250061mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin60"]}
            pcbX="2.749931mm"
            pcbY="1.250061mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin61"]}
            pcbX="3.250057mm"
            pcbY="1.250061mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin62"]}
            pcbX="-3.250057mm"
            pcbY="0.749935mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin63"]}
            pcbX="-2.749931mm"
            pcbY="0.749935mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin64"]}
            pcbX="-2.250059mm"
            pcbY="0.749935mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin65"]}
            pcbX="-1.250061mm"
            pcbY="0.749935mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin66"]}
            pcbX="1.250061mm"
            pcbY="0.749935mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin67"]}
            pcbX="2.250059mm"
            pcbY="0.749935mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin68"]}
            pcbX="2.749931mm"
            pcbY="0.749935mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin69"]}
            pcbX="3.250057mm"
            pcbY="0.749935mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin70"]}
            pcbX="-3.250057mm"
            pcbY="0.250063mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin71"]}
            pcbX="-2.749931mm"
            pcbY="0.250063mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin72"]}
            pcbX="-2.250059mm"
            pcbY="0.250063mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin73"]}
            pcbX="-1.250061mm"
            pcbY="0.250063mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin74"]}
            pcbX="1.250061mm"
            pcbY="0.250063mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin75"]}
            pcbX="2.250059mm"
            pcbY="0.250063mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin76"]}
            pcbX="2.749931mm"
            pcbY="0.250063mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin77"]}
            pcbX="3.250057mm"
            pcbY="0.250063mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin78"]}
            pcbX="-3.250057mm"
            pcbY="-0.250063mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin79"]}
            pcbX="-2.749931mm"
            pcbY="-0.250063mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin80"]}
            pcbX="-2.250059mm"
            pcbY="-0.250063mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin81"]}
            pcbX="-1.250061mm"
            pcbY="-0.250063mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin82"]}
            pcbX="1.250061mm"
            pcbY="-0.250063mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin83"]}
            pcbX="2.250059mm"
            pcbY="-0.250063mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin84"]}
            pcbX="2.749931mm"
            pcbY="-0.250063mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin85"]}
            pcbX="3.250057mm"
            pcbY="-0.250063mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin86"]}
            pcbX="-3.250057mm"
            pcbY="-0.749935mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin87"]}
            pcbX="-2.749931mm"
            pcbY="-0.749935mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin88"]}
            pcbX="-2.250059mm"
            pcbY="-0.749935mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin89"]}
            pcbX="-1.250061mm"
            pcbY="-0.749935mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin90"]}
            pcbX="1.250061mm"
            pcbY="-0.749935mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin91"]}
            pcbX="2.250059mm"
            pcbY="-0.749935mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin92"]}
            pcbX="2.749931mm"
            pcbY="-0.749935mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin93"]}
            pcbX="3.250057mm"
            pcbY="-0.749935mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin94"]}
            pcbX="-3.250057mm"
            pcbY="-1.250061mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin95"]}
            pcbX="-2.749931mm"
            pcbY="-1.250061mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin96"]}
            pcbX="-2.250059mm"
            pcbY="-1.250061mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin97"]}
            pcbX="-1.250061mm"
            pcbY="-1.250061mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin98"]}
            pcbX="-0.749935mm"
            pcbY="-1.250061mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin99"]}
            pcbX="-0.250063mm"
            pcbY="-1.250061mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin100"]}
            pcbX="0.250063mm"
            pcbY="-1.250061mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin101"]}
            pcbX="0.749935mm"
            pcbY="-1.250061mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin102"]}
            pcbX="1.250061mm"
            pcbY="-1.250061mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin103"]}
            pcbX="2.250059mm"
            pcbY="-1.250061mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin104"]}
            pcbX="2.749931mm"
            pcbY="-1.250061mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin105"]}
            pcbX="3.250057mm"
            pcbY="-1.250061mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin106"]}
            pcbX="-3.250057mm"
            pcbY="-1.749933mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin107"]}
            pcbX="-2.749931mm"
            pcbY="-1.749933mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin108"]}
            pcbX="-2.250059mm"
            pcbY="-1.749933mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin109"]}
            pcbX="2.250059mm"
            pcbY="-1.749933mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin110"]}
            pcbX="2.749931mm"
            pcbY="-1.749933mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin111"]}
            pcbX="3.250057mm"
            pcbY="-1.749933mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin112"]}
            pcbX="-3.250057mm"
            pcbY="-2.250059mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin113"]}
            pcbX="-2.749931mm"
            pcbY="-2.250059mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin114"]}
            pcbX="-2.250059mm"
            pcbY="-2.250059mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin115"]}
            pcbX="-1.749933mm"
            pcbY="-2.250059mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin116"]}
            pcbX="-1.250061mm"
            pcbY="-2.250059mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin117"]}
            pcbX="-0.749935mm"
            pcbY="-2.250059mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin118"]}
            pcbX="-0.250063mm"
            pcbY="-2.250059mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin119"]}
            pcbX="0.250063mm"
            pcbY="-2.250059mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin120"]}
            pcbX="0.749935mm"
            pcbY="-2.250059mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin121"]}
            pcbX="1.250061mm"
            pcbY="-2.250059mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin122"]}
            pcbX="1.749933mm"
            pcbY="-2.250059mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin123"]}
            pcbX="2.250059mm"
            pcbY="-2.250059mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin124"]}
            pcbX="2.749931mm"
            pcbY="-2.250059mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin125"]}
            pcbX="3.250057mm"
            pcbY="-2.250059mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin126"]}
            pcbX="-3.250057mm"
            pcbY="-2.749931mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin127"]}
            pcbX="-2.749931mm"
            pcbY="-2.749931mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin128"]}
            pcbX="-2.250059mm"
            pcbY="-2.749931mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin129"]}
            pcbX="-1.749933mm"
            pcbY="-2.749931mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin130"]}
            pcbX="-1.250061mm"
            pcbY="-2.749931mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin131"]}
            pcbX="-0.749935mm"
            pcbY="-2.749931mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin132"]}
            pcbX="-0.250063mm"
            pcbY="-2.749931mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin133"]}
            pcbX="0.250063mm"
            pcbY="-2.749931mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin134"]}
            pcbX="0.749935mm"
            pcbY="-2.749931mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin135"]}
            pcbX="1.250061mm"
            pcbY="-2.749931mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin136"]}
            pcbX="1.749933mm"
            pcbY="-2.749931mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin137"]}
            pcbX="2.250059mm"
            pcbY="-2.749931mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin138"]}
            pcbX="2.749931mm"
            pcbY="-2.749931mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin139"]}
            pcbX="3.250057mm"
            pcbY="-2.749931mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin140"]}
            pcbX="-3.250057mm"
            pcbY="-3.250057mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin141"]}
            pcbX="-2.749931mm"
            pcbY="-3.250057mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin142"]}
            pcbX="-2.250059mm"
            pcbY="-3.250057mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin143"]}
            pcbX="-1.749933mm"
            pcbY="-3.250057mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin144"]}
            pcbX="-1.250061mm"
            pcbY="-3.250057mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin145"]}
            pcbX="-0.749935mm"
            pcbY="-3.250057mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin146"]}
            pcbX="-0.250063mm"
            pcbY="-3.250057mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin147"]}
            pcbX="0.250063mm"
            pcbY="-3.250057mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin148"]}
            pcbX="0.749935mm"
            pcbY="-3.250057mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin149"]}
            pcbX="1.250061mm"
            pcbY="-3.250057mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin150"]}
            pcbX="1.749933mm"
            pcbY="-3.250057mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin151"]}
            pcbX="2.250059mm"
            pcbY="-3.250057mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin152"]}
            pcbX="2.749931mm"
            pcbY="-3.250057mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin153"]}
            pcbX="3.250057mm"
            pcbY="-3.250057mm"
            width="0.2500122mm"
            height="0.2500122mm"
            shape="rect"
          />
          {includeSupplyMicrovias &&
            supplyMicrovias.map(({ ball, toLayer }) => {
              const { x, y } = getKLM8G1GETF_B041BallPosition(ball)
              return (
                <Fragment key={`supply-microvia-${ball}`}>
                  <via
                    pcbX={x}
                    pcbY={y}
                    outerDiameter="0.25mm"
                    holeDiameter="0.10mm"
                    fromLayer="top"
                    toLayer={toLayer}
                  />
                </Fragment>
              )
            })}
          <silkscreenpath
            route={[
              { x: -4.9529999999999745, y: 6.857999999999947 },
              { x: -6.222999999999843, y: 6.857999999999947 },
              { x: -6.222999999999843, y: 5.714999999999918 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: -5.840856999999801, y: 6.500012399999832 },
              { x: 5.842000000000212, y: 6.500012399999832 },
              { x: 5.842000000000212, y: 5.078856999999971 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: -5.840856999999801, y: -6.500012400000173 },
              { x: -5.840856999999801, y: 6.500012399999832 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: -5.840856999999801, y: -6.605143000000112 },
              { x: 5.843143000000168, y: -6.605143000000112 },
              { x: 5.843143000000168, y: 5.078856999999971 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: -5.206872999999973, y: 5.9688730000000305 },
              { x: -5.211200420061232, y: 5.93600298127194 },
              { x: -5.223887773719412, y: 5.905373000000054 },
              { x: -5.244070438789322, y: 5.879070438789313 },
              { x: -5.27037299999995, y: 5.8588877737194025 },
              { x: -5.301002981272063, y: 5.8462004200613364 },
              { x: -5.333872999999926, y: 5.841873000000078 },
              { x: -5.366743018728016, y: 5.8462004200613364 },
              { x: -5.397372999999902, y: 5.8588877737194025 },
              { x: -5.423675561210757, y: 5.879070438789313 },
              { x: -5.443858226280554, y: 5.905373000000054 },
              { x: -5.45654557993862, y: 5.93600298127194 },
              { x: -5.460873000000106, y: 5.9688730000000305 },
              { x: -5.45654557993862, y: 6.001743018728121 },
              { x: -5.443858226280554, y: 6.032373000000007 },
              { x: -5.423675561210757, y: 6.058675561210748 },
              { x: -5.397372999999902, y: 6.078858226280545 },
              { x: -5.366743018728016, y: 6.091545579938725 },
              { x: -5.333872999999926, y: 6.095872999999983 },
              { x: -5.301002981272063, y: 6.091545579938725 },
              { x: -5.27037299999995, y: 6.078858226280545 },
              { x: -5.244070438789322, y: 6.058675561210748 },
              { x: -5.223887773719412, y: 6.032373000000007 },
              { x: -5.211200420061232, y: 6.001743018728121 },
              { x: -5.206872999999973, y: 5.9688730000000305 },
            ]}
          />
          <silkscreentext
            text="{NAME}"
            pcbX="-0.189357mm"
            pcbY="7.856857mm"
            anchorAlignment="center"
            fontSize="1mm"
          />
          <courtyardoutline
            outline={[
              { x: -6.471856999999886, y: 7.106856999999877 },
              { x: 6.093143000000168, y: 7.106856999999877 },
              { x: 6.093143000000168, y: -6.855143000000112 },
              { x: -6.471856999999886, y: -6.855143000000112 },
              { x: -6.471856999999886, y: 7.106856999999877 },
            ]}
          />
        </footprint>
      }
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C499918.obj?uuid=e04ba39a3bd84945b43587e949d034f7",
        stepUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C499918.step?uuid=e04ba39a3bd84945b43587e949d034f7",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: -0.000012699999956566899, y: 0, z: -0.22 },
      }}
      {...props}
    />
  )
}
