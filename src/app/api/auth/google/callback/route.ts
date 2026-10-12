import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "https://strive-dbur.onrender.com";

const ACCESS_TOKEN_MAX_AGE = 20 * 60;
const SESSION_TOKEN_MAX_AGE = 7 * 24 * 60 * 60;

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(
      new URL("/login?error=google_auth_failed", request.url)
    );
  }

  try {
    const backendResponse = await fetch(`${BACKEND_URL}/auth/google/exchange`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
      cache: "no-store",
    });

    if (!backendResponse.ok) {
      console.error("Google code exchange failed:", backendResponse.status);

      return NextResponse.redirect(
        new URL("/login?error=google_auth_failed", request.url)
      );
    }

    const data = await backendResponse.json();

    if (!data.token || !data.sessionToken) {
      return NextResponse.redirect(
        new URL("/login?error=google_auth_failed", request.url)
      );
    }

    // Redirect and set cookies on the FRONTEND domain.
    const response = NextResponse.redirect(new URL("/dashboard", request.url));

    const isProduction = process.env.NODE_ENV === "production";

    response.cookies.set("accessToken", data.token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      maxAge: ACCESS_TOKEN_MAX_AGE,
      path: "/",
    });

    response.cookies.set("sessionToken", data.sessionToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      maxAge: SESSION_TOKEN_MAX_AGE,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Google callback error:", error);

    return NextResponse.redirect(
      new URL("/login?error=google_auth_failed", request.url)
    );
  }
}
