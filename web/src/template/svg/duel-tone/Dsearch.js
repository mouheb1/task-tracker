// -- ./src/template/svg/duel-tone/Dsearch.js
import * as React from 'react'
const SvgDsearch = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    fill="none"
    {...props}
  >
    <circle
      cx={10}
      cy={10}
      r={8}
      stroke="currentColor"
      strokeWidth={2}
      opacity={0.35}
    />
    <rect
      width={2}
      height={8}
      x={16}
      y={18.414}
      fill="currentColor"
      rx={1}
      transform="rotate(-45 16 18.414)"
    />
  </svg>
)
export default SvgDsearch
