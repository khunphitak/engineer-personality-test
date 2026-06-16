import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {[
            { key: 'footer.product',    items: [{ label: t('nav.takeTest'), to: '/test' }, { label: t('nav.types'), to: '/types' }] },
            { key: 'footer.resources',  items: [{ label: t('footer.careerGuide'), to: '#' }, { label: t('footer.teamAnalysis'), to: '#' }] },
            { key: 'footer.help',       items: [{ label: t('footer.faq'), to: '#' }, { label: t('footer.support'), to: '#' }] },
            { key: 'footer.about',      items: [{ label: t('footer.mission'), to: '#' }, { label: t('footer.research'), to: '#' }] },
          ].map(col => (
            <div key={col.key}>
              <h4 className="text-white font-semibold text-sm mb-4">{t(col.key)}</h4>
              <ul className="space-y-2 text-sm">
                {col.items.map(item => (
                  <li key={item.label}>
                    <Link to={item.to} className="hover:text-white transition-colors">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white font-semibold">
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
              <rect x="2" y="2" width="10" height="10" rx="2" fill="#9F7AEA" opacity="0.8"/>
              <rect x="16" y="2" width="10" height="10" rx="2" fill="#9F7AEA" opacity="0.4"/>
              <rect x="2" y="16" width="10" height="10" rx="2" fill="#9F7AEA" opacity="0.4"/>
              <rect x="16" y="16" width="10" height="10" rx="2" fill="#9F7AEA" opacity="0.8"/>
              <circle cx="14" cy="14" r="3" fill="#9F7AEA"/>
            </svg>
            EngineerType
          </div>
          <p className="text-sm">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  )
}
