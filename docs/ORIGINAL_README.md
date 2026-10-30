# Ali Hossain — Digital Atelier

A portfolio built with React 19, TypeScript, Next.js App Router conventions and the Sites Vinext runtime. Uses React Three Fiber, Drei and Three.js. The original Netlify site has not been modified.

## Run locally
Use Node 22.13+ and pnpm. `pnpm install`, then `pnpm dev`. Type check with `pnpm exec tsc --noEmit`; production build with `pnpm build`.

## Content
Edit `app/content.ts`. Personal facts are derived from https://ali-hossain.netlify.app/ on 2026-10-27 (Asia/Dhaka). The original CV is linked unchanged. Portrait and project screenshots are local copies. The original availability and current-employment claims need reconfirmation; no new duration or availability claim is made.

Add certificate objects to `certificates` with title, issuer, optional date, image path and optional credential URL. Put images in public/assets. A carousel and native dialog preview appear automatically. No public upload or admin interface is exposed.

## 3D and motion
`app/scene.tsx` is an original procedurally modeled stylized explorer; no third-party character model is distributed. Replace the Explorer component to use a licensed GLB. The scene has pointer-follow, idle movement, constrained drag rotation, adaptive lighting and shadows. It renders only while in view and respects the motion switch and reduced-motion preference. A static original SVG illustration is provided when WebGL is unavailable. Subtle scroll-linked character displacement is included. Rigged GLB poses and advanced camera choreography remain refinements, not completed features.

## Integrations
- Contact: `/api/contact` validates submissions and calls Resend only when `RESEND_API_KEY` and `CONTACT_FROM` (a verified sender) are configured. Without these, it returns 503 and explicitly states nothing was sent. Email, telephone and WhatsApp links work independently. No fake success state.
- AI: key-free SmolLM2-360M inference in a browser Web Worker via Transformers.js and ONNX Runtime Web. Open-ended questions load public weights on demand; known portfolio questions return immediately without inference. Single-thread WebAssembly runs on the CPU without WebGPU; sufficient memory and WebAssembly support are required. The client supplies portfolio context at runtime (not fine-tuning). Streaming, stop, cancellation, timeout and labelled guide fallback are included. `/api/chat` is guide-only and contains no paid provider path.
- GitHub: public calendar and repositories for the owner-supplied `alidaexpert` profile, selectable years and a 15-minute cache. A dated authentic snapshot keeps the graph usable during upstream failures. Refresh bundled snapshots with `python scripts/snapshot-github.py`. Zero activity is shown honestly.
- Chess: Stockfish 19 Lite in a dedicated browser worker, maximum skill with unrestricted strength, configurable 2/5/10 second searches. Chess.js validates moves, castling, en passant, promotion and results. Includes PGN export, restart and resignation. Sculpted WebGL board plus tilted CSS and classic accessible boards. The GPL license and corresponding source archive are distributed under public/engine.
- Loader: asset/font progress with skip and timeout; reduced-motion support. Sitewide pointer-follow neon and warm ambient glow. Alternate theme uses maroon #3B0E1E, amber #FFBD3F and golden yellow #FFE383.
- Basic per-isolate rate limits are included; these are not a global abuse guarantee.
- Booking: call requests use the original email address; no meeting is represented as booked. A verified scheduling URL is still needed for real-time availability.

Secrets belong in private runtime environment settings. `.env.example` documents names only. Do not commit values.

## Deployment and privacy
Sites uses its configured Worker build. Keep `.openai/hosting.json` project identity unchanged. The deployment is public; robots indexing is disabled. To deploy to ordinary Next.js hosting, use the same App Router source, replace the Vinext build scripts with Next scripts, and validate that target separately. No Vercel/Netlify deployment is claimed.

## Known limits
Local AI speed and compatibility depend on browser capabilities, memory and CPU. First use downloads model weights. Email delivery still needs configuration. Certificate carousel/modal has an empty data state until actual images are supplied. No fabricated testimonials or awards. Original projects are linked and preserved even if their third-party hosting changes.
