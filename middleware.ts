import { NextRequest, NextResponse } from "next/server";

const VERIFY_URL = process.env.VERIFY_URL || "http://localhost:8000/api/verify/";
const REFRESH_URL = process.env.REFRESH_URL || "http://localhost:8000/api/refresh/";

export async function middleware(request: NextRequest) {
  const cookie = request.headers.get("cookie") || "";

  if (!cookie) {
    console.warn("No cookie found. Redirecting to login.");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const verifyRes = await fetch(VERIFY_URL, {
      method: "POST",
      headers: {
        Cookie: cookie,
      },
    });

    if (verifyRes.ok) {
      return NextResponse.next();
    }

    const refreshRes = await fetch(REFRESH_URL, {
      method: "POST",
      headers: {
        Cookie: cookie,
      },
    });

    if (refreshRes.ok) {
      const newCookie = refreshRes.headers.get("Set-Cookie");

      if (newCookie) {
        if (!newCookie.includes("access_token")) {
          console.error("Invalid Set-Cookie header received.");
          return NextResponse.redirect(new URL("/login", request.url));
        }

        const response = NextResponse.next();
        response.headers.set("Set-Cookie", newCookie);
        return response;
      }
    }

    console.warn("Both verify and refresh failed. Redirecting to login.");
    return NextResponse.redirect(new URL("/login", request.url));
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};