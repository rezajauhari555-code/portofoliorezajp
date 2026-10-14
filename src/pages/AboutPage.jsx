import { useEffect, useState } from 'react'
import { FaGraduationCap, FaLightbulb, FaRocket, FaUser } from 'react-icons/fa'
import AppHeader from '../components/AppHeader'
import { translations } from '../data/content'
import '../styles/portfolio.css'

function AboutPage() {
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
  const aboutDetails = content.aboutDetails
  const aboutCards = [
    { title: content.about.cards.profile, detail: aboutDetails.profile, icon: <FaUser aria-hidden="true" /> },
    { title: content.about.cards.education, detail: aboutDetails.education, icon: <FaGraduationCap aria-hidden="true" /> },
    { title: content.about.cards.interests, detail: aboutDetails.interests, icon: <FaLightbulb aria-hidden="true" /> },
    { title: content.about.cards.mbkm, detail: aboutDetails.mbkm, icon: <FaRocket aria-hidden="true" /> },
  ]

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

      <main className="about-main mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <section>
          <div className="mb-8 max-w-3xl rounded-3xl border border-line border-l-4 border-l-primary bg-surface p-6 shadow-sm sm:p-10">
            <p className="mb-3 text-sm font-bold uppercase text-primary">{content.about.eyebrow}</p>
            <h1 className="text-3xl font-black leading-tight text-ink sm:text-4xl">{content.about.title}</h1>
            <p className="mt-4 leading-7 text-muted">{content.about.description}</p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {aboutCards.map((card, index) => (
              <article
                key={card.title}
                className="group relative min-w-0 overflow-hidden rounded-2xl border border-line bg-surface p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg sm:p-7"
              >
                <span className="absolute right-5 top-4 text-5xl font-black text-primary/10" aria-hidden="true">
                  0{index + 1}
                </span>
                <span className="relative mb-5 grid size-12 place-items-center rounded-xl bg-primary/10 text-xl text-primary transition group-hover:bg-primary group-hover:text-white">
                  {card.icon}
                </span>
                <h2 className="relative text-xl font-extrabold text-ink">{card.title}</h2>
                <p className="relative mt-3 leading-7 text-muted">{card.detail}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default AboutPage
