import { Link } from "@tanstack/react-router";

import { relatedCasesFor, type RelatedCase } from "../lib/policy";
import type { CommittedTicket } from "../lib/queue";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

function RelatedTicketList({
  tickets,
  currentId,
}: {
  tickets: RelatedCase["tickets"];
  currentId: string;
}) {
  const others = tickets.filter((ticket) => ticket.TICKET_ID !== currentId);

  return (
    <ul className="mt-2 divide-y divide-border">
      {others.map((ticket) => (
        <li key={ticket.TICKET_ID} className="relative isolate cursor-pointer px-2 py-2 hover:bg-muted/70">
          <Link
            to="/"
            search={(previous) => ({ ...previous, ticket: ticket.TICKET_ID })}
            hash="ticket-detail"
            aria-label={`Open ${ticket.TICKET_ID}: ${ticket.CUSTOMER}`}
            className="text-sm text-primary underline underline-offset-4 after:absolute after:inset-0 after:content-[''] focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-ring"
          >
            <span className="font-mono font-semibold">{ticket.TICKET_ID}</span>
            <span className="ml-2 font-medium">{ticket.CUSTOMER}</span>
          </Link>
          <p className="mt-1 text-xs text-foreground">{ticket.ISSUE}</p>
        </li>
      ))}
    </ul>
  );
}

export function RelatedCases({
  ticket,
  tickets,
}: {
  ticket: CommittedTicket;
  tickets: readonly CommittedTicket[];
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
      </CardHeader>
      <CardContent className="space-y-4">
        {related.map((group) => (
          <div key={group.kind}>
            <h3 className="text-sm font-semibold">{group.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{group.explanation}</p>
            <RelatedTicketList tickets={group.tickets} currentId={ticket.source.TICKET_ID} />
          </div>
        ))}

        {exclusions.map((exclusion) => (
          <div key={exclusion.reason}>
            <h3 className="text-sm font-semibold">Outside the firmware group</h3>
            <p className="mt-1 text-xs text-muted-foreground">{exclusion.reason}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
