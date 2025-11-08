
# ⚙️ Setup Instructions (Dark Theme Angular Project)

1. **Install Tailwind CSS**
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init
   ```

2. **Add Tailwind Directives**
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

3. **Enable Dark Mode**
   - In `tailwind.config.js`, ensure:
     ```js
     darkMode: 'class',
     ```
   - Apply dark mode by toggling a class on the `<html>` or `<body>` tag:
     ```js
     document.documentElement.classList.toggle('dark');
     ```

4. **Integrate into Angular**
   - Update `angular.json`:
     ```json
     "styles": ["src/styles.css"]
     ```

5. **Run Build**
   ```bash
   npm run build
   ```
