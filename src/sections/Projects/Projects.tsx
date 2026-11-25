import { useState } from 'react'
import { Reveal } from '@/components/Reveal/Reveal'
import styles from './Projects.module.scss'

type Category = 'all' | 'saas' | 'ai' | 'bot'

interface ProjectItem {
  id: string
  title: string
  category: Exclude<Category, 'all'>
  description: string
  metrics: string
  stack: string[]
}

const PROJECTS: ProjectItem[] = [
  {
    id: '1',
    title: 'DocuMind AI — RAG-платформа для баз знаний',
    category: 'ai',
    description: 'Веб-сервис для загрузки корпоративных PDF/Notion и мгновенных ответов со ссылками на источники в режиме стриминга.',
    metrics: 'Сократил время поиска регламентов на 70%',
    stack: ['React', 'TypeScript', 'Vercel AI SDK', 'Qdrant'],
  },
  {
    id: '2',
    title: 'PulseMetrics — B2B SaaS аналитика',
    category: 'saas',
    description: 'Мультиарендный дашборд с ролевой моделью доступа, конструктором отчётов и подписками через Stripe.',
    metrics: '4 200+ активных пользователей, 99.9% uptime',
    stack: ['React', 'Vite', 'SCSS Modules', 'Node.js'],
  },
  {
    id: '3',
    title: 'SupportFlow — AI-бот и Telegram Mini App',
    category: 'bot',
    description: 'Гибридный бот первой линии поддержки с передачей сложных диалогов оператору и встроенным каталогом услуг в TMA.',
    metrics: 'Автоматизировал 64% входящих тикетов',
    stack: ['TypeScript', 'Telegram WebApp', 'OpenAI API'],
  },
]

export const Projects = () => {
  const [filter, setFilter] = useState<Category>('all')

  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === filter)

  const tabs: { key: Category; label: string }[] = [
    { key: 'all', label: 'Все проекты' },
    { key: 'ai', label: 'AI Engineering' },
    { key: 'saas', label: 'SaaS / Web-Apps' },
    { key: 'bot', label: 'Чат-боты / TMA' },
  ]

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.container}>
        <Reveal>
          <div className={styles.topBar}>
            <h2 className={styles.heading}>Избранные кейсы</h2>
            <div className={styles.tabs}>
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setFilter(tab.key)}
                  className={[styles.tab, filter === tab.key && styles.tabActive].filter(Boolean).join(' ')}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className={styles.list}>
          {filtered.map((project, index) => (
            <Reveal key={project.id} delay={index * 90}>
              <article className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.title}>{project.title}</h3>
                  <span className={styles.metric}>{project.metrics}</span>
                </div>
                <p className={styles.description}>{project.description}</p>
                <div className={styles.footer}>
                  <div className={styles.tags}>
                    {project.stack.map((tech) => (
                      <span key={tech} className={styles.tag}>{tech}</span>
                    ))}
                  </div>
                  <a href="#contact" className={styles.caseLink}>
                    Запросить демо →
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
