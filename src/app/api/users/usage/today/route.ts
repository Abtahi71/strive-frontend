

import { NextRequest } from "next/server";
import { proxyFetch } from "@/src/lib/proxyFetch";

export async function GET(request: NextRequest) {
  
  return proxyFetch(request, `usage/today`, {
    method: "GET",
  });
}
