// Server-side helpers for the Perenual API. Only import this from route handlers:
// it reads the secret key from the environment and must never reach the browser.

const BASE_URL = "https://perenual.com/api";

export const hasApiKey = (): boolean => Boolean(process.env.PERENUAL_API_KEY);

export async function perenualFetch(path: string, params: Record<string, string> = {}) {
  const key = process.env.PERENUAL_API_KEY;
  if (!key) throw new Error("PERENUAL_API_KEY is not set");

  const url = new URL(`${BASE_URL}${path}`);
  for (const [name, value] of Object.entries(params)) url.searchParams.set(name, value);
  url.searchParams.set("key", key);

  return fetch(url, { cache: "no-store" });
}

// Perenual echoes the caller's key back inside some URLs in its responses.
// Remove any `key=` query param from every string before data leaves the server.
export function stripKeys<T>(value: T): T {
  if (typeof value === "string") {
    return value.replace(/([?&])key=[^&"'\s<>]*(&?)/g, (_m, prefix: string, amp: string) =>
      amp ? prefix : ""
    ) as T;
  }
  if (Array.isArray(value)) return value.map(stripKeys) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, stripKeys(v)])
    ) as T;
  }
  return value;
}

export const isValidId = (id: string): boolean => /^\d+$/.test(id);
