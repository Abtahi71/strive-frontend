// src/components/TokenRefreshManager.tsx
"use client";

import { useEffect } from "react";
import { useCurrentUser } from "@/src/hooks/useUsers";

const ACCESS_TOKEN_TTL_MS = 3 * 60 * 1000; // match your backend's actual TTL
const REFRESH_MARGIN_MS = 60 * 1000; // refresh 1 min before expiry

export default function TokenRefreshManager() {
  const { data: user } = useCurrentUser();

  useEffect(() => {
    // Not logged in — nothing to keep alive.
    if (!user) return;

    let timer: ReturnType<typeof setTimeout>;

    const scheduleNext = () => {
      timer = setTimeout(async () => {
        try {
          const res = await fetch("/api/refresh", {
            method: "POST",
            credentials: "include",
          });

          if (res.ok) {
            scheduleNext(); // still valid, keep the cycle going
          }
          // On failure: just stop. Don't force-redirect here — let the
          // normal request-level 401 handling (apiFetch) deal with an
          // actually-expired session when the user next does something
          // that needs auth. This component's only job is to keep an
          // active session alive quietly in the background.
        } catch {
          // network hiccup — don't kill the session over one failed request
        }
      }, ACCESS_TOKEN_TTL_MS - REFRESH_MARGIN_MS);
    };

    scheduleNext();

    return () => clearTimeout(timer);
  }, [user]);

  return null; // renders nothing — this is pure side-effect
}
