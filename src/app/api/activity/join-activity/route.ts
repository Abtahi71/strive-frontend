import { proxyFetch } from "@/src/lib/proxyFetch";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json()
  return proxyFetch(request, "activity/join-activity",{
    method: "POST",
    body: JSON.stringify(body),
  });
}
