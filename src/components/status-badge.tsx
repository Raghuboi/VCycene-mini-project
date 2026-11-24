import { Badge, type BadgeProps } from "./ui/badge";
import type { TicketAssessment } from "../lib/policy";
import { STATUS_LABELS, type TicketStatus } from "../lib/status";

const STATUS_VARIANT = {
  open: "info",
  waiting_on_us: "warning",
  waiting_on_customer: "outline",
  waiting_on_engineering: "outline",
  waiting_on_warehouse: "outline",
  waiting_on_fulfillment: "outline",
  waiting_on_manager: "outline",
  resolved: "success",
} satisfies Record<TicketStatus, BadgeProps["variant"]>;

const BAND_VARIANT = {
  First: "default",
  High: "warning",
  Overdue: "danger",
  "Due today": "muted",
} satisfies Record<TicketAssessment["band"], BadgeProps["variant"]>;

export function StatusBadge({ status }: { status: TicketStatus }) {
  return <Badge variant={STATUS_VARIANT[status]}>{STATUS_LABELS[status]}</Badge>;
}

export function BandBadge({ band }: { band: TicketAssessment["band"] }) {
  return <Badge variant={BAND_VARIANT[band]}>{band === "First" ? "Top priority" : band}</Badge>;
}
