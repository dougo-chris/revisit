# Claude Configuration

Claude Code configuration for the Revisit blog. Project instructions live in [`CLAUDE.md`](../CLAUDE.md) at the repo root.

## Skills

Reference guides (Claude loads these automatically when relevant):

- **[development](./skills/development/SKILL.md)** — Build commands, static export, routing, deployment, RSS
- **[content](./skills/content/SKILL.md)** — Content types, frontmatter, markdown features, infographic components
- **[css-design](./skills/css-design/SKILL.md)** — Colors, typography, spacing, dark mode, component patterns

Content pipeline (run manually, in order):

- **[/content-research](./skills/content-research/SKILL.md)** — Backlog item → researched spec in `.spec/`
- **[/content-refine](./skills/content-refine/SKILL.md)** — Discuss and refine a spec
- **[/content-write](./skills/content-write/SKILL.md)** — Refined spec → published article

## Configuration

- **`settings.json`** — Shared settings (committed): safe permissions and the push-to-main guard
- **`hooks/block-push-on-main.sh`** — Blocks `git push` while on `main`
- **`settings.local.json`** — Personal settings (gitignored)
