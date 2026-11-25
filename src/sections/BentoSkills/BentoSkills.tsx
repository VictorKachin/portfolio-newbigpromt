import { Reveal } from '@/components/Reveal/Reveal'
import styles from './BentoSkills.module.scss'

export const BentoSkills = () => {
  return (
    <section id="skills" className={styles.section}>
      <div className={styles.container}>
        <Reveal>
          <h2 className={styles.heading}>Экспертиза и стек</h2>
        </Reveal>

        <div className={styles.grid}>
          <Reveal delay={50}>
            <article className={[styles.card, styles.cardWide].join(' ')}>
              <span className={styles.tag}>Front-end Architecture</span>
              <h3 className={styles.cardTitle}>Современные Web-Apps и SPA</h3>
              <p className={styles.cardDesc}>
                Высокопроизводительные интерфейсы со строгой типизацией, сложным стейт-менеджментом,
                стримингом данных и идеальным Core Web Vitals.
              </p>
              <div className={styles.pills}>
                {['React 19', 'TypeScript', 'Next.js', 'Vite', 'SCSS Modules', 'TanStack Query', 'Zustand'].map((tech) => (
                  <span key={tech} className={styles.pill}>{tech}</span>
                ))}
              </div>
            </article>
          </Reveal>

          <Reveal delay={120}>
            <article className={styles.card}>
              <span className={styles.tag}>AI Engineering</span>
              <h3 className={styles.cardTitle}>LLM & RAG-пайплайны</h3>
              <p className={styles.cardDesc}>
                Интеграция OpenAI, Anthropic, локальных моделей, векторных баз и оркестрация агентов.
              </p>
              <div className={styles.pills}>
                {['LangChain', 'Vercel AI SDK', 'Pinecone', 'Python / FastAPI'].map((tech) => (
                  <span key={tech} className={styles.pill}>{tech}</span>
                ))}
              </div>
            </article>
          </Reveal>

          <Reveal delay={180}>
            <article className={styles.card}>
              <span className={styles.tag}>Automation & Bots</span>
              <h3 className={styles.cardTitle}>Умные чат-боты и Mini Apps</h3>
              <p className={styles.cardDesc}>
                Telegram Mini Apps (TMA), AI-ассистенты поддержки с памятью контекста и интеграцией в CRM.
              </p>
              <div className={styles.pills}>
                {['Telegram API', 'Webhooks', 'Function Calling', 'Node.js'].map((tech) => (
                  <span key={tech} className={styles.pill}>{tech}</span>
                ))}
              </div>
            </article>
          </Reveal>

          <Reveal delay={240}>
            <article className={[styles.card, styles.cardWide].join(' ')}>
              <span className={styles.tag}>Product & SaaS</span>
              <h3 className={styles.cardTitle}>Запуск SaaS от MVP до продакшена</h3>
              <p className={styles.cardDesc}>
                Проектирование архитектуры, биллинг (Stripe/крипто), мультиарендность, аналитика и
                интерактивные дашборды.
              </p>
              <div className={styles.pills}>
                {['PostgreSQL', 'Supabase', 'Stripe API', 'Docker', 'CI/CD'].map((tech) => (
                  <span key={tech} className={styles.pill}>{tech}</span>
                ))}
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
