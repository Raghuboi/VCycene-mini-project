import { useMutation, useQueryClient } from "@tanstack/react-query";

import { asQueueProblem } from "../lib/edits";
import { QUEUE_QUERY_KEY, resetStoredEdits } from "../lib/queue";
import { Button } from "./ui/button";

const TITLES = {
  corrupt: "Saved queue data could not be read",
  unsupported: "Saved queue data is from a different version",
  inaccessible: "This browser blocked access to the saved queue",
  source: "The bundled ticket CSV could not be loaded",
  "write-failed": "The stored queue data could not be updated",
  conflict: "The stored queue data changed",
  invalid: "The stored queue data is not usable",
} as const;

function downloadBackup(raw: string) {
  const blob = new Blob([raw], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "vcycene-queue-edits-backup.json";
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function QueueLoadError({ error, onRetry }: { error: unknown; onRetry: () => void }) {
  const queryClient = useQueryClient();
  const problem = asQueueProblem(error);

  const reset = useMutation({
    mutationFn: async () => resetStoredEdits(),
    networkMode: "always",
    retry: false,
    onSuccess: (snapshot) => {
      queryClient.setQueryData(QUEUE_QUERY_KEY, snapshot);
    },
  });

  const title = TITLES[problem.kind];
  const hasBackup = problem.raw !== undefined;
  const canReset = hasBackup && (problem.kind === "corrupt" || problem.kind === "unsupported");

  function handleReset() {
    const confirmed = window.confirm(
      "This removes only this app's saved queue edits in this browser and returns to the original twelve tickets. Continue?",
    );
    if (!confirmed) return;
    reset.mutate();
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-center gap-4 px-4 py-16">
      <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Monday queue</p>
      <h1 className="text-xl font-semibold">{title}</h1>

      {problem.kind === "corrupt" || problem.kind === "unsupported" ? (
        <p className="text-sm text-muted-foreground">
          Nothing was overwritten. The stored value is still in this browser, and the queue is not showing
          an empty list in its place.
        </p>
      ) : null}

      <p className="rounded-md border border-border bg-muted/60 px-3 py-2 font-mono text-xs text-muted-foreground">
        {problem.message}
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={onRetry}>Try again</Button>
        {hasBackup ? (
          <Button variant="outline" onClick={() => downloadBackup(problem.raw ?? "")}>
            Download a backup of the stored value
          </Button>
        ) : null}
      </div>

      {canReset ? (
        <form onSubmit={(event) => { event.preventDefault(); handleReset(); }} className="space-y-3 rounded-md border border-border px-3 py-3">
          <p className="text-sm text-foreground">
            Resetting is separate from the backup. Download the backup first, then confirm below.
          </p>
          <label className="flex items-start gap-2 text-sm text-muted-foreground">
            <input type="checkbox" name="backedUp" required className="mt-0.5" />
            <span>I have downloaded the backup of the stored value.</span>
          </label>
          <Button type="submit" variant="outline" disabled={reset.isPending}>
            {reset.isPending ? "Resetting…" : "Reset this app's saved edits"}
          </Button>
          {reset.isError ? (
            <p role="alert" className="text-sm text-destructive">
              Reset failed: {asQueueProblem(reset.error).message} The saved value was not replaced.
            </p>
          ) : null}
        </form>
      ) : null}

      {problem.kind === "inaccessible" ? (
        <p className="text-sm text-muted-foreground">
          The stored value cannot be read, so it cannot be backed up and reset stays unavailable. Check the
          browser's storage permissions for this site, then try again.
        </p>
      ) : null}
    </main>
  );
}
