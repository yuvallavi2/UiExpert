
# 🌙 UI Guidelines (Dark Theme)

## Design Tokens
- **Primary Color:** #3b82f6
- **Secondary Color:** #64748b
- **Success:** #22c55e
- **Warning:** #f59e0b
- **Danger:** #ef4444
- **Background:** #0f172a
- **Surface:** #1e293b
- **Text Color:** #f1f5f9

## Typography
- **Font Family:** Inter, sans-serif
- **Base Size:** 16px
- **Weights:** 400 / 500 / 700

## Components
### Buttons
```html
<button class="bg-primary text-white font-medium px-4 py-2 rounded-xl hover:bg-blue-600">Primary</button>
```

### Cards
```html
<div class="bg-surface text-text rounded-xl p-4 shadow border border-slate-700">
  <h3 class="font-semibold text-lg mb-2">Card Title</h3>
  <p class="text-muted">Dark mode card example content...</p>
</div>
```

### Tables
```html
<table class="min-w-full border-collapse bg-surface text-text">
  <thead class="bg-slate-800 text-gray-300">
    <tr><th class="p-2 text-left">Name</th><th>Status</th></tr>
  </thead>
  <tbody><tr><td class="p-2">Example</td><td><span class="text-success">Active</span></td></tr></tbody>
</table>
```

### Layout
Use padding and spacing with `p-4`, `p-6`, `space-y-4`, and ensure proper visual hierarchy.
