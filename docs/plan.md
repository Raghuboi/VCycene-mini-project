# Monday queue build plan

**Accepted product decisions, updated 11 November 2026.** D1, D2 and D4 were approved in [issue #1](https://github.com/Raghuboi/VCycene-mini-project/issues/1#issuecomment-6809142063). The implemented application and current browser evidence are in [PR #8](https://github.com/Raghuboi/VCycene-mini-project/pull/8) and README. D3's prior elapsed time, hard stop, application route and applicant audio remain unknown; no time-compliance or completed-submission claim is made.
Source baseline: [ace5735ebc65158b3cc8ea86c5a10ad3d0b6fc7c](https://github.com/Raghuboi/VCycene-mini-project/tree/ace5735ebc65158b3cc8ea86c5a10ad3d0b6fc7c).
Read the unchanged [rubric](../rubric.md) and [sample CSV](../tickets.csv). The initial repository has those files and a gitignore, with no starter application.

## Read this first

Build a support queue that an evaluator opens in a browser. The supplied CSV is the input. A person inspects priorities, changes a status, and adds a note. The changes survive refresh.

Claude, Codex, Cursor, and similar tools help build the software. The rubric does not require an agent inside the product, an LLM API, or a harness for resolving customer tickets.

Completing the exercise means delivering the working tool and the requested communications. It does not mean closing every support case. Several outcomes depend on the warehouse, fulfillment, engineering, or a manager.

The scenario remains **Monday, 5 October 2026**, regardless of the evaluator's computer date.

## Settled choices and remaining decisions

The current discussion and answers belong in [the Wayfinder decision map](https://github.com/Raghuboi/VCycene-mini-project/issues/1). It is a lightweight adaptation of Matt Pocock's workflow: one decision index, with separate implementation issues. Update this specification when an answer changes the contract.

The owner selected React, Vite, shadcn/components and blocks, TanStack Router, TanStack Query, and Zod. TypeScript supports the explicit model. No unit tests or mocks. Avoid application-authored useState/useEffect unless a specific necessary exception is justified. The exact state owners and real verification steps are in [state and verification](state-and-verification.md).

| ID | Decision | Alternative and consequence |
|---|---|---|
| D1 — accepted | Single-browser localStorage persistence, one active editing tab. Each evaluator starts with the original sample and sees their own saved edits. | Shared server persistence adds data ownership/deployment questions that the rubric does not require. A URL shares selection, not saved edits. |
| D2 — accepted | Related-case context is the single extra feature. It links Maya's records and explains the candidate firmware group. | Owner/next-action/follow-up tracking is a possible later addition, not a second extra here. |
| D3 | Count actual assignment work, including planning; record remaining minutes and a hard stop. Prefer an existing hosting route, with a runnable repository fallback. | The rubric does not define exempt work categories. A longer learning exercise must be described with its actual duration. The owner must supply prior elapsed time, submission deadline/track, and a recording slot. |
| D4 — accepted | Require a brief new note when entering Resolved. Confirm discarding unsaved edits when leaving a ticket; no automatic draft persistence. | Removing the guard makes closure less explicit; autosaved drafts create a second persistence lifecycle. Neither is required by the rubric. |

The owner also supplies the natural voice recording. No code or skill can replace that requirement.

## Exact submission contract

These are explicit rubric requirements. Proposed implementation choices appear in later sections.

| ID | Requirement | Evidence at completion |
|---|---|---|
| R1 | Load all twelve supplied tickets. | Fresh browser view shows all twelve unique IDs and original source facts. |
| R2 | Show which tickets need attention first and why, using house rules. | Every row has a concrete reason; ticket analysis below is reflected in the UI. |
| R3 | Change status, add a note, and preserve changes through refresh. | Save, reload, reopen, and inspect the exact saved values. |
| R4 | Add one useful unrequested feature. | Related cases, if D2 is accepted, work through the ordinary UI. |
| R5 | Live link if possible; otherwise repository startup under five minutes. | Private-window link check or timed fresh-start instructions. |
| R6 | Build notes, at most 200 words. | Actual tools, one observed AI error and its correction, and the next useful addition. |
| R7 | Maya written reply, at most 150 words. | Honest policy answer, named prior failure, specific acknowledgment/apology, clear next step. |
| R8 | Applicant's own natural recording, at most two minutes. | Playable accessible audio; not synthetic speech or a read script. |
| R9 | Wei message, at most 120 words. | Enough facts and a clear request for an engineer to act. |
| R10 | Manager message, at most 120 words. | Done, blocked and on whom, one decision needed. |
| R11 | One document or PDF containing every item and link. | All entries present, word limits checked, every link opens privately. |
| R12 | Follow-up begins with a tool walkthrough and a small live change. | Applicant can explain the implementation and locate the relevant rule. |

Submit through the application channel specified in the rubric. This planning work does not send an application or contact anyone.

## What the operator does

1. Open the tool. The twelve tickets are already loaded; no upload, pasted prompt, account, or API key is required.
2. Read the priority queue, with the scenario date and a short reason beside each ticket.
3. Open a ticket. Read its source facts, original note, related cases, and recommended next action.
4. Choose a status and add an internal note. Save the update.
5. Refresh and reopen the ticket. The saved values remain.
6. Inspect Maya's other ticket or the candidate firmware cases.

The first screen is the queue, not a marketing page. Use a compact table and a focused detail panel. Essential row fields are ticket/customer, issue, priority reason, reply timing, and status.
Use meaningful text alongside colors. Product labels describe support work, such as "Reply overdue" or "Waiting on warehouse."
Keep development terms, model names, review terminology, internal scores, and implementation provenance out of the operator's normal flow.

## Scope and implementation shape

Reuse the familiar frontend approach from prior projects without importing a larger platform.
Use the selected React/Vite/TypeScript, shadcn, Router, Query, and Zod stack with native browser persistence and a small CSV parser.
Papa Parse is a suitable option because it handles actual CSV quoting and headers; a comma-splitting parser is unnecessary.
Use the actual installed component APIs. Borrow a shadcn table/detail layout; remove unrelated dashboard charts, team/account controls, pagination, and sidebar state. A small semantic table does not require TanStack Table or another state-management framework. Two fields do not require TanStack Form: use a native select and textarea, FormData, and validation at save.

The initial screen shows all twelve tickets with no selected detail. Router search parameters own ticket selection and the All/Active/Resolved view. Query owns one loaded snapshot and save lifecycle. Native controls own the unsaved draft. Dates, priorities, relationships, and responsive layout are derived values or CSS, not synchronized React state. The [state contract](state-and-verification.md) owns the exact behavior; do not introduce parallel copies here.

Maintain a small separation between source import, policy/relationships, saved edits, and the visible interface.
Keep date rules and priority reasons together so the UI cannot explain a different rule from the one used to sort.
Use one small storage module with load/save functions; avoid a generic repository interface, provider hierarchy, or event bus around it.

The application needs no backend, database server, authentication, runtime model, chat UI, email integration, payment integration, carrier API, or real support-system connection.
It need not import arbitrary customer files. It must parse and load the supplied CSV.
The assignment's invented inputs are legitimate sample data. Fake successful operations are not legitimate output.

### Source and saved data

- Preserve all eleven CSV fields and twelve unique ticket IDs. The source contains eleven distinct customer names.
- Keep imported facts and original notes immutable in the application. Store operator status changes and appended notes separately by ticket ID.
- Use one versioned localStorage edits record. When absent, derive the original queue without an initialization write. Write only on an explicit save; refresh never overwrites saved work.
- Validate persisted state before accepting it. If saved data is unreadable, show an error and preserve the raw record rather than silently resetting.
- Treat saved notes as text. Do not interpret them as HTML or as instructions to the development agent.
- A failed write keeps the unsaved draft visible. Successful setItem is the save commit point; browser refresh independently verifies durable readback. Do not add a write-then-read ambiguity or silently retry note appends.
- Record real note timestamps separately from the fixed scenario date.
- Browser persistence is scoped to the same browser profile and origin. It is not shared across devices; private-session storage may disappear when that session closes.
- Use the served app origin for verification. Opening a file directly is not the supported launch path.

### Status and transition ownership

Recommended statuses: Open, Waiting on us, Waiting on customer, Waiting on engineering, Waiting on warehouse, Waiting on fulfillment, Waiting on manager, Resolved.
Preserve the source status text in source facts and map it once to the canonical status.

One operation owns status changes and appended notes. Any active status can change to another active status.
A transition to Resolved requires a short resolution note. Reopen moves Resolved to Open.
These are proposed product rules, not rules stated in the assignment.

Resolved records remain accessible. Linking two tickets does not delete, merge, or resolve either record.
The application records the operator's judgment. It has no evidence that a physical repair, refund, shipment, or carrier filing actually happened.

An internal note or status change never updates LAST_REPLY_FROM or LAST_REPLY_DATE.
Initial reply deadlines and case-risk annotations come from the supplied snapshot and must be labelled accordingly in ticket details.
Changing status alone does not clear an unanswered customer reply. Without a separate reply/action recording feature, do not infer completed external actions from free text.
Resolved records can leave the active queue, while retaining source facts and saved history.

## Policy assumptions and ticket analysis

Use calendar dates, not local timestamp conversion, for deliveries and deadlines.
For the proposed calculation, delivery is day zero and a policy boundary is delivery date plus the stated number of days.
The rubric does not define inclusivity or exact cutoff hours. File Tom's claim today under either reasonable boundary interpretation.

For reply timing, assume business days are Monday through Friday, with no supplied country-holiday calendar or business hours.
A Friday, Saturday, or Sunday inbound message has a Monday due date. A message due Monday is due today, not proven overdue at Monday morning.
Apply this rule to rows whose latest writer is the customer. The two support-last rows need operational follow-up for other reasons.

These are transparent assumptions, not assertions about VCycene's real policies.
The rubric states that all people, tickets, and rules are invented.

| Ticket | Priority and source-based reason | Correct next action and limit |
|---|---|---|
| T-104, Tom | First. Delivered Sep 22, age 13 days. Carrier claim unfiled; modeled day-14 boundary is Oct 6. Customer reply due Sep 25. | Act on claim today and reply. Photos are mentioned in text; actual attachment files are absent. Do not display an invented image or filing confirmation. |
| T-101, Maya | High. Third contact; two restart-only closures; interrupted cycle after update. Standard 30-day boundary was Sep 24; latest message is due Oct 5. | Coordinate with T-109. Check earlier request timing, investigate with Wei, and request manager decision if an exception is needed. No unauthorized refund promise. |
| T-109, Maya | High, same customer/unit concern. Sep 30 follow-up was due Oct 1 and remains unanswered in source data. | Preserve the older unanswered concern. A newer message on T-101 does not erase it. Keep both records. |
| T-110, Hannah | High. Replacement promised Sep 26, nine calendar days before scenario date; still unallocated. Latest reply is from support. | Chase fulfillment for allocation and tracking, then give a truthful update. Do not call this a new inbound-SLA breach or claim shipment. |
| T-105, Grace | High. Returned unit reportedly arrived Sep 26, but warehouse confirmation is absent. Request opened Sep 18, delivery day 17; tracking arrival was day 25. | Obtain warehouse confirmation before refund payment. Today's age of 34 days does not invalidate the already underway timely return. |
| T-108, Andre | Overdue return request. Sep 29 inbound was due Sep 30. Requested on delivery day 19; scenario age is 25; modeled 30-day boundary is Oct 10. | Advance the return-label process promptly. Do not invent a rule that payout or warehouse arrival must occur before Oct 10. Preserve the timely request. |
| T-102, Daniel | Overdue reply, due Oct 2. Firmware 2.4.1, mid-cycle pause and amber light. | Include in candidate cycle-failure cohort. No explicit statement that his problem began after the update. |
| T-112, Sofia | Overdue reply, due Oct 2. Firmware 2.4.0; amber light while unit seems to run normally. | Clarify symptom and get supported guidance. Do not classify this as the same confirmed regression. |
| T-103, Priya | Reply due Oct 5. Firmware 2.4.1, stops after an hour, worked before update. | Include in Wei's candidate cohort and reply today. |
| T-106, Samir | Reply due Oct 5. Firmware 2.4.1, Wi-Fi setup failure. | Help with setup; same version alone is not evidence of the cycle-failure pattern. |
| T-107, Lena | Reply due Oct 5. Wants an onboarding call this week. | Arrange a call; no appointment has been agreed in the source. |
| T-111, Oliver | Reply due Oct 5. Wants another unit. Delivery happens to reach day 30 today. | Give ordering guidance. No refund request exists, so a refund-expiry warning would be misleading. |

This table proposes an attention order. The rubric does not prescribe a unique total ordering.
Tom's deadline, Maya's repeated failure, the broken replacement promise, and the blocked refund deserve conspicuous placement.
Order the rest using relevant overdue replies and the next required action. Every customer still needs an answer within the exercise's policy.

Use explicit classifications and dates, then a stable deterministic tie-breaker.
Human-reviewed annotations for this fixed dataset are acceptable when their reasons are visible. Do not disguise a sorted list of ticket IDs as a general triage engine.
Do not apply refund or carrier deadlines to unrelated issue types.

### Related-case feature

Provide one "Related cases" section with two relationship types:

- Same customer concern: Maya, T-101 and T-109. Explain the matching facts and retain both records.
- Similar symptom requiring investigation: T-101, T-102, T-103. This is three distinct customers on firmware 2.4.1 with interrupted cycles.

Only Maya and Priya explicitly describe onset after an update.
T-109 adds history, not a fourth affected person. T-106 and T-112 are useful counterexamples and are excluded from this cohort.
Call the pattern a candidate issue, not a confirmed regression. Do not generate a diagnosis or recommend rollback without engineering evidence.

Use source-backed links and clear annotations for this twelve-row dataset. It is not a general identity-matching system.

## What would resolve each case?

The app does not perform the real-world actions below. These are operational completion criteria for an operator's judgment, not an instruction to mark the sample cases resolved during the demonstration. Keep unresolved dependencies visible in a waiting status and record the next action in a note.

| Case | Proposed disposition after triage | What must actually happen before calling the concern settled |
|---|---|---|
| Tom, T-104 | Waiting on us | File the supported damage claim promptly, communicate the remedy, and complete the agreed damage resolution. Filing alone is progress, not proof the damaged-unit concern is settled. |
| Maya, T-101/T-109 | Waiting on manager or engineering, according to the current next action | Establish earlier request timing and an authorized remedy, then complete it. A refund requires warehouse confirmation before payment. Keep both tickets; acknowledge the follow-up and close it only when that concern is actually addressed. |
| Grace, T-105 | Waiting on warehouse | Obtain warehouse receipt confirmation and complete the authorized refund. Tracking text alone does not unlock payment. |
| Hannah, T-110 | Waiting on fulfillment | Obtain allocation and a truthful shipment/delivery update, then fulfill the replacement promise. An escalation or invented tracking number is insufficient. |
| Andre, T-108 | Waiting on us, then the actual next party | Provide the return path, receive warehouse confirmation, and complete the policy-eligible refund. Preserve the timely request. |
| Daniel/Priya, T-102/T-103 | Waiting on engineering | Obtain supported diagnosis/guidance and establish that the interrupted-cycle concern has been addressed. A version match alone is not a diagnosis. |
| Samir, T-106 | Waiting on us/customer as appropriate | Give supported setup help and establish that connection works or arrange the next remedy. |
| Lena, T-107 | Waiting on customer/us as appropriate | Agree and communicate an onboarding arrangement; distinguish booking the requested call from completing the call. |
| Oliver, T-111 | Waiting on us | Supply an accurate ordering path and answer the purchase question. The source supplies no ordering URL; do not invent one. |
| Sofia, T-112 | Waiting on us/engineering as appropriate | Clarify the amber indication, provide supported guidance, and address the concern. Normal operation on 2.4.0 is not proof of the candidate 2.4.1 failure. |

These are recommended support judgments, not additional employer mandates. The software allows a human to record a disposition; it cannot independently certify these physical or communication outcomes.

## Communication plan

[Submission drafts](submission-drafts.md) contains complete Maya, Wei, and manager messages, checked word counts, a voice cue card, and the assembly checklist. Those are drafts; no messages have been sent. It also records the public job-posting research and its limits.

### Maya's written response

Keep it within 150 words. Name the actual failure: two tickets closed with restart advice and an unanswered follow-up.
The rubric explicitly wants an apology tied to that failure. Explain that the usual refund window has ended, while earlier contact dates still need checking.
State that warranty repair or replacement remains the normal route and that a manager can decide an exception.
Offer a clear next step and a specific next update controlled by support, without promising an engineering fix or an unapproved refund.
The warehouse-confirmation payout rule still applies if a refund is authorized.

Do not write another generic restart response. Do not tell Maya that her first request was definitely late, because those earlier dates were not supplied.

### Natural recording

Use a cue card, not a script:

1. Recognize the repeated effort and the support failure.
2. Give the honest policy position without sounding dismissive.
3. Say what you will check and whom you will involve.
4. Give the next update commitment.

Aim for roughly 60–90 seconds and verify the actual duration is under two minutes.
Record in the applicant's own voice. Upload or share only the selected final file through an available authorized route.
The final audio link must play without requiring evaluator access to a private account.

### Wei

Keep the message within 120 words.
Name T-101, T-102, and T-103, firmware 2.4.1, and the exact symptom differences.
Distinguish the two explicit post-update reports and exclude Maya's duplicate from the customer count.
Ask whether this is known, what safe guidance or diagnostics support should use, and when Wei can provide an update.
A requested reply time is a request, not a claim that Wei committed to it.
Do not invent logs, serial numbers, a root cause, or safe rollback instructions.

### Manager

Keep the message within 120 words.
Report only completed triage, prepared communications, and verified tool work as done.
Name blockers: Wei for firmware guidance, warehouse for Grace's receipt confirmation, fulfillment for Hannah's allocation/tracking.
The recommended single decision is whether to authorize a goodwill refund exception for Maya if checking her earlier request history does not establish ordinary eligibility.
Keep the receipt-confirmation payout requirement intact.

This is a fictional exercise, but the end-of-day message should not invent claims filed, refunds paid, or shipments made.
If later writing uses assumed actions, label the assumptions in the submission context and use them consistently.

### Build notes and final document

Do not invent the required AI mistake. Record an actual observed mistake and the check that caught it while work happens.
A mistaken refund rule, persistence reset, or incorrect group membership is usable only if it truly occurred.
Explain the correction and actual verification within the 200-word budget.

Use one compact document/PDF with headings for tool, build notes, Maya, recording, Wei, and manager.
Keep implementation planning and GitHub review machinery out of that evaluator-facing document.
Verify word counts, the audio duration, and private-window access before declaring submission-ready.

## Build sequence and time budget

The rubric says to plan about three hours and stop at four; it does not explicitly exempt planning. Our conservative plan counts the whole exercise. Deduct work already spent rather than restarting the clock after this document. Record actual time; do not claim a compliance result without it.
Use one implementation owner. A read-only reviewer may work independently while the applicant records audio.

| Nominal elapsed time | Observable outcome |
|---|---|
| 0–15 minutes | D1–D4 settled, source baseline read, supported startup/deployment route known. |
| 15–75 | First complete browser flow: actual CSV, status/note edit, save, refresh. |
| 75–105 | Explainable priorities, policy-sensitive cases, related-case feature. |
| 105–135 | Actual browser verification, focused review, required fixes, runnable delivery. |
| 135–160 | Build notes, Maya, Wei, and manager written within limits. |
| 160–180 | Applicant recording, document assembly, private-window link checks. |
| 180–240 | Contingency for observed failures or missing required deliverables. Hard stop at 240. |

These are planning estimates, not measured completion times.
At the deadline, stop new work, preserve the candidate, and state missing deliverables honestly.
An unattended run may finish while the applicant sleeps. It must not expand scope or keep running until morning.

Cut optional animations, dashboards, general upload, shared accounts, backend persistence, search infrastructure, and new plugin setup before cutting a required item.
If live deployment becomes a time sink, use the explicitly permitted repository delivery.

## Verification and review queue

No unit tests, mock servers, mocked functionality, or synthetic success records.
Use type checking/build plus one real browser acceptance session:

1. Open a fresh browser context and verify all twelve IDs and the fixed scenario date.
2. Inspect priority reasons, especially Tom, Grace, Maya, and Oliver.
3. Change a status and append a distinct note. Save, reload, reopen, and inspect the same values.
4. Confirm original notes and source reply metadata remain intact.
5. Inspect Maya and the three-customer firmware group, including the exclusions.
6. Check keyboard access and a narrow viewport for the essential actions.
7. Exercise a real storage failure condition if feasible without adding mock infrastructure; otherwise state that limitation.
8. Verify the delivered link/startup instructions and final submission links.

Use [the skills and review contract](skills-and-review.md) for the single fixed-diff Spec/Standards review.
The complete state/error/URL evidence matrix is in [state and verification](state-and-verification.md). It includes unsaved navigation, correct-ticket saving, invalid URLs, offline local saves, and corrupt storage; it does not require unit tests or mock infrastructure.
A review finding names the violated requirement, actual evidence, consequence, and smallest repair.
Do not make style preferences or hypothetical scale demands blockers.

| Work | Current state | Dependency | Done evidence |
|---|---|---|---|
| [#1 Decisions](https://github.com/Raghuboi/VCycene-mini-project/issues/1) | Draft | Owner answers | Decisions recorded without conflicting defaults. |
| [#2 Working flow](https://github.com/Raghuboi/VCycene-mini-project/issues/2) | Draft | D1, D4, and remaining budget | Browser save and refresh proof. |
| [#3 Priority and related cases](https://github.com/Raghuboi/VCycene-mini-project/issues/3) | Draft | #2, D2 | All reasons and group membership inspected. |
| [#4 Verification and delivery](https://github.com/Raghuboi/VCycene-mini-project/issues/4) | Draft | #2 and #3 | Current candidate checked and evaluator entry verified. |
| [#5 Submission](https://github.com/Raghuboi/VCycene-mini-project/issues/5) | Draft | #4 for final link/notes; applicant audio | Complete accessible document and actual recording. |

Issue bodies own current status; this table is the initial plan.
Use Draft -> Ready -> In progress -> Review -> Verified, with Blocked and a wake condition when needed.
Verified engineering work and resolved customer tickets are separate concepts.
A runtime blocker should identify the missing capability, affected outcome, next action, and evidence still absent.

## Sources and handoff

- Assignment: pinned rubric and CSV linked above. Requirements and customer facts come from these files.
- [MDN localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage): persistence and origin/private-session limitations.
- [Papa Parse documentation](https://www.papaparse.com/docs): native CSV parsing.
- [Skills and review contract](skills-and-review.md): reviewed upstream files, pins, dependencies, and project overrides.
- [Codex handoff](codex-handoff.md): bounded execution after the owner settles the plan.

No application execution, hosting, recording, or final submission was performed to create this plan.

