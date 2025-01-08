export function formatTimeString(time?: string | null): string {
  if (!time) return "N/A";

  const [hours, minutes] = time.split(":").map(Number);

  if (
    isNaN(hours) ||
    isNaN(minutes) ||
    hours > 23 ||
    hours < 0 ||
    minutes > 59 ||
    minutes < 0
  ) {
    return "N/A";
  }

  const period = hours >= 12 ? "pm" : "am";
  const hours12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;

  return `${hours12}:${minutes.toString().padStart(2, "0")}${period}`;
}

export function formatDateString(date?: string | null): string {
  if (!date) return "N/A";

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return "N/A";

  const months = [
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
  ];
  return `${dateObj.getDate()} ${
    months[dateObj.getMonth()]
  } ${dateObj.getFullYear()}`;
}

export function dateTo24HrTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
}
