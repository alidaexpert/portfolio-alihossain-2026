# Customization guide

## Personal details and projects

Edit `app/content.ts`. Keep the exported object/array shapes intact. Change a title or description first, save, and watch the development preview update. Project images belong in `public/assets/`; reference them using `/assets/filename.webp`.

Add certificates using the existing `Certificate` type. The certificate section has an empty state until real certificate data and images are supplied. Do not add private personal data to public source.

## Colors and motion

Edit theme variables and the later theme overrides in `app/globals.css`. Because this stylesheet has multiple responsive and theme sections, search for the variable or selector and review all matches before changing it. Preserve reduced-motion support. The site’s motion switch and reduced-motion fallback are intentional accessibility features.

## Kamado

| Change | File |
| --- | --- |
| Name, welcome message and chat controls | `components/portfolio/local-chat-panel.tsx` |
| Floating button label | `app/page.tsx` |
| Avatar artwork | `public/assets/kamado-avatar.svg` |
| Prepared jokes | `app/ai/instant-answer.ts` |
| AI personality/instructions | `app/ai/context.ts` |
| Generation length/model settings | `app/ai/local-ai.worker.ts` |
| History cap/storage key | `app/ai/chat-history.ts` |
| Loading/error/cancellation behavior | `hooks/use-local-ai-chat.ts` |

The reply is computed locally in a background worker, not a remote server. `token` events only update a buffer; `done` publishes the full response. Keep that distinction if you want to avoid word-by-word output.

The five-second timer does not accelerate the model. After zero, it honestly shows elapsed time. Do not claim an exact completion time unless measured by a backend capable of delivering it. The small model can make mistakes; changing its prompt is not training a new model.

## GitHub and chess

Search for `alidaexpert` to find the profile references. If changing owners, update both UI/API references and the snapshot content. `scripts/snapshot-github.py` refreshes snapshots when network access is available.

Find chess components by searching for `Stockfish` or `ChessGame`. Keep chess.js move validation and result handling intact. Preserve the engine’s GPL license and corresponding source archive when distributing its binaries. The opponent represents Ali automatically; it is not live human play.

## Safe editing routine

1. Make one small change.
2. Preview it with `pnpm dev`.
3. Check narrow/mobile layout and relevant controls.
4. Run `pnpm exec tsc --noEmit`.
5. Run `pnpm build` before deployment.

Do not commit `.env.local`, `.dev.vars`, access tokens or runtime caches. The ZIP intentionally excludes them.
