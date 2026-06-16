interface Props {
  typeId: string
  size?: number
}

export default function TypeAvatar({ typeId, size = 120 }: Props) {
  const s = size

  if (typeId === 'architect') {
    return (
      <svg width={s} height={s} viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="60" r="56" fill="white" fillOpacity="0.15"/>
        {/* Blueprint grid */}
        <line x1="20" y1="40" x2="100" y2="40" stroke="white" strokeWidth="1" strokeOpacity="0.4"/>
        <line x1="20" y1="60" x2="100" y2="60" stroke="white" strokeWidth="1" strokeOpacity="0.4"/>
        <line x1="20" y1="80" x2="100" y2="80" stroke="white" strokeWidth="1" strokeOpacity="0.4"/>
        <line x1="40" y1="20" x2="40" y2="100" stroke="white" strokeWidth="1" strokeOpacity="0.4"/>
        <line x1="60" y1="20" x2="60" y2="100" stroke="white" strokeWidth="1" strokeOpacity="0.4"/>
        <line x1="80" y1="20" x2="80" y2="100" stroke="white" strokeWidth="1" strokeOpacity="0.4"/>
        {/* Building */}
        <rect x="38" y="48" width="44" height="40" fill="white" fillOpacity="0.9" rx="2"/>
        <rect x="44" y="30" width="32" height="20" fill="white" fillOpacity="0.7" rx="2"/>
        <rect x="52" y="18" width="16" height="14" fill="white" fillOpacity="0.5" rx="2"/>
        {/* Windows */}
        <rect x="44" y="54" width="8" height="8" rx="1" fill="#6B46C1" fillOpacity="0.6"/>
        <rect x="56" y="54" width="8" height="8" rx="1" fill="#6B46C1" fillOpacity="0.6"/>
        <rect x="68" y="54" width="8" height="8" rx="1" fill="#6B46C1" fillOpacity="0.6"/>
        <rect x="44" y="68" width="8" height="8" rx="1" fill="#6B46C1" fillOpacity="0.6"/>
        <rect x="68" y="68" width="8" height="8" rx="1" fill="#6B46C1" fillOpacity="0.6"/>
        {/* Door */}
        <rect x="54" y="76" width="12" height="12" rx="1" fill="#6B46C1" fillOpacity="0.8"/>
      </svg>
    )
  }

  if (typeId === 'builder') {
    return (
      <svg width={s} height={s} viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="60" r="56" fill="white" fillOpacity="0.15"/>
        {/* Gear */}
        <circle cx="60" cy="60" r="22" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="3"/>
        <circle cx="60" cy="60" r="10" fill="white" fillOpacity="0.8"/>
        {[0,45,90,135,180,225,270,315].map((angle, i) => (
          <rect
            key={i}
            x="57" y="30"
            width="6" height="10" rx="2"
            fill="white" fillOpacity="0.9"
            transform={`rotate(${angle} 60 60)`}
          />
        ))}
        {/* Wrench */}
        <path d="M78 25 L88 35 L70 55 L62 47 Z" fill="white" fillOpacity="0.7" rx="2"/>
        <circle cx="82" cy="27" r="6" fill="white" fillOpacity="0.4" stroke="white" strokeWidth="2"/>
        {/* Checkmark */}
        <path d="M28 75 L36 83 L52 65" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }

  if (typeId === 'catalyst') {
    return (
      <svg width={s} height={s} viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="60" r="56" fill="white" fillOpacity="0.15"/>
        {/* Lightning bolt */}
        <path d="M68 18 L44 62 L58 62 L52 102 L76 54 L62 54 Z" fill="white" fillOpacity="0.9"/>
        {/* Sparkles */}
        <circle cx="25" cy="35" r="4" fill="white" fillOpacity="0.6"/>
        <line x1="25" y1="25" x2="25" y2="45" stroke="white" strokeWidth="2" strokeOpacity="0.5"/>
        <line x1="15" y1="35" x2="35" y2="35" stroke="white" strokeWidth="2" strokeOpacity="0.5"/>
        <circle cx="92" cy="80" r="4" fill="white" fillOpacity="0.6"/>
        <line x1="92" y1="70" x2="92" y2="90" stroke="white" strokeWidth="2" strokeOpacity="0.5"/>
        <line x1="82" y1="80" x2="102" y2="80" stroke="white" strokeWidth="2" strokeOpacity="0.5"/>
        <circle cx="30" cy="85" r="3" fill="white" fillOpacity="0.5"/>
        <circle cx="90" cy="30" r="3" fill="white" fillOpacity="0.5"/>
      </svg>
    )
  }

  // connector
  return (
    <svg width={s} height={s} viewBox="0 0 120 120" fill="none">
      <circle cx="60" cy="60" r="56" fill="white" fillOpacity="0.15"/>
      {/* Network nodes */}
      <circle cx="60" cy="28" r="10" fill="white" fillOpacity="0.9"/>
      <circle cx="30" cy="72" r="10" fill="white" fillOpacity="0.9"/>
      <circle cx="90" cy="72" r="10" fill="white" fillOpacity="0.9"/>
      <circle cx="60" cy="60" r="8" fill="white" fillOpacity="0.6"/>
      {/* Connections */}
      <line x1="60" y1="38" x2="60" y2="52" stroke="white" strokeWidth="2.5" strokeOpacity="0.7"/>
      <line x1="54" y1="64" x2="38" y2="68" stroke="white" strokeWidth="2.5" strokeOpacity="0.7"/>
      <line x1="66" y1="64" x2="82" y2="68" stroke="white" strokeWidth="2.5" strokeOpacity="0.7"/>
      <line x1="36" y1="78" x2="52" y2="68" stroke="white" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="4 3"/>
      <line x1="68" y1="68" x2="84" y2="78" stroke="white" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="4 3"/>
      <line x1="40" y1="72" x2="80" y2="72" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="4 3"/>
      {/* People icons in nodes */}
      <circle cx="60" cy="24" r="3" fill="#2563EB" fillOpacity="0.7"/>
      <circle cx="30" cy="68" r="3" fill="#2563EB" fillOpacity="0.7"/>
      <circle cx="90" cy="68" r="3" fill="#2563EB" fillOpacity="0.7"/>
    </svg>
  )
}
