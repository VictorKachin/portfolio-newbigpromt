import { Reveal } from '@/components/Reveal/Reveal'
import styles from './Hero.module.scss'

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.container}>
        <Reveal>
          <div className={styles.badge}>
            <span className={styles.statusDot} />
            Открыт для SaaS, Web-Apps и AI-проектов
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h1 className={styles.title}>
            Создаю умные <span className={styles.gradientText}>Web-приложения</span> и AI-продукты под ключ
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className={styles.subtitle}>
            Full-cycle Front-end & AI Engineer. Проектирую быстрые интерфейсы на React/TypeScript,
            разрабатываю SaaS-платформы, RAG-системы и кастомных LLM чат-ботов.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className={styles.actions}>
            <a href="#contact" className={styles.primaryBtn}>
              Обсудить проект
            </a>
            <a href="#projects" className={styles.secondaryBtn}>
              Смотреть кейсы
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
