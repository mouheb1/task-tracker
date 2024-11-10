// -- ./src/template/svg/layout/Vertical.js
import * as React from 'react'
const SvgVertical = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 112 72"
    {...props}
  >
    <path d="M0 4a4 4 0 0 1 4-4h5v72H4a4 4 0 0 1-4-4zM11 0h17v72H11z" />
    <rect width={75} height={8} x={32} y={4} rx={1} />
    <rect width={24} height={17} x={32} y={16} rx={1} />
    <rect width={48} height={17} x={59} y={16} rx={1} />
    <rect width={75} height={23} x={32} y={37} rx={1} />
    <rect width={75} height={4} x={32} y={64} rx={1} />
    <rect width={4} height={4} x={3} y={6} rx={2} />
    <rect width={13} height={3} x={13} y={6} rx={1.5} />
    <rect width={4} height={4} x={3} y={18} rx={2} />
    <rect width={13} height={3} x={13} y={12} rx={1.5} />
    <rect width={4} height={4} x={3} y={26} rx={2} />
    <rect width={13} height={3} x={13} y={18} rx={1.5} />
    <rect width={4} height={4} x={3} y={34} rx={2} />
    <rect width={13} height={3} x={13} y={24} rx={1.5} />
    <rect width={4} height={4} x={3} y={42} rx={2} />
    <rect width={13} height={3} x={13} y={30} rx={1.5} />
    <circle cx={38} cy={8} r={2} />
    <circle cx={89} cy={8} r={2} />
    <circle cx={95} cy={8} r={2} />
    <circle cx={101} cy={8} r={2} />
  </svg>
)
export default SvgVertical
