import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaBars, FaCode, FaMoon, FaSun, FaTimes } from 'react-icons/fa'

function AppHeader({ content, language, onLanguageToggle, theme, onThemeToggle }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const links = content.navLinks.map((link) => ({
    ...link,
    href: link.id === 'home' ? '/' : `/${link.id}`,
  }))

  const renderLinks = (mobile = false) => links.map((link) => {
    const active = location.pathname === link.href

    return (
      <Link
        key={link.id}
        to={link.href}
        aria-current={active ? 'page' : undefined}
        onClick={() => mobile && setMenuOpen(false)}
        className={`rounded-full px-3 py-2 text-sm font-semibold transition-colors ${
          active
            ? 'bg-primary text-white'
            : 'text-muted hover:bg-black/5 hover:text-ink'
        }`}
      >
        {link.label}
      </Link>
    )
  })

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas shadow-sm shadow-black/3">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="group inline-flex min-w-0 items-center gap-3" aria-label="Reza Jauhari P. home">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-lg text-white shadow-sm transition-transform group-hover:-rotate-6">
            <FaCode aria-hidden="true" />
          </span>
          <span className="grid min-w-0">
            <span className="truncate text-sm font-extrabold leading-tight text-ink sm:text-base">Reza Jauhari P.</span>
            <span className="hidden text-[10px] font-bold uppercase tracking-wider text-muted sm:block">Web Developer · UI/UX</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary navigation">
          {renderLinks()}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={onLanguageToggle}
            aria-label="Switch language"
            className="inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-line px-3 text-xs font-bold text-ink transition hover:border-primary hover:text-primary"
          >
            {language === 'en' ? 'ID' : 'EN'}
          </button>
          <button
            type="button"
            onClick={onThemeToggle}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-line px-3 text-sm font-semibold text-ink transition hover:border-primary hover:text-primary"
          >
            {theme === 'dark' ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />}
            <span className="hidden sm:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            className="grid size-10 place-items-center rounded-full border border-line text-ink transition hover:border-primary hover:text-primary xl:hidden"
          >
            {menuOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav className="mx-auto grid max-w-7xl grid-cols-2 gap-1 border-t border-line px-4 py-3 sm:px-6 md:grid-cols-3 xl:hidden" aria-label="Mobile navigation">
          {renderLinks(true)}
        </nav>
      ) : null}
    </header>
  )
}

export default AppHeader
