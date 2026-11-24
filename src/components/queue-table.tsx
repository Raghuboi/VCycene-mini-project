import { Link } from "@tanstack/react-router";

import { replyTimingLabel, type TicketAssessment } from "../lib/policy";
import type { CommittedTicket } from "../lib/queue";
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
}: {
  rows: readonly QueueRow[];
  selectedId?: string;
}) {
  return (
    <Table className="queue-table" role="table" aria-label="Tickets">
      <TableHeader role="rowgroup">
        <TableRow role="row" className="hover:bg-transparent">
          <TableHead className="w-[13rem]">Ticket and issue</TableHead>
          <TableHead className="min-w-[14rem]">Priority and reason</TableHead>
          <TableHead className="w-[7rem] min-[1440px]:w-[9.5rem]">Reply timing</TableHead>
          <TableHead className="w-[8rem]">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody role="rowgroup">
        {rows.map(({ ticket, assessment }) => {
          const ticketId = ticket.source.TICKET_ID;
          const selected = ticketId === selectedId;
          const timing = replyTimingLabel(ticket.source);
          const claimDaysLeft = assessment.facts.claimDaysLeft;

          return (
            <TableRow role="row" key={ticketId} data-state={selected ? "selected" : undefined} className="relative isolate cursor-pointer duration-100 data-[state=selected]:bg-accent data-[state=selected]:hover:bg-accent motion-reduce:transition-none">
              <TableCell role="cell">
                {/* Stretch the one native ticket link across the row, without adding a second tab stop. */}
                <Link
                  to="/"
                  search={(previous) => ({ ...previous, ticket: ticketId })}
                  hash="ticket-detail"
                  aria-label={`Open ${ticketId}: ${ticket.source.CUSTOMER}`}
                  aria-current={selected ? "true" : undefined}
                  className="text-primary underline underline-offset-4 after:absolute after:inset-0 after:content-[''] focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-ring"
                >
                  <span className="flex flex-wrap items-center gap-x-2 text-xs font-semibold">
                    <span className="font-mono">{ticketId}</span>
                    {selected ? <span aria-hidden="true" className="font-sans text-accent-foreground">Selected</span> : null}
                  </span>
                  <span className="mt-0.5 block font-medium underline">{ticket.source.CUSTOMER}</span>
                </Link>
                {ticket.revision > 0 ? <p className="text-xs text-muted-foreground">Saved update</p> : null}
                <span className="text-[0.7rem] font-semibold uppercase text-muted-foreground sm:hidden">Issue</span>
                <p className="mt-1 line-clamp-2 text-foreground">{ticket.source.ISSUE}</p>
              </TableCell>
              <TableCell role="cell">
                <span className="text-[0.7rem] font-semibold uppercase text-muted-foreground sm:hidden">Priority and reason</span>
                <div className="mb-1 flex items-center gap-2">
                  <BandBadge band={assessment.band} />
                </div>
                <p className="line-clamp-2 text-xs text-muted-foreground">{assessment.headline}</p>
                {claimDaysLeft !== null ? (
                  <p className={`mt-1 text-xs ${TIMING_TONE[claimDaysLeft <= 1 ? "danger" : "neutral"]}`}>
                    {assessment.timing[0]}
                  </p>
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
