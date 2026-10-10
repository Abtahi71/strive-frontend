import { proxyFetch } from "@/src/lib/proxyFetch";
import { NextRequest } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  return proxyFetch(request, `activity/create-task/${id}`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}
