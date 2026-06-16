import { useNavigate } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { engineerTypes, localizeType } from '../data/types'
import TypeAvatar from '../components/TypeAvatar'
import { useLang } from '../context/LangContext'

export default function AllTypes() {
  const navigate = useNavigate()
  const { t, lang } = useLang()
  const types = engineerTypes.map(ty => localizeType(ty, lang))

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />

      {/* Header */}
      <div className="bg-gradient-to-br from-purple-900 to-indigo-900 py-16 text-center px-4">
        <p className="text-purple-300 text-sm font-semibold tracking-widest uppercase mb-3">{t('types.discover')}</p>
        <h1 className="text-4xl font-extrabold text-white mb-4">{t('types.title')}</h1>
        <p className="text-purple-200 max-w-xl mx-auto leading-relaxed">
          {t('types.subtitle')}
        </p>
        <button
          onClick={() => navigate('/test')}
          className="mt-6 bg-white text-purple-900 font-bold px-8 py-3 rounded-full hover:bg-purple-50 transition-all hover:shadow-xl hover:scale-105 text-sm"
        >
          {t('types.cta')}
        </button>
      </div>

      {/* Types grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 gap-6">
          {types.map(type => (
            <button
              key={type.id}
              onClick={() => navigate(`/types/${type.id}`)}
              className="group relative overflow-hidden rounded-3xl text-white text-left hover:scale-[1.02] transition-all duration-200 hover:shadow-2xl"
              style={{ background: `linear-gradient(135deg, ${type.color}, ${type.darkColor})` }}
            >
              <div className="p-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-white/60 text-xs font-bold tracking-widest uppercase mb-2">{type.code}</p>
                    <h2 className="text-3xl font-extrabold mb-3">{type.name}</h2>
                    <p className="text-white/80 text-sm leading-relaxed mb-4">{type.tagline}</p>
                    <div className="flex flex-wrap gap-2">
                      {type.traits.map(t => (
                        <span key={t} className="text-xs bg-white/20 px-2.5 py-1 rounded-full font-semibold">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex-shrink-0 opacity-90 group-hover:scale-110 transition-transform duration-200">
                    <TypeAvatar typeId={type.id} size={100} />
                  </div>
                </div>
                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
                  {t('types.explore')}
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Comparison table */}
        <div className="mt-16">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">{t('types.compare')}</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left p-4 text-gray-500 font-semibold w-32">{t('types.trait')}</th>
                    {types.map(ty => (
                      <th key={ty.id} className="p-4 text-center">
                        <span className="font-bold text-white text-xs px-3 py-1 rounded-full" style={{ backgroundColor: ty.color }}>
                          {ty.name}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { trait: t('types.focus'), values: ['types.val.deep', 'types.val.deep', 'types.val.broad', 'types.val.broad'] },
                    { trait: t('types.thinking'), values: ['types.val.systems', 'types.val.execution', 'types.val.systems', 'types.val.execution'] },
                    { trait: t('types.structure'), values: ['types.val.structured', 'types.val.structured', 'types.val.flexible', 'types.val.flexible'] },
                    { trait: t('types.standards'), values: ['types.val.quality', 'types.val.quality', 'types.val.speed', 'types.val.speed'] },
                    { trait: t('types.energy'), values: ['types.val.technical', 'types.val.technical', 'types.val.technical', 'types.val.people'] },
                  ].map(row => (
                    <tr key={row.trait} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-semibold text-gray-600">{row.trait}</td>
                      {row.values.map((v, i) => (
                        <td key={i} className="p-4 text-center text-gray-700">{t(v)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
