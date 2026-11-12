# Codex handoff

The owner accepted D1, D2 and D4 in [issue #1](https://github.com/Raghuboi/VCycene-mini-project/issues/1#issuecomment-6809142063). This was the implementation handoff; PR #8 and README now contain the built application and browser evidence. D3 remains unanswered. Retain this as historical execution guidance, not a claim that the applicant recording or submission is complete.
Start remaining work from [completion.md](completion.md). Verify the corrected candidate, complete the recording-dependent attachment, and update the existing issues; do not rebuild the application or reopen accepted decisions.

## Task

Build the VCycene Monday queue exercise in this repository using the accepted [build plan](plan.md).
Use the owner's requested extra-high reasoning setting where the execution host supports it; record the actual setting. This does not enlarge scope or the time budget.
The evaluator opens a normal browser application. The input is the supplied twelve-ticket CSV.
Complete the mandatory tool behaviours and one chosen extra, then prepare the required submission document.

Read the rubric and CSV first. Use the plan's policy distinctions and source-based ticket analysis.
The fictional operating date is 5 October 2026. Do not substitute the real current date.

## Before editing

1. Inspect the current branch, HEAD, dirty work, and existing application. Preserve another worker's changes.
2. Read issue #1 and its current decisions. Do not turn draft recommendations into approval.
3. Record the exact start time, prior assignment work, remaining allowance, and stop time.
4. Identify one implementation branch, one preview owner, existing browser tools, and the delivery route.
5. Check applicable project instructions and dependency versions. Skills guide the implementation; owner constraints prevail.

No four-hour clock reset is implied. The rubric says to stop at four hours; our conservative budget includes planning because the source defines no exclusion.
If the remaining allowance cannot be determined, report that specific blocker for a time-compliance claim. Independent review of the plan may continue.
Do not claim an overlong run complied with the cap.

## Work order

- [#2](https://github.com/Raghuboi/VCycene-mini-project/issues/2): make load -> edit -> save -> refresh work first.
- [#3](https://github.com/Raghuboi/VCycene-mini-project/issues/3): explain priorities and implement the accepted related-case feature.
- [#4](https://github.com/Raghuboi/VCycene-mini-project/issues/4): verify the actual browser workflow, review the fixed diff, and make evaluator entry reliable.
- [#5](https://github.com/Raghuboi/VCycene-mini-project/issues/5): finish word-limited writing, record the applicant-owned audio blocker, and assemble the final document.

Writing outlines and delivery-route inspection can proceed without waiting for finished UI.
Final build notes must use an actual observed AI error and actual tool results.

## Implementation contract

Use React/Vite/TypeScript, shadcn layout fragments, TanStack Router/Query, and Zod. Local browser persistence depends on D1. Read [the state and verification contract](state-and-verification.md) before implementing.
Router owns ticket/view parameters; Query owns one loaded snapshot and save lifecycle; native form controls own draft status/note. Derive policy values directly and use CSS for layout. No first-party useState/useEffect for those responsibilities, no shadow state, and no generic store/repository framework.
Use one code-based route, one storage module, one policy owner, and a native two-field form. Validate the actual CSV, URL input, saved document, and save command at their boundaries. Do not add TanStack Form/Table merely because they exist.
Save only explicit commands. Capture the ticket ID/revision; successful storage write is the commit point; publish the canonical snapshot through hook-level mutation success. Use local Query operations offline, prevent duplicate submissions, retain failed drafts, and confirm dirty navigation. Never silently seed over or reset saved edits.
Use the actual CSV and a supported parser. Keep original facts/notes separate from saved operator edits.
Put priority rules and reasons under one owner. Use an explicit status model and save operation.
Do not add a backend, runtime model, credentials, external support integrations, broad import system, or dashboard unless the accepted scope changes.

Never:
- Create, extend, repair, or routinely run unit/mock suites.
- Replace a missing capability with fabricated output.
- Change last-reply metadata because an internal note/status was saved.
- Grant a refund exception, claim warehouse confirmation, invent a shipment, or claim a carrier filing.
- Count Maya twice in the firmware cohort.
- Reject Grace by applying today's age to an already underway timely return.
- Treat Oliver's purchase inquiry as an expiring refund.
- Use an agent-generated voice for the applicant's required recording.
- Add review bots, recursive agent trees, duplicate CI, or another orchestration platform.

Use [the reviewed skills contract](skills-and-review.md) selectively.
Do not run full poteto-mode, implement-spec, Ponytail review, Thermos review, and Impeccable critique as successive pipelines.
One implementation owner and one bounded review are enough for this scope.
Read missing skill dependencies before applying them; if a host feature is unavailable, use available instructions and state the limitation.
Do not spend the task installing a skill ecosystem.

Follow the compact PR sequence in that contract: keep planning PR #6, then one working-queue PR with independently verified milestones. Add a separate submission/delivery PR only when it represents separate changes. User review/merge is not a polling loop: finish independent work and leave an exact handoff if blocked.

## Evidence

Verify the running interface and persisted result. Source inspection or a successful build alone is not completion.
Use the state contract's core acceptance matrix and bounded failure checks. Capture only evidence that establishes a requirement. Do not mark a write-failure path observed unless a real failure was induced; no mocked browser APIs.
Record the candidate SHA, URL or command, actual action, observed result, and material limit.
A read-only reviewer returns separate Spec and Standards reports, each under 400 words.
Repair concrete failures and repeat only the affected verification.

Record a real AI error when it occurs. Do not manufacture one for build notes. Start the required customer/team writing from [the reviewed drafts](submission-drafts.md), then keep claims and word counts current.
Keep current state in the owning issue. Use comments for meaningful decisions, blockers, observations, and handoffs.
Do not duplicate every status report across all issues and documents.

## Stop conditions

Stop when the mandatory tool behaviour, selected extra, verified delivery, and submission materials are complete, or when the time allowance ends.
If the applicant's audio is missing, finish independent work and mark the exact recording/link requirement blocked.
Do not loop while waiting for the applicant, a hosting permission, or a dependency.

At the deadline, save a reviewable candidate and report:
- What works and how to open it.
- The exact revision and checks actually completed.
- Remaining defects or missing deliverables.
- Actual elapsed work and any uncertainty about earlier time.
- The next required human action.

Do not merge automatically, send applications, send the drafted messages, or publish a new external site merely because a skill recommends it.
The next execution instruction should specify the selected hosting route if publishing is desired.
The runnable repository is an explicitly permitted fallback.

