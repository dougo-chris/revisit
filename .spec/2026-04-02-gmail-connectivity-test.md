# Gmail Connectivity Test

Prove we can authenticate with Gmail and read messages using the Google Workspace CLI.

## Status: ✅ Implemented (2026-04-02)

## Goal

Install `gws` CLI, authenticate, and verify we can read Gmail messages. This becomes the foundation for the Gmail agent and is reusable across projects.

## Install

### macOS

```bash
brew install googleworkspace-cli
```

### Linux

Option A: Pre-built binary from GitHub releases
```bash
# Download latest release for linux-amd64
curl -L -o gws.tar.gz https://github.com/googleworkspace/cli/releases/latest/download/gws-linux-amd64.tar.gz
tar xzf gws.tar.gz
sudo mv gws /usr/local/bin/
rm gws.tar.gz
```

Option B: Install via npm
```bash
npm install -g @googleworkspace/cli
```

Option C: Install via Cargo (requires Rust toolchain)
```bash
cargo install --git https://github.com/googleworkspace/cli --locked
```

### Verify Installation

```bash
gws --version
```

## Authenticate

### Option A: Automated Setup (requires gcloud CLI)

```bash
gws auth setup    # Creates GCP project, enables APIs, configures OAuth
gws auth login    # Opens browser for Google sign-in
```

On a headless Linux box, `gws auth login` may not be able to open a browser. Use the manual flow:
- Run `gws auth login` on the Linux box
- Copy the auth URL it prints to a browser on another machine
- Complete sign-in and paste the callback code back

### Option B: Manual Setup

1. Go to console.cloud.google.com
2. Create project, enable Gmail API
3. Configure OAuth (External, add yourself as test user)
4. Add scope: `https://www.googleapis.com/auth/gmail.readonly`
5. Create Desktop app credentials, download JSON
6. Point gws to credentials via `GOOGLE_WORKSPACE_CLI_CREDENTIALS_FILE` env var
7. Run `gws auth login`

Credentials are encrypted at rest (AES-256-GCM, keys in OS keyring).

## Test Commands

```bash
# List unread inbox (sender, subject, date)
gws gmail +triage

# Stream new emails as newline-delimited JSON
gws gmail +watch

# Raw API: list recent messages
gws gmail users.messages.list --params '{"userId": "me", "maxResults": 10}'

# Raw API: read a specific message
gws gmail users.messages.get --params '{"userId": "me", "id": "MESSAGE_ID"}'
```

## Success Criteria

1. `gws --version` works on both macOS and Linux
2. `gws auth login` completes without error
3. `gws gmail +triage` shows recent inbox messages
4. `gws gmail +watch` streams new messages as JSON

## Next Steps

Once connectivity is confirmed:
- Build the agent layer that consumes `gws gmail +watch` JSON output
- Define rules for matching email content to jobs
- See `.spec/2026-04-02-gmail-agent.md` for full agent spec
