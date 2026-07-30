import { RK3326Breakout } from "./src/RK3326Breakout"

export default () => (
  <board
    width="40mm"
    height="40mm"
    layers={6}
    minTraceWidth="0.09mm"
    minTraceToPadEdgeClearance="0.075mm"
    minViaPadDiameter="0.25mm"
    minViaHoleDiameter="0.10mm"
    minViaEdgeToPadEdgeClearance="0.075mm"
  >
    <RK3326Breakout name="RK3326_FANOUT" chipName="U1" pcbX={0} pcbY={0} />
  </board>
)
