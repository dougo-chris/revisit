---
name: content-refine
description: Interactive discussion to refine a content spec — challenge ideas, debate angles, then update the spec and open a PR
argument-hint: [spec-filename-or-topic]
disable-model-invocation: true
---

# Content Refine

Have an interactive discussion about a content spec, then update it with the refined direction.

## Input

The user provides a spec — either a filename from `.spec/` or a topic to search for.

## Phase 1: Read and kick off discussion

- Find and read the spec file from `.spec/`
- Read any existing published articles in `content/article/` and `content/developer/` to understand the site's voice
- Summarize the current spec briefly
- Open the discussion with your honest take on the idea — what's strong, what's weak, what's missing
- Ask pointed questions to get the conversation going

## Phase 2: Interactive discussion

This is a back-and-forth conversation. You are encouraged to:

- **Be contrarian** — challenge assumptions, question whether the angle is actually interesting
- **Push back** on weak arguments or vague thinking
- **Suggest alternatives** — different angles, structures, or framings
- **Ask hard questions** — "Who actually cares about this?" "What's the one thing someone should take away?"
- **Play devil's advocate** — argue the opposite position to stress-test ideas
- **Be direct** — don't hedge or be polite about weak ideas
- **Build on good ideas** — when something clicks, push it further

Topics to explore during discussion:
- Is the angle sharp enough? Would someone actually share this?
- Is it an article (opinion/business) or developer post (technical/how-to)?
- What's the hook in the first paragraph?
- What concrete examples or stories make this real?
- What should be cut? What's missing?
- What's the one sentence summary someone would remember?

Continue discussing until both parties agree the direction is solid.

## Phase 3: Update the spec

When the user signals they're done (e.g., "done", "let's wrap up", "that's good"), or you both agree the direction is clear:

1. Create a branch: `YYYY-MM-DD-topic-slug-refine` (use today's date)
2. Update the spec file with the refined direction:
   - Change status to `## Status: ✅ Ready to Write`
   - Update the suggested angle based on discussion
   - Update the outline to reflect agreed structure
   - Add a `## Decisions` section capturing key choices made during discussion
   - Remove or update open questions that were resolved
3. Commit with message: `content refine: [topic title]`
4. Push the branch
5. Create a PR with a summary of what changed and key decisions made

## Important

- Do NOT write the actual article — this is discussion and planning only
- The goal is a spec that's clear enough that writing becomes straightforward
- Don't be a yes-man — genuine pushback makes the final piece better
- Keep the discussion focused — it's easy to wander, bring it back to "what goes on the page"
