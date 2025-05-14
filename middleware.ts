import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const cookie = request.headers.get("cookie");

  const verify = await fetch("http://localhost:8000/api/verify/", {
    method: "POST",
    headers: {
      Cookie: cookie || "",
    },
  });

  const refresh = await fetch("http://localhost:8000/api/refresh/", {
    method: "POST",
    headers: {
      Cookie: cookie || "",
    },
  });

  if (!verify.ok) {
    if (refresh.ok) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
  };
  
