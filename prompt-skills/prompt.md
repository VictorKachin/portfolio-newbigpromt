# Роль и задача
Ты — Senior Front-end & AI Product Engineer. Создай современный, высокопроизводительный адаптивный лендинг-портфолио + CV (направления: Web Development, Web-Apps, SaaS, AI Engineering, RAG-системы и чат-боты / Telegram Mini Apps).

# Технологический стек (строго)
- **Сборщик:** Vite 8+ (используй `import.meta.dirname` вместо `__dirname` в `vite.config.ts`).
- **Фреймворк:** React 19 + TypeScript 6+ (strict mode). В `tsconfig.app.json` используй `"paths": { "@/*": ["./src/*"] }` **без** устаревшего `baseUrl`.
- **Стилизация:** Нативные SCSS Modules (`*.module.scss`) + плагин `vite-css-modules` (`generateSourceTypes: true`, `localsConvention: 'camelCaseOnly'`) для строгой типизации классов.
- **Запрещено:** Tailwind CSS, UI-фреймворки, inline-стили (`style={{...}}`, кроме динамических задержек анимации), устаревший `@import` в SCSS.

# Архитектура стилей и авто-импорт
1. Создай папку `src/styles/` с файлами:
   - `_variables.scss` (токены тёмной темы в стиле Linear/Vercel: глубокий фон `#09090b`, карточки `#121215`, полупрозрачные границы, неоново-фиолетовые/циановые градиенты, брейкпоинты).
   - `_mixins.scss` (миксины адаптива `up($bp)` и `down($bp)` через современный `@use 'sass:map';`).
   - `_index.scss` (`@forward 'variables'; @forward 'mixins';`).
   - `global.scss` (сброс стилей, `scroll-behavior: smooth`, базовый шрифт; подключается один раз в `src/main.tsx`).
2. Настрой `vite.config.ts` так, чтобы `@/styles` автоматически инжектился через `css.preprocessorOptions.scss.additionalData` во все `.scss` файлы (кроме самих файлов внутри `src/styles/`).
3. **Важно:** Внутри `*.module.scss` **не пиши** `@use` для переменных и миксинов — используй `$переменные` и `@include` напрямую.

# Правила кода и компонентов
- Только именованные экспорты (`export const ComponentName = ...`).
- Все CSS-классы в `.module.scss` пиши строго в `camelCase` (например, `.heroTitle`), обращение в TSX через точку (`styles.heroTitle`).
- Вложенность в SCSS — не глубже 3 уровней. Используй `&` только для псевдоклассов/элементов (`&:hover`, `&::before`), без БЭМ-склейки (`&__item`).
- Объединение классов: `[styles.base, isActive && styles.active].filter(Boolean).join(' ')`.

# Дизайн, UX и структура страниц
- **Визуал:** Dark Modern / AI Tech, стеклянный фиксированный хедер (`backdrop-filter: blur`), мягкое радиальное свечение (glow) на фоне, Bento-сетка для навыков.
- **Анимации:** Создай хук `useInView` на базе нативного `IntersectionObserver` и компонент-обёртку `<Reveal delay={...}>` для плавного всплытия блоков при скролле (`opacity`, `translateY`, `blur`) без сторонних библиотек.
- **Секции:**
  1. `Header` (навигация + адаптивное бургер-меню).
  2. `Hero` (бейдж статуса, оффер с градиентным акцентом, CTA-кнопки).
  3. `BentoSkills` (асимметричная сетка: Front-end, AI Engineering/LLM, Чат-боты/TMA, SaaS).
  4. `Projects` (кейсы с интерактивной фильтрацией по категориям и бизнес-метриками).
  5. `Experience` (таймлайн опыта + кнопка скачивания PDF CV).
  6. `Contact` (форма сотрудничества с выбором направления задачи и прямыми контактами).

# Формат ответа
Выдай полную структуру папок и код каждого файла в отдельных подписанных блоках (`vite.config.ts`, `tsconfig.app.json`, файлы стилей, хуки, компоненты и `App.tsx`).
