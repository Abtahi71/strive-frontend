import { proxyFetch, publicProxyFetch } from "@/src/lib/proxyFetch";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest
) {
 
  return publicProxyFetch(`activity/public-activities`,{
    method: "GET",
  } );
}
