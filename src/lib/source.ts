import Papa from "papaparse";
import { z } from "zod";

import rawCsv from "../data/tickets.csv?raw";
import { mapSourceStatus } from "./status";

const calendarDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "expected a YYYY-MM-DD date");

export const sourceTicketSchema = z.object({
  TICKET_ID: z.string().regex(/^T-\d{3}$/, "expected a T-### ticket id"),
  OPENED: calendarDate,
  CUSTOMER: z.string().trim().min(1),
  COUNTRY: z.string().trim().length(2),
  DELIVERED: calendarDate,
  FIRMWARE: z.string().trim().min(1),
  ISSUE: z.string().trim().min(1),
  STATUS: z.string().trim().min(1),
  LAST_REPLY_FROM: z.enum(["customer", "us"]),
  LAST_REPLY_DATE: calendarDate,
  NOTES: z.string(),
});

export type SourceTicket = z.infer<typeof sourceTicketSchema>;

export type SourceLoad =
  | { ok: true; tickets: readonly SourceTicket[] }
  | { ok: false; problem: string };

function parseSource(csv: string): SourceLoad {
  const parsed = Papa.parse<Record<string, string>>(csv, {
    header: true,
    skipEmptyLines: true,
  });

  const firstError = parsed.errors[0];
  if (firstError) return { ok: false, problem: `${firstError.code}: ${firstError.message}` };

  const rows = z.array(sourceTicketSchema).safeParse(parsed.data);
  if (!rows.success) {
    const issue = rows.error.issues[0];
    const where = issue ? issue.path.join(".") : "row";
    return { ok: false, problem: `${where}: ${issue?.message ?? "invalid row"}` };
  }

  const seen = new Set<string>();
  for (const ticket of rows.data) {
    if (seen.has(ticket.TICKET_ID)) {
      return { ok: false, problem: `duplicate ticket id ${ticket.TICKET_ID}` };
    }
    seen.add(ticket.TICKET_ID);
    try {
      mapSourceStatus(ticket.STATUS);
    } catch (error) {
      return { ok: false, problem: `${ticket.TICKET_ID}: ${(error as Error).message}` };
    }
  }

  if (rows.data.length === 0) return { ok: false, problem: "the bundled CSV has no rows" };

  return { ok: true, tickets: rows.data };
}

/** Parsed once at module load so both the load path and the save path see the same immutable facts. */
export const sourceLoad: SourceLoad = parseSource(rawCsv);

export function requireSourceTickets(): readonly SourceTicket[] {
  if (!sourceLoad.ok) throw new Error(`The bundled ticket CSV could not be read (${sourceLoad.problem}).`);
  return sourceLoad.tickets;
}
