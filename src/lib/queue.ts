import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";

import {
  QueueProblem,
  createEmptyEdits,
  editsDocumentSchema,
  readEdits,
  writeEdits,
  clearEdits,
  type EditsDocument,
  type InternalNote,
} from "./edits";
import { mapSourceStatus, ticketStatusSchema, type TicketStatus } from "./status";
import { requireSourceTickets, type SourceTicket } from "./source";

export type CommittedTicket = {
  /** Immutable source facts, exactly as supplied in the CSV. */
  source: SourceTicket;
  /** The supplied status mapped once into the canonical model. */
  sourceStatus: TicketStatus;
  /** The operator's recorded position; equal to sourceStatus until a save lands. */
  status: TicketStatus;
  revision: number;
  notes: readonly InternalNote[];
};

export type QueueSnapshot = { tickets: readonly CommittedTicket[] };

export const QUEUE_QUERY_KEY = ["queue-snapshot"] as const;

function mergeSnapshot(
  tickets: readonly SourceTicket[],
  document: EditsDocument,
  raw?: string,
): QueueSnapshot {
  const known = new Set(tickets.map((ticket) => ticket.TICKET_ID));
  for (const ticketId of Object.keys(document.tickets)) {
    if (!known.has(ticketId)) {
      throw new QueueProblem("corrupt", `Saved data refers to an unknown ticket (${ticketId}).`, { raw });
    }
  }

  return {
    tickets: tickets.map((source) => {
      const edit = document.tickets[source.TICKET_ID];
      const sourceStatus = mapSourceStatus(source.STATUS);
      return {
        source,
        sourceStatus,
        status: edit?.status ?? sourceStatus,
        revision: edit?.revision ?? 0,
        notes: edit?.notes ?? [],
      };
    }),
  };
}

/** Reads storage and merges it with the bundled CSV. No write happens on this path. */
export function loadSnapshot(): QueueSnapshot {
  let tickets: readonly SourceTicket[];
  try {
    tickets = requireSourceTickets();
  } catch (error) {
    throw new QueueProblem("source", error instanceof Error ? error.message : "The ticket CSV could not be read.", {
      cause: error,
    });
  }

  const stored = readEdits();
  if (stored.kind === "absent") return mergeSnapshot(tickets, createEmptyEdits());
  return mergeSnapshot(tickets, stored.document, stored.raw);
}

const saveCommandSchema = z.object({
  ticketId: z.string().regex(/^T-\d{3}$/),
  expectedRevision: z.number().int().min(0).max(1_000_000),
  status: ticketStatusSchema,
  note: z.string().trim().max(1000),
});

export type SaveInput = {
  ticketId: string;
  expectedRevision: number;
  form: FormData;
};

export type SaveResult = {
  snapshot: QueueSnapshot;
  /** False when the form matched the committed values exactly, so nothing was written. */
  saved: boolean;
};

function commandProblem(issues: readonly { path: PropertyKey[]; message: string }[]): string {
  const first = issues[0];
  if (!first) return "The update could not be read.";
  if (first.path[0] === "status") return "Choose a status from the list.";
  if (first.path[0] === "note") return "Notes must be 1000 characters or fewer.";
  return "The update could not be read.";
}

/**
 * One operation owns status changes and appended notes. The successful setItem inside
 * writeEdits is the commit point; this function then returns the canonical snapshot.
 */
export function submitTicketUpdate(input: SaveInput): SaveResult {
  const parsed = saveCommandSchema.safeParse({
    ticketId: input.ticketId,
    expectedRevision: input.expectedRevision,
    status: input.form.get("status"),
    note: input.form.get("note") ?? "",
  });
  if (!parsed.success) throw new QueueProblem("invalid", commandProblem(parsed.error.issues));
  const command = parsed.data;

  let tickets: readonly SourceTicket[];
  try {
    tickets = requireSourceTickets();
  } catch (error) {
    throw new QueueProblem("source", error instanceof Error ? error.message : "The ticket CSV could not be read.", {
      cause: error,
    });
  }

  const source = tickets.find((ticket) => ticket.TICKET_ID === command.ticketId);
  if (!source) throw new QueueProblem("invalid", "That ticket is not part of the loaded queue.");

  const stored = readEdits();
  const document = stored.kind === "present" ? stored.document : createEmptyEdits();
  const raw = stored.kind === "present" ? stored.raw : undefined;
  const current = document.tickets[command.ticketId];
  const currentStatus = current?.status ?? mapSourceStatus(source.STATUS);
  const currentRevision = current?.revision ?? 0;

  if (command.status === currentStatus && command.note.length === 0) {
    return { snapshot: mergeSnapshot(tickets, document, raw), saved: false };
  }

  if (command.status === "resolved" && currentStatus !== "resolved" && command.note.length === 0) {
    throw new QueueProblem("invalid", "Add a short note when you set a ticket to Resolved.");
  }

  if (command.expectedRevision !== currentRevision) {
    throw new QueueProblem("conflict", "This ticket was saved again after you opened the editor.", {
      committedRevision: currentRevision,
    });
  }

  const existingNotes = current?.notes ?? [];
  const notes: InternalNote[] =
    command.note.length > 0
      ? [...existingNotes, { createdAt: new Date().toISOString(), text: command.note }]
      : [...existingNotes];

  const nextDocument: EditsDocument = {
    version: 1,
    tickets: {
      ...document.tickets,
      [command.ticketId]: {
        status: command.status,
        revision: currentRevision + 1,
        notes,
      },
    },
  };

  const validated = editsDocumentSchema.safeParse(nextDocument);
  if (!validated.success) {
    throw new QueueProblem("invalid", "The update would produce invalid saved data, so nothing was written.");
  }

  writeEdits(validated.data);

  return { snapshot: mergeSnapshot(tickets, validated.data), saved: true };
}

/** Recovery path for unreadable saved data: remove only this application's key, then reload. */
export function resetStoredEdits(): QueueSnapshot {
  clearEdits();
  return loadSnapshot();
}

/**
 * One loaded snapshot, one cache key. Local storage needs no network, so every operation
 * uses networkMode "always" and deterministic failures are never retried automatically.
 */
export const queueQueryOptions = queryOptions({
  queryKey: QUEUE_QUERY_KEY,
  queryFn: async (): Promise<QueueSnapshot> => loadSnapshot(),
  networkMode: "always",
  retry: false,
  staleTime: Infinity,
  gcTime: Infinity,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: false,
});
