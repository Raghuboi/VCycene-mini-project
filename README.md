# VCycene Monday queue

A support queue for the twelve supplied LILA tickets, dated **Monday, 5 October 2026**. It loads the
bundled CSV, orders the queue by deadline pressure and unanswered commitments with a written reason per
ticket, and lets a support person change a status and append an internal note that survives a refresh.

Related cases are the extra feature: Maya's two records stay linked, and the three-customer firmware
candidate group is shown with its exclusions explained.

## Run it

Use Node 24 and npm. The implementation was built on Node 24.11.1/npm 11.6.2 on Windows; an independent clean install and build also passed on Node 24.22.1/npm 11.9.0 on Linux.

The application is in PR #8 and has not yet been merged into `main`. Check out the implementation branch explicitly:

```bash
git clone --branch feat/monday-queue-accepted --single-branch https://github.com/Raghuboi/VCycene-mini-project.git
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

See [the completion record](docs/completion.md) for the reviewed source, independent checks, remaining browser checks after corrections, and submission blockers. The browser results below were reported by the implementing agent at `6f0101a`; later corrections need their affected paths rerun before they inherit that evidence.

- `npm run build` passed (TypeScript check and Vite production bundle). The built HTML and JS returned HTTP
  200 through Vite preview.
- A fresh headless Chrome session opened the app at `http://127.0.0.1:5173/`. All twelve unique IDs loaded
  without an initialization write. Tom's claim deadline, Maya's links, Grace's warehouse hold, and Oliver's
  purchase-only context were inspected. Status and note saving survived refresh with source fields unchanged.
- Browser checks also exercised no-op and resolution-note validation, selected-ticket URL history, dirty
  navigation cancellation/acceptance, active/resolved views and reopening, conflict reload, an offline local
  save, corrupt-data backup and scoped reset, and a real quota-exceeded write failure. In that failure the
  draft remained and no saved claim appeared. A 390px viewport had no document overflow and renders each
  ticket as a complete card.
- These checks used isolated browser contexts and example internal notes only. They do not imply that any
  support action happened. There are no unit suites or remote CI jobs. Browser-controlled unload prompts,
  actual applicant recording, public hosting, and the complete submission link remain separate checks.
