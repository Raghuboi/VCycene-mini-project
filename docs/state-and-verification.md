# State ownership and verification

## Authority and scope

The rubric requires twelve loaded tickets, explained priorities, editable status and notes that survive refresh, and one useful additional feature. It does not require a backend, agent runtime, shared editing, autosaved drafts, or external support actions. The user requires React/Vite, shadcn, TanStack Router/Query, a minimal state model, and no unit tests.

The owner accepted D1, D2 and D4 in [issue #1](https://github.com/Raghuboi/VCycene-mini-project/issues/1#issuecomment-6809142063). The application implements this contract with TypeScript, Zod v4, one code-based Router route, the bundled CSV, shadcn-style native form primitives and related cases. Historical elapsed work remains unknown. This document defines the contract. [Completion](completion.md) records current delivery status; [browser acceptance](evidence/browser-acceptance.md) binds observed journeys to their source revision.

## One owner for each state

| State | Owner | Contract |
|---|---|---|
| Original ticket facts | Validated bundled CSV | Immutable, including original notes and reply metadata. |
| Saved statuses and appended notes | One versioned localStorage edits document | Durable authority; store edits only. |
| Published queue snapshot | One Query cache key | Validated CSV plus saved edits; never a second persistence store. |
| Load and save lifecycle | Query query/mutation results | Use existing pending/error/success states, without parallel booleans. |
| Selected ticket and list view | Router search parameters | Selection and filtering are navigable state. |
| Unsaved status and note | Native form controls | Read through FormData on submission; never serialize into the URL. |
| Dirty condition | Comparison of form values with committed defaults | Inspect when navigation is attempted; no separately synchronized flag. |
| Priorities, reasons, related cases | Pure calculations | Derive from source facts, committed edits, and the scenario date. |
| Scenario date | Explicit constant, 2026-10-05 | Independent of the device clock. |
| Responsive layout | CSS | No JavaScript viewport state. |

Do not write first-party useState/useEffect for these concerns. Do not replace them with mutable refs, a global store, or a persisted Query cache. A DOM ref is permitted only to inspect the native form. Dependency internals are not a reason to reproduce their state in application code. Inspect copied shadcn fragments and remove unnecessary sidebar, preference, or viewport behavior.

Keep one small storage module, one domain module, the route, and the components needed to render them. No Repository interface, provider hierarchy, XState, or generalized workflow engine is needed.

## Navigation contract

Search parameters are optional `ticket` and `view=all|active|resolved`; view defaults to all. Initially, no ticket is selected. Validate them with Zod v4 directly in Router. A supplied ticket must match a known source ID. Invalid ticket/view values produce a clear URL error and a Return to queue action; do not silently select another ticket.

Ticket selection adds a history entry so Back/Forward restores it. List filters affect the list only: a selected detail can remain visible after a successful status change moves it outside the current filter. Preserve selection when changing view. No note, customer text, committed status, pending flag, or derived priority belongs in search parameters.

A filter with no matches shows an honest empty-view message and an All tickets link; it is not a load failure. Preserve any selected detail. A CSV parse/schema failure is a load error and must not become an apparently valid empty queue.

Render the detail inline. Both queue-row and related-case links target `#ticket-detail` so the selected detail is visible on stacked layouts. This avoids a second drawer-open state. Use CSS to adapt the same content to a narrow viewport.

## Form and save contract

Use an uncontrolled form with shadcn NativeSelect, Textarea, labels, and a submit button. Its default values are the committed status and an empty new-note field. Capture ticket ID, expected committed revision, selected status, and note together when submitting. Validate the command with Zod at the storage boundary.

Key the editor by ticket ID and its inner form by that ticket’s committed revision. A successful save resets only the intended form. A failed save changes neither key, preserving the draft. On user input, call the mutation’s reset action from the input event handler: an old Saved message must disappear as soon as another edit begins.

Trim the note. If status is unchanged and the trimmed note is empty, perform no write, append no note, and report no new successful save. A status change alone is valid except when transitioning into Resolved, which requires a new brief resolution note. An already-resolved ticket does not need another note merely to remain resolved. Reopen by selecting Open; preserve note history.

While saving, disable form edits and submission and block ticket navigation. Always persist against the captured ticket ID, never a later selection. Put cache publication in the hook-level mutation onSuccess, not a callback attached to one mutate call; the latter can be skipped after unmount.

### Durable write sequence

1. Read and validate the current storage document.
2. Check the command’s ticket revision against the current committed revision.
3. Construct the updated status and appended note together, incrementing that ticket’s revision.
4. Validate the complete edits document and known source-ticket membership; construct the canonical snapshot before any write. Serialize the validated edits.
5. Write it with one setItem call. Successful return is the commit point.
6. Return the canonical queue snapshot; onSuccess publishes it to the single Query key.

Do not optimistically update Query or write from an effect. There is no immediate-readback workflow: a fresh browser load provides independent readback evidence. This avoids introducing a state where a write succeeded but a subsequent verification read failed.

Use networkMode `always` for local queries and mutations and retry `false` for deterministic storage/schema failures. Disable automatic focus/reconnect refetching. No background refresh should remount a dirty form. Query keeps the validated snapshot until a deliberate load, successful mutation, or explicit recovery replaces it.

## Load, failure, and recovery

A missing storage key means empty edits, not an error. Load the original twelve tickets without seeding a write. Validate stored JSON, schema version, ticket IDs, statuses, notes, and revisions before merging anything with the source.

A revision mismatch preserves the draft and reports a conflict; do not overwrite newer committed data. One active editing tab is the supported scope. A revision check detects some stale edits but is not an atomic cross-tab lock. Do not add storage listeners or claim multiuser synchronization.

On conflict, offer Reload saved version. Keep the draft until the operator explicitly confirms discarding it; cancellation leaves it untouched. After confirmation, deliberately reload and validate the persisted snapshot, then reset to that committed revision. A failed reload retains the draft and shows the error. Do not auto-merge or retry the stale append command.

Storage access/write failures must show a useful error, retain the draft, and leave the displayed committed snapshot unchanged. Offer a deliberate retry; never claim a save succeeded merely because the controls changed.

For corrupt or unsupported stored data, retain the raw value and offer Retry. Recovery asks the operator to download the raw value and separately confirm reset; the app also writes a uniquely named browser-local backup before removing the active key. If that backup write fails, reset fails closed and keeps the active value. Never silently reset or clear unrelated origin storage. Before removal, compare the current raw value with the offered backup; refuse reset if it changed, preserving newer data and offering Retry. Publish the original queue only after the reset succeeds. Browser-local backups are not a substitute for the operator's downloaded copy.

## Explicit transitions

| Current condition | Event | Result |
|---|---|---|
| Loading | Storage absent | Original queue; no write. |
| Loading | Valid edits | Merged committed queue. |
| Loading | Corrupt/inaccessible storage | Error; original stored value preserved. |
| Committed ticket | Input | Native draft; stale mutation outcome cleared. |
| Draft | Invalid submission | Validation error; no write; draft retained. |
| Unchanged form | Submit | No-op; no fabricated note or save. |
| Valid draft | Submit | Captured command; pending; editing/navigation blocked. |
| Pending | Successful setItem | Publish canonical snapshot; reset intended form. |
| Pending | Failed write | Existing snapshot and draft retained; error. |
| Pending | Revision mismatch | Conflict; draft retained; offer Reload saved version. |
| Conflict | Confirm reload | Load committed snapshot and reset only on success; cancel/failure retains draft. |
| Dirty form | Navigate | Confirm discard; cancel retains draft. |
| Saved queue | Refresh | Reload and validate persisted edits. |
| Resolved ticket | Save Open | Reopened ticket; all notes retained. |

Editing status never changes source last-reply metadata or proves that a message, refund, carrier claim, or shipment happened. Priority and relationship explanations remain grounded in the supplied facts. Resolved is an operator-recorded outcome, not an integration that performs external work.

## Unsaved navigation

Use Router’s blocker with a native discard confirmation. Its callback inspects the form’s current values and committed defaults through the DOM ref. Block departures while a save is pending; otherwise warn before a navigation that would discard a dirty form. Browser Back/Forward must follow the same rule. Permit a same-editor shortcut only when the destination pathname matches, the complete destination search passes queueSearchSchema, and its selected ticket matches the current editor. A valid list-only filter change can proceed. Matching a raw ticket parameter alone is insufficient: invalid search can replace the route with an error and unmount the draft.

Use the blocker’s conditional before-unload handling for refresh/tab close. Browsers control the warning text and may suppress the prompt in some circumstances; unsaved drafts have no durability guarantee. Do not advertise autosave. The current blocker API is marked experimental: pin the resolved dependency version and verify its behavior in the actual browser.

## Verification and evidence

This document defines state invariants, not current pass/fail status. The [rubric audit](rubric-audit.md) maps requirements and the remaining focused regression. The [browser evidence record](evidence/browser-acceptance.md) preserves executed B1–B7 runs under their full source SHAs.

Use the real interface and inspect the persisted result after refresh. Screenshots establish layout/copy; actual readback establishes durability. No unit tests, mocks, fabricated results or new test-framework files. Record current candidate, browser, actions, expected/observed results and limits. Repair only a concrete failure and recheck its affected path. A planned check is not a pass.

## Primary references

- [Router search validation and Zod v4](https://tanstack.com/router/latest/docs/how-to/validate-search-params); [experimental blocker API](https://tanstack.com/router/latest/docs/api/router/useBlockerHook).
- [Query network modes](https://tanstack.com/query/latest/docs/framework/react/guides/network-mode); [mutation callbacks](https://tanstack.com/query/latest/docs/framework/react/reference/functions/useMutation); [publishing mutation results](https://tanstack.com/query/latest/docs/framework/react/guides/updates-from-mutation-responses).
- [React effects guidance](https://react.dev/learn/you-might-not-need-an-effect); [keyed resets](https://react.dev/learn/preserving-and-resetting-state); [native form behavior](https://react.dev/reference/react-dom/components/form).
- [shadcn NativeSelect](https://ui.shadcn.com/docs/components/base/native-select); [HTML Web Storage contract and concurrency limits](https://html.spec.whatwg.org/multipage/webstorage.html).
