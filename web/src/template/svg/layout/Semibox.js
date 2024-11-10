// -- ./src/template/svg/layout/Semibox.js
import * as React from 'react'
const SvgSemibox = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 112 72"
    {...props}
  >
    <path
      d="M4 8a4 4 0 0 1 4-4h18v64H8a4 4 0 0 1-4-4z"
      className="semibox_svg__svg-slate-200"
    />
    <rect
      width={77}
      height={8}
      x={30}
      y={4}
      className="semibox_svg__svg-slate-200"
      rx={1}
    />
    <rect
      width={25}
      height={17}
      x={30}
      y={16}
      className="semibox_svg__svg-slate-200"
      rx={1}
    />
    <rect
      width={48}
      height={17}
      x={59}
      y={16}
      className="semibox_svg__svg-slate-200"
      rx={1}
    />
    <rect
      width={77}
      height={23}
      x={30}
      y={37}
      className="semibox_svg__svg-slate-200"
      rx={1}
    />
    <rect
      width={77}
      height={4}
      x={30}
      y={64}
      className="semibox_svg__svg-slate-200"
      rx={1}
    />
    <rect
      width={10}
      height={9}
      x={10}
      y={10}
      className="semibox_svg__svg-slate-300"
      rx={2}
    />
    <rect
      width={18}
      height={4}
      x={6}
      y={28}
      className="semibox_svg__svg-slate-300"
      rx={1}
    />
    <rect
      width={18}
      height={4}
      x={6}
      y={36}
      className="semibox_svg__svg-slate-300"
      rx={1}
    />
    <rect
      width={18}
      height={4}
      x={6}
      y={44}
      className="semibox_svg__svg-slate-300"
      rx={1}
    />
    <rect
      width={18}
      height={4}
      x={6}
      y={52}
      className="semibox_svg__svg-slate-300"
      rx={1}
    />
    <circle cx={36} cy={8} r={2} className="semibox_svg__svg-slate-300" />
    <circle cx={89} cy={8} r={2} className="semibox_svg__svg-slate-300" />
    <circle cx={95} cy={8} r={2} className="semibox_svg__svg-slate-300" />
    <circle cx={101} cy={8} r={2} className="semibox_svg__svg-slate-300" />
  </svg>
)
export default SvgSemibox
