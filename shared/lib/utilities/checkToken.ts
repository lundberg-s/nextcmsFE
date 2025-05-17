"use client";

export function hasRefreshToken() {
  if (typeof document === "undefined") {
    return false;
  }
  return document.cookie.includes("refresh_token");
}