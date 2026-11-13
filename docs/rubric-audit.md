# Audit against the original rubric

Updated November 13, 2026. The [original rubric](../rubric.md) is authoritative. Main `c56a9c9d27a88aa00a3307ac3299409852b9a566` has recorded B1–B7 browser evidence. The November 13 correction has source review, a passing build, and a focused Chrome readback on `86c12aaa4dd3ba3ad565173dcbbbd329eb3c341d`.

[Completion](completion.md) owns current work status. [Browser acceptance](evidence/browser-acceptance.md) preserves executed runs and images. [The closeout audit](evidence/closeout-2026-11-13.md) records findings, corrections and verification limits.

## Explicit requirements

| ID | Original requirement | Evidence and disposition |
|---|---|---|
| R1 | Load the twelve sample tickets. | B1/B2/B7 observed twelve distinct IDs, original fields and no initialization write. Complete on the recorded sources. |
| R2 | Prioritize and explain why using the house rules. | B2 compared all twelve cases with the CSV and case-specific reasons/actions. [Case matrix](plan.md#policy-assumptions-and-ticket-analysis). Complete; matching delivery date does not prove unit identity. |
| R3 | Change status, append a note, retain both after refresh. | B3/B5/B7 show exact readback and honest storage failures. A later source review found an unsaved-draft history edge case; the focused cancel/accept/filter Chrome check on corrected source passed. |
| R4 | One useful unrequested feature. | Related customer records and a three-customer candidate firmware cohort; B4/B6 observed navigation and narrow-screen usability. Complete on the recorded sources. |
| R5 | Live link if possible; otherwise repo startup in under five minutes. | Repository route is permitted. B1 candidate entry took 10.053 s; B7 fresh default-main entry took 10.804 s in the recorded Windows/Chrome environment. Those timings are observations, not guarantees for every network. |
| R6 | Build notes <=200 words: tools, actual AI mistake/how caught, next addition/why. | 153 words. Tools, mobile clipping and screenshot correction, then follow-up ownership/reminders. Complete. |
| R7 | Maya writing <=150 words. | 114 words. Named support failure, honest remedy/history path, manager authority, warranty, warehouse gate and October 6 update. Complete. |
| R8 | Applicant naturally speaks for <=120 seconds; accessible audio link; no script reading. | Actual own-voice recording and playable URL are absent. Mandatory content remains open. |
| R9 | Wei <=120 words, actionable without a follow-up question. | 99 words. Cases, symptoms, version, uncertainty, exclusions, missing evidence, requested guidance and response time. Complete within supplied facts. |
| R10 | Manager <=120 words: done, blocked/on whom, one decision. | 100 words. Triage/drafts completed, real dependencies pending, one conditional refund-exception decision. Complete. |
| R11 | One document/PDF with repository, build notes, Maya/audio, Wei and manager. | Canonical writing and a two-page draft exist. Final audio-bearing PDF remains open. |
| R12 | Every final link opens privately before sending. | Earlier public repo access is recorded. Actual final-PDF links and audio playback must still be checked. |
| R13 | Deliver through the specified application/poster route. | Repository and written responses have been shared; complete PDF/recording delivery remains pending through the agreed employer reply thread. Preliminary sharing does not close this requirement. |
| G1 | About three hours; stop at four. | Historical total assignment time is not established. Do not restart the clock or claim compliance. |
| G2 | Check AI-produced work. | Real source corrections, recorded browser readback and inspected screenshots support this. Explain the actual work and its limits. |

The four approved written bodies remain the canonical text in [SUBMISSION.md](../SUBMISSION.md). No numeric grade is invented. R8/R11/R12 prevent complete artifact readiness; R13 requires actual delivery confirmation.

## Six evaluation criteria

| Criterion | Direct assessment |
|---|---|
| The tool works | Recorded first-open, priorities, editing and persistence pass; the narrower invalid-history regression passed on the correction source. |
| Priorities | Reasons use the house rules and distinguish urgent deadlines from blocked remedies. |
| Working with AI | Build notes identify a real mistake, how it was detected and the correction. |
| The customer | Maya's written reply names the failed support history and gives an honest path and next update. Her required natural-voice response is still missing. |
| The team | Wei has a bounded actionable request; the manager has dependencies and one decision. |
| Judgment | Related cases and time pressure are explicit; Maya is not double-counted and amber-light cases are not all treated as one defect. |

React, PSTACK, Ponytail, GitHub cleanup, no-unit-test preferences and MacBook checks are owner/process choices, not extra employer deliverables. The tool is a browser application; no Claude Code session or other agent harness is required to use it. Recording an outcome does not perform the underlying support action.

## Policy distinctions to preserve

| Rule or fact | Required interpretation |
|---|---|
| Reply within one business day | Friday/weekend customer messages are due Monday under the documented Monday–Friday assumption. Support-last rows still need follow-up but are not new inbound breaches. |
| Refund within 30 days | Preserve timely requests for Grace and Andre. Check Maya's earlier request dates before assuming an exception is necessary. Oliver did not request a refund. |
| Carrier claim within 14 days | Tom's Sep 22 delivery gives the modeled Oct 6 boundary. Act today. “Photos attached” in the CSV is not an actual file or filing confirmation. |
| Warehouse confirmation before refund payment | Grace's tracking statement does not establish warehouse confirmation. |
| Manager approves exceptions | Ask if needed; do not promise approval. |
| Related cases | T-101/T-102/T-103 are three candidate customers. Only Maya/Priya explicitly link onset to updating. T-109 is Maya's follow-up. Samir's setup issue and Sofia's 2.4.0 case stay separate. |

Delivery-day-zero, inclusive boundary/cutoff hours and business-day calendar are documented assumptions. The rubric does not specify a unique total ordering of every ticket.

## Executed browser coverage

B1 covered fresh startup; B2 all twelve policies; B3 persistence/no-op/closure/reopen; B4 URL/filter/related navigation; B5 real quota, conflict, corrupt-data backup/reset and offline save; B6 desktop/narrow layouts, focus and accessible controls; B7 fresh merged-main entry and save/refresh. Exact source SHAs, observed values, captures and limitations are in [browser acceptance](evidence/browser-acceptance.md).

Those earlier runs did not cover an invalid same-ticket URL reached by a multi-entry history jump. The [focused November 13 Chrome readback](evidence/closeout-2026-11-13.md#focused-live-browser-readback) covers that path. No in-flight save-navigation observation was made; do not infer one from this check.

## Focused check for the November 13 correction

The following was executed on `86c12aaa4dd3ba3ad565173dcbbbd329eb3c341d` in an isolated Chrome 157 profile; see [actual values and captures](evidence/closeout-2026-11-13.md#focused-live-browser-readback). To reproduce, use the candidate source, a disposable profile, and genuine browser navigation:

1. Open `/?ticket=T-101&view=bad`. Choose Return to queue, then select T-101.
2. Change status and type a uniquely labelled unsaved note. Record the exact draft and existing raw app storage value.
3. Use the browser Back history menu to jump two entries to the original invalid URL. Cancel the discard confirmation. The valid T-101 editor, status, note and storage must remain exact.
4. Repeat and accept discard. The URL error must appear without writing a note or changing saved status.
5. Return to T-101, create a fresh draft, and change a valid All/Active/Resolved filter while retaining the selected ticket. No discard prompt; the exact draft remains.
6. Inspect T-101/T-109 related text at normal and narrow width. It says matching customer/delivery date, without claiming a shared physical unit or clipping the revised text.

The [MacBook checklist](macos-checklist.md) adds native Safari/Chrome portability observations, still unrun here. If browser access is blocked on that machine, record the gap; do not count a build as native acceptance.

The remaining audio and artifact steps live only in [codex-handoff.md](codex-handoff.md).
