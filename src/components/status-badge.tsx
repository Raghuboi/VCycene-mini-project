import { Badge } from "./ui/badge";
import { STATUS_LABELS, type TicketStatus } from "../lib/status";

const STATUS_VARIANT: Record<
  TicketStatus,
  "default" | "secondary" | "outline" | "success" | "warning" | "danger" | "muted"
> = {
  open: "danger",
  waiting_on_us: "warning",
  waiting_on_customer: "secondary",
  waiting_on_engineering: "outline",
  waiting_on_warehouse: "outline",
  waiting_on_fulfillment: "outline",
  waiting_on_manager: "outline",
  resolved: "success",
};

export function StatusBadge({ status }: { status: TicketStatus }) {
  return <Badge variant={STATUS_VARIANT[status]}>{STATUS_LABELS[status]}</Badge>;
}

export function BandBadge({ band }: { band: "First" | "High" | "Overdue" | "Due today" }) {
  const variant = band === "First" ? "danger" : band === "High" ? "warning" : band === "Overdue" ? "outline" : "muted";
  return <Badge variant={variant}>{band}</Badge>;
}
