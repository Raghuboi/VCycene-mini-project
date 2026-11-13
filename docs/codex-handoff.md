# Finish the submission

Read [completion.md](completion.md), the [original rubric](../rubric.md), and [SUBMISSION.md](../SUBMISSION.md). B1–B7 browser acceptance is recorded. This handoff finishes the focused November 13 correction check, applicant recording and final document.

## Reconcile new evidence once

Inspect the current main SHA, the cleanup PR, and any dirty work. Preserve newer changes. If the applicant supplies a new session transcript, compare its commits and observed outcomes with the [browser record](evidence/browser-acceptance.md). Record only new facts. Keep the raw transcript private.

A transcript does not itself prove a recording exists or that the complete document was sent. Use the actual artifact or delivery confirmation. Record historical time only if evidence establishes it.

## Verify the narrow application correction

The source review found that invalid same-ticket history could bypass the dirty-form guard. Commit `a64300b61f612c326c0a48a4749ecd210c6ebe97` validates destination search before allowing that shortcut. Source follow-up and the build pass; the [focused browser check](rubric-audit.md#focused-check-for-the-november-13-correction) remains required. Record cancellation, acceptance/no-write and valid-filter draft retention on the candidate. The [MacBook checklist](macos-checklist.md) can cover this in the same pass. Keep the PR in draft until this observation exists.

## Verify the real recording

The applicant supplies their own natural recording of no more than 120 seconds. Listen from start to finish and measure its duration. Confirm:

- It names the failed restart-only closures and unanswered follow-up.
- It addresses the refund request, earlier contact history, and manager approval if needed.
- It preserves the warranty alternative and avoids promising approval or a firmware fix.
- It promises an update by the end of Tuesday, October 6, in the fictional scenario.
- It places any refund payment after warehouse confirmation.

If the applicant supplies only a file, use the applicant's intended hosting destination and sharing scope. Verify the real HTTPS link in a private browser window and play the recording. A local path, a placeholder URL, and a sign-in-only link do not satisfy R8.

## Update the canonical document

Replace the entire body of `## Voice response to Maya (two minutes or less)` in SUBMISSION.md with only the verified HTTPS URL. Remove its placeholder and talking points.

Preserve the four reviewed writing sections and recount them: build 153/200, Maya 114/150, Wei 99/120, manager 100/120. Keep the main repository URL. Remove document-level draft/editorial text after the content and access checks pass.

## Build and inspect the final PDF

The authoring helper uses the Vera fonts bundled with ReportLab. It does not depend on Windows, Linux, or macOS font paths.

```bash
uv run --with reportlab python scripts/build-submission-pdf.py --final
```

The output is `output/pdf/VCycene-submission.pdf`. The guard requires a URL-only voice section; it cannot establish the speaker, delivery style, duration, or playback. Do not insert a substitute URL to pass it.

Render every page and inspect the images. Check the text, word counts, page breaks, and actual hyperlink annotations. The final artifact must have no DRAFT, Recording pending, APPLICANT ACTION REQUIRED, Talking points only, or Application review copy residue.

Open the repository and audio links taken from the final PDF in a private browser window. Play the audio. Record source SHA, actual duration, PDF SHA-256, page count, visual result, and link result in issue #5. The review PDF remains a draft until this work is complete.

## Finish the cleanup and delivery

Use the current cleanup branch named in completion.md; PR #10 is historical and already merged. Inspect the final diff. The original rubric, both CSV copies, approved writing, and dependency lockfile must remain intact unless a concrete reviewed requirement necessitates a change.

For the November 13 copy correction, inspect T-101/T-109 text at normal and narrow width: matching customer/delivery date, no shared-serial assertion or clipped copy. Source/build evidence must not be reported as a Safari run.

Present the concrete candidate and artifact for review. Merge only under the applicable owner instruction after the focused correction check. Read back main and compare the relevant file trees. Check the evaluator entry and a save/refresh if application source changed. A documentation/PDF-only merge requires affected artifact checks, not another full B1–B6 wave.

Close #5 when the complete accessible attachment exists. Close #1 only after actual delivery confirmation. Keep #2–#4 closed and preserve historical evidence refs.

Use the confirmed private correspondence to select the submission thread and recipients. Do not post private hiring emails or personal availability in GitHub. Send only under explicit authorization. An interview invitation is not proof that the final audio-bearing PDF has been delivered.
