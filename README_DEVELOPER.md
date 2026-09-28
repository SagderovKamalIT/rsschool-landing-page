# 🛠 Инструкция по сборке и деплою (Vite + SCSS)

## 📌 1. Локальная разработка

1. Установка всех зависимостей проекта:
   ```bash
   npm install
   ```

2. Запуск локального сервера (разработка на `http://localhost:5173/`):
   ```bash
   npm run dev
   ```

---

## 📦 2. Сборка проекта

* Компиляция SCSS, оптимизация JS и картинок в финальную папку `dist/`:
  ```bash
  npm run build
  ```

* Локальная проверка собранного проекта из папки `dist/` перед отправкой:
  ```bash
  npm run preview
  ```

---

## 🚀 3. Публикация на GitHub Pages

### Шаг A. Конфигурация Vite
Убедитесь, что в файле `vite.config.js` в корне проекта указан правильный путь к вашему репозиторию:
```javascript
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/rsschool-landing-page/',
});
```

### Шаг B. Настройка скриптов в `package.json`
Убедитесь, что в блоке `"scripts"` прописана следующая команда:
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "deploy": "gh-pages -d dist"
}
```

### Шаг C. Публикация проекта
Выполните поочередно две команды в терминале:

1. Собрать актуальный код:
   ```bash
   npm run build
   ```

2. Отправить сборку в ветку `gh-pages` на GitHub:
   ```bash
   npm run deploy
   ```

*После появления надписи **Published** сайт обновится по ссылке в течение пары минут.*
