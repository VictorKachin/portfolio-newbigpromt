export const CV_SYSTEM_PROMPT = `
Ты — AI-ассистент разработчика на его сайте-портфолио. Твоя задача — кратко, дружелюбно и по делу отвечать рекрутерам и клиентам на вопросы об опыте, стеке, проектах и условиях сотрудничества.

Данные кандидата:
- Роль: Senior Front-end & AI Product Engineer (опыт 6+ лет).
- Основной стек: React 19, TypeScript, Next.js, Vite, SCSS Modules, TanStack Query, Zustand.
- AI & Backend стек: OpenAI / Anthropic API, Vercel AI SDK, LangChain, RAG-пайплайны, векторные БД (Qdrant, Pinecone), Python (FastAPI), Node.js, Telegram Bot API & Mini Apps (TMA).
- Ключевые кейсы:
  1. DocuMind AI — корпоративная RAG-платформа поиска по базам знаний (ускорила поиск на 70%).
  2. PulseMetrics — B2B SaaS аналитика с ролевой моделью и биллингом Stripe (4200+ пользователей).
  3. SupportFlow — AI-бот поддержки + Telegram Mini App (автоматизировал 64% тикетов).
- Формат работы: удалённо (Remote), проектный формат (SaaS MVP под ключ), аутстафф или фулл-тайм.
- Локация / Часовой пояс: UTC+3 (Минск / Москва), свободная работа с международными командами.
- Английский: B2 (Upper-Intermediate).

Правила: не придумывай факты, которых нет в списке. Если спрашивают про точную ставку или оценку проекта — предложи оставить контакт в форме на сайте или написать в Telegram.
`

export const QUICK_QUESTIONS = [
  'Какой основной стек?',
  'Расскажи про AI-проекты',
  'Какой формат работы ищешь?',
  'Опыт с Telegram Mini Apps',
]

const LOCAL_ANSWERS: { keywords: string[]; answer: string }[] = [
  {
    keywords: ['стек', 'технологи', 'react', 'typescript', 'фронтенд', 'frontend'],
    answer:
      'Основной фокус: React 19, TypeScript, Next.js, Vite и архитектура на SCSS Modules. На бэкенде и в AI использую Node.js, Python (FastAPI), Vercel AI SDK, LangChain и векторные базы (Qdrant, Pinecone).',
  },
  {
    keywords: ['ai', 'ии', 'rag', 'llm', 'нейросет', 'агент'],
    answer:
      'Разрабатываю RAG-системы для поиска по корпоративным документам (кейс DocuMind AI ускорил поиск на 70%), внедряю Function Calling, стриминг ответов и кастомных AI-агентов в SaaS-продукты.',
  },
  {
    keywords: ['бот', 'telegram', 'телеграм', 'tma', 'mini app'],
    answer:
      'Создаю умных чат-ботов с памятью контекста и Telegram Mini Apps (TMA). Например, в проекте SupportFlow гибридный AI-бот автоматизировал 64% обращений первой линии поддержки.',
  },
  {
    keywords: ['формат', 'удален', 'график', 'ставк', 'зарплат', 'условия', 'опыт'],
    answer:
      'Опыт в коммерческой разработке — более 6 лет. Открыт к удалённой работе (фулл-тайм, контракт) и разработке SaaS/AI MVP под ключ. Часовой пояс UTC+3, английский B2. Оставьте контакт в форме ниже, чтобы обсудить детали!',
  },
]

export const askCvAssistant = async (
  history: { role: 'user' | 'assistant'; content: string }[]
): Promise<string> => {
  const apiKey = import.meta.env.VITE_LLM_API_KEY
  const apiUrl = import.meta.env.VITE_LLM_API_URL || 'https://openai.com'
  const model = import.meta.env.VITE_LLM_MODEL || 'gpt-4o-mini'

  if (apiKey) {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'system', content: CV_SYSTEM_PROMPT }, ...history],
          temperature: 0.5,
          max_tokens: 350,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        const reply = data?.choices?.[0]?.message?.content
        if (reply) return reply.trim()
      }
    } catch {
      // При сетевой ошибке плавно переходим на локальный движок
    }
  }

  // Умный автономный ответ по ключевым словам из CV
  const lastUserMessage = history[history.length - 1]?.content.toLowerCase() || ''
  const matched = LOCAL_ANSWERS.find((item) =>
    item.keywords.some((kw) => lastUserMessage.includes(kw))
  )

  await new Promise((resolve) => setTimeout(resolve, 450))

  return (
    matched?.answer ||
    'Я специализируюсь на Front-end (React, TypeScript) и AI Engineering (RAG, LLM-боты, SaaS). Спросите меня про стек, AI-кейсы, Telegram Mini Apps или условия сотрудничества!'
  )
}
