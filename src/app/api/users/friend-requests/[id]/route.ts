import { proxyFetch } from "@/src/lib/proxyFetch";
import { NextRequest } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  return proxyFetch(request, `user/friend-request/${id}`, {
    method: "POST",
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  return proxyFetch(request, `user/friend-request/accept/${id}`, {
    method: "PUT",
  });
}