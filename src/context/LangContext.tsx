import { createContext, useContext, useState, ReactNode } from 'react'

export type Lang = 'en' | 'th'

interface LangContextType {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string) => string
}

const LangContext = createContext<LangContextType | null>(null)

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LangProvider')
  return ctx
}

import { ui } from '../data/i18n'

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    return (localStorage.getItem('engineertype_lang') as Lang) || 'en'
  })

  const handleSetLang = (l: Lang) => {
    setLang(l)
    localStorage.setItem('engineertype_lang', l)
  }

  const t = (key: string): string => {
    const val = (ui[lang] as Record<string, string>)[key]
    return val ?? (ui['en'] as Record<string, string>)[key] ?? key
  }

  return (
    <LangContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </LangContext.Provider>
  )
}
