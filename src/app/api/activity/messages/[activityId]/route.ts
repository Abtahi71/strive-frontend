import { NextRequest } from "next/server";
import { proxyFetch } from "@/src/lib/proxyFetch";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      activityId: string;
    }>;
  }
) {
  const { activityId } = await params;

  console.log("THIS IS THE ACTIITYID FROM messages", activityId);

  return proxyFetch(request, `/conversation/${activityId}/messages`, {
    method: "GET",
  });
}
