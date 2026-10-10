import { proxyFetch } from "@/src/lib/proxyFetch";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);

  const status = url.searchParams.get("status");

  const path = status
    ? `user/friend-requests?status=${encodeURIComponent(status)}`
    : "user/friend-requests";

  return proxyFetch(request, path, {
    method: "GET",
  });
}
