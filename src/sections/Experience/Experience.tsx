import { Reveal } from '@/components/Reveal/Reveal'
import styles from './Experience.module.scss'

const CV_ITEMS = [
  {
    period: '2024 — Настоящее время',
    role: 'Senior Front-end & AI Product Engineer',
    company: 'Independent / Studio Lead',
    summary: 'Разработка SaaS-продуктов, интеграция LLM-агентов, RAG-поиска и сложных React-интерфейсов для стартапов.',
  },
  {
    period: '2022 — 2024',
    role: 'Lead Front-end Developer',
    company: 'FinTech & SaaS Platform',
    summary: 'Архитектура дизайн-системы на React + TypeScript, оптимизация скорости загрузки в 2.4 раза, менторство команды.',
  },
  {
    period: '2020 — 2022',
    role: 'Front-end Developer',
    company: 'Digital Agency',
    summary: 'Создание высоконагруженных веб-приложений, интерактивных промо-лендингов и интеграция платёжных шлюзов.',
  },
]

export const Experience = () => {
  return (
    <section id="experience" className={styles.section}>
      <div className={styles.container}>
        <Reveal>
          <div className={styles.header}>
            <h2 className={styles.heading}>Опыт и CV</h2>
            <a href="/cv.pdf" download className={styles.downloadBtn}>
              Скачать PDF CV
            </a>
          </div>
        </Reveal>

        <div className={styles.timeline}>
          {CV_ITEMS.map((item, idx) => (
            <Reveal key={item.period} delay={idx * 100}>
              <div className={styles.item}>
                <div className={styles.dot} />
                <span className={styles.period}>{item.period}</span>
                <h3 className={styles.role}>{item.role}</h3>
                <p className={styles.company}>{item.company}</p>
                <p className={styles.summary}>{item.summary}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
