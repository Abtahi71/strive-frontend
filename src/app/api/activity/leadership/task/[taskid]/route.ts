import { proxyFetch } from "@/src/lib/proxyFetch";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ taskid: string }> }
) {
  const { taskid } = await params;

  console.log("THIS IS THE TASKID IN ROUTE.ts", taskid);

  return proxyFetch(request, `user/leadership/task/${taskid}`, {
    method: "GET",
  });
}
