import { type FormEvent, useEffect, useRef, useState } from 'react'
import { askCvAssistant, QUICK_QUESTIONS } from '@/data/cvKnowledge'
import styles from './AiAssistant.module.scss'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        'Привет! Я AI-ассистент по резюме. Спросите меня про стек, опыт в SaaS, AI-проекты или условия работы.',
    },
  ])

  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping, isOpen])

  const handleSend = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || isTyping) return

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: trimmed,
    }

    const updatedHistory = [...messages, userMsg]
    setMessages(updatedHistory)
    setInput('')
    setIsTyping(true)

    const replyText = await askCvAssistant(
      updatedHistory.map(({ role, content }) => ({ role, content }))
    )

    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: replyText,
      },
    ])
    setIsTyping(false)
  }

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault()
    void handleSend(input)
  }

  return (
    <div className={styles.wrapper}>
      {isOpen && (
        <div className={styles.window} role="dialog" aria-label="AI-ассистент по CV">
          <div className={styles.header}>
            <div className={styles.headerInfo}>
              <span className={styles.onlineDot} />
              <div>
                <div className={styles.title}>CV AI Assistant</div>
                <div className={styles.subtitle}>Отвечает по опыту и стеку</div>
              </div>
            </div>
            <button
              type="button"
              className={styles.closeBtn}
              aria-label="Закрыть чат"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className={styles.messages}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={[
                  styles.message,
                  msg.role === 'user' ? styles.userMessage : styles.botMessage,
                ].join(' ')}
              >
                {msg.content}
              </div>
            ))}
            {isTyping && <div className={styles.typing}>Печатает ответ...</div>}
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.quickList}>
            {QUICK_QUESTIONS.map((q) => (
              <button
                key={q}
                type="button"
                className={styles.quickBtn}
                onClick={() => void handleSend(q)}
              >
                {q}
              </button>
            ))}
          </div>

          <form className={styles.inputBar} onSubmit={onFormSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Задайте вопрос по CV..."
              className={styles.input}
            />
            <button type="submit" disabled={!input.trim() || isTyping} className={styles.sendBtn}>
              →
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        className={styles.launcher}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={styles.sparkle}>✦</span>
        <span>{isOpen ? 'Скрыть AI' : 'Спросить AI о CV'}</span>
      </button>
    </div>
  )
}
