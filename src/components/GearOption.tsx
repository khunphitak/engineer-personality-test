interface Props {
  size: number
  expression: 'love' | 'smile' | 'neutral' | 'frown' | 'sad'
  color: string
  selected: boolean
  onClick: () => void
}

export default function GearOption({ size, expression, color, selected, onClick }: Props) {
  const cx = 50, cy = 50
  const TEETH = 10
  const innerR = 34       // inner circle (face area) radius
  const baseR = 39        // gear body radius (where teeth start from)
  const tipR = 48         // gear teeth tip radius
  const toothHalfAngle = 10  // degrees — half-width of each tooth
  const gapHalfAngle = (360 / TEETH / 2) - toothHalfAngle

  // Build gear outline using a SVG path with teeth
  let path = ''
  for (let i = 0; i < TEETH; i++) {
    const centerAngle = (i * 360 / TEETH) - 90 // start at top
    const a1 = (centerAngle - toothHalfAngle - gapHalfAngle) * Math.PI / 180  // valley start (next side)
    const a2 = (centerAngle - toothHalfAngle) * Math.PI / 180                  // tooth base left
    const a3 = (centerAngle - toothHalfAngle + 1) * Math.PI / 180              // tooth tip left
    const a4 = (centerAngle + toothHalfAngle - 1) * Math.PI / 180              // tooth tip right
    const a5 = (centerAngle + toothHalfAngle) * Math.PI / 180                  // tooth base right
    const a6 = (centerAngle + toothHalfAngle + gapHalfAngle) * Math.PI / 180   // valley end

    const p2 = [cx + baseR * Math.cos(a2), cy + baseR * Math.sin(a2)]
    const p3 = [cx + tipR  * Math.cos(a3), cy + tipR  * Math.sin(a3)]
    const p4 = [cx + tipR  * Math.cos(a4), cy + tipR  * Math.sin(a4)]
    const p5 = [cx + baseR * Math.cos(a5), cy + baseR * Math.sin(a5)]
    const p6 = [cx + baseR * Math.cos(a6), cy + baseR * Math.sin(a6)]

    if (i === 0) {
      const p1 = [cx + baseR * Math.cos(a1 + (gapHalfAngle + toothHalfAngle) * Math.PI / 180), cy + baseR * Math.sin(a1 + (gapHalfAngle + toothHalfAngle) * Math.PI / 180)]
      path += `M ${p1[0]} ${p1[1]} `
    }
    path += `L ${p2[0]} ${p2[1]} L ${p3[0]} ${p3[1]} L ${p4[0]} ${p4[1]} L ${p5[0]} ${p5[1]} A ${baseR} ${baseR} 0 0 1 ${p6[0]} ${p6[1]} `
  }
  path += 'Z'

  // Face elements
  const eyes = (
    <>
      <circle cx={cx - 9} cy={cy - 4} r="2.2" fill={color}/>
      <circle cx={cx + 9} cy={cy - 4} r="2.2" fill={color}/>
    </>
  )

  let mouth: JSX.Element
  switch (expression) {
    case 'love':
      mouth = <path d={`M ${cx - 11} ${cy + 6} Q ${cx} ${cy + 20} ${cx + 11} ${cy + 6}`} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
      break
    case 'smile':
      mouth = <path d={`M ${cx - 8} ${cy + 7} Q ${cx} ${cy + 14} ${cx + 8} ${cy + 7}`} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round"/>
      break
    case 'neutral':
      mouth = <line x1={cx - 7} y1={cy + 9} x2={cx + 7} y2={cy + 9} stroke={color} strokeWidth="2.2" strokeLinecap="round"/>
      break
    case 'frown':
      mouth = <path d={`M ${cx - 8} ${cy + 12} Q ${cx} ${cy + 5} ${cx + 8} ${cy + 12}`} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round"/>
      break
    case 'sad':
      mouth = <path d={`M ${cx - 11} ${cy + 14} Q ${cx} ${cy} ${cx + 11} ${cy + 14}`} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
      break
  }

  return (
    <button
      onClick={onClick}
      className="group flex-shrink-0 transition-all duration-200 hover:scale-110 active:scale-95"
      style={{ width: size, height: size }}
      aria-label={expression}
    >
      <svg viewBox="0 0 100 100" width={size} height={size} style={{ overflow: 'visible' }}>
        <g style={{ transformOrigin: '50px 50px' }} className="group-hover:rotate-[18deg] transition-transform duration-500">
          {/* Gear outline */}
          <path d={path} stroke={color} strokeWidth="2" fill={selected ? color + '12' : 'white'} strokeLinejoin="round"/>
          {/* Inner circle */}
          <circle cx={cx} cy={cy} r={innerR} fill="none" stroke={color} strokeWidth="1.2" opacity="0.45"/>
        </g>
        {/* Face stays upright */}
        {eyes}
        {mouth}
      </svg>
    </button>
  )
}
