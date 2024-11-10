// -- ./src/template/svg/duel-tone/Bell.js
import * as React from 'react'
const SvgBell = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 21"
    {...props}
  >
    <path
      fill="currentColor"
      d="M15.625 8v.587c0 .704.2 1.392.577 1.978l.923 1.436c.843 1.312.2 3.094-1.267 3.508a21.5 21.5 0 0 1-11.716 0c-1.466-.414-2.11-2.196-1.267-3.508l.923-1.436a3.66 3.66 0 0 0 .578-1.978V8c0-3.221 2.518-5.833 5.624-5.833S15.625 4.779 15.625 8"
      opacity={0.35}
    />
    <path
      fill="currentColor"
      d="M10.625 5.5a.625.625 0 0 0-1.25 0v3.333a.625.625 0 0 0 1.25 0zm-4.59 10.454a4.168 4.168 0 0 0 7.928 0 21.5 21.5 0 0 1-7.927 0"
    />
  </svg>
)
export default SvgBell
