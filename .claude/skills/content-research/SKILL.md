---
name: content-research
description: Take a backlog idea, research it, create a spec with outline and ideas, and open a PR
argument-hint: [backlog-filename-or-topic]
disable-model-invocation: true
---

# Content Research

Take a backlog item and turn it into a researched spec ready for discussion.

## Input

The user provides a backlog item — either a filename from `content/_backlog/` or a topic to search for.

## Steps

### 1. Find and read the backlog item

- If given a filename, read it directly from `content/_backlog/`
- If given a topic, search `content/_backlog/` for matching files and confirm with the user
- Read the full content of the backlog file

### 2. Create a branch

- Branch name format: `YYYY-MM-DD-topic-slug` (use today's date)
- The slug should be a short descriptive name derived from the topic

### 3. Research the topic

- Understand the core idea from the backlog content
- Use web search to find relevant articles, data, examples, and counterarguments
- Look for real-world case studies or concrete examples that support or challenge the idea
- Identify what makes this topic interesting or contrarian

### 4. Create the spec

Create `.spec/YYYY-MM-DD-topic-slug.md` with this structure:

```markdown
# [Topic Title]

## Status: 📝 Research

## Original Idea

[Paste the original backlog content here]

## Target

- **Type**: article | developer
- **Tag**: [if developer, which tag from tags.json]
- **Working title**: [suggested title]
- **Audience**: [who is this for]

## Research

### Key findings
[Bullet points of interesting facts, data, examples found during research]

### References
[Links and sources discovered during research]

### Counterarguments
[What would someone who disagrees say? What are the weak points?]

## Suggested Angle

[1-2 paragraphs on the recommended approach — what makes this piece worth reading, what's the hook, what's the unique perspective]

## Draft Outline

[Numbered sections with brief descriptions of what each covers]

## Open Questions

[Things to resolve during the refine phase]
```

### 5. Remove the backlog file

- Delete the original file from `content/_backlog/`

### 6. Commit and push

- Stage the new spec and the deleted backlog file
- Commit with message: `content research: [topic title]`
- Push the branch

### 7. Create a pull request

- Title: `Content Research: [topic title]`
- Body should summarize the research findings and suggested angle
- PR is for the user to review before moving to the refine phase

## Important

- Do NOT write the actual article — this is research and planning only
- Be thorough in research — the quality of the spec determines the quality of the final piece
- Include enough detail in the outline that the refine discussion has substance to work with
- Look at existing published articles in `content/article/` and `content/developer/` to understand the site's voice and style
