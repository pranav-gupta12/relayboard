const TIME_FORMATTER = new Intl.DateTimeFormat("en", {
  hour: "numeric",
  minute: "2-digit",
});

const DATE_FORMATTER = new Intl.DateTimeFormat("en", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

const RELATIVE_FORMATTER = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

export function formatTime(value: string): string {
  return TIME_FORMATTER.format(new Date(value));
}

export function formatDate(value: Date): string {
  return DATE_FORMATTER.format(value);
}

export function formatRelativeTime(value: string, now = new Date()): string {
  const minutes = Math.round((new Date(value).getTime() - now.getTime()) / 60_000);
  if (Math.abs(minutes) < 60) return RELATIVE_FORMATTER.format(minutes, "minute");

  const hours = Math.round(minutes / 60);
  if (Math.abs(hours) < 24) return RELATIVE_FORMATTER.format(hours, "hour");

  return RELATIVE_FORMATTER.format(Math.round(hours / 24), "day");
}

export function formatLabel(value: string): string {
  return value.replaceAll("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}
