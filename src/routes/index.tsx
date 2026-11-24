import { useQuery } from "@tanstack/react-query";
import { Link, createRoute, useNavigate } from "@tanstack/react-router";

import { QueueLoadError } from "../components/queue-load-error";
import { QueueTable, type QueueRow } from "../components/queue-table";
import { TicketDetail } from "../components/ticket-detail";
import { buttonVariants } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { NativeSelect } from "../components/ui/native-select";
import { formatDayWithYear } from "../lib/dates";
import {
  HOUSE_RULES,
  POLICY_ASSUMPTIONS,
  SCENARIO_DAY,
  SCENARIO_DATE_ISO,
  assessTicket,
} from "../lib/policy";
import { queueQueryOptions } from "../lib/queue";
import { QUEUE_SORTS, QUEUE_VIEWS, queueSearchSchema, viewOf, type QueueSort, type QueueView } from "../lib/search";
import { cn } from "../lib/utils";
import { rootRoute } from "./__root";
import { QueueRouteError } from "./route-error";

const TAB_LABELS: Record<QueueView, string> = {
  all: "All tickets",
  active: "Active",
  resolved: "Resolved",
};

const SORT_LABELS: Record<QueueSort, string> = {
  priority: "Priority",
  "reply-deadline": "Customer reply deadline",
  newest: "Newest opened",
};

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  validateSearch: queueSearchSchema,
  errorComponent: QueueRouteError,
  component: QueuePage,
});

function sortRows(rows: QueueRow[], sort: QueueSort): QueueRow[] {
  return rows.sort((left, right) => {
    if (sort === "reply-deadline") {
      const a = left.assessment.facts.replyDueDay ?? Number.POSITIVE_INFINITY;
      const b = right.assessment.facts.replyDueDay ?? Number.POSITIVE_INFINITY;
      if (a !== b) return a - b;
    } else if (sort === "newest") {
      const byOpened = right.ticket.source.OPENED.localeCompare(left.ticket.source.OPENED);
      if (byOpened !== 0) return byOpened;
    }
    // Alternate sorts use the original reviewed order to break ties.
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
  const navigate = useNavigate({ from: indexRoute.fullPath });
  const view = viewOf(search);
  const sort = search.sort ?? "priority";
  const queue = useQuery(queueQueryOptions);

  if (queue.isError) {
    return <QueueLoadError error={queue.error} onRetry={() => void queue.refetch()} />;
  }

  const tickets = queue.data?.tickets ?? [];
  const rows = sortRows(tickets.map((ticket) => ({ ticket, assessment: assessTicket(ticket.source) })), sort);
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
        <h1 className="text-2xl font-semibold tracking-tight">LILA Support Queue</h1>
        <p className="text-sm text-muted-foreground">
          Exercise snapshot: {formatDayWithYear(SCENARIO_DAY)} · Statuses and notes stay in this browser.
        </p>
      </header>

      <div className="grid gap-4 py-4 xl:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] xl:items-start">
        <section id="ticket-list" tabIndex={-1} aria-label="Ticket queue" className="min-w-0 scroll-mt-4 space-y-3">
          <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-3">
            <nav aria-label="Queue view" className="flex flex-wrap items-center gap-1">
              {QUEUE_VIEWS.map((tab) => {
                const current = tab === view;
                const count = tab === "all" ? rows.length : tab === "active" ? activeCount : resolvedCount;
                return (
                  <Link
                    key={tab}
                    to="/"
                    search={(previous) => ({ ...previous, view: tab })}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      buttonVariants({ variant: current ? "default" : "ghost" }),
                      "min-h-10 gap-1.5 px-2.5 sm:min-h-9",
                      !current && "text-muted-foreground",
                    )}
                  >
                    {TAB_LABELS[tab]}
                    <span className="tabular-nums">{queue.isPending ? "–" : count}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="flex w-full items-center gap-2 sm:w-auto">
              <Label htmlFor="queue-sort" className="shrink-0">Sort by</Label>
              <NativeSelect
                id="queue-sort"
                className="h-10 sm:h-9"
                value={sort}
                disabled={queue.isPending}
                onChange={(event) => {
                  const next = QUEUE_SORTS.find((entry) => entry === event.target.value);
                  if (!next) return;
                  void navigate({
                    search: (previous) => ({ ...previous, sort: next === "priority" ? undefined : next }),
                    hash: true,
                    hashScrollIntoView: false,
                    resetScroll: false,
                  });
                }}
              >
                {QUEUE_SORTS.map((entry) => <option key={entry} value={entry}>{SORT_LABELS[entry]}</option>)}
              </NativeSelect>
            </div>
          </div>

          {queue.isPending ? (
            <div className="h-72 animate-pulse rounded-lg border border-border bg-muted/40" aria-busy="true" />
          ) : visibleRows.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>No tickets in this view</CardTitle>
                <CardDescription>
                  {view === "resolved"
                    ? "Tickets appear here after you save them as Resolved."
                    : "All tickets are marked Resolved in this browser."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  to="/"
                  search={(previous) => ({ ...previous, view: "all" })}
                  className={buttonVariants({ variant: "outline" })}
                >
                  Show all tickets
                </Link>
              </CardContent>
            </Card>
          ) : (
            <Card className="overflow-hidden">
              <QueueTable rows={visibleRows} selectedId={search.ticket} />
            </Card>
          )}
        </section>

        <aside id="ticket-detail" aria-label="Ticket detail" className="min-w-0 scroll-mt-4">
          {queue.isPending ? (
            <Card>
              <CardHeader>
                <CardTitle>Loading ticket detail</CardTitle>
                <CardDescription>Checking the bundled records before showing the selected ticket.</CardDescription>
              </CardHeader>
            </Card>
          ) : selected ? (
            <>
              <a href="#ticket-list" className="mb-2 inline-flex min-h-10 items-center text-sm font-medium text-primary underline underline-offset-4 xl:hidden">
                Back to ticket list
              </a>
              <TicketDetail key={selected.source.TICKET_ID} ticket={selected} tickets={tickets} />
            </>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No ticket selected</CardTitle>
                <CardDescription>Open a ticket to see the priority, next step and notes.</CardDescription>
              </CardHeader>
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

