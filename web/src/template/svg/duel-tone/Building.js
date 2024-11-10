// -- ./src/template/svg/duel-tone/Building.js
import * as React from 'react'
const SvgBuilding = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 25 24"
    {...props}
  >
    <path
      fill="currentColor"
      d="M4.17 2.5v11.97c0 .98.46 1.91 1.25 2.5l5.21 3.9c1.11.83 2.64.83 3.75 0l5.21-3.9c.79-.59 1.25-1.52 1.25-2.5V2.5z"
      opacity={0.35}
    />
    <path
      fill="currentColor"
      d="M22.5 3.25h-20c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h20c.41 0 .75.34.75.75s-.34.75-.75.75M16.5 11.5h-8c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h8c.41 0 .75.34.75.75s-.34.75-.75.75"
    />
  </svg>
)
export default SvgBuilding
