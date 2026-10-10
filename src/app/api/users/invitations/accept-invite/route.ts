import { proxyFetch } from "@/src/lib/proxyFetch";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  console.log("I HAVE REACHED HERE WHICH IS ACCEPT INVITE");

  return proxyFetch(request, `user/invitations/accept`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}
