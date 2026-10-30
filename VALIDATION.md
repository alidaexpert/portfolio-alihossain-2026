# Validation — 27 October 2026
- TypeScript passed with no errors.
- Production build passed; lazy Three.js chunk exceeds 500 kB before compression and is loaded only with WebGL support.
- Chromium desktop: theme state change, skills category filtering, classic/interactive toggle, project category filtering, chat open/close and unavailable response verified.
- Contact form: required fields, submission, and explicit unconfigured-delivery response verified. No email was sent.
- Mobile: 390px iframe viewport inspected; menu opens, anchor navigation closes it, no horizontal overflow (375px client and scroll widths including scrollbar).
- Original project URLs and original Google Drive CV URL all returned HTTP 200. This verifies URL reachability, not all third-party project functionality.
- Static explorer fallback rendered. This cloud browser did not expose WebGL; live 3D visual quality and interaction remain unverified here.
- No authenticated AI, email, GitHub or scheduling end-to-end test was possible without owner configuration.
- No Lighthouse score, Firefox or Safari pass is claimed.

## Portfolio update checks
- Chess browser test: e2–e4 accepted, Stockfish automatically replied e7–e5, resignation displayed Ali as winner.
- Rules fixtures passed: checkmate winner, stalemate, insufficient material, threefold repetition, promotion, castling and en passant.
- GitHub year selection: 2021 renders 154 authentic contributions. Snapshot fallback is labelled.
- Chat UI returned verified skills with explicit portfolio-guide label. Secure API smoke test returned billing_not_active; no generative success is claimed.
- Theme toggle and pointer-follow halo position verified. WebGL was unavailable in this browser; CSS tilted board was visually checked. Actual WebGL board appearance remains unverified.

## Key-free local AI update
- TypeScript check passed.
- Browser verified explicit enable action, unsupported-WebGPU message and labelled contact-answer fallback.
- Worker protocol test with a mocked local engine passed progress, grounded context, bounded alternating history, streamed chunks, completion and stop. This does not validate actual model quality or GPU inference.
- Public model config and weight manifest fetched; weights total 203,614,080 bytes (runtime/tokenizer files are additional). Selected WebGPU Wasm endpoint returned HTTP 200.
- No paid-provider URLs or AI key references remain in application chat code. Hosted AI environment entries removed.
- The cloud browser does not expose WebGPU; successful real generation, GPU memory behavior and answer quality remain unverified here.

## Automatic CPU assistant — 28 October 2026
- Real browser WebAssembly model load and generated replies succeeded without WebGPU. This supersedes the earlier WebGPU-only validation limit.
- Opening chat starts automatically; submitting during download queues the question. No enable button or technical overlay remains.
- Real generated portfolio-skills answer referenced React and JavaScript; new conversation and subsequent greeting worked. Small-model answer quality is limited, not ChatGPT-equivalent.
- TypeScript and production build passed. Existing large Three.js chunk warning remains.
- Browser memory/speed and cold downloads vary. No claim of universal device compatibility, training from scratch, Firefox/Safari validation or paid inference.

## Fast portfolio routing — 28 October 2026
- Nine routing assertions passed: common portfolio/greeting intents use immediate local answers; general explanation, code, comparison and weather questions remain generative. Routing-only fixture took under 2 milliseconds, not a browser latency guarantee.
- Browser verified chat opens without preparing/model download, and the full projects answer appears after submit with a Portfolio guide label and no typing animation.
- Generative path retained for open-ended requests; reduced maximum reply budget from 128 to 64 tokens and shortened history. No one-second generative latency claim.
- Download percentages removed because individual-file completion was not whole-model readiness.

## Kamado complete-message chat — 28 October 2026
- TypeScript passed. Real CPU model generated “Good morning!” as a completed reply with no partial words committed to the UI; token events are buffered in a ref.
- Browser verified five-second status countdown, later elapsed-time state, local message times, joke response, Tanjiro-inspired SVG avatar, history after reload, and clear-history controls.
- History parser checks passed for malformed JSON, unsupported roles, interrupted replies and the 120-message retention cap. Time formatting checked for Asia/Dhaka (2:47 PM GMT+6) and America/New_York (4:47 AM EDT) from the same UTC instant.
- Countdown is a status check, not a generation-time guarantee. Inference stays in the background browser worker, not a hosted AI server. Reply sound is optional; audible output was not verified in the remote browser.
