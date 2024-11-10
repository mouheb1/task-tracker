// -- ./src/template/svg/duel-tone/Diamond.js
import * as React from 'react'
const SvgDiamond = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      fill="currentColor"
      d="M10 2.158v9.183l-7.792 5.45c-.708-.841-.75-2.116.042-3.541l2.6-4.675L7.3 4.167c.742-1.334 1.717-2.009 2.7-2.009"
    />
    <path
      fill="currentColor"
      d="M17.792 16.792c-.542.658-1.484 1.05-2.742 1.05H4.95c-1.258 0-2.2-.392-2.742-1.05L10 11.342z"
      opacity={0.5}
    />
    <path
      fill="currentColor"
      d="M17.792 16.792 10 11.342V2.158c.983 0 1.958.675 2.7 2.009l2.45 4.408 2.6 4.675c.792 1.425.75 2.7.042 3.541"
      opacity={0.35}
    />
  </svg>
)
export default SvgDiamond
