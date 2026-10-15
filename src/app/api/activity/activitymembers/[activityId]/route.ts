import { optionalProxyFetch, proxyFetch } from "@/src/lib/proxyFetch";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ activityId: string }> }
) {
  const { activityId } = await params;

  return optionalProxyFetch(request, `activity/activity-members/${activityId}`);
}
