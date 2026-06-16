import { Link, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import LangToggle from './LangToggle'

export default function Nav() {
  const navigate = useNavigate()
  const { t } = useLang()

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-gray-900 hover:opacity-80 transition-opacity flex-shrink-0">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-purple-600">
              <rect x="2" y="2" width="10" height="10" rx="2" fill="currentColor" opacity="0.8"/>
              <rect x="16" y="2" width="10" height="10" rx="2" fill="currentColor" opacity="0.4"/>
              <rect x="2" y="16" width="10" height="10" rx="2" fill="currentColor" opacity="0.4"/>
              <rect x="16" y="16" width="10" height="10" rx="2" fill="currentColor" opacity="0.8"/>
              <circle cx="14" cy="14" r="3" fill="currentColor"/>
            </svg>
            <span>EngineerType</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6 flex-1">
            <Link to="/test" className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors">
              {t('nav.takeTest')}
            </Link>
            <Link to="/types" className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors">
              {t('nav.types')}
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <LangToggle />
            <button
              onClick={() => navigate('/test')}
              className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:shadow-md hidden sm:block"
            >
              {t('nav.cta')}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
