import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useBlocker } from "@tanstack/react-router";
import { useRef, type FormEvent } from "react";

import { asQueueProblem } from "../lib/edits";
import { QUEUE_QUERY_KEY, loadSnapshot, submitTicketUpdate, type CommittedTicket, type SaveInput } from "../lib/queue";
import { STATUS_LABELS, TICKET_STATUSES, type TicketStatus } from "../lib/status";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { NativeSelect } from "./ui/native-select";
import { Textarea } from "./ui/textarea";

function ticketOfSearch(search: unknown): string | undefined {
  if (typeof search !== "object" || search === null) return undefined;
  const value = (search as Record<string, unknown>).ticket;
  return typeof value === "string" ? value : undefined;
}

function isDirty(form: HTMLFormElement | null, committedStatus: TicketStatus): boolean {
  if (!form) return false;
  const data = new FormData(form);
  const status = data.get("status");
  const note = data.get("note");
  return status !== committedStatus || (typeof note === "string" && note.trim().length > 0);
}

export function StatusEditor({ ticket }: { ticket: CommittedTicket }) {
  const queryClient = useQueryClient();
  const formRef = useRef<HTMLFormElement>(null);

  const save = useMutation({
    mutationFn: async (input: SaveInput) => submitTicketUpdate(input),
    networkMode: "always",
    retry: false,
    // Publishing on the hook keeps the snapshot update even if the triggering component re-renders.
    onSuccess: (result) => {
      queryClient.setQueryData(QUEUE_QUERY_KEY, result.snapshot);
    },
  });

  const reload = useMutation({
    mutationFn: async () => loadSnapshot(),
    networkMode: "always",
    retry: false,
    onSuccess: (snapshot) => {
      queryClient.setQueryData(QUEUE_QUERY_KEY, snapshot);
      save.reset();
    },
  });

  useBlocker({
    withResolver: false,
    shouldBlockFn: ({ current, next }) => {
      const form = formRef.current;
      if (!form) return false;

      const sameTicket =
        next.pathname === current.pathname &&
        ticketOfSearch(next.search) === ticketOfSearch(current.search);
      if (sameTicket) return false;

      if (save.isPending) return true;
      if (!isDirty(form, ticket.status)) return false;

      return !window.confirm(
        "This ticket has unsaved changes. Leave the ticket and discard the draft?",
      );
    },
    enableBeforeUnload: () => {
      const form = formRef.current;
      return form !== null && (save.isPending || isDirty(form, ticket.status));
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (save.isPending) return;

    save.mutate({
      ticketId: ticket.source.TICKET_ID,
      expectedRevision: ticket.revision,
      form: new FormData(event.currentTarget),
    });
  }

  function handleReload() {
    const confirmed = window.confirm(
      "Discard your draft and reload the saved version of this ticket?",
    );
    if (!confirmed) return;
    reload.mutate();
  }

  const pending = save.isPending;
  const problem = save.isError ? asQueueProblem(save.error) : null;
  const canReload = problem !== null && (problem.kind === "conflict" || problem.kind === "corrupt");

  return (
    <div className="space-y-3">
      <form
        key={`${ticket.source.TICKET_ID}:${ticket.revision}`}
        ref={formRef}
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <fieldset disabled={pending} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="status">Status</Label>
            <NativeSelect
              id="status"
              name="status"
              defaultValue={ticket.status}
              onChange={() => save.reset()}
            >
              {TICKET_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {STATUS_LABELS[status]}
                </option>
              ))}
            </NativeSelect>
            <p className="text-xs text-muted-foreground">
              A status is your recorded position, not a completed action. Resolved needs a short new note.
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="note">New internal note</Label>
            <Textarea
              id="note"
              name="note"
              rows={3}
              defaultValue=""
              maxLength={1000}
              placeholder="What you did, what you need next, or whom you are waiting on"
              onInput={() => save.reset()}
            />
            <p className="text-xs text-muted-foreground">
              Internal only. Saving a note does not reply to the customer, file a claim, confirm a
              warehouse receipt, or pay a refund.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit" disabled={pending}>
              {pending ? "Saving…" : "Save update"}
            </Button>
            {pending ? (
              <span className="text-xs text-muted-foreground">
                Saving to this browser. Ticket navigation is blocked until it finishes.
              </span>
            ) : null}
          </div>
        </fieldset>
      </form>

      {problem ? (
        <div role="alert" className="rounded-md border border-destructive/40 bg-destructive/5 px-3 py-2 text-sm">
          <p className="font-medium text-destructive">The update was not saved</p>
          <p className="mt-1 text-foreground">{problem.message}</p>
          {problem.kind === "conflict" ? (
            <p className="mt-1 text-xs text-muted-foreground">
              The stored copy has newer saved values than the one you opened, so this was not written over
              them. Your draft is still in the form.
            </p>
          ) : null}
          {problem.kind === "write-failed" || problem.kind === "inaccessible" ? (
            <p className="mt-1 text-xs text-muted-foreground">
              Your draft is still in the form. Save again after freeing browser storage for this site.
            </p>
          ) : null}
          {canReload ? (
            <div className="mt-2">
              <Button variant="outline" size="sm" onClick={handleReload} disabled={reload.isPending}>
                {reload.isPending ? "Reloading…" : "Reload saved version"}
              </Button>
            </div>
          ) : null}
          {reload.isError ? (
            <p className="mt-2 text-xs text-destructive">
              Could not reload the saved version: {asQueueProblem(reload.error).message} Your draft is
              untouched.
            </p>
          ) : null}
        </div>
      ) : null}

      {save.isSuccess ? (
        <p role="status" className="text-sm font-medium text-success">
          {save.data.saved
            ? "Saved. This update is stored in this browser and survives a refresh."
            : "Nothing changed, so nothing was saved."}
        </p>
      ) : null}
    </div>
  );
}
