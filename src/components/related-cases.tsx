import { Link } from "@tanstack/react-router";

import { relatedCasesFor, type RelatedCase } from "../lib/policy";
import type { CommittedTicket } from "../lib/queue";
import type { QueueView } from "../lib/search";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

function RelatedTicketList({
  tickets,
  currentId,
  view,
}: {
  tickets: RelatedCase["tickets"];
  currentId: string;
  view: QueueView;
}) {
  const others = tickets.filter((ticket) => ticket.TICKET_ID !== currentId);

  return (
    <ul className="mt-2 space-y-2">
      {others.map((ticket) => (
        <li key={ticket.TICKET_ID} className="rounded-md border border-border/70 bg-muted/40 px-3 py-2">
          <Link
            to="/"
            search={{ ticket: ticket.TICKET_ID, view }}
            hash="ticket-detail"
            className="font-mono text-xs font-semibold text-primary underline-offset-4 hover:underline"
          >
            {ticket.TICKET_ID}
          </Link>
          <span className="ml-2 text-xs text-muted-foreground">{ticket.CUSTOMER}</span>
          <p className="mt-1 text-xs text-foreground">{ticket.ISSUE}</p>
          <p className="mt-0.5 text-[0.7rem] text-muted-foreground">
            Delivered {ticket.DELIVERED} · firmware {ticket.FIRMWARE} · status in source: {ticket.STATUS}
          </p>
        </li>
      ))}
    </ul>
  );
}

export function RelatedCases({
  ticket,
  tickets,
  view,
}: {
  ticket: CommittedTicket;
  tickets: readonly CommittedTicket[];
  view: QueueView;
}) {
  const { related, exclusions } = relatedCasesFor(
    ticket.source,
    tickets.map((entry) => entry.source),
  );

  if (related.length === 0 && exclusions.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Related cases</CardTitle>
        <CardDescription>
          Links between records, shown from the source facts. Linking never closes, merges, or resolves a ticket.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {related.map((group) => (
          <div key={group.kind}>
            <h3 className="text-xs font-semibold tracking-wide text-foreground uppercase">{group.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{group.explanation}</p>
            <RelatedTicketList tickets={group.tickets} currentId={ticket.source.TICKET_ID} view={view} />
          </div>
        ))}

        {exclusions.map((exclusion) => (
          <div key={exclusion.reason} className="rounded-md border border-dashed border-border px-3 py-2">
            <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Considered and not grouped
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">{exclusion.reason}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
