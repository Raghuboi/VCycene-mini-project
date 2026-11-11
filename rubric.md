# VCycene Mini-Project: Run the Monday Queue

Oct 5, 2026 · @Someone

This is a take-home exercise of about three hours for applicants to VCycene's Product and Customer Operations roles. You build a small support tool with AI, then handle one customer and one teammate.

## The scenario

It is Monday, October 5, 2026. You have just taken over customer operations for LILA, a smart kitchen composter. Twelve support tickets are open. The person before you tracked them in a spreadsheet, and there is no internal tool yet.

Your job this week is the real job in miniature: build the tool, look after the customer, and get what you need from the team.

Every customer, ticket, teammate, and rule in this exercise is invented. None of it is VCycene's real data or policy.

## Ground rules

Time. Plan for about three hours. Please stop at four. A rough tool that works beats a polished one that does not.

AI. Use any AI tools you like, for the code and for the writing. We are assessing your judgment, so check what the AI gives you.

Experience. You do not need to have written code before. Tools such as Claude, Cursor, Replit, or Lovable can build this with you. We want to see how you direct them.

Your work stays yours. We use your submission only to assess your application.

## House rules for the exercise

Every customer gets a reply within 1 business day.

Refunds are available for 30 days after delivery. After that, the warranty covers repair or replacement, not a refund.

A carrier damage claim must be filed within 14 days of delivery.

A refund is paid only after the warehouse confirms the returned unit has arrived.

You cannot change these rules or make an exception on your own. Your manager can.

## Sample tickets

These twelve tickets are your whole queue. Copy the text below into a file named tickets.csv. Dates are year-month-day, and last_reply_from says who wrote most recently.

*Source*

| TICKET_ID | OPENED | CUSTOMER | COUNTRY | DELIVERED | FIRMWARE | ISSUE | STATUS | LAST_REPLY_FROM | LAST_REPLY_DATE | NOTES |
|---|---|---|---|---|---|---|---|---|---|---|
| T-101 | 2026-09-28 | Maya Okafor | CA | 2026-08-25 | 2.4.1 | Cycle stops halfway since the last update. Third time writing in. Wants a full refund. | open | customer | 2026-10-03 | Two earlier tickets were closed with 'restart the unit'. |
| T-102 | 2026-10-01 | Daniel Reyes | US | 2026-09-12 | 2.4.1 | Unit pauses mid-cycle and the light blinks amber. | open | customer | 2026-10-01 |  |
| T-103 | 2026-10-02 | Priya Nair | CA | 2026-09-20 | 2.4.1 | Stops after about an hour. Worked fine before the update. | open | customer | 2026-10-02 |  |
| T-104 | 2026-09-24 | Tom Lindqvist | US | 2026-09-22 | 2.3.0 | Box arrived crushed and the lid is cracked. Photos attached. | waiting on us | customer | 2026-09-24 | Carrier claim not filed yet. |
| T-105 | 2026-09-18 | Grace Chen | CA | 2026-09-01 | 2.3.0 | Sent the unit back for a refund. Tracking shows it reached the warehouse on Sep 26. | waiting on warehouse | us | 2026-09-27 | Warehouse has not confirmed receipt. Refund on hold. |
| T-106 | 2026-10-03 | Samir Haddad | CA | 2026-10-01 | 2.4.1 | Cannot connect to Wi-Fi during setup. | open | customer | 2026-10-03 |  |
| T-107 | 2026-10-02 | Lena Fischer | US | 2026-09-30 | 2.4.0 | Would like an onboarding call this week. | open | customer | 2026-10-02 |  |
| T-108 | 2026-09-29 | Andre Baptiste | CA | 2026-09-10 | 2.3.0 | Changed his mind and wants a refund. Needs a return label. | open | customer | 2026-09-29 |  |
| T-109 | 2026-09-30 | Maya Okafor | CA | 2026-08-25 | 2.4.1 | Following up on my refund request. Nobody has answered. | open | customer | 2026-09-30 |  |
| T-110 | 2026-09-25 | Hannah Brooks | US | 2026-08-30 | 2.3.0 | Was promised a replacement by Sep 26. Still no tracking number. | waiting on us | us | 2026-09-26 | Replacement unit not allocated yet. |
| T-111 | 2026-10-04 | Oliver Grant | CA | 2026-09-05 | 2.4.0 | Loves it. Asks how to order a second unit for his parents. | open | customer | 2026-10-04 |  |
| T-112 | 2026-10-01 | Sofia Marino | US | 2026-09-27 | 2.4.0 | Amber light is blinking. Unit seems to run normally. | open | customer | 2026-10-01 |  |

TICKET_ID	OPENED	CUSTOMER	COUNTRY	DELIVERED	FIRMWARE	ISSUE	STATUS	LAST_REPLY_FROM	LAST_REPLY_DATE	NOTES

T-101	2026-09-28	Maya Okafor	CA	2026-08-25	2.4.1	Cycle stops halfway since the last update. Third time writing in. Wants a full refund.	open	customer	2026-10-03	Two earlier tickets were closed with 'restart the unit'.

T-102	2026-10-01	Daniel Reyes	US	2026-09-12	2.4.1	Unit pauses mid-cycle and the light blinks amber.	open	customer	2026-10-01

T-103	2026-10-02	Priya Nair	CA	2026-09-20	2.4.1	Stops after about an hour. Worked fine before the update.	open	customer	2026-10-02

T-104	2026-09-24	Tom Lindqvist	US	2026-09-22	2.3.0	Box arrived crushed and the lid is cracked. Photos attached.	waiting on us	customer	2026-09-24	Carrier claim not filed yet.

T-105	2026-09-18	Grace Chen	CA	2026-09-01	2.3.0	Sent the unit back for a refund. Tracking shows it reached the warehouse on Sep 26.	waiting on warehouse	us	2026-09-27	Warehouse has not confirmed receipt. Refund on hold.

T-106	2026-10-03	Samir Haddad	CA	2026-10-01	2.4.1	Cannot connect to Wi-Fi during setup.	open	customer	2026-10-03

T-107	2026-10-02	Lena Fischer	US	2026-09-30	2.4.0	Would like an onboarding call this week.	open	customer	2026-10-02

T-108	2026-09-29	Andre Baptiste	CA	2026-09-10	2.3.0	Changed his mind and wants a refund. Needs a return label.	open	customer	2026-09-29

T-109	2026-09-30	Maya Okafor	CA	2026-08-25	2.4.1	Following up on my refund request. Nobody has answered.	open	customer	2026-09-30

T-110	2026-09-25	Hannah Brooks	US	2026-08-30	2.3.0	Was promised a replacement by Sep 26. Still no tracking number.	waiting on us	us	2026-09-26	Replacement unit not allocated yet.

T-111	2026-10-04	Oliver Grant	CA	2026-09-05	2.4.0	Loves it. Asks how to order a second unit for his parents.	open	customer	2026-10-04

T-112	2026-10-01	Sofia Marino	US	2026-09-27	2.4.0	Amber light is blinking. Unit seems to run normally.	open	customer	2026-10-01

## Part 1: Build the tool (about 2 hours)

Build a small working tool that a support person could open on Monday morning to run this queue. Use any AI coding tool.

The tool must do three things:

Load the twelve sample tickets.

Show which tickets need attention first, and say why. The house rules tell you what matters.

Let the user change a ticket's status and add a note, and keep those changes after the page is refreshed.

Then add one feature we did not ask for that you think a support person needs.

We must be able to open what you built. Send a live link if you can. Otherwise send a repository with steps that get it running in under five minutes.

Also write build notes of 200 words or fewer:

Which tools you used

One thing the AI got wrong, and how you caught it

What you would build next, and why

## Part 2: The customer (about 30 minutes)

Maya Okafor has written in three times and wants a full refund. Read her tickets and the house rules, then answer her.

Send two things:

A written reply of 150 words or fewer.

A voice recording of two minutes or less: what you would say if Maya picked up the phone. Audio only is fine. Share it as a link, such as a Loom or a voice memo in Google Drive with link sharing turned on.

Use AI for the written reply if you like. The recording should be you, speaking naturally and not reading a script.

## Part 3: The team (about 30 minutes)

Some tickets cannot close without other people. Write two short messages.

To Wei, the firmware engineer (120 words or fewer). Something in the queue needs an engineer. Wei is in the middle of a release and has not heard about it. Write the message that gets you an answer without a follow-up question.

To your manager, at the end of Monday (120 words or fewer). Say what is done, what is blocked and on whom, and the one decision you need from them.

## What to submit

Put everything in one document or PDF:

The link to your tool or repository

Your build notes

Your written reply to Maya and the link to your recording

Your two messages

Upload it with your application on LinkedIn or Indeed, as the cover letter or as the last page of your resume file. If you found this through a LinkedIn post rather than a job listing, send the same document to the person who posted it, by LinkedIn message or email. Before you send it, check that every link opens in a private browser window.

## How we evaluate

Co-op and full-time applicants do the same project, and we read them against different bars.

*What we look at / What good looks like*

| What we look at | What good looks like |
|---|---|
| The tool works | It opens on the first try, and the three must-haves work with the sample data |
| Priorities | The order follows the house rules, and the tool shows the reason for each ticket |
| Working with AI | Your notes show that you tested and corrected what the AI produced |
| The customer | Maya gets an honest answer under the house rules, an apology that names what went wrong, and a clear next step |
| The team | Wei can act without asking a question, and your manager knows which decision you need |
| Judgment | You noticed what some tickets have in common and which ones are about to run out of time |

## What happens next

If you move forward, the first call starts with your tool. You walk us through it, and we ask you to make one small change while we watch.
