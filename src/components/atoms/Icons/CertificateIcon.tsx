import * as React from 'react';
import Svg, {Path, Mask, G} from 'react-native-svg';

function CertificateIcon() {
  return (
    <Svg
      width={20}
      height={21}
      viewBox="0 0 20 21"
      fill="none"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.095 14.645H7.078a.625.625 0 010-1.25h6.017a.625.625 0 010 1.25zM13.095 11.156H7.078a.625.625 0 010-1.25h6.017a.625.625 0 010 1.25zM9.374 7.676H7.078a.625.625 0 010-1.25h2.296a.625.625 0 010 1.25z"
        fill="#000"
      />
      <Mask
        id="a"
        // style={{
        //   maskType: "alpha"
        // }}
        maskUnits="userSpaceOnUse"
        x={2}
        y={2}
        width={16}
        height={17}>
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.5 2.167h15.137v16.591H2.5V2.167z"
          fill="#fff"
        />
      </Mask>
      <G mask="url(#a)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.258 3.417L6.85 3.42c-1.94.012-3.1 1.212-3.1 3.211v7.663c0 2.013 1.17 3.215 3.13 3.215l6.407-.003c1.94-.012 3.1-1.213 3.1-3.212V6.631c0-2.012-1.17-3.214-3.13-3.214zM6.88 18.759c-2.62 0-4.381-1.794-4.381-4.465V6.631c0-2.694 1.706-4.445 4.346-4.46l6.41-.004h.002c2.62 0 4.38 1.794 4.38 4.464v7.663c0 2.694-1.706 4.445-4.346 4.462l-6.411.003z"
          fill="#000"
        />
      </G>
    </Svg>
  );
}

export default CertificateIcon;
