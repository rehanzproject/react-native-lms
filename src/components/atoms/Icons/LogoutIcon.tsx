import * as React from 'react';
import Svg, {Path, Mask, G} from 'react-native-svg';

function LogoutIcon() {
  return (
    <Svg width={20} height={21} viewBox="0 0 20 21" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.434 18.834H5.362a3.7 3.7 0 01-3.694-3.696V5.864a3.7 3.7 0 013.694-3.697h4.063a3.7 3.7 0 013.696 3.697v.776a.625.625 0 01-1.25 0v-.776a2.449 2.449 0 00-2.446-2.447H5.362a2.448 2.448 0 00-2.444 2.447v9.274a2.448 2.448 0 002.444 2.446h4.072a2.44 2.44 0 002.437-2.437v-.786a.625.625 0 011.25 0v.786a3.691 3.691 0 01-3.687 3.687z"
        fill="#000"
      />
      <Mask id="a" maskUnits="userSpaceOnUse" x={7} y={9} width={12} height={3}>
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.496 9.875H18.78v1.25H7.496v-1.25z"
          fill="#fff"
        />
      </Mask>
      <G mask="url(#a)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.155 11.125H8.121a.625.625 0 010-1.25h10.034a.625.625 0 010 1.25z"
          fill="#000"
        />
      </G>
      <Mask id="b" maskUnits="userSpaceOnUse" x={15} y={7} width={4} height={7}>
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.094 7.446h3.69v6.11h-3.69v-6.11z"
          fill="#fff"
        />
      </Mask>
      <G mask="url(#b)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.719 13.555a.625.625 0 01-.44-1.067l1.994-1.988-1.995-1.986a.624.624 0 11.881-.885l2.44 2.429a.622.622 0 010 .885l-2.44 2.43a.622.622 0 01-.44.182z"
          fill="#000"
        />
      </G>
    </Svg>
  );
}

export default LogoutIcon;
