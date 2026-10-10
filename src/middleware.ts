// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   // Check for authentication token
//   const accessToken = request.cookies.get("accessToken");

//   // If no auth cookie, redirect to login
//   if (!accessToken) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   // Token exists, allow request to proceed
//   // NOTE: This doesn't validate if token is valid/expired
//   // That validation happens in your page components/layouts
//   return NextResponse.next();
// }

// // Specify which routes to protect
// export const config = {
//   matcher: [
//     "/dashboard/:path*",
//     "/profile/:path*",
//     "/settings/:path*",
//     // Add more protected routes here
//   ],
// };


// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const ACCESS_SECRET = new TextEncoder().encode(process.env.ACCESS_SECRET!);

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  console.log(
    "[middleware]",
    request.nextUrl.pathname,
    "accessToken present:",
    !!accessToken
  );

  if (accessToken) {
    try {
      await jwtVerify(accessToken, ACCESS_SECRET);
      console.log("[middleware] token valid, passing through");
      return NextResponse.next(); // still valid
    } catch {
      // expired or invalid — fall through to refresh
      console.log("[middleware] token valid, passing through");
    }
  }

  const sessionToken = request.cookies.get("sessionToken")?.value;
  console.log("[middleware] sessionToken present:", !!sessionToken);

  if (!sessionToken) {
    console.log("[middleware] no sessionToken → redirecting to login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const refreshRes = await fetch(new URL("/api/refresh", request.url), {
    method: "POST",
    headers: { cookie: `sessionToken=${sessionToken}` },
  });

  if (!refreshRes.ok) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const setCookies = refreshRes.headers.getSetCookie?.() ?? [];

  // Forward the NEW accessToken into the current request's headers
  // so DashboardLayout (running right after this) sees a valid cookie
  // in THIS render, not just on the next navigation.
  const newAccessToken = setCookies
    .find((c) => c.startsWith("accessToken="))
    ?.split(";")[0]
    ?.split("=")[1];

  const requestHeaders = new Headers(request.headers);
  if (newAccessToken) {
    const existingCookies = requestHeaders.get("cookie") ?? "";
    const filtered = existingCookies
      .split(";")
      .filter((c) => !c.trim().startsWith("accessToken="))
      .join(";");
    requestHeaders.set("cookie", `${filtered}; accessToken=${newAccessToken}`);
  }

  const response = NextResponse.next({ request: { headers: requestHeaders } });

  // Also persist the new cookies to the browser for future requests
  setCookies.forEach((c) => response.headers.append("Set-Cookie", c));

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/settings/:path*"],
};