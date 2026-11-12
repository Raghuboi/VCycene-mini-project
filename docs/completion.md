# Finalization bundle

Updated 12 November 2026, America/Winnipeg. **The application is complete on main. The only missing required content is the applicant's own recording.** Final document assembly and private-window link checks follow that input.

Start the executing agent with [codex-handoff.md](codex-handoff.md). Preserve the approved [SUBMISSION.md](../SUBMISSION.md); the existing [PDF review copy](../output/pdf/VCycene-submission-draft.pdf) is deliberately a draft. The [rubric](../rubric.md) defines completion; the [case matrix](plan.md) and [state contract](state-and-verification.md) remain references, not a new build cycle.

## Verified baseline

Audited main: `c15aebcfffd32a23ec72619cd9a2d115cdc677b1`.

| Work | Current evidence |
|---|---|
| Application merged | [PR #8](https://github.com/Raghuboi/VCycene-mini-project/pull/8) squash-merged at `89d61f80901837415219d36444a6ea98f17e2d4b`. |
| Main evaluator entry | [PR #9](https://github.com/Raghuboi/VCycene-mini-project/pull/9) merged at `c15aebc`, aligning README, submission source and PDF with the default repository URL. |
| Core browser acceptance | [Chrome record](evidence/browser-acceptance.md): twelve tickets; status/note save and refresh; source preservation; policy/relationships; URL/history; dirty navigation; real quota failure; offline save; corruption/conflict recovery. |
| Final related-link check | Same record, final section: source `6f26d0b`, checkout `837b522a`, Chrome 157, 390px. T-101/T-109 detail visibility, cancelled/accepted discard and unchanged storage all passed; captures are committed. |
| Fresh main startup | Supplied session tool results and PR #9 record: default clone at `89d61f8`, install/build, twelve IDs in Chrome, saved note retained after refresh. Public repo/README opened in a private browser context. |
| Source reconciliation | Direct tree comparison shows main's application source and dependency files match the previously reviewed `837b522a` candidate. Squash-merge ancestry alone is not used as equivalence proof. |
| Written material | Whitespace counts rechecked: build notes 150/200, Maya 114/150, Wei 99/120, manager 99/120. Approved bodies unchanged. |
| Review PDF | Two pages, main repository hyperlink, explicit draft/recording warning. SHA-256 `ec9802eb8e6e91464156542614372329a7cb447454069ce47ce5c4cba1363add`; both pages rendered/inspected and bytes unchanged in this bundle. |

The supplied execution log was checked against actual tool-result records, then current GitHub state. The browser results remain attributed to those executed sessions; this bundle audit did not run another browser or repeat the application build. The raw session export is not part of the public bundle.

Issues #2/#3/#4 are closed. Keep #1/#5 open until the complete accessible attachment exists. No technical application gate remains; freeze application code unless a concrete regression appears. The tool uses the supplied CSV in a normal browser and does not require a runtime harness or external support integrations. The assignment does not require closing every customer case.

## Inputs still needed

| Input | Why it is needed | Does it block the final PDF? |
|---|---|---|
| Applicant's own natural recording, no more than 120 seconds, as an audio file or playable URL | Mandatory rubric content. A local file must acquire evaluator-accessible hosting before finalization. | Yes. |
| Application route/destination: LinkedIn or Indeed application, or the original post's contact | Determines whether the finished PDF is uploaded as a cover letter/resume page or sent to the poster. | No; needed to submit correctly. |
| Actual elapsed assignment time and any real deadline | Allows factual reporting against the four-hour limit. Never invent timing or reset the clock. | No; omit an unsupported compliance claim. |

No other product decision needs the owner's attention. D1/D2/D4 remain accepted. Recording time belongs to the applicant; agent finalization after a playable URL arrives is estimated at **15–25 minutes**.

## Exact remaining sequence

### 1. Verify the real recording — 3–5 minutes

Measure the actual duration; require <=120 seconds. Listen to the whole file and check that it is the applicant speaking naturally, intelligibly, without reading a script. The response should acknowledge the failed restart/closure history and unanswered follow-up, recognize the refund request, explain the honest remedy path without guaranteeing an exception, preserve the warehouse-confirmation payment gate, and give the next-update commitment.

Keep the scenario date October 5, 2026. The approved written reply commits to an update by the end of Tuesday, October 6. Use SUBMISSION.md's prompts while preparing; do not manufacture a recording or mark a missing one complete.

Open the eventual recording URL in a private window and play it. A page that loads but requests login, permission or payment is not accessible playback. A private local file alone is not a submission link. Verify the chosen sharing scope before publishing any supplied file.

### 2. Finalize the canonical document — 3–5 minutes

Preserve the four approved written bodies exactly. Under the existing heading `## Voice response to Maya (two minutes or less)`, replace the **entire section body** with a concise recording label and the verified HTTPS URL. Remove both the placeholder and the talking-point instructions; the renderer includes this section verbatim.

Remove the top-level draft warning/title wording and the final editorial submission checklist once content/access checks are complete. Keep the fictional-scenario context. Use `https://github.com/Raghuboi/VCycene-mini-project` as the tool link; the verified application is on main. Do not add recipients, resume details or timing claims from assumptions.

### 3. Generate and inspect the final PDF — 5–8 minutes

Use the corrected helper included with this bundle:

```bash
uv run --with reportlab python scripts/build-submission-pdf.py --final
```

Expected output: `output/pdf/VCycene-submission.pdf`. Final mode now labels the document **Application submission**; review mode retains **Application review copy**. Windows with Arial and Linux with DejaVu Sans are supported by the existing font lookup. Use the already working environment; do not turn this into a tooling setup project.

The helper refuses the current missing-audio placeholder or absence of an HTTPS URL. That guard was executed against the actual draft and created no final PDF. It does not verify the speaker, duration, content or access: those need the real observations above. No fabricated URL was used to simulate completion.

Render every final page and inspect for clipped text, overlaps, bad page breaks, unexpected extra pages or unreadable links. Compare the four written sections with canonical source, recount their words, and inspect actual PDF hyperlink targets. Require no `DRAFT`, `Recording pending`, `APPLICANT ACTION REQUIRED`, `Talking points only`, or `Application review copy` residue in the final PDF. The final render remains unperformed until real audio is available.

### 4. Verify and hand over — 4–7 minutes

Open every final PDF link in a private browser window; play the actual recording again from its PDF link. Retain the PDF filename/hash, source revision, duration, word counts and observed link results in #5. Close #5 and #1 only after this complete accessible attachment exists. Record readiness separately from whether the application was actually sent.

The applicant reviews and submits via the rubric's applicable channel. No customer/team messages or application have been sent by this bundle. Sending, publishing a supplied recording, and merging this finalization change remain actions for explicit authorization; the already verified main app is available independently.

## Finish rule

No additional features, new skill installation, unit tests, mocks, CI or broad review cycle. This bundle changes finalization instructions and one PDF subtitle, not application behavior. If audio is missing, stop at this complete reviewable packet and state that single content blocker. If audio is supplied, finish the document and checks rather than producing another plan.
