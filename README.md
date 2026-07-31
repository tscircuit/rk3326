# RK3326 for tscircuit

A reusable Rockchip RK3326 component with a datasheet-derived TFBGA418L land
pattern.

## Package

- 14 mm x 14 mm body
- 21 x 21 grid
- 0.65 mm ball pitch
- 418 populated ball positions
- 0.30 mm circular PCB pads
- LCSC part number: C5182195

The footprint geometry and missing-ball pattern are derived from the Rockchip
RK3326 Datasheet Rev 1.4. The datasheet shows the package bottom view; this
component converts it to the PCB top-view convention, with A1 at the upper-left.

### Supplier catalog naming

LCSC labels C5182195 as `TFBGA-395L`, matching the heading in the older Rev 1.1
datasheet. That same Rev 1.1 package drawing explicitly calls out 418 balls, and
its 418-entry ball list is identical to Rev 1.4. This component follows the
actual drawing and ball list rather than the inconsistent `395L` label.

## Usage

```tsx
import { RK3326 } from "@tsci/tscircuit.rk3326"

export default () => (
  <board width="24mm" height="24mm">
    <RK3326 name="U1" pcbX={0} pcbY={0} />
  </board>
)
```

Every populated ball is available as a selector such as `.U1 > .A1` or
`.U1 > .AA21`. The full Rev 1.4 pin-function table is included, so functional
selectors such as `.U1 > .USB_OTG_DP` and `.U1 > .GPIO0_A0` also work.

### Initial bus fanout

`RK3326Breakout` places the chip inside tscircuit's native `<breakout>`. Named
`<bus>` groups route signals to 122 stable boundary handoff pads:

- DDR data/masks/strobes on the left
- DDR command/address/clock on the top
- eMMC, SDMMC0, SDMMC1, and USB OTG on the right
- MIPI DSI/LVDS transmit on the top
- MIPI CSI receive on the right

The default build starts with 25 representative eMMC, USB OTG, and MIPI DSI
signals. SDMMC0/1, MIPI CSI, DDR data, and DDR command/address are mapped as
opt-in follow-on groups so the fanout can be validated in deterministic stages.

All 205 supply balls are included in every stage:

- 154 ground balls terminate on `inner1`
- 51 power balls terminate on `inner2`
- replicated CPU, logic, and DDR supply pins share their named rail
- unrelated I/O, PLL, MIPI, USB, ADC, OTP, and PMU rails remain electrically
  distinct

The power rails share a routing layer, not a net. A downstream board design must
create the appropriate isolated copper regions for the 23 named power nets on
`inner2`.

The breakout declares that plane intent once through the fanout phase:

```tsx
<autoroutingphase
  autorouter="fanout"
  fanoutPourNetMap={{
    inner1: "GND",
    inner2: RK3326_POWER_RAIL_NETS,
  }}
/>
```

There is no singleton bus per supply ball. The fanout router recognizes each
source-only supply trace from its net and drops it to the mapped layer. In a
board design with matching `<copperpour>` components, the same layer-to-net
intent can be inferred without specifying `fanoutPourNetMap`.

```tsx
import { RK3326Breakout } from "@tsci/tscircuit.rk3326"

export default () => (
  <board width="40mm" height="40mm" layers={6}>
    <RK3326Breakout name="RK3326_FANOUT" chipName="U1" />
  </board>
)
```

The exported `RK3326_FANOUT_BUSES` metadata can be used to build connectors or
downstream routing one interface at a time. Pass a subset with
`buses={["emmc", "usb-otg"]}` when iterating on a smaller escape problem, or
add `"ddr-data"` and `"ddr-command-address"` for the DDR stage.

The fanout phase reserves `inner1` and `inner2` for the supply planes. Signal
escapes default to `top`, `inner3`, `inner4`, and `bottom`; a deeper stack can
override those with `signalFanoutLayers`.

The included 0.09 mm traces and 0.25/0.10 mm via pad/hole are preliminary HDI
constraints for the 0.65 mm-pitch BGA. Confirm the microvia stack and
fabrication tolerances with the board manufacturer before production.

### Concrete JLCPCB breakout

`RK3326JlcpcbBreakout` replaces the generic boundary handoff pads for the
initial buses with exact JLCPCB-imported parts:

| Interface | Part                                   | LCSC     |
| --------- | -------------------------------------- | -------- |
| eMMC 5.1  | Samsung KLM8G1GETF-B041, 8 GB BGA153   | C499918  |
| USB OTG   | Amphenol 10118194-0001LF Micro-USB B   | C132563  |
| MIPI DSI  | KH-FG0.5-H2.0-20PIN, 20-pin 0.5 mm FPC | C2797211 |

```tsx
import { RK3326JlcpcbBreakout } from "@tsci/tscircuit.rk3326"

export default () => (
  <board width="56mm" height="50mm" layers={6}>
    <RK3326JlcpcbBreakout name="RK3326_FANOUT" chipName="U1" />
  </board>
)
```

The routed interfaces are the eight eMMC data signals plus CLK, CMD, and RSTN;
USB OTG VBUS, ID, D+, and D-; and four MIPI DSI data lanes plus its clock lane.
The eMMC signal balls use via-in-pad microvias to `inner3` and `inner4`. Its
VSS balls drop to `inner1`, while VCC and VCCQ drop to `inner2`. The connector
ground pins and RK3326 supply balls use the same declared plane destinations.

The imported footprints are exact catalog geometry rather than fabrication
approval. The 0.10/0.25 mm microvia hole/pad pair and via-in-pad construction
require an HDI stackup and should be confirmed with the fabricator before
production.

`RK3326_SUPPLIER_PART_NUMBERS` exports the known LCSC catalog reference
separately. It is not attached to the component by default because the
tscircuit/JLCPCB importer does not currently return a usable footprint for
C5182195.

The component deliberately has no single 418-pin schematic box. A practical
RK3326 design should split the processor across hierarchical functional blocks
for power, DDR, storage, display, camera, USB, and GPIO.

## Verification

```sh
bun run test
```

This runs unit tests, TypeScript checking, a full tscircuit build with preview
images, and the generated-circuit footprint validator. Build artifacts are
written under `dist/index/`.
