import { useQuery } from "@tanstack/react-query";
import { Link, createRoute } from "@tanstack/react-router";

import { QueueLoadError } from "../components/queue-load-error";
import { QueueTable, type QueueRow } from "../components/queue-table";
import { TicketDetail } from "../components/ticket-detail";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { formatDayWithYear } from "../lib/dates";
import {
  HOUSE_RULES,
  POLICY_ASSUMPTIONS,
  SCENARIO_DAY,
  SCENARIO_DATE_ISO,
  assessTicket,
} from "../lib/policy";
import { queueQueryOptions } from "../lib/queue";
import { QUEUE_VIEWS, queueSearchSchema, viewOf, type QueueView } from "../lib/search";
import { rootRoute } from "./__root";
import { QueueRouteError } from "./route-error";

const TAB_LABELS: Record<QueueView, string> = {
  all: "All tickets",
  active: "Active",
  resolved: "Resolved",
};

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  validateSearch: queueSearchSchema,
  errorComponent: QueueRouteError,
  component: QueuePage,
});

function sortRows(rows: QueueRow[]): QueueRow[] {
  return rows.sort((left, right) => {
    if (left.assessment.rank !== right.assessment.rank) {
      return left.assessment.rank - right.assessment.rank;
    }
    const leftDue = left.assessment.facts.replyDueDay ?? Number.POSITIVE_INFINITY;
    const rightDue = right.assessment.facts.replyDueDay ?? Number.POSITIVE_INFINITY;
    if (leftDue !== rightDue) return leftDue - rightDue;
    return left.ticket.source.TICKET_ID.localeCompare(right.ticket.source.TICKET_ID);
  });
}

function QueuePage() {
  const search = indexRoute.useSearch();
  const view = viewOf(search);
  const queue = useQuery(queueQueryOptions);

  if (queue.isError) {
    return <QueueLoadError error={queue.error} onRetry={() => void queue.refetch()} />;
  }

  const tickets = queue.data?.tickets ?? [];
  const rows = sortRows(tickets.map((ticket) => ({ ticket, assessment: assessTicket(ticket.source) })));
  const activeCount = rows.filter((row) => row.ticket.status !== "resolved").length;
  const resolvedCount = rows.length - activeCount;
  const visibleRows =
    view === "all"
      ? rows
      : rows.filter((row) => (view === "resolved" ? row.ticket.status === "resolved" : row.ticket.status !== "resolved"));
  const selected = search.ticket
    ? tickets.find((ticket) => ticket.source.TICKET_ID === search.ticket)
    : undefined;

  return (
    <main className="mx-auto w-full max-w-[100rem] px-4 pb-12">
      <header className="flex flex-col gap-1 border-b border-border py-6">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          LILA support · taking over the queue
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">Monday queue</h1>
        <p className="text-sm text-muted-foreground">
          {formatDayWithYear(SCENARIO_DAY)} · {queue.isPending ? "loading twelve tickets" : `${rows.length} tickets`} ·{" "}
          {activeCount} active, {resolvedCount} resolved · saved statuses and notes stay in this browser
        </p>
      </header>

      <div className="grid gap-4 py-4 xl:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] xl:items-start">
        <section aria-label="Ticket queue" className="min-w-0 space-y-3">
          <nav aria-label="Queue view" className="flex flex-wrap items-center gap-1">
            {QUEUE_VIEWS.map((tab) => {
              const current = tab === view;
              const count = tab === "all" ? rows.length : tab === "active" ? activeCount : resolvedCount;
              return (
                <Link
                  key={tab}
                  to="/"
                  search={{ view: tab, ticket: search.ticket }}
                  aria-current={current ? "page" : undefined}
                  className={[
                    "inline-flex h-8 items-center gap-1.5 rounded-md px-3 text-sm",
                    current ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted",
                  ].join(" ")}
                >
                  {TAB_LABELS[tab]}
                  <span className={current ? "text-primary-foreground/80" : "text-muted-foreground/80"}>
                    {queue.isPending ? "–" : count}
                  </span>
                </Link>
              );
            })}
          </nav>

          {queue.isPending ? (
            <div className="h-72 animate-pulse rounded-lg border border-border bg-muted/40" aria-busy="true" />
          ) : visibleRows.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>No tickets in this view</CardTitle>
                <CardDescription>
                  {view === "resolved"
                    ? "Nothing has been resolved yet in this browser. Saved statuses decide this list."
                    : "Every ticket is currently resolved. Nothing is waiting."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  to="/"
                  search={{ view: "all", ticket: search.ticket }}
                  className="text-sm text-primary underline underline-offset-4"
                >
                  Show all tickets
                </Link>
              </CardContent>
            </Card>
          ) : (
            <Card className="overflow-hidden">
              <QueueTable rows={visibleRows} selectedId={search.ticket} view={view} />
            </Card>
          )}

          <p className="text-xs text-muted-foreground">
            Ordered by deadline pressure, broken commitments, and unanswered replies — each row states its
            reason. A selected ticket stays open when the list filter changes.
          </p>
        </section>

        <aside id="ticket-detail" aria-label="Ticket detail" className="min-w-0 scroll-mt-4 xl:sticky xl:top-4">
          {queue.isPending ? (
            <Card>
              <CardHeader>
                <CardTitle>Loading ticket detail</CardTitle>
                <CardDescription>Checking the bundled records before showing the selected ticket.</CardDescription>
              </CardHeader>
            </Card>
          ) : selected ? (
            <TicketDetail key={selected.source.TICKET_ID} ticket={selected} tickets={tickets} view={view} />
          ) : search.ticket ? (
            <Card>
              <CardHeader>
                <CardTitle>That ticket is not in the loaded queue</CardTitle>
                <CardDescription>
                  {search.ticket} is not one of the twelve supplied records, so nothing is selected for you
                  instead.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Link
                  to="/"
                  search={{ view }}
                  className="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
                >
                  Return to queue
                </Link>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No ticket selected</CardTitle>
                <CardDescription>
                  Choose a ticket to read its source facts, the reason for its position, related cases, and to
                  record a status or an internal note.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>
                  The twelve records come from the supplied spreadsheet. Their facts never change in this
                  tool.
                </p>
                <p>
                  Statuses and notes you save are kept in this browser only, and nothing here contacts a
                  customer, a carrier, or the warehouse.
                </p>
              </CardContent>
            </Card>
          )}
        </aside>
      </div>

      <footer className="border-t border-border pt-4">
        <details>
          <summary className="cursor-pointer text-sm font-medium">How priority and deadlines are decided</summary>
          <div className="mt-3 grid gap-4 text-xs text-muted-foreground sm:grid-cols-2">
            <div>
              <h2 className="mb-1 text-xs font-semibold tracking-wide text-foreground uppercase">House rules</h2>
              <ul className="space-y-1">
                {HOUSE_RULES.map((rule) => (
                  <li key={rule} className="flex gap-2">
                    <span aria-hidden="true">·</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-1 text-xs font-semibold tracking-wide text-foreground uppercase">
                Stated assumptions
              </h2>
              <ul className="space-y-1">
                {POLICY_ASSUMPTIONS.map((assumption) => (
                  <li key={assumption} className="flex gap-2">
                    <span aria-hidden="true">·</span>
                    <span>{assumption}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-3 text-[0.7rem] text-muted-foreground">
            Snapshot date {SCENARIO_DATE_ISO}. Every person, ticket, and rule here is invented for the
            exercise. The queue is a reading of the snapshot plus your saved updates, not a live support
            system, and nothing here is proof that a reply, claim, shipment, or refund happened.
          </p>
        </details>
      </footer>
    </main>
  );
}

