// -- ./src/template/svg/duel-tone/BarLeft.js
import * as React from 'react'
const SvgBarLeft = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      fill="currentColor"
      d="M18.333 6.509v.575H7.5V1.667h5.992c3.033 0 4.841 1.808 4.841 4.842"
      opacity={0.35}
    />
    <path
      fill="currentColor"
      d="M18.333 12.917v.575c0 3.033-1.808 4.842-4.841 4.842H7.5v-5.417z"
      opacity={0.5}
    />
    <path
      fill="currentColor"
      d="M7.5 1.667v16.667h-.992c-3.033 0-4.841-1.809-4.841-4.842V6.509c0-3.034 1.808-4.842 4.841-4.842z"
    />
    <path
      fill="currentColor"
      d="M18.333 7.083H7.5v5.833h10.833z"
      opacity={0.6}
    />
  </svg>
)
export default SvgBarLeft
