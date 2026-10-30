# Setup and troubleshooting

## Windows, macOS and Linux

Extract the archive before running commands. Use a normal terminal (PowerShell on Windows is fine), enter this folder, then use the README’s pnpm commands. Avoid the Linux-only `install:ci` helper for normal desktop setup. The portable dev command normally uses port 5173; follow the printed URL if it differs.

## Common issues

| Symptom | What to check |
| --- | --- |
| `pnpm` not recognized | Install pnpm 11.25.0; reopen the terminal |
| Engine/version mismatch | Check `node --version` and `pnpm --version`; use the versions declared in package.json |
| Dependencies missing | Run `pnpm install --frozen-lockfile` from the folder containing package.json |
| Lockfile mismatch | Keep the shipped package.json and lockfile together; use pnpm to intentionally add/change packages |
| Model loads slowly | Cold model downloads and CPU generation take time; portfolio answers bypass the model |
| Local AI unavailable | Check memory, browser WebAssembly support, network access to Hugging Face, and console errors |
| Old chat missing | History belongs to the same browser and site origin; private browsing, cleared storage or a different port/device creates separate history |
| Timezone looks different | Times follow the browser/device timezone; USA has multiple timezones |
| Contact form says unavailable | Optional email service credentials have not been configured; use the direct email link |
| 3D unavailable | The site intentionally renders fallbacks when WebGL is unavailable |
| Large bundle warning | Three.js remains a substantial optional chunk; a warning alone is not a failed build |

## Optional email delivery

`.env.example` lists names only. The production contact route requires `RESEND_API_KEY` and `CONTACT_FROM` in private runtime settings, with a verified sender. Local Worker bindings must be configured for your runtime; copying a Next.js `.env.local` file alone is not a guarantee that Worker bindings will receive those values. Do not put credentials in frontend variables or the repository. Chat needs no API key.

## Build and deployment

Run `pnpm build`, then `pnpm start` to preview the built Worker locally. The source is configured for Sites/Vinext and Cloudflare Worker bindings. It is not an Express server and cannot be hosted by opening index.html. Publishing to a different platform is a separate migration task; no Vercel or Netlify deployment is included or claimed.

## Package scope

Includes authored source, configuration, lockfile, images, runtime assets and third-party notices. Excludes node_modules, Git history, local credentials, caches and deployment output. The app code matches source commit recorded in `SOURCE_INFO.json`; this export adds guides and replaces the root README only.
