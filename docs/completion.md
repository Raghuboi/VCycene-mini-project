# Completion and verification

**Current implementation evidence:** The corrected application was exercised in Chrome 157 on Windows at source `2d89b837be81b9a72932c95438f71fd630242a5a`; see [browser acceptance](evidence/browser-acceptance.md) and its desktop/mobile captures. The save-time unknown-ticket rejection, backup/reset, normal refresh persistence, real quota failure/retry, policy text, URL navigation, keyboard, and narrow layout all passed. Applicant-owned audio and the recording-dependent final PDF/application submission remain pending. The historical audit below preceded this corrected browser pass; its "pending" statements describe the earlier environment, not the current app gate.

**Historical audit: 11 November 2026, America/Toronto.** At that point the remaining work was targeted browser verification and the applicant's submission package. Do not restart design or add features.

## Revision and evidence

- Audited head: `b934cd5fa29adb4ce6441c758ed928b9896f5d0c`, branch `feat/monday-queue-accepted`.
- `main` was still `ace5735ebc65158b3cc8ea86c5a10ad3d0b6fc7c`, containing the original assignment rather than the app. Use the explicit branch instructions in README until a reviewed merge.
- The implementing agent reported browser checks at `6f0101adad385571209b63b38af88d1e56ff6866`. The diff from that revision to the audited head changes only three planning documents. Those reports are prior evidence, not a fresh browser run by this audit.
- This correction changes `src/lib/queue.ts` and `src/lib/policy.ts`. Their affected behavior requires the checks below. The current PR head identifies the corrected candidate; record its full SHA with the next browser result.

Evidence terms: **observed** means executed in this audit; **reported** means recorded by the implementing agent; **inspected** means source review; **pending** means the required outcome has not yet been established for the correction.

## Corrections made

1. **Save validation before persistence.** A schema-valid saved document could contain an unknown `T-999` key. Previously a note/status write could commit before snapshot membership validation threw, causing the UI to say the update was not saved. The canonical snapshot is now validated before `writeEdits`; corruption errors retain the original raw value for backup. Independent targeted source review confirmed the ordering. Runtime regression remains pending.
2. **Maya eligibility uncertainty.** Application guidance now checks earlier request history before seeking an exception if needed, consistent with the written reply.
3. **Grace and manager authority.** Arrival is attributed to tracking, rather than asserted as confirmed receipt. The house-rule list includes the manager's authority over exceptions.
4. **Evaluator startup.** README and submission specify the actual implementation branch, Node 24, and `npm ci`. A default clone of the current main branch would not contain the application.
5. **Execution state.** AGENTS and the skill contract recognize the accepted product decisions and built application. No additional product approval is required to finish the existing scope.

## Checks actually performed in this audit

| Check | Result |
|---|---|
| Clean checkout | Observed exact audited head in a new local clone. |
| Locked install | `npm ci --no-audit --no-fund` succeeded; 105 packages, 8 seconds. |
| Production build before and after corrections | Both passed; build includes TypeScript checking. Corrected Vite build: 298 modules, 2.13 seconds. |
| Served production files | Preview HTML, JavaScript and CSS returned HTTP 200. Preview startup plus HTTP checks took 0.53 seconds in the same process environment. This is not browser-interaction proof. |
| Source import | Twelve records, twelve unique IDs; bundled and original CSV bytes identical. |
| Diff integrity | `git diff --check` passed. Original rubric/CSV were not edited. |
| Code review | Separate bounded Spec and Standards reviews, then one targeted inspection of the repair. No remaining static defect found in that repaired path. |
| Written limits | Build notes 150/200; Maya 114/150; Wei 99/120; manager 99/120 words, excluding headings. Recount if edited. |

Environment: Node 24.22.1, npm 11.9.0, Linux. Build warnings concern a third-party annotation and the existing bundle-size advisory; they did not fail the build. No dependency upgrade, unit suite, mock, or new CI was added.

## Browser boundary

System Chromium could not launch because the environment denied a required socket operation. The available cloud browser could not reach the local preview; recovering its failed tab was then rejected by browser policy. No policy changes, security bypass, or substitute success evidence were used.

Consequently, this audit did **not** execute the corrected application in a browser. The earlier implementer reports cover save/refresh, navigation, filters, relationships, mobile/keyboard semantics, offline save, revision recovery, corruption recovery, and genuine quota failure. Keep those reports attributed to their source revision. The following bounded pass is the remaining code gate.

## Remaining browser pass: 15-20 minutes

Use an isolated browser profile and the corrected PR head. Preserve the exact raw storage value when checking recovery. Do not use mocked storage APIs.

| Check | Actions and required result |
|---|---|
| Normal save after repair | Start with the original twelve tickets. On T-104, change status and append a unique note. Save and refresh. Both edits remain; original note and last-reply fields remain intact; another ticket is unchanged. |
| Unknown stored ID during editing | Load T-104 first. Then set only `vcycene.queue.edits` to the JSON below through browser developer tools. Submit a nonempty note. The UI reports failure, the draft remains, and the raw stored string is byte-for-byte unchanged. No T-104 edit or revision is appended. |
| Corruption recovery | From that failure, open backup/reset options after explicitly discarding the draft. Download the original raw value. Confirm the app-only reset; all twelve original tickets return. Unrelated storage stays untouched. |
| Write refusal | Exercise the previously used real quota/permission failure in the isolated profile. A failed write retains the draft and reports no Saved outcome. Then retry after the genuine condition is cleared. |
| Corrected policy copy | Inspect both Maya records: earlier history is checked, exception only if needed. Inspect Grace: tracking-reported arrival and missing warehouse confirmation. Expand policy guidance and confirm all five house rules. |
| Short navigation regression | Check Back/Forward, dirty-navigation cancellation, Resolved-note guard/reopen, and related-case links. Inspect the corrected text at a narrow width. |

Use this schema-valid but unknown-ticket document for the second check:

```json
{"version":1,"tickets":{"T-999":{"status":"open","revision":1,"notes":[]}}}
```

Record the full commit SHA, browser, URL, action, observed result, and evidence location in [issue #4](https://github.com/Raghuboi/VCycene-mini-project/issues/4). Screenshots establish wording/layout; storage readback and refresh establish persistence. A failed required check stays open. Repeat only checks affected by any further correction.

## Submission completion

| Item | Current state | Next action / owner |
|---|---|---|
| Tool and one extra | Implemented; corrected build passes | Executing agent completes the bounded browser gate. |
| Evaluator entry | Explicit branch clone instructions; clean install/build/HTTP observed | Verify the actual submission link and fresh startup in a private browser on the final revision. A live deployment is optional under the rubric. |
| Written build/customer/team material | Complete draft within all word limits | Preserve the edited Maya wording; update any claims if implementation changes. |
| Applicant recording | Missing from repository/submission | Applicant records naturally, at most two minutes, and supplies an accessible playable link. |
| Attachment | `output/pdf/VCycene-submission-draft.pdf` is a review copy | After audio is supplied, insert its link into SUBMISSION.md, regenerate the PDF, and check all links/audio privately. Remove the draft warning only after all gates pass. |
| Merge | PR #8 is unmerged | Applicant reviews and merges when satisfied. Branch-specific delivery is possible without a merge; never point the evaluator at empty main. |
| Application sending | Not performed | Confirm application route and send only on an explicit instruction. |
| Time compliance | Prior total elapsed time remains unknown | Applicant supplies actual timing; do not claim the four-hour limit was met. |

The recording is the only mandatory content item that must be created by the applicant personally. Document assembly, link checks, and the remaining browser pass are agent work once the needed input/environment is available.

## Final acceptance and walkthrough

Close [issue #2](https://github.com/Raghuboi/VCycene-mini-project/issues/2) and [issue #3](https://github.com/Raghuboi/VCycene-mini-project/issues/3) only after the corrected behavior is observed. Close issue #4 after final access and evidence are recorded. Close [issue #5](https://github.com/Raghuboi/VCycene-mini-project/issues/5) only when the recording and complete attachment are accessible.

For the interview, explain Tom's first position, Maya's linked history, the candidate firmware group, and the distinction between recording a status and completing an external action. Demonstrate a saved note surviving refresh. Know where policy reasoning (`src/lib/policy.ts`), save behavior (`src/lib/queue.ts`), and presentation live so the small live change stays bounded.
