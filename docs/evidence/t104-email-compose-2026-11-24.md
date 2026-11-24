# T-104 email compose: browser acceptance

November 24, 2026. Base `c2299fe5cbd6339633de540448d71390ec7a1bbf`. Windows Chrome in an isolated headless profile; browser run `mail-1795558609`. None of the existing demo ports or their browser storage was used.

- `npm ci`, `npm run typecheck`, and `npm run build` passed. The build reported its Zod annotation and large-chunk warnings.
- Eleven browser assertions passed. At the unconfigured production preview both controls were disabled without links. A separate run with an invalid Claims value and a configured Tom address disabled Claims only. With both configured to reserved example addresses, both native anchors had the exact independent recipient and encoded subject, including `%2B` for a mailbox alias.
- The twelve-ticket priority order was unchanged, with T-104 first. Pointer hit areas fit at 1440px and 390px; Tab reached Claims then Tom. Clicking the queue link to T-101 showed no mail controls and the app storage key was still absent.
- Saved an `open` status and a walkthrough-only T-104 note, reloaded, and read back the unchanged source note, exact saved status/note, and both mail links. No uncaught browser errors or non-debug console messages were observed.
- Neither mail link was activated in the initial browser run. A follow-up isolated Chrome trace with non-deliverable addresses observed a trusted, uncanceled click and an exact `mailto:` anchor-navigation request. A plain HTML control reproduced the same browser lifecycle. With an unsaved note, the leave-page confirmation fired; dismissing it preserved the text without saving. The final production preview showed the two email actions and no email accordion.
- No external mail client, logged-in sender, or real recipient was verified; no message was sent and no claim was filed. Finish with the consented compose-and-discard check in [the feature acceptance criteria](../t104-email-compose.md#acceptance-criteria-and-verification-steps).
