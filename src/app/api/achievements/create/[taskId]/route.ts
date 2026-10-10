import { proxyFetch } from "@/src/lib/proxyFetch";
import { NextRequest } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ taskId: string }> }
) {
  const { taskId } = await params;

  const body = await request.json();

  return proxyFetch(request, `achievement/create/${taskId}`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}
