import { useLang } from '../context/LangContext'

export default function LangToggle() {
  const { lang, setLang } = useLang()

  return (
    <div className="flex items-center bg-gray-100 rounded-full p-0.5 text-xs font-bold">
      <button
        onClick={() => setLang('en')}
        className={`px-3 py-1 rounded-full transition-all ${
          lang === 'en'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-400 hover:text-gray-600'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang('th')}
        className={`px-3 py-1 rounded-full transition-all ${
          lang === 'th'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-400 hover:text-gray-600'
        }`}
      >
        TH
      </button>
    </div>
  )
}
