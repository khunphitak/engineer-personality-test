import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { getTypeById, engineerTypes } from '../data/types'
import { ScoreResult, dimToPercent } from '../utils/scoring'
import { useLang } from '../context/LangContext'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import TypeAvatar from '../components/TypeAvatar'

const MOCK_COMMENTS = [
  { name: 'Alex Chen',   type: 'Architect', time: '2 days ago',   text: 'This is eerily accurate. The part about over-engineering hit close to home!' },
  { name: 'Priya Nair',  type: 'Connector', time: '5 days ago',   text: 'Connector nailed my work style — cross-team projects give me the most energy.' },
  { name: 'Tom Rivera',  type: 'Catalyst',  time: '1 week ago',   text: '"Gets bored by maintenance work" is painfully true 😂. Shared with my team.' },
  { name: 'Sarah Kim',   type: 'Builder',   time: '2 weeks ago',  text: 'Builder and proud! Consistent delivery is something I take seriously.' },
]

interface BarProps { label: string; leftLabel: string; rightLabel: string; value: number; color: string }
function TraitBar({ label, leftLabel, rightLabel, value, color }: BarProps) {
  const [width, setWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTimeout(() => setWidth(value), 100) }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [value])
  const isLeft = value >= 50
  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1">
        <span className={isLeft ? 'font-bold' : ''}>{leftLabel}</span>
        <span className="text-gray-600 font-medium">{label}</span>
        <span className={!isLeft ? 'font-bold' : ''}>{rightLabel}</span>
      </div>
      <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
        <div className="absolute top-0 h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${isLeft ? width : 100 - width}%`, [isLeft ? 'left' : 'right']: 0, backgroundColor: color }}/>
        <div className="absolute inset-0 flex items-center justify-center"><div className="w-px h-full bg-gray-300"/></div>
      </div>
      <div className="text-center text-xs text-gray-400 mt-1">
        {isLeft ? `${value}% ${leftLabel}` : `${100 - value}% ${rightLabel}`}
      </div>
    </div>
  )
}

export default function Results() {
  const navigate = useNavigate()
  const location = useLocation()
  const result = location.state as ScoreResult | null
  const { t, lang } = useLang()
  const [activeSection, setActiveSection] = useState('introduction')

  useEffect(() => { if (!result) navigate('/test') }, [result, navigate])
  if (!result) return null

  const type = getTypeById(result.typeId)!
  const typeIndex = engineerTypes.findIndex(t => t.id === result.typeId)
  const prevType = engineerTypes[(typeIndex - 1 + 4) % 4]
  const nextType = engineerTypes[(typeIndex + 1) % 4]

  const { dimensions, typeConfidence } = result
  const traitBars = [
    { label: t('dim.foc.label'), leftLabel: t('dim.foc.a'), rightLabel: t('dim.foc.b'), value: dimToPercent(dimensions.foc),  color: type.color },
    { label: t('dim.thn.label'), leftLabel: t('dim.thn.a'), rightLabel: t('dim.thn.b'), value: dimToPercent(dimensions.thn),  color: type.color },
    { label: t('dim.wrk.label'), leftLabel: t('dim.wrk.a'), rightLabel: t('dim.wrk.b'), value: dimToPercent(dimensions.wrk),  color: type.color },
    { label: t('dim.std.label'), leftLabel: t('dim.std.a'), rightLabel: t('dim.std.b'), value: dimToPercent(dimensions.std),  color: type.color },
    { label: t('dim.ori.label'), leftLabel: t('dim.ori.a'), rightLabel: t('dim.ori.b'), value: dimToPercent(dimensions.ori),  color: type.color },
  ]

  const sections = ['introduction','strengths','working-style','collaboration','disciplines','careers','conclusion']
  const topDisciplines = result.disciplines.slice(0, 8)
  const confidentTypes = (Object.entries(typeConfidence) as [string,number][]).sort((a,b) => b[1]-a[1])

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />

      {/* HERO */}
      <div className="relative overflow-hidden py-16 px-4"
        style={{ background: `linear-gradient(135deg, ${type.darkColor}, ${type.color})` }}>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {type.traits.map(tr => (
              <span key={tr} className="bg-white/20 text-white text-xs font-bold tracking-widest px-3 py-1 rounded-full uppercase border border-white/30">{tr}</span>
            ))}
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <TypeAvatar typeId={type.id} size={140}/>
            <div className="text-left">
              <p className="text-white/70 text-sm font-semibold tracking-widest uppercase mb-1">
                {type.code} {t('results.personality')}
              </p>
              <h1 className="text-5xl font-extrabold text-white mb-2">{type.name}</h1>
              <p className="text-white/80 text-sm mb-3 capitalize">{result.variant}</p>
              <p className="text-white/90 text-lg leading-relaxed max-w-md">{type.tagline}</p>
            </div>
          </div>

          {/* Type confidence pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {confidentTypes.map(([tid, pct]) => {
              const tt = getTypeById(tid)!
              return (
                <div key={tid} className="bg-white/15 border border-white/25 rounded-full px-4 py-2 text-white text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tid === result.typeId ? 'white' : tt.color }}/>
                  <span className="font-semibold">{tt.name}</span>
                  <span className="font-bold">{pct}%</span>
                </div>
              )
            })}
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button onClick={() => navigate('/test')}
              className="bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-2.5 rounded-full border border-white/30 transition-all text-sm">
              {t('results.retake')}
            </button>
            <button onClick={() => navigate('/types')}
              className="bg-white text-gray-900 font-semibold px-6 py-2.5 rounded-full hover:bg-gray-100 transition-all text-sm">
              {t('results.allTypes')}
            </button>
          </div>
        </div>
      </div>

      {/* Section nav */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40 overflow-x-auto">
        <div className="max-w-4xl mx-auto px-4 flex gap-0">
          {sections.map(s => (
            <button key={s} onClick={() => { setActiveSection(s); document.getElementById(s)?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}
              className={`px-4 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors capitalize ${
                activeSection === s ? 'border-current' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              style={activeSection === s ? { borderColor: type.color, color: type.color } : {}}>
              {t(`results.${s.replace('-','') === 'workingstyle' ? 'workingStyle' : s.replace('-','')}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* INTRODUCTION */}
        <section id="introduction" className="mb-12">
          <blockquote className="border-l-4 pl-5 py-2 italic text-gray-600 text-lg leading-relaxed mb-8" style={{ borderColor: type.color }}>
            "{type.quote}"
            <footer className="text-sm not-italic font-semibold text-gray-500 mt-2">{t('results.quote.by')} {type.quoteAuthor}</footer>
          </blockquote>
          {type.intro.map((para, i) => <p key={i} className="text-gray-700 leading-relaxed mb-4">{para}</p>)}
        </section>

        {/* ★ DISCIPLINE RANKING ★ */}
        <section id="disciplines" className="mb-12">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">{t('results.disciplines.title')}</h2>
          <p className="text-gray-500 text-sm mb-6">{t('results.disciplines.subtitle')}</p>
          <div className="space-y-3">
            {topDisciplines.map((ds, idx) => {
              const isTop3 = idx < 3
              const medal = ['🥇','🥈','🥉'][idx] || ''
              return (
                <div key={ds.discipline.id}
                  className={`bg-white rounded-2xl p-5 border shadow-sm hover:shadow-md transition-all ${isTop3 ? 'border-2' : 'border-gray-100'}`}
                  style={isTop3 ? { borderColor: type.color + '60' } : {}}>
                  <div className="flex items-center gap-4">
                    <div className="text-2xl w-10 text-center flex-shrink-0">{medal || `#${idx + 1}`}</div>
                    <div className="text-2xl">{ds.discipline.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-bold text-gray-900">
                          {lang === 'th' ? ds.discipline.nameTh : ds.discipline.nameEn}
                        </p>
                        {isTop3 && (
                          <span className="text-xs text-white font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: type.color }}>
                            TOP MATCH
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-0.5 leading-snug">
                        {lang === 'th' ? ds.discipline.descTh : ds.discipline.descEn}
                      </p>
                      {/* Score bar */}
                      <div className="mt-2 flex items-center gap-3">
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-700"
                            style={{ width: `${ds.score}%`, backgroundColor: isTop3 ? type.color : '#9CA3AF' }}/>
                        </div>
                        <span className="text-sm font-bold flex-shrink-0" style={{ color: isTop3 ? type.color : '#6B7280' }}>
                          {ds.score}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* SCORE BREAKDOWN */}
        <section className="mb-12">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">{t('results.scoreBreakdown')}</h2>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            {traitBars.map(bar => <TraitBar key={bar.label} {...bar}/>)}
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-2xl p-8 text-white mb-12 text-center"
          style={{ background: `linear-gradient(135deg, ${type.darkColor}, ${type.color})` }}>
          <p className="text-xs font-bold tracking-widest uppercase opacity-70 mb-1">{t('results.cta.title')}</p>
          <h3 className="text-2xl font-extrabold mb-2">{t('results.cta.subtitle')}</h3>
          <button onClick={() => document.getElementById('disciplines')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white font-bold px-7 py-3 rounded-full hover:bg-gray-100 transition-all text-sm mt-3"
            style={{ color: type.darkColor }}>{t('results.cta.btn')}</button>
        </div>

        {/* STRENGTHS */}
        <section id="strengths" className="mb-12">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">{t('results.strengths')} & {t('results.sw.weaknesses')}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-7 h-7 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm">✓</span>
                {t('results.sw.strengths')}
              </h3>
              <ul className="space-y-3">
                {type.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 text-xs flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-7 h-7 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-sm">!</span>
                {t('results.sw.weaknesses')}
              </h3>
              <ul className="space-y-3">
                {type.weaknesses.map((w, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 text-xs flex items-center justify-center flex-shrink-0 mt-0.5">!</span>
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* WORKING STYLE */}
        <section id="working-style" className="mb-12">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-4">{t('results.workingStyle')}</h2>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <p className="text-gray-700 leading-relaxed">{type.workingStyle}</p>
          </div>
        </section>

        {/* COLLABORATION */}
        <section id="collaboration" className="mb-12">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-4">{t('results.collaboration')}</h2>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <p className="text-gray-700 leading-relaxed mb-5">{type.collaborationTips}</p>
            <p className="font-semibold text-gray-900 mb-3 text-sm">{t('results.worksWith')}</p>
            <div className="flex flex-wrap gap-2">
              {engineerTypes.filter(et => et.id !== type.id).map(et => (
                <Link key={et.id} to={`/types/${et.id}`}
                  className="px-4 py-1.5 rounded-full text-sm font-semibold text-white hover:scale-105 transition-all"
                  style={{ backgroundColor: et.color }}>{et.name}</Link>
              ))}
            </div>
          </div>
        </section>

        {/* CAREERS */}
        <section id="careers" className="mb-12">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-4">{t('results.careers')}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {type.careers.map((career, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: type.color + '20', color: type.color }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0H8m8 0a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2"/>
                  </svg>
                </div>
                <span className="font-semibold text-gray-900 text-sm">{career}</span>
              </div>
            ))}
          </div>
        </section>

        {/* FAMOUS */}
        <section className="mb-12">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">{t('results.famous')} {type.name}s</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {type.famousEngineers.map((eng, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: type.color }}>
                  {eng.name.charAt(0)}
                </div>
                <p className="font-bold text-gray-900 text-sm">{eng.name}</p>
                <p className="text-xs text-gray-500 mt-1">{eng.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CONCLUSION */}
        <section id="conclusion" className="mb-12">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-4">{t('results.conclusion')}</h2>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <p className="text-gray-700 leading-relaxed mb-4">
              Being a <strong>{type.name}</strong> is a genuine strength in the right environment. The key is understanding how your natural tendencies serve you — and when to consciously adapt.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Take this profile as a starting point for self-reflection, not a rigid label. The best engineers evolve over their careers, developing new skills while doubling down on what makes them unique.
            </p>
          </div>
        </section>

        {/* COMMENTS */}
        <section className="mb-12">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">{t('results.comments.title')}</h2>
          <p className="text-gray-500 text-sm mb-6">{t('results.comments.subtitle')}</p>
          <div className="space-y-4">
            {MOCK_COMMENTS.map((c, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: engineerTypes.find(et => et.name === c.type)?.color || '#6B7280' }}>
                    {c.name.charAt(0)}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900 text-sm">{c.name}</span>
                    <span className="text-xs text-gray-400 ml-2">{c.time}</span>
                  </div>
                  <span className="ml-auto text-xs font-bold text-white px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: engineerTypes.find(et => et.name === c.type)?.color || '#6B7280' }}>
                    {c.type}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PREV / NEXT */}
        <div className="grid grid-cols-2 gap-4">
          <Link to={`/types/${prevType.id}`} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <p className="text-xs text-gray-400 font-semibold mb-1">{t('results.prev')}</p>
            <p className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">{prevType.name}</p>
          </Link>
          <Link to={`/types/${nextType.id}`} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all group text-right">
            <p className="text-xs text-gray-400 font-semibold mb-1">{t('results.next')}</p>
            <p className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">{nextType.name}</p>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
