const DAY_MS = 86_400_000;

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

/** Calendar dates are held as UTC midnight so no local offset can shift a policy date. */
export function parseCalendarDate(iso: string): number {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) throw new Error(`Not a calendar date: ${iso}`);
  return Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

export function addDays(day: number, days: number): number {
  return day + days * DAY_MS;
}

export function daysBetween(from: number, to: number): number {
  return Math.round((to - from) / DAY_MS);
}

export function formatDay(day: number): string {
  const date = new Date(day);
  return `${MONTH_NAMES[date.getUTCMonth()] ?? ""} ${date.getUTCDate()}`;
}

export function formatDayWithYear(day: number): string {
  const date = new Date(day);
  return `${MONTH_NAMES[date.getUTCMonth()] ?? ""} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}

export function dayCount(count: number): string {
  return `${count} ${count === 1 ? "day" : "days"}`;
}

function isBusinessDay(day: number): boolean {
  const weekday = new Date(day).getUTCDay();
  return weekday !== 0 && weekday !== 6;
}

/**
 * Next Monday-Friday after the inbound date. The exercise supplies no holiday calendar,
 * so a Friday, Saturday, or Sunday message is due Monday and a Monday message is due Tuesday.
 */
export function nextBusinessDay(day: number): number {
  let next = addDays(day, 1);
  while (!isBusinessDay(next)) next = addDays(next, 1);
  return next;
}

/** Wall-clock time of a real device event, kept separate from the fixed scenario date. */
export function formatStamp(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.valueOf())) return iso;
  return date.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}
