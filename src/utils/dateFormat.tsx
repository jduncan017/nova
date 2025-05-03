export default function formatDate(date: string): string {
  const dateObj = new Date(date);
  const now = new Date();
  const isCurrentYear = dateObj.getFullYear() === now.getFullYear();
  const isToday = dateObj.toDateString() === now.toDateString();
  const isYesterday =
    dateObj.toDateString() ===
    new Date(now.setDate(now.getDate() - 1)).toDateString();
  const isWithinLastWeek =
    (now.getTime() - dateObj.getTime()) / (1000 * 60 * 60 * 24) < 6;

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    ...(isToday ? {} : { day: "numeric" }),
    ...(isCurrentYear ? {} : { year: "numeric" }),
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  let formattedDate;
  if (isToday) {
    formattedDate = "Today";
  } else if (isYesterday) {
    formattedDate = "Yesterday";
  } else if (isWithinLastWeek) {
    formattedDate = `${dateObj.toLocaleDateString(undefined, { weekday: "long" })},`;
  } else {
    formattedDate = `${dateObj.toLocaleDateString(undefined, dateOptions)},`;
  }

  const formattedTime = dateObj.toLocaleTimeString(undefined, timeOptions);

  return `${formattedDate} ${formattedTime}`;
}
