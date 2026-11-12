# Finalization agent handoff

## Current task

Finish the recording-dependent submission. Read [completion.md](completion.md), the [rubric](../rubric.md), and [SUBMISSION.md](../SUBMISSION.md). The application is merged, verified and frozen on main at audited baseline `c15aebcfffd32a23ec72619cd9a2d115cdc677b1`. PRs #8/#9 are merged; issues #2/#3/#4 are closed. The former related-link check and default-clone startup are complete. Do not repeat them without a source change or concrete defect.

Use the owner's requested extra-high reasoning where supported. Inspect current HEAD/dirty work and preserve newer changes. Use the corrected PDF helper from this finalization bundle; it labels final output as Application submission. The bundled PDF remains a review draft.

## Required input and next action

The applicant must supply a natural recording in their own voice, at most 120 seconds, as a file or accessible playable URL. If only a file is supplied, agree the hosting/sharing destination before publishing it. Application route and actual prior time are factual inputs for sending/compliance, not prerequisites for preparing the document. Do not invent them.

If audio is absent, return the exact missing input and leave #1/#5 open. All independent preparation is complete. Do not build features, retry completed technical gates or generate a final attachment using a placeholder URL.

When audio is available:

1. Measure duration, listen in full, assess natural delivery and Maya-policy accuracy, and verify private-window playback of the real URL. Keep the fictional Oct 5 scenario and Oct 6 next-update commitment.
2. In SUBMISSION.md, replace the **whole body** of the existing voice-response section with the verified HTTPS recording link. Remove both the placeholder and talking points. Preserve the approved 150-word build notes, 114-word Maya reply, 99-word Wei message and 99-word manager message. Remove document-level draft/editorial instructions once checks pass.
3. Keep the default repository link, `https://github.com/Raghuboi/VCycene-mini-project`. Run:

```bash
uv run --with reportlab python scripts/build-submission-pdf.py --final
```

4. Render `output/pdf/VCycene-submission.pdf`; inspect every page, exact approved text, word counts and hyperlink annotations. Require no draft/review-copy/pending/talking-point wording. The helper's URL guard is not proof of audio identity, duration or access.
5. Open every final PDF link privately and play the recording from its actual link. Record source SHA, PDF hash/path, duration, counts and observed results in #5. Close #5/#1 only when the complete accessible attachment exists.
6. Return the finished PDF and readiness status. The applicant chooses the rubric's application route and submits, or separately authorizes sending. Distinguish ready-to-submit from submitted.

Estimate 15–25 minutes of agent finalization after a playable recording is available, excluding applicant recording time. Prior total assignment time is unknown; do not claim four-hour compliance or a new clock. Use the existing Windows/Linux PDF environment, not a new toolchain.

## Constraints and stopping point

Accepted D1/D2/D4, stack, no-unit/no-mock policy and approved writing remain unchanged. Apply the existing Pocock/Pstack/Ponytail contract: one owner, concrete acceptance, smallest necessary repair, and stop after evidence. No new review panels, skill installs, app refactors, runtime model, backend, live deployment or ticket auto-resolution.

The supplied log and current GitHub agree that technical acceptance is complete. Browser proof is already in [the evidence record](evidence/browser-acceptance.md); this packet is not a new browser run. Final PDF rendering/private audio access remain genuinely pending.

Do not send the application or customer/team messages, publish the supplied recording, or merge a new PR without a separate explicit instruction. Keep the raw session export out of public repository artifacts.
