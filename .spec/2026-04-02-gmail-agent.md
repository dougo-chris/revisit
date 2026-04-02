# Gmail Agent

Monitor Gmail inbox and trigger jobs based on email content.

## Status: 📝 Spec

## Problem

Need an automated agent that reads incoming Gmail messages, interprets their content, and kicks off relevant jobs/workflows. Currently no mechanism to bridge Gmail into the project's automation.

## Solution

Build an agent that uses the Google Workspace CLI (`gws`) to monitor Gmail and dispatch jobs. The `gws` tool handles authentication and API access — the agent focuses on parsing and dispatching.

### Architecture

```
Gmail Inbox
  ↓
gws gmail +watch (streams newline-delimited JSON)
  ↓
Agent Process
  ├── Stream Parser (consume JSON from gws)
  ├── Content Parser (extract intent/data from email)
  ├── Rule Matcher (map content → job type)
  └── Job Dispatcher (trigger appropriate action)
```

### Gmail Access via gws

- **`gws gmail +watch`** — Streams new emails as JSON (real-time)
- **`gws gmail +triage`** — Lists unread inbox summary
- **`gws gmail users.messages.get`** — Fetch full message content
- Authentication handled by `gws auth` (OAuth 2.0, credentials encrypted in OS keyring)

### Job Dispatch

TBD — depends on what jobs need to run. Options:
- Direct function calls within the agent process
- Shell commands / scripts
- HTTP calls to external services
- Queue-based for reliability

## Files to Create

- `agent/` — New directory, separate from the Next.js site
- `agent/index.js` — Entry point, consumes gws output
- `agent/parser.js` — Extract intent/data from email JSON
- `agent/rules.js` — Content-to-job matching rules
- `agent/dispatcher.js` — Job execution

## Open Questions

- What email patterns/content should trigger jobs?
- What jobs need to be dispatched?
- Should the agent run as a long-lived process, cron job, or scheduled Claude Code trigger?
- Should processed emails be labeled/archived to avoid re-processing?

## Testing

### Manual Testing Steps

1. Verify `gws gmail +triage` works (see connectivity test spec)
2. Start agent with `gws gmail +watch` piped in
3. Send a test email to the monitored inbox
4. Verify agent picks up the message
5. Verify correct job is matched and dispatched
6. Verify processed emails are tracked (not re-processed)

### Edge Cases

- Malformed emails / missing content
- Duplicate processing on restart
- Rate limiting (Gmail API: 250 quota units/second per user)

## Related

- `.spec/2026-04-02-gmail-connectivity-test.md` — Prerequisite: prove gws + Gmail works
- Google Workspace CLI: https://github.com/googleworkspace/cli
