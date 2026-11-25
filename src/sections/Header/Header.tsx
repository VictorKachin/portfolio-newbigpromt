import { useState } from 'react'
import styles from './Header.module.scss'

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { label: 'Стек и AI', href: '#skills' },
    { label: 'Проекты', href: '#projects' },
    { label: 'Опыт (CV)', href: '#experience' },
    { label: 'Связаться', href: '#contact' },
  ]

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href="#" className={styles.logo}>
          dev<span className={styles.accent}>.ai</span>
        </a>

        <nav className={[styles.nav, menuOpen && styles.navOpen].filter(Boolean).join(' ')}>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={styles.link}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className={styles.burger}
          aria-label="Меню"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className={styles.burgerLine} />
          <span className={styles.burgerLine} />
        </button>
      </div>
    </header>
  )
}
