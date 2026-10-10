// app/api/auth/me/route.ts

import { NextRequest } from "next/server";
import { proxyFetch } from "@/src/lib/proxyFetch";

export async function POST(request: NextRequest) {
  console.log("I AM IN CHAT ROUTE////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////")
  const body = await request.json();
  //const id = request.nextUrl.searchParams.get("id");
  return proxyFetch(request, `chatbot/chat`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}
