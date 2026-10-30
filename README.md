# Ali Hossain — Digital Atelier

Professional source package · Published version 6 · 28 October 2026

A personal portfolio with 3D visuals, GitHub activity, Stockfish chess and **Kamado**, a free on-device chat assistant. This package contains the latest published application source and assets, with a beginner-friendly documentation layer. The running website has not been changed by this export.

## Start here

1. Extract the ZIP completely and open this folder in VS Code.
2. Install **Node.js 22.13 or newer** and **pnpm 11.25.0**.
3. Open a terminal inside the folder containing `package.json`.
4. Run:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open the local URL printed in the terminal (normally http://localhost:5173). Stop the server with Ctrl+C. These instructions use the portable project path; `install:ci` is a managed Linux helper, not the beginner setup command.

If pnpm is missing, install the pinned version with `npm install -g pnpm@11.25.0`, then retry. Internet access is required for dependency installation. Do not mix npm and pnpm lockfiles.

## Useful commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start local development with live updates |
| `pnpm exec tsc --noEmit` | Check TypeScript |
| `pnpm build` | Build the application and local-AI worker |
| `pnpm start` | Preview the built Worker locally; build first |

## What to read next

- [Project map](docs/PROJECT_MAP.md): where each feature lives.
- [Customization guide](docs/CUSTOMIZATION.md): change content, theme, chat and chess.
- [Setup and troubleshooting](docs/SETUP_AND_TROUBLESHOOTING.md): practical answers for beginners.
- [Third-party notices](docs/THIRD_PARTY_NOTICES.md): assets, dependencies and licensing.
- [AI details](LOCAL_AI.md): model, privacy and performance limits.
- [Validation history](VALIDATION.md): checks performed and known limits.

## Included features

- Responsive portfolio, maroon/gold alternate theme, loader and mouse-follow glow.
- Project cards, skills, career history, CV and contact links.
- Public GitHub contribution calendar and repositories for `alidaexpert`.
- Stockfish-powered chess with automatic opponent, results and PGN download.
- Kamado avatar, full-message AI replies, typing dots, status countdown, optional reply sound, local timestamps and browser-saved history.

## Important behavior

Known portfolio questions and prepared jokes are immediate, labelled responses. Open-ended chat loads SmolLM2 on the visitor’s device and runs in a background browser worker. It needs no paid inference service or API key, but speed depends on hardware and downloads. The five-second countdown is a **status check**, not a promised completion deadline. Last 120 messages are stored on the same browser until cleared; history does not sync between devices.

The contact form needs optional Resend configuration before email delivery works. Direct email/phone links work without it. No secrets are included in this package.

## Technology and deployment

React 19 · TypeScript · Vinext/Vite · Next.js App Router conventions · Cloudflare Workers · Three.js · Transformers.js · Stockfish.

This is the original Sites/Vinext project, **not a plain create-react-app or static HTML site**. `pnpm build` does not automatically deploy it. The existing `.openai/hosting.json` identifies Ali’s original Site; do not use that ID to create someone else’s project. Another hosting provider requires its own deployment configuration and validation.

The original published source passed TypeScript, production build and focused browser checks. This archive was checked for integrity, required files and excluded secrets. A fresh dependency installation on your own Windows/macOS machine has not been independently tested.
