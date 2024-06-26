import * as React from "react"
import Svg, { Path } from "react-native-svg"

function FilledStarIcon() {
  return (
    <Svg
      width={20}
      height={19}
      viewBox="0 0 20 19"
      fill="none"
    >
      <Path
        d="M9.049.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.539 1.118l-3.975-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118L1.077 8.101c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69L9.05.927z"
        fill="#FFD60A"
      />
    </Svg>
  )
}

export default FilledStarIcon
