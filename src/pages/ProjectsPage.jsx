import { useEffect, useState } from 'react'
import { FaCoffee, FaExternalLinkAlt, FaFigma, FaGithub, FaLandmark, FaLaptopCode, FaMapMarkedAlt, FaSeedling } from 'react-icons/fa'
import { SiLeaflet, SiReact, SiTailwindcss, SiTypescript } from 'react-icons/si'
import AppHeader from '../components/AppHeader'
import { translations } from '../data/content'
import '../styles/portfolio.css'

const technologyIcons = {
  React: <SiReact aria-hidden="true" />,
  Tailwind: <SiTailwindcss aria-hidden="true" />,
  'Tailwind CSS': <SiTailwindcss aria-hidden="true" />,
  Leaflet: <SiLeaflet aria-hidden="true" />,
  Figma: <FaFigma aria-hidden="true" />,
  TypeScript: <SiTypescript aria-hidden="true" />,
}

const projectVisuals = {
  sparkles: {
    icon: <FaSeedling aria-hidden="true" />,
    tone: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200',
    label: 'Food & community',
  },
  coffee: {
    icon: <FaCoffee aria-hidden="true" />,
    tone: 'bg-orange-50 text-orange-800 dark:bg-orange-950/40 dark:text-orange-200',
    label: 'Business systems',
  },
  portfolio: {
    icon: <FaLaptopCode aria-hidden="true" />,
    tone: 'bg-sky-50 text-sky-800 dark:bg-sky-950/40 dark:text-sky-200',
    label: 'Personal brand',
  },
  history: {
    icon: <FaLandmark aria-hidden="true" />,
    tone: 'bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-200',
    label: 'Interactive history',
  },
  map: {
    icon: <FaMapMarkedAlt aria-hidden="true" />,
    tone: 'bg-cyan-50 text-cyan-900 dark:bg-cyan-950/40 dark:text-cyan-200',
    label: 'Local history',
  },
}

function ProjectsPage() {
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
  const projects = content.projects

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

      <main className="project-main mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pt-12">
        <section aria-labelledby="projects-heading">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-bold uppercase text-primary">{content.projectsSection.eyebrow}</p>
              <h1 id="projects-heading" className="text-3xl font-black leading-tight text-ink sm:text-4xl">
                {content.projectsSection.title}
              </h1>
              <p className="mt-4 max-w-2xl leading-7 text-muted">{content.projectsSection.description}</p>
            </div>
            <span className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-muted">
              {String(projects.length).padStart(2, '0')} {language === 'en' ? 'projects' : 'proyek'}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:gap-6">
            {projects.map((project, index) => {
              const visual = projectVisuals[project.icon] || projectVisuals.portfolio

              return (
              <article key={project.title} className="group flex min-w-0 flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
                <div className={`relative flex min-h-40 items-center justify-between overflow-hidden px-6 py-6 sm:px-8 ${visual.tone}`}>
                  <span className="absolute -right-5 -top-12 size-48 rounded-full border-24 border-current/5" aria-hidden="true" />
                  <span className="absolute -bottom-20 right-20 size-40 rounded-full border-20 border-current/5" aria-hidden="true" />
                  <span className="relative z-10 grid size-16 place-items-center rounded-2xl bg-white/80 text-3xl shadow-sm dark:bg-black/20">
                    {visual.icon}
                  </span>
                  <span className="relative z-10 text-right">
                    <span className="block text-xs font-bold uppercase tracking-wider opacity-75">{visual.label}</span>
                    <span className="mt-1 block text-4xl font-black opacity-25">{String(index + 1).padStart(2, '0')}</span>
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-7">
                  <h2 className="text-xl font-extrabold leading-snug text-ink sm:text-2xl">{project.title}</h2>
                  <p className="mt-3 flex-1 leading-7 text-muted">{project.description}</p>

                  <div className="mt-5">
                    <p className="mb-2 text-xs font-bold uppercase text-muted">
                      {language === 'en' ? 'Built with' : 'Teknologi'}
                    </p>
                    <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span key={tech} className="inline-flex min-h-8 items-center gap-2 rounded-full border border-line bg-canvas px-3 py-1 text-xs font-bold text-ink">
                      {technologyIcons[tech] ? <span className="text-sm text-primary">{technologyIcons[tech]}</span> : null}
                      {tech}
                    </span>
                  ))}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3 border-t border-line pt-5">
                    <a className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-md" href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      {content.projectsSection.ctaLiveDemo}<FaExternalLinkAlt aria-hidden="true" />
                    </a>
                    <a className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-bold text-ink transition hover:border-primary hover:text-primary" href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                      <FaGithub aria-hidden="true" />{content.projectsSection.ctaRepo}<FaExternalLinkAlt aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </article>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}

export default ProjectsPage
