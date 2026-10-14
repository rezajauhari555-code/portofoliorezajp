import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaAward, FaBuilding, FaCalendarAlt, FaTag, FaUser } from 'react-icons/fa'
import AppHeader from '../components/AppHeader'
import { translations } from '../data/content'
import '../styles/portfolio.css'

function CertificatePage() {
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
        <section className="section-card certificate-page">
          <div className="section-heading">
            <p className="eyebrow">{content.certificatePage.eyebrow}</p>
            <h2>{content.certificatePage.title}</h2>
            <p className="section-description">{content.certificatePage.description}</p>
          </div>

          <div className="certificate-grid certificate-grid--full">
            {[...content.certificates]
              .sort((first, second) => Number(Boolean(second.image)) - Number(Boolean(first.image)))
              .map((certificate) => (
              <article key={certificate.title} className="certificate-card certificate-card--detail">
                {certificate.image ? (
                  <div className="certificate-preview">
                    <div className="certificate-preview__fallback" aria-hidden="true">
                      <FaAward />
                      <span>{certificate.title}</span>
                      <small>{certificate.issuer}</small>
                    </div>
                    <img
                      src={certificate.image}
                      alt={`${certificate.title} issued by ${certificate.issuer}`}
                      loading="lazy"
                      onError={(event) => { event.currentTarget.hidden = true }}
                    />
                  </div>
                ) : null}

                <div className="certificate-content">
                  <div className="certificate-badge">
                    <FaAward aria-hidden="true" />
                    <span>{certificate.category}</span>
                  </div>
                  <h3>{certificate.title}</h3>
                  <dl className="certificate-facts">
                    {certificate.recipient ? (
                      <div>
                        <dt><FaUser aria-hidden="true" /> {language === 'en' ? 'Presented to' : 'Diberikan kepada'}</dt>
                        <dd>{certificate.recipient}</dd>
                      </div>
                    ) : null}
                    <div>
                      <dt><FaBuilding aria-hidden="true" /> {language === 'en' ? 'Issuer' : 'Penerbit'}</dt>
                      <dd>{certificate.issuer}</dd>
                    </div>
                    <div>
                      <dt><FaTag aria-hidden="true" /> {language === 'en' ? 'Activity' : 'Kegiatan'}</dt>
                      <dd>{certificate.activity}</dd>
                    </div>
                    {certificate.date ? (
                      <div>
                        <dt><FaCalendarAlt aria-hidden="true" /> {language === 'en' ? 'Date' : 'Tanggal'}</dt>
                        <dd>{certificate.date}</dd>
                      </div>
                    ) : null}
                  </dl>
                  <p className="certificate-detail">{certificate.detail}</p>
                  {certificate.url ? (
                    <a
                      className="btn btn--primary certificate-open"
                      href={certificate.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {content.certificatePage.ctaOpen}
                    </a>
                  ) : null}
                </div>
              </article>
              ))}
          </div>
          <div className="certificate-page__footer">
            <Link className="btn btn--secondary" to="/">
              {content.certificatePage.ctaBack}
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}

export default CertificatePage
