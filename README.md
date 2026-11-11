# VCycene Monday queue

A support queue for the twelve supplied LILA tickets, dated **Monday, 5 October 2026**. It loads the
bundled CSV, orders the queue by deadline pressure and unanswered commitments with a written reason per
ticket, and lets a support person change a status and append an internal note that survives a refresh.

Related cases are the extra feature: Maya's two records stay linked, and the three-customer firmware
candidate group is shown with its exclusions explained.

## Run it

Node 20.19+ (verified on Node 24.11.1, npm 11.6.2, Windows 11).

```bash
npm install
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
  download of the raw value, then a separate confirmed reset of this app's key only. Nothing else in the
  origin's storage is touched.
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

Run and observed by the implementer:

- `npm run typecheck` — no errors.
- `npm run build` — production build succeeded.
- `npm run preview` with `curl` — `/` returned 200 with the built HTML, and the hashed JS asset returned
  200.
- A one-off Node probe in an untracked scratch directory exercised the domain modules (CSV parse, status
  mapping, priority order, deadline arithmetic, related groups and exclusions, save/no-op/resolve/conflict
  behaviour, corrupt and unsupported storage, a stubbed write failure, key-scoped reset, URL schema):
  24 of 24 checks passed. It is not committed and is not a test suite.

Not done by the implementer: real-browser acceptance (clicking through save and refresh, URL errors, the
discard prompt, narrow viewport, storage failure inside the browser) and any deployment. No unit tests,
mocks, or CI exist by project instruction. Browser verification is left to the reviewer against this
commit.
