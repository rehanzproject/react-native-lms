import * as React from "react"
import Svg, { Path } from "react-native-svg"

function HomeIcon() {
  return (
    <Svg
      width={25}
      height={24}
      viewBox="0 0 25 24"
      fill="none"
    >
      <Path
        d="M11.05 2.533a2.25 2.25 0 012.9 0l6.75 5.695c.508.427.8 1.056.8 1.72v9.802a1.75 1.75 0 01-1.75 1.75h-3A1.75 1.75 0 0115 19.75v-5a.75.75 0 00-.75-.75h-3.5a.75.75 0 00-.75.75v5a1.75 1.75 0 01-1.75 1.75h-3a1.749 1.749 0 01-1.75-1.75V9.947c0-.663.292-1.292.8-1.72l6.75-5.694z"
        fill="#0A58CA"
      />
    </Svg>
  )
}

export default HomeIcon
