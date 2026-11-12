# Skills and review contract

The [original rubric](../rubric.md), accepted owner decisions and [rubric audit](rubric-audit.md) define this work. Pstack, Ponytail and Matt Pocock provide review methods; they do not add employer requirements or enlarge the four-hour limit.

## Apply these principles to this project

| Guidance | Concrete use |
|---|---|
| Pstack prove-it-works | Drive the real queue, read actual stored values, refresh, inspect fresh screenshots and the final PDF/audio links. Build success alone is not proof. |
| Pstack minimize-reader-load | Keep one submitted-message source and one owner per state. Delete conflicting active drafts and obsolete schedules. A reader must find the current action without tracing old plans. |
| Pstack sequence-verifiable-units | Freeze a candidate; verify a journey; repair a concrete failure; recheck that path; then finalize the artifact and verify merged-main delivery. |
| Pstack technical-writing and unslop | Give each document one job. Use direct instructions, real file/command names and specific observed results. Remove duplicated status prose and speculative setup. |
| Ponytail review | Read connected code when a finding warrants it. Order findings by correctness/data loss, actual supported use, verification, speed and removable complexity. Name a concrete case, consequence and smallest fix. |
| Matt Pocock grilling/specification/review | Read the rubric before asking questions. Keep settled D1/D2/D4 decisions settled. Maintain one issue map, explicit acceptance and two bounded review lenses. |

## Run one bounded review

One implementation owner writes changes. A Spec reader checks every rubric deliverable, policy distinction and truthful communication. A Standards reader checks the affected data/state boundaries, real browser outcomes, accessibility and unnecessary complexity. Vision inspection is part of those observed outcomes, not a separate cosmetic redesign panel.

The owner has explicitly requested one fresh final audit wave. Preserve previous evidence and label the new wave separately. Use [B1–B7](rubric-audit.md#one-final-live-browser-and-vision-wave), one repair pass, then affected-path verification. Reports identify the requirement, concrete case, observed result or unverified suspicion, consequence, and smallest correction. Keep each review concise. Do not repeat a full review after document-only changes.

Use the existing permitted browser capability. If access is blocked, record the affected check and exact limitation. Do not bypass policy, install another browser runtime, or substitute cached captures for new live evidence. Temporary real-browser probes may produce auditable output; no new unit/mock suite or test framework belongs in this project.

## Preserve project overrides

- No unit tests, mocks, fake provider responses, fabricated successful actions or redundant CI. Generic Pstack TDD/Ponytail test defaults do not override this owner instruction.
- Router owns selection/view; Query owns snapshot/save lifecycle; native forms own drafts; pure functions derive policy; CSS owns layout. No application-authored useState/useEffect or shadow stores for these owners.
- One browser/origin and active editing tab are the supported load. Do not introduce multiuser architecture, cross-tab atomicity claims or scale work.
- Skills are development guidance, not the product runtime. Do not install an orchestration stack or run architecture tournaments for settled choices.
- Complete observable outcomes, then stop. The original time cap includes actual work; do not call an extended polish run compliant without timing evidence.
- Keep PR #10 as the single finalization candidate and use issues #1/#5. Preserve closed technical issues and historical evidence. Merge or delete branches only through the agreed review/authorization step.

## Reviewed provenance

| Source | Pin / scope |
|---|---|
| [Pstack](https://github.com/cursor/plugins/tree/246bc508c139c5e036dfafea8978d31a7433279f/pstack/skills) | `246bc508c139c5e036dfafea8978d31a7433279f`. The five active leaves above, including unslop, were read for this wave. Earlier domain/boundary/type/idempotence work remains in project history. |
| [Ponytail review](https://github.com/DietrichGebert/ponytail/blob/96608e078b2d5ea607c5c3b8b5a54d1c1fba6846/skills/ponytail-review/SKILL.md) | `96608e078b2d5ea607c5c3b8b5a54d1c1fba6846`. Concrete connected-code review at actual supported load. |
| [Matt Pocock skills](https://github.com/mattpocock/skills/tree/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d) | `4ae2317ddb22b046e26455e4f9c9b3aaaf62212d`. Grilling/domain modeling/Wayfinder/spec/tickets/review were read during original planning. |
| [Earlier full inventory](https://github.com/Raghuboi/VCycene-mini-project/blob/c15aebcfffd32a23ec72619cd9a2d115cdc677b1/docs/skills-and-review.md) | Historical Pstack inventory and optional UI references; not required finalizer reading. |

These are portable instructions. Pstack upstream documented Cursor/Claude adapters; native Codex support was not established for that pinned distribution. Ponytail documented a Codex adapter. Reading the files does not enable unavailable plugin commands or hooks. No new skill installation occurred in this wave.
