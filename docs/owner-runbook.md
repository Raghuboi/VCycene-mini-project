# Owner walkthrough and recording guide

The [original rubric](../rubric.md) asks for your own natural recording, not a script read aloud. The rehearsal text below helps you prepare. Close it before the final take and use the short cue card. Your approved written reply remains in [SUBMISSION.md](../SUBMISSION.md).

## Before the final wave

1. Record actual assignment time already spent, including planning and earlier work. Note the real deadline. The original limit is four hours; a new audit does not restart it.
2. Confirm the application route: LinkedIn/Indeed listing, or the person who shared the original post. This selects the delivery channel, not the app architecture.
3. Prepare a quiet recording environment. Record in your own voice. Provide the resulting file or a playable link with the intended evaluator access.
4. Give the executing agent [codex-handoff.md](codex-handoff.md). The agent handles the browser wave, corrections, final PDF and evidence. Review the final PR and attachment when ready.

## Rehearse the call to Maya

Read this as an example once or twice, then explain the same points in your own words:

> Hi Maya. I'm sorry we closed your earlier tickets with restart advice and then left your refund follow-up unanswered. You should not have had to keep chasing us.
>
> I understand that you want a full refund. Your August 25 delivery is outside the standard 30-day window, but I want to review when you first raised the refund request before deciding what applies. If an exception is needed, I'll ask my manager. I can't promise approval. Warranty repair or replacement is still available.
>
> I'll also ask our firmware engineer to investigate why the cycle stops after the update.
>
> I'll update you by the end of Tuesday, October 6, even if I'm still waiting for an answer. If a refund is approved, payment follows warehouse confirmation that the returned unit has arrived.

The dates are part of the fictional October 5 scenario. Do not substitute today's date. Do not promise a refund, firmware fix, shipment or payout date that the supplied facts do not support.

## Use this cue card for the actual recording

| Beat | Say in your own words |
|---|---|
| Own the failure | Restart advice, earlier closures, unanswered follow-up, and the effort Maya spent chasing support. |
| Address the request | She wants a refund. Check earlier request dates; manager exception only if needed; no approval guarantee; warranty alternative. |
| Give the next action | Ask engineering about the interrupted cycle. Do not claim a confirmed diagnosis. |
| Commit to the update | End of Tuesday, October 6, even if waiting. Any approved refund is paid after warehouse confirmation. |

Aim for a comfortable take around 75–100 seconds, leaving room for pauses. The actual measured duration must be <=120 seconds. Listen once from start to finish. Check that your voice is clear, the answer sounds conversational, and you did not miss the next update. The rehearsal estimate is not proof of recording length.

## Follow this five-minute tool walkthrough

Use a fresh disposable browser profile. These are demonstration steps; they do not perform support actions.

1. Open the queue. Say: "These are the twelve supplied tickets for Monday, October 5. The original source fields remain visible."
2. Open T-104. Say: "Tom comes first because the carrier claim window is nearly closed. The app explains the deadline and next action. It does not claim the carrier filing happened."
3. Open T-101 and its related T-109. Say: "These are Maya's linked records. The older unanswered follow-up remains an obligation. I would check earlier request dates before assuming a refund needs an exception."
4. Show the candidate firmware group. Say: "Maya, Priya and Daniel have related cycle symptoms on 2.4.1. That is a reason to involve Wei, not a confirmed diagnosis. The Wi-Fi and 2.4.0 amber-light cases are excluded."
5. Open T-105. Say: "Tracking reports arrival, but a refund still needs warehouse confirmation."
6. On T-101, select Waiting on engineering and add `Walkthrough only: engineering guidance is pending; no customer message has been sent.` Save and refresh. Confirm the exact edit remains while the source fields are unchanged.
7. Explain the AI correction from your build notes: a real narrow-screen screenshot exposed clipped priority reasons; the layout was corrected and checked. Do not claim you personally ran a tool you did not operate. Explain how you directed and reviewed the work.

The interview may include a small live change. Know that policy reasons live in `src/lib/policy.ts`, save behavior in `src/lib/queue.ts`, and UI components in `src/components`. Practise locating a label/reason and checking its visible result on a disposable branch. Do not add a new feature to the submission for rehearsal.

## Hand over the remaining inputs

Provide the recording file or playable URL, application route, and actual time/deadline information. The agent replaces the entire voice-section body, keeps your four approved written sections, and produces the final PDF. A raw local file alone does not satisfy the recording-link requirement.

When reviewing the final package, open the PDF's actual repo and audio links in a private window. Play the recording. Check the file has no draft/recording-pending/talking-point text. Confirm the app's startup steps still target main. Then review the final PR and authorize the appropriate merge/submission action when ready. After you submit, record the channel and confirmation so R13 and the final tracking issue can close.

The current review PDF must not be submitted as the complete assignment. Your ready-to-submit PDF will be `output/pdf/VCycene-submission.pdf` after the real recording and final checks exist.
