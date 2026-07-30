import { describe, expect, test } from "bun:test"
import {
  RK3326_BALLS,
  RK3326_PACKAGE,
  RK3326_PIN_FUNCTIONS,
  RK3326_PIN_LABELS,
} from "../src/RK3326"
import {
  getRK3326FanoutBreakoutPoints,
  getRK3326PlaneFanoutConnections,
  RK3326_DEFAULT_SIGNAL_FANOUT_LAYERS,
  RK3326_FANOUT_BUSES,
  RK3326_FANOUT_BUS_IDS,
  RK3326_GROUND_PLANE_LAYER,
  RK3326_INITIAL_FANOUT_BUS_IDS,
  RK3326_POWER_RAIL_NETS,
  RK3326_POWER_PLANE_LAYER,
  RK3326_SUPPLY_PINS,
} from "../src/RK3326Breakout"

describe("RK3326 package", () => {
  test("contains the complete 418-ball population", () => {
    expect(RK3326_BALLS).toHaveLength(418)
    expect(new Set(RK3326_BALLS).size).toBe(418)

    for (const missingBall of RK3326_PACKAGE.missingBalls) {
      expect(RK3326_BALLS).not.toContain(missingBall)
    }
  })

  test("maps every ball to its datasheet function", () => {
    expect(Object.keys(RK3326_PIN_FUNCTIONS)).toHaveLength(418)

    for (const ball of RK3326_BALLS) {
      expect(RK3326_PIN_FUNCTIONS[ball]).toBeTruthy()
    }
  })

  test("exposes ball and function aliases", () => {
    const labels = Object.values(RK3326_PIN_LABELS)

    expect(labels.some((aliases) => aliases.includes("A1"))).toBe(true)
    expect(labels.some((aliases) => aliases.includes("USB_OTG_DP"))).toBe(true)
    expect(labels.some((aliases) => aliases.includes("GPIO0_A0"))).toBe(true)
  })
})

describe("RK3326 initial fanout", () => {
  test("groups the selected high-speed and storage buses", () => {
    const expectedBallCounts = {
      "ddr-data": 44,
      "ddr-command-address": 30,
      emmc: 11,
      sdmmc0: 7,
      sdmmc1: 6,
      "usb-otg": 4,
      "mipi-dsi": 10,
      "mipi-csi": 10,
    }

    expect(RK3326_FANOUT_BUSES).toHaveLength(RK3326_FANOUT_BUS_IDS.length)

    for (const bus of RK3326_FANOUT_BUSES) {
      expect(bus.balls).toHaveLength(expectedBallCounts[bus.id])
    }
  })

  test("creates one breakout point per selected bus ball", () => {
    const breakoutPoints = getRK3326FanoutBreakoutPoints()
    const balls = breakoutPoints.map((point) => point.ball)
    const endpointNames = breakoutPoints.map((point) => point.endpointName)
    const netNames = breakoutPoints.map((point) => point.netName)
    const traceNames = breakoutPoints.map((point) => point.traceName)

    expect(breakoutPoints).toHaveLength(122)
    expect(new Set(balls).size).toBe(122)
    expect(new Set(endpointNames).size).toBe(122)
    expect(new Set(netNames).size).toBe(122)
    expect(new Set(traceNames).size).toBe(122)

    for (const ball of balls) {
      expect(RK3326_BALLS).toContain(ball)
    }
  })

  test("keeps the default fanout to a deterministic first stage", () => {
    const initialPoints = getRK3326FanoutBreakoutPoints(
      RK3326_INITIAL_FANOUT_BUS_IDS,
    )

    expect(RK3326_INITIAL_FANOUT_BUS_IDS).toEqual([
      "emmc",
      "usb-otg",
      "mipi-dsi",
    ])
    expect(initialPoints).toHaveLength(25)
  })

  test("drops every supply ball into its assigned plane layer", () => {
    const planeConnections = getRK3326PlaneFanoutConnections()
    const allBusPlaneConnections = getRK3326PlaneFanoutConnections(
      RK3326_FANOUT_BUS_IDS,
    )
    const groundConnections = planeConnections.filter(
      (connection) => connection.category === "ground",
    )
    const powerConnections = planeConnections.filter(
      (connection) => connection.category === "power",
    )

    expect(RK3326_SUPPLY_PINS).toHaveLength(205)
    expect(planeConnections).toHaveLength(205)
    expect(allBusPlaneConnections).toHaveLength(205)
    expect(new Set(planeConnections.map(({ ball }) => ball)).size).toBe(205)
    expect(
      new Set(planeConnections.map(({ traceName }) => traceName)).size,
    ).toBe(205)

    expect(groundConnections).toHaveLength(154)
    expect(
      groundConnections.every(
        ({ layer, netName }) =>
          layer === RK3326_GROUND_PLANE_LAYER && netName === "GND",
      ),
    ).toBe(true)

    expect(powerConnections).toHaveLength(51)
    expect(
      powerConnections.every(({ layer }) => layer === RK3326_POWER_PLANE_LAYER),
    ).toBe(true)
    expect(
      powerConnections.filter(({ netName }) => netName === "CPU_VDD"),
    ).toHaveLength(9)
    expect(
      powerConnections.filter(({ netName }) => netName === "LOGIC_VDD"),
    ).toHaveLength(9)
    expect(
      powerConnections.filter(({ netName }) => netName === "DDRIO_VDD"),
    ).toHaveLength(13)
    expect(new Set(powerConnections.map(({ netName }) => netName)).size).toBe(
      23,
    )
    expect(RK3326_POWER_RAIL_NETS).toHaveLength(23)
    expect(new Set(RK3326_POWER_RAIL_NETS)).toEqual(
      new Set(powerConnections.map(({ netName }) => netName)),
    )
  })

  test("reserves both plane layers from signal fanout", () => {
    expect(RK3326_DEFAULT_SIGNAL_FANOUT_LAYERS).toEqual([
      "top",
      "inner3",
      "inner4",
      "bottom",
    ])
    expect(RK3326_DEFAULT_SIGNAL_FANOUT_LAYERS).not.toContain(
      RK3326_GROUND_PLANE_LAYER,
    )
    expect(RK3326_DEFAULT_SIGNAL_FANOUT_LAYERS).not.toContain(
      RK3326_POWER_PLANE_LAYER,
    )
  })
})
