// lib/token-refresh-timer.ts
const REFRESH_MARGIN_MS = 60 * 1000; // refresh 1 min before expiry

export function scheduleTokenRefresh(accessTokenTtlMs: number) {
  const delay = Math.max(accessTokenTtlMs - REFRESH_MARGIN_MS, 0);

  const timer = setTimeout(async () => {
    const res = await fetch("/api/refresh", {
      method: "POST",
      credentials: "include",
    });
    if (res.ok) {
      scheduleTokenRefresh(accessTokenTtlMs); // reschedule for the next cycle
    } else {
      window.location.href = "/login";
    }
  }, delay);

  return () => clearTimeout(timer);
}
