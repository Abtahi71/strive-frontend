import { io } from "socket.io-client";



export const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL!, {
  autoConnect: false,
  withCredentials: true,
  auth: async (cb:any) => {
    try {
      const res = await fetch("/api/socket-token", { cache: "no-store" });
      const data = await res.json();
      cb({ token: data.token });
    } catch {
      cb({ token: null });
    }
  },
});

console.log("Socket backend URL:", process.env.NEXT_PUBLIC_BACKEND_URL);

socket.on("connect_error", (err:any) => {
  console.log("socket connect_error:", err.message);
});
