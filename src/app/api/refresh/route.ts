// frontend/src/app/api/auth/refresh/route.ts
import { NextRequest, NextResponse } from "next/server";

const ACCESS_TOKEN_MAX_AGE = 15 * 60;
const SESSION_TOKEN_MAX_AGE = 7 * 24 * 60 * 60;

// Corrected refresh proxy — backend sets cookies directly, we just forward them
export async function POST(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get("sessionToken")?.value;

    const backendRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`, {
      method: "POST",
      headers: { cookie: `sessionToken=${sessionToken ?? ""}` },
    });

    if (!backendRes.ok) {
      const errorData = await backendRes.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.message || "Session expired" },
        { status: backendRes.status }
      );
    }

    const res = NextResponse.json({ success: true }, { status: 200 });

    // Forward every Set-Cookie header from the backend as-is
    const setCookieHeaders = backendRes.headers.getSetCookie?.() ?? [];
    setCookieHeaders.forEach((cookie) => {
      res.headers.append("Set-Cookie", cookie);
    });

    return res;
  } catch (error) {
    console.error("Refresh error:", error);
    return NextResponse.json({ error: "Refresh failed" }, { status: 500 });
  }
}
