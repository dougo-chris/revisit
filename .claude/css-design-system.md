# CSS Design System

Documentation of CSS patterns, color usage, and styling conventions for the Revisit blog.

## Color System

### Primary Color Scale: Zinc

The site uses **Tailwind's zinc color scale** as the foundation for all neutral colors. Do not use `gray-*` utilities.

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

Custom teal shades defined in `tailwind.config.js`:

**Light Mode:**
- `teal-500` (#0d9488) - Primary accent, links, hover states
- `teal-600` (#0f766e) - Darker hover states, active states

**Dark Mode:**
- `teal-400` - Primary accent, links, hover states (default Tailwind value)
- `teal-300` - Used only in syntax highlighting (prism.css)

**Standard Pattern:**
```jsx
className="text-zinc-800 hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-400"
```

**Important:** Always use `teal-500` in light mode and `teal-400` in dark mode for consistency.

### Syntax Highlighting Colors

Defined in `src/styles/prism.css`:
- Pink: `.token.tag`, `.token.function` - `pink-400`
- Zinc: `.token.keyword`, `.token.attr-name` - `zinc-300`
- Teal: `.token.string`, `.token.property` - `teal-300`
- Sky: `.token.unit` - `sky-200`
- Zinc (muted): `.token.comment` - `zinc-400`

## Dark Mode Patterns

### Variant Configuration

The site uses Tailwind 4's custom variant defined in `src/styles/tailwind.css`:

```css
@variant dark (&:where(.dark, .dark *));
```

Dark mode is toggled via a `.dark` class on a parent element (usually `<html>`).

### Pairing Patterns

Always pair light and dark mode utilities for consistent theming:

**Text:**
```jsx
text-zinc-800 dark:text-zinc-100      // Primary
text-zinc-600 dark:text-zinc-400      // Secondary
```

**Backgrounds:**
```jsx
bg-white dark:bg-zinc-900             // Page
bg-zinc-50 dark:bg-zinc-800           // Subtle
bg-white/90 dark:bg-zinc-800/90       // With opacity
```

**Borders:**
```jsx
border-zinc-100 dark:border-zinc-700/40
ring-zinc-900/5 dark:ring-white/10
```

**Interactive States:**
```jsx
hover:text-teal-500 dark:hover:text-teal-400
group-hover:bg-zinc-50 dark:group-hover:bg-zinc-800
```

## Typography Scale

### Font Sizes

Defined in `tailwind.config.js` with corresponding line heights:

```javascript
fontSize: {
  xs: ['0.8125rem', { lineHeight: '1.5rem' }],    // 13px
  sm: ['0.875rem', { lineHeight: '1.5rem' }],     // 14px
  base: ['1rem', { lineHeight: '1.75rem' }],      // 16px
  lg: ['1.125rem', { lineHeight: '1.75rem' }],    // 18px
  xl: ['1.25rem', { lineHeight: '2rem' }],        // 20px
  '2xl': ['1.5rem', { lineHeight: '2rem' }],      // 24px
  '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
  '4xl': ['2rem', { lineHeight: '2.5rem' }],      // 32px
  '5xl': ['3rem', { lineHeight: '3.5rem' }],      // 48px
}
```

### Usage Patterns

**Page Titles:**
```jsx
className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl"
```

**Section Headings (h2):**
```jsx
className="text-xl font-semibold text-zinc-800 dark:text-zinc-100"
```

**Subsection Headings (h3):**
```jsx
className="text-base font-semibold text-zinc-800 dark:text-zinc-100"
```

**Body Text:**
```jsx
className="text-base text-zinc-600 dark:text-zinc-400"
```

**Small Text (metadata, captions):**
```jsx
className="text-sm text-zinc-500 dark:text-zinc-500"
className="text-xs text-zinc-400 dark:text-zinc-500"
```

### Font Weights

- `font-bold` - Page titles, emphasis (700)
- `font-semibold` - Headings, links, labels (600)
- `font-medium` - Subtle emphasis (500)
- `font-base` - Default weight (400)

## Spacing System

### Container Widths

```jsx
max-w-7xl  // Outer container (site-wide max)
max-w-5xl  // Wide content (two-column layouts)
max-w-3xl  // Article content (prose)
max-w-2xl  // Narrow content
```

**Standard Container Pattern:**
```jsx
<Container.Outer>
  <Container.Inner>
    {/* max-w-2xl lg:max-w-5xl by default */}
  </Container.Inner>
</Container.Outer>
```

### Vertical Spacing

**Page Sections:**
```jsx
mt-8 sm:mt-16   // Standard top margin for sections
mt-32           // Footer separation
```

**Content Spacing:**
```jsx
mt-6   // Default content gap
space-y-7  // Homepage paragraph spacing
gap-6  // Flex/grid gaps
```

**Component Internal Spacing:**
```jsx
px-3 py-2  // Button padding, nav items
p-1        // Menu items (tight)
py-2       // List items (compact)
py-4       // List items (comfortable)
```

### Responsive Spacing

Use responsive prefixes for different breakpoints:
```jsx
mt-8 sm:mt-16           // More spacing on larger screens
px-4 sm:px-6 lg:px-8   // Progressive padding
```

## Border Radius

**Consistent Patterns:**
- `rounded-md` - Buttons, small interactive elements
- `rounded-lg` - Diagrams, error states, code blocks
- `rounded-2xl` - Cards, images, medium containers
- `rounded-3xl` - Large panels (mobile nav), code blocks
- `rounded-full` - Pills, avatars, badges

## Interactive States

### Hover Effects

**Links and Buttons:**
```jsx
className="transition hover:text-teal-500 dark:hover:text-teal-400"
```

**Grouped Interactive Elements:**
```jsx
className="group"  // On container
className="group-hover:bg-zinc-50 dark:group-hover:bg-zinc-800"  // On child
className="group-hover:text-teal-500 dark:group-hover:text-teal-400"  // On text
```

**Icons:**
```jsx
className="transition fill-zinc-500 group-hover:fill-teal-500"
```

### Transitions

**Standard Pattern:**
```jsx
className="transition"  // Uses default transition settings
```

For specific properties:
```jsx
transitionProperty: 'color, text-decoration-color',
transitionDuration: theme('transitionDuration.150'),
transitionTimingFunction: theme('transitionTimingFunction.in-out'),
```

### Focus States

Use default Tailwind focus rings or customize:
```jsx
focus:outline-none focus:ring-2 focus:ring-teal-500
```

### Active States

For buttons only (from Button component):
```jsx
active:transition-none  // Removes transition delay on click
```

## Layout Patterns

### Two-Column Grid

```jsx
<div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-y-12">
  <div>{/* Column 1 */}</div>
  <div>{/* Column 2 */}</div>
</div>
```

### List Layout with Sidebar

```jsx
<div className="flex flex-wrap mt-8 md:flex-nowrap">
  <div className="h-full w-full md:w-48 md:mr-8 md:sticky md:top-32">
    {/* Sidebar */}
  </div>
  <div className="w-full divide-y divide-zinc-200 md:-mt-2">
    {/* List items */}
  </div>
</div>
```

### Grid-Based List Item

```jsx
<div className="grid grid-cols-10 py-2 group-hover:bg-zinc-50 dark:group-hover:bg-zinc-800">
  <div className="col-span-2">{/* Date */}</div>
  <div className="col-span-8">{/* Content */}</div>
</div>
```

## Component Patterns

### Card Component

Use the `Card` component for article listings:

```jsx
<Card as="article">
  <Card.Title href={href}>Title</Card.Title>
  <Card.Eyebrow as="time" dateTime={date}>Date</Card.Eyebrow>
  <Card.Description>Description text</Card.Description>
  <Card.Cta>Read more</Card.Cta>
</Card>
```

### Button Component

Use the `Button` component for all button elements:

```jsx
<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
```

Supports polymorphic rendering (`as` prop) to render as Link or button.

### Navigation Links

**Header Navigation:**
```jsx
className="relative block px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400"
```

**Footer Navigation:**
```jsx
className="px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400"
```

**Social Links:**
```jsx
className="flex text-sm font-medium transition group text-zinc-800 hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-400"
```

## Prose Styling

All markdown content is wrapped with the `Prose` component:

```jsx
<Prose className="mt-8" dangerouslySetInnerHTML={{ __html: html }} />
```

Prose styles are defined in `tailwind.config.js` under the `typography` plugin configuration. The prose component automatically applies:
- Custom link colors (teal accent)
- Code block styling
- Table formatting
- List styling
- Blockquote styling
- All dark mode variants via `prose-invert`

## Common Pitfalls

### Don't

- ❌ Use `gray-*` utilities (use `zinc-*` instead)
- ❌ Use `teal-500` in dark mode hover states (use `teal-400`)
- ❌ Mix opacity approaches (pick one: `/50` or `bg-zinc-800/50`)
- ❌ Hardcode color values (use Tailwind utilities)
- ❌ Skip dark mode pairings on colored elements
- ❌ Use arbitrary values for spacing (use the scale)

### Do

- ✅ Always pair light and dark mode utilities
- ✅ Use `zinc-*` for all neutral colors
- ✅ Use `teal-500` (light) and `teal-400` (dark) for accents
- ✅ Use the defined spacing scale consistently
- ✅ Group hover effects with `group` and `group-hover:`
- ✅ Add transitions to interactive elements
- ✅ Use semantic components (Card, Button) when available

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
