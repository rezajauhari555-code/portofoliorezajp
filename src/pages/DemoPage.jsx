import { useEffect, useState } from 'react'
import AppHeader from '../components/AppHeader'
import { translations } from '../data/content'
import '../styles/portfolio.css'

function DemoPage() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    const savedTheme = window.localStorage.getItem('portfolio-theme')
    if (savedTheme) return savedTheme
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  const [language, setLanguage] = useState(() => {
    if (typeof window === 'undefined') return 'en'
    const savedLanguage = window.localStorage.getItem('portfolio-language')
    return savedLanguage === 'id' ? 'id' : 'en'
  })
  const content = translations[language]
  const liveDemoLinks = content.liveDemoLinks

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    document.documentElement.lang = language
    window.localStorage.setItem('portfolio-theme', theme)
    window.localStorage.setItem('portfolio-language', language)
  }, [theme, language])

  return (
    <div className="portfolio-shell">
      <AppHeader
        content={content}
        language={language}
        onLanguageToggle={() => setLanguage((current) => current === 'en' ? 'id' : 'en')}
        theme={theme}
        onThemeToggle={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')}
      />

      <main>
        <section className="section-card">
          <p className="eyebrow">{content.demo.eyebrow}</p>
          <h2>{content.demo.title}</h2>
          <p className="section-description">{content.demo.description}</p>

          <div className="demo-grid">
            {liveDemoLinks.map((item) => (
              <article key={item.title} className="demo-card">
                <h3>{item.title}</h3>
                <a className="btn btn--primary" href={item.url} target="_blank" rel="noopener noreferrer">
                  {content.demo.cta}
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default DemoPage
