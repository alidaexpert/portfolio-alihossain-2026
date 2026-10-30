# Project map

Start with `app/content.ts`, then `app/page.tsx`. You do not need to edit the tooling to change portfolio content.

| Path | Responsibility |
| --- | --- |
| `app/content.ts` | Name, email, projects, skills, experience, education and certificates |
| `app/page.tsx` | Main portfolio page and section composition |
| `app/globals.css` | Site styles, themes, motion and chat appearance |
| `app/layout.tsx` | Root layout, fonts and metadata |
| `app/scene.tsx` | Three.js portfolio scene |
| `components/portfolio/local-chat-panel.tsx` | Kamado UI: avatars, timestamps, countdown, sound and clear controls |
| `hooks/use-local-ai-chat.ts` | Chat state, worker lifecycle, offscreen reply buffering and saved history |
| `app/ai/instant-answer.ts` | Immediate portfolio-intent routing, greetings and prepared jokes |
| `app/portfolio-guide.ts` | Verified, deterministic portfolio answers |
| `app/ai/context.ts` | Retrieves relevant portfolio facts and builds the model prompt |
| `app/ai/local-ai.worker.ts` | Background model loading and generation |
| `app/ai/chat-history.ts` | Local-storage validation and timezone formatting |
| `app/ai/config.ts` | Shared chat-message type |
| `app/api/contact/route.ts` | Contact validation and optional email delivery |
| `app/api/github/route.ts` | GitHub data fetching and caching |
| `app/api/chat/route.ts` | Compatibility route for portfolio-guide responses; not hosted generative AI |
| `public/assets/` | Portrait, project screenshots and Kamado SVG avatar |
| `public/ai/` | Generated worker, runtime assets, licenses and About page |
| `public/engine/` | Stockfish runtime, license and corresponding source archive |
| `components/ui/` | Shared UI building blocks; many come from the retained starter |
| `scripts/build-local-ai-worker.mjs` | Bundles AI source and copies runtime files during dev/build |
| `scripts/` and `worker/` | Build, preview and Worker integration |
| `package.json` | Commands and dependency declarations |
| `pnpm-lock.yaml` | Exact dependency resolution; keep it committed |
| `.openai/hosting.json` | Identity/configuration of the original hosted Site |

## Chat flow

A visitor sends a message → known intents receive an immediate answer → other questions load the local model → generated words stay buffered offscreen → the completed answer appears with a timestamp → the conversation is saved locally.

Closing the panel does not cancel active generation. Cancel reply stops the worker. Clear history stops work and removes saved messages. Reloading during generation restores an interruption message rather than pretending the reply completed.

Generated assets (`public/ai/local-ai.worker.js` and `public/ai/runtime/`) are included so the package is complete. Edit TypeScript source, not those generated files. Model weights are downloaded separately by the browser and are not bundled in this ZIP.
