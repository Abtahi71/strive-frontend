import { proxyFetch } from "@/src/lib/proxyFetch";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  return proxyFetch(request, "activity/leave-activity");
}
