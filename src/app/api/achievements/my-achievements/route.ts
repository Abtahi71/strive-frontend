import { proxyFetch } from "@/src/lib/proxyFetch";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  return proxyFetch(request, "achievement/my-achievements", {
    method: "GET",
  });
}
