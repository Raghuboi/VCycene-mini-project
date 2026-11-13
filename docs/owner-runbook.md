# Recording and owner walkthrough

The [original rubric](../rubric.md) requires your own natural voice response to Maya, no more than two minutes. Prepare with the example below, then close it and speak from the cue card. [SUBMISSION.md](../SUBMISSION.md) remains the approved written source.

## Record on your phone

1. Choose a quiet room. Rehearse once, then put the paragraph away. Record a short microphone check and listen to it.
2. On iPhone, open Voice Memos, start recording, speak naturally, then stop and save. Rename the take `VCycene-Maya-Raghunath`.
3. Listen to the entire take and check its actual duration. Aim for 75–100 seconds; the hard maximum is 120 seconds. Remove a long accidental silence or record another take if needed.
4. Select the recording, open More, then Share and Save to Files. Upload that actual audio file to your intended Google Drive account.
5. For this audio file, set General access to Anyone with the link and the role to Viewer. Copy the HTTPS link.
6. Open that exact link in a private browser window and play it from start to finish. A request-access page or an owner-only preview is not sufficient.

Apple documents [recording](https://support.apple.com/en-gb/guide/iphone/iph4d2a39a3b/ios) and [export to Files](https://support.apple.com/en-ca/guide/iphone/iph831c37815/ios). Google documents [link access and Viewer permissions](https://support.google.com/drive/answer/7166529?hl=en). Button placement can vary by OS version. The rubric accepts audio only; no camera, screen recording, Loom account, editing package, or background music is necessary.

## Rehearsal example

Read this once or twice, then explain the same points in your own words:

> Hi Maya. I'm sorry we closed your earlier tickets with restart advice and then left your refund follow-up unanswered. You should not have had to keep chasing us.
>
> I understand that you want a full refund. Your August 25 delivery is outside the standard 30-day window, but I want to review when you first raised the refund request before deciding what applies. If an exception is needed, I'll ask my manager. I can't promise approval. Warranty repair or replacement is still available.
>
> I'll also ask our firmware engineer to investigate why the cycle stops after the update.
>
> I'll update you by the end of Tuesday, October 6, even if I'm still waiting for an answer. If a refund is approved, payment follows warehouse confirmation that the returned unit has arrived.

The dates belong to the fictional Monday, October 5 scenario. Keep them even when recording later. Do not promise refund approval, a confirmed firmware diagnosis, shipment, or payout date.

## Cue card for the actual take

| Beat | Say in your own words |
|---|---|
| Own the failure | Restart-only closures, unanswered follow-up, and the effort Maya spent chasing support. |
| Address the request | She wants a refund. Check earlier request dates; manager exception if needed; no approval guarantee; warranty alternative. |
| Give the next action | Ask engineering about the interrupted cycle. |
| Commit to the update | End of Tuesday, October 6, even if waiting. Any approved refund is paid after warehouse confirmation. |

Keep the cue card beside the phone. The final take should sound like a calm call with Maya. A script or an estimated speaking time does not establish compliance.

## Five-minute tool walkthrough

Use a disposable browser profile. Demonstration notes must identify themselves as demonstrations.

1. Open the queue: “These are the twelve supplied tickets for Monday, October 5. The original source facts remain visible.”
2. Open T-104: “Tom comes first because the carrier claim window is nearly closed. The app explains the next action; it does not file the claim.”
3. Open T-101 and related T-109: “These are separate records for Maya with a matching delivery date. The older unanswered request remains an obligation. I would check the earlier request history.”
4. Show related firmware cases: “Maya, Priya and Daniel have related cycle symptoms on 2.4.1. That gives Wei a focused investigation. It is not a confirmed shared defect; the Wi-Fi and 2.4.0 cases are excluded.”
5. Open T-105: “Tracking reports arrival. Payment still needs warehouse confirmation.”
6. On T-104, choose Waiting on customer, add `Walkthrough only: follow-up is pending; no customer message has been sent.`, save, and refresh. Show the exact edit and unchanged source notes.
7. Explain the actual AI correction: a 390px browser screenshot exposed clipped priority reasons; complete narrow cards fixed it. Describe how you directed and reviewed the work without claiming checks you did not personally operate.

For a small live change, locate policy reasons in `src/lib/policy.ts`, persistence in `src/lib/queue.ts` and `src/lib/edits.ts`, navigation validation in `src/lib/search.ts`, and the native editor in `src/components/status-editor.tsx`. Make one requested change on a disposable branch, run the build, and show the affected behavior. Do not add a speculative feature for rehearsal.

## Final owner actions

Supply the real recording or its privately playable link. Follow [the agent handoff](codex-handoff.md) for final PDF assembly and [the MacBook checklist](macos-checklist.md) for native checks. Review the concrete cleanup PR, then authorize the appropriate merge and delivery.

Before sending, open the actual final PDF, play its audio link privately, and confirm its repository link targets working main. The ready-to-send filename will be `output/pdf/VCycene-submission.pdf`. The draft review copy is not the complete assignment.

Use the agreed employer reply thread. Personal correspondence, calendar details, availability, and the submission deadline belong in the private owner handoff, outside this public repository. [Completion](completion.md) owns the current remaining work.
