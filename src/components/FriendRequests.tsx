// "use client";

// import {
//   useAcceptFriendRequest,
//   useFriendRequests,
// } from "@/src/hooks/useUsers";

// export default function FriendRequests() {
//   const {
//     data: requests,
//     isLoading,
//     isError,
//     error,
//   } = useFriendRequests("PENDING");

//   const acceptRequest = useAcceptFriendRequest();

//   if (isLoading) {
//     return <div>Loading friend requests...</div>;
//   }

//   //console.log("requests", requests);

//   if (isError) {
//     return (
//       <div className="text-red-600">
//         Failed to load requests: {error.message}
//       </div>
//     );
//   }

//   if (!requests || requests.length === 0) {
//     return (
//       <div className="rounded-lg border p-4 text-gray-500">
//         No pending friend requests.
//       </div>
//     );
//   }

//   const handleAccept = (requesterId: string) => {
//     acceptRequest.mutate(requesterId);
//   };

//   return (
//     <div className="space-y-3 text-black">
//       <h2 className="text-xl font-semibold">Friend Requests</h2>

//       {requests.map((request:any) => (
//         <div
//           key={request.id}
//           className="flex items-center justify-between rounded-lg border bg-white p-4"
//         >
//           <div>
//             <p className="font-medium">{request.requester.username}</p>

//             <p className="text-sm text-gray-500">
//               Sent {new Date(request.createdAt).toLocaleDateString()}
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={() => handleAccept(request.requesterId)}
//             disabled={acceptRequest.isPending}
//             className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
//           >
//             {acceptRequest.isPending ? "Accepting..." : "Accept"}
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }


"use client";

import {
  useAcceptFriendRequest,
  useFriendRequests,
} from "@/src/hooks/useUsers";

import { UserPlus, Check, Loader2, Inbox } from "lucide-react";

export default function FriendRequests() {
  const {
    data: requests,
    isLoading,
    isError,
    error,
  } = useFriendRequests("PENDING");

  const acceptRequest = useAcceptFriendRequest();

  /* ==================== LOADING ==================== */

  if (isLoading) {
    return (
      <section className="w-full">
        <SectionHeader />

        <div className="border-y border-zinc-800 py-8">
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading requests...
          </div>
        </div>
      </section>
    );
  }

  /* ==================== ERROR ==================== */

  if (isError) {
    return (
      <section className="w-full">
        <SectionHeader />

        <div className="border-y border-zinc-800 py-8">
          <p className="text-sm text-red-400">Failed to load requests.</p>

          <p className="mt-1 text-xs text-zinc-600">{error.message}</p>
        </div>
      </section>
    );
  }

  /* ==================== EMPTY ==================== */

  if (!requests || requests.length === 0) {
    return (
      <section className="w-full">
        <SectionHeader count={0} />

        <div className="border-y border-zinc-800 py-8">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900">
              <Inbox className="h-3.5 w-3.5 text-zinc-600" />
            </div>

            <div>
              <p className="text-sm text-zinc-400">No pending requests</p>

              <p className="mt-0.5 text-xs text-zinc-600">
                New friend requests will appear here.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ==================== MAIN ==================== */

  const handleAccept = (requesterId: string) => {
    acceptRequest.mutate(requesterId);
  };

  return (
    <section className="w-full">
      <SectionHeader count={requests.length} />

      <div className="border-y border-zinc-800">
        {requests.map((request: any) => (
          <RequestRow
            key={request.id}
            request={request}
            onAccept={handleAccept}
            isPending={acceptRequest.isPending}
          />
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   HEADER
============================================================ */

function SectionHeader({ count = 0 }: { count?: number }) {
  return (
    <div className="mb-4 flex items-end justify-between">
      <div>
        <p className="mb-1 text-xs font-medium uppercase tracking-[0.18em] text-zinc-600">
          Incoming
        </p>

        <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight text-white">
          <UserPlus className="h-5 w-5 text-zinc-500" />
          Friend Requests
        </h2>
      </div>

      {count > 0 && (
        <span className="text-xs text-zinc-500">{count} pending</span>
      )}
    </div>
  );
}

/* ============================================================
   REQUEST ROW
============================================================ */

function RequestRow({
  request,
  onAccept,
  isPending,
}: {
  request: any;
  onAccept: (requesterId: string) => void;
  isPending: boolean;
}) {
  const username = request.requester?.username ?? "Unknown user";

  const initial = username.charAt(0).toUpperCase() || "?";

  const sentDate = request.createdAt
    ? new Date(request.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <div className="flex items-center justify-between gap-4 px-1 py-4 transition-colors hover:bg-zinc-900/40">
      <div className="flex min-w-0 items-center gap-3">
        {/* Avatar */}

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900">
          <span className="text-xs font-semibold text-zinc-300">{initial}</span>
        </div>

        {/* User */}

        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-zinc-200">
            {username}
          </p>

          {sentDate && (
            <p className="mt-0.5 text-[10px] text-zinc-600">Sent {sentDate}</p>
          )}
        </div>
      </div>

      {/* Action */}

      <button
        type="button"
        onClick={() => onAccept(request.requesterId)}
        disabled={isPending}
        className="flex h-8 shrink-0 items-center gap-1.5 rounded-lg bg-white px-3 text-xs font-semibold text-zinc-950 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isPending ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <Check className="h-3.5 w-3.5" />
        )}

        {isPending ? "Accepting..." : "Accept"}
      </button>
    </div>
  );
}