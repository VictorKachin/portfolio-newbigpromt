export interface LeadPayload {
  service: string
  name: string
  contact: string
  message: string
}

const escapeHtml = (text: string): string =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

export const sendLeadToTelegram = async (payload: LeadPayload): Promise<void> => {
  const token = import.meta.env.VITE_TG_BOT_TOKEN
  const chatId = import.meta.env.VITE_TG_CHAT_ID

  if (!token || !chatId) {
    throw new Error('Не настроены VITE_TG_BOT_TOKEN или VITE_TG_CHAT_ID в файле .env')
  }

  const text = [
    '🚀 <b>Новая заявка с портфолио!</b>',
    '',
    `📌 <b>Направление:</b> ${escapeHtml(payload.service)}`,
    `👤 <b>Имя:</b> ${escapeHtml(payload.name)}`,
    `📞 <b>Контакт:</b> ${escapeHtml(payload.contact)}`,
    `💬 <b>Задача:</b>\n${escapeHtml(payload.message)}`,
  ].join('\n')

  const response = await fetch(`https://telegram.org{token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
    }),
  })

  if (!response.ok) {
    throw new Error('Ошибка при отправке сообщения в Telegram')
  }
}
