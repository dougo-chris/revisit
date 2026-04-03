---
name: content-write
description: Write the actual article or developer post from a refined spec, and open a PR
argument-hint: [spec-filename-or-topic]
disable-model-invocation: true
---

# Content Write

Write the final article or developer post from a refined spec.

## Input

The user provides a spec — either a filename from `.spec/` or a topic to search for. The spec should have status "✅ Ready to Write".

## Steps

### 1. Read the spec and study the voice

- Read the spec file from `.spec/`
- Confirm it has status "✅ Ready to Write" — if not, suggest running `/content-refine` first
- Read 2-3 existing published pieces from the target type (`content/article/` or `content/developer/`) to match the site's voice and style
- Note the writing style: direct, conversational, opinionated, uses short paragraphs, concrete examples over abstractions

### 2. Create a branch

- Branch name format: `YYYY-MM-DD-topic-slug-write` (use today's date)

### 3. Write the content

Create the content file in the appropriate directory:
- Articles: `content/article/YYYY-MM-DD-slug.md`
- Developer posts: `content/developer/YYYY-MM-DD-slug.md`

**Frontmatter format for articles:**
```yaml
---
title: "Title Here"
date: "YYYY-MM-DD"
description: "One sentence description — no trailing period"
---
```

**Frontmatter format for developer posts:**
```yaml
---
title: "Title Here"
tag: "tag-from-tags-json"
date: "YYYY-MM-DD"
description: "One sentence description — no trailing period"
---
```

**Writing guidelines:**
- Follow the outline and decisions from the spec
- Match the voice of existing content — direct, no fluff, opinionated
- Use short paragraphs (2-4 sentences)
- Use markdown headings (##, ###) to break up sections
- Use bullet points and lists where they add clarity
- Include concrete examples, not just abstract concepts
- Open with a hook — don't start with definitions or preamble
- End with a clear takeaway, not a generic conclusion
- No trailing periods in frontmatter fields
- If developer content, ensure the `tag` matches an entry in `content/tags.json`

### 4. Move the spec to done

- Move the spec file from `.spec/` to `.spec/done/`
- Create `.spec/done/` directory if it doesn't exist

### 5. Verify the build

- Run `npm run lint` to check for issues
- Run `npx prettier --check .` to verify formatting
- Run `npm run build` to confirm the site builds with the new content

### 6. Commit and push

- Stage the new content file, the moved spec, and any other changes
- Commit with message: `content: [article title]`
- Push the branch

### 7. Create a pull request

- Title: `Content: [article title]`
- Body should include:
  - Summary of the article/post
  - Link to the spec (now in `.spec/done/`)
  - The article's description from frontmatter

## Important

- The spec is your blueprint — follow the agreed outline and decisions
- Don't add sections or angles that weren't discussed in the refine phase
- Quality over length — say what needs saying, then stop
- If something in the spec is unclear or contradictory, ask the user before guessing
- The build must pass before creating the PR
