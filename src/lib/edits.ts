import { z } from "zod";

import { ticketStatusSchema } from "./status";

/** The single durable document. Only operator edits live here; source facts never do. */
export const EDITS_STORAGE_KEY = "vcycene.queue.edits";
export const EDITS_VERSION = 1;

export const internalNoteSchema = z.object({
  createdAt: z.iso.datetime(),
  text: z.string().trim().min(1).max(1000),
});

export const ticketEditSchema = z.object({
  status: ticketStatusSchema,
  revision: z.number().int().min(1).max(100_000),
  notes: z.array(internalNoteSchema).max(500),
});

export const editsDocumentSchema = z.object({
  version: z.literal(EDITS_VERSION),
  tickets: z.record(z.string().regex(/^T-\d{3}$/), ticketEditSchema),
});

export type InternalNote = z.infer<typeof internalNoteSchema>;
export type TicketEdit = z.infer<typeof ticketEditSchema>;
export type EditsDocument = z.infer<typeof editsDocumentSchema>;

export type StoredEdits =
  | { kind: "absent" }
  | { kind: "present"; document: EditsDocument; raw: string };

export type QueueProblemKind =
  | "source"
  | "corrupt"
  | "unsupported"
  | "inaccessible"
  | "write-failed"
  | "conflict"
  | "invalid";

/** Every boundary failure the UI can explain, including the raw value a backup would need. */
export class QueueProblem extends Error {
  readonly kind: QueueProblemKind;
  readonly raw: string | undefined;
  readonly committedRevision: number | undefined;

  constructor(
    kind: QueueProblemKind,
    message: string,
    options: { raw?: string; committedRevision?: number; cause?: unknown } = {},
  ) {
    super(message, { cause: options.cause });
    this.name = "QueueProblem";
    this.kind = kind;
    this.raw = options.raw;
    this.committedRevision = options.committedRevision;
  }
}

export function asQueueProblem(error: unknown): QueueProblem {
  if (error instanceof QueueProblem) return error;
  return new QueueProblem("source", error instanceof Error ? error.message : String(error));
}

export function createEmptyEdits(): EditsDocument {
  return { version: EDITS_VERSION, tickets: {} };
}

/**
 * Reads the stored document without writing anything. A missing key is normal, not an error;
 * unreadable or unsupported content is reported with the untouched raw value.
 */
export function readEdits(): StoredEdits {
  let raw: string | null;
  try {
    raw = window.localStorage.getItem(EDITS_STORAGE_KEY);
  } catch (error) {
    throw new QueueProblem("inaccessible", "This browser blocked access to local storage.", {
      cause: error,
    });
  }

  if (raw === null) return { kind: "absent" };

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch (error) {
    throw new QueueProblem("corrupt", "Saved queue data is not valid JSON.", { raw, cause: error });
  }

  const version = isRecord(json) ? json.version : undefined;
  if (version === undefined) {
    throw new QueueProblem("corrupt", "Saved queue data has no version.", { raw });
  }
  if (version !== EDITS_VERSION) {
    throw new QueueProblem(
      "unsupported",
      `Saved queue data has an unsupported version (${String(version)}).`,
      { raw },
    );
  }

  const parsed = editsDocumentSchema.safeParse(json);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    const where = issue && issue.path.length > 0 ? `${issue.path.join(".")}: ` : "";
    throw new QueueProblem("corrupt", `Saved queue data does not match the expected shape (${where}${issue?.message ?? "invalid"}).`, {
      raw,
    });
  }

  return { kind: "present", document: parsed.data, raw };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function assertWritable(): Storage {
  try {
    return window.localStorage;
  } catch (error) {
    throw new QueueProblem("inaccessible", "This browser blocked access to local storage.", {
      cause: error,
    });
  }
}

/** One setItem call is the commit point; the caller treats a normal return as saved. */
export function writeEdits(document: EditsDocument): void {
  const storage = assertWritable();
  const serialized = JSON.stringify(document);
  try {
    storage.setItem(EDITS_STORAGE_KEY, serialized);
  } catch (error) {
    throw new QueueProblem("write-failed", "The browser refused to store the update.", {
      cause: error,
    });
  }
}

/** Used only by the corrupt-data recovery flow, after the operator has a backup. */
export function clearEdits(expectedRaw: string): void {
  const storage = assertWritable();
  try {
    if (storage.getItem(EDITS_STORAGE_KEY) !== expectedRaw) {
      throw new QueueProblem("conflict", "The stored value changed after the backup was offered. Reload the current value before resetting.");
    }
    storage.removeItem(EDITS_STORAGE_KEY);
  } catch (error) {
    if (error instanceof QueueProblem) throw error;
    throw new QueueProblem("inaccessible", "The browser refused to remove the saved edits.", {
      cause: error,
    });
  }
}
