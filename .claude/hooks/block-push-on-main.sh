#!/usr/bin/env bash
# PreToolUse hook: block `git push` while on main, or any push that targets main.
# The user handles all pushes to main (see CLAUDE.md > Git).

cmd=$(jq -r '.tool_input.command // empty')

# Split chained commands (newlines, ;, &&, ||, |) and keep only segments
# that actually run `git push`, so text like a commit message is ignored.
pushes=$(printf '%s\n' "$cmd" | sed -E 's/(&&|\|\||;|\|)/\n/g' |
  grep -E '^[[:space:]]*(cd [^ ]+ +)?git( -C [^ ]+)? push([[:space:]]|$)')
[[ -n "$pushes" ]] || exit 0

branch=$(git -C "${CLAUDE_PROJECT_DIR:-.}" rev-parse --abbrev-ref HEAD 2>/dev/null)
if [[ "$branch" == "main" ]]; then
  echo "Blocked: on main. The user handles all pushes to main — push from a feature branch instead." >&2
  exit 2
fi

if grep -qE '([[:space:]:+]|^)main([[:space:]]|$)' <<<"$pushes"; then
  echo "Blocked: this push targets main. The user handles all pushes to main." >&2
  exit 2
fi

exit 0
