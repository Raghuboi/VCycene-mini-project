# Skills and review contract

## Scope and precedence

This plan targets [VCycene-mini-project at ace5735e](https://github.com/Raghuboi/VCycene-mini-project/tree/ace5735e), whose starting material is the rubric and twelve supplied tickets.
The selected stack is React, Vite, TypeScript, shadcn, TanStack Router/Query, and Zod. LocalStorage and the edit/closure rules remain proposals in issue #1. Use only needed layout fragments and components.
The application has no runtime model dependency. Coding-agent skills guide development; they are not the application's input interface or runtime.
The rubric, explicit project decisions, and acceptance criteria override generic skill defaults.

- The rubric targets roughly three hours and says to stop at four. Conservatively include planning and record actual elapsed work; the source does not enumerate exempt categories.
- Create no unit tests, mocks, fake provider responses, or test-framework infrastructure.
- Verify the real browser workflow, submission document, and persistence after reload. Type checking and a successful build supplement that evidence.
- Keep GitHub issues and the planning documents authoritative. Update decisions in place instead of creating competing plans.
- Use one implementation owner, bounded independent review, and one targeted repair pass. Do not merge automatically.
- Preserve the required behaviour when simplifying. A shorter diff that omits a deliverable is incomplete.

## Reviewed origins

| Package | Pinned source | Use |
|---|---|---|
| Matt Pocock | [mattpocock/skills, 4ae2317](https://github.com/mattpocock/skills/tree/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d) | Grilling, domain modeling, Wayfinder, specification, tickets, and the final review. |
| Pstack, Lauren Tan | [cursor/plugins, 246bc50](https://github.com/cursor/plugins/tree/246bc508c139c5e036dfafea8978d31a7433279f/pstack) | Selected principles, clear writing, and an evidence trail. |
| Ponytail, Dietrich Gebert | [DietrichGebert/ponytail, 96608e0](https://github.com/DietrichGebert/ponytail/tree/96608e078b2d5ea607c5c3b8b5a54d1c1fba6846) | Smallest complete implementation and concrete review criteria. |
| shadcn | [shadcn-ui/ui, 8ab2771](https://github.com/shadcn-ui/ui/blob/8ab27715521cbd4f87ae6886cd989cbb678f6de7/skills/shadcn/SKILL.md) | Optional guidance for the components actually used. |
| Impeccable | [pbakaus/impeccable, f2baa41](https://github.com/pbakaus/impeccable/blob/f2baa414a87d9acf1e21ccf776bfaec0262ad6df/.agents/skills/impeccable/SKILL.md) | Optional, narrow clarification and interaction guidance. |

Pstack's upstream package documents Cursor and Claude Code adapters; no native upstream Codex adapter was confirmed. Reading portable skill instructions does not provide Cursor-specific tools.
The [backnotprop mirror](https://github.com/backnotprop/pstack) documents Codex support and changes from upstream. Do not describe that distribution as identical to the pinned source.
Ponytail documents a native Codex adapter. Commands, lifecycle hooks, and instruction-only loading have different capabilities.
Preserve sibling references and helper files when loading a skill. Do not copy an isolated file whose dependencies are missing.
Use the environment's existing browser capability. Do not introduce a second browser runtime or spend the assignment configuring plugins.
Consult [official shadcn skill guidance](https://ui.shadcn.com/docs/skills) for Base UI patterns. Defer Impeccable's broader critique loops.

## Active workflow

| Stage | Guidance | Required output |
|---|---|---|
| Clarify | Matt `grill-with-docs`, with its documented grilling/domain-modelling dependencies | Resolve product choices that the rubric cannot answer. Investigate observable facts before asking. |
| Map decisions | Matt `wayfinder`, adapted to this small exercise | Existing issue #1 indexes settled and open choices. Implementation issues remain distinct from decisions. |
| Specify | Matt `to-spec` | One bounded contract covering input, user actions, ticket outcomes, persistence, submission, and evidence. |
| Queue | Matt `to-tickets` | Small GitHub work items with dependencies and observable acceptance criteria. |
| Implement | Ponytail `ponytail`; selected Pstack principles below | Complete the smallest working flow before polishing secondary interactions. |
| Verify | Pstack `principle-prove-it-works` | Drive the shipped browser interface and inspect its actual result. |
| Review | Matt `code-review`, with Ponytail and Pstack criteria inside its two lenses | One report against a fixed diff, followed by one targeted repair pass. |
| Handoff | Pstack `technical-writing`, `unslop`, and `show-me-your-work` | Runnable instructions, evidence pointers, and material limitations. |

Matt's files are under `skills/engineering/`; `grilling` is under `skills/productivity/`.
The selected Matt files include `grill-with-docs`, `domain-modeling`, `wayfinder`, `to-spec`, `to-tickets`, and `code-review`. `setup-matt-pocock-skills` is reference material, not assignment work. Current names replace older write-a-prd/prd-to-issues advice; use the pinned paths.
Ponytail's core and review files are `skills/ponytail/SKILL.md` and `skills/ponytail-review/SKILL.md`.
Pstack's files are under `pstack/skills/<name>/SKILL.md`; `technical-writing` also uses `unslop`.
Do not launch Matt review, Ponytail review, and a Pstack review panel independently on the same patch.
Use `interrogate` only to investigate a concrete suspected defect that can be reproduced against the real implementation.

## Project overrides

Wayfinder is designed for work larger than one session and says a small clear task may not need it. The owner requested a map, so use issue #1 with Destination, Settled, Not yet specified, and Out of scope. Keep linked titles and genuine dependencies; do not create one decision issue per CSV row or a research/prototype bureaucracy. The available connector did not expose native subissue/blocking relationships, so the map uses explicit issue links.

The prior LayerNorm conventions assign stored data to Query, shareable navigation to Router, drafts to their form owner, and derived values to render. They allow ephemeral useState/useReducer. This project's stricter first-party hook default comes from the current owner instruction. Do not misattribute the override or import LayerNorm's larger backend/auth/runtime architecture.

Generic requests for exhaustive specifications, new tests, multi-model panels, or repeated review loops are bounded by this contract.
Ponytail's test/self-check default and Pstack's `tdd` routing do not authorize unit tests. Keep the real end-to-end verification requirement.
An acceptance check exercises a user's action and observable result; it does not mirror internal helper implementation.
Pstack `architect` normally invokes `how` and an `arena` with multiple candidates. Do not start that tournament for already settled choices.
Pstack `no-comments` can trigger further review and architecture work. Apply its useful prose discipline during normal review without starting that pipeline.
Keep comments that explain a necessary, non-obvious constraint. Remove narration and explanations already visible in the code.
Do not turn plain ticket states into a formal-methods project. A small typed state model is sufficient unless evidence proves otherwise.
Stop once required outcomes are verified. An overnight execution window is not permission to exceed the assignment's work budget.

## One review, two lenses

Freeze the base commit, reviewed commit, and acceptance criteria before review. Reviewers report findings and do not edit shared files.

| Lens | Check | Evidence |
|---|---|---|
| Spec | Each required input, ticket decision, response, audio deliverable, and submission item is correctly represented. | Requirement reference, user action, expected result, observed result. |
| Standards | Persistence, import validation, stale state, accessibility, errors, and unnecessary complexity. | Concrete code path or browser reproduction, consequence, smallest fix. |

Use Ponytail's ordering: correctness, safety, expected usage, verification, performance, then removable complexity.
Use Pstack's model and boundary principles to find duplicated rules, impossible states, and unnecessary pass-through layers.
Do not flag hypothetical scale demands, personal style preferences, or missing unit tests as defects.
Each finding names severity, file or interaction, affected requirement, evidence, and the smallest correction.
A behavioural claim needs an executed reproduction. Mark an unexecuted suspicion unverified instead of presenting it as an observed bug.
A structural finding needs the actual duplication or indirection and a concrete simplification; do not mislabel it as a runtime failure.
Keep Spec and Standards reports separate, each under 400 words. Deduplicate overlapping repairs, apply one targeted repair pass, and rerun checks affected by those repairs.
If the deadline prevents a required repair, record the unresolved failure explicitly. Do not close its issue or weaken acceptance criteria.
Thermos is a separate [review package](https://github.com/cursor/plugins/tree/246bc508c139c5e036dfafea8978d31a7433279f/thermos); do not add its orchestrator to this review pipeline.

## Evidence and GitHub state

Use an explicit body status consistently: draft, ready, in progress, review, verified, or blocked. These are workflow labels in our issue bodies, not extra native GitHub issue states. Keep engineering states distinct from the application's ticket outcomes.
An item enters review with its commit, acceptance result, evidence location, and known limitation. It becomes verified only after the current revision passes.
Retain one concise decision trail using Pstack's columns: `ts`, `phase`, `decision`, `why`, `evidence`, `result`.
Log forks, blockers, corrections, and verification checkpoints. Do not log every command or duplicate issue discussions.
Evidence pointers must resolve to the actual commit, output, screenshot, or file. Append corrections rather than rewriting what happened.
The final handoff states what works, how to run it, what was checked, and what remains unresolved.

## PR sequence

Keep the existing planning PR #6 for this specification. After the owner settles the open product choices, one writer builds on the approved planning revision. If that PR is not yet merged, create the implementation branch from it and identify the stacked base explicitly.

1. **Working queue PR:** complete issue #2, then #3 on the same branch. Record save/refresh proof before adding priority/context. Two working milestones need not become two dependency-stacked implementation PRs.
2. **Submission/delivery PR, if it contains separate changes:** final README, verified links, build notes, written replies, and document. Issue #4 gates the current application revision; issue #5 cannot be called complete without the applicant's recording.

Use one final Spec/Standards review of the fixed working candidate, with affected-path checks after repairs. A docs-only follow-up needs content/links/word-count verification, not a second full code-review panel. User review and merge remain separate from the agent's readiness report.

## Complete Pstack inventory and disposition

The pinned tree contains 34 direct workflow skills and 24 principle skills. Dormant automation-pack skills are outside this count.
This is a complete inventory, not a claim that every file was read or invoked. Selection is deliberate.

| Disposition | Workflow skills |
|---|---|
| Active | `technical-writing`, `unslop`, `show-me-your-work` |
| Use only for a concrete question or defect | `in-your-own-words`, `how`, `why`, `blast-radius`, `interrogate`, `typescript-best-practices` |
| Available for future design work; defer here | `architect`, `arena`, `swarm`, `sharpen`, `figure-it-out` |
| Verification infrastructure; defer | `create-verification-skill`, `maintain-verification-skill`, `create-formal-verification-skill`, `maintain-formal-verification-skill`, `statechart`, `benchmark-checklist` |
| Context and explanation helpers; defer | `bro`, `teach`, `recall`, `ketchup`, `ketchup-video`, `poteto-help` |
| Broader workflow/configuration work; defer | `poteto-mode`, `setup-pstack`, `automate-me`, `reflect`, `correct`, `make-bot-ui`, `no-comments` |
| Defer additional test workflow; real browser verification remains required | `tdd` |

| Disposition | Principle skills, with the common `principle-` prefix omitted |
|---|---|
| Apply to implementation and verification | `model-the-domain`, `boundary-discipline`, `type-system-discipline`, `make-operations-idempotent`, `minimize-reader-load`, `prove-it-works`, `sequence-verifiable-units` |
| Consult only when the named problem appears | `attack-the-premise`, `fix-root-causes`, `foundational-thinking`, `redesign-from-first-principles`, `subtract-before-you-add`, `laziness-protocol`, `experience-first` |
| Consult only for applicable execution decisions | `guard-the-context-window`, `separate-before-serializing-shared-state`, `never-block-on-the-human`, `encode-lessons-in-structure`, `build-the-lever` |
| Not needed for the agreed scope | `exhaust-the-design-space`, `outcome-oriented-execution`, `migrate-callers-then-delete-legacy-apis`, `explain-the-number`, `test-behavior-not-implementation` |

Full bodies were inspected for the seven active principle leaves and for `poteto-mode`, `architect`, `interrogate`, `show-me-your-work`, `create-verification-skill`, `no-comments`, `technical-writing`, and `unslop`.
The remaining Pstack entries were assessed from the repository inventory and README. Read a leaf before claiming to apply it.
The selected Matt skills and both selected Ponytail skill bodies were read during planning. Optional UI guidance does not expand the agreed scope.
