// -- ./src/template/svg/duel-tone/Components.js
import * as React from 'react'
const SvgComponents = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      fill="currentColor"
      d="M18.667 21.333A7.93 7.93 0 0 1 16 27.28a7.9 7.9 0 0 1-5.333 2.053c-4.414 0-8-3.586-8-8 0-3.68 2.506-6.8 5.893-7.72a8.03 8.03 0 0 0 5.333 4.774 7.8 7.8 0 0 0 2.107.28 7.8 7.8 0 0 0 2.107-.28c.36.906.56 1.906.56 2.946"
      opacity={0.5}
    />
    <path
      fill="currentColor"
      d="M24 10.667c0 1.04-.2 2.04-.56 2.947a8.03 8.03 0 0 1-5.333 4.773 7.8 7.8 0 0 1-2.107.28c-.733 0-1.44-.093-2.107-.28a8.03 8.03 0 0 1-5.333-4.773A8 8 0 0 1 8 10.667c0-4.413 3.587-8 8-8s8 3.587 8 8"
    />
    <path
      fill="currentColor"
      d="M29.333 21.333c0 4.414-3.586 8-8 8A7.9 7.9 0 0 1 16 27.28a7.93 7.93 0 0 0 2.667-5.947c0-1.04-.2-2.04-.56-2.946a8.03 8.03 0 0 0 5.333-4.774c3.387.92 5.893 4.04 5.893 7.72"
      opacity={0.35}
    />
  </svg>
)
export default SvgComponents
