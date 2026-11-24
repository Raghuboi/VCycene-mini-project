# LILA Support Queue

A browser support queue for twelve fictional LILA tickets at a fixed October 5, 2026 snapshot. The app explains which cases need attention, saves status changes and internal notes, and links related customer and firmware cases.

## Run the queue

Use Node.js 24 with npm. To run the queue from Windows PowerShell:

```powershell
git clone https://github.com/Raghuboi/VCycene-mini-project.git
cd VCycene-mini-project
npm.cmd ci
npm.cmd run dev
```

In other shells, use `npm ci` and `npm run dev` instead. If you already have the repository, update `main` before starting. Open the local URL Vite prints. Return to the same scheme, host, and port to see saved edits. Opening `index.html` directly is not supported.

To check types and create the production build:

```bash
npm run build
```

To serve that build:

```bash
npm run preview
```

The preview normally uses http://localhost:4173. Its saved edits are separate from the development origin. The [MacBook checklist](docs/macos-checklist.md) describes a native Terminal/Safari/Chrome/PDF check that has not yet been run; source review and Windows Chrome evidence do not establish a Mac pass.

## Try the required workflow

1. Open T-104. Tom's unfiled damage claim comes first because its window is nearly closed.
   Use All tickets, Active, or Resolved to filter and Priority, Customer reply deadline, or Newest opened to sort. Priority combines reviewed judgments for this sample with calculated deadlines; it is not a general-purpose classifier.
2. Open T-101 and follow its Related cases link to T-109. Both records remain visible. Related cases also flags a possible firmware pattern without treating it as a diagnosis.
3. Change a status, add an internal note, and select **Save update**.
4. Refresh. The saved status and note are still in the update panel; the original CSV fields do not change.

**Resolved** requires a new note. Reopening a case preserves its history. Status changes record an operator's judgment; the app does not send customer messages, file claims, ship units, or pay refunds.

T-104 also has two email draft links. See [recipient and mail handler setup](docs/t104-email-compose.md). Nothing is sent by the queue.

## Saved data and supported scope

Edits stay in one browser profile and origin under the `vcycene.queue.edits` localStorage key. This is not a shared team database. The supported workflow has one active editing tab. A copied URL shares the selected ticket, filter and sort, not another browser's notes.

Saving validates the current data and checks the ticket revision before one storage write. A failed save retains the draft and shows an error. Unsaved navigation asks for confirmation; drafts are not autosaved.

Unreadable data is retained. Recovery offers a raw backup download and a separate confirmed reset of this app's key. Before reset, the browser also preserves a uniquely named local backup. If that backup cannot be written, reset stops. Unrelated storage is not cleared.

## Verification

On November 24, 2026, the [polished app revision `bdf9357`](https://github.com/Raghuboi/VCycene-mini-project/commit/bdf93570bfb408c797393bd32548d613e372e77b) passed a production build and Windows Chrome checks for the exact ticket order, reply-deadline sorting, related navigation without storage writes, resolution-note validation, and exact status/note persistence after reload. No uncaught page errors were observed. The submission and documentation reconciliation does not change that runtime.

The [browser acceptance record](docs/evidence/browser-acceptance.md) covers all twelve cases, save and refresh, URL history, related cases, dirty drafts, resolution notes, quota failure, stale edits, recovery, offline saves, and 1440/1024/390px layouts. It identifies the Windows Chrome source revisions. [Issue #1](https://github.com/Raghuboi/VCycene-mini-project/issues/1) records the historical `c56a9c9` merged-main run and the later PR #11 main readback; [the closeout record](docs/evidence/closeout-2026-11-13.md#focused-live-browser-readback) covers the invalid-history fix.

The [November 13 audit](docs/evidence/closeout-2026-11-13.md) records the focused Windows Chrome history check, source, documentation, shell, and PDF checks. None is a macOS or Safari execution result. There is no unit/mock suite or remote CI workflow.

## Submission and project reference

The final PDF and voice recording were delivered and acknowledged. The [final submission source](SUBMISSION.md) contains the build notes and customer/team writing. The [final PDF](output/pdf/VCycene-submission.pdf) includes the recording link. The older review PDF is retained as a historical artifact.

| Read this | For |
|---|---|
| [Original rubric](rubric.md) and [tickets](tickets.csv) | Assignment requirements and source facts |
| [Rubric audit](docs/rubric-audit.md) | Requirement-by-requirement evidence |
| [Original completion record](docs/completion.md) and [owner guide](docs/owner-runbook.md) | Historical submission preparation and tool walkthrough |
| [Product specification](docs/plan.md) and [state contract](docs/state-and-verification.md) | Policy, architecture, and saved-state behavior |

The app uses React, Vite, TypeScript, TanStack Router and Query, Zod, Papa Parse, and shadcn-style controls. No backend or runtime model is required.
