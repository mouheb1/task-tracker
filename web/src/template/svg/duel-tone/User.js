// -- ./src/template/svg/duel-tone/Client.js
import * as React from 'react'
const SvgClient = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="currentColor"
      d="M8 8a3.333 3.333 0 1 0 0-6.667A3.333 3.333 0 0 0 8 8"
      opacity={0.35}
    />
    <path
      fill="currentColor"
      d="M8 9.667c-3.34 0-6.06 2.24-6.06 5a.33.33 0 0 0 .333.333h11.453a.33.33 0 0 0 .333-.333c0-2.76-2.72-5-6.06-5"
    />
  </svg>
)
export default SvgClient
