# Run the Monday Queue | VCycene take-home

A local browser tool for the **fictional Monday, October 5, 2026** support queue. No account, API keys, backend, npm dependencies, or model subscription required.

## Open in under five minutes

In this folder, run:

```sh
python3 -m http.server 4173
```

Then visit **http://localhost:4173** in your browser. A local server is required because the app fetches `tickets.csv`.

## What it does

- Reads all twelve source tickets from the provided CSV. Source facts never change.
- Shows a deterministic priority queue with concrete policy/SLA reasons, taking October 5 as the scenario date (not today's real date).
- Filters the queue and allows an operator to select a ticket, change status and append internal notes; updates survive a reload via browser `localStorage`.
- Shows related cases: Maya's two tickets and the three distinct customers reporting interrupted cycles on firmware 2.4.1.
- Separates saved operator notes from customer replies, shipments, payments and case closure. A status or note is not proof of an external action.

## Important limits

This is a single-browser local workflow. Edits are stored by this site's origin in your current browser profile; they do not sync between browsers or devices. The twelve tickets, policies and scenario date are fictional. No emails, calls, carrier claims, warehouse checks, refunds or support escalations are actually sent. The exercise asks the applicant to record the separate voice response.

The source assumes Monday-Friday business days (no holiday calendar), with delivery day zero. Cases due today are **not** automatically overdue. Carrier and refund deadlines use simple date arithmetic; the employer's real policies may differ.

## Manual verification

1. Open a fresh browser window and count twelve distinct ticket IDs.
2. Review Tom's Oct 6 claim deadline, Maya's previous unanswered follow-up, Grace's warehouse hold and Oliver's normal purchase question.
3. Open a ticket, change its status and append a note; click **Save changes**.
4. Reload, open the same ticket and verify the saved status/note; source last-reply data is unchanged.
5. View Maya's related ticket and the candidate firmware cluster (three distinct customers, not four tickets).
6. Test the narrow-screen layout and keyboard navigation.

There are deliberately no unit-test suites or mocked provider integrations.