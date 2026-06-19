import { useNavigate } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { engineerTypes, localizeType } from '../data/types'
import { useLang } from '../context/LangContext'
import heroBg from '../assets/hero-bg.png'
import cardArchitectBg from '../assets/card-architect-bg.png'

export default function Home() {
  const navigate = useNavigate()
  const { t, lang } = useLang()
  const types = engineerTypes.map(ty => localizeType(ty, lang))

  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* HERO */}
      <section
        className="relative overflow-hidden cursor-pointer flex items-center justify-center"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          aspectRatio: '1765 / 891',
          maxHeight: '891px',
        }}
        onClick={() => navigate('/test')}
      >
        <div className="w-full max-w-4xl mx-auto px-8 flex flex-col items-center text-center relative z-10">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-5 py-2 rounded-full mb-6 tracking-wide border border-white/30">
            <span className="text-yellow-300 text-base">⭐</span>
            {t('home.badge')}
          </span>

          {/* Title */}
          <h1 className="font-extrabold text-white leading-tight mb-5">
            <span className="block text-3xl md:text-4xl font-semibold opacity-90 mb-2">{t('home.hero.title1')}</span>
            <span className="block text-5xl md:text-6xl lg:text-7xl font-extrabold drop-shadow-lg">{t('home.hero.title2')}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-white/80 text-sm md:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            {t('home.hero.subtitle')}
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <button
              className="inline-flex items-center gap-3 text-white font-bold px-8 py-4 rounded-2xl transition-all hover:scale-105 hover:brightness-110 text-base"
              style={{
                background: 'linear-gradient(90deg, #3a0080, #9b26cc, #d4209a)',
                border: '2px dashed #c06fe0',
                boxShadow: '0 0 24px rgba(180, 40, 180, 0.5)',
              }}
              onClick={e => { e.stopPropagation(); navigate('/test') }}
            >
              {/* Helmet + Gear Icon */}
              <svg width="36" height="36" viewBox="0 0 38 38" fill="none">
                {/* Helmet dome */}
                <path d="M7 26C5 26 4 24 4 22C4 13 10.7 5 19 5C27.3 5 34 13 34 22C34 24 33 26 31 26H7Z" fill="white"/>
                {/* Helmet brim */}
                <rect x="2" y="26" width="34" height="6" rx="3" fill="white"/>
                {/* Gear on helmet */}
                <g transform="translate(19, 17)">
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                    <rect key={i} x="-1.5" y="-8" width="3" height="5" rx="1"
                      fill="rgba(30,10,80,0.55)"
                      transform={`rotate(${angle})`}/>
                  ))}
                  <circle r="5.5" fill="rgba(30,10,80,0.55)"/>
                  <circle r="2.5" fill="white"/>
                </g>
              </svg>
              {t('home.hero.cta')}
            </button>
          </div>

          {/* Time info */}
          <div className="flex items-center gap-5 text-white/70 text-sm mt-5">
            <span className="flex items-center gap-1.5">🕐 {t('home.hero.time')}</span>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />
        </div>
      </section>

      {/* STATS */}
      <section className="bg-purple-600 py-8">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-3 gap-4 text-center">
          {[
            { val: '50K+', key: 'home.stats.tests' },
            { val: '4',    key: 'home.stats.types' },
            { val: '95%',  key: 'home.stats.accuracy' },
          ].map(s => (
            <div key={s.key}>
              <div className="text-3xl font-extrabold text-white">{s.val}</div>
              <div className="text-purple-200 text-sm">{t(s.key)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-purple-600 font-semibold text-sm uppercase tracking-widest mb-2">{t('home.how.label')}</p>
            <h2 className="text-3xl font-extrabold text-gray-900">{t('home.how.title')}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step:'01', tKey:'1', icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>, color:'bg-purple-50 text-purple-600' },
              { step:'02', tKey:'2', icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>, color:'bg-teal-50 text-teal-600' },
              { step:'03', tKey:'3', icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>, color:'bg-orange-50 text-orange-600' },
            ].map(card => (
              <div key={card.step} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.color} mb-5`}>{card.icon}</div>
                <div className="text-xs font-bold text-gray-400 tracking-widest mb-2">{t('home.how.step')} {card.step}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{t(`home.how.${card.tKey}.title`)}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{t(`home.how.${card.tKey}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TYPE PREVIEW */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-purple-600 font-semibold text-sm uppercase tracking-widest mb-2">{t('home.types.label')}</p>
            <h2 className="text-3xl font-extrabold text-gray-900">{t('home.types.title')}</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">{t('home.types.subtitle')}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {types.map(type => (
              <button key={type.id} onClick={() => navigate(`/types/${type.id}`)}
                className="group relative overflow-hidden rounded-2xl p-6 text-left text-white hover:scale-105 transition-all duration-200 hover:shadow-xl"
                style={type.id === 'architect'
                  ? { backgroundImage: `url(${cardArchitectBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                  : { background: `linear-gradient(135deg, ${type.color}, ${type.darkColor})` }}>
                <div className="text-xs font-bold tracking-widest opacity-70 mb-3">{type.code}</div>
                <h3 className="text-2xl font-extrabold mb-2">{type.name}</h3>
                <p className="text-sm opacity-80 leading-snug">{type.tagline}</p>
                <div className="mt-4 flex flex-wrap gap-1">
                  {type.traits.slice(0,2).map(tr => (
                    <span key={tr} className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-medium">{tr}</span>
                  ))}
                </div>
              </button>
            ))}
          </div>
          <div className="text-center mt-8">
            <button onClick={() => navigate('/types')} className="text-purple-600 font-semibold hover:underline text-sm">
              {t('home.types.explore')}
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-700 to-indigo-700">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">{t('home.cta.title')}</h2>
          <p className="text-purple-200 mb-8">{t('home.cta.subtitle')}</p>
          <button onClick={() => navigate('/test')}
            className="bg-white text-purple-700 font-bold px-10 py-4 rounded-full hover:bg-purple-50 hover:shadow-xl transition-all hover:scale-105">
            {t('home.cta.btn')}
          </button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
