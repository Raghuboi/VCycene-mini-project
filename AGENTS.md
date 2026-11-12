# Project instructions

Read [rubric.md](rubric.md), [tickets.csv](tickets.csv), and the current decisions in [issue #1](https://github.com/Raghuboi/VCycene-mini-project/issues/1).
The specification is [docs/plan.md](docs/plan.md), the state and evidence contract is [docs/state-and-verification.md](docs/state-and-verification.md), and execution instructions are [docs/codex-handoff.md](docs/codex-handoff.md).
The owner accepted D1, D2, and D4 in issue #1 and authorized implementation and completion. PR #8 contains the application. Continue the remaining work in [docs/completion.md](docs/completion.md); do not restart the planning phase. Historical elapsed time and the applicant's recording are still unknown.

## Delivery rules

- Build the ordinary support workflow defined by the rubric. The fictional operating date is 5 October 2026.
- The rubric targets three hours and says to stop at four. Our conservative budget includes planning; record prior work and the actual stop time before execution. Preserve a reviewable checkpoint at the deadline.
- Create no unit tests, mocks, fake successful actions, or redundant CI. Verify the real browser flow and saved state; retain relevant type/build checks.
- Use React, Vite, TypeScript, shadcn layout/components, TanStack Router, TanStack Query, and Zod. Borrow only needed block fragments; remove sample charts, accounts, navigation, and fake copy.
- Router owns selection and view; Query owns the loaded snapshot and save lifecycle; native form controls own drafts; CSS owns layout; pure functions own derived policy. One versioned localStorage edits document is the accepted durable authority.
- Do not author useState/useEffect for those responsibilities. No shadow store, derived-state effects, or state disguised in refs. Any genuinely necessary hook exception needs a concrete reason and observed behavior; third-party internals are not a reason to rewrite libraries.
- Keep one status enum and one save owner. Use native library APIs, boundary validation, and the smallest complete implementation.
- Preserve original ticket facts. Notes/status edits never imply a sent reply, warehouse receipt, carrier filing, shipment, or refund.
- Keep current task state and evidence in GitHub. Every completed issue names the observed result and its limits.
- Use one implementation owner and one bounded review of a fixed candidate. No recursive delegation or automatic merge.
- Load only relevant skills, with their dependencies. [docs/skills-and-review.md](docs/skills-and-review.md) records project overrides.
- Keep product wording about support work. Keep internal documentation short and specific.
- The applicant records the natural voice message. Do not substitute generated speech or claim missing audio is complete.
- No application submission or messages to people are authorized by this planning packet.

Use the branch-specific [README](README.md) commands. `npm run build` includes type checking; no unit or mock suite is required. Keep reported prior browser evidence distinct from checks executed against new application changes.

