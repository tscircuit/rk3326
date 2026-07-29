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
