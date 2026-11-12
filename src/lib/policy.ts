import {
  addDays,
  dayCount,
  daysBetween,
  formatDay,
  nextBusinessDay,
  parseCalendarDate,
} from "./dates";
import type { SourceTicket } from "./source";

/** The exercise runs on Monday, 5 October 2026 regardless of the reader's clock. */
export const SCENARIO_DATE_ISO = "2026-10-05";
export const SCENARIO_DAY = parseCalendarDate(SCENARIO_DATE_ISO);

/** House rules in force for the exercise. They are stated as given, not as VCycene policy. */
export const HOUSE_RULES = [
  "Every customer gets a reply within 1 business day.",
  "Refunds are available for 30 days after delivery; after that the warranty covers repair or replacement, not a refund.",
  "A carrier damage claim must be filed within 14 days of delivery.",
  "A refund is paid only after the warehouse confirms the returned unit has arrived.",
  "Only a manager can approve exceptions to these rules.",
] as const;

export const POLICY_ASSUMPTIONS = [
  "Dates are calendar dates, not timestamps.",
  "Delivery is day zero; an N-day window closes N days after the delivery date.",
  "Business days are Monday to Friday. The exercise supplies no holiday calendar or business hours.",
  "A Friday, Saturday, or Sunday message is due Monday; a message due Monday is due today, not overdue.",
] as const;

type PolicyRisk = "refund" | "return" | "carrier-claim";

type TriageEntry = {
  rank: number;
  band: "First" | "High" | "Overdue" | "Due today";
  headline: string;
  nextAction: string;
  risk?: PolicyRisk;
};

/**
 * Reviewed assessment for the fixed twelve-ticket snapshot. The dates and reply timing
 * beside each entry are calculated; this table only records the human judgment call.
 */
const TRIAGE: Record<string, TriageEntry> = {
  "T-104": {
    rank: 1,
    band: "First",
    headline:
      "Damage claim is not filed. The lid arrived cracked and the customer sent photos; the claim window is the tightest deadline in the queue.",
    nextAction:
      "File the carrier damage claim today and answer the customer with the remedy you can actually offer. Photos are mentioned in the text but no attachment is in the snapshot.",
    risk: "carrier-claim",
  },
  "T-101": {
    rank: 2,
    band: "High",
    headline:
      "Third message from this customer. Two earlier tickets were closed with restart advice and the unit still stops mid-cycle after the update.",
    nextAction:
      "Check the earlier refund-request dates and ask Wei for supported guidance. Seek a manager exception if the history does not establish ordinary eligibility. Keep T-109 beside this record.",
    risk: "refund",
  },
  "T-109": {
    rank: 3,
    band: "High",
    headline:
      "Separate follow-up from the same customer. Nobody has answered it, and a newer message on T-101 does not erase it.",
    nextAction:
      "Answer this record as well as T-101. Both stay open until the customer's concern is actually addressed.",
    risk: "refund",
  },
  "T-110": {
    rank: 4,
    band: "High",
    headline:
      "A replacement was promised for Sep 26 and still has no tracking number. The last message in the ticket is from support.",
    nextAction:
      "Chase fulfillment for unit allocation and a real tracking update, then tell the customer the truth about the delay.",
  },
  "T-105": {
    rank: 5,
    band: "High",
    headline:
      "Tracking reports arrival at the warehouse on Sep 26, but warehouse receipt is unconfirmed and the refund remains on hold.",
    nextAction:
      "Get warehouse confirmation of the returned unit. Payment waits on that confirmation; tracking text alone does not release it.",
    risk: "return",
  },
  "T-108": {
    rank: 6,
    band: "Overdue",
    headline:
      "Return-label request is unanswered. The request was made well inside the refund window and needs a label, not a policy debate.",
    nextAction:
      "Send or advance the return label now. Do not apply today's age to a request that was already timely.",
    risk: "refund",
  },
  "T-102": {
    rank: 7,
    band: "Overdue",
    headline:
      "Interrupted cycle and amber light on firmware 2.4.1. Part of the candidate engineering cohort; the ticket does not say the fault began after the update.",
    nextAction:
      "Include in the engineering cohort and send supported guidance. A shared version is not a diagnosis.",
  },
  "T-112": {
    rank: 8,
    band: "Overdue",
    headline:
      "Amber light reported while the unit seems to run normally, on firmware 2.4.0. Close to the cohort by symptom, outside it by version.",
    nextAction:
      "Clarify what the amber light is doing and give supported guidance. Do not call this the same failure as the 2.4.1 reports.",
  },
  "T-103": {
    rank: 9,
    band: "Due today",
    headline:
      "Cycle stops after about an hour and worked fine before the update, on firmware 2.4.1. Third distinct customer in the candidate cohort.",
    nextAction: "Reply today and add the report to the engineering cohort.",
  },
  "T-106": {
    rank: 10,
    band: "Due today",
    headline:
      "Wi-Fi setup failure on firmware 2.4.1. Same version as the cohort, different symptom and a different next step.",
    nextAction:
      "Help with setup. Version alone is not evidence of the interrupted-cycle pattern.",
  },
  "T-107": {
    rank: 11,
    band: "Due today",
    headline: "Asks for an onboarding call this week. No appointment exists in the snapshot.",
    nextAction: "Offer and confirm a call slot, then record what was agreed.",
  },
  "T-111": {
    rank: 12,
    band: "Due today",
    headline:
      "Purchase question: how to buy a second unit. Happy customer, no support failure, and no ordering link in the snapshot.",
    nextAction: "Answer the ordering question honestly. Do not invent a shop link or apply refund deadlines to a purchase.",
  },
};

const DEFAULT_TRIAGE: TriageEntry = {
  rank: 900,
  band: "Due today",
  headline: "No reviewed assessment exists for this record.",
  nextAction: "Read the source facts and decide the next action yourself.",
};

export type TicketFacts = {
  deliveredDay: number;
  ageDays: number;
  replyDueDay: number | null;
  replyOverdueDays: number;
  refundWindowClosesDay: number | null;
  claimWindowClosesDay: number | null;
  claimDaysLeft: number | null;
};

export type TicketAssessment = {
  rank: number;
  band: TriageEntry["band"];
  headline: string;
  nextAction: string;
  timing: readonly string[];
  facts: TicketFacts;
};

function replySentence(ticket: SourceTicket, scenarioDay: number): string {
  const lastReply = parseCalendarDate(ticket.LAST_REPLY_DATE);
  if (ticket.LAST_REPLY_FROM === "us") {
    return `The last message was from support on ${formatDay(lastReply)}; the customer is waiting on our next step.`;
  }
  const due = nextBusinessDay(lastReply);
  const overdue = daysBetween(due, scenarioDay);
  if (overdue > 0) return `Customer reply was due ${formatDay(due)} (${dayCount(overdue)} overdue).`;
  if (overdue === 0) return `Customer reply is due today (${formatDay(due)}).`;
  return `Customer reply is due ${formatDay(due)}.`;
}

export function assessTicket(ticket: SourceTicket, scenarioDay: number = SCENARIO_DAY): TicketAssessment {
  const triage = TRIAGE[ticket.TICKET_ID] ?? DEFAULT_TRIAGE;
  const deliveredDay = parseCalendarDate(ticket.DELIVERED);
  const ageDays = daysBetween(deliveredDay, scenarioDay);
  const replyDueDay =
    ticket.LAST_REPLY_FROM === "customer" ? nextBusinessDay(parseCalendarDate(ticket.LAST_REPLY_DATE)) : null;
  const replyOverdueDays = replyDueDay === null ? 0 : Math.max(0, daysBetween(replyDueDay, scenarioDay));

  const refundWindowClosesDay =
    triage.risk === "refund" || triage.risk === "return" ? addDays(deliveredDay, 30) : null;
  const claimWindowClosesDay = triage.risk === "carrier-claim" ? addDays(deliveredDay, 14) : null;
  const claimDaysLeft = claimWindowClosesDay === null ? null : daysBetween(scenarioDay, claimWindowClosesDay);

  const timing: string[] = [];

  if (claimWindowClosesDay !== null) {
    const left = claimDaysLeft ?? 0;
    timing.push(
      left >= 0
        ? `Carrier claim window closes ${formatDay(claimWindowClosesDay)} (${dayCount(left)} left).`
        : `Carrier claim window closed ${formatDay(claimWindowClosesDay)} (${dayCount(-left)} ago).`,
    );
  }

  if (refundWindowClosesDay !== null) {
    const left = daysBetween(scenarioDay, refundWindowClosesDay);
    if (triage.risk === "return") {
      timing.push(
        left >= 0
          ? `Standard refund window closes ${formatDay(refundWindowClosesDay)} (${dayCount(left)} left).`
          : `Standard refund window closed ${formatDay(refundWindowClosesDay)}, but the return was already underway, so the request itself stays valid.`,
      );
    } else {
      timing.push(
        left >= 0
          ? `Standard refund window closes ${formatDay(refundWindowClosesDay)} (${dayCount(left)} left).`
          : `Standard refund window ended ${formatDay(refundWindowClosesDay)}; check earlier request history, then seek a manager exception if needed.`,
      );
    }
  }

  timing.push(replySentence(ticket, scenarioDay));

  return {
    rank: triage.rank,
    band: triage.band,
    headline: triage.headline,
    nextAction: triage.nextAction,
    timing,
    facts: {
      deliveredDay,
      ageDays,
      replyDueDay,
      replyOverdueDays,
      refundWindowClosesDay,
      claimWindowClosesDay,
      claimDaysLeft,
    },
  };
}

/** Short reply line for the table: computed, never a stored field. */
export function replyTimingLabel(ticket: SourceTicket, scenarioDay: number = SCENARIO_DAY): {
  label: string;
  tone: "danger" | "warning" | "neutral";
} {
  if (ticket.LAST_REPLY_FROM === "us") {
    return { label: `We replied ${formatDay(parseCalendarDate(ticket.LAST_REPLY_DATE))}`, tone: "neutral" };
  }
  const due = nextBusinessDay(parseCalendarDate(ticket.LAST_REPLY_DATE));
  const overdue = daysBetween(due, scenarioDay);
  if (overdue > 0) return { label: `Reply ${dayCount(overdue)} overdue`, tone: "danger" };
  if (overdue === 0) return { label: "Reply due today", tone: "warning" };
  return { label: `Reply due ${formatDay(due)}`, tone: "neutral" };
}

const FIRMWARE_COHORT = ["T-101", "T-102", "T-103"] as const;

const NOT_IN_COHORT: Record<string, string> = {
  "T-109":
    "Same customer and unit as T-101. It adds history, not a fourth affected customer, so the cohort keeps three distinct people.",
  "T-106":
    "Firmware 2.4.1 but the report is Wi-Fi setup, not an interrupted cycle. A matching version is not a matching symptom.",
  "T-112":
    "Amber light on firmware 2.4.0 while the unit runs normally. Outside the version and outside the pattern.",
};

export type RelatedCase = {
  kind: "same-customer" | "candidate-firmware";
  title: string;
  explanation: string;
  tickets: readonly SourceTicket[];
};

export type Exclusion = { reason: string };

/**
 * Only two relationships exist for this fixed dataset: the same customer, and a candidate
 * symptom group that needs engineering investigation. Neither closes or merges a record.
 */
export function relatedCasesFor(
  ticket: SourceTicket,
  tickets: readonly SourceTicket[],
): { related: RelatedCase[]; exclusions: Exclusion[] } {
  const related: RelatedCase[] = [];

  const sameCustomer = tickets.filter(
    (candidate) => candidate.TICKET_ID !== ticket.TICKET_ID && candidate.CUSTOMER === ticket.CUSTOMER,
  );
  if (sameCustomer.length > 0) {
    const delivered = formatDay(parseCalendarDate(ticket.DELIVERED));
    related.push({
      kind: "same-customer",
      title: "Same customer, same unit",
      explanation: `${ticket.CUSTOMER} also has the separate ${sameCustomer.map((entry) => entry.TICKET_ID).join(" and ")} record for the unit delivered ${delivered}. Both records stay visible; linking does not close, merge, or resolve either one, and a newer message does not answer the older one.`,
      tickets: [ticket, ...sameCustomer],
    });
  }

  const inCohort = (FIRMWARE_COHORT as readonly string[]).includes(ticket.TICKET_ID);
  const cohort = !inCohort
    ? []
    : FIRMWARE_COHORT.filter((id) => id !== ticket.TICKET_ID)
        .map((id) => tickets.find((candidate) => candidate.TICKET_ID === id))
        .filter((entry): entry is SourceTicket => entry !== undefined);

  if (cohort.length > 0) {
    const people = new Set([ticket, ...cohort].map((entry) => entry.CUSTOMER));
    related.push({
      kind: "candidate-firmware",
      title: "Candidate firmware issue — needs investigation",
      explanation: `${people.size} different customers on firmware 2.4.1 report interrupted cycles. Only T-101 and T-103 say the problem started after the update. This is a candidate issue from the snapshot, not a confirmed regression, and it is not a diagnosis.`,
      tickets: cohort,
    });
  }

  const exclusion = NOT_IN_COHORT[ticket.TICKET_ID];
  return {
    related,
    exclusions: exclusion ? [{ reason: exclusion }] : [],
  };
}
