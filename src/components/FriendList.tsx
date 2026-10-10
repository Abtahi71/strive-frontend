// "use client";

// import { useFriendList, useSendFriendRequest } from "@/src/hooks/useUsers";
// import { useState } from "react";
// import FriendSearch from "./FriendSearch";

// /* ============================================================
//    🎨 CENTRAL THEME — change colors here
// ============================================================ */
// const theme = {
//   borderGradient: "bg-gradient-to-b from-white via-zinc-400 to-zinc-700",
//   borderGradientThin: "bg-gradient-to-b from-white via-zinc-500 to-zinc-800",
//   borderWidth: "p-[2px]",
//   borderWidthThin: "p-[1.5px]",
//   borderRadius: "rounded-3xl",
//   innerRadius: "rounded-[calc(1.5rem-2px)]",
//   rowRadius: "rounded-2xl",
//   rowInnerRadius: "rounded-[calc(1rem-1.5px)]",

//   surfaceSolid: "bg-zinc-950",
//   surfaceSoft: "bg-zinc-900/60",

//   gradientText:
//     "bg-gradient-to-b from-white via-white to-zinc-400 bg-clip-text text-transparent",
//   gradientTextMuted:
//     "bg-gradient-to-b from-zinc-200 to-zinc-500 bg-clip-text text-transparent",

//   primaryBtn:
//     "bg-gradient-to-b from-white to-zinc-300 text-zinc-900 hover:from-white hover:to-white",

//   muted: "text-zinc-500",
//   label: "text-zinc-400",
//   error: "text-red-400",
//   success: "text-emerald-400",

//   divider: "border-zinc-800",
// };

// export default function FriendList() {
//   const { data: friends, isLoading, isError, error } = useFriendList();
//   const [receiverId, setReceiverId] = useState("");
//   const { mutate: sendRequest, isPending } = useSendFriendRequest(receiverId);

//   /* ==================== STATES ==================== */
//   if (isLoading) {
//     return (
//       <div
//         className={`${theme.borderWidth} ${theme.borderRadius} ${theme.borderGradient}`}
//       >
//         <div
//           className={`p-6 ${theme.surfaceSolid} ${theme.innerRadius} ${theme.muted}`}
//         >
//           Loading friends...
//         </div>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div
//         className={`${theme.borderWidth} ${theme.borderRadius} ${theme.borderGradient}`}
//       >
//         <div
//           className={`p-6 ${theme.surfaceSolid} ${theme.innerRadius} ${theme.error}`}
//         >
//           Failed to load friends: {error.message}
//         </div>
//       </div>
//     );
//   }

//   const myFriends =
//     friends?.filter((friend: any) => friend.status === "ACCEPTED") ?? [];
//   const myPendingRequests =
//     friends?.filter((friend: any) => friend.status === "PENDING") ?? [];

//   /* ==================== EMPTY STATE ==================== */
//   if (!friends || friends.length === 0) {
//     return (
//       <div className="w-full space-y-6">
//         {/* Search + send request card */}
//         <div
//           className={`w-full ${theme.borderWidth} ${theme.borderRadius} ${theme.borderGradient} shadow-xl`}
//         >
//           <div className={`p-6 ${theme.surfaceSolid} ${theme.innerRadius}`}>
//             <h2 className={`mb-1 text-xl font-semibold ${theme.gradientText}`}>
//               Find Friends
//             </h2>
//             <p className={`mb-5 text-sm ${theme.muted}`}>
//               Search by username to send a friend request.
//             </p>

//             <FriendSearch
//               onUserSelect={setReceiverId}
//               pending={myPendingRequests}
//               friends={myFriends}
//             />

//             <button
//               disabled={!receiverId || isPending}
//               onClick={() => sendRequest()}
//               className={`mt-4 w-full rounded-xl px-4 py-3 text-sm font-semibold shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 ${theme.primaryBtn}`}
//             >
//               {isPending ? "Sending request..." : "Send Friend Request"}
//             </button>
//           </div>
//         </div>

//         {/* Empty state card */}
//         <div
//           className={`w-full ${theme.borderWidthThin} ${theme.rowRadius} ${theme.borderGradientThin}`}
//         >
//           <div
//             className={`flex flex-col items-center justify-center py-12 text-center ${theme.surfaceSolid} ${theme.rowInnerRadius}`}
//           >
//             <div className="mb-3 text-4xl">👋</div>
//             <p className={`text-base font-medium text-white`}>No friends yet</p>
//             <p className={`mt-1 text-sm ${theme.muted}`}>
//               Start by searching for someone above.
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   /* ==================== MAIN ==================== */
//   return (
//     <div className="w-full space-y-6">
//       {/* ==================== HEADER ==================== */}
//       <div className="flex items-end justify-between">
//         <h2 className={`text-2xl font-semibold ${theme.gradientText}`}>
//           Friends
//         </h2>
//         <span className={`text-xs ${theme.muted}`}>
//           {myFriends.length} friend{myFriends.length === 1 ? "" : "s"}
//           {myPendingRequests.length > 0 &&
//             ` • ${myPendingRequests.length} pending`}
//         </span>
//       </div>

//       {/* ==================== SEARCH + SEND REQUEST ==================== */}
//       <div
//         className={`w-full ${theme.borderWidth} ${theme.borderRadius} ${theme.borderGradient} shadow-xl`}
//       >
//         <div className={`p-6 ${theme.surfaceSolid} ${theme.innerRadius}`}>
//           <h3
//             className={`mb-1 text-sm font-semibold uppercase tracking-wider ${theme.label}`}
//           >
//             Add a friend
//           </h3>
//           <p className={`mb-5 text-sm ${theme.muted}`}>
//             Search by username to send a friend request.
//           </p>

//           <FriendSearch
//             onUserSelect={setReceiverId}
//             pending={myPendingRequests}
//             friends={myFriends}
//           />

//           <button
//             disabled={!receiverId || isPending}
//             onClick={() => sendRequest()}
//             className={`mt-4 w-full rounded-xl px-4 py-3 text-sm font-semibold shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 ${theme.primaryBtn}`}
//           >
//             {isPending ? "Sending request..." : "Send Friend Request"}
//           </button>
//         </div>
//       </div>

//       {/* ==================== FRIEND LIST ==================== */}
//       <div className="flex flex-col gap-3">
//         {myFriends.map((friend: any) => (
//           <div
//             key={friend.friendId}
//             className={`w-full ${theme.borderWidthThin} ${theme.rowRadius} ${theme.borderGradientThin}`}
//           >
//             <div
//               className={`flex items-center justify-between gap-3 p-4 ${theme.surfaceSolid} ${theme.rowInnerRadius}`}
//             >
//               <div className="flex items-center gap-3">
//                 {/* Avatar */}
//                 <div
//                   className={`flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700 bg-gradient-to-b from-zinc-700 to-zinc-900 text-sm font-semibold ${theme.gradientTextMuted}`}
//                 >
//                   {friend.username?.charAt(0).toUpperCase() ?? "?"}
//                 </div>

//                 <div>
//                   <p className="text-sm font-medium text-white">
//                     {friend.username}
//                   </p>
//                   <p className={`text-xs ${theme.muted}`}>
//                     Friend since{" "}
//                     {new Date(friend.createdAt).toLocaleDateString("en-US", {
//                       year: "numeric",
//                       month: "short",
//                       day: "numeric",
//                     })}
//                   </p>
//                 </div>
//               </div>

//               {/* Optional status pill */}
//               <span
//                 className={`hidden rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-400 sm:inline-block`}
//               >
//                 Friend
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { useFriendList, useSendFriendRequest } from "@/src/hooks/useUsers";
import { useState } from "react";
import { UserPlus, Users, Loader2, UserRound } from "lucide-react";
import FriendSearch from "./FriendSearch";

export default function FriendList() {
  const { data: friends, isLoading, isError, error } = useFriendList();

  const [receiverId, setReceiverId] = useState("");

  const { mutate: sendRequest, isPending } = useSendFriendRequest(receiverId);

  const myFriends =
    friends?.filter((friend: any) => friend.status === "ACCEPTED") ?? [];

  const myPendingRequests =
    friends?.filter((friend: any) => friend.status === "PENDING") ?? [];

  /* ==================== LOADING ==================== */

  if (isLoading) {
    return (
      <section className="w-full">
        <SectionHeader />

        <div className="border-y border-zinc-800 py-8">
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading friends...
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
          <p className="text-sm text-red-400">Failed to load friends.</p>

          <p className="mt-1 text-xs text-zinc-600">{error.message}</p>
        </div>
      </section>
    );
  }

  /* ==================== MAIN ==================== */

  return (
    <section className="w-full">
      <SectionHeader
        count={myFriends.length}
        pending={myPendingRequests.length}
      />

      {/* ==================== ADD FRIEND ==================== */}

      <div className="mb-8 border-y border-zinc-800 py-5">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900">
            <UserPlus className="h-4 w-4 text-zinc-400" />
          </div>

          <div>
            <h3 className="text-sm font-medium text-zinc-200">Add a friend</h3>

            <p className="text-xs text-zinc-600">
              Search by username and send a request.
            </p>
          </div>
        </div>

        <FriendSearch
          onUserSelect={setReceiverId}
          pending={myPendingRequests}
          friends={myFriends}
        />

        <button
          type="button"
          disabled={!receiverId || isPending}
          onClick={() => sendRequest()}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-semibold text-zinc-950 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-30 sm:w-auto"
        >
          {isPending ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <UserPlus className="h-3.5 w-3.5" />
              Send Request
            </>
          )}
        </button>
      </div>

      {/* ==================== FRIENDS ==================== */}

      {myFriends.length === 0 ? (
        <EmptyFriends />
      ) : (
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Users className="h-3.5 w-3.5 text-zinc-500" />

            <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
              Your Friends
            </h3>

            <span className="text-xs text-zinc-700">{myFriends.length}</span>
          </div>

          <div className="divide-y divide-zinc-800 border-y border-zinc-800">
            {myFriends.map((friend: any) => (
              <FriendRow key={friend.friendId} friend={friend} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

/* ============================================================
   HEADER
============================================================ */

function SectionHeader({
  count = 0,
  pending = 0,
}: {
  count?: number;
  pending?: number;
}) {
  return (
    <div className="mb-4 flex items-end justify-between">
      <div>
        <p className="mb-1 text-xs font-medium uppercase tracking-[0.18em] text-zinc-600">
          Social
        </p>

        <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight text-white">
          <Users className="h-5 w-5 text-zinc-500" />
          Friends
        </h2>
      </div>

      <div className="text-right text-xs text-zinc-500">
        <span>
          {count} {count === 1 ? "friend" : "friends"}
        </span>

        {pending > 0 && (
          <span className="text-zinc-700"> · {pending} pending</span>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   FRIEND ROW
============================================================ */

function FriendRow({ friend }: { friend: any }) {
  const joinedDate = friend.createdAt
    ? new Date(friend.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <div className="group flex items-center justify-between gap-4 px-1 py-4 transition-colors hover:bg-zinc-900/40">
      <div className="flex min-w-0 items-center gap-3">
        {/* Avatar */}

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900">
          <span className="text-xs font-semibold text-zinc-300">
            {friend.username?.charAt(0).toUpperCase() ?? "?"}
          </span>
        </div>

        {/* User */}

        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-zinc-200">
            {friend.username}
          </p>

          {joinedDate && (
            <p className="mt-0.5 text-[10px] text-zinc-600">
              Friends since {joinedDate}
            </p>
          )}
        </div>
      </div>

      <span className="hidden text-[10px] uppercase tracking-wider text-zinc-700 sm:block">
        Friend
      </span>
    </div>
  );
}

/* ============================================================
   EMPTY
============================================================ */

function EmptyFriends() {
  return (
    <div className="border-y border-zinc-800 py-10 text-center">
      <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900">
        <UserRound className="h-4 w-4 text-zinc-600" />
      </div>

      <p className="text-sm font-medium text-zinc-300">No friends yet</p>

      <p className="mt-1 text-xs text-zinc-600">
        Search for someone above to send your first friend request.
      </p>
    </div>
  );
}
