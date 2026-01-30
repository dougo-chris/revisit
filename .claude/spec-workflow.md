# Spec Workflow

When the user asks to create a spec, follow this process.

## When to Create Specs

Create a spec file when the user explicitly requests:
- "Let's create a spec for [feature/fix]"
- "Before we do this, write a spec"
- "Spec this first"

## File Naming Convention

All spec files must use this exact format:

```
.spec/YYYY-MM-DD-brief-description.md
```

**CRITICAL:** Always use today's actual date (2026-01-31 as of this writing).

**Examples:**
- `.spec/2026-01-31-fix-dark-mode-persistence.md`
- `.spec/2026-01-31-display-mermaid-diagrams.md`
- `.spec/2026-02-15-add-user-authentication.md`

## Spec Template

```markdown
# Feature/Fix Name

Brief one-line description

## Status: 📝 Spec

## Problem

What issue are we solving? What's broken or missing?

## Solution

How will we solve it? What's the approach?

## Files to Modify

- `path/to/file.js` - Specific changes to make
- `path/to/other.js` - What will be modified

## Testing

### Manual Testing Steps
1. Step-by-step instructions
2. Expected outcomes
3. Edge cases to verify

## Implementation Notes

- Key decisions made
- Gotchas or important details
- Rationale for approach chosen

## Related

- Link to related specs
- Related issues or discussions
```

## Process

1. **Create the spec file** with today's date
2. **Fill in all sections** with specific details
3. **Present to user** for review/approval
4. **Wait for approval** before implementing
5. **After implementation**, update status to `✅ Implemented (YYYY-MM-DD)`

## Important

- Use **today's date** - check the current date, don't assume
- Be **specific** - include file paths, function names, exact changes
- Get **approval** before implementing
- Update **status** when complete
