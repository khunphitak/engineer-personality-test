import { useParams, useNavigate, Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import TypeAvatar from '../components/TypeAvatar'
import { getTypeById, engineerTypes, localizeType } from '../data/types'
import { useLang } from '../context/LangContext'

export default function TypeDetail() {
  const { typeId } = useParams<{ typeId: string }>()
  const navigate = useNavigate()
  const { t, lang } = useLang()
  const baseType = getTypeById(typeId || '')

  if (!baseType) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('detail.notFound')}</h1>
          <button onClick={() => navigate('/types')} className="text-purple-600 hover:underline">
            {t('detail.backAll')}
          </button>
        </div>
      </div>
    )
  }

  const type = localizeType(baseType, lang)
  const typeIndex = engineerTypes.findIndex(t => t.id === type.id)
  const prevType = localizeType(engineerTypes[(typeIndex - 1 + 4) % 4], lang)
  const nextType = localizeType(engineerTypes[(typeIndex + 1) % 4], lang)

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />

      {/* HERO */}
      <div
        className="relative overflow-hidden py-16 px-4"
        style={{ background: `linear-gradient(135deg, ${type.darkColor}, ${type.color})` }}
      >
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 600 300" preserveAspectRatio="xMidYMid slice">
            {[0,1,2,3].map(i => [0,1,2].map(j => (
              <circle key={`${i}-${j}`} cx={i*200} cy={j*150} r="80" fill="white"/>
            )))}
          </svg>
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {type.traits.map(t => (
              <span key={t} className="bg-white/20 text-white text-xs font-bold tracking-widest px-3 py-1 rounded-full uppercase border border-white/30">
                {t}
              </span>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <TypeAvatar typeId={type.id} size={140} />
            <div className="text-left">
              <p className="text-white/70 text-sm font-semibold tracking-widest uppercase mb-1">{lang === 'th' ? `${t('detail.personalitySuffix')}${type.name}` : `${type.code} ${t('detail.personalitySuffix')}`}</p>
              <h1 className="text-5xl font-extrabold text-white mb-3">{type.name}</h1>
              <p className="text-white/90 text-lg leading-relaxed max-w-md">{type.tagline}</p>
            </div>
          </div>

          <button
            onClick={() => navigate('/test')}
            className="mt-8 bg-white text-gray-900 font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition-all hover:shadow-xl text-sm"
          >
            {t('detail.takeTest')}
          </button>
        </div>
      </div>

      {/* Nav breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-gray-700">{t('detail.home')}</Link>
          <span>/</span>
          <Link to="/types" className="hover:text-gray-700">{t('detail.types')}</Link>
          <span>/</span>
          <span className="font-semibold" style={{ color: type.color }}>{type.name}</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Introduction */}
        <section id="introduction" className="mb-12">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-4">{t('detail.intro')}</h2>
          <blockquote className="border-l-4 pl-5 py-2 italic text-gray-600 text-lg leading-relaxed mb-6"
            style={{ borderColor: type.color }}>
            "{type.quote}"
            <footer className="text-sm not-italic font-semibold text-gray-500 mt-2">— {type.quoteAuthor}</footer>
          </blockquote>
          {type.intro.map((para, i) => (
            <p key={i} className="text-gray-700 leading-relaxed mb-4">{para}</p>
          ))}
        </section>

        {/* CTA */}
        <div
          className="rounded-2xl p-8 text-white mb-12 text-center"
          style={{ background: `linear-gradient(135deg, ${type.darkColor}, ${type.color})` }}
        >
          <h3 className="text-xl font-extrabold mb-2">{t('detail.areYou').replace('{x}', type.name)}</h3>
          <p className="opacity-80 mb-5 text-sm">{t('detail.ctaSub')}</p>
          <button
            onClick={() => navigate('/test')}
            className="bg-white font-bold px-7 py-3 rounded-full hover:bg-gray-100 transition-all text-sm"
            style={{ color: type.darkColor }}
          >
            {t('detail.ctaBtn')}
          </button>
        </div>

        {/* Strengths & Weaknesses */}
        <section id="strengths" className="mb-12">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">{t('detail.sw')}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">✅ {t('detail.strengths')}</h3>
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
              <h3 className="font-bold text-gray-900 mb-4">⚠️ {t('detail.weaknesses')}</h3>
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

        {/* Working Style */}
        <section id="working-style" className="mb-12">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-4">{t('detail.workingStyle')}</h2>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <p className="text-gray-700 leading-relaxed">{type.workingStyle}</p>
          </div>
        </section>

        {/* Collaboration */}
        <section id="collaboration" className="mb-12">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-4">{t('detail.collaboration')}</h2>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <p className="text-gray-700 leading-relaxed mb-5">{type.collaborationTips}</p>
            <h4 className="font-semibold text-gray-900 mb-3 text-sm">{t('detail.worksWith')}</h4>
            <div className="flex flex-wrap gap-2">
              {engineerTypes.filter(et => et.id !== type.id).map(et => localizeType(et, lang)).map(lt => (
                <Link
                  key={lt.id}
                  to={`/types/${lt.id}`}
                  className="px-4 py-1.5 rounded-full text-sm font-semibold text-white hover:opacity-90 hover:scale-105 transition-all inline-block"
                  style={{ backgroundColor: lt.color }}
                >
                  {lt.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Careers */}
        <section id="careers" className="mb-12">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-4">{t('detail.careers')}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {type.careers.map((career, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: type.color + '20', color: type.color }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <span className="font-semibold text-gray-900 text-sm">{career}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Famous Engineers */}
        <section className="mb-12">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">{t('detail.famous').replace('{x}', type.name)}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {type.famousEngineers.map((eng, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div
                  className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-xl"
                  style={{ backgroundColor: type.color }}
                >
                  {eng.name.charAt(0)}
                </div>
                <p className="font-bold text-gray-900 text-sm">{eng.name}</p>
                <p className="text-xs text-gray-500 mt-1">{eng.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Conclusion */}
        <section id="conclusion" className="mb-12">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-4">{t('detail.conclusion')}</h2>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('detail.concl1').replace('{x}', type.name)}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('detail.concl2').replace('{x}', type.name)}
            </p>
          </div>
        </section>

        {/* Prev / Next */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <Link
            to={`/types/${prevType.id}`}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all group"
          >
            <p className="text-xs text-gray-400 font-semibold mb-1">← {t('detail.prev')}</p>
            <p className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">{prevType.name}</p>
          </Link>
          <Link
            to={`/types/${nextType.id}`}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all group text-right"
          >
            <p className="text-xs text-gray-400 font-semibold mb-1">{t('detail.next')} →</p>
            <p className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">{nextType.name}</p>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
