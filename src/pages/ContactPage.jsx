import { useEffect, useState } from 'react'
import { FaEnvelope, FaGithub, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import AppHeader from '../components/AppHeader'
import { translations } from '../data/content'
import '../styles/portfolio.css'

function ContactPage() {
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
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const content = translations[language]
  const socialLinks = content.socialLinks
  const socialIcons = {
    github: <FaGithub aria-hidden="true" />,
    instagram: <FaInstagram aria-hidden="true" />,
    whatsapp: <FaWhatsapp aria-hidden="true" />,
    mail: <FaEnvelope aria-hidden="true" />,
  }

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    document.documentElement.lang = language
    window.localStorage.setItem('portfolio-theme', theme)
    window.localStorage.setItem('portfolio-language', language)
  }, [theme, language])

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = {}

    if (!formData.name.trim()) nextErrors.name = content.contact.errors.name
    if (!formData.email.trim()) nextErrors.email = content.contact.errors.emailRequired
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = content.contact.errors.emailInvalid
    }
    if (!formData.message.trim()) nextErrors.message = content.contact.errors.message

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setSubmitted(false)
  }

  return (
    <div className="portfolio-shell">
      <AppHeader
        content={content}
        language={language}
        onLanguageToggle={() => setLanguage((current) => current === 'en' ? 'id' : 'en')}
        theme={theme}
        onThemeToggle={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')}
      />

      <main className="contact-main mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <section className="grid gap-8 rounded-3xl border border-line bg-surface p-5 shadow-sm sm:p-8 lg:grid-cols-[.85fr_1.15fr] lg:gap-12 lg:p-12">
          <div>
            <p className="mb-3 text-sm font-bold uppercase text-primary">{content.contact.eyebrow}</p>
            <h1 className="max-w-lg text-3xl font-black leading-tight text-ink sm:text-4xl">{content.contact.title}</h1>
            <p className="mt-4 max-w-lg leading-7 text-muted">{content.contact.description}</p>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  className="group flex min-h-16 min-w-0 items-center gap-4 rounded-2xl border border-line bg-canvas p-3 transition hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
                  href={link.href}
                  target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  aria-label={`${link.label}: ${link.href}`}
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-lg text-primary transition group-hover:bg-primary group-hover:text-white">
                    {socialIcons[link.icon]}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold text-ink">{link.label}</span>
                    <span className="block truncate text-sm text-muted">{link.href.replace(/^mailto:/, '')}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>

          <form className="grid content-start gap-5 rounded-2xl border border-line bg-canvas p-5 sm:p-7" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid content-start gap-2 text-sm font-bold text-ink">
                {content.contact.name}
                <input
                  className="min-h-12 w-full rounded-xl border border-line bg-surface px-4 font-normal text-ink outline-none transition placeholder:text-muted focus:border-primary focus:ring-4 focus:ring-primary/10"
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                />
                {errors.name ? <span className="text-xs font-medium text-red-600" id="contact-name-error">{errors.name}</span> : null}
              </label>
              <label className="grid content-start gap-2 text-sm font-bold text-ink">
                {content.contact.email}
                <input
                  className="min-h-12 w-full rounded-xl border border-line bg-surface px-4 font-normal text-ink outline-none transition placeholder:text-muted focus:border-primary focus:ring-4 focus:ring-primary/10"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                />
                {errors.email ? <span className="text-xs font-medium text-red-600" id="contact-email-error">{errors.email}</span> : null}
              </label>
            </div>
            <label className="grid gap-2 text-sm font-bold text-ink">
              {content.contact.message}
              <textarea
                className="min-h-36 w-full resize-y rounded-xl border border-line bg-surface px-4 py-3 font-normal leading-6 text-ink outline-none transition placeholder:text-muted focus:border-primary focus:ring-4 focus:ring-primary/10"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
              />
              {errors.message ? <span className="text-xs font-medium text-red-600" id="contact-message-error">{errors.message}</span> : null}
            </label>
            <div className="flex flex-wrap items-center gap-4">
              <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg" type="submit">
                <FaEnvelope aria-hidden="true" />
                {content.contact.submit}
              </button>
              {submitted ? <p className="text-sm font-semibold text-primary" role="status">{content.contact.success}</p> : null}
            </div>
          </form>
        </section>
      </main>
    </div>
  )
}

export default ContactPage
