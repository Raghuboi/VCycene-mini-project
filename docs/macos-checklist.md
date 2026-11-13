# MacBook acceptance

Native macOS and Safari execution has not been performed in this closeout. Source review found and fixed two portability problems: PDF fonts depended on Windows/Linux paths, and README commands contained inline comments that an interactive zsh session can pass as arguments. Lockfile inspection found Darwin arm64/x64 packages and no case-colliding source paths. These checks do not establish a native pass.

Use this short check on the actual Mac. Allow roughly 10–15 minutes if Node 24, npm and the repository are available; this is an estimate, not a completed timing.

## Record the environment

Record macOS version, Apple Silicon or Intel, browser/version, source SHA and the result of:

```bash
node --version
npm --version
git rev-parse HEAD
```

Use the current candidate from [completion](completion.md), or main after the reviewed merge. Do not accidentally check the historical PR #10 branch.

## Run from a fresh clone

Follow the README commands exactly in Terminal, without adding inline comments:

```bash
git clone https://github.com/Raghuboi/VCycene-mini-project.git
cd VCycene-mini-project
npm ci
npm run dev
```

For the unmerged correction, check out `docs/submission-closeout-2026-11-13` before starting the app. Record the tested SHA. Open the localhost address printed by Vite. Keep the same hostname and port throughout; localhost and 127.0.0.1 are different origins with different saved data.

## Observe the real behavior

| Check | Required observation |
|---|---|
| First open in a disposable Safari context | Twelve tickets, Oct 5 scenario, T-104 first, no app edit written before an edit. |
| Save and refresh | T-104 Waiting on customer plus a uniquely labelled demonstration note survives refresh exactly. Original source facts and T-101 remain unchanged. |
| Independent Chrome context | A separate browser/profile starts from source data. Saved edits are browser/origin-local, not shared across browsers. |
| Invalid-history draft protection | Execute the six-step [focused regression](rubric-audit.md#focused-check-for-the-november-13-correction). Cancel retains exact draft/status/storage; accept opens the URL error without a write; valid same-ticket filtering retains the draft. |
| Resolve and reopen | Resolved without a new note refuses and retains the draft. A demonstration resolution note permits the change. Reopening retains notes. |
| Related links and layout | T-101/T-109 selection brings the detail into view. Normal and narrow windows show full reasons, editor and Save feedback. Keyboard focus reaches status, note and Save. |
| Native unload prompt | After interacting with a dirty form, try reload and cancel if prompted. Record actual behavior. Browser-controlled warnings are not autosave or a durability guarantee. |

Use real local storage, never simulated successful saves. Check storage only in the disposable profile. Existing Windows quota/recovery evidence need not be repeated on the Mac unless a real storage problem appears. Do not clear an ordinary browsing profile or unrelated storage.

## Check the PDF

Using the existing authoring environment:

```bash
uv run --with reportlab python scripts/build-submission-pdf.py
open output/pdf/VCycene-submission-draft.pdf
```

Inspect every page in Preview. Both pages should be readable, with a clickable repository link and an unmistakable draft label. The helper now loads Vera fonts from ReportLab itself.

After the real recording exists, follow [the artifact handoff](codex-handoff.md) to produce and inspect the final PDF. Open its exact repository and recording links privately; play the recording completely. Draft generation alone does not establish final access.

## Record the result

Add a short result to the closeout PR: source SHA, macOS/chip, browser versions, commands, checks passed/failed/unrun, and relevant screenshots without private tabs. Fix only a concrete failure and repeat its affected path. Do not report a Safari pass from Linux source review or historical Chrome captures.
