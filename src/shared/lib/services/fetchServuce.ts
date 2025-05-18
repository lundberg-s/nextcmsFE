const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";
const REFRESH_URL = process.env.NEXT_PUBLIC_REFRESH_URL || "http://localhost:8000/api/refresh/";

function buildUrl(url: string, absolute: boolean) {
  return absolute ? url : `${BASE_URL}${url}`;
}

function buildHeaders(customHeaders: HeadersInit = {}): HeadersInit {
  return {
    "Content-Type": "application/json",
    ...customHeaders,
  };
}

async function authenticatedFetch(url: string, options: RequestInit = {}, absolute = false): Promise<Response> {
  return fetch(buildUrl(url, absolute), {
    ...options,
    credentials: "include",
  });
}

async function tryRefreshToken(): Promise<boolean> {
  const response = await authenticatedFetch(REFRESH_URL, {
    method: "POST",
    headers: buildHeaders(),
  }, true);

  if (response.ok) return true;

  const errorData = await response.json().catch(() => ({ error: "Unknown error" }));

  if (typeof window !== "undefined" && window.location.pathname.startsWith("/admin")) {
    window.location.href = "/login";
  }

  throw new Error(errorData.error || "Failed to refresh token");
}

async function handleResponse(response: Response): Promise<any> {
  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(`Error ${response.status}: ${errorText || response.statusText}`);
  }

  const isJson = response.headers.get("Content-Type")?.includes("application/json");
  return response.status !== 204 && isJson ? response.json() : null;
}

export async function fetchWithAuthRetry(
  url: string,
  options: RequestInit = {}
): Promise<any> {
  let response = await authenticatedFetch(url, options);

  if (response.status === 401) {
    console.warn("Access token expired. Attempting to refresh...");
    const refreshed = await tryRefreshToken();

    if (refreshed) {
      console.info("Token refreshed successfully. Retrying request...");
      response = await authenticatedFetch(url, options);
    }
  }

  return handleResponse(response);
}

export function createOptions(
  method: string,
  body?: any,
  headers: HeadersInit = {}
): RequestInit {
  return {
    method,
    headers: buildHeaders(headers),
    body: body ? JSON.stringify(body) : undefined,
  };
}
