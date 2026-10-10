// "use client";

// import { useState } from "react";
// import { useActivityMembers } from "@/src/hooks/useActivities";
// import MemberDetailModal from "./MemberDetailModal";
// import { colors } from "@/src/styles/colors";
// import { ActivityMember } from "../types/activity";

// function formatDate(dateStr: string) {
//   return new Date(dateStr).toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//   });
// }

// export default function MembersList({ members, membersLoading, membersError }: { members: ActivityMember[], membersLoading: boolean, membersError: any }) {

//   const [selectedMember, setSelectedMember] = useState<any | null>(null);




//   if (membersLoading) return <div className="loading">Loading members...</div>;
//   if (membersError) return <div className="error">Failed to load members.</div>;

//   return (
//     <>
//       <div className="members-container">
//         <div className="members-header">
//           <h3 className="members-title">Members</h3>
//           <span className="members-count">{members?.length ?? 0}</span>
//         </div>

//         {members && members.length > 0 ? (
//           <div className="table-wrapper">
//             <table className="members-table">
//               <thead>
//                 <tr>
//                   <th>Username</th>
//                   <th>Role</th>
//                   <th>Joined</th>
//                   <th>Streak</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {(members ?? []).map((member: any, index: number) => (
//                   <tr key={member.id} className="member-row">
//                     <td>
//                       <div className="user-info">
//                         <div className="user-avatar">
//                           {member.user.username.charAt(0).toUpperCase()}
//                         </div>
//                         <span className="username">{member.user.username}</span>
//                       </div>
//                     </td>
//                     <td>
//                       <span
//                         className={`role-badge role-${member.role.toLowerCase()}`}
//                       >
//                         {member.role}
//                       </span>
//                     </td>
//                     <td>
//                       <span className="joined-date">
//                         {formatDate(member.joinedAt)}
//                       </span>
//                     </td>
//                     <td>
//                       <span className="streak-badge">
//                         <span className="streak-icon">🔥</span>
//                         <span className="streak-count">
//                           {member.currentStreak}
//                         </span>
//                         <span className="streak-label">days</span>
//                       </span>
//                     </td>
//                     <td>
//                       <button
//                         className="view-member-btn"
//                         onClick={() => setSelectedMember(member)}
//                       >
//                         View Details
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <div className="empty-state">
//             <div className="empty-icon">👥</div>
//             <p className="empty-text">No members yet</p>
//             <p className="empty-subtext">
//               Invite members to join this activity
//             </p>
//           </div>
//         )}
//       </div>

//       {selectedMember && (
//         <MemberDetailModal
//           member={selectedMember}
//           onClose={() => setSelectedMember(null)}
//         />
//       )}

      
//     </>
//   );
// }


"use client";

import { useState } from "react";
import MemberDetailModal from "./MemberDetailModal";
import { ActivityMember } from "../types/activity";

/* ============================================================
   🎨 CENTRAL THEME — change colors here
============================================================ */
const theme = {
  borderGradient: "bg-gradient-to-b from-white via-zinc-400 to-zinc-700",
  borderWidth: "p-[2px]",
  borderRadius: "rounded-3xl",
  innerRadius: "rounded-[calc(1.5rem-2px)]",

  surface: "bg-zinc-950",
  rowBg: "bg-zinc-900/60 hover:bg-zinc-800/60",
  headerBg: "bg-zinc-900/80",

  gradientText:
    "bg-gradient-to-b from-white via-white to-zinc-400 bg-clip-text text-transparent",
  gradientTextMuted:
    "bg-gradient-to-b from-zinc-200 to-zinc-500 bg-clip-text text-transparent",

  text: "text-white",
  muted: "text-zinc-500",
  label: "text-zinc-400",

  divider: "border-zinc-800",

  adminBadge: "bg-blue-500/15 text-blue-300 border border-blue-500/30",
  memberBadge: "bg-zinc-800 text-zinc-300 border border-zinc-700",
  streakBadge: "bg-amber-500/10 text-amber-300 border border-amber-500/30",

  primaryBtn:
    "bg-gradient-to-b from-white to-zinc-300 text-zinc-900 hover:from-white hover:to-white",

  error: "text-red-400",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function MembersList({
  members,
  membersLoading,
  membersError,
}: {
  members: ActivityMember[];
  membersLoading: boolean;
  membersError: any;
}) {
  const [selectedMember, setSelectedMember] = useState<any | null>(null);

  if (membersLoading)
    return (
      <div className={`py-8 text-center ${theme.muted}`}>
        Loading members...
      </div>
    );

  if (membersError)
    return (
      <div className={`py-8 text-center ${theme.error}`}>
        Failed to load members.
      </div>
    );

  return (
    <>
      {/* Gradient border wrapper */}
      <div
        className={`${theme.borderWidth} ${theme.borderRadius} ${theme.borderGradient}`}
      >
        <div className={`p-6 ${theme.surface} ${theme.innerRadius}`}>
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <h3 className={`text-xl font-semibold ${theme.gradientText}`}>
              Members
            </h3>
            <span
              className={`rounded-full border border-zinc-700 bg-zinc-800/60 px-3 py-1 text-xs font-semibold text-zinc-300`}
            >
              {members?.length ?? 0}
            </span>
          </div>

          {members && members.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className={theme.headerBg}>
                    <th
                      className={`rounded-tl-2xl px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${theme.label}`}
                    >
                      Username
                    </th>
                    <th
                      className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${theme.label}`}
                    >
                      Role
                    </th>
                    <th
                      className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${theme.label}`}
                    >
                      Joined
                    </th>
                    <th
                      className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${theme.label}`}
                    >
                      Streak
                    </th>
                    <th
                      className={`rounded-tr-2xl px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${theme.label}`}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(members ?? []).map((member: any) => (
                    <tr
                      key={member.id}
                      className={`border-t transition-colors ${theme.divider} ${theme.rowBg}`}
                    >
                      {/* User */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 bg-gradient-to-b from-zinc-700 to-zinc-900 text-sm font-semibold ${theme.gradientTextMuted}`}
                          >
                            {member.user.username.charAt(0).toUpperCase()}
                          </div>
                          <span className={`font-medium ${theme.text}`}>
                            {member.user.username}
                          </span>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                            member.role.toLowerCase() === "admin"
                              ? theme.adminBadge
                              : theme.memberBadge
                          }`}
                        >
                          {member.role}
                        </span>
                      </td>

                      {/* Joined */}
                      <td className={`px-4 py-3 ${theme.muted}`}>
                        {formatDate(member.joinedAt)}
                      </td>

                      {/* Streak */}
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${theme.streakBadge}`}
                        >
                          <span>🔥</span>
                          <span>{member.currentStreak}</span>
                          <span className="opacity-70">days</span>
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setSelectedMember(member)}
                          className={`rounded-xl px-3 py-1.5 text-xs font-semibold shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 ${theme.primaryBtn}`}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            /* Empty state */
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div
                className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-3xl`}
              >
                👥
              </div>
              <p className={`mb-1 text-base font-medium ${theme.text}`}>
                No members yet
              </p>
              <p className={`text-sm ${theme.muted}`}>
                Invite members to join this activity
              </p>
            </div>
          )}
        </div>
      </div>

      {selectedMember && (
        <MemberDetailModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </>
  );
}