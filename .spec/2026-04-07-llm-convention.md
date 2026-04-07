# The Convention Machine

## Status: Research

## Original Idea

LLM - great for UI because they build based on the most common UI they have learnt from

## Target

- **Type**: developer
- **Tag**: TBD (check tags.json)
- **Working title**: "The Convention Machine"
- **Audience**: Developers and builders using LLMs daily who've noticed the pattern but haven't articulated it

## Research

### Key findings

- **LLMs are statistically designed to produce average output** — the training objective (minimize prediction error across massive datasets) inherently privileges high-probability patterns. An LLM trained on pre-OOP code could never have invented object-oriented programming — it would just produce more procedural code
- **Galton's Law of Mediocrity applied to LLMs (arXiv, 2025)** — tested 1,045 advertising concepts across five LLM families. Creative markers disappeared first (60-70% loss). 71% of "creative" ideas were recycled metaphors like "whisper secrets" and "crafted sanctuary." Outputs converged on identical generic summaries regardless of model
- **Creative homogeneity across 22 LLMs (arXiv, 2025)** — individual LLMs perform comparably to humans on creativity tests, but population-level variability is dramatically lower. LLM variability: 0.459 vs human: 0.738. All differences showed very large effect sizes (1.4-2.2)
- **Model collapse (Nature, 2024)** — training LLMs on AI-generated content causes irreversible defects. Tails of the distribution disappear first. By April 2025, 74% of new web pages contained AI-generated text, accelerating the problem
- **Jakob's Law** — "Users prefer your site to work the same way as all the other sites they already know." Familiar UI patterns reduce user errors by 30% and increase task completion by 18% (Baymard Institute, 2022)
- **v0 by Vercel** is praised specifically for "best-in-class component quality" with standard patterns — nav bars, hero sections, auth screens, dashboards. Its strength IS convention
- **LLM code errors (arXiv, 2024)** — LLMs mechanically apply patterns from one context to another. Confuse language-specific implementations (Python's round() vs Java's). Right pattern, wrong situation
- **Context beats model quality** — "A mid-tier LLM with proper context outperforms the most advanced model without it." Convention is the starting point; context is what makes code actually work
- **Simon Willison** treats LLMs as "an over-confident pair programming assistant" — great for boilerplate and tedious tasks, fails when lacking context or applying patterns cross-context
- **Cornell homogenization study (CHI, 2025)** — AI autocomplete pushed Indian writers toward American conventions. When an Indian user typed "S" for Shah Rukh Khan, AI suggested Shaquille O'Neal. AI homogenizes writing toward Western styles
- **Creative diversity study (ScienceDirect, 2025)** — analyzed 2,200 college essays. Each additional human essay contributed more new ideas than each additional GPT-4 essay. The diversity gap WIDENS with volume. Prompt engineering failed to close it
- **AI slop markers** — "delve," "tapestry," "landscape," "underscore," "harness." The em-dash as the "ChatGPT dash." Formulaic openers. These are convention made visible

### References

- Galton's Law of Mediocrity: Why LLMs Regress to the Mean (arXiv, 2025)
- Creative Homogeneity Across LLMs (arXiv, 2025)
- Model Collapse — AI Models Trained on Recursively Generated Data (Nature, 2024)
- LLM Code Generation Mistakes (arXiv, 2024)
- Quality Assurance of LLM-Generated Code (arXiv, 2025)
- AI Suggestions Homogenize Writing (Cornell/CHI, 2025)
- Homogenizing Effect of LLMs on Creative Diversity (ScienceDirect, 2025)
- Jakob's Law — lawsofux.com
- Nielsen Norman Group — Breaking Web Conventions
- Simon Willison — How I Code With LLMs (2025)
- v0 vs Bolt vs Lovable comparison (NxCode, 2025)

### Counterarguments

- **Convention in code IS right for boilerplate** — CRUD operations, config, test scaffolding, glue code. These tasks SHOULD follow convention. LLMs shine here
- **Unconventional UI can work** — games, creative tools, experimental interfaces. But the burden of proof is on the innovator, and you need user testing to validate
- **LLM writing is fine for mechanical tasks** — documentation, API docs, commit messages, structured reports. Anywhere voice is irrelevant and clarity is paramount
- **You can prompt past convention** — temperature controls, role-based prompting, few-shot examples. But the research shows prompt engineering "failed to close the diversity gap." There are hard limits
- **Not all code needs taste** — the majority of code written daily is conventional and should be. The question is whether you know the difference

## Suggested Angle

Chris noticed this from practice: LLMs are great at UI, good-ish at code, and mediocre at writing. The research explains why — it's the same mechanism producing different outcomes depending on whether convention equals quality.

**The spectrum:**
| Domain | Convention = | LLM Fit | Human Role |
|--------|-------------|---------|------------|
| UI | Mostly good (battle-tested by users) | Excellent | Innovate at the margins |
| Code | Contextual (right starting point, needs taste) | Good scaffold, bad judgment | Provide context, know when to break rules |
| Writing | Mostly bad (average writing is bland) | Poor for anything needing voice | Everything that matters |

The human value is knowing when to accept convention and when to push past it. LLMs can't make that judgment — they don't know what situation calls for something different.

This is a developer piece, not a philosophy piece. Written from the experience of someone using LLMs daily across all three domains.

## Draft Outline

1. **Opening** — The observation from practice. LLMs build great UI. They write decent code. Their writing is... fine. Same tool, different results. Why?
2. **The convention machine** — LLMs are trained to reproduce the most common patterns. That's not a bug, it's the mechanism. The average of all training data IS the output
3. **UI: convention is the point** — Jakob's Law, "don't make me think." The most common UI patterns survived because they work. v0 is praised for exactly this. An LLM reproducing the consensus login page is reproducing something battle-tested
4. **Code: convention is the starting point** — Idiomatic code varies by language, team, project. LLMs write the Stack Overflow answer — competent but context-blind. Right pattern, wrong situation. Convention in code is learned from years of practice — it's taste, not rules
5. **Writing: convention is the enemy** — The average of all writing is bland. "Delve," "tapestry," "landscape." 71% of LLM creative ideas are recycled metaphors. Voice, style, surprise — the things that make writing worth reading are the things convention can't produce
6. **The spectrum** — Same mechanism, different outcomes. The quality of convention determines the quality of LLM output. The human job is knowing where you are on the spectrum
7. **What this means in practice** — Use LLMs for UI without guilt. Use them for code with context and judgment. Use them for writing only as scaffolding, then make it yours
8. **Close** — The tool doesn't change. What changes is whether convention serves the work or flattens it

## Conversation Beats

1. **Random backlog pick** — the fourth today. Different territory from the previous three
2. **The one-liner**: "LLM - great for UI because they build based on the most common UI they have learnt from"
3. **Chris's extension**: "I'm finding this with UI, code and now writing. The best is the best because people like it. So good UI is visible, but good code is more a matter of taste. Convention in code is learned from years of practice"
4. **The spectrum emerged from conversation** — UI convention is visible and measurable, code convention is taste, writing convention is mediocrity. The same mechanism produces quality on one end and slop on the other

## Open Questions

- Which tag in tags.json fits this? Need to check what's available
- How technical to go? Could include code examples of LLM-conventional-but-wrong patterns
- Does this need the research citations or is it better as pure practitioner observation?
- Length — the spectrum framework is clean enough for a tight piece, but the examples could expand it
