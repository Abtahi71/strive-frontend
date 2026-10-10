// "use client";
// import { useAcceptInvite, useGetInvitations } from "../hooks/useUsers";
// import {
//   Mail,
//   Check,
//   X,
//   Clock,
//   User,
//   Calendar,
//   ChevronRight,
//   Loader2,
//   Inbox,
// } from "lucide-react";
// import { formatDistanceToNow } from "date-fns";
// import { useActivityContext } from "../context/ActivityContext";
// import Link from "next/link";

// interface Invitation {
//   id: string;
//   activityId: string;
//   senderId: string;
//   receiverId: string;
//   expiresAt: string | null;
//   acceptedAt: string | null;
//   createdAt: string;
//   sender?: {
//     id:string;
//     name: string;
//     username: string;
//     email: string;
//   };
//   member?:boolean;
//   activity?: {
//     id:string;
//     name: string;
//     description: string;
//   };
// }

// export default function InvitationCard({
//   invitation,
//   status,
// }: {
//   invitation: Invitation;
//   status: "pending" | "accepted";
// }) {

//   //const { activity } = useActivityContext();

//   const {
//     mutate: acceptInvite,
//     isPending: acceptInviteLoading,
//     error: acceptInviteError,
//   } = useAcceptInvite(invitation.id,invitation.activityId, invitation.senderId, invitation.activity?.name??"");
//   const timeAgo = formatDistanceToNow(new Date(invitation.createdAt), {
//     addSuffix: true,
//   });

//   console.log("THIS IS THE INVITATION.activityId",invitation.activityId)
//   console.log("THIS IS THE INVITATION.senderId",invitation.senderId)
//   console.log("THIS IS THE INVITATION.name",invitation.activity?.name)

//   return (
//     <div
//       className={`bg-white rounded-2xl shadow-sm border transition-all duration-200 hover:shadow-md ${
//         status === "pending"
//           ? "border-indigo-100 hover:border-indigo-200"
//           : "border-gray-100 hover:border-gray-200"
//       }`}
//     >
//       <div className="p-6">
//         <div className="flex items-start justify-between gap-4">
//           {/* Left Section - Sender Info */}
//           <div className="flex items-start gap-4 flex-1">
//             <div
//               className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
//                 status === "pending"
//                   ? "bg-gradient-to-br from-indigo-500 to-purple-500"
//                   : "bg-gradient-to-br from-gray-400 to-gray-500"
//               }`}
//             >
//               <span className="text-white font-bold text-lg">
//                 {invitation.sender?.name?.charAt(0) || "?"}
//               </span>
//             </div>

//             <div className="flex-1 min-w-0">
//               <div className="flex items-center gap-2 flex-wrap">
//                 <h3 className="font-semibold text-gray-800">
//                   {invitation.sender?.name || "Unknown User"}
//                 </h3>
//                 <span className="text-sm text-gray-400">•</span>
//                 <span className="text-sm text-gray-500">
//                   @{invitation.sender?.username || "unknown"}
//                 </span>
//                 {status === "pending" && (
//                   <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-50 text-yellow-700 text-xs font-medium rounded-full border border-yellow-200">
//                     <Clock className="w-3 h-3" />
//                     Pending
//                   </span>
//                 )}
//                 {status === "accepted" && (
//                   <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full border border-emerald-200">
//                     <Check className="w-3 h-3" />
//                     Accepted
//                   </span>
//                 )}
//               </div>

//               <div className="mt-1 space-y-1">
//                 <p className="text-gray-700 text-sm">
//                   Invited you to join{" "}
//                   <span className="font-medium text-indigo-600">
//                     {invitation.activity?.name || "an activity"}
//                   </span>
//                 </p>
//                 {invitation.activity?.description && (
//                   <p className="text-gray-500 text-sm line-clamp-1">
//                     {invitation.activity.description}
//                   </p>
//                 )}
//                 <div className="flex items-center gap-4 text-xs text-gray-400 mt-1">
//                   <span className="flex items-center gap-1">
//                     <Calendar className="w-3 h-3" />
//                     {timeAgo}
//                   </span>
//                   {invitation.expiresAt && (
//                     <span className="flex items-center gap-1 text-orange-500">
//                       <Clock className="w-3 h-3" />
//                       Expires{" "}
//                       {formatDistanceToNow(new Date(invitation.expiresAt), {
//                         addSuffix: true,
//                       })}
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Section - Actions */}
//           <div className="flex items-center gap-2 flex-shrink-0">
//             {!invitation.member? (
//               <>
//                 <button
//                   onClick={() => acceptInvite()}
//                   className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-all duration-200 hover:shadow-md"
//                 >
//                   <Check className="w-4 h-4" />
//                   Accept
//                 </button>
//                 <button
//                   onClick={() =>
//                     console.log("Decline invitation", invitation.id)
//                   }
//                   className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-xl transition-all duration-200"
//                 >
//                   <X className="w-4 h-4" />
//                   Decline
//                 </button>
//               </>
//             ) : (
//               <Link href={`/activities/${invitation.activityId}`}>
//                 <button
//                   onClick={() =>
//                     console.log("View activity", invitation.activityId)
//                   }
//                   className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium rounded-xl transition-all duration-200"
//                 >
//                   View Activity
//                   <ChevronRight className="w-4 h-4" />
//                 </button>
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useAcceptInvite } from "../hooks/useUsers";
import { Check, X, Clock, Calendar, ChevronRight, Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

interface Invitation {
  id: string;
  activityId: string;
  senderId: string;
  receiverId: string;
  expiresAt: string | null;
  acceptedAt: string | null;
  createdAt: string;

  sender?: {
    id: string;
    name: string;
    username: string;
    email: string;
  };

  member?: boolean;

  activity?: {
    id: string;
    name: string;
    description: string;
  };
}

export default function InvitationCard({
  invitation,
  status,
}: {
  invitation: Invitation;
  status: "pending" | "accepted";
}) {
  const {
    mutate: acceptInvite,
    isPending: acceptInviteLoading,
    error: acceptInviteError,
  } = useAcceptInvite(
    invitation.id,
    invitation.activityId,
    invitation.senderId,
    invitation.activity?.name ?? ""
  );

  const timeAgo = formatDistanceToNow(new Date(invitation.createdAt), {
    addSuffix: true,
  });

  const isPending = status === "pending";

  return (
    <div className="group transition-colors hover:bg-zinc-900/40">
      <div className="px-1 py-5">
        <div className="flex items-start gap-4">
          {/* ================= AVATAR ================= */}

          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${
              isPending
                ? "border-zinc-700 bg-zinc-900"
                : "border-zinc-800 bg-zinc-950"
            }`}
          >
            <span
              className={`text-sm font-semibold ${
                isPending ? "text-zinc-200" : "text-zinc-600"
              }`}
            >
              {invitation.sender?.name?.charAt(0).toUpperCase() || "?"}
            </span>
          </div>

          {/* ================= CONTENT ================= */}

          <div className="min-w-0 flex-1">
            {/* Sender */}

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-zinc-200">
                {invitation.sender?.name || "Unknown User"}
              </span>

              <span className="text-xs text-zinc-700">
                @{invitation.sender?.username || "unknown"}
              </span>

              {isPending && (
                <span className="rounded-full border border-amber-500/20 bg-amber-500/5 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-amber-500">
                  Pending
                </span>
              )}

              {!isPending && (
                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/5 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-emerald-500">
                  Accepted
                </span>
              )}
            </div>

            {/* Invitation */}

            <p className="mt-1 text-sm text-zinc-500">
              invited you to join{" "}
              <span className="font-medium text-zinc-200">
                {invitation.activity?.name || "an activity"}
              </span>
            </p>

            {/* Description */}

            {invitation.activity?.description && (
              <p className="mt-1 line-clamp-1 max-w-xl text-xs text-zinc-600">
                {invitation.activity.description}
              </p>
            )}

            {/* Metadata */}

            <div className="mt-2 flex flex-wrap items-center gap-3 text-[10px] text-zinc-600">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {timeAgo}
              </span>

              {invitation.expiresAt && isPending && (
                <>
                  <span className="text-zinc-800">•</span>

                  <span className="flex items-center gap-1 text-zinc-600">
                    <Clock className="h-3 w-3" />
                    Expires{" "}
                    {formatDistanceToNow(new Date(invitation.expiresAt), {
                      addSuffix: true,
                    })}
                  </span>
                </>
              )}
            </div>

            {/* Error */}

            {acceptInviteError && (
              <p className="mt-2 text-xs text-red-400">
                {(acceptInviteError as Error).message}
              </p>
            )}
          </div>

          {/* ================= ACTIONS ================= */}

          <div className="shrink-0">
            {!invitation.member ? (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={acceptInviteLoading}
                  onClick={() => acceptInvite()}
                  className="flex h-8 items-center gap-1.5 rounded-lg bg-white px-3 text-xs font-semibold text-zinc-950 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {acceptInviteLoading ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Check className="h-3.5 w-3.5" />
                  )}

                  {acceptInviteLoading ? "Joining..." : "Accept"}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    console.log("Decline invitation", invitation.id)
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 text-zinc-600 transition hover:border-zinc-700 hover:bg-zinc-900 hover:text-zinc-300"
                  aria-label="Decline invitation"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <Link
                href={`/activities/${invitation.activityId}`}
                className="flex h-8 items-center gap-1 rounded-lg px-2 text-xs text-zinc-600 transition hover:bg-zinc-900 hover:text-zinc-200"
              >
                View
                <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}