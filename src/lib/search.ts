import { z } from "zod";
import { requireSourceTickets } from "./source";

export const QUEUE_VIEWS = ["all", "active", "resolved"] as const;
export type QueueView = (typeof QUEUE_VIEWS)[number];

/**
 * Selection and list view only. No draft, note, status, or priority value may live in the URL.
 * Strict, so a stray parameter is a clear error instead of silently ignored state.
 */
export const queueSearchSchema = z.strictObject({
  ticket: z.string().regex(/^T-\d{3}$/, "Ticket selections look like T-101.")
    .refine((id) => {
      try {
        return requireSourceTickets().some((ticket) => ticket.TICKET_ID === id);
      } catch {
        // The queue query owns CSV load errors; do not turn a broken source into a URL error.
        return true;
      }
    }, "That ticket is not in the supplied queue.")
    .optional(),
  view: z.enum(QUEUE_VIEWS).optional(),
});

export type QueueSearch = z.infer<typeof queueSearchSchema>;

export const DEFAULT_VIEW: QueueView = "all";

export function viewOf(search: QueueSearch): QueueView {
  return search.view ?? DEFAULT_VIEW;
}
