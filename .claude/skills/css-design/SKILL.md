---
name: css-design
description: CSS design system guidelines for the blog. Use when styling components, adding colors, or working with Tailwind classes. Invoked when user asks about styling, colors, dark mode, or design consistency.
---

# CSS Design System

Follow these guidelines for all styling and design work.

## Color System

### Primary Color Scale: Zinc

**CRITICAL:** Use **zinc** for all neutral colors. **NEVER use `gray-*` utilities.**

**Text Colors:**

- `text-zinc-800 dark:text-zinc-100` - Primary text (headings, important content)
- `text-zinc-600 dark:text-zinc-400` - Secondary text (body copy, descriptions)
- `text-zinc-500 dark:text-zinc-500` - Tertiary text (timestamps, metadata)
- `text-zinc-400 dark:text-zinc-500` - Muted text (captions, subtle labels)

**Background Colors:**

- `bg-white dark:bg-zinc-900` - Page background
- `bg-zinc-50 dark:bg-zinc-800` - Subtle backgrounds (hover states, cards)
- `bg-zinc-100 dark:bg-zinc-800` - Slightly stronger backgrounds

**Border Colors:**

- `border-zinc-100 dark:border-zinc-700/40` - Main borders
- `border-zinc-200 dark:border-zinc-800` - Dividers
- `divide-zinc-200` - List dividers (use with divide-y)

### Accent Color: Teal

**Standard Pattern:**

```jsx
className =
  'text-zinc-800 hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-400'
```

**IMPORTANT:** Always use `teal-500` in light mode and `teal-400` in dark mode for consistency.

**Light Mode:**

- `teal-500` (#0d9488) - Primary accent, links, hover states
- `teal-600` (#0f766e) - Darker hover states, active states

**Dark Mode:**

- `teal-400` - Primary accent, links, hover states

## Dark Mode Patterns

**CRITICAL:** Always pair light and dark mode utilities for consistent theming.

**Example pairings:**

```jsx
// Text
text-zinc-800 dark:text-zinc-100      // Primary
text-zinc-600 dark:text-zinc-400      // Secondary

// Backgrounds
bg-white dark:bg-zinc-900             // Page
bg-zinc-50 dark:bg-zinc-800           // Subtle

// Borders
border-zinc-100 dark:border-zinc-700/40
ring-zinc-900/5 dark:ring-white/10

// Interactive
hover:text-teal-500 dark:hover:text-teal-400
group-hover:bg-zinc-50 dark:group-hover:bg-zinc-800
```

## Typography Scale

**Page Titles:**

```jsx
className =
  'text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl'
```

**Section Headings (h2):**

```jsx
className = 'text-xl font-semibold text-zinc-800 dark:text-zinc-100'
```

**Subsection Headings (h3):**

```jsx
className = 'text-base font-semibold text-zinc-800 dark:text-zinc-100'
```

**Body Text:**

```jsx
className = 'text-base text-zinc-600 dark:text-zinc-400'
```

**Small Text (metadata, captions):**

```jsx
className = 'text-sm text-zinc-500 dark:text-zinc-500'
className = 'text-xs text-zinc-400 dark:text-zinc-500'
```

**Font Weights:**

- `font-bold` - Page titles, emphasis (700)
- `font-semibold` - Headings, links, labels (600)
- `font-medium` - Subtle emphasis (500)
- `font-base` - Default weight (400)

## Spacing System

**Container Widths:**

```jsx
max-w-7xl  // Outer container (site-wide max)
max-w-5xl  // Wide content (two-column layouts)
max-w-3xl  // Article content (prose)
max-w-2xl  // Narrow content
```

**Vertical Spacing:**

```jsx
mt-8 sm:mt-16   // Standard top margin for sections
mt-32           // Footer separation
mt-6            // Default content gap
space-y-7       // Homepage paragraph spacing
gap-6           // Flex/grid gaps
```

**Component Internal Spacing:**

```jsx
px-3 py-2  // Button padding, nav items
p-1        // Menu items (tight)
py-2       // List items (compact)
py-4       // List items (comfortable)
```

## Border Radius

- `rounded-md` - Buttons, small interactive elements
- `rounded-lg` - Diagrams, error states, code blocks
- `rounded-2xl` - Cards, images, medium containers
- `rounded-3xl` - Large panels (mobile nav), code blocks
- `rounded-full` - Pills, avatars, badges

## Interactive States

**Links and Buttons:**

```jsx
className = 'transition hover:text-teal-500 dark:hover:text-teal-400'
```

**Grouped Interactive Elements:**

```jsx
className = 'group' // On container
className = 'group-hover:bg-zinc-50 dark:group-hover:bg-zinc-800' // On child
className = 'group-hover:text-teal-500 dark:group-hover:text-teal-400' // On text
```

**Transitions:**

```jsx
className = 'transition' // Uses default transition settings
```

## Component Patterns

**Card Component:**

```jsx
<Card as="article">
  <Card.Title href={href}>Title</Card.Title>
  <Card.Eyebrow as="time" dateTime={date}>
    Date
  </Card.Eyebrow>
  <Card.Description>Description text</Card.Description>
  <Card.Cta>Read more</Card.Cta>
</Card>
```

**Button Component:**

```jsx
<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
```

**Navigation Links:**

```jsx
// Header Navigation
className =
  'relative block px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400'

// Social Links
className =
  'flex text-sm font-medium transition group text-zinc-800 hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-400'
```

## Critical Rules

### Don't ❌

- Use `gray-*` utilities (use `zinc-*` instead)
- Use `teal-500` in dark mode hover states (use `teal-400`)
- Mix opacity approaches (pick one: `/50` or `bg-zinc-800/50`)
- Hardcode color values (use Tailwind utilities)
- Skip dark mode pairings on colored elements
- Use arbitrary values for spacing (use the scale)

### Do ✅

- Always pair light and dark mode utilities
- Use `zinc-*` for all neutral colors
- Use `teal-500` (light) and `teal-400` (dark) for accents
- Use the defined spacing scale consistently
- Group hover effects with `group` and `group-hover:`
- Add transitions to interactive elements
- Use semantic components (Card, Button) when available

## Testing Checklist

When adding new components or modifying styles:

- [ ] Light mode looks correct
- [ ] Dark mode looks correct
- [ ] Hover states work in both modes
- [ ] No `gray-*` utilities used
- [ ] Teal accent uses correct shades (500/400)
- [ ] Transitions are smooth
- [ ] Spacing matches existing patterns
- [ ] Mobile layout is responsive
- [ ] Focus states are accessible
