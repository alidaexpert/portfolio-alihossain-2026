# Automatic on-device AI

## Architecture
- `hooks/use-local-ai-chat.ts`: instant portfolio routing and on-demand AI startup, queued first question, streaming, retry, stop, timeouts and labelled guide fallback.
- `app/ai/local-ai.worker.ts`: Transformers.js 3.8.1 / ONNX Runtime Web, single-thread CPU WebAssembly inference. No WebGPU dependency or cross-origin isolation requirement.
- `app/ai/context.ts`: small lexical retrieval over verified portfolio content. This is runtime context, not training.
- `components/portfolio/local-chat-panel.tsx`: compact loading status; technical details are linked in the footer instead of covering chat.
- `public/ai/about.html`: model provenance, privacy and limitations.
- `/api/chat`: guide-only compatibility endpoint; no paid inference route.

Model: `onnx-community/SmolLM2-360M-Instruct-ONNX`, q4. Hugging Face trained the original SmolLM2 model; this site does not train or fine-tune it. Model files download from Hugging Face and may be cached. The runtime is served with the site. No API credentials, paid AI calls or ChatGPT tokens are involved. Device power, internet access and website hosting are separate resources.

Known portfolio questions return immediately with a Portfolio guide label. Open-ended questions start loading the generative model on demand. Questions submitted during loading are queued. Replies stream from the local worker. Prompts are not sent to an inference provider. Model downloads share ordinary request metadata with their host. Browser site-data settings control cached files. The small model can make mistakes; it does not browse the internet or perform external actions.

## Compatibility
WebAssembly CPU execution supports devices without WebGPU. It cannot guarantee every device: memory limits, browser restrictions, network failures or a slow CPU can prevent generation. A failed engine falls back to clearly labelled portfolio-guide answers, never disguised as generated AI. Load timeout is 10 minutes; generation timeout is 3 minutes. Stop terminates the worker immediately; the next question reloads the engine using available cached files.

## Build and sources
`node scripts/build-local-ai-worker.mjs` bundles the worker and copies the browser runtime assets. This also runs during dev/build. Do not hand-edit generated worker files.
- https://huggingface.co/docs/transformers.js/v3.8.1/en/index
- https://huggingface.co/docs/transformers.js/v3.8.1/en/guides/dtypes
- https://huggingface.co/onnx-community/SmolLM2-360M-Instruct-ONNX
- https://huggingface.co/HuggingFaceTB/SmolLM2-360M-Instruct (Apache-2.0)
- https://github.com/microsoft/onnxruntime (MIT)

See VALIDATION.md for tested behavior and remaining limits.

## Kamado UI and history
Generated tokens stay buffered until completion, then the whole answer is rendered. The five-second countdown checks status; slower generation shows elapsed time rather than promising a false deadline. Optional reply chime is enabled only after a user gesture. Kamado has a Tanjiro-inspired SVG fan avatar, prepared jokes and a friendly model prompt.

`app/ai/chat-history.ts` validates versioned local storage, retaining the last 120 messages with ISO timestamps. Rendering uses the browser timezone, including daylight saving. History has no scheduled expiry, but clearing browser data, private mode or storage restrictions may remove it. Clear chat removes the local key and terminates ongoing work. Previous versions did not persist messages and cannot be recovered retroactively.
