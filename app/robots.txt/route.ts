// filepath: c:\Users\HomePC\nextcmsFE\app\robots.txt\route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse(
    [
      "User-Agent: *",
      "Allow: /",
      "Sitemap: http://localhost:3000/sitemap.xml",
    ].join("\n"),
    {
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );
}