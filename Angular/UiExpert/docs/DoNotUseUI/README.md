# Stitch Menarva UI - Developer Quick Start

## 馃殌 Quick Setup

### Using with Tailwind CSS
1. Copy `tailwind.config.js` to your project root
2. Import Tailwind in your main CSS file:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Using Standalone CSS
1. Include `stitch-menarva.css` in your project
2. Add RTL support to your HTML:
```html
<html dir="rtl" lang="he">
```

---

## 馃帹 Common Class Usage

### Buttons
```html
<!-- Primary button -->
<button class="btn btn-primary">砖诪讜专</button>

<!-- Secondary button -->
<button class="btn btn-secondary">讘讬讟讜诇</button>

<!-- Ghost button -->
<button class="btn btn-ghost">注专讬讻讛</button>
```

### Cards
```html
<!-- Basic card -->
<div class="card">
  <h3>讻讜转专转 讛讻专讟讬住</h3>
  <p>转讜讻谉 讛讻专讟讬住</p>
</div>

<!-- Stats card for dashboard -->
<div class="stats-card">
  <div class="text-3xl font-bold text-gray-900">250</div>
  <div class="text-sm text-gray-600">住讱 讛讻诇 讞讘专讬诐</div>
</div>
```

### Status Badges
```html
<span class="badge badge-active">驻注讬诇</span>
<span class="badge badge-inactive">诇讗 驻注讬诇</span>
<span class="badge badge-premium">驻专讬诪讬讜诐</span>
<span class="badge badge-pending">诪诪转讬谉</span>
```

### Forms (RTL Ready)
```html
<input type="text" class="form-input" placeholder="讛讝谉 讟拽住讟 讻讗谉">
<select class="form-select">
  <option>讘讞专 讗驻砖专讜转</option>
</select>
```

### Navigation
```html
<nav class="space-y-2">
  <a href="#" class="nav-item active">
    <span>诇讜讞 诪讞讜讜谞讬诐</span>
  </a>
  <a href="#" class="nav-item">
    <span>讞讘专讬诐</span>
  </a>
</nav>
```

---

## 馃幆 Layout Patterns

### Dashboard Grid
```html
<div class="grid grid-cols-dashboard gap-6">
  <div class="stats-card"><!-- Stat 1 --></div>
  <div class="stats-card"><!-- Stat 2 --></div>
  <div class="stats-card"><!-- Stat 3 --></div>
</div>
```

### Card Grid Layout
```html
<div class="grid grid-cols-card-grid gap-6">
  <div class="card"><!-- Card 1 --></div>
  <div class="card"><!-- Card 2 --></div>
  <div class="card"><!-- Card 3 --></div>
</div>
```

### Two-Column Layout
```html
<div class="grid grid-cols-two-column gap-8">
  <main><!-- Main content --></main>
  <aside><!-- Sidebar content --></aside>
</div>
```

---

## 馃摫 Responsive Design

### Breakpoints
- `sm`: 640px+
- `md`: 768px+
- `lg`: 1024px+
- `xl`: 1280px+

### Mobile-First Examples
```html
<!-- Responsive grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

<!-- Responsive text -->
<h1 class="text-xl md:text-2xl lg:text-3xl">

<!-- Responsive spacing -->
<div class="p-4 md:p-6 lg:p-8">
```

---

## 馃寪 RTL (Hebrew) Support

### Essential Classes
```html
<div class="rtl">                    <!-- Force RTL -->
<div class="text-start">             <!-- Align to text start (right in RTL) -->
<div class="mr-auto md:ml-auto">     <!-- Auto margin (responsive) -->
```

### Angular RTL Setup
```typescript
// Add to your component
@Component({
  selector: 'app-example',
  template: `<div class="rtl">{{ content }}</div>`,
  host: { '[attr.dir]': '"rtl"' }
})
```

---

## 鈿?Performance Tips

### CSS Loading
```html
<!-- Preload critical CSS -->
<link rel="preload" href="stitch-menarva.css" as="style">
<link rel="stylesheet" href="stitch-menarva.css">
```

### Tailwind Production
```bash
# Build for production (removes unused classes)
npx tailwindcss -i ./src/input.css -o ./dist/output.css --minify
```

---

## 馃帹 Color Reference (Quick)

### Primary Colors
- `bg-primary-500` - Main brand blue (#1976D2)
- `text-primary-500` - Brand text color
- `border-primary-500` - Brand borders

### Status Colors
- `text-status-active` - Green for active items
- `text-status-inactive` - Red for inactive items
- `text-status-premium` - Blue for premium features

### Neutral Colors
- `bg-gray-50` to `bg-gray-900` - Gray scale
- `text-gray-600` - Default text color
- `border-gray-300` - Default border color

---

## 馃悰 Common Issues & Solutions

### RTL Issues
```css
/* Fix icon alignment in RTL */
.icon-right { margin-right: 8px; }
[dir="rtl"] .icon-right { margin-right: 0; margin-left: 8px; }
```

### Form Focus States
```css
/* Custom focus ring */
.form-input:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
}
```

### Mobile Navigation
```html
<!-- Responsive sidebar -->
<aside class="w-64 transform -translate-x-full lg:translate-x-0 transition-transform">
```

---

## 馃摎 File Structure

```
docs/UI/stitch-menarva-guidelines/
鈹溾攢鈹€ stitch-menarva-ui-guidelines.md    # Complete design system
鈹溾攢鈹€ tailwind.config.js                 # Tailwind configuration
鈹溾攢鈹€ ui-developer-readme.md             # This quick start guide
鈹溾攢鈹€ stitch-menarva.css                 # Standalone CSS
鈹溾攢鈹€ sample-member-card.component.html  # Angular example
鈹斺攢鈹€ style-guide-showcase.html          # Component showcase
```

---

## 馃毃 Important Notes

1. **Always test with Hebrew text** - Ensure proper RTL behavior
2. **Use logical properties** when possible (`margin-inline-start` vs `margin-left`)
3. **Maintain accessibility** - Include proper ARIA labels and focus states
4. **Follow spacing scale** - Use predefined spacing values (4, 8, 16, 24px, etc.)
5. **Test on mobile** - Ensure components work well on small screens

---

## 馃敆 Need Help?

- 馃摉 Full documentation: `stitch-menarva-ui-guidelines.md`
- 馃帹 Component showcase: `style-guide-showcase.html`
- 馃捇 Angular example: `sample-member-card.component.html`
- 馃帥锔?Tailwind config: `tailwind.config.js`