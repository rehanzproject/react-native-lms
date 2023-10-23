import * as React from "react"
import Svg, { Path, Mask, G } from "react-native-svg"

function MyCourseIcon() {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.716 16.974h-7.22a.75.75 0 010-1.5h7.22a.75.75 0 010 1.5zM15.716 12.787h-7.22a.75.75 0 010-1.5h7.22a.75.75 0 010 1.5zM11.251 8.61H8.496a.75.75 0 010-1.5h2.755a.75.75 0 010 1.5z"
        fill="#000"
      />
      <Mask
        id="a"
        maskUnits="userSpaceOnUse"
        x={3}
        y={2}
        width={19}
        height={20}
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3 2h18.165v19.91H3V2z"
          fill="#fff"
        />
      </Mask>
      <G mask="url(#a)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.909 3.5l-7.689.004C5.892 3.518 4.5 4.958 4.5 7.357v9.196c0 2.415 1.405 3.857 3.756 3.857l7.689-.003c2.328-.014 3.72-1.456 3.72-3.854V7.357c0-2.415-1.404-3.857-3.756-3.857zM8.257 21.91C5.113 21.91 3 19.757 3 16.553V7.357c0-3.233 2.047-5.334 5.215-5.353L15.908 2h.001c3.144 0 5.256 2.153 5.256 5.357v9.196c0 3.232-2.047 5.334-5.215 5.354l-7.693.003z"
          fill="#000"
        />
      </G>
    </Svg>
  )
}

export default MyCourseIcon
