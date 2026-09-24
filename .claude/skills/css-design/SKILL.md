---
name: css-design
description: CSS design system guidelines for the blog. Use when styling components, adding colors, or working with Tailwind classes. Invoked when user asks about styling, colors, dark mode, or design consistency.
---

# CSS Design System

Follow these guidelines for all styling and design work.

## Color System

### Primary Color Scale: Neutral

**CRITICAL:** Use **neutral** for all neutral colors. **NEVER use `gray-*` utilities.**

**Text Colors:**

- `text-neutral-800 dark:text-neutral-100` - Primary text (headings, important content)
- `text-neutral-600 dark:text-neutral-400` - Secondary text (body copy, descriptions)
- `text-neutral-500 dark:text-neutral-500` - Tertiary text (timestamps, metadata)
- `text-neutral-400 dark:text-neutral-500` - Muted text (captions, subtle labels)

**Background Colors:**

- `bg-white dark:bg-neutral-900` - Page background
- `bg-neutral-50 dark:bg-neutral-800` - Subtle backgrounds (hover states, cards)
- `bg-neutral-100 dark:bg-neutral-800` - Slightly stronger backgrounds

**Border Colors:**

- `border-neutral-100 dark:border-neutral-700/40` - Main borders
- `border-neutral-200 dark:border-neutral-800` - Dividers
- `divide-neutral-200` - List dividers (use with divide-y)

### Accent Color: Blue

**Standard Pattern:**

```jsx
className =
  'text-neutral-800 hover:text-blue-500 dark:text-neutral-200 dark:hover:text-blue-400'
```

**IMPORTANT:** Always use `blue-500` in light mode and `blue-400` in dark mode for consistency.

`blue-500`, `blue-600` and the whole `neutral-*` scale are customised in `tailwind.config.js` (loaded via `@config` in `src/styles/tailwind.css`).

**Light Mode:**

- `blue-500` (#2563EB) - Primary accent, links, hover states
- `blue-600` (#3843D0) - Main accent fills, active states

**Dark Mode:**

- `blue-400` - Primary accent, links, hover states

## Dark Mode Patterns

**CRITICAL:** Always pair light and dark mode utilities for consistent theming.

**Example pairings:**

```jsx
// Text
text-neutral-800 dark:text-neutral-100      // Primary
text-neutral-600 dark:text-neutral-400      // Secondary

// Backgrounds
bg-white dark:bg-neutral-900             // Page
bg-neutral-50 dark:bg-neutral-800           // Subtle

// Borders
border-neutral-100 dark:border-neutral-700/40
ring-neutral-900/5 dark:ring-white/10

// Interactive
hover:text-blue-500 dark:hover:text-blue-400
group-hover:bg-neutral-50 dark:group-hover:bg-neutral-800
```

## Typography Scale

**Page Titles:**

```jsx
className =
  'text-4xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100 sm:text-5xl'
```

**Section Headings (h2):**

```jsx
className = 'text-xl font-semibold text-neutral-800 dark:text-neutral-100'
```

**Subsection Headings (h3):**

```jsx
className = 'text-base font-semibold text-neutral-800 dark:text-neutral-100'
```

**Body Text:**

```jsx
className = 'text-base text-neutral-600 dark:text-neutral-400'
```

**Small Text (metadata, captions):**

```jsx
className = 'text-sm text-neutral-500 dark:text-neutral-500'
className = 'text-xs text-neutral-400 dark:text-neutral-500'
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
className = 'transition hover:text-blue-500 dark:hover:text-blue-400'
```

**Grouped Interactive Elements:**

```jsx
className = 'group' // On container
className = 'group-hover:bg-neutral-50 dark:group-hover:bg-neutral-800' // On child
className = 'group-hover:text-blue-500 dark:group-hover:text-blue-400' // On text
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
  'relative block px-3 py-2 transition hover:text-blue-500 dark:hover:text-blue-400'

// Social Links
className =
  'flex text-sm font-medium transition group text-neutral-800 hover:text-blue-500 dark:text-neutral-200 dark:hover:text-blue-400'
```

## Critical Rules

### Don't ❌

- Use `gray-*` utilities (use `neutral-*` instead)
- Use `blue-500` for dark mode hover states (use `blue-400`)
- Mix opacity approaches (pick one: `/50` or `bg-neutral-800/50`)
- Hardcode color values (use Tailwind utilities)
- Skip dark mode pairings on colored elements
- Use arbitrary values for spacing (use the scale)

### Do ✅

- Always pair light and dark mode utilities
- Use `neutral-*` for all neutral colors
- Use `blue-500` (light) and `blue-400` (dark) for accents
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
