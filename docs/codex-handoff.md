# Execute the final rubric audit and submission

Use [rubric-audit.md](rubric-audit.md) as the acceptance checklist and [completion.md](completion.md) for current status. Read the original rubric first. This is the owner's requested final acceptance wave. It does not reopen product design or replace earlier evidence.

## 1. Freeze the candidate and allowance

1. Read AGENTS.md, rubric.md, SUBMISSION.md and the two linked documents. Use the owner's extra-high reasoning setting where supported; record the actual setting, not an assumption.
2. Inspect main, PR #10's current head and dirty work. Main's audited baseline is `c15aebcfffd32a23ec72619cd9a2d115cdc677b1`. Preserve newer work. Use one implementation owner and the existing finalization branch.
3. Record actual prior assignment work, current start and hard stop. The rubric says stop at four hours. Unknown historical time prevents a compliance claim; a fresh audit is not a fresh allowance.
4. Identify the existing permitted browser and preview owner. If that browser cannot run a required check, record the specific capability gap. Do not bypass access controls or replace live results with screenshots from an old run.

If audio is already available, inspect it while the technical work proceeds. If not, the owner follows [owner-runbook.md](owner-runbook.md); finish independent work before waiting.

## 2. Run the browser and vision wave

Execute B1–B6 in [the rubric audit](rubric-audit.md#one-final-live-browser-and-vision-wave) on the frozen candidate. Follow real user actions with actual browser storage. Use isolated profiles for audit edits, corruption/quota checks and private access.

Record the full SHA, browser/version, origin, viewport and time. B1 times fresh startup. B2 checks every ticket. B3 proves exact status/note persistence and source preservation. B4 checks navigation/draft ownership. B5 checks genuine failures and recovery. B6 checks 1440/1024/390 layouts, keyboard and accessible controls.

Capture fresh queue, detail/editor and success/error states. Inspect the images with vision for unreadable reasons, clipping, hidden Save controls, misleading feedback and cramped navigation. Inspect the actual DOM/accessibility names for keyboard and semantic claims. A screenshot cannot prove a stored value survived refresh; read the persisted value independently.

Use one typecheck/production build for the frozen candidate when needed. Do not create unit tests, mocks, test-framework infrastructure or redundant CI. Temporary probes that drive the real browser may record results; do not turn them into an implementation-mirroring suite.

Append only executed results to `docs/evidence/browser-acceptance.md` under the tested SHA. Preserve historical entries. Mark unavailable/failed checks explicitly. If a fast save completes before a navigation attempt, report that timing rather than claiming to have observed an interrupted pending save.

## 3. Apply the bounded Pstack/Ponytail review

Use one Spec reader and one Standards reader. Spec checks R1–R13, the six evaluation criteria, dates, policy uncertainty and truthful written claims. Standards checks connected code for actual findings, durable writes, error handling, draft ownership, accessibility and removable duplication at the supported one-editor scope.

Apply prove-it-works to actual values/artifacts; minimize-reader-load to conflicting docs and hidden state; sequence-verifiable-units to each correction. Ponytail findings need a concrete case, consequence and smallest fix. No finding may rest on a personal styling preference or hypothetical multiuser load.

Repair correctness/data loss, policy mistakes, broken entry and inaccessible required actions first. Fix visual defects only when they affect a rubric outcome. Do not add features, new state owners, a backend, runtime model or deployment. Use one repair pass and rerun only affected journeys. If a required failure remains at the deadline, leave it open and report it.

## 4. Finish the actual recording and canonical submission

The applicant supplies their own natural recording, <=120 seconds. Measure duration and listen in full. Check the failure acknowledgment, refund/history/manager uncertainty, warehouse payment gate and October 6 update. Confirm private-window playback of the real link. A local file needs an appropriate evaluator-accessible hosting destination before it can be linked; use the applicant's intended sharing scope.

In SUBMISSION.md, replace the **entire body** of `## Voice response to Maya (two minutes or less)` with the verified HTTPS recording link. Remove placeholder and talking points. Preserve the approved build/Maya/Wei/manager bodies and their 150/114/99/99 whitespace counts. Keep the main repository URL.

Remove top-level draft/editorial instructions once content and access checks pass. If the final PDF displays raw authoring markup in tool instructions, correct that presentation without changing the approved message bodies. Do not invent a recipient, application route or timing claim.

## 5. Generate and inspect the final attachment

Use the corrected helper in this branch:

```bash
uv run --with reportlab python scripts/build-submission-pdf.py --final
```

Expected output is `output/pdf/VCycene-submission.pdf`. The helper's guard checks placeholder/HTTPS presence; it does not verify audio identity, natural delivery, duration or sharing access. Do not use a substitute URL to make final mode pass.

Render every page with the available PDF tools. Check exact text, word limits, all sections, page breaks and actual hyperlink annotations. Require no DRAFT, Recording pending, APPLICANT ACTION REQUIRED, Talking points only or Application review copy residue. Open the PDF's actual repo and audio links in a private window and play the recording.

Record source revision, PDF path/hash, duration, word counts, visual inspection and link outcomes in issue #5. A complete document may be ready before the owner selects the sending channel. Keep ready-to-submit separate from submitted.

## 6. Consolidate main and GitHub

Keep all finalization changes in PR #10. Check that rubric/CSV source and approved text did not drift, every relative doc link resolves, and SUBMISSION.md is the sole submitted-writing source. The old draft file is retired in this packet; do not restore its conflicting Wei version.

Present the concrete final diff/artifact for the owner review step. Merge only under the applicable owner instruction; read back the actual merge SHA. Execute B7 against the default main entry, confirming its application tree matches the accepted candidate. A docs-only merge needs this delivery smoke, not another full B2–B6 cycle.

Close #5 when the complete accessible attachment and required acceptance evidence exist. Keep R13 and #1 pending until the applicant confirms actual submission. Do not mark an unsent application submitted. Leave #2–#4 closed with their original results. PRs #6/#7 stay closed as superseded; #8/#9 stay merged. Follow completion.md's branch-disposition table. Do not merge the old HTML implementation or delete branches without checking preservation and authorization.

Return the final main/candidate SHA, completed rubric items, actual observed checks, unresolved limitations, final PDF and actual time accounting. Send the application or messages only under an explicit instruction for that action. No autonomous review loop continues after the criteria are met.
