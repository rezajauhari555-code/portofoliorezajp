import { useEffect, useState } from 'react'
import AppHeader from '../components/AppHeader'
import { translations } from '../data/content'
import '../styles/portfolio.css'

import {
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaPython,
  FaGitAlt,
  FaGithub,
  FaFigma,
  FaPaintBrush,
  FaCode,
} from 'react-icons/fa'

import {
  SiTailwindcss,
  SiDjango,
  SiMysql,
  SiSqlite,
  SiPostman,
  SiReact,
  SiLeaflet,
} from 'react-icons/si'

import { MdDesignServices } from 'react-icons/md'

export default function SkillsPage() {
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'light')
  const [language, setLanguage] = useState(() => localStorage.getItem('portfolio-language') === 'id' ? 'id' : 'en')
  const t = translations[language]
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.lang = language
    localStorage.setItem('portfolio-language', language)
  }, [language])

  const skillGroups = [
    {
      title: 'Frontend',
      items: [
        { name: 'HTML', icon: <FaHtml5 /> },
        { name: 'CSS', icon: <FaCss3Alt /> },
        { name: 'JavaScript', icon: <FaJsSquare /> },
        { name: 'React', icon: <SiReact /> },
        { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
        { name: 'Leaflet', icon: <SiLeaflet /> },
      ],
    },
    {
      title: 'Backend',
      items: [
        { name: 'Django', icon: <SiDjango /> },
        { name: 'Python', icon: <FaPython /> },
        { name: 'MySQL', icon: <SiMysql /> },
        { name: 'SQLite', icon: <SiSqlite /> },
      ],
    },
    {
      title: 'Design',
      items: [
        { name: 'Figma', icon: <FaFigma /> },
        { name: 'Canva', icon: <FaPaintBrush /> },
        { name: 'UI / UX', icon: <MdDesignServices /> },
      ],
    },
    {
      title: 'Tools',
      items: [
        { name: 'Git', icon: <FaGitAlt /> },
        { name: 'GitHub', icon: <FaGithub /> },
        { name: 'VS Code', icon: <FaCode /> },
        { name: 'Postman', icon: <SiPostman /> },
      ],
    },
  ]

  return (
    <div className="portfolio-shell">
      <AppHeader
        content={t}
        language={language}
        onLanguageToggle={() => setLanguage((current) => current === 'en' ? 'id' : 'en')}
        theme={theme}
        onThemeToggle={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')}
      />

      <main className="skills-page mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <section className="mb-7 rounded-3xl border border-line border-t-4 border-t-primary bg-surface p-6 shadow-sm sm:p-10">
          <p className="mb-3 text-sm font-bold uppercase text-primary">{t.skills.eyebrow}</p>
          <h1 className="max-w-3xl text-3xl font-black leading-tight text-ink sm:text-4xl">{t.skills.title}</h1>
          <p className="mt-4 max-w-2xl leading-7 text-muted">{t.skills.description}</p>
        </section>

        <nav className="mb-6 flex gap-2 overflow-x-auto pb-2" aria-label="Skill categories">
          {skillGroups.map((group) => (
            <a
              key={group.title}
              className="shrink-0 rounded-full border border-line px-4 py-2 text-sm font-bold text-muted transition hover:border-primary hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              href={`#skill-${group.title.toLowerCase()}`}
            >
              {group.title}
            </a>
          ))}
        </nav>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {skillGroups.map((group) => (
            <section
              className="scroll-mt-28 rounded-2xl border border-line bg-surface p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-6"
              id={`skill-${group.title.toLowerCase()}`}
              key={group.title}
            >
              <h2 className="mb-4 border-b border-line pb-3 text-lg font-extrabold text-ink">{group.title}</h2>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {group.items.map((skill) => (
                  <div key={skill.name} className="flex min-h-14 min-w-0 items-center gap-3 rounded-xl border border-line bg-canvas px-3 py-2 transition hover:border-primary/50">
                    <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-xl text-primary">
                      {skill.icon}
                    </span>

                    <span className="truncate text-sm font-semibold text-ink">{skill.name}</span>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  )
}
