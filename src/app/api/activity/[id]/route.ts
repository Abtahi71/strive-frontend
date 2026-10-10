import { proxyFetch } from "@/src/lib/proxyFetch";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  console.log("THIS IS THE ID and I have reached in this spot", id);
  return proxyFetch(request, `activity/activity-info/${id}`);
}
