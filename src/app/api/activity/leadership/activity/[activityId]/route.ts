import { proxyFetch } from "@/src/lib/proxyFetch";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ activityId: string }> }
) {
  const { activityId } = await params;

  return proxyFetch(request, `user/leadership/activity/${activityId}`, {
    method: "GET",
  });
}
