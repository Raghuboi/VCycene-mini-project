# T-104: Compose email to the claims team or Tom

## Protocol and scope

- Use a real HTML anchor with destination-specific text, styled as an outlined button. MDN uses `mailto:address`, not `mailto://address`; the anchor works with native keyboard navigation.[1][2]
- `mailto:` hands off a compose request. The configured mail client chooses the sender; `From` in the URI must be ignored. The user can edit, cancel, or send the message there.[2]
- Percent-encode the mailbox local part and subject separately, keeping `@` and the URI separators literal. RFC 6068 specifies `%20` for spaces and `%0D%0A` for body line breaks if multiline drafts are ever added.[2] This version includes one recipient and one short subject; no prefilled body, internal notes, attachments, CC, BCC, sender override, or automatic sending. The queue never marks a message sent or a claim filed.

## Configuration

The exercise CSV and rubric contain neither a claims mailbox nor Tom's email address. Confirm both with the case owner; do not guess. For an authorized local copy, set the following in an ignored `.env.local`, then restart Vite (or rebuild a production preview):

```dotenv
VITE_T104_CLAIMS_EMAIL=
VITE_T104_CUSTOMER_EMAIL=
```

A blank or invalid address disables only its own action and shows an explanation. Vite embeds `VITE_` values in browser code.[3] The ignore rule prevents accidentally staging the file, not exposure in a built app. Do not put credentials here, commit actual recipients, or publish/share a bundle containing real recipient addresses. For an isolated demo, use approved tester-controlled or reserved example addresses and do not send.

## Acceptance criteria and verification steps

| Acceptance criterion | Verification |
| --- | --- |
| T-104 displays “Email claims team” and “Email Tom” under Next step; other tickets do not gain mail actions. | Open T-104 at desktop and narrow widths. Check both controls are visible and usable without horizontal overflow. Navigate to another ticket using a queue link; both actions are absent. |
| Each configured control is a keyboard-focusable native `mailto:` link with its own verified To address and subject. Missing or invalid configuration disables only that control without producing a URI. | Run with no configuration, with one invalid and one valid address, and with both valid. At the configured origin check exact rendered hrefs, Tab order, and `%2B` for an address alias with `+`. |
| The operator's configured mail handler opens each compose window with the intended To and subject, and a correct signed-in From account can be selected. Nothing is sent by the queue. | With permission to open windows, activate each link in the intended browser/profile with its registered handler. Check the compose window's To, From, subject, and empty body; cancel or discard without sending. If a chooser opens or nothing happens, configure the browser/OS mail handler and repeat. A popup, missing handler, or wrong default account is not a queue-side success. |
| Mail controls do not submit or modify the ticket. Status and notes still persist in the same origin/profile. | Check the exact app storage before and after rendering and navigation. Save a walkthrough-only note in isolated Chrome, reload, and verify the same note, status, and source facts. For the real handler check, also confirm that composing/cancelling did not change the ticket. |

## Open decisions

- Confirm the exact Claims To and Tom To addresses and the approved source for them.
- Confirm the intended host browser/profile and mail app, and the support account that should appear in From. Being signed in to webmail does not itself select it as the link handler.
- The initial design leaves both bodies blank. If templates are wanted, approve copy separately, including exactly which claim or customer details may be included and whether claims belong in an email or a separate portal.

## Sources

[1] https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a — MDN: The HTML anchor element
[2] https://www.rfc-editor.org/rfc/rfc6068.html — RFC 6068: The mailto URI Scheme
[3] https://vite.dev/guide/env-and-mode — Vite: Env Variables and Modes
