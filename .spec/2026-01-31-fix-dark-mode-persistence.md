# Fix Dark Mode Persistence and Styles

Fix two issues preventing dark mode from working correctly

## Status: ✅ Implemented (2026-01-31)

## Problem

Dark mode had two separate issues:

### Issue 1: localStorage Type Mismatch

The dark mode toggle button doesn't properly persist user preference across page loads due to a type mismatch:

1. **Storage** (`src/components/Header.jsx:134`): Stores as boolean
   ```javascript
   window.localStorage.isDarkMode = isDarkMode  // stores true/false
   ```

2. **Retrieval** (`src/pages/_document.jsx:12`): Reads as string
   ```javascript
   let isDarkMode = window.localStorage.isDarkMode === 'true'  // checks for 'true' string
   ```

**Behavior:**
- User toggles dark mode → stores `true` (boolean) in localStorage
- Page reloads → checks for `'true'` (string) → doesn't match → preference lost
- Dark mode reverts to system preference on every page load

### Issue 2: Tailwind v4 Configuration

Tailwind CSS v4 uses a new CSS-first configuration approach. The `darkMode: 'class'` setting in `tailwind.config.js` is ignored when using `@import "tailwindcss"`.

**Behavior:**
- The `.dark` class is correctly added to `<html>` element
- localStorage correctly stores the preference
- BUT dark mode styles (`dark:bg-black`, etc.) don't apply
- Page stays in light mode despite having the dark class

### Expected Behavior
- User toggles dark mode → preference persists across page loads
- Dark mode state maintained independently of system preference once manually toggled
- Dark mode styles apply immediately when `.dark` class is present

## Solution

Two fixes were required:

### Fix 1: localStorage Type Consistency

**File:** `src/components/Header.jsx` (line 134)

Change:
```javascript
window.localStorage.isDarkMode = isDarkMode
```

To:
```javascript
window.localStorage.isDarkMode = String(isDarkMode)
```

**Why:** The initialization script expects string values. Storing as string ensures compatibility.

### Fix 2: Tailwind v4 Dark Mode Configuration

**File:** `src/styles/tailwind.css`

Add after the imports:
```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@variant dark (&:where(.dark, .dark *));

@import './prism.css';
```

**Why:** Tailwind v4 requires dark mode variants to be configured in CSS, not in `tailwind.config.js`. The `@variant dark` directive tells Tailwind to apply `dark:` classes when `.dark` class is present on any parent element.

## Testing

### Manual Testing Steps

1. **Initial State**
   - Open site in incognito/private window
   - Verify dark mode matches system preference
   - Check localStorage is empty (`!('isDarkMode' in window.localStorage)`)

2. **Toggle to Opposite of System**
   - If system is dark, toggle to light (or vice versa)
   - Verify visual change happens immediately
   - Check `localStorage.isDarkMode` is `'true'` or `'false'` (string)
   - Reload page → preference should persist

3. **Toggle Back to Match System**
   - Toggle back to match system preference
   - Verify `localStorage.isDarkMode` is deleted
   - Reload page → should still match system preference

4. **Multi-Tab Sync**
   - Open site in two tabs
   - Toggle dark mode in one tab
   - Verify other tab updates (storage event listener)

### Edge Cases to Verify

- ✅ Toggling works when system preference is dark
- ✅ Toggling works when system preference is light
- ✅ Preference persists across page reloads
- ✅ Preference persists across browser restarts
- ✅ localStorage cleanup when matching system preference
- ✅ Transitions disabled during toggle (no flash)
- ✅ Responsive to system preference changes (when no manual override)

## Files Modified

- `src/components/Header.jsx` - Fixed localStorage type (line 134)
- `src/styles/tailwind.css` - Added Tailwind v4 dark mode configuration
- `src/pages/_document.jsx` - No changes (initialization script was correct)

## Implementation Notes

- **localStorage fix** - One-line change, maintains backward compatibility
- **Tailwind v4 fix** - Required for v4's CSS-first configuration approach
- The `tailwind.config.js` file still has `darkMode: 'class'` but this is ignored in v4 when using CSS imports
- Dark mode will self-heal on next toggle for users with existing boolean values in localStorage
- Both fixes were necessary - neither alone would have solved the problem completely

## Debug Process

Created a temporary debug page (`/debug-dark-mode`) to diagnose the issue:
- Confirmed `.dark` class was being added correctly
- Confirmed localStorage was being set
- Discovered that dark mode styles weren't applying despite correct class
- Identified Tailwind v4 configuration issue

## Related Components

- `ModeToggle` component uses same localStorage key
- `MermaidDiagram` component responds to dark class changes (no modification needed)
- All dark mode styles use `dark:` prefix (no modification needed)
