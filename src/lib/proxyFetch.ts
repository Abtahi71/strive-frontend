
// src/lib/proxyFetch.ts
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://backend:5000";

function normalizePath(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}

export async function proxyFetch(
  request: NextRequest,
  path: string,
  options?: RequestInit
) {
  const accessToken = request.cookies.get("accessToken")?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

   console.log("🔥 PROXY FETCH CALLED");
   console.log("🔥 BACKEND URL:", BACKEND_URL);
   console.log("🔥 PATH:", normalizePath(path));
   console.log("🔥 FINAL URL:", `${BACKEND_URL}${normalizePath(path)}`);


  const res = await fetch(`${BACKEND_URL}${normalizePath(path)}`, {
    ...options,
    headers: {
      ...(options?.headers || {}),
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "no-store",
  });

    console.log("🔥 BACKEND STATUS:", res.status);
    console.log("🔥 BACKEND STATUS TEXT:", res.statusText);
    //console.log("🔥 BACKEND res TEXT:", res);

  const data = await res.json().catch(() => ({}));

   //console.log("BACKEND DATA:", data);
  // console.log("BACKEND STATUS:", res.status);

  
  //console.log("BACKEND RESPONSE STATUS:", res.status);

  if (!res.ok) {
    
    //console.log("RETURNING STATUS TO BROWSER:", res.status);
    return NextResponse.json(
      { error: data.message || "Request failed" },
      { status: res.status }
    );
  }


  return NextResponse.json(data, { status: res.status });
}

// For routes that don't require auth on the backend (e.g. public-activities)
export async function publicProxyFetch(path: string, options?: RequestInit) {
  console.log("🔥 PROXY FETCH CALLED");
  
  const res = await fetch(`${BACKEND_URL}${normalizePath(path)}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    cache: "no-store",
  });

  console.log("🔥 BACKEND STATUS:", res.status);
  console.log("🔥 BACKEND STATUS TEXT:", res.statusText);

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    return NextResponse.json(
      { error: err.message || "Request failed" },
      { status: res.status }
    );
  }

  

  return NextResponse.json(await res.json());
}