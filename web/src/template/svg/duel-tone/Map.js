// -- ./src/template/svg/duel-tone/Map.js
import * as React from 'react'
const SvgMap = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      fill="currentColor"
      d="M11.413 4.453V23.56c-.453.013-.906.12-1.24.32L7.04 25.667c-2.187 1.253-3.987.213-3.987-2.32V10.372c0-.84.6-1.88 1.347-2.307l5.773-3.306c.334-.187.787-.294 1.24-.307"
      opacity={0.35}
    />
    <path
      fill="currentColor"
      d="M20.973 8.44v19.107c-.466.013-.92-.067-1.28-.24l-7-3.507c-.36-.173-.813-.253-1.28-.24V4.454c.467-.014.92.066 1.28.24l7 3.506c.36.174.814.254 1.28.24"
    />
    <path
      fill="currentColor"
      d="M29.333 8.653v12.973c0 .84-.6 1.88-1.346 2.307l-5.774 3.307c-.333.186-.786.293-1.24.306V8.44c.454-.014.907-.12 1.24-.32l3.134-1.787c2.186-1.253 3.986-.213 3.986 2.32"
      opacity={0.35}
    />
  </svg>
)
export default SvgMap
