# VCycene Monday queue

A browser support queue for the twelve supplied LILA tickets. The exercise takes place on Monday, October 5, 2026. The app explains which cases need attention, saves status changes and internal notes, and links related customer and firmware cases.

## Run the queue

Use Node 24 and npm. Clone the default branch and start Vite:

```bash
git clone https://github.com/Raghuboi/VCycene-mini-project.git
cd VCycene-mini-project
npm ci
npm run dev
```

Open the local URL printed by Vite, normally http://localhost:5173. Use that same origin for later visits. Opening `index.html` directly is not supported.

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
2. Open T-101 and its related T-109. Both records remain visible. The firmware group distinguishes three customers from unrelated symptoms.
3. Change a status, add an internal note, and select **Save update**.
4. Refresh. The saved status and note remain; the original CSV fields do not change.

**Resolved** requires a new note. Reopening a case preserves its history. Status changes record an operator's judgment; the app does not send customer messages, file claims, ship units, or pay refunds.

## Saved data and supported scope

Edits stay in one browser profile and origin under the `vcycene.queue.edits` localStorage key. The supported workflow has one active editing tab. A copied URL shares the selected ticket and filter, not another browser's notes.

Saving validates the current data and checks the ticket revision before one storage write. A failed save retains the draft and shows an error. Unsaved navigation asks for confirmation; drafts are not autosaved.

Unreadable data is retained. Recovery offers a raw backup download and a separate confirmed reset of this app's key. Before reset, the browser also preserves a uniquely named local backup. If that backup cannot be written, reset stops. Unrelated storage is not cleared.

## Verification

The [browser acceptance record](docs/evidence/browser-acceptance.md) covers all twelve cases, save and refresh, URL history, related cases, dirty drafts, resolution notes, quota failure, stale edits, recovery, offline saves, and 1440/1024/390px layouts. It identifies the Windows Chrome source revisions. [Issue #1](https://github.com/Raghuboi/VCycene-mini-project/issues/1) records the historical `c56a9c9` merged-main run and the later PR #11 main readback; [the closeout record](docs/evidence/closeout-2026-11-13.md#focused-live-browser-readback) covers the invalid-history fix.

The [November 13 audit](docs/evidence/closeout-2026-11-13.md) records the focused Windows Chrome history check, source, documentation, shell, and PDF checks. None is a macOS or Safari execution result. There is no unit/mock suite or remote CI workflow.

## Submission and project reference

[SUBMISSION.md](SUBMISSION.md) is the single source for the build notes and customer/team writing. The applicant's own recording and final PDF access checks remain open. The committed PDF is explicitly a review draft.

| Read this | For |
|---|---|
| [Original rubric](rubric.md) and [tickets](tickets.csv) | Assignment requirements and source facts |
| [Rubric audit](docs/rubric-audit.md) | Requirement-by-requirement evidence |
| [Current completion](docs/completion.md) | Remaining actions and GitHub status |
| [Owner guide](docs/owner-runbook.md) | Windows/iPhone audio recording and tool walkthrough |
| [Agent handoff](docs/codex-handoff.md) | Finish the recording-dependent attachment |
| [Product specification](docs/plan.md) and [state contract](docs/state-and-verification.md) | Policy, architecture, and saved-state behavior |

The app uses React, Vite, TypeScript, TanStack Router and Query, Zod, Papa Parse, and shadcn-style controls. No backend or runtime model is required.
