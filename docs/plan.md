# Support queue specification

The unchanged [original rubric](../rubric.md) and [twelve-ticket CSV](../tickets.csv) are the sources of requirements and facts. [Rubric audit](rubric-audit.md) maps each required deliverable to evidence. [Completion](completion.md) owns current work status. This document preserves the accepted product and policy decisions.

## Accepted scope

The evaluator opens an ordinary browser queue. The twelve supplied tickets are already loaded. An operator reads priorities and reasons, opens a ticket, changes status or appends an internal note, saves, and refreshes. Related cases are the useful extra. Coding agents help build the tool; no runtime model, harness, account, backend or external support integration is required.

The scenario is Monday, October 5, 2026. Completing the exercise means delivering the tool and requested communications. It does not require closing all support cases.

| Decision | Accepted contract |
|---|---|
| D1 | One browser profile and origin, one active editing tab. One localStorage edits document stores statuses and appended notes. URLs share selection, not edits. |
| D2 | Related cases link Maya's two records and identify three distinct candidate firmware cases. Preserve all source rows. |
| D4 | Require a new note when entering Resolved; confirm before discarding unsaved changes. Drafts are not autosaved. |
| Stack | React, Vite, TypeScript, shadcn/native controls, TanStack Router and Query, Zod, and a CSV parser. |
| State owners | Router owns selection/view; Query owns loaded snapshot/save lifecycle; native form controls own drafts; pure functions derive policy; CSS owns layout. |
| Verification | No unit tests or mocks. Use the real interface, screenshots, refresh and independent storage readback. Type/build checks supplement that evidence. |

D1/D2/D4 were accepted in [issue #1](https://github.com/Raghuboi/VCycene-mini-project/issues/1#issuecomment-6809142063). D3 is factual information still needed for time/submission reporting: actual prior elapsed work, deadline and application route. The personal recording is a separate required deliverable. These open facts do not reopen accepted architecture.

## Operator and data contract

The first screen is the queue. Every row identifies the ticket/customer, issue, reason, reply timing and status. Selection opens the full source record and related cases. The source note and last-reply fields never change when an internal update is saved.

The source CSV is immutable. The browser stores only edits in `vcycene.queue.edits`. A successful write is the commit point. Invalid data or failed writes preserve the draft and show failure. Recovery backs up raw data and removes only the app key after explicit confirmation and a stale-value check. See [state ownership and transitions](state-and-verification.md) for the full contract.

A status records the operator's position. It does not send a message, file a claim, confirm receipt, ship a replacement or pay a refund. Resolved requires a human-recorded outcome and can be reopened without deleting note history.

## Policy assumptions and ticket analysis

Use calendar dates, not local timestamp conversion, for deliveries and deadlines.
For the implemented calculation, delivery is day zero and a policy boundary is delivery date plus the stated number of days.
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

This is the reviewed attention order for the supplied snapshot. The rubric does not prescribe a unique total ordering.
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

## Communication and delivery authorities

[SUBMISSION.md](../SUBMISSION.md) is the sole source for the approved build notes, Maya reply, Wei message and manager update. The retired `docs/submission-drafts.md` contained an older Wei variant; its history remains in Git.

The [owner runbook](owner-runbook.md) covers rehearsal, natural recording and the evaluator walkthrough. The [agent handoff](codex-handoff.md) covers the final browser wave, artifact verification and GitHub consolidation. Only the complete document/PDF and its required links go to the evaluator.

The default repository on main is the selected delivery route. Live hosting is optional under the rubric. The original three-hour plan and four-hour hard stop still apply to actual assignment work; a new audit is not a new clock.
