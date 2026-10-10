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
// import InvitationCard from "./InvitationCard";

// interface Invitation {
//   id: string;
//   activityId: string;
//   senderId: string;
//   receiverId: string;
//   expiresAt: string | null;
//   acceptedAt: string | null;
//   createdAt: string;
//   sender?: {
//     id: string;
//     name: string;
//     username: string;
//     email: string;
//   };
//   activity?: {
//     id: string;
//     name: string;
//     description: string;
//   };
// }

// export default function Invitations() {
//   const { data: invitations, isLoading, error } = useGetInvitations();
  
  
//   console.log("THIS IS THE INVITATIONS", invitations);
//   console.log("INVITATIONS FROM QUERY:", invitations);

//   console.log(
//     "PENDING:",
//     invitations?.invitations.filter((inv: Invitation) => !inv.acceptedAt)
//   );

//   console.log(
//     "ACCEPTED:",
//     invitations?.invitations.filter((inv: Invitation) => inv.acceptedAt)
//   );

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="text-center">
//           <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
//           <p className="text-gray-500">Loading your invitations...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
//         <div className="inline-flex p-3 bg-red-100 rounded-full mb-4">
//           <X className="w-8 h-8 text-red-600" />
//         </div>
//         <h3 className="text-lg font-semibold text-red-800 mb-2">
//           Failed to load invitations
//         </h3>
//         <p className="text-red-600">Please try again later</p>
//       </div>
//     );
//   }

//   const pendingInvitations =
//     invitations?.invitations.filter((inv: any) => !inv.acceptedAt) || [];
//   const acceptedInvitations =
//     invitations?.invitations.filter((inv: any) => inv.acceptedAt) || [];

//   if (!invitations || invitations.length === 0) {
//     return (
//       <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center">
//         <div className="inline-flex p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full mb-4">
//           <Inbox className="w-12 h-12 text-indigo-400" />
//         </div>
//         <h3 className="text-xl font-semibold text-gray-700 mb-2">
//           No invitations yet
//         </h3>
//         <p className="text-gray-500">
//           You'll see activity invitations here when you receive them
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
//             <Mail className="w-7 h-7 text-indigo-600" />
//             Invitations
//           </h1>
//           <p className="text-gray-500 text-sm mt-1">
//             {pendingInvitations.length} pending · {acceptedInvitations.length}{" "}
//             accepted
//           </p>
//         </div>
//         <div className="flex items-center gap-2">
//           <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
//             {pendingInvitations.length} new
//           </span>
//         </div>
//       </div>

//       {/* Pending Invitations */}
//       {pendingInvitations.length > 0 && (
//         <div>
//           <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
//             <Clock className="w-4 h-4" />
//             Pending ({pendingInvitations.length})
//           </h2>
//           <div className="space-y-3">
//             {pendingInvitations.map((invitation: Invitation) => (
//               <InvitationCard
//                 key={invitation.id}
//                 invitation={invitation}
//                 status="pending"
//               />
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Accepted Invitations */}
//       {acceptedInvitations.length > 0 && (
//         <div>
//           <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
//             <Check className="w-4 h-4" />
//             Accepted ({acceptedInvitations.length})
//           </h2>
//           <div className="space-y-3">
//             {acceptedInvitations.map((invitation: Invitation) => (
//               <InvitationCard
//                 key={invitation.id}
//                 invitation={invitation}
//                 status="accepted"
//               />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // Invitation Card Component


"use client";

import { useGetInvitations } from "../hooks/useUsers";
import { Mail, Check, Clock, Inbox, Loader2 } from "lucide-react";
import InvitationCard from "./InvitationCard";

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

export default function Invitations() {
  const { data: invitations, isLoading, error } = useGetInvitations();

  const allInvitations: Invitation[] = invitations?.invitations || [];

  const pendingInvitations = allInvitations.filter(
    (invitation) => !invitation.acceptedAt
  );

  const acceptedInvitations = allInvitations.filter(
    (invitation) => invitation.acceptedAt
  );

  /* ==================== LOADING ==================== */

  if (isLoading) {
    return (
      <section className="w-full">
        <SectionHeader />

        <div className="border-y border-zinc-800 py-8">
          <div className="flex items-center gap-3 text-sm text-zinc-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading invitations...
          </div>
        </div>
      </section>
    );
  }

  /* ==================== ERROR ==================== */

  if (error) {
    return (
      <section className="w-full">
        <SectionHeader />

        <div className="border-y border-zinc-800 py-8">
          <p className="text-sm text-red-400">Failed to load invitations.</p>

          <p className="mt-1 text-xs text-zinc-600">Please try again later.</p>
        </div>
      </section>
    );
  }

  /* ==================== EMPTY ==================== */

  if (allInvitations.length === 0) {
    return (
      <section className="w-full">
        <SectionHeader count={0} />

        <div className="border-y border-zinc-800 py-10">
          <div className="flex flex-col items-center text-center">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900">
              <Inbox className="h-5 w-5 text-zinc-600" />
            </div>

            <h3 className="text-sm font-medium text-zinc-300">
              No invitations
            </h3>

            <p className="mt-1 max-w-sm text-xs text-zinc-600">
              Activity invitations you receive will appear here.
            </p>
          </div>
        </div>
      </section>
    );
  }

  /* ==================== CONTENT ==================== */

  return (
    <section className="w-full">
      <SectionHeader count={pendingInvitations.length} />

      {/* Pending */}
      {pendingInvitations.length > 0 && (
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-zinc-500" />

            <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
              Pending
            </h3>

            <span className="text-xs text-zinc-700">
              {pendingInvitations.length}
            </span>
          </div>

          <div className="divide-y divide-zinc-800 border-y border-zinc-800">
            {pendingInvitations.map((invitation) => (
              <InvitationCard
                key={invitation.id}
                invitation={invitation}
                status="pending"
              />
            ))}
          </div>
        </div>
      )}

      {/* Accepted */}
      {acceptedInvitations.length > 0 && (
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Check className="h-3.5 w-3.5 text-zinc-600" />

            <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-600">
              Accepted
            </h3>

            <span className="text-xs text-zinc-700">
              {acceptedInvitations.length}
            </span>
          </div>

          <div className="divide-y divide-zinc-800 border-y border-zinc-800">
            {acceptedInvitations.map((invitation) => (
              <InvitationCard
                key={invitation.id}
                invitation={invitation}
                status="accepted"
              />
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

function SectionHeader({ count }: { count?: number }) {
  return (
    <div className="mb-4 flex items-end justify-between">
      <div>
        <p className="mb-1 text-xs font-medium uppercase tracking-[0.18em] text-zinc-600">
          Inbox
        </p>

        <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight text-white">
          <Mail className="h-5 w-5 text-zinc-500" />
          Invitations
        </h2>
      </div>

      {count !== undefined && count > 0 && (
        <span className="text-xs text-zinc-500">{count} pending</span>
      )}
    </div>
  );
}