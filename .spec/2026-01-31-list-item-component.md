# ListItem Component Extraction

Create a reusable ListItem component to eliminate duplication across list pages

## Status: ✅ Implemented (2026-01-31)

## Problem

The backlog, developer, and list index pages currently implement custom article card markup with duplicated styling and structure. Each page has similar but slightly different implementations:

**Pattern repeated across:**
- `src/pages/backlog.jsx` (lines 9-24)
- `src/pages/developer/[tag]/index.jsx` (lines 22-46)
- `src/pages/list/index.jsx` (lines 22-38)

Each implements:
- Grid layout with date column and content column
- Hover effects on the row
- Eyebrow text (tag or category)
- Title with link
- Description text
- Grouped article styling

This violates DRY principles and makes it difficult to maintain consistent styling. Changes to the list item appearance require updating three separate files.

## Solution

Create a reusable `ListItem` component that encapsulates the shared pattern and can be used across all list pages. The component should:

1. Accept props for all variable content (title, description, date, href, eyebrow)
2. Use consistent styling that matches the rest of the design system (zinc colors, not gray)
3. Support optional eyebrow text for tags/categories
4. Maintain the current grid layout pattern (date + content columns)
5. Integrate seamlessly with existing page layouts

## Files to Modify

### New File

**`src/components/ListItem.jsx`** - Create new component
```jsx
import Link from 'next/link'
import { formatDate } from '@/lib/formatDate'

export function ListItem({ title, description, date, href, eyebrow }) {
  return (
    <article className="group">
      <Link href={href}>
        <div className="grid grid-cols-10 py-2 group-hover:bg-zinc-50 dark:group-hover:bg-zinc-800">
          <div className="col-span-2">
            <time className="text-sm text-zinc-400 dark:text-zinc-500">
              {formatDate(date)}
            </time>
          </div>
          <div className="col-span-8">
            {eyebrow && (
              <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-100">
                {eyebrow}
              </p>
            )}
            <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
              {title}
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {description}
            </p>
          </div>
        </div>
      </Link>
    </article>
  )
}
```

### Files to Refactor

**`src/pages/backlog.jsx`**
- Import ListItem component
- Replace custom article markup (lines 9-24) with `<ListItem />`
- Pass props: `title`, `description`, `date`, `href={/backlog/${slug}}`
- No eyebrow for backlog items

**`src/pages/developer/[tag]/index.jsx`**
- Import ListItem component
- Replace custom article markup (lines 22-46) with `<ListItem />`
- Pass props: `title`, `description`, `date`, `href={/developer/${tag}/${slug}}`, `eyebrow={tag}`

**`src/pages/list/index.jsx`**
- Import ListItem component
- Replace custom article markup (lines 22-38) with `<ListItem />`
- Pass props: `title`, `description`, `date`, `href={/list/${tag}}`, `eyebrow={tag}`

## Testing

### Manual Testing Steps

1. **Visual regression testing**
   - Open `/backlog` and verify list items look identical to before
   - Open `/developer` and `/developer/elixir` - verify list items match previous design
   - Open `/list` - verify list items display correctly
   - Toggle dark mode on each page - ensure styling is correct

2. **Interaction testing**
   - Hover over list items - verify background changes to zinc-50/zinc-800
   - Click list items - verify navigation works correctly
   - Test keyboard navigation (Tab to focus, Enter to activate)

3. **Responsive testing**
   - Test on mobile viewport - verify grid columns stack appropriately
   - Test on tablet viewport - verify layout remains functional
   - Test on desktop - verify spacing and alignment

4. **Content variations**
   - Pages with eyebrows (developer, list) - verify eyebrow displays
   - Pages without eyebrows (backlog) - verify no empty space
   - Items with long descriptions - verify text wraps correctly
   - Items with short descriptions - verify spacing remains consistent

### Edge Cases to Verify

- Empty or missing descriptions
- Very long titles that might wrap
- Dates in different formats (ensure formatDate works)
- List items at various screen sizes
- Dark mode transitions when toggling theme

## Implementation Notes

### Key Decisions Made

1. **Component API Design**
   - Props: `{ title, description, date, href, eyebrow }`
   - Simple, flat prop structure (no nested objects)
   - Eyebrow is optional (undefined = not rendered)

2. **Grid Layout Preserved**
   - Maintains current `grid-cols-10` with 2-column date, 8-column content
   - Keeps existing responsive behavior
   - Preserves hover effects

3. **Styling Choices**
   - Uses zinc color scale (not gray) to match design system
   - Consistent with other components (Card, Header, Footer)
   - Dark mode follows established patterns

4. **Not Using Card Component**
   - Card component is designed for different layout (stacked content with CTA)
   - List items use horizontal grid layout
   - Creating a separate component avoids forcing Card into wrong use case

### Gotchas

- **Date formatting**: Ensure `formatDate` utility is imported and available
- **href construction**: Each page builds hrefs differently (backlog vs developer vs list)
- **Eyebrow conditional**: Make sure eyebrow doesn't render empty `<p>` tags when undefined
- **Grid columns**: Mobile behavior may need responsive classes if grid doesn't stack well

### Alternative Approaches Considered

**Option 1: Extend Card Component**
- Rejected: Card has different layout semantics (vertical stack, not grid)
- Would require adding complexity to Card for a different use case

**Option 2: Use Card with Custom Grid**
- Rejected: Forces inappropriate component abstraction
- Card.Link uses absolute positioning, incompatible with grid layout

**Option 3: Create Layout Component Instead**
- Rejected: ListItem is semantic (represents an article in a list)
- Pure layout component would require more boilerplate at usage site

**Chosen Approach: Dedicated ListItem Component**
- Most semantic and clear intent
- Simple API without fighting existing abstractions
- Easy to maintain and extend

### Rationale for Approach

This refactoring:
- **Eliminates duplication** across three pages
- **Improves maintainability** - single source of truth for list item styling
- **Enables consistent evolution** - future changes apply everywhere automatically
- **Maintains visual parity** - users see no difference
- **Improves code readability** - clearer intent with named component

## Related

- `.spec/2026-01-31-css-design-consistency.md` - Should be implemented first (fixes gray→zinc)
- `src/components/Card.jsx` - Similar pattern but different use case
- `src/lib/formatDate.js` - Date formatting utility used by component
