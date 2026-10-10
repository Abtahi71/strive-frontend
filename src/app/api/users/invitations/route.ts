import { proxyFetch } from "@/src/lib/proxyFetch";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  //const searchTerm = request.nextUrl.searchParams.get("search");

  return proxyFetch(
    request,
    `user/invitations`
  );
}
