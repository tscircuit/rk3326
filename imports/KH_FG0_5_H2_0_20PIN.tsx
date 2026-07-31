import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["pin2"],
  pin3: ["pin3"],
  pin4: ["pin4"],
  pin5: ["pin5"],
  pin6: ["pin6"],
  pin7: ["pin7"],
  pin8: ["pin8"],
  pin9: ["pin9"],
  pin10: ["pin10"],
  pin11: ["pin11"],
  pin12: ["pin12"],
  pin13: ["pin13"],
  pin14: ["pin14"],
  pin15: ["pin15"],
  pin16: ["pin16"],
  pin17: ["pin17"],
  pin18: ["pin18"],
  pin19: ["pin19"],
  pin20: ["pin20"],
  pin21: ["pin21"],
  pin22: ["pin22"],
} as const

export const KH_FG0_5_H2_0_20PIN = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      supplierPartNumbers={{
        jlcpcb: ["C2797211"],
      }}
      manufacturerPartNumber="KH-FG0.5-H2.0-20PIN"
      footprint={
        <footprint>
          <smtpad
            portHints={["pin20"]}
            pcbX="-4.749927mm"
            pcbY="1.14991515mm"
            width="0.2999994mm"
            height="1.7999964mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin19"]}
            pcbX="-4.249801mm"
            pcbY="1.14991515mm"
            width="0.2999994mm"
            height="1.7999964mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin18"]}
            pcbX="-3.749929mm"
            pcbY="1.14991515mm"
            width="0.2999994mm"
            height="1.7999964mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin17"]}
            pcbX="-3.249803mm"
            pcbY="1.14991515mm"
            width="0.2999994mm"
            height="1.7999964mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin16"]}
            pcbX="-2.749931mm"
            pcbY="1.14991515mm"
            width="0.2999994mm"
            height="1.7999964mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin15"]}
            pcbX="-2.249805mm"
            pcbY="1.14991515mm"
            width="0.2999994mm"
            height="1.7999964mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin14"]}
            pcbX="-1.749933mm"
            pcbY="1.14991515mm"
            width="0.2999994mm"
            height="1.7999964mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin13"]}
            pcbX="-1.249807mm"
            pcbY="1.14991515mm"
            width="0.2999994mm"
            height="1.7999964mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin22"]}
            pcbX="6.449949mm"
            pcbY="-1.29991485mm"
            width="1.999996mm"
            height="1.499997mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin21"]}
            pcbX="-6.449949mm"
            pcbY="-1.29991485mm"
            width="1.999996mm"
            height="1.499997mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin12"]}
            pcbX="-0.749935mm"
            pcbY="1.14991515mm"
            width="0.2999994mm"
            height="1.7999964mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin11"]}
            pcbX="-0.250063mm"
            pcbY="1.14991515mm"
            width="0.2999994mm"
            height="1.7999964mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin10"]}
            pcbX="0.250063mm"
            pcbY="1.14991515mm"
            width="0.2999994mm"
            height="1.7999964mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin9"]}
            pcbX="0.749935mm"
            pcbY="1.14991515mm"
            width="0.2999994mm"
            height="1.7999964mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin8"]}
            pcbX="1.250061mm"
            pcbY="1.14991515mm"
            width="0.2999994mm"
            height="1.7999964mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin7"]}
            pcbX="1.749933mm"
            pcbY="1.14991515mm"
            width="0.2999994mm"
            height="1.7999964mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin6"]}
            pcbX="2.250059mm"
            pcbY="1.14991515mm"
            width="0.2999994mm"
            height="1.7999964mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin5"]}
            pcbX="2.749931mm"
            pcbY="1.14991515mm"
            width="0.2999994mm"
            height="1.7999964mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin4"]}
            pcbX="3.250057mm"
            pcbY="1.14991515mm"
            width="0.2999994mm"
            height="1.7999964mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin3"]}
            pcbX="3.749929mm"
            pcbY="1.14991515mm"
            width="0.2999994mm"
            height="1.7999964mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin2"]}
            pcbX="4.250055mm"
            pcbY="1.14991515mm"
            width="0.2999994mm"
            height="1.7999964mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin1"]}
            pcbX="4.749927mm"
            pcbY="1.14991515mm"
            width="0.2999994mm"
            height="1.7999964mm"
            shape="rect"
          />
          <silkscreenpath
            route={[
              { x: -5.13107940000009, y: 0.5499671500001568 },
              { x: -7.200112600000125, y: 0.5499671500001568 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: 7.199909399999797, y: 0.5499671500001568 },
              { x: 5.131104800000003, y: 0.5499671500001568 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: 7.199909399999797, y: -0.31881444999987707 },
              { x: 7.199909399999797, y: 0.5499671500001568 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: 7.199909399999797, y: -4.450048250000009 },
              { x: 7.199909399999797, y: -2.2811168499998757 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: -7.200112600000125, y: -0.31881444999987707 },
              { x: -7.200112600000125, y: 0.5499671500001568 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: -7.200112600000125, y: -4.450048250000009 },
              { x: -7.200112600000125, y: -2.2811168499998757 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: 7.199909399999797, y: -4.450048250000009 },
              { x: -7.200112600000125, y: -4.450048250000009 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: 5.6669939999999315, y: 1.2649771500000497 },
              { x: 5.662666579938559, y: 1.2321071312720733 },
              { x: 5.649979226280493, y: 1.2014771500000734 },
              { x: 5.629796561210469, y: 1.1751745887893321 },
              { x: 5.603493999999955, y: 1.1549919237195354 },
              { x: 5.5728640187278415, y: 1.1423045700614693 },
              { x: 5.539993999999979, y: 1.137977150000097 },
              { x: 5.507123981271889, y: 1.1423045700614693 },
              { x: 5.476494000000002, y: 1.1549919237195354 },
              { x: 5.450191438789034, y: 1.1751745887893321 },
              { x: 5.430008773719464, y: 1.2014771500000734 },
              { x: 5.417321420061171, y: 1.2321071312720733 },
              { x: 5.412993999999799, y: 1.2649771500000497 },
              { x: 5.417321420061171, y: 1.2978471687281399 },
              { x: 5.430008773719464, y: 1.328477150000026 },
              { x: 5.450191438789034, y: 1.3547797112107673 },
              { x: 5.476494000000002, y: 1.3749623762806777 },
              { x: 5.507123981271889, y: 1.3876497299388575 },
              { x: 5.539993999999979, y: 1.3919771500000024 },
              { x: 5.5728640187278415, y: 1.3876497299388575 },
              { x: 5.603493999999955, y: 1.3749623762806777 },
              { x: 5.629796561210469, y: 1.3547797112107673 },
              { x: 5.649979226280493, y: 1.328477150000026 },
              { x: 5.662666579938559, y: 1.2978471687281399 },
              { x: 5.6669939999999315, y: 1.2649771500000497 },
            ]}
          />
          <silkscreentext
            text="{NAME}"
            pcbX="0.002159mm"
            pcbY="3.05415515mm"
            anchorAlignment="center"
            fontSize="1mm"
          />
          <courtyardoutline
            outline={[
              { x: -7.70274100000006, y: 2.3041551500000423 },
              { x: 7.707058999999845, y: 2.3041551500000423 },
              { x: 7.707058999999845, y: -4.69824484999981 },
              { x: -7.70274100000006, y: -4.69824484999981 },
              { x: -7.70274100000006, y: 2.3041551500000423 },
            ]}
          />
        </footprint>
      }
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C2797211.obj?uuid=07f7e3ecc97849cc9fc6d117d1b141f2",
        stepUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C2797211.step?uuid=07f7e3ecc97849cc9fc6d117d1b141f2",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: -1.1499647499999357, z: 0 },
      }}
      {...props}
    />
  )
}
