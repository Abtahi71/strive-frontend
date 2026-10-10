import { proxyFetch } from "@/src/lib/proxyFetch";
import { NextRequest } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ activityId: string }> }
) {
  const { activityId } = await params;
  const body = await request.json();

  return proxyFetch(request, `activity/create-task/${activityId}`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}
