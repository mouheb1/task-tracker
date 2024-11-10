// -- ./src/template/svg/layout/Horizontal.js
import * as React from 'react'
const SvgHorizontal = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 112 72"
    {...props}
  >
    <rect
      width={102}
      height={8}
      x={5}
      y={4}
      className="horizontal_svg__svg-slate-200"
      rx={1}
    />
    <rect
      width={39}
      height={17}
      x={5}
      y={16}
      className="horizontal_svg__svg-slate-200"
      rx={1}
    />
    <rect
      width={59}
      height={17}
      x={48}
      y={16}
      className="horizontal_svg__svg-slate-200"
      rx={1}
    />
    <rect
      width={102}
      height={23}
      x={5}
      y={37}
      className="horizontal_svg__svg-slate-200"
      rx={1}
    />
    <rect
      width={102}
      height={4}
      x={5}
      y={64}
      className="horizontal_svg__svg-slate-200"
      rx={1}
    />
    <circle cx={11} cy={8} r={2} className="horizontal_svg__svg-slate-300" />
    <circle cx={89} cy={8} r={2} className="horizontal_svg__svg-slate-300" />
    <circle cx={95} cy={8} r={2} className="horizontal_svg__svg-slate-300" />
    <circle cx={101} cy={8} r={2} className="horizontal_svg__svg-slate-300" />
  </svg>
)
export default SvgHorizontal
