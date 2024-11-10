// -- ./src/template/svg/duel-tone/Flag.js
import * as React from 'react'
const SvgFlag = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      fill="currentColor"
      d="M4.292 18.334a.63.63 0 0 1-.625-.625V2.292a.63.63 0 0 1 .625-.625.63.63 0 0 1 .625.625v15.417a.63.63 0 0 1-.625.625"
    />
    <path
      fill="currentColor"
      d="M15.017 10.276 14 9.259a1.16 1.16 0 0 1-.392-.859c-.016-.375.134-.75.409-1.025l1-1c.866-.866 1.191-1.7.916-2.358-.266-.65-1.091-1.008-2.308-1.008H4.292a.33.33 0 0 0-.317.325v10c0 .175.142.316.317.316h9.333c1.2 0 2.008-.366 2.283-1.024.275-.667-.041-1.492-.891-2.35"
      opacity={0.35}
    />
  </svg>
)
export default SvgFlag
