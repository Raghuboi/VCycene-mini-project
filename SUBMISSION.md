# Run the Monday Queue
VCycene | Product Operations Engineer take-home

## Part 1 — Tool

**Repository:** https://github.com/Raghuboi/VCycene-mini-project/tree/feat/monday-queue-tool

**Run:** Open a terminal in the repository folder, run `python3 -m http.server 4173`, then open `http://localhost:4173`. No credentials or package installation are needed.

The tool loads the twelve supplied tickets, explains their priority, records status changes and notes in local browser storage, and identifies related cases. It does not actually send customer messages or perform third-party operations.

### Build notes (under 200 words)

I built the tool with an AI coding assistant, plain JavaScript, HTML and CSS. It reads the supplied CSV and saves operator updates in browser localStorage. I kept the original record separate from staff notes, so changing a status does not imply a customer reply, refund or shipment.

An early version showed the 30-day refund deadline for every ticket, including Oliver’s unrelated purchase inquiry. I caught that while checking the interface against the house rules and changed it to display refund timing only for relevant requests. This prevents a misleading priority signal.

Next, I would add owner assignment and follow-up reminders, so blocked cases stay visible without turning internal notes into claims of completed work. I checked the file syntax and the source-data priorities; browser-based save/reload verification remains to be performed in the evaluator’s environment.

## Part 2 — Maya Okafor

### Written response (under 150 words)

Hi Maya,

I'm sorry we closed your earlier tickets with repeated restart advice and then left your follow-up unanswered. You should not have had to contact us again.

I understand that your LILA stops halfway through a cycle following the update. I’m escalating this to our firmware engineer rather than asking you to restart it again.

The standard refund window is 30 days after delivery. That date has passed, but I will review when you first reported the problem before determining the available options. Warranty repair or replacement is normally available outside the refund window, and I will ask my manager whether an exception can be considered.

I’ll update you by tomorrow, October 6, even if the investigation is still underway. I won’t promise a refund or replacement before we confirm the next steps.

### Voice response (under two minutes)

**Recording:** [Add the applicant’s own voice-memo or Loom recording URL here.]

Suggested talking points, not a script: acknowledge the repeated contacts; take responsibility for the unanswered follow-up; explain the standard refund and warranty options without promising an exception; say what you will check with engineering and management; commit to the next update.

## Part 3 — Team messages

### To Wei, firmware engineer (under 120 words)

Hi Wei — three customers on firmware 2.4.1 report interrupted cycles: Maya (T-101: stops halfway, began after the update), Daniel (T-102: pauses mid-cycle with an amber light), and Priya (T-103: stops after about an hour, worked before the update). Maya’s T-109 is a follow-up, not a fourth customer.

Could you confirm whether this is a known issue, which diagnostics and safe troubleshooting steps support should request, and whether there is a supported workaround? Please advise when you can provide an initial update. We will avoid suggesting a rollback until you confirm it is safe.

### To manager, Monday end of day (under 120 words)

I reviewed all twelve tickets and identified the urgent cases and outstanding dependencies. Draft customer updates and the firmware escalation are prepared; no refund, claim or shipment has been completed through the tool.

The carrier claim for Tom (T-104) needs action before the October 6 deadline. Grace (T-105) is waiting for warehouse receipt confirmation; Hannah (T-110) needs fulfillment to allocate and track a promised replacement; Wei needs to review the possible firmware issue affecting three customers.

One decision I need: if Maya’s earlier refund request was outside the 30-day window, would you authorize a goodwill exception? Any payout would still require warehouse receipt confirmation.

---

**Before submission:** Record Maya's response naturally, insert an accessible recording URL, verify that URL in a private browser, open the repository in a fresh clone and verify save/reload, then submit this document with the application. The tool has no live public deployment.