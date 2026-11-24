import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useBlocker } from "@tanstack/react-router";
import { useRef, type FormEvent } from "react";

import { asQueueProblem } from "../lib/edits";
import { QUEUE_QUERY_KEY, loadSnapshot, submitTicketUpdate, type CommittedTicket, type SaveInput } from "../lib/queue";
import { queueSearchSchema } from "../lib/search";
import { STATUS_LABELS, TICKET_STATUSES, type TicketStatus } from "../lib/status";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { NativeSelect } from "./ui/native-select";
import { Textarea } from "./ui/textarea";

function isDirty(form: HTMLFormElement | null, committedStatus: TicketStatus): boolean {
  if (!form) return false;
  const data = new FormData(form);
  const status = data.get("status");
  const note = data.get("note");
  return status !== committedStatus || (typeof note === "string" && note.trim().length > 0);
}

type EditorAction = { kind: "save"; input: SaveInput } | { kind: "reload" };

const RECOVERY_HINT: Partial<Record<ReturnType<typeof asQueueProblem>["kind"], string>> = {
  "write-failed": "Your draft is still in the form. Free some browser storage, then save again.",
  inaccessible: "Your draft is still in the form. Check this site's browser storage permissions, then retry.",
  conflict: "Your draft is still here. Reload to see the version currently in this browser.",
};

export function StatusEditor({ ticket }: { ticket: CommittedTicket }) {
  const queryClient = useQueryClient();
  const formRef = useRef<HTMLFormElement>(null);

  const action = useMutation({
    mutationFn: async (command: EditorAction) => command.kind === "save"
      ? { kind: "save" as const, ...submitTicketUpdate(command.input) }
      : { kind: "reload" as const, snapshot: loadSnapshot() },
    networkMode: "always",
    retry: false,
    // Publishing on the hook keeps the snapshot update even if the triggering component re-renders.
    onSuccess: (result) => {
      if (result.kind === "reload") formRef.current?.reset();
      queryClient.setQueryData(QUEUE_QUERY_KEY, result.snapshot);
    },
  });

  const pending = action.isPending;
  const reloading = action.variables?.kind === "reload";
  const problem = action.isError ? asQueueProblem(action.error) : null;
  const canReload = reloading || problem?.kind === "conflict";
  const canBackUp = problem?.kind === "corrupt" || problem?.kind === "unsupported";
  const recoveryHint = problem && (RECOVERY_HINT[problem.kind] ?? (reloading ? "Your draft is still in the form." : null));

  useBlocker({
    withResolver: false,
    shouldBlockFn: ({ current, next }) => {
      const form = formRef.current;
      if (!form) return false;

      const nextSearch = queueSearchSchema.safeParse(next.search);
      const preservesEditor =
        next.pathname === current.pathname &&
        nextSearch.success &&
        nextSearch.data.ticket === ticket.source.TICKET_ID;
      if (preservesEditor) return false;

      if (pending) return true;
      if (!isDirty(form, ticket.status)) return false;

      return !window.confirm(
        "This ticket has unsaved changes. Leave the ticket and discard the draft?",
      );
    },
    enableBeforeUnload: () => {
      const form = formRef.current;
      return form !== null && (pending || isDirty(form, ticket.status));
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    action.mutate({
      kind: "save",
      input: {
        ticketId: ticket.source.TICKET_ID,
        expectedRevision: ticket.revision,
        form: new FormData(event.currentTarget),
      },
    });
  }

  function handleReload() {
    if (pending) return;
    const confirmed = window.confirm(
      "Copy your draft and any currently displayed saved notes you want to keep. Discard the draft and load this browser's current version?",
    );
    if (!confirmed) return;
    action.mutate({ kind: "reload" });
  }

  function clearDraftFeedback() {
    // Editing cannot clear a storage problem or refresh a stale revision.
    if (action.isSuccess || (!reloading && problem?.kind === "invalid")) action.reset();
  }

  function openStorageRecovery() {
    if (!window.confirm("Saved queue data became unreadable. Copy your unsaved note elsewhere first. Opening backup and reset will discard this draft. Continue?")) return;
    void queryClient.resetQueries({ queryKey: QUEUE_QUERY_KEY });
  }

  return (
    <div className="space-y-3">
      <form
        key={`${ticket.source.TICKET_ID}:${ticket.revision}`}
        ref={formRef}
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <fieldset disabled={pending} className="space-y-4">
          <legend className="sr-only">Record a ticket update</legend>
          <div className="space-y-1.5">
            <Label htmlFor="status">Status</Label>
            <NativeSelect
              id="status"
              name="status"
              defaultValue={ticket.status}
              aria-describedby="status-help"
              onChange={clearDraftFeedback}
            >
              {TICKET_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {STATUS_LABELS[status]}
                </option>
              ))}
            </NativeSelect>
            <p id="status-help" className="text-xs text-muted-foreground">
              To resolve, add a note explaining what was done.
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="note">Internal note</Label>
            <Textarea
              id="note"
              name="note"
              rows={2}
              defaultValue=""
              maxLength={1000}
              placeholder="E.g. Waiting for the warehouse to confirm receipt"
              aria-describedby="note-help"
              aria-invalid={!reloading && problem?.kind === "invalid" ? true : undefined}
              onInput={clearDraftFeedback}
            />
            <p id="note-help" className="text-xs text-muted-foreground">
              This saves to your browser only. Take the next step outside the queue.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit" disabled={pending}>
              {pending && !reloading ? "Saving…" : "Save update"}
            </Button>
            {pending ? (
              <span role="status" className="text-xs text-muted-foreground">
                {reloading ? "Loading the saved version…" : "Saving to this browser…"}
              </span>
            ) : null}
          </div>
        </fieldset>
      </form>

      {problem ? (
        <div role="alert" className="rounded-md border border-destructive/40 bg-destructive/5 px-3 py-2 text-sm">
          <p className="font-medium text-destructive">{reloading ? "Could not reload the saved version" : "The update was not saved"}</p>
          <p className="mt-1 text-foreground">{problem.message}</p>
          {recoveryHint ? <p className="mt-1 text-xs text-muted-foreground">{recoveryHint}</p> : null}
          {canReload || canBackUp ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {canReload ? <Button variant="outline" size="sm" onClick={handleReload}>Reload saved version</Button> : null}
              {canBackUp ? <Button variant="outline" size="sm" onClick={openStorageRecovery}>Open backup and reset options</Button> : null}
            </div>
          ) : null}
        </div>
      ) : null}

      {action.isSuccess ? (
        <p role="status" className="text-sm font-medium text-success">
          {action.data.kind === "reload" ? "Loaded the latest saved version." : action.data.saved
            ? "Saved. This update is stored in this browser."
            : "Nothing changed, so nothing was saved."}
        </p>
      ) : null}
    </div>
  );
}
