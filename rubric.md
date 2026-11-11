# VCycene Mini-Project: Run the Monday Queue

Source: shared exercise document, captured 2026-11-10.
Original: <https://claude.ai/artifact/HEUGe2h6o1Lpm2ECjKWKQk#af6c4a1c-656c>
Dated Oct 5, 2026.

This is a take-home exercise of about three hours for applicants to VCycene's
Product and Customer Operations roles. You build a small support tool with AI,
then handle one customer and one teammate.

## The scenario

It is Monday, October 5, 2026. You have just taken over customer operations for
LILA, a smart kitchen composter. Twelve support tickets are open. The person
before you tracked them in a spreadsheet, and there is no internal tool yet.

Your job this week is the real job in miniature: build the tool, look after the
customer, and get what you need from the team.

Every customer, ticket, teammate, and rule in this exercise is invented. None of
it is VCycene's real data or policy.

## Ground rules

**Time.** Plan for about three hours. Please stop at four. A rough tool that
works beats a polished one that does not.

**AI.** Use any AI tools you like, for the code and for the writing. We are
assessing your judgment, so check what the AI gives you.

**Experience.** You do not need to have written code before. Tools such as
Claude, Cursor, Replit, or Lovable can build this with you. We want to see how
you direct them.

**Your work stays yours.** We use your submission only to assess your
application.

## House rules for the exercise

1. Every customer gets a reply within 1 business day.
2. Refunds are available for 30 days after delivery. After that, the warranty
   covers repair or replacement, not a refund.
3. A carrier damage claim must be filed within 14 days of delivery.
4. A refund is paid only after the warehouse confirms the returned unit has
   arrived.

You cannot change these rules or make an exception on your own. Your manager can.

## Sample tickets

These twelve tickets are your whole queue. Copy the text below into a file named
`tickets.csv`. Dates are year-month-day, and `last_reply_from` says who wrote
most recently.

See [`tickets.csv`](tickets.csv) — the twelve tickets with these columns:

`TICKET_ID, OPENED, CUSTOMER, COUNTRY, DELIVERED, FIRMWARE, ISSUE, STATUS,
LAST_REPLY_FROM, LAST_REPLY_DATE, NOTES`

## Part 1: Build the tool (about 2 hours)

Build a small working tool that a support person could open on Monday morning to
run this queue. Use any AI coding tool.

The tool must do three things:

1. Load the twelve sample tickets.
2. Show which tickets need attention first, and say why. The house rules tell you
   what matters.
3. Let the user change a ticket's status and add a note, and keep those changes
   after the page is refreshed.

Then add one feature we did not ask for that you think a support person needs.

We must be able to open what you built. Send a live link if you can. Otherwise
send a repository with steps that get it running in under five minutes.

Also write build notes of 200 words or fewer:

- Which tools you used
- One thing the AI got wrong, and how you caught it
- What you would build next, and why

## Part 2: The customer (about 30 minutes)

Maya Okafor has written in three times and wants a full refund. Read her tickets
and the house rules, then answer her.

Send two things:

1. A written reply of 150 words or fewer.
2. A voice recording of two minutes or less: what you would say if Maya picked up
   the phone. Audio only is fine. Share it as a link, such as a Loom or a voice
   memo in Google Drive with link sharing turned on.

Use AI for the written reply if you like. The recording should be you, speaking
naturally and not reading a script.

## Part 3: The team (about 30 minutes)

Some tickets cannot close without other people. Write two short messages.

1. **To Wei, the firmware engineer** (120 words or fewer). Something in the queue
   needs an engineer. Wei is in the middle of a release and has not heard about
   it. Write the message that gets you an answer without a follow-up question.
2. **To your manager, at the end of Monday** (120 words or fewer). Say what is
   done, what is blocked and on whom, and the one decision you need from them.

## What to submit

Put everything in one document or PDF:

- The link to your tool or repository
- Your build notes
- Your written reply to Maya and the link to your recording
- Your two messages

Upload it with your application on LinkedIn or Indeed, as the cover letter or as
the last page of your resume file. If you found this through a LinkedIn post
rather than a job listing, send the same document to the person who posted it, by
LinkedIn message or email. Before you send it, check that every link opens in a
private browser window.

## How we evaluate

Co-op and full-time applicants do the same project, and we read them against
different bars.

| What we look at | What good looks like |
|---|---|
| The tool works | It opens on the first try, and the three must-haves work with the sample data |
| Priorities | The order follows the house rules, and the tool shows the reason for each ticket |
| Working with AI | Your notes show that you tested and corrected what the AI produced |
| The customer | Maya gets an honest answer under the house rules, an apology that names what went wrong, and a clear next step |
| The team | Wei can act without asking a question, and your manager knows which decision you need |
| Judgment | You noticed what some tickets have in common and which ones are about to run out of time |

## What happens next

If you move forward, the first call starts with your tool. You walk us through
it, and we ask you to make one small change while we watch.
