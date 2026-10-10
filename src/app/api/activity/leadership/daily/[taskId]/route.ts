import { proxyFetch } from "@/src/lib/proxyFetch";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ taskId: string }> }
) {
  const { taskId } = await params;

  return proxyFetch(request, `user/leadership/daily/${taskId}`, {
    method: "GET",
  });
}
