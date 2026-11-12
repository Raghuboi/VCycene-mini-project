# VCycene Monday queue

A support queue for the twelve supplied LILA tickets, dated **Monday, 5 October 2026**. It loads the
bundled CSV, orders the queue by deadline pressure and unanswered commitments with a written reason per
ticket, and lets a support person change a status and append an internal note that survives a refresh.

Related cases are the extra feature: Maya's two records stay linked, and the three-customer firmware
candidate group is shown with its exclusions explained.

## Run it

Use Node 24 and npm. The implementation was built on Node 24.11.1/npm 11.6.2 on Windows; an independent clean install and build also passed on Node 24.22.1/npm 11.9.0 on Linux.

The verified application is on `main`. A default clone now contains it:

```bash
git clone https://github.com/Raghuboi/VCycene-mini-project.git
cd VCycene-mini-project
npm ci
npm run dev        # http://localhost:5173
```

Other verified commands:

```bash
npm run typecheck  # tsc --noEmit, no errors
npm run build      # type check + production build into dist/
npm run preview    # serves dist/ on http://localhost:4173
```

Open the served origin, not `index.html` on disk: storage is scoped per origin.

## What it does

- Loads all twelve tickets from `src/data/tickets.csv`, a byte-identical copy of the repository
  `tickets.csv`. Every source field is kept, including the original note and last-reply metadata.
- Shows the queue with a priority band, the calculated deadline facts, and the reason a ticket sits where
  it does. Deadlines use calendar dates, the fixed 5 October 2026 scenario date, a 30-day refund window,
  a 14-day carrier claim window, and one business day for a customer reply (Monday–Friday, no holidays).
- Records a status and an appended internal note. A status is the operator's position, not a completed
  action: nothing here sends a reply, files a claim, confirms a warehouse receipt, ships a unit, or pays a
  refund.
- Filters All / Active / Resolved and keeps the selected ticket open when the filter changes. Selection and
  the view live in the URL (`?ticket=T-104&view=active`), so copied links and Back/Forward work. Invalid
  links explain the problem and offer a return to the queue.

## Saved data

One versioned document in `localStorage` under `vcycene.queue.edits`, holding only operator edits:
`{ version: 1, tickets: { "T-101": { status, revision, notes: [{ createdAt, text }] } } }`.

- A missing key means no edits. Loading never writes, so a fresh browser starts from the original twelve
  tickets.
- A save reads and validates the stored document, checks the ticket revision, then writes once with
  `setItem`. That successful return is the commit point; there is no optimistic update and no
  write-then-read-back loop.
- Unreadable, unsupported, or unvalidated data is reported instead of replaced. The screen offers a backup
  download of the raw value, then a separate confirmed reset of this app's key only. Before removal the
  browser also writes a uniquely named `vcycene.queue.edits.backup.*` copy. If quota or access prevents
  that copy, reset refuses to delete the active value. Unrelated origin storage is not cleared.
- Saving `Resolved` requires a new note. Reopening keeps every note. An internal note never changes
  `LAST_REPLY_FROM` or `LAST_REPLY_DATE`.
- Leaving a ticket with an unsaved status or note asks for confirmation, and a refresh or tab close warns
  while a draft is dirty. Browsers control that native prompt; drafts are not autosaved.
- Storage is per browser profile and origin. Private-session storage may disappear with the session, and
  two tabs are not a supported shared-editing setup (a stale revision is detected, not merged).

## Implementation shape

React 19, Vite 7, TypeScript, Tailwind CSS v4 with shadcn-style components, TanStack Router, TanStack
Query, Zod 4, and Papa Parse for the CSV.

- Router owns the selected ticket and the list view; the search schema is Zod and strict.
- Query owns one loaded snapshot (`["queue-snapshot"]`) and the save/reload lifecycle, with
  `networkMode: "always"` and no retries, so local saves work offline and failures are deterministic.
- Native form controls own the draft; the form is read through `FormData` on submit and validated again
  at the storage boundary. The form is keyed by ticket and committed revision, so a successful save alone
  resets it.
- Priorities, deadlines, and related cases are pure functions over the source facts and the saved edits.
  There is no first-party `useState`/`useEffect`; the only ref inspects the native form for the dirty
  check.
- Source import, policy, storage, and the merged snapshot stay in separate small modules under `src/lib`.

## Verification status

A fresh default-branch clone at merge commit `89d61f8` ran `npm ci` (103 packages), passed `npm run build`, opened all twelve IDs in Chrome, and saved a note through refresh. The [browser acceptance record](docs/evidence/browser-acceptance.md) names the implementing agent's Chrome 157 journeys and source revision: twelve tickets, save/refresh with source facts intact, URL/history/filters, related cases, dirty navigation, resolution-note validation, conflict/recovery, offline save, a genuine quota failure, and desktop/390px layout. It also records the original limits; these are observed local workflows, not external support actions.

A fresh wrap-up checkout installed 105 packages with `npm ci` in 9 seconds and passed the typecheck/production build. The bundled CSV is byte-identical to the twelve-row source; rubric and original tickets remain unchanged. The committed desktop/mobile captures were inspected.

The subsequent one-line related-case anchor change also passed its focused 390px Chrome navigation/discard check on checkout `837b522a`; [completion.md](docs/completion.md) and the browser record include exact results and screenshots. Application code is frozen pending only a concrete regression.

The applicant recording and complete final PDF/access checks remain pending. The review PDF is a draft. There are no unit suites, mocks, or remote CI jobs. Repository startup is the rubric-permitted delivery; no live hosted app is claimed.
