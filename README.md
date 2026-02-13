# Revisit - Static Next.js Blog

A statically-generated Next.js blog/portfolio site built with Tailwind CSS. Features a file-based content management system for easy article and list management.

## Features

- **Static Generation** - Built for static export with no server required
- **File-based CMS** - Manage content using markdown files and JSON
- **Tailwind CSS 4** - Modern styling with utility-first CSS
- **Content Management** - Create articles and curated lists without a database
- **RSS/JSON Feeds** - Automatic feed generation
- **Mermaid Diagrams** - Support for diagrams in content
- **Responsive Design** - Mobile-first approach with Tailwind

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` and set environment variables:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
GENERATE_RSS=false
```

3. Start development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/content` - Blog articles and curated lists
  - `/articles` - Published blog posts
  - `/lists` - Curated lists and recommendations
  - `_backlog` - Work-in-progress content
  - `_developer` - Developer notes and guides
- `/src` - Application code and components
  - `/app` - Next.js app directory with pages
  - `/components` - Reusable React components
- `/public` - Static assets

## Documentation

- **[Content Guidelines](./.claude/guidelines/content.md)** - Creating and managing content
- **[Development Setup](./.claude/guidelines/development.md)** - Development environment and coding standards
- **[CSS Design System](./.claude/guidelines/css-design-system.md)** - Styling guidelines
- **[Spec Workflow](./.claude/guidelines/spec-workflow.md)** - Process for specifications and changes

## Deployment

This project can be deployed to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

For production builds, set `GENERATE_RSS=true` in your environment variables to enable RSS feed generation.

## Technologies

- [Next.js 15](https://nextjs.org) - React framework
- [React 18](https://react.dev) - UI library
- [Tailwind CSS 4](https://tailwindcss.com) - Styling
- [ReactMarkdown](https://github.com/remarkjs/react-markdown) - Markdown rendering
- [gray-matter](https://github.com/jonschlinkert/gray-matter) - Frontmatter parsing
- [feed](https://github.com/rhysd/feed) - RSS/JSON feed generation
- [Mermaid](https://mermaid-js.github.io/mermaid/) - Diagram rendering