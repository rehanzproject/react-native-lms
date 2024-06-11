import * as React from "react"
import Svg, { G, Circle, Path } from "react-native-svg"

function CheckIcon() {
  return (
    <Svg width={25} height={25} >
      <G fill="#fff" transform="translate(4.482 -1032.309)">
        <Circle
          cx={37.045}
          cy={28.409}
          r={12.5}
          fill="#50b748"
          fillRule="evenodd"
          transform="translate(-29.027 1016.4)"
        />
        <Path
          d="M8 1C4.14 1 1 4.14 1 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm0 1c3.32 0 6 2.68 6 6s-2.68 6-6 6-6-2.68-6-6 2.68-6 6-6zm3.146 3.146L6.5 9.791 4.855 8.146l-.709.708L6.5 11.207l5.355-5.353-.709-.708z"
          transform="translate(.518 1037.309)"
          
        />
      </G>
    </Svg>
  )
}

export default CheckIcon
