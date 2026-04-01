# Revisit - Static Next.js Blog

A statically-generated Next.js blog/portfolio site based on the Tailwind UI "Spotlight" template. File-based content management with markdown articles and JSON lists. Built for static export — no server required.

## Technologies

- **Next.js 15** - Framework (configured for static export)
- **React 18** - UI library
- **Tailwind CSS 4** - Styling
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
- Filename format: `001-slug-name.md` — sequential numbering, becomes the URL slug
- Content sorted reverse-chronologically by date
- For `developer/` content, `tag` in frontmatter must match `tags.json`
- Never add trailing periods in frontmatter fields

**Content loading** is in `/src/lib/getContent.js`:

```javascript
getContent(type, slug)   // Single item with frontmatter + body
getContents(type)        // All items of a type (metadata only)
getAllContents()          // article + developer only (for RSS)
```

## CSS Design Rules

**Neutral colors:** Use `zinc-*` for all neutrals. **Never use `gray-*` utilities.**

**Accent color:** Use `teal-500` in light mode, `teal-400` in dark mode.

```jsx
// Standard accent pattern
className="text-zinc-800 hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-400"
```

**Dark mode:** Always pair light and dark mode utilities:

```jsx
text-zinc-800 dark:text-zinc-100      // Primary text
text-zinc-600 dark:text-zinc-400      // Secondary text
bg-white dark:bg-zinc-900             // Page background
bg-zinc-50 dark:bg-zinc-800           // Subtle background
border-zinc-100 dark:border-zinc-700/40  // Borders
```

## Git

### Branching

- Branch names follow: `YYYY-MM-DD-descriptive-name`
- Do NOT push when on the main branch — user handles all pushes to main
- Pushing to feature branches is allowed

### Commit Workflow

1. Make all code changes
2. Run tests, credo, and format check to verify
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
