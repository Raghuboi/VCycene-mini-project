import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import type { ReactNode } from "react";

import { BandBadge, StatusBadge } from "./status-badge";
import { StatusEditor } from "./status-editor";
import { RelatedCases } from "./related-cases";
import { formatDay, formatDayWithYear, formatStamp, parseCalendarDate } from "../lib/dates";
import { assessTicket, SCENARIO_DATE_ISO, SCENARIO_DAY } from "../lib/policy";
import type { CommittedTicket } from "../lib/queue";
import type { QueueView } from "../lib/search";
import { STATUS_LABELS } from "../lib/status";

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="text-[0.7rem] font-medium tracking-wide text-muted-foreground uppercase">{label}</dt>
      <dd className="mt-0.5 text-sm text-foreground">{children}</dd>
    </div>
  );
}

export function TicketDetail({
  ticket,
  tickets,
  view,
}: {
  ticket: CommittedTicket;
  tickets: readonly CommittedTicket[];
  view: QueueView;
}) {
  const assessment = assessTicket(ticket.source);
  const source = ticket.source;
  const deliveredDay = assessment.facts.deliveredDay;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="font-mono text-xs text-muted-foreground">{source.TICKET_ID}</p>
              <CardTitle className="text-base">
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
            <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Why this ticket comes here
            </h3>
            <p className="mt-1 text-sm text-foreground">{assessment.headline}</p>
            <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
              {assessment.timing.map((line) => (
                <li key={line} className="flex gap-2">
                  <span aria-hidden="true">·</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-md border border-border/70 bg-muted/40 px-3 py-2">
            <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Suggested next step
            </h3>
            <p className="mt-1 text-sm text-foreground">{assessment.nextAction}</p>
            <p className="mt-1 text-[0.7rem] text-muted-foreground">
              A recommendation for a person. This tool contacts nobody and performs no support action.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Source record — unchanged</CardTitle>
          <CardDescription>
            Copied from the supplied spreadsheet. Editing a status or note never rewrites these fields.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-3 sm:grid-cols-2">
            <Fact label="Opened">{formatDayWithYear(parseCalendarDate(source.OPENED))}</Fact>
            <Fact label="Delivered">
              {formatDayWithYear(deliveredDay)}{" "}
              <span className="text-xs text-muted-foreground">
                ({assessment.facts.ageDays} days before {formatDay(SCENARIO_DAY)})
              </span>
            </Fact>
            <Fact label="Country">{source.COUNTRY}</Fact>
            <Fact label="Firmware">{source.FIRMWARE}</Fact>
            <Fact label="Status in source">
              {source.STATUS}{" "}
              <span className="text-xs text-muted-foreground">
                (recorded here as {STATUS_LABELS[ticket.sourceStatus]})
              </span>
            </Fact>
            <Fact label="Last message">
              {source.LAST_REPLY_FROM === "customer" ? "From the customer" : "From support"} on{" "}
              {formatDayWithYear(parseCalendarDate(source.LAST_REPLY_DATE))}
            </Fact>
            <Fact label="Reply deadline">
              {assessment.facts.replyDueDay === null
                ? "Not applicable — the last message was ours"
                : `${formatDay(assessment.facts.replyDueDay)} under the 1-business-day rule`}
            </Fact>
            <Fact label="Source note">{source.NOTES.length > 0 ? source.NOTES : "None in the source."}</Fact>
          </dl>
          <p className="mt-3 border-t border-border/70 pt-2 text-[0.7rem] text-muted-foreground">
            Scenario date {SCENARIO_DATE_ISO}. Deadlines are initial snapshot annotations calculated with
            the stated assumptions, not live timers.
          </p>
        </CardContent>
      </Card>

      <RelatedCases ticket={ticket} tickets={tickets} view={view} />

      <Card>
        <CardHeader>
          <CardTitle>Saved notes</CardTitle>
          <CardDescription>
            Stored in this browser with real timestamps. The source note above is never modified.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {ticket.notes.length === 0 ? (
            <p className="text-sm text-muted-foreground">No saved notes for this ticket yet.</p>
          ) : (
            <ol className="space-y-2">
              {ticket.notes.map((note, index) => (
                <li key={`${note.createdAt}-${index}`} className="rounded-md border border-border/70 px-3 py-2">
                  <p className="text-[0.7rem] text-muted-foreground">{formatStamp(note.createdAt)}</p>
                  <p className="mt-0.5 text-sm text-foreground">{note.text}</p>
                </li>
              ))}
            </ol>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Record an update</CardTitle>
          <CardDescription>
            Change the status, add an internal note, or both. Only a saved update is kept.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StatusEditor key={source.TICKET_ID} ticket={ticket} />
        </CardContent>
      </Card>
    </div>
  );
}
