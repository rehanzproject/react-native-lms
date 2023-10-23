import * as React from "react"
import Svg, { Mask, Path, G } from "react-native-svg"

function HelpIcon() {
  return (
    <Svg
      width={20}
      height={21}
      viewBox="0 0 20 21"
      fill="none"
    >
      <Mask
        id="a"
        maskUnits="userSpaceOnUse"
        x={1}
        y={3}
        width={18}
        height={16}
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.668 3h16.678v15.155H1.668V3z"
          fill="#fff"
        />
      </Mask>
      <G mask="url(#a)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.012 4.25c-.397 0-.75.205-.948.55L3.065 15.27c-.195.342-.193.75.005 1.09.197.34.55.545.945.545H16c.394 0 .747-.204.945-.545.198-.34.2-.748.003-1.09L10.96 4.8a1.08 1.08 0 00-.948-.55zM16 18.155H4.015a2.32 2.32 0 01-2.027-1.168 2.318 2.318 0 01-.008-2.338l6-10.471A2.314 2.314 0 0110.012 3h.001c.85 0 1.61.44 2.033 1.18l5.988 10.47c.419.732.417 1.606-.008 2.337A2.32 2.32 0 0116 18.155z"
          fill="#000"
        />
      </G>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.004 12.303a.625.625 0 01-.625-.625V9.095a.625.625 0 011.25 0v2.583c0 .345-.28.625-.625.625zM10.005 15.083a.836.836 0 01-.837-.834c0-.46.37-.833.83-.833h.008a.833.833 0 110 1.667z"
        fill="#000"
      />
    </Svg>
  )
}

export default HelpIcon
