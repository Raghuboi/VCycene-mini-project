# Verify and deliver the selected submission

Read [completion.md](completion.md), the [original rubric](../rubric.md), and [SUBMISSION.md](../SUBMISSION.md). B1–B7 and the later focused correction check are recorded. The selected recording and [audio-linked PDF](../output/pdf/VCycene-submission.pdf) exist; [current evidence](evidence/submission-finalization-2026-11-19.md) records their checks. Follow completion status for the applicant's remaining content decision and actual delivery.

## Reconcile new evidence once

Inspect current main and any dirty work before editing. Preserve newer changes. PR #11 is merged and its focused/post-merge results are in [the closeout record](evidence/closeout-2026-11-13.md) and [issue #1](https://github.com/Raghuboi/VCycene-mini-project/issues/1). If the applicant supplies a newer transcript, reconcile only genuinely new facts and keep the raw export private.

A transcript does not itself prove a recording exists or that the complete document was sent. Use the actual artifact or delivery confirmation. Record historical time only if evidence establishes it.

## Application correction already verified

PR #11 fixed the invalid same-ticket history shortcut, source copy and portable PDF fonts. Isolated Windows Chrome confirmed cancel/accept/no-write and valid-filter draft retention, then a fresh public main clone saved a note through refresh. Do not repeat this work for the final PDF unless the source changes. The [MacBook checklist](macos-checklist.md) remains an optional native check, not a claimed Safari pass.

## Verify the real recording

The selected applicant-supplied recording is below 120 seconds and its link has passed signed-out playback. A human listener still needs to judge the 50–57-second promise; repeated ASR heard “transfer” where the written reply promises an “update.” Do not present ASR as listening or force a retake without that decision. For a replacement take, listen from start to finish and measure its duration. Confirm:

- It names the failed restart-only closures and unanswered follow-up.
- It addresses the refund request, earlier contact history, and manager approval if needed.
- It preserves the warranty alternative and avoids promising approval or a firmware fix.
- It promises an update by the end of Tuesday, October 6, in the fictional scenario.
- It places any refund payment after warehouse confirmation.

If the applicant chooses a replacement file, use the intended hosting destination and sharing scope and repeat the private-window playback check. A local path, placeholder URL, or sign-in-only link does not satisfy R8.

## Update the canonical document

The current `SUBMISSION.md` already contains only the selected HTTPS URL under `## Voice response to Maya (two minutes or less)`. If the selected take changes, replace that URL everywhere and remove any stale link.

Preserve the four reviewed writing sections and recount them: build 153/200, Maya 114/150, Wei 99/120, manager 100/120. Keep the main repository URL. Remove document-level draft/editorial text after the content and access checks pass.

## Build and inspect the final PDF

The authoring helper uses the Vera fonts bundled with ReportLab. It does not depend on Windows, Linux, or macOS font paths.

```bash
uv run --with reportlab python scripts/build-submission-pdf.py --final
```

The output is `output/pdf/VCycene-submission.pdf`. The guard requires a URL-only voice section; it cannot establish the speaker, delivery style, duration, or playback. Do not insert a substitute URL to pass it.

Render every page and inspect the images. Check the text, word counts, page breaks, and actual hyperlink annotations. The final artifact must have no DRAFT, Recording pending, APPLICANT ACTION REQUIRED, Talking points only, or Application review copy residue. The current two-page artifact passed this check; repeat after any replacement.

Open the repository and audio links taken from the final PDF in a private browser window. Play the audio. Record source SHA, actual duration, PDF SHA-256, page count, visual result, and link result in issue #5. The older review PDF remains a draft; do not attach it instead of the current final artifact.

## Publish the actual artifact and deliver

The original rubric, both CSV copies, reviewed writing and dependency lockfile remain authoritative. The audio and final PDF now exist; review the small canonical-source/PDF diff without reopening the merged app correction. Publish the ready artifact only under the owner's instruction and read back the exact public final PDF. A documentation/PDF-only update needs rendered-page, URI and access checks, not another full browser wave.

Close #5 when the complete accessible attachment exists. Close #1 only after actual delivery confirmation. Keep #2–#4 closed and preserve historical evidence refs.

Use the confirmed private correspondence to select the submission thread and recipients. Do not post private hiring emails or personal availability in GitHub. Send only under explicit authorization. An interview invitation is not proof that the final audio-bearing PDF has been delivered.
