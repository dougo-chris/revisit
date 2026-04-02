---
title: "Token Economics"
date: 2026-02-13T07:40:48.656Z
modified: 2026-02-13T23:10:00.000Z
draft: false
archived: false
pinned: false
trashed: false
color: DEFAULT
---

There's a fundamental difference between companies that use AI tokens to **build** their apps versus those that use tokens to **run** them.

## Tokens to Build

These companies use AI during development. Tools like GitHub Copilot, Cursor, or Claude Code consume tokens while developers write code, debug issues, and refactor systems. The token cost is a **one-time investment** per feature. Once the code is written and deployed, it runs without ongoing AI costs.

The economics are straightforward: you pay for development time, but the resulting application scales independently of token consumption.

## Tokens to Run

These companies build AI into their product. Every user interaction - whether it's generating content, answering questions, or processing data - consumes tokens in production. The token cost is **ongoing and scales with usage**.

This creates a different business model entirely. Your costs are directly tied to user activity. As you grow, your token bill grows proportionally (or worse, exponentially if users increase their AI usage over time).

## Why It Matters

The distinction shapes everything:

- **Cost structure**: One-time development expense vs. recurring operational cost
- **Margins**: Traditional software margins vs. consumption-based margins
- **Scaling**: Scale independently vs. scale with token pricing
- **Moat**: Code quality and features vs. prompt engineering and integration
- **Risk**: Development budget overruns vs. margin compression

Neither model is inherently better, but understanding which category you're in (or moving toward) is critical. Many companies start with tokens to build, then pivot to tokens to run as they add AI features. That shift fundamentally changes the business.

## The Dependency Problem

Companies that use tokens to run face a strategic constraint that those who use tokens to build don't: **complete dependency on AI providers**.

When your product runs on someone else's tokens, you're subject to:

- **Pricing changes**: OpenAI, Anthropic, or Google can change their pricing at any time. Your margins are at their mercy.
- **Rate limits**: Your ability to scale is constrained by their infrastructure decisions, not yours.
- **Model changes**: When GPT-4 becomes GPT-5, or when a model is deprecated, your product behavior changes whether you want it to or not.
- **Availability**: Outages at OpenAI mean outages for your customers. Your SLA is capped by theirs.
- **Terms of service**: They can change what you're allowed to build on their platform, potentially making your business non-compliant overnight.

This isn't hypothetical. We've seen API pricing changes, model deprecations, and shifting terms of service across all major providers. Companies building on tokens to run must factor this dependency into their strategy.

The irony? Companies using tokens to build face these same constraints during development, but once the code ships, the dependency ends. Companies using tokens to run never escape it.

The companies that will thrive are those that understand their token economics and build accordingly - whether that means accepting the dependency, diversifying across providers, or investing in their own models.
