export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function toInputDateFormat(isoString: string) {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Ay 0-indexli
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function toPayloadDateFormat(isoString: string) {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Ay 0-indexli
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}T00:00:00.000000Z`;
}
