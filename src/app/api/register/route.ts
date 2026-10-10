import { NextRequest, NextResponse } from "next/server";

const ACCESS_TOKEN_MAX_AGE = 20 * 60 ; // seconds — must match backend's ACCESS_TOKEN_TTL_MS
const SESSION_TOKEN_MAX_AGE = 7 * 24 * 60 * 60;

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Call external backend
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    console.log("This is the response",response)

    // Handle backend errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.message || "Login failed" },
        { status: response.status }
      );
    }

    // Get data from backend
    const data = await response.json();
    // Expected: { accessToken: "...", user: { id, email, name, ... } }

    console.log("THIS IS THE DATA",data)

    // Create response with user data (NO TOKEN in response body)
    const res = NextResponse.json(
      {
        user: data.user,
        message: "signup successful",
      },
      { status: 200 }
    );

    // Set httpOnly cookie with accessToken
    res.cookies.set("accessToken", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: ACCESS_TOKEN_MAX_AGE, // 24 hours
      path: "/",
    });
    
    res.cookies.set("sessionToken", data.sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_TOKEN_MAX_AGE, // matches your SESSION_TTL_MS, e.g. 7 days
      path: "/",
    });

    // const accessToken = request.cookies.get("accessToken")?.value;

    // console.log("accessToken from the route",accessToken)

    return res;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
