import { Link } from "@tanstack/react-router";

import { replyTimingLabel, type TicketAssessment } from "../lib/policy";
import type { CommittedTicket } from "../lib/queue";
import type { QueueView } from "../lib/search";
import { BandBadge, StatusBadge } from "./status-badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

export type QueueRow = { ticket: CommittedTicket; assessment: TicketAssessment };

const TIMING_TONE: Record<"danger" | "warning" | "neutral", string> = {
  danger: "font-medium text-destructive",
  warning: "font-medium text-warning-foreground",
  neutral: "text-muted-foreground",
};

export function QueueTable({
  rows,
  selectedId,
  view,
}: {
  rows: readonly QueueRow[];
  selectedId?: string;
  view: QueueView;
}) {
  return (
    <Table className="queue-table" role="table" aria-label="Prioritized tickets">
      <TableHeader role="rowgroup">
        <TableRow role="row" className="hover:bg-transparent">
          <TableHead className="w-[13rem]">Ticket and issue</TableHead>
          <TableHead className="min-w-[14rem]">Why it comes first</TableHead>
          <TableHead className="w-[7rem]">Reply timing</TableHead>
          <TableHead className="w-[8rem]">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody role="rowgroup">
        {rows.map(({ ticket, assessment }) => {
          const ticketId = ticket.source.TICKET_ID;
          const selected = ticketId === selectedId;
          const timing = replyTimingLabel(ticket.source);

          return (
            <TableRow role="row" key={ticketId} data-state={selected ? "selected" : undefined}>
              <TableCell role="cell">
                <Link
                  to="/"
                  search={{ ticket: ticketId, view }}
                  hash="ticket-detail"
                  aria-current={selected ? "true" : undefined}
                  className="font-mono text-xs font-semibold text-primary underline-offset-4 hover:underline"
                >
                  {ticketId}
                </Link>
                <div className="mt-0.5 font-medium">{ticket.source.CUSTOMER}</div>
                <div className="text-xs text-muted-foreground">
                  {ticket.source.COUNTRY} · firmware {ticket.source.FIRMWARE}
                  {ticket.revision > 0 ? " · saved update" : ""}
                </div>
                <span className="text-[0.7rem] font-semibold uppercase text-muted-foreground sm:hidden">Issue</span>
                <p className="mt-1 line-clamp-2 text-foreground">{ticket.source.ISSUE}</p>
              </TableCell>
              <TableCell role="cell">
                <span className="text-[0.7rem] font-semibold uppercase text-muted-foreground sm:hidden">Why it comes first</span>
                <div className="mb-1 flex items-center gap-2">
                  <BandBadge band={assessment.band} />
                </div>
                <p className="line-clamp-2 text-xs text-muted-foreground">{assessment.headline}</p>
                {assessment.facts.claimWindowClosesDay !== null ? (
                  <p className="mt-1 text-xs font-medium text-destructive">{assessment.timing[0]}</p>
                ) : null}
              </TableCell>
              <TableCell role="cell">
                <span className="mr-2 text-[0.7rem] font-semibold uppercase text-muted-foreground sm:hidden">Reply timing</span>
                <span className={`text-xs ${TIMING_TONE[timing.tone]}`}>{timing.label}</span>
              </TableCell>
              <TableCell role="cell" className="whitespace-nowrap">
                <span className="mr-2 text-[0.7rem] font-semibold uppercase text-muted-foreground sm:hidden">Status</span>
                <StatusBadge status={ticket.status} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
