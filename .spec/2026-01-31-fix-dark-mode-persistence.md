# Fix Dark Mode Persistence

Fix localStorage type mismatch preventing dark mode preference from persisting across page loads

## Status: 📝 Spec

## Problem

The dark mode toggle button doesn't properly persist user preference across page loads due to a type mismatch:

1. **Storage** (`src/components/Header.jsx:154`): Stores as boolean
   ```javascript
   window.localStorage.isDarkMode = isDarkMode  // stores true/false
   ```

2. **Retrieval** (`src/pages/_document.jsx:12`): Reads as string
   ```javascript
   let isDarkMode = window.localStorage.isDarkMode === 'true'  // checks for 'true' string
   ```

### Current Behavior
- User toggles dark mode → stores `true` (boolean) in localStorage
- Page reloads → checks for `'true'` (string) → doesn't match → preference lost
- Dark mode reverts to system preference on every page load

### Expected Behavior
- User toggles dark mode → preference persists across page loads
- Dark mode state maintained independently of system preference once manually toggled

## Solution

Ensure consistency by storing the preference as a string in the toggle function.

### File to Modify

**`src/components/Header.jsx`** (line 154)

Change:
```javascript
window.localStorage.isDarkMode = isDarkMode
```

To:
```javascript
window.localStorage.isDarkMode = String(isDarkMode)
```

### Why This Fix

The initialization script in `_document.jsx` is correctly written to:
1. Read string values from localStorage
2. Handle the absence of a preference (falls back to system preference)
3. Clean up localStorage when preference matches system preference

The toggle function should match this contract by storing strings.

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

## Files Involved

- `src/components/Header.jsx` - Toggle button and logic (TO MODIFY)
- `src/pages/_document.jsx` - Initialization script (NO CHANGES)

## Implementation Notes

- This is a one-line fix
- No changes needed to the initialization script
- No changes needed to type handling elsewhere
- Maintains backward compatibility (existing stored values will work)
- Dark mode will self-heal on next toggle for users with existing boolean values

## Related Components

- `ModeToggle` component uses same localStorage key
- `MermaidDiagram` component responds to dark class changes (no modification needed)
- All dark mode styles use `dark:` prefix (no modification needed)
