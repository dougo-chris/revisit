# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **statically-generated Next.js blog/portfolio site** based on the Tailwind UI "Spotlight" template. It uses a file-based content management system with markdown files for articles and YAML files for curated lists. The site is built for static export (no server required) and can be deployed to any static hosting service.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Build for production (outputs to out/ directory)
npm run build

# Run production build locally
npm start

# Lint code
npm run lint

# Format code (Prettier with Tailwind plugin)
npx prettier --write .
```

## Content Architecture

### Content Types & Directory Structure

```
/content/
├── article/          # Published blog articles
├── developer/        # Published technical guides (tagged)
├── _backlog/         # Draft content (dev-only, hidden in production)
├── list/             # Curated link lists (YAML format)
├── tags.yaml         # Tag definitions for developer content
└── lists.yaml        # Section metadata for list pages
```

**Important conventions:**
- Underscore prefix (`_backlog`, `_developer`) hides directories from production menu
- Only `article` and `developer` content is included in RSS feeds
- List content is YAML-based, everything else is Markdown

### Markdown Content Structure

All markdown files require YAML frontmatter:

```yaml
---
title: "Your Title Here"           # Required (fallback: filename)
date: "YYYY-MM-DD"                 # Required for sorting (fallback: 2020-01-01)
description: "Brief description"   # Optional (fallback: filename)
tag: "elixir"                      # Required for developer/ content only
---

Your markdown content here...
```

**Critical rules:**
- Files must be directly in the content type directory (flat structure, no subdirectories)
- Filename format: `001-slug-name.md` → becomes `/type/001-slug-name`
- Content is always sorted reverse-chronologically by date
- For `developer/` content, the tag must match exactly what's in `tags.yaml`

### Adding New Content

**To create a new article:**
1. Create `content/article/XXX-title.md` with frontmatter
2. Article appears at `/article/XXX-title`

**To create a new developer guide:**
1. Add tag to `tags.yaml` if it doesn't exist
2. Create `content/developer/XXX-title.md` with frontmatter including `tag: "yourtag"`
3. Guide appears at `/developer/yourtag/XXX-title`

**To create a new list:**
1. Add metadata to `content/lists.yaml`
2. Create `content/list/yourlist.yaml` with structure:
```yaml
links:
  - title: "Link Title"
    description: "Link description"
```
3. List appears at `/list/yourlist`

**To draft content:**
- Place in `content/_backlog/` - visible in dev mode only
- Move to published directory when ready

### Adding New Tags

To add a new tag for developer content:

1. Add to `content/tags.yaml`:
```yaml
tags:
  - title: 'Display Name'
    tag: 'slug-name'
```

2. Use in content frontmatter:
```yaml
tag: "slug-name"
```

The tag creates automatic filtering at `/developer/slug-name`

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

### Important URL Patterns

```javascript
// Article links
href={`/article/${slug}`}

// Developer links (includes tag!)
href={`/developer/${tag}/${slug}`}

// List links
href={`/list/${tag}`}
```

## Key Technical Details

### Static Export Configuration

The site uses `output: "export"` in `next.config.mjs`, which means:
- All pages must use `getStaticProps` and `getStaticPaths`
- No server-side rendering or API routes
- Images are unoptimized (`images: { unoptimized: true }`)
- Output goes to `out/` directory
- Must explicitly define all dynamic paths (fallback: false)

### Content Loading System

Located in `/src/lib/getContent.js`:

```javascript
getContent(type, slug)   // Load single content item with frontmatter + body
getContents(type)        // Load all content of a type (metadata only)
getAllContents()         // Load article + developer only (for RSS)
```

**Defaults when frontmatter is missing:**
- `title`: filename without extension
- `date`: '2020-01-01'
- `description`: filename
- `tag`: 'general'

### Markdown Rendering Stack

```javascript
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'              // Tables, strikethrough
import rehypePrism from '@mapbox/rehype-prism'  // Syntax highlighting
```

All markdown is rendered through `ReactMarkdown` with these plugins.

### Path Aliases

The project uses `@/` as an alias for `src/`:

```javascript
import { getContent } from '@/lib/getContent'
import Header from '@/components/Header'
```

Configured in `jsconfig.json`.

## Common Patterns

### Dynamic Page with Tag Filtering

See `/src/pages/developer/[tag]/index.jsx`:

```javascript
export async function getStaticPaths() {
  const { tags } = await import('content/tags.yaml')
  return {
    paths: tags.map(t => ({ params: { tag: t.tag } })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const contents = await getContents('developer')
  const filtered = contents.filter(c => c.tag == params.tag)
  return { props: { contents: filtered, tag: params.tag } }
}
```

### Dynamic YAML Import

See `/src/pages/list/[tag]/index.jsx`:

```javascript
export async function getStaticProps({ params }) {
  const { links } = await import(`content/list/${params.tag}.yaml`)
  return { props: { links } }
}
```

This requires the YAML file to exist at build time.

### Menu Construction

Menu items come from `/src/lib/getMenu.js`. The backlog section only appears in dev:

```javascript
if (process.env.NODE_ENV !== 'production') {
  menu.push({ name: 'Backlog', href: '/backlog' })
}
```

## Build Output & Deployment

```bash
npm run build
# Generates static HTML/CSS/JS to out/ directory
# Deploy out/ folder to any static host (GitHub Pages, Vercel, S3, etc.)
```

The site is completely static - no server or database required.

## RSS Feed Generation

RSS feeds are generated at build time via `/src/lib/generateRssFeed.js`:
- Triggered on homepage build (`/src/pages/index.jsx`)
- Only includes `article` and `developer` content types
- Outputs `/public/rss/feed.xml` and `/public/rss/feed.json`
- Production builds only

## Technologies Used

- **Next.js 15** - Framework (configured for static export)
- **React 18** - UI library
- **Tailwind CSS 3** - Styling
- **MDX** - Markdown rendering (via react-markdown)
- **gray-matter** - Frontmatter parsing
- **fast-glob** - File discovery
- **next-plugin-yaml** - YAML imports
- **@headlessui/react** - Accessible UI components
- **feed** - RSS/JSON feed generation
