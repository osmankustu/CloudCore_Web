export function getGoogleMapsLink(str: string, city: string, district: string) {
  return `https://www.google.com/maps?q=${str} ${city}/${district}`;
}

export function extractLocationFromMapUrl(url: string): string {
  try {
    const parsed = new URL(url);
    return parsed.searchParams.get("q") || "";
  } catch {
    return "";
  }
}
