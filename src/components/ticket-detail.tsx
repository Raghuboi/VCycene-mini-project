import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import type { ReactNode } from "react";

import { BandBadge, StatusBadge } from "./status-badge";
import { StatusEditor } from "./status-editor";
import { RelatedCases } from "./related-cases";
import { DamageClaimEmailActions } from "./damage-claim-email-actions";
import { formatDayWithYear, formatStamp, parseCalendarDate } from "../lib/dates";
import { assessTicket } from "../lib/policy";
import type { CommittedTicket } from "../lib/queue";

function focusSelectedTitle(node: HTMLHeadingElement | null) {
  // The ticket pane is below the queue on narrow screens. A URL/hash scroll
  // alone leaves keyboard and screen-reader focus on the old queue link.
  if (window.location.hash === "#ticket-detail") node?.focus({ preventScroll: true });
}

function SourceFact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[7rem_minmax(0,1fr)] gap-2 py-1">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-foreground">{children}</dd>
    </div>
  );
}

export function TicketDetail({
  ticket,
  tickets,
}: {
  ticket: CommittedTicket;
  tickets: readonly CommittedTicket[];
}) {
  const assessment = assessTicket(ticket.source);
  const source = ticket.source;
  const sourceDate = (iso: string) => formatDayWithYear(parseCalendarDate(iso));

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="font-mono text-xs text-muted-foreground">{source.TICKET_ID}</p>
              <CardTitle className="text-base focus-visible:ring-offset-0" tabIndex={-1} ref={focusSelectedTitle}>
                {source.CUSTOMER} <span className="font-normal text-muted-foreground">· {source.COUNTRY}</span>
              </CardTitle>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <BandBadge band={assessment.band} />
              <StatusBadge status={ticket.status} />
            </div>
          </div>
          <p className="text-sm text-foreground">{source.ISSUE}</p>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h3 className="text-sm font-semibold">Why it was prioritized</h3>
            <p className="mt-1 text-sm text-foreground">{assessment.headline}</p>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-muted-foreground">
              {assessment.timing.map((line) => <li key={line}>{line}</li>)}
            </ul>
          </div>
          <div className="border-t border-border pt-3">
            <h3 className="text-sm font-semibold">{ticket.status === "resolved" ? "Original next step" : "Next step"}</h3>
            <p className="mt-1 text-pretty text-sm text-foreground">{assessment.nextAction}</p>
            {source.TICKET_ID === "T-104" && <DamageClaimEmailActions />}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle id="ticket-update">Record an update</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <StatusEditor ticket={ticket} />
          <section aria-labelledby="saved-notes" className="space-y-2 border-t border-border pt-3">
            <h3 id="saved-notes" className="text-sm font-semibold">Saved notes</h3>
            {ticket.notes.length === 0 ? (
              <p className="text-sm text-muted-foreground">No saved notes yet.</p>
            ) : (
              <ol className="divide-y divide-border">
                {ticket.notes.map((note, index) => (
                  <li key={`${note.createdAt}-${index}`} className="py-2 first:pt-0">
                    <time dateTime={note.createdAt} className="text-xs text-muted-foreground">{formatStamp(note.createdAt)}</time>
                    <p className="mt-0.5 text-sm break-words text-foreground">{note.text}</p>
                  </li>
                ))}
              </ol>
            )}
          </section>
        </CardContent>
      </Card>

      <RelatedCases ticket={ticket} tickets={tickets} />

      <Card>
        <CardHeader>
          <CardTitle>Source record</CardTitle>
          <p className="text-sm text-foreground"><span className="font-medium">Original note: </span>{source.NOTES || "None."}</p>
        </CardHeader>
        <CardContent>
          <details>
            <summary className="w-fit cursor-pointer text-sm font-medium text-primary">Original ticket fields</summary>
            <dl className="mt-2 divide-y divide-border text-sm">
              <SourceFact label="Opened">{sourceDate(source.OPENED)}</SourceFact>
              <SourceFact label="Delivered">{sourceDate(source.DELIVERED)}</SourceFact>
              <SourceFact label="Country">{source.COUNTRY}</SourceFact>
              <SourceFact label="Firmware">{source.FIRMWARE}</SourceFact>
              <SourceFact label="Original status">{source.STATUS}</SourceFact>
              <SourceFact label="Last message">
                {source.LAST_REPLY_FROM === "customer" ? "Customer" : "Support"}, {sourceDate(source.LAST_REPLY_DATE)}
              </SourceFact>
            </dl>
          </details>
        </CardContent>
      </Card>
    </div>
  );
}
