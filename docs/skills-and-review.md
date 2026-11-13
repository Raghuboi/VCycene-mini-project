# Review methods

The original rubric and accepted product decisions define the deliverable. PSTACK, Ponytail, and Matt Pocock's planning methods provide review guidance; they do not add employer requirements or extend the four-hour limit.

## Current audit

The November 13 pass uses one writer and three bounded read-only reviews: application correctness, rubric/documentation consistency, and macOS portability. It ends after concrete corrections and affected-path verification.

| Method | Applied check |
|---|---|
| PSTACK prove-it-works | Check actual build output, saved values, PDF bytes/pages, and link playback. Distinguish inherited browser evidence from this run. |
| PSTACK boundary/type discipline | Trace CSV, URL, and localStorage parsing into typed data. Check one durable save owner and explicit failures. |
| PSTACK minimize-reader-load and subtract-before-you-add | Remove repeated status prose, stale branch instructions, and unnecessary platform-specific font logic. |
| PSTACK sequence-verifiable-units | Record the baseline, make the smallest correction, verify that correction, and preserve a reviewable commit. |
| PSTACK technical-writing and unslop | Give each document one job. Use plain instructions and commands that can be copied without editing. |
| Ponytail review | Read connected callers and storage paths. Report a concrete case, consequence, smallest fix, and verification limit. |
| Matt Pocock methods from original planning | Preserve settled decisions, the requirement map, and explicit acceptance. Do not restart product grilling. |

The [November 13 report](evidence/closeout-2026-11-13.md) records findings and outcomes. The [browser record](evidence/browser-acceptance.md) retains prior executed journeys.

## Project overrides

- Add no unit tests, mocks, invented successful actions, or redundant CI. Generic skill test defaults do not override the owner.
- Keep Router, Query, native forms, pure policy functions, and CSS as the existing state owners. Add no shadow store or first-party useState/useEffect for those responsibilities.
- Judge correctness at the supported load: twelve supplied tickets and one active editing tab. Shared team storage is an interview design discussion, not an unrequested implementation.
- Use permitted browser controls. A blocked check remains unverified; do not bypass policy or label an old capture as fresh execution.
- Keep one implementation owner. No recursive delegation, architecture tournament, new plugin setup, automatic merge, or repeated broad review.
- Do not claim the original time cap was met while historical elapsed work is unknown.

## Pinned provenance

| Source | Reviewed scope |
|---|---|
| [PSTACK at 246bc508](https://github.com/cursor/plugins/tree/246bc508c139c5e036dfafea8978d31a7433279f/pstack/skills) | The eight named leaves above were read for this pass. |
| [Ponytail review at 96608e07](https://github.com/DietrichGebert/ponytail/blob/96608e078b2d5ea607c5c3b8b5a54d1c1fba6846/skills/ponytail-review/SKILL.md) | Connected-code, expected-load, and concrete-finding review. |
| [Matt Pocock skills at 4ae2317d](https://github.com/mattpocock/skills/tree/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d) | Grilling, domain modeling, Wayfinder, and specification methods read during original planning. |

These are portable instructions. Reading them does not install adapters or enable plugin commands. No new skill installation occurred.
