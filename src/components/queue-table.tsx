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
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="w-[16rem]">Ticket</TableHead>
          <TableHead className="min-w-[16rem]">Issue</TableHead>
          <TableHead className="min-w-[18rem]">Why it comes first</TableHead>
          <TableHead className="w-[10rem]">Reply timing</TableHead>
          <TableHead className="w-[10rem]">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(({ ticket, assessment }) => {
          const ticketId = ticket.source.TICKET_ID;
          const selected = ticketId === selectedId;
          const timing = replyTimingLabel(ticket.source);

          return (
            <TableRow key={ticketId} data-state={selected ? "selected" : undefined}>
              <TableCell>
                <Link
                  to="/"
                  search={{ ticket: ticketId, view }}
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
              </TableCell>
              <TableCell>
                <p className="line-clamp-2 text-foreground">{ticket.source.ISSUE}</p>
              </TableCell>
              <TableCell>
                <div className="mb-1 flex items-center gap-2">
                  <BandBadge band={assessment.band} />
                </div>
                <p className="line-clamp-2 text-xs text-muted-foreground">{assessment.headline}</p>
              </TableCell>
              <TableCell>
                <span className={`text-xs ${TIMING_TONE[timing.tone]}`}>{timing.label}</span>
              </TableCell>
              <TableCell className="whitespace-nowrap">
                <StatusBadge status={ticket.status} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
