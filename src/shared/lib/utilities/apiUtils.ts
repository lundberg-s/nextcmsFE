const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";
const REFRESH_URL = process.env.NEXT_PUBLIC_REFRESH_URL || "http://localhost:8000/api/refresh/";

export async function fetchWithAuthRetry(
  url: string,
  options: RequestInit = {},
): Promise<any> {
  let response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    credentials: "include",
  });

  if (response.status === 401) {
    console.warn("Access token expired. Attempting to refresh...");

    const refreshResponse = await fetch(`${REFRESH_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!refreshResponse.ok) {
      const errorData = await refreshResponse.json().catch(() => ({ error: "Unknown error" }));

      if (typeof window !== "undefined" && window.location.pathname.startsWith("/admin")) {
        window.location.href = "/login";
      }

      throw new Error(errorData.error || "Failed to refresh token");
    }

    console.info("Token refreshed successfully. Retrying request...");

    response = await fetch(`${BASE_URL}${url}`, {
      ...options,
      credentials: "include",
    });
  }

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(`Error ${response.status}: ${errorText || response.statusText}`);
  }

  if (response.status !== 204 && response.headers.get("Content-Type")?.includes("application/json")) {
    return response.json();
  }

  return null;
}

export function createOptions(
  method: string,
  body?: any,
  headers: HeadersInit = {}
): RequestInit {
  return {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  };
}