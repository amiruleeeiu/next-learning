/**
 * API Client - Base fetch utility
 *
 * Common cache configurations:
 * - DEFAULT_CACHE_CONFIG: Static generation with 10s revalidation
 * - { cache: "no-store" }: Dynamic rendering (always fresh)
 * - { next: { revalidate: 60 } }: ISR with 60s revalidation
 * - { cache: "force-cache" }: Static forever (no revalidation)
 *
 * Usage examples:
 * - fetchAPI(url) // Uses DEFAULT_CACHE_CONFIG
 * - fetchAPI(url, { cache: "no-store" }) // Override for dynamic data
 * - fetchAPI(url, { next: { revalidate: 300 } }) // Custom revalidation
 */

import { cookies } from "next/headers";

interface FetchOptions extends RequestInit {
  headers?: HeadersInit;
}

/**
 * Default cache configuration for static generation
 * Modify this to change default behavior across all services
 */
export const DEFAULT_CACHE_CONFIG: RequestInit = {
  cache: "force-cache" as RequestCache,
  next: { revalidate: 10 },
};

/**
 * Common API base URLs
 */
export const API_BASE_URLS = {
  jsonPlaceholder: "https://jsonplaceholder.typicode.com",
  bepza: "https://bbp-backend-dev.oss.net.bd/api",
};

/**
 * Generic fetch utility with error handling and optional caching
 * Can be used for any external API
 */
export async function fetchAPI<T>(
  url: string,
  options: RequestInit = DEFAULT_CACHE_CONFIG,
): Promise<T> {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || "en";

  const urlWithLang = new URL(url);
  urlWithLang.searchParams.set("locale", lang);

  console.log(urlWithLang.toString());

  const res = await fetch(urlWithLang.toString(), options);

  // console.log(urlWithLang);

  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

/**
 * API request with language support and cookies
 * Used for internal APIs that need language context
 */
export async function apiRequest<T>(
  url: string,
  options: FetchOptions = {},
): Promise<T> {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || "en";

  const urlWithLang = new URL(url);
  urlWithLang.searchParams.set("local", lang);

  const headers = new Headers(options.headers);
  headers.set("Accept-Language", lang);
  headers.set("Content-Type", "application/json");

  const res = await fetch(urlWithLang.toString(), {
    ...options,
    headers,
  });

  if (!res.ok) {
    throw new Error(`API request failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function getLang(): Promise<string> {
  const cookieStore = await cookies();
  return cookieStore.get("lang")?.value || "en";
}
