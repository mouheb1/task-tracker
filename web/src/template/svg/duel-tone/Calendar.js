// -- ./src/template/svg/duel-tone/Calendar.js
import * as React from 'react'
const SvgCalendar = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      fill="currentColor"
      d="M5.8 1.667c.348 0 .63.258.63.577v1.165c.558-.01 1.185-.01 1.89-.01h3.36c.705 0 1.33 0 1.89.01V2.244c0-.319.282-.577.63-.577s.63.258.63.577v1.215c1.208.088 2.003.306 2.586.84s.82 1.26.917 2.368V7.5H1.667v-.833c.096-1.108.334-1.833.917-2.368.584-.534 1.377-.752 2.586-.84V2.244c0-.319.283-.577.63-.577"
    />
    <path
      fill="currentColor"
      d="M18.333 11.667V10c0-.7-.01-1.946-.021-2.5H1.672c-.011.554 0 1.8 0 2.5v1.667c0 3.142 0 4.714.975 5.69.977.976 2.548.976 5.69.976h3.333c3.142 0 4.712 0 5.688-.976.975-.976.975-2.548.975-5.69"
      opacity={0.35}
    />
    <path
      fill="currentColor"
      d="M15 13.75a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0"
    />
  </svg>
)
export default SvgCalendar
