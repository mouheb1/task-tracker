// -- ./src/template/svg/duel-tone/ChartBar.js
import * as React from 'react'
const SvgChartBar = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      fill="#CBD5E1"
      d="M18.333 18.333H1.667a.63.63 0 0 1-.625-.625.63.63 0 0 1 .625-.625h16.666a.63.63 0 0 1 .625.625.63.63 0 0 1-.625.625"
    />
    <path
      fill="#CBD5E1"
      d="M8.125 3.334v15h3.75v-15c0-.917-.375-1.667-1.5-1.667h-.75c-1.125 0-1.5.75-1.5 1.667"
    />
    <path
      fill="#CBD5E1"
      d="M2.5 8.334v10h3.333v-10c0-.917-.333-1.667-1.333-1.667h-.667c-1 0-1.333.75-1.333 1.667M14.167 12.5v5.833H17.5V12.5c0-.917-.333-1.667-1.333-1.667H15.5c-1 0-1.333.75-1.333 1.667"
      opacity={0.35}
    />
  </svg>
)
export default SvgChartBar
