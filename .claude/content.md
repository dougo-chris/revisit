# Content Creation Guide

This guide explains how to create and manage content for the Revisit blog.

## Content Types

The blog supports three types of content:

1. **Articles** (`content/article/`) - Standard blog posts
2. **Developer Guides** (`content/developer/`) - Technical tutorials organized by topic
3. **Lists** (`content/list/`) - Curated collections (JSON format)

## Article Structure

### Frontmatter

All articles use YAML frontmatter with the following fields:

```yaml
---
title: "Article Title"
description: "Brief summary for SEO and previews"
date: "YYYY-MM-DD"
tags: ["tag1", "tag2"]
published: true  # Set to false to hide from listings
---
```

### Markdown Support

Articles support standard markdown plus:

- **Mermaid diagrams** - Use ` ```mermaid ` code blocks
- **Infographic components** - Use specialized code blocks (see below)
- **Syntax highlighting** - Use ` ```language ` code blocks
- **Images** - Standard markdown syntax `![alt](url)`

## Infographic Components

Four infographic components are available for creating data visualizations.

### 1. StatBlock - Key Metrics

Display statistics with optional trend indicators and icons.

**JSON Schema:**
```json
{
  "title": "Metric Name",        // Required: Display label
  "value": "123",                 // Required: The main value
  "change": "+12%",               // Optional: Change indicator
  "trend": "up|down|neutral",     // Optional: Trend direction
  "description": "vs last week",  // Optional: Additional context
  "icon": "icon-name"             // Optional: Icon identifier
}
```

**Available Icons:**
- `dollar-sign` - Financial metrics
- `users` - User/customer counts
- `activity` - General activity
- `target` - Goals/targets
- `zap` - Performance metrics

**Example - Single Stat:**
````markdown
```stat-block
{
  "title": "Monthly Active Users",
  "value": "12,458",
  "change": "+23.1%",
  "trend": "up",
  "description": "vs last month",
  "icon": "users"
}
```
````

**Example - Multiple Stats (Grid Layout):**
````markdown
```stat-block
[
  {
    "title": "Revenue",
    "value": "$42,500",
    "change": "+12.3%",
    "trend": "up",
    "icon": "dollar-sign"
  },
  {
    "title": "Active Projects",
    "value": "87",
    "change": "+5",
    "trend": "up",
    "icon": "activity"
  }
]
```
````

**Layout:** Responsive grid - 1 column (mobile) → 2 (tablet) → 3 (desktop) → 4 (wide)

### 2. Timeline - Project Milestones

Display events in chronological order with status indicators.

**JSON Schema:**
```json
{
  "items": [                       // Required: Array of timeline items
    {
      "title": "Event Name",       // Required: Event title
      "date": "January 2026",      // Optional: Date label
      "description": "Details",    // Optional: Event description
      "status": "completed|current|upcoming"  // Optional: Status
    }
  ]
}
```

**Status Types:**
- `completed` - Green checkmark, solid connecting line
- `current` - Teal circle, draws attention to current item
- `upcoming` - Gray clock icon, future event

**Example:**
````markdown
```timeline
{
  "items": [
    {
      "title": "Project Kickoff",
      "date": "January 2026",
      "description": "Initial planning completed",
      "status": "completed"
    },
    {
      "title": "Beta Testing",
      "date": "February 2026",
      "description": "Open beta with users",
      "status": "current"
    },
    {
      "title": "Public Launch",
      "date": "March 2026",
      "description": "Full release",
      "status": "upcoming"
    }
  ]
}
```
````

### 3. ComparisonTable - Feature Comparison

Display feature comparisons across multiple options.

**JSON Schema:**
```json
{
  "title": "Comparison Title",     // Optional: Table heading
  "headers": ["Feature", "A", "B"], // Required: Column headers
  "rows": [                         // Required: Array of rows
    {
      "feature": "Feature Name",    // Required: Row label
      "values": ["text", true, 10]  // Required: Values per column
    }
  ]
}
```

**Value Types:**
- `string` or `number` - Displayed as text
- `true` - Green checkmark icon
- `false` - Red X icon

**Example:**
````markdown
```comparison-table
{
  "title": "Pricing Plans",
  "headers": ["Feature", "Basic", "Pro", "Enterprise"],
  "rows": [
    {
      "feature": "Monthly Users",
      "values": ["100", "1,000", "Unlimited"]
    },
    {
      "feature": "API Access",
      "values": [false, true, true]
    },
    {
      "feature": "Support",
      "values": ["Email", "Priority", "24/7 Phone"]
    }
  ]
}
```
````

**Layout:** Responsive table with horizontal scroll on mobile

### 4. ProgressBar - Percentage Progress

Display progress indicators with optional labels and colors.

**JSON Schema:**
```json
{
  "title": "Progress Label",       // Optional: Display above bar
  "progress": 67,                  // Required: 0-100 (clamped)
  "label": "Additional info",      // Optional: Display below bar
  "color": "blue|green|teal|red|yellow",  // Optional: Bar color
  "showPercentage": true           // Optional: Show % on right
}
```

**Colors:**
- `blue` - Default, general progress
- `green` - Success, completion
- `teal` - Brand color, highlights
- `red` - Warnings, issues
- `yellow` - In progress, caution

**Example - Single Bar:**
````markdown
```progress-bar
{
  "title": "Project Completion",
  "progress": 67,
  "label": "On track for April delivery",
  "color": "blue",
  "showPercentage": true
}
```
````

**Example - Multiple Bars:**
````markdown
```progress-bar
[
  {
    "title": "Frontend Development",
    "progress": 85,
    "color": "green",
    "showPercentage": true
  },
  {
    "title": "Documentation",
    "progress": 45,
    "color": "yellow",
    "showPercentage": true
  }
]
```
````

## Common Errors & Troubleshooting

### Invalid JSON

**Error:** `Invalid JSON: Unexpected token...`

**Solution:** Validate your JSON syntax. Common issues:
- Missing quotes around strings
- Trailing commas in arrays/objects
- Unclosed brackets/braces

Use a JSON validator or IDE with JSON support.

### Missing Required Fields

**Error:** `Timeline requires an "items" array`

**Solution:** Check the JSON schema for each component:
- `timeline` requires `items` array
- `comparison-table` requires `headers` and `rows` arrays
- `stat-block` and `progress-bar` require `value` and `progress` respectively

### Component Not Rendering

**Possible causes:**
1. Language identifier misspelled (must be exact: `stat-block`, `timeline`, etc.)
2. Code fence not using triple backticks
3. JSON data is empty or malformed

**Debug:** Check browser console for errors, ensure code block format is correct.

### Dark Mode Issues

All infographic components automatically support dark mode. If colors look wrong:
- Ensure you're using standard color options (`blue`, `green`, etc.)
- Check that custom text doesn't override dark mode classes
- Verify Tailwind's dark mode is enabled (should be automatic)

## Developer Guides

Developer guides work the same as articles but are organized by topic tags:

1. Create file in `content/developer/[topic]/[slug].md`
2. Use same frontmatter format
3. Tag with topic for categorization

Example: `content/developer/react/hooks-guide.md`

## Lists

Lists are JSON files that define curated collections:

```json
{
  "title": "Reading List 2026",
  "description": "Books and articles I recommend",
  "items": [
    {
      "title": "Item Title",
      "url": "https://example.com",
      "description": "Why it's valuable"
    }
  ]
}
```

Create in `content/list/[slug].json`

## Best Practices

1. **Use semantic dates** - Always use ISO format (YYYY-MM-DD) in frontmatter
2. **Tag consistently** - Reuse existing tags when possible
3. **Test infographics** - Validate JSON before publishing
4. **Mobile preview** - Check responsive behavior on small screens
5. **Dark mode check** - Preview in both light and dark modes
6. **Published flag** - Use `published: false` for drafts

## Content Organization

```
content/
├── article/           # Blog posts
│   └── my-post.md
├── developer/         # Technical guides
│   ├── react/
│   ├── nextjs/
│   └── ...
└── list/              # Curated lists
    └── my-list.json
```

Articles are automatically discovered and rendered at `/article/[slug]`
Developer guides at `/developer/[tag]/[slug]`
Lists at `/list/[slug]`
