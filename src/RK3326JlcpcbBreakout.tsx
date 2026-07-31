import type { BreakoutProps, BusFanoutDirection } from "@tscircuit/props"
import { Fragment } from "react"
import { A_10118194_0001LF } from "../imports/A_10118194_0001LF"
import { KH_FG0_5_H2_0_20PIN } from "../imports/KH_FG0_5_H2_0_20PIN"
import { KLM8G1GETF_B041 } from "../imports/KLM8G1GETF_B041"
import { RK3326 } from "./RK3326"
import {
  getRK3326PlaneFanoutConnections,
  RK3326_BREAKOUT_RULES,
  RK3326_DEFAULT_SIGNAL_FANOUT_LAYERS,
  RK3326_GROUND_PLANE_LAYER,
  RK3326_INITIAL_FANOUT_BUS_IDS,
  RK3326_POWER_PLANE_LAYER,
  RK3326_POWER_RAIL_NETS,
  type RK3326FanoutDirection,
  type RK3326SignalFanoutLayer,
} from "./RK3326Breakout"

export const RK3326_JLCPCB_BREAKOUT_GEOMETRY = {
  widthMm: 50,
  heightMm: 44,
  paddingMm: 2,
} as const

export const RK3326_JLCPCB_PARTS = {
  emmc: {
    manufacturerPartNumber: "KLM8G1GETF-B041",
    lcscPartNumber: "C499918",
  },
  usbOtg: {
    manufacturerPartNumber: "10118194-0001LF",
    lcscPartNumber: "C132563",
  },
  mipiDsi: {
    manufacturerPartNumber: "KH-FG0.5-H2.0-20PIN",
    lcscPartNumber: "C2797211",
  },
} as const

const signalBuses = [
  {
    id: "emmc-data",
    phaseIndex: 2,
    direction: "center_right",
    target: "emmc",
    connections: [
      { rkBall: "E20", targetPin: "DAT0", signal: "DAT0" },
      { rkBall: "D21", targetPin: "DAT1", signal: "DAT1" },
      { rkBall: "C21", targetPin: "DAT2", signal: "DAT2" },
      { rkBall: "E19", targetPin: "DAT3", signal: "DAT3" },
      { rkBall: "E21", targetPin: "DAT4", signal: "DAT4" },
      { rkBall: "D20", targetPin: "DAT5", signal: "DAT5" },
      { rkBall: "C20", targetPin: "DAT6", signal: "DAT6" },
      { rkBall: "B21", targetPin: "DAT7", signal: "DAT7" },
    ],
  },
  {
    id: "emmc-control",
    phaseIndex: 3,
    direction: "center_right",
    fanoutLayers: ["bottom", "inner4"],
    target: "emmc",
    connections: [
      { rkBall: "H18", targetPin: "CLK", signal: "CLK" },
      { rkBall: "G19", targetPin: "CMD", signal: "CMD" },
      { rkBall: "E18", targetPin: "RSTN", signal: "RSTN" },
    ],
  },
  {
    id: "usb-otg",
    phaseIndex: 1,
    direction: "center_right",
    target: "usb",
    connections: [
      { rkBall: "Y11", targetPin: "ID", signal: "ID" },
      { rkBall: "AA10", targetPin: "USB_DM", signal: "DM" },
      { rkBall: "Y10", targetPin: "USB_DP", signal: "DP" },
      { rkBall: "Y13", targetPin: "VBUS", signal: "VBUS" },
    ],
  },
  {
    id: "mipi-dsi",
    phaseIndex: 0,
    direction: "top_center",
    target: "dsi",
    connections: [
      { rkBall: "B16", targetPin: "pin2", signal: "D0N" },
      { rkBall: "B17", targetPin: "pin3", signal: "D0P" },
      { rkBall: "B15", targetPin: "pin5", signal: "D1N" },
      { rkBall: "A16", targetPin: "pin6", signal: "D1P" },
      { rkBall: "C13", targetPin: "pin8", signal: "D2N" },
      { rkBall: "B13", targetPin: "pin9", signal: "D2P" },
      { rkBall: "B12", targetPin: "pin11", signal: "D3N" },
      { rkBall: "A12", targetPin: "pin12", signal: "D3P" },
      { rkBall: "B14", targetPin: "pin14", signal: "CLKN" },
      { rkBall: "A14", targetPin: "pin15", signal: "CLKP" },
    ],
  },
] as const

const emmcGroundBalls = [
  "A6",
  "C4",
  "E7",
  "G5",
  "H10",
  "J5",
  "K8",
  "N2",
  "N5",
  "P4",
  "P6",
] as const

const emmcVccBalls = ["E6", "F5", "J10", "K9"] as const
const emmcVccqBalls = ["C6", "M4", "N4", "P3", "P5"] as const
const dsiGroundPins = [
  "pin1",
  "pin4",
  "pin7",
  "pin10",
  "pin13",
  "pin16",
] as const
const directRkPlaneDropBalls = new Set([
  "A21",
  "AA21",
  "J18",
  "L11",
  "W11",
  "W13",
])

const directionToAnchor = {
  left: "center_left",
  right: "center_right",
  up: "top_center",
  down: "bottom_center",
} as const satisfies Record<RK3326FanoutDirection, string>

const getSignalTraceName = (
  busId: (typeof signalBuses)[number]["id"],
  signal: string,
) => `JLCPCB_${busId.replace(/-/g, "_").toUpperCase()}_${signal}`

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

export interface RK3326JlcpcbBreakoutProps extends Omit<
  BreakoutProps,
  FixedBreakoutProps
> {
  chipName?: string
  emmcName?: string
  usbName?: string
  dsiName?: string
  signalFanoutLayers?: readonly RK3326SignalFanoutLayer[]
}

/**
 * A concrete first-stage RK3326 breakout using exact JLCPCB footprints for
 * eMMC, USB OTG, and four-lane MIPI DSI.
 */
export const RK3326JlcpcbBreakout = ({
  chipName = "U1",
  emmcName = "U2",
  usbName = "J1",
  dsiName = "J2",
  signalFanoutLayers = RK3326_DEFAULT_SIGNAL_FANOUT_LAYERS,
  name = "RK3326_JLCPCB_BREAKOUT",
  ...props
}: RK3326JlcpcbBreakoutProps) => {
  const planeFanoutConnections = getRK3326PlaneFanoutConnections(
    RK3326_INITIAL_FANOUT_BUS_IDS,
  )
  const targetNames = {
    emmc: emmcName,
    usb: usbName,
    dsi: dsiName,
  } as const
  const planeFanoutDirections: Record<string, BusFanoutDirection> =
    Object.fromEntries([
      ...planeFanoutConnections
        .filter((connection) => !directRkPlaneDropBalls.has(connection.ball))
        .map(
          (connection) =>
            [
              connection.traceName,
              directionToAnchor[connection.direction],
            ] as const,
        ),
    ])
  const { widthMm, heightMm, paddingMm } = RK3326_JLCPCB_BREAKOUT_GEOMETRY

  return (
    <breakout
      {...props}
      name={name}
      width={widthMm}
      height={heightMm}
      padding={paddingMm}
      autorouter="default"
      {...RK3326_BREAKOUT_RULES}
    >
      <autoroutingphase
        phaseIndex={4}
        autorouter="fanout"
        busFanoutDirections={planeFanoutDirections}
        fanoutRoutingLayers={[...signalFanoutLayers]}
        fanoutPourNetMap={{
          [RK3326_GROUND_PLANE_LAYER]: "GND",
          [RK3326_POWER_PLANE_LAYER]: [
            ...RK3326_POWER_RAIL_NETS,
            "EMMC_VCC",
            "EMMC_VCCQ",
          ],
        }}
      />
      {signalBuses.map((bus) => (
        <Fragment key={`phase-${bus.id}`}>
          <autoroutingphase
            phaseIndex={bus.phaseIndex}
            autorouter="fanout"
            busFanoutDirections={{ [bus.id]: bus.direction }}
            fanoutRoutingLayers={[
              ...("fanoutLayers" in bus
                ? bus.fanoutLayers
                : signalFanoutLayers),
            ]}
          />
        </Fragment>
      ))}

      <RK3326 name={chipName} pcbX={0} pcbY={0} />
      <KLM8G1GETF_B041
        name={emmcName}
        noSchematicRepresentation
        includeSupplyMicrovias
        includeSignalMicrovias
        pcbX={17}
        pcbY={-4}
      />
      <A_10118194_0001LF
        name={usbName}
        noSchematicRepresentation
        pcbX={0}
        pcbY={-20}
        pcbRotation={90}
      />
      <KH_FG0_5_H2_0_20PIN
        name={dsiName}
        noSchematicRepresentation
        pcbX={0}
        pcbY={15.5}
        pcbRotation={180}
      />
      {planeFanoutConnections.map((connection) => (
        <trace
          key={connection.traceName}
          name={connection.traceName}
          from={`.${chipName} > .${connection.ball}`}
          to={`net.${connection.netName}`}
          {...(directRkPlaneDropBalls.has(connection.ball)
            ? {
                pcbPathRelativeTo: `.${chipName} > .${connection.ball}`,
                pcbPath: [
                  {
                    x: 0,
                    y: 0,
                    via: true,
                    fromLayer: "top" as const,
                    toLayer: connection.layer,
                  },
                ],
              }
            : { routingPhaseIndex: 4 })}
        />
      ))}

      {signalBuses.flatMap((bus) =>
        bus.connections.map((connection) => {
          const traceName = getSignalTraceName(bus.id, connection.signal)
          return (
            <trace
              key={traceName}
              name={traceName}
              from={`.${chipName} > .${connection.rkBall}`}
              to={`.${targetNames[bus.target]} > .${connection.targetPin}`}
              routingPhaseIndex={bus.phaseIndex}
            />
          )
        }),
      )}

      {emmcGroundBalls.map((ball) => (
        <trace
          key={`EMMC_GND_${ball}`}
          name={`EMMC_GND_${ball}`}
          from={`.${emmcName} > .${ball}`}
          to="net.GND"
          pcbPath={[]}
        />
      ))}
      {emmcVccBalls.map((ball) => (
        <trace
          key={`EMMC_VCC_${ball}`}
          name={`EMMC_VCC_${ball}`}
          from={`.${emmcName} > .${ball}`}
          to="net.EMMC_VCC"
          pcbPath={[]}
        />
      ))}
      {emmcVccqBalls.map((ball) => (
        <trace
          key={`EMMC_VCCQ_${ball}`}
          name={`EMMC_VCCQ_${ball}`}
          from={`.${emmcName} > .${ball}`}
          to="net.EMMC_VCCQ"
          pcbPath={[]}
        />
      ))}
      <trace
        name="USB_GND"
        from={`.${usbName} > .GND`}
        to="net.GND"
        pcbPathRelativeTo={`.${usbName} > .GND`}
        pcbPath={[
          {
            x: 0,
            y: 0,
            via: true,
            fromLayer: "top",
            toLayer: RK3326_GROUND_PLANE_LAYER,
          },
        ]}
      />
      {dsiGroundPins.map((pin) => (
        <trace
          key={`MIPI_DSI_GND_${pin}`}
          name={`MIPI_DSI_GND_${pin}`}
          from={`.${dsiName} > .${pin}`}
          to="net.GND"
          pcbPathRelativeTo={`.${dsiName} > .${pin}`}
          pcbPath={[
            {
              x: 0,
              y: 0,
              via: true,
              fromLayer: "top",
              toLayer: RK3326_GROUND_PLANE_LAYER,
            },
          ]}
        />
      ))}

      {signalBuses.map((bus) => (
        <Fragment key={bus.id}>
          <bus
            name={bus.id}
            connections={bus.connections.map((connection) =>
              getSignalTraceName(bus.id, connection.signal),
            )}
            routingPhaseIndex={bus.phaseIndex}
          />
        </Fragment>
      ))}
    </breakout>
  )
}
