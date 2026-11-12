import { z } from "zod";

export const TICKET_STATUSES = [
  "open",
  "waiting_on_us",
  "waiting_on_customer",
  "waiting_on_engineering",
  "waiting_on_warehouse",
  "waiting_on_fulfillment",
  "waiting_on_manager",
  "resolved",
] as const;

export type TicketStatus = (typeof TICKET_STATUSES)[number];

export const ticketStatusSchema = z.enum(TICKET_STATUSES);

export const STATUS_LABELS: Record<TicketStatus, string> = {
  open: "Open",
  waiting_on_us: "Waiting on us",
  waiting_on_customer: "Waiting on customer",
  waiting_on_engineering: "Waiting on engineering",
  waiting_on_warehouse: "Waiting on warehouse",
  waiting_on_fulfillment: "Waiting on fulfillment",
  waiting_on_manager: "Waiting on manager",
  resolved: "Resolved",
};

/** The one place where the supplied spreadsheet wording becomes a canonical status. */
const SOURCE_STATUS_MAP: Record<string, TicketStatus> = {
  open: "open",
  "waiting on us": "waiting_on_us",
  "waiting on warehouse": "waiting_on_warehouse",
};

export function mapSourceStatus(sourceStatus: string): TicketStatus {
  const mapped = SOURCE_STATUS_MAP[sourceStatus];
  if (!mapped) throw new Error(`Unsupported source status: "${sourceStatus}"`);
  return mapped;
}
