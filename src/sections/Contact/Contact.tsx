import { type FormEvent, useState } from 'react'
import { Reveal } from '@/components/Reveal/Reveal'
import { sendLeadToTelegram } from '@/services/telegram'
import styles from './Contact.module.scss'

const SERVICE_TYPES = ['Web-App / SPA', 'SaaS MVP', 'AI-интеграция / RAG', 'Чат-бот / TMA']

export const Contact = () => {
  const [selectedService, setSelectedService] = useState(SERVICE_TYPES[0])
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [message, setMessage] = useState('')

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorText, setErrorText] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    setErrorText('')

    try {
      await sendLeadToTelegram({
        service: selectedService,
        name: name.trim(),
        contact: contact.trim(),
        message: message.trim(),
      })
      setStatus('success')
      setName('')
      setContact('')
      setMessage('')
    } catch (err) {
      setStatus('error')
      setErrorText(err instanceof Error ? err.message : 'Не удалось отправить заявку')
    }
  }

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <Reveal>
          <div className={styles.box}>
            <div className={styles.info}>
              <h2 className={styles.heading}>Готовы запустить проект?</h2>
              <p className={styles.subtitle}>
                Заявка мгновенно прилетит мне в Telegram — отвечу в течение дня с оценкой сроков,
                стека и архитектуры.
              </p>
              <div className={styles.directLinks}>
                <a href="https://t.me" target="_blank" rel="noreferrer" className={styles.social}>
                  Telegram: @username
                </a>
                <a href="mailto:hello@dev.ai" className={styles.social}>
                  Email: hello@dev.ai
                </a>
              </div>
            </div>

            {status === 'success' ? (
              <div className={styles.success}>
                <h3 className={styles.successTitle}>Заявка доставлена в Telegram!</h3>
                <p className={styles.successText}>
                  Спасибо за обращение по направлению «{selectedService}». Скоро свяжусь с вами.
                </p>
                <button
                  type="button"
                  className={styles.resetBtn}
                  onClick={() => setStatus('idle')}
                >
                  Отправить ещё одно сообщение
                </button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.chips}>
                  {SERVICE_TYPES.map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => setSelectedService(service)}
                      className={[styles.chip, selectedService === service && styles.chipActive]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      {service}
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ваше имя"
                  className={styles.input}
                />
                <input
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Telegram (@nick) или Email"
                  className={styles.input}
                />
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Кратко о задаче, сроках или ссылке на референс..."
                  className={styles.textarea}
                />

                {status === 'error' && <p className={styles.errorText}>{errorText}</p>}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={styles.submitBtn}
                >
                  {status === 'loading' ? 'Отправка...' : 'Отправить в Telegram'}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
