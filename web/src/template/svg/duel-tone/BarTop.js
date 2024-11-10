// -- ./src/template/svg/duel-tone/BarTop.js
import * as React from 'react'
const SvgBarTop = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      fill="currentColor"
      d="M10 8.333v10H6.508c-3.033 0-4.841-1.808-4.841-4.842V8.333z"
      opacity={0.35}
    />
    <path
      fill="currentColor"
      d="M18.333 6.509v1.825H1.667V6.509c0-3.034 1.808-4.842 4.841-4.842h6.984c3.033 0 4.841 1.808 4.841 4.842"
    />
    <path
      fill="currentColor"
      d="M18.333 8.333v5.158c0 3.034-1.808 4.842-4.841 4.842H10v-10z"
      opacity={0.5}
    />
  </svg>
)
export default SvgBarTop
