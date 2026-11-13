# Recording and owner walkthrough

The [original rubric](../rubric.md) requires your own natural voice response to Maya, no more than two minutes. Prepare with the example below, then close it and speak from the cue card. [SUBMISSION.md](../SUBMISSION.md) remains the approved written source.

## Record at the end — audio only

The [rubric](../rubric.md#part-2-the-customer-about-30-minutes) asks for your own natural phone-style voice reply, at most 120 seconds, shared as a link. It explicitly accepts audio alone. A video, webcam, screen capture, Loom account, or recording of the tool walkthrough is not required. The walkthrough happens live if you reach the first call.

On this Windows 11 workstation, use **Sound Recorder** (installed) and the NexiGo microphone. The iPhone Voice Memos route below is a fallback if you prefer the phone or cannot get a clear desktop take.

1. In Windows **Settings → System → Sound → Input**, select the actual NexiGo mic rather than a virtual input. Open its properties and use **Start test → Stop test → Play** to hear a short check. If prompted, enable Sound Recorder under **Settings → Privacy & security → Microphone**. [Microsoft's mic test](https://support.microsoft.com/en-us/windows/hardware/drivers/how-to-set-up-and-test-microphones-in-windows) and [Sound Recorder permissions](https://support.microsoft.com/en-us/windows/apps/sound-recorder-app-for-windows-faq).
2. Choose a quiet room. Rehearse the four cues below, then close the example paragraph. In **Sound Recorder**, press **Ctrl+R** to start and **Esc** to stop/save. Aim for 75–100 seconds, comfortably below the hard 120-second limit. Rename the saved take. Right-click it and use **Share**; obtain an actual audio file for upload rather than assuming a particular recordings folder. If your Share menu cannot hand you a file to upload, use the iPhone export route below instead of hunting application-private storage. [Microsoft's recording/sharing steps](https://support.microsoft.com/en-us/windows/apps/sound-recorder-app-for-windows-faq).
3. Alternatively, on iPhone use **Voice Memos → record → stop → More → Share → Save to Files**. Apple says the default export is `.m4a`; upload the actual exported file through the Google Drive app or the web. [Apple's export instructions](https://support.apple.com/guide/iphone/export-a-voice-memos-recording-to-files-iph831c37815/ios); [Google's mobile upload steps](https://support.google.com/drive/answer/2424368).
4. Listen to the complete take and measure the actual file, not the rehearsal estimate. `ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "C:/path/to/recording.m4a"` prints seconds; it is installed on this workstation. Accept only a duration no greater than 120.000 seconds and a clear, natural response that includes the October 6 update.
5. At [drive.google.com](https://drive.google.com/), upload the file, then set **Share → General access → Anyone with the link → Viewer** and copy its HTTPS URL. A work/school account may restrict external access. [Google's sharing instructions](https://support.google.com/drive/answer/2494822).
6. Open the exact copied link in a new signed-out/private browser window and **play it from start to finish**. A request-access page, sign-in wall, or download-only result is not a verified playable link. Google explicitly lists MP3 and WAV among Drive preview formats, but not M4A; that does not prove M4A will fail. If your actual M4A does not play in the private window, use a documented-preview format such as MP3 or WAV and repeat the check. [Google's format list](https://support.google.com/drive/answer/37603).

The link, not just a local file, belongs under the voice heading in [SUBMISSION.md](../SUBMISSION.md). The final PDF must contain that link; click its repository and audio links again from the PDF in a fresh private window. Do not send the draft PDF. The fictional October 5/6 dates stay fixed even if you record on a later real date.

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

Supply the real recording or its privately playable link. The independently verified app correction is merged. Follow [the artifact handoff](codex-handoff.md) for the final PDF, and the optional [MacBook checklist](macos-checklist.md) for native checks. Review the actual final attachment and authorize delivery separately.

Before sending, open the actual final PDF, play its audio link privately, and confirm its repository link targets working main. The ready-to-send filename will be `output/pdf/VCycene-submission.pdf`. The draft review copy is not the complete assignment.

Use the agreed employer reply thread. Personal correspondence, calendar details, availability, and the submission deadline belong in the private owner handoff, outside this public repository. [Completion](completion.md) owns the current remaining work.
