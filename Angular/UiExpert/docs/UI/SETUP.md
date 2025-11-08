# SETUP.md

This guide explains how to wire Tailwind + the generated tokens into an Angular app.

## 1) Install Tailwind
```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## 2) Replace your tailwind.config.js
Use `UI/config/tailwind.config.js` or merge its `theme.extend` into your existing config.

## 3) Global styles
Import tokens in `src/styles.css` (or `.scss`):
```css
@import url('./UI/config/tokens.css');
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 4) Enable dark mode
Add `class="dark"` on `<html>` (or toggle via a button) to switch themes.

## 5) Verify content scanning
Ensure Tailwind `content` globs include your Angular templates:
- `./src/**/*.{html,ts}`
- `./UI/examples/**/*.html`

## 6) Run the dev server
```
ng serve
```
