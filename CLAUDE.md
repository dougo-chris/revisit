# Revisit - Static Next.js Blog

A statically-generated Next.js blog/portfolio site based on the Tailwind UI "Spotlight" template. File-based content management with markdown articles and JSON lists. Built for static export — no server required.

## Technologies

- **Next.js 16** - Framework (Pages Router, configured for static export)
- **React 19** - UI library
- **Tailwind CSS 4** - Styling (`src/styles/tailwind.css` loads `tailwind.config.js` via `@config`)
- **ReactMarkdown** - Markdown rendering (with remark-gfm, rehype-prism)
- **gray-matter** - Frontmatter parsing
- **fast-glob** - File discovery
- **@headlessui/react** - Accessible UI components
- **feed** - RSS/JSON feed generation
- **Mermaid** - Diagram rendering

## Static Export Constraints

**CRITICAL:** The site uses `output: "export"` in `next.config.mjs`.

- All pages must use `getStaticProps` and `getStaticPaths`
- No server-side rendering or API routes
- Images are unoptimized (`images: { unoptimized: true }`)
- Output goes to `dist/` directory
- Must explicitly define all dynamic paths (`fallback: false`)

## Path Aliases

`@/` is an alias for `src/` (configured in `jsconfig.json`):

```javascript
import { getContent } from '@/lib/getContent'
import Header from '@/components/Header'
```

## Routing Architecture

### Three-Level Hierarchy (Developer Content Only)

```
/developer                    # All developer content with tag sidebar
/developer/elixir            # Filtered by tag with tag sidebar
/developer/elixir/001-...    # Individual article
```

This is the ONLY content type with 3-level routing. The tag is part of the URL path.

### Two-Level Hierarchy (Articles, Lists, Backlog)

```
/article                     # All articles
/article/001-...            # Individual article

/list                       # First list (redirects to first tag)
/list/podcast              # Individual list

/backlog                    # All backlog items (dev-only)
/backlog/001-...           # Individual backlog item
```

## Content Structure

```
/content/
├── article/          # Published blog articles (markdown)
├── developer/        # Published technical guides (markdown, tagged)
├── _backlog/         # Draft content (dev-only, hidden in production)
├── list/             # Curated link lists (JSON format)
├── tags.json         # Tag definitions for developer content
└── lists.json        # Section metadata for list pages
```

**Key conventions:**

- Underscore prefix (`_backlog`) hides directories from production menu
- Only `article` and `developer` content included in RSS feeds
- Filename format: `YYYY-MM-DD-slug-name.md` — date-based naming, becomes the URL slug
- Content sorted reverse-chronologically by date
- For `developer/` content, `tag` in frontmatter must match `tags.json`
- Never add trailing periods in frontmatter fields

**Content loading** is in `/src/lib/getContent.js`:

```javascript
getContent(type, slug) // Single item with frontmatter + body
getContents(type) // All items of a type (metadata only)
getAllContents() // article + developer only (for RSS)
```

## CSS Design Rules

**Neutral colors:** Use `neutral-*` for all neutrals. **Never use `gray-*` or `zinc-*` utilities.**

**Accent color:** Use `blue-500` in light mode, `blue-400` in dark mode. `blue-600` for accent fills. Custom values live in `tailwind.config.js`.

```jsx
// Standard accent pattern
className =
  'text-neutral-800 hover:text-blue-500 dark:text-neutral-200 dark:hover:text-blue-400'
```

**Dark mode:** Always pair light and dark mode utilities:

```jsx
text-neutral-800 dark:text-neutral-100      // Primary text
text-neutral-600 dark:text-neutral-400      // Secondary text
bg-white dark:bg-neutral-900                // Page background
bg-neutral-50 dark:bg-neutral-800           // Subtle background
border-neutral-100 dark:border-neutral-700/40  // Borders
```

## Git

### Branching

- Branch names follow: `YYYY-MM-DD-descriptive-name`
- Do NOT push when on the main branch — user handles all pushes to main
- Pushing to feature branches is allowed

### Commit Workflow

1. Make all code changes
2. Run `npm run lint`, `npx prettier --check .`, and `npm run build` to verify
3. Stage specific files and commit with a descriptive message

### Commit Message Format

- Summary line (50 chars or less)
- Blank line
- Bulleted details of what changed
- Blank line
- `Co-Authored-By: Claude <model> <noreply@anthropic.com>` (use actual model name)

## Specs

Design specs and plans go in `.spec/YYYY-MM-DD-brief-description.md`. Completed specs move to `.spec/done/`.

## Skills (Detailed Guides)

Use these slash commands for detailed how-to information:

- `/development` — Build commands, deployment, GitHub Pages setup, RSS config, common patterns
- `/content` — Step-by-step content creation, infographic components (stat-block, timeline, comparison-table, progress-bar), markdown features
- `/css-design` — Full typography scale, spacing system, component patterns, interactive states, testing checklist

### Content Pipeline (user-invoked)

Backlog ideas move through three steps, each opening a PR:

1. `/content-research` — Research a `content/_backlog/` item and write a spec in `.spec/`
2. `/content-refine` — Discuss and challenge the spec, then update it
3. `/content-write` — Write the final article or developer post from the refined spec
