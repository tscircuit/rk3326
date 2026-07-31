import type { BreakoutProps, BusFanoutDirection } from "@tscircuit/props"
import { Fragment } from "react"
import { A_10118194_0001LF } from "../imports/A_10118194_0001LF"
import { KH_FG0_5_H2_0_20PIN } from "../imports/KH_FG0_5_H2_0_20PIN"
import {
  getKLM8G1GETF_B041BallPosition,
  KLM8G1GETF_B041,
} from "../imports/KLM8G1GETF_B041"
import { RK3326, RK3326_PACKAGE } from "./RK3326"
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

const rk3326PadFieldSizeMm =
  (RK3326_PACKAGE.rowNames.length - 1) * RK3326_PACKAGE.pitchMm +
  RK3326_PACKAGE.padDiameterMm
const rk3326FanoutBoundaryPaddingMm = 1
const rk3326JlcpcbFanoutPhaseIndex = 0
const peripheralFanoutPaddingMm = 1
const peripheralBreakoutGeometry = {
  usb: {
    width: 9.999984,
    height: 6.1500298,
  },
  dsi: {
    width: 16.899894,
    height: 6.0998267,
  },
} as const

export const RK3326_JLCPCB_BREAKOUT_GEOMETRY = {
  widthMm: 50,
  heightMm: 44,
  paddingMm: 2,
  fanoutBoundaryPaddingMm: rk3326FanoutBoundaryPaddingMm,
  fanoutBoundarySizeMm:
    rk3326PadFieldSizeMm + 2 * rk3326FanoutBoundaryPaddingMm,
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
    phaseIndex: rk3326JlcpcbFanoutPhaseIndex,
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
    phaseIndex: rk3326JlcpcbFanoutPhaseIndex,
    direction: "center_right",
    target: "emmc",
    connections: [
      { rkBall: "H18", targetPin: "CLK", signal: "CLK" },
      { rkBall: "G19", targetPin: "CMD", signal: "CMD" },
      { rkBall: "E18", targetPin: "RSTN", signal: "RSTN" },
    ],
  },
  {
    id: "usb-otg",
    phaseIndex: rk3326JlcpcbFanoutPhaseIndex,
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
    phaseIndex: rk3326JlcpcbFanoutPhaseIndex,
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
const dsiBreakoutXBySignal = {
  D0N: -4.250055,
  D0P: -3.749929,
  D1N: -2.749931,
  D1P: -2.250059,
  D2N: -1.250061,
  D2P: -0.749935,
  D3N: 0.250063,
  D3P: 0.749935,
  CLKN: 1.749933,
  CLKP: 2.249805,
} as const
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

const getTargetBreakoutPortName = (signal: string) => `FANOUT_${signal}`

type SignalBusConnection = (typeof signalBuses)[number]["connections"][number]

const getSignalConnectionsForTarget = (
  target: (typeof signalBuses)[number]["target"],
): SignalBusConnection[] =>
  signalBuses
    .filter((bus) => bus.target === target)
    .flatMap((bus) => [...bus.connections] as SignalBusConnection[])

const getEvenlySpacedCoordinate = (
  index: number,
  count: number,
  span: number,
) => ((index + 1) * span) / (count + 1) - span / 2

const getRK3326BallPosition = (ball: string) => {
  const match = ball.match(/^([A-Z]+)(\d+)$/)
  if (!match) throw new Error(`Invalid RK3326 ball name: ${ball}`)

  const rowIndex = RK3326_PACKAGE.rowNames.indexOf(
    match[1] as (typeof RK3326_PACKAGE.rowNames)[number],
  )
  if (rowIndex < 0) throw new Error(`Unknown RK3326 ball row: ${match[1]}`)

  return {
    x: (Number(match[2]) - 11) * RK3326_PACKAGE.pitchMm,
    y: (10 - rowIndex) * RK3326_PACKAGE.pitchMm,
  }
}

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
  const targetBreakoutNames = {
    usb: `${usbName}_FANOUT`,
    dsi: `${dsiName}_FANOUT`,
  } as const
  const fanoutDirections: Record<string, BusFanoutDirection> =
    Object.fromEntries([
      ...signalBuses.map((bus) => [bus.id, bus.direction] as const),
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
  const {
    widthMm,
    heightMm,
    paddingMm,
    fanoutBoundaryPaddingMm,
    fanoutBoundarySizeMm,
  } = RK3326_JLCPCB_BREAKOUT_GEOMETRY

  return (
    <breakout
      {...props}
      name={name}
      width={widthMm}
      height={heightMm}
      padding={paddingMm}
      fanoutBoundaryPadding={fanoutBoundaryPaddingMm}
      autorouter="default"
      {...RK3326_BREAKOUT_RULES}
    >
      <autoroutingphase
        phaseIndex={rk3326JlcpcbFanoutPhaseIndex}
        autorouter="fanout"
        busFanoutDirections={fanoutDirections}
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

      <pcbnoterect
        width={fanoutBoundarySizeMm}
        height={fanoutBoundarySizeMm}
        strokeWidth={0.25}
        isStrokeDashed
        color="#f97316"
      />

      <RK3326 name={chipName} pcbX={0} pcbY={0} />
      <KLM8G1GETF_B041
        name={emmcName}
        noSchematicRepresentation
        includeSignalMicrovias
        pcbX={17}
        pcbY={-4}
      />
      {emmcGroundBalls.map((ball) => {
        const position = getKLM8G1GETF_B041BallPosition(ball)
        return (
          <trace
            key={`EMMC_GND_${ball}`}
            name={`EMMC_GND_${ball}`}
            from={`.${emmcName} > .${ball}`}
            to="net.GND"
            pcbPathRelativeTo={`.${emmcName} > .${ball}`}
            pcbPath={[
              {
                ...position,
                via: true,
                fromLayer: "top",
                toLayer: RK3326_GROUND_PLANE_LAYER,
              },
            ]}
          />
        )
      })}
      {emmcVccBalls.map((ball) => {
        const position = getKLM8G1GETF_B041BallPosition(ball)
        return (
          <trace
            key={`EMMC_VCC_${ball}`}
            name={`EMMC_VCC_${ball}`}
            from={`.${emmcName} > .${ball}`}
            to="net.EMMC_VCC"
            pcbPathRelativeTo={`.${emmcName} > .${ball}`}
            pcbPath={[
              {
                ...position,
                via: true,
                fromLayer: "top",
                toLayer: RK3326_POWER_PLANE_LAYER,
              },
            ]}
          />
        )
      })}
      {emmcVccqBalls.map((ball) => {
        const position = getKLM8G1GETF_B041BallPosition(ball)
        return (
          <trace
            key={`EMMC_VCCQ_${ball}`}
            name={`EMMC_VCCQ_${ball}`}
            from={`.${emmcName} > .${ball}`}
            to="net.EMMC_VCCQ"
            pcbPathRelativeTo={`.${emmcName} > .${ball}`}
            pcbPath={[
              {
                ...position,
                via: true,
                fromLayer: "top",
                toLayer: RK3326_POWER_PLANE_LAYER,
              },
            ]}
          />
        )
      })}
      <breakout
        name={targetBreakoutNames.usb}
        pcbX={0}
        pcbY={-20}
        width={peripheralBreakoutGeometry.usb.width}
        height={peripheralBreakoutGeometry.usb.height}
        padding={peripheralFanoutPaddingMm}
        exposedNets={["GND"]}
        autorouter="default"
      >
        <A_10118194_0001LF
          name={usbName}
          noSchematicRepresentation
          pcbX={0}
          pcbY={0}
          pcbRotation={0}
        />
        {signalBuses
          .filter((bus) => bus.target === "usb")
          .flatMap((bus) =>
            bus.connections.map((connection) => (
              <Fragment key={`${bus.id}-${connection.signal}`}>
                <port
                  name={getTargetBreakoutPortName(connection.signal)}
                  direction="up"
                  connectsTo={`.${usbName} > .${connection.targetPin}`}
                />
              </Fragment>
            )),
          )}
        {getSignalConnectionsForTarget("usb").map(
          (connection, index, connections) => (
            <Fragment key={`USB_BREAKOUT_${connection.signal}`}>
              <breakoutpoint
                connection={`.${getTargetBreakoutPortName(connection.signal)}`}
                pcbX={getEvenlySpacedCoordinate(
                  index,
                  connections.length,
                  peripheralBreakoutGeometry.usb.width -
                    2 * peripheralFanoutPaddingMm,
                )}
                pcbY={peripheralBreakoutGeometry.usb.height / 2 - 0.0001}
              />
            </Fragment>
          ),
        )}
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
      </breakout>
      <breakout
        name={targetBreakoutNames.dsi}
        pcbX={0}
        pcbY={15.5}
        width={peripheralBreakoutGeometry.dsi.width}
        height={peripheralBreakoutGeometry.dsi.height}
        padding={peripheralFanoutPaddingMm}
        exposedNets={["GND"]}
        autorouter="default"
      >
        <KH_FG0_5_H2_0_20PIN
          name={dsiName}
          noSchematicRepresentation
          pcbX={0}
          pcbY={0}
          pcbRotation={180}
        />
        {signalBuses
          .filter((bus) => bus.target === "dsi")
          .flatMap((bus) =>
            bus.connections.map((connection) => (
              <Fragment key={`${bus.id}-${connection.signal}`}>
                <port
                  name={getTargetBreakoutPortName(connection.signal)}
                  direction="down"
                  connectsTo={`.${dsiName} > .${connection.targetPin}`}
                />
              </Fragment>
            )),
          )}
        {getSignalConnectionsForTarget("dsi").map((connection) => (
          <Fragment key={`DSI_BREAKOUT_${connection.signal}`}>
            <breakoutpoint
              connection={`.${getTargetBreakoutPortName(connection.signal)}`}
              pcbX={
                dsiBreakoutXBySignal[
                  connection.signal as keyof typeof dsiBreakoutXBySignal
                ]
              }
              pcbY={-peripheralBreakoutGeometry.dsi.height / 2 + 0.0001}
            />
          </Fragment>
        ))}
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
      </breakout>
      {planeFanoutConnections.map((connection) => {
        const isDirectPlaneDrop = directRkPlaneDropBalls.has(connection.ball)
        const position = isDirectPlaneDrop
          ? getRK3326BallPosition(connection.ball)
          : undefined
        return (
          <trace
            key={connection.traceName}
            name={connection.traceName}
            from={`.${chipName} > .${connection.ball}`}
            to={`net.${connection.netName}`}
            {...(isDirectPlaneDrop
              ? {
                  pcbPathRelativeTo: `.${chipName} > .${connection.ball}`,
                  pcbPath: [
                    {
                      ...position!,
                      via: true,
                      fromLayer: "top" as const,
                      toLayer: connection.layer,
                    },
                  ],
                }
              : { routingPhaseIndex: rk3326JlcpcbFanoutPhaseIndex })}
          />
        )
      })}

      {signalBuses.flatMap((bus) =>
        bus.connections.map((connection) => {
          const traceName = getSignalTraceName(bus.id, connection.signal)
          const targetSelector =
            bus.target === "emmc"
              ? `.${emmcName} > .${connection.targetPin}`
              : `.${targetBreakoutNames[bus.target]} > .${getTargetBreakoutPortName(connection.signal)}`
          return (
            <trace
              key={traceName}
              name={traceName}
              from={`.${chipName} > .${connection.rkBall}`}
              to={targetSelector}
            />
          )
        }),
      )}

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
