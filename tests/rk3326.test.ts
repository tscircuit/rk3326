import { describe, expect, test } from "bun:test"
import {
  RK3326_BALLS,
  RK3326_PACKAGE,
  RK3326_PIN_FUNCTIONS,
  RK3326_PIN_LABELS,
} from "../src/RK3326"

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
