<!--ДОЛЖЕН ЛЕЖАТЬ В КОРНЕ ПРОЕКТА-->


---
name: react-vite-ts-scss-portfolio
description: Архитектурные стандарты и правила генерации компонентов для стека Vite 8 + React + TypeScript 6 + SCSS Modules.
---

# Project Architecture & Coding Standards

## Environment & Tooling
- **Package Manager:** `pnpm` (при добавлении пакетов со скриптами сборки использовать `pnpm approve-builds`).
- **Build Tool:** Vite 8+. В `vite.config.ts` использовать `import.meta.dirname` (не `__dirname`).
- **TypeScript:** TS 6+ (`strict: true`). Алиас `@/*` настроен в `tsconfig.app.json` через `"paths"` **без** `baseUrl`.

## Component Conventions
- Создавай компоненты в отдельных директориях: `src/components/Name/Name.tsx` + `Name.module.scss` (или `src/sections/...`).
- Используй только именованные экспорты: `export const Name = () => { ... }`.
- Всегда описывай `interface NameProps`. Использование `any` запрещено.
- Для scroll-анимаций оборачивай новые блоки в `<Reveal delay={ms}>` из `@/components/Reveal/Reveal`.

## Styling Rules (Strict SCSS Modules)
- **Изоляция:** Никакого Tailwind и inline-стилей. Только `*.module.scss`.
- **Именование:** Классы строго в `camelCase` (`.sectionTitle`, `.cardActive`). Плагин `vite-css-modules` автоматически генерирует `.d.ts` типы.
- **Глобальные токены:** Файл `src/styles/_index.scss` (`_variables.scss` + `_mixins.scss`) автоматически подключается во все модули через `vite.config.ts`.
  - **НЕ ДОБАВЛЯЙ** `@use "@/styles"` в файлы `*.module.scss` — переменные (`$color-primary`, `$radius-md` и др.) и миксины (`@include up('md')`, `@include down('md')`) уже доступны глобально.
- **Чистота SCSS:** Максимум 3 уровня вложенности. Амперсанд `&` только для состояний (`&:hover`, `&:focus-visible`) и псевдоэлементов.
