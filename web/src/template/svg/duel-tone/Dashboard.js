// -- ./src/template/svg/duel-tone/Dashboard.js
import * as React from 'react'
const SvgDashboard = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      fill="currentColor"
      d="M28.054 9.587 16.001 16.56 3.948 9.587C4.48 8.6 5.254 7.734 6.12 7.254l7.12-3.947c1.52-.853 4-.853 5.52 0l7.12 3.947c.866.48 1.64 1.346 2.173 2.333"
      opacity={0.35}
    />
    <path
      fill="currentColor"
      d="M16 16.56v12.774c-1 0-2-.214-2.76-.64l-7.12-3.947c-1.612-.893-2.932-3.133-2.932-4.973v-7.547c0-.853.293-1.787.76-2.64z"
      opacity={0.5}
    />
    <path
      fill="currentColor"
      d="M28.814 12.227v7.547c0 1.84-1.32 4.08-2.933 4.973l-7.12 3.947c-.76.426-1.76.64-2.76.64V16.56l12.053-6.973c.467.853.76 1.787.76 2.64"
    />
  </svg>
)
export default SvgDashboard
