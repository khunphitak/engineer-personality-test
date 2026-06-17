import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { questions } from '../data/questions'
import { calculateScores } from '../utils/scoring'
import { useLang } from '../context/LangContext'
import LangToggle from '../components/LangToggle'
import GearOption from '../components/GearOption'
import testBg from '../assets/test-bg.png'

const STORAGE_KEY = 'engineertype_answers'

const gearConfig = [
  { value: 5, size: 90, expression: 'love'    as const, color: '#16A34A', labelKey: 'test.stronglyAgree' },
  { value: 4, size: 78, expression: 'smile'   as const, color: '#22C55E', labelKey: 'test.agree' },
  { value: 3, size: 66, expression: 'neutral' as const, color: '#9CA3AF', labelKey: 'test.neutral' },
  { value: 2, size: 78, expression: 'frown'   as const, color: '#7C3AED', labelKey: 'test.disagree' },
  { value: 1, size: 90, expression: 'sad'     as const, color: '#6D28D9', labelKey: 'test.stronglyDisagree' },
]

// Label shown bottom-left of test screen reflects the current question's discipline
const DISC_LABELS_KEY = ['test.disc.civil','test.disc.mechanical','test.disc.industrial','test.disc.chemical','test.disc.electrical','test.disc.computer']

// Decorative corner SVGs
const TopLeftCorner = () => (
  <svg className="absolute top-6 left-6 w-44 h-16 text-purple-300 pointer-events-none" viewBox="0 0 200 60" fill="none">
    <circle cx="14" cy="14" r="6" stroke="currentColor" strokeWidth="1"/>
    <circle cx="14" cy="14" r="2" fill="currentColor"/>
    <path d="M 20 14 L 200 14" stroke="currentColor" strokeWidth="1"/>
    <path d="M 14 20 L 14 40 L 0 40" stroke="currentColor" strokeWidth="1"/>
    <circle cx="30" cy="14" r="1.5" fill="currentColor"/>
    <circle cx="50" cy="14" r="1.5" fill="currentColor"/>
  </svg>
)

const TopRightDots = () => (
  <svg className="absolute top-6 right-6 w-20 h-10 text-purple-300 pointer-events-none" viewBox="0 0 80 40" fill="currentColor">
    {Array.from({ length: 8 }).map((_, i) =>
      Array.from({ length: 4 }).map((_, j) => (
        <circle key={`${i}-${j}`} cx={4 + i * 10} cy={4 + j * 10} r="1.2"/>
      ))
    )}
  </svg>
)

const BottomLeftCorner = () => (
  <svg className="absolute bottom-6 left-6 w-48 h-16 text-purple-300 pointer-events-none" viewBox="0 0 200 60" fill="none">
    <path d="M 0 30 L 30 30 L 35 25 L 65 25" stroke="currentColor" strokeWidth="1"/>
    <path d="M 0 50 L 200 50" stroke="currentColor" strokeWidth="1"/>
    <rect x="10" y="2" width="14" height="14" stroke="currentColor" strokeWidth="1" fill="none" transform="rotate(45 17 9)"/>
    <circle cx="80" cy="25" r="1.5" fill="currentColor"/>
    <circle cx="100" cy="25" r="1.5" fill="currentColor"/>
  </svg>
)

const BottomRightCircuit = () => (
  <svg className="absolute bottom-6 right-6 w-40 h-16 text-purple-300 pointer-events-none" viewBox="0 0 200 60" fill="none">
    <path d="M 200 30 L 100 30 L 90 20 L 50 20 L 40 30 L 0 30" stroke="currentColor" strokeWidth="1"/>
    <path d="M 200 50 L 0 50" stroke="currentColor" strokeWidth="1"/>
    <circle cx="100" cy="30" r="1.5" fill="currentColor"/>
    <circle cx="50" cy="20" r="1.5" fill="currentColor"/>
  </svg>
)

const QuoteMark = () => (
  <svg className="w-10 h-10 mx-auto mb-3" viewBox="0 0 40 40" fill="none">
    <path d="M8 20 Q8 10 18 10 L18 14 Q14 14 14 18 L18 18 L18 26 L8 26 Z" fill="#A78BFA" opacity="0.7"/>
    <path d="M22 20 Q22 10 32 10 L32 14 Q28 14 28 18 L32 18 L32 26 L22 26 Z" fill="#A78BFA" opacity="0.7"/>
  </svg>
)

const CodeHexBadge = () => (
  <div className="flex justify-center my-6">
    <div className="relative">
      {/* Left dotted line */}
      <div className="absolute right-full top-1/2 -translate-y-1/2 w-32 sm:w-48 flex items-center">
        <div className="flex-1 border-t border-dashed border-purple-300"/>
        <div className="w-1.5 h-1.5 rounded-full bg-purple-300 ml-2"/>
      </div>
      {/* Hex */}
      <svg className="w-12 h-12 text-purple-400" viewBox="0 0 48 48" fill="none">
        <path d="M24 4 L42 14 L42 34 L24 44 L6 34 L6 14 Z" stroke="currentColor" strokeWidth="1.5" fill="white" fillOpacity="0.5"/>
        <text x="24" y="29" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="currentColor" fontWeight="bold">{'</>'}</text>
      </svg>
      {/* Right dotted line */}
      <div className="absolute left-full top-1/2 -translate-y-1/2 w-32 sm:w-48 flex items-center">
        <div className="w-1.5 h-1.5 rounded-full bg-purple-300 mr-2"/>
        <div className="flex-1 border-t border-dashed border-purple-300"/>
      </div>
    </div>
  </div>
)

export default function Test() {
  const navigate = useNavigate()
  const { t, lang } = useLang()
  const [current, setCurrent] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      const answered = Object.keys(saved).length
      return answered >= questions.length ? questions.length - 1 : answered
    } catch { return 0 }
  })
  const [answers, setAnswers] = useState<Record<number, number>>(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') } catch { return {} }
  })
  const [animating, setAnimating] = useState(false)
  const [slideClass, setSlideClass] = useState('fade-in')

  const question = questions[current]
  const total = questions.length
  const selected = answers[question.id]
  const progress = ((current + (selected ? 1 : 0)) / total) * 100

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers))
  }, [answers])

  const handleSelect = (value: number) => {
    setAnswers(prev => ({ ...prev, [question.id]: value }))
    // Auto-advance after short delay
    setTimeout(() => goNextWith(value), 400)
  }

  const goNextWith = (val: number) => {
    if (animating || !val) return
    if (current === total - 1) {
      const finalAnswers = { ...answers, [question.id]: val }
      localStorage.removeItem(STORAGE_KEY)
      navigate('/results', { state: calculateScores(finalAnswers) })
      return
    }
    setAnimating(true); setSlideClass('slide-out')
    setTimeout(() => { setCurrent(c => c + 1); setSlideClass('fade-in'); setAnimating(false) }, 280)
  }

  const goNext = () => {
    if (!selected || animating) return
    if (current === total - 1) {
      localStorage.removeItem(STORAGE_KEY)
      navigate('/results', { state: calculateScores(answers) })
      return
    }
    setAnimating(true); setSlideClass('slide-out')
    setTimeout(() => { setCurrent(c => c + 1); setSlideClass('fade-in'); setAnimating(false) }, 280)
  }

  const goBack = () => {
    if (current === 0 || animating) return
    setAnimating(true); setSlideClass('slide-out')
    setTimeout(() => { setCurrent(c => c - 1); setSlideClass('fade-in'); setAnimating(false) }, 280)
  }

  const dimLabel = t(DISC_LABELS_KEY[question.discipline - 1])
  const questionText = lang === 'th' ? question.textTh : question.textEn

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundImage: `url(${testBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Decorative corners */}
      <TopLeftCorner />
      <TopRightDots />
      <BottomLeftCorner />
      <BottomRightCircuit />

      {/* Top branding bar */}
      <div className="relative z-10 pt-7 px-8 flex items-center justify-between">
        <div className="flex items-center gap-2 pl-8">
          <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="3" strokeWidth="1.5"/>
            <path strokeWidth="1.5" strokeLinecap="round" d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>
          </svg>
          <span className="text-xs font-bold tracking-[0.3em] text-purple-700 uppercase">Engineer Personality Test</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/')} className="text-purple-500 hover:text-purple-800 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          <LangToggle />
        </div>
      </div>

      {/* Progress + counter */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 pt-8">
        <div className="flex items-center justify-between mb-2 text-xs font-bold text-purple-600 tracking-wider">
          <span>{t('test.question')} {current + 1} / {total}</span>
        </div>
        <div className="h-1 bg-purple-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-green-500 to-purple-500 transition-all duration-500"
            style={{ width: `${progress}%` }}/>
        </div>
      </div>

      {/* Main content */}
      <div className={`relative z-10 max-w-4xl mx-auto px-6 pt-10 pb-16 ${slideClass}`}>
        <QuoteMark />

        {/* Question text */}
        <h1 className="text-center text-2xl sm:text-3xl font-bold text-purple-900 leading-relaxed mb-2 max-w-3xl mx-auto px-4">
          {questionText}
        </h1>

        {/* Hex divider */}
        <CodeHexBadge />

        {/* Gear options */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 my-10">
          {/* Left label with bracket */}
          <div className="hidden sm:flex flex-col items-center text-green-600 font-semibold text-sm">
            <span className="leading-tight text-center" style={{ whiteSpace: 'pre-line' }}>{t('test.stronglyAgree')}</span>
            <span className="text-2xl mt-2 opacity-60">«</span>
          </div>

          <div className="flex items-end justify-center gap-3 sm:gap-5">
            {gearConfig.map(g => (
              <GearOption
                key={g.value}
                size={g.size}
                expression={g.expression}
                color={g.color}
                selected={selected === g.value}
                onClick={() => handleSelect(g.value)}
              />
            ))}
          </div>

          {/* Right label */}
          <div className="hidden sm:flex flex-col items-center text-purple-600 font-semibold text-sm">
            <span className="leading-tight text-center" style={{ whiteSpace: 'pre-line' }}>{t('test.stronglyDisagree')}</span>
            <span className="text-2xl mt-2 opacity-60">»</span>
          </div>
        </div>

        {/* Mobile labels below */}
        <div className="flex sm:hidden justify-between text-xs font-semibold mb-6 px-2">
          <span className="text-green-600">{t('test.agree')}</span>
          <span className="text-purple-600">{t('test.disagree')}</span>
        </div>

        {/* Tier labels under gears */}
        <div className="hidden sm:flex items-start justify-center gap-3 sm:gap-5 max-w-2xl mx-auto -mt-4 mb-8">
          <div style={{ width: 90 }} className="text-center text-xs text-purple-600 font-medium">{t('test.stronglyAgree').replace('\n',' ')}</div>
          <div style={{ width: 78 }} className="text-center text-xs text-purple-600 font-medium">{t('test.agree')}</div>
          <div style={{ width: 66 }} className="text-center text-xs text-purple-600 font-medium">{t('test.neutral')}</div>
          <div style={{ width: 78 }} className="text-center text-xs text-purple-600 font-medium">{t('test.disagree')}</div>
          <div style={{ width: 90 }} className="text-center text-xs text-purple-600 font-medium">{t('test.stronglyDisagree').replace('\n',' ')}</div>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center items-center gap-2 mb-8">
          {[-2,-1,0,1,2].map(offset => {
            const idx = current + offset
            if (idx < 0 || idx >= total) return <div key={offset} className="w-1.5 h-1.5"/>
            return (
              <div key={offset}
                className={`rounded-full transition-all ${offset === 0 ? 'w-2.5 h-2.5 bg-purple-600' : 'w-1.5 h-1.5 bg-purple-300'}`}/>
            )
          })}
        </div>

        {/* Nav buttons */}
        <div className="flex items-center justify-between max-w-md mx-auto mt-4">
          <button onClick={goBack} disabled={current === 0}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-900 disabled:opacity-30 font-medium text-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
            </svg>
            {t('test.back')}
          </button>
          {current === total - 1 && (
            <button onClick={goNext} disabled={!selected || animating}
              className={`flex items-center gap-2 font-semibold px-7 py-3 rounded-full transition-all
                ${selected ? 'bg-purple-600 text-white hover:bg-purple-700 hover:shadow-lg' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
              {t('test.seeResults')}
            </button>
          )}
        </div>
      </div>

    </div>
  )
}
