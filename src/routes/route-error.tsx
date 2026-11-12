import { Link } from "@tanstack/react-router";

function describeError(error: unknown): { title: string; detail: string | null } {
  const message = error instanceof Error ? error.message : String(error);

  try {
    const parsed: unknown = JSON.parse(message);
    if (Array.isArray(parsed) && parsed.length > 0) {
      const issue = parsed[0] as { message?: unknown; path?: unknown };
      const text = typeof issue.message === "string" ? issue.message : "the value is not recognised";
      const path = Array.isArray(issue.path) ? issue.path.join(".") : "";
      return {
        title: "This link does not point to a queue view.",
        detail: path ? `${path}: ${text}` : text,
      };
    }
  } catch {
    // Not a search-parameter error; fall through to the generic message.
  }

  return { title: "This page could not be shown.", detail: message };
}

export function QueueRouteError({ error }: { error: unknown }) {
  const { title, detail } = describeError(error);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-center gap-4 px-4 py-16">
      <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Monday queue</p>
      <h1 className="text-xl font-semibold">{title}</h1>
      <p className="text-sm text-muted-foreground">
        Ticket selections look like <code className="font-mono">?ticket=T-104</code> and the view is{" "}
        <code className="font-mono">all</code>, <code className="font-mono">active</code>, or{" "}
        <code className="font-mono">resolved</code>. Nothing was changed.
      </p>
      {detail ? (
        <p className="rounded-md border border-border bg-muted/60 px-3 py-2 font-mono text-xs text-muted-foreground">
          {detail}
        </p>
      ) : null}
      <div>
        <Link
          to="/"
          search={{ view: "all" }}
          className="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
        >
          Return to queue
        </Link>
      </div>
    </main>
  );
}
