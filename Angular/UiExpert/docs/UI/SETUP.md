# UI Settings Setup Guide

This guide explains which files to copy from the `docs/UI/` folder to your Angular project to apply the Stitch Menarva UI design system.

## Quick Setup

### Step 1: Copy Base Project CSS (Required for All Setups)

**Copy the base project CSS file:**
```bash
cp docs/UI/styles/project.css ./src/styles/project.css
```

**Import it** in your `src/styles.css`:
```css
@import 'styles/project.css';
```

This file contains the base project styles and design system foundation that all components rely on.

### Step 2: Choose Your CSS Framework

#### Option A: Using Tailwind CSS (Recommended)

1. **Copy the Tailwind configuration file:**
   ```bash
   cp docs/UI/config/tailwind.config.js ./tailwind.config.js
   ```

2. **Install Tailwind CSS** (if not already installed):
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   ```

3. **Import Tailwind directives** in your main CSS file (`src/styles.css`):
   ```css
   @import 'styles/project.css';
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

4. **Add RTL support** to your main HTML file (`src/index.html`):
   ```html
   <html dir="rtl" lang="he">
   ```

#### Option B: Using Standalone CSS Only

If you prefer not to use Tailwind, the `project.css` file already contains all necessary styles.

1. **Ensure project.css is imported** in your `src/styles.css`:
   ```css
   @import 'styles/project.css';
   ```

2. **Add RTL support** to your main HTML file (`src/index.html`):
   ```html
   <html dir="rtl" lang="he">
   ```

## Files Reference

| File | Purpose | Required |
|------|---------|----------|
| `styles/project.css` | **Base project CSS** with design system foundation, component styles, and design tokens | **YES (Always Required)** |
| `config/tailwind.config.js` | Tailwind CSS configuration with extended design tokens and utility classes | Yes (if using Tailwind) |
| `ui-guidelines.md` | Design system documentation and usage guide | No (reference only) |
| `ui-readme.md` | Developer quick reference | No (reference only) |
| `README.md` | Quick start guide with examples | No (reference only) |
| `examples/demo-card.component.html` | Sample Angular component | No (reference only) |
| `examples/style-guide.html` | Component showcase | No (reference only) |

## What You Get

After setup, you'll have access to:

### Component Classes
- **Buttons**: `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-ghost`
- **Cards**: `.card`, `.card-elevated`, `.stats-card`
- **Badges**: `.badge`, `.badge-active`, `.badge-inactive`, `.badge-premium`, `.badge-pending`
- **Forms**: `.form-input`, `.form-select`, `.form-textarea`
- **Navigation**: `.nav-item`, `.nav-item.active`
- **Tables**: `.table`
- **Avatars**: `.avatar`, `.avatar-large`

### Design Tokens
- **Colors**: Primary blues, status colors (active/inactive/pending/premium), gray scale
- **Typography**: Hebrew-optimized font stack (Segoe UI, Arial Hebrew)
- **Spacing**: Consistent 4px-based scale
- **Shadows**: Subtle, card, and elevated
- **Border Radius**: sm (4px), md (6px), lg (8px), xl (12px), 2xl (16px)

### RTL Support
- Built-in RTL support for Hebrew text
- Proper text alignment and directionality
- RTL-aware spacing and positioning

## Verification

To verify your setup works correctly:

1. Add a test component to any page:
   ```html
   <div class="card">
     <h3 class="text-xl font-semibold mb-4">בדיקת עיצוב</h3>
     <p class="text-gray-600 mb-4">זהו טקסט לדוגמה בעברית</p>
     <div class="flex gap-4">
       <button class="btn btn-primary">כפתור ראשי</button>
       <button class="btn btn-secondary">כפתור משני</button>
     </div>
     <span class="badge badge-active">פעיל</span>
   </div>
   ```

2. Run your development server:
   ```bash
   npm start
   ```

3. You should see a properly styled card with Hebrew text, buttons, and badges.

## Need Help?

- **Full documentation**: `docs/UI/README.md`
- **Design guidelines**: `docs/UI/ui-guidelines.md`
- **Component examples**: `docs/UI/examples/demo-card.component.html`
- **Component showcase**: `docs/UI/examples/style-guide.html`

## Notes

- **`project.css` is always required** - it contains the base design system that all components depend on
- The Tailwind configuration **extends** the base project styles with additional utilities and helpers
- Tailwind option provides utility classes for rapid development and better tree-shaking
- Standalone CSS option (project.css only) provides complete styling without additional dependencies
- Both options include RTL support and Hebrew-optimized typography
- Choose Tailwind if you want utility-first development and smaller production bundles
- Choose standalone CSS if you prefer a simpler setup without build tools configuration

## Summary

**Minimum Required Files:**
- `styles/project.css` → `src/styles/project.css` ✅ **Always copy this**

**Optional (for Tailwind users):**
- `config/tailwind.config.js` → `./tailwind.config.js` (adds utility classes on top of project.css)
