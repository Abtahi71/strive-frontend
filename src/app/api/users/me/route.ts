// app/api/auth/me/route.ts

import { NextRequest } from "next/server";
import { proxyFetch } from "@/src/lib/proxyFetch";

export async function GET(request: NextRequest) {

  //const id = request.nextUrl.searchParams.get("id");
  return proxyFetch(request, `auth/me`, {
    method: "GET",
  });
}