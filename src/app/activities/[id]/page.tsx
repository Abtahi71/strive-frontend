


// "use client";

// import { useParams } from "next/navigation";
// import { useState } from "react";
// import MembersList from "@/src/components/MembersList";
// import CreateTaskForm from "@/src/components/CreateTaskForm";
// import { useActivityContext } from "@/src/context/ActivityContext";
// import SendInvite from "@/src/components/SendInvite";
// import ActivityTasks from "@/src/components/activityTasks";
// import ActivityChat from "@/src/components/ActivityChat";
// import { useCurrentUser } from "@/src/hooks/useUsers";

// /* ============================================================
//    🎨 CENTRAL THEME — change colors here
// ============================================================ */
// const theme = {
//   pageBg: "bg-zinc-950",
//   pageText: "text-white",

//   borderGradient: "bg-gradient-to-b from-white via-zinc-400 to-zinc-700",
//   borderGradientThin: "bg-gradient-to-b from-white via-zinc-500 to-zinc-800",
//   borderWidth: "p-[2px]",
//   borderWidthThin: "p-[1.5px]",
//   borderRadius: "rounded-3xl",
//   innerRadius: "rounded-[calc(1.5rem-2px)]",
//   rowRadius: "rounded-2xl",
//   rowInnerRadius: "rounded-[calc(1rem-1.5px)]",

//   surfaceSolid: "bg-zinc-950",

//   gradientText:
//     "bg-gradient-to-b from-white via-white to-zinc-400 bg-clip-text text-transparent",
//   gradientTextMuted:
//     "bg-gradient-to-b from-zinc-200 to-zinc-500 bg-clip-text text-transparent",

//   primaryBtn:
//     "bg-gradient-to-b from-white to-zinc-300 text-zinc-900 hover:from-white hover:to-white",
//   ghostBtn:
//     "border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white",
//   accentBtn: "border-2 border-blue-500 text-blue-400 hover:bg-blue-500/10",

//   input:
//     "bg-zinc-900/70 border border-zinc-800 text-white placeholder-zinc-500 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500/50",

//   divider: "border-zinc-800",

//   publicBadge:
//     "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
//   privateBadge: "bg-red-500/15 text-red-400 border border-red-500/30",
//   memberBadge: "bg-zinc-800 text-zinc-300 border border-zinc-700",
//   taskBadge: "bg-blue-500/15 text-blue-300 border border-blue-500/30",
//   roleBadge: "bg-zinc-800 text-zinc-300 border border-zinc-700",
//   streakBadge: "bg-amber-500/10 text-amber-300 border border-amber-500/30",

//   success: "text-emerald-400",
//   error: "text-red-400",
//   muted: "text-zinc-500",
//   label: "text-zinc-400",

//   // 🆕 Tabs
//   tabBtnActive:
//     "bg-gradient-to-b from-white to-zinc-300 text-zinc-900 shadow-md",
//   tabBtnInactive:
//     "border border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white",
// };

// /* Helper: format date like "Sep 4, 2026" */
// function formatDate(dateStr?: string) {
//   if (!dateStr) return "—";
//   return new Date(dateStr).toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//   });
// }

// type SidePanel = "members" | "invite" | "chat" | null;

// export default function ActivityDetailPage() {
//   const { id } = useParams<{ id: string }>();

//   const { activity, members, memberLoading, memberError } =
//     useActivityContext();

//   const {data: user, isLoading: userLoading} = useCurrentUser();

//   const [showTaskForm, setShowTaskForm] = useState(false);
//   const [activePanel, setActivePanel] = useState<SidePanel>(null);

//   const togglePanel = (panel: SidePanel) => {
//     setActivePanel((prev) => (prev === panel ? null : panel));
//   };

//   //console.log("THIS IS THE USER", user);
  
//   if(userLoading){
//     return <div>Loading...</div>
//   }

//   console.log("THIS IS THE user", user);

//   const member = members?.find((member) => member.userId === user?.id);

//   // if (memberLoading) return <div>Loading activity...</div>;
//   // if (memberError) return <div>Failed to load activity.</div>;

//   // if(member)console.log("THIS IS THE MEMBER", member);
//   // else console.log("THIS IS not THE MEMBER", member);

//   return (
//     <div className={`min-h-screen w-full ${theme.pageBg} ${theme.pageText}`}>
//       <div className="mx-auto w-full px-6 py-8 lg:px-12">
//         {/* ==================== HEADER ==================== */}
//         <div
//           className={`mb-8 w-full ${theme.borderWidth} ${theme.borderRadius} ${theme.borderGradient} shadow-xl`}
//         >
//           <div
//             className={`flex flex-col gap-6 p-6 lg:flex-row lg:items-start lg:justify-between lg:p-8 ${theme.surfaceSolid} ${theme.innerRadius}`}
//           >
//             <div className="flex flex-1 flex-col gap-6 sm:flex-row">
//               {activity?.imageUrl && (
//                 <div className="flex-shrink-0">
//                   <div
//                     className={`${theme.borderWidthThin} ${theme.rowRadius} ${theme.borderGradientThin}`}
//                   >
//                     <img
//                       src={activity.imageUrl}
//                       alt={activity.name}
//                       className={`h-[120px] w-[120px] object-cover ${theme.rowInnerRadius}`}
//                     />
//                   </div>
//                 </div>
//               )}

//               <div className="min-w-0 flex-1">
//                 <h1
//                   className={`mb-2 text-3xl font-bold lg:text-4xl ${theme.gradientText}`}
//                 >
//                   {activity?.name}
//                 </h1>

//                 <p className={`mb-4 text-base leading-relaxed ${theme.muted}`}>
//                   {activity?.description}
//                 </p>

//                 <div className="flex flex-wrap gap-3">
//                   <span
//                     className={`inline-block rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider ${
//                       activity?.visibility?.toLowerCase() === "public"
//                         ? theme.publicBadge
//                         : theme.privateBadge
//                     }`}
//                   >
//                     {activity?.visibility}
//                   </span>

//                   <span
//                     className={`inline-block rounded-full px-4 py-1 text-xs font-semibold ${theme.memberBadge}`}
//                   >
//                     👥 {activity?.memberCount} members
//                   </span>

//                   <span
//                     className={`inline-block rounded-full px-4 py-1 text-xs font-semibold ${theme.taskBadge}`}
//                   >
//                     ✅ {activity?.taskCount} tasks
//                   </span>

//                   <span
//                     className={`inline-block rounded-full px-4 py-1 text-xs font-semibold ${theme.memberBadge}`}
//                   >
//                     🗓 Created {formatDate(activity?.createdAt)}
//                   </span>
//                 </div>

//                 {activity?.creator && (
//                   <div className="mt-5 flex items-center gap-3">
//                     {activity.creator.avatar ? (
//                       <img
//                         src={activity.creator.avatar}
//                         alt={activity.creator.name}
//                         className="h-9 w-9 rounded-full border border-zinc-700 object-cover"
//                       />
//                     ) : (
//                       <div
//                         className={`flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 bg-gradient-to-b from-zinc-700 to-zinc-900 text-sm font-semibold ${theme.gradientTextMuted}`}
//                       >
//                         {activity.creator.name?.charAt(0).toUpperCase() ?? "?"}
//                       </div>
//                     )}

//                     <div>
//                       <p className={`text-xs ${theme.label}`}>Created by</p>
//                       <p className="text-sm font-medium text-white">
//                         {activity.creator.name}{" "}
//                         <span className={theme.muted}>
//                           @{activity.creator.username}
//                         </span>
//                       </p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {member && activity?.creator.id === user?.id && <button
//               onClick={() => setShowTaskForm(true)}
//               className={`flex flex-shrink-0 items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 ${theme.primaryBtn}`}
//             >
//               <span className="text-xl leading-none">+</span>
//               Add Task
//             </button>}
//           </div>
//         </div>

//         {/* ==================== TASK FORM MODAL ==================== */}
//         {member && showTaskForm && (
//           <CreateTaskForm
//             activityId={id}
//             onCloseAction={() => setShowTaskForm(false)}
//           />
//         )}

//         {/* ==================== MAIN LAYOUT (tasks + side panel) ==================== */}
//         <div className="mb-8 flex w-full flex-col gap-6 lg:flex-row">
//           {/* -------- LEFT: Tasks (shrinks when a panel is open) -------- */}
//           <div
//             className={`min-w-0 transition-all duration-300 ${
//               activePanel ? "w-full lg:w-1/2" : "w-full"
//             }`}
//           >
//             <ActivityTasks activityId={id} ismember={member} />
//           </div>

//           {/* -------- RIGHT: Side Panel (only rendered when active) -------- */}
//           {activePanel && (
//             <div className="w-full lg:w-1/2">
//               <div
//                 className={`w-full ${theme.borderWidth} ${theme.borderRadius} ${theme.borderGradient} shadow-xl`}
//               >
//                 <div
//                   className={`p-6 lg:p-7 ${theme.surfaceSolid} ${theme.innerRadius}`}
//                 >
//                   {/* Panel tabs (also acts as a switcher) */}
//                   <div className="mb-5 flex flex-wrap gap-2">
//                     <TabButton
//                       label="👥 Members"
//                       active={activePanel === "members"}
//                       onClick={() => togglePanel("members")}
//                     />
//                     {member &&
//                       <div>
//                       <TabButton
//                       label="✉️ Invite"
//                       active={activePanel === "invite"}
//                       onClick={() => togglePanel("invite")}
//                     />
//                     <TabButton
//                       label="💬 Chat"
//                       active={activePanel === "chat"}
//                       onClick={() => togglePanel("chat")}
//                     />
//                     </div>
//                     }

//                     {/* Close button */}
//                     <button
//                       onClick={() => setActivePanel(null)}
//                       className={`ml-auto rounded-xl px-3 py-2 text-xs font-semibold transition ${theme.ghostBtn}`}
//                     >
//                       ✕ Close
//                     </button>
//                   </div>

//                   {/* Panel content */}
//                   <div className="w-full">
//                     {activePanel === "members" && (
//                       <MembersList
//                         members={members!}
//                         membersLoading={memberLoading}
//                         membersError={memberError}
//                       />
//                     )}

//                     {activePanel === "invite" && (
//                       <SendInvite
//                         id={id}
//                         name={activity!.name}
//                         members={members}
//                       />
//                     )}

//                     {activePanel === "chat" && (
//                       <ActivityChat activityId={id} />
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* -------- RIGHT: Tab launcher (when no panel is open) -------- */}
//           {!activePanel && (
//             <div className="flex w-full flex-col gap-3 lg:w-48">
//               <p
//                 className={`px-1 text-xs font-semibold uppercase tracking-wider ${theme.label}`}
//               >
//                 Open panel
//               </p>

//               <TabButton
//                 label="👥 Members"
//                 active={false}
//                 onClick={() => setActivePanel("members")}
//                 fullWidth
//               />
//               {member &&  
//               <div><TabButton
//                 label="✉️ Invite"
//                 active={false}
//                 onClick={() => setActivePanel("invite")}
//                 fullWidth
//               />
//               <TabButton
//                 label="💬 Chat"
//                 active={false}
//                 onClick={() => setActivePanel("chat")}
//                 fullWidth
//               /> </div>}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ============================================================
//    🧩 TAB BUTTON — shared
// ============================================================ */
// function TabButton({
//   label,
//   active,
//   onClick,
//   fullWidth = false,
// }: {
//   label: string;
//   active: boolean;
//   onClick: () => void;
//   fullWidth?: boolean;
// }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
//         fullWidth ? "w-full text-left" : ""
//       } ${active ? theme.tabBtnActive : theme.tabBtnInactive}`}
//     >
//       {label}
//     </button>
//   );
// }


"use client";

import { useParams } from "next/navigation";
import { useState, type ReactNode } from "react";
import Link from "next/link";
import MembersList from "@/src/components/MembersList";
import CreateTaskForm from "@/src/components/CreateTaskForm";
import { useActivityContext } from "@/src/context/ActivityContext";
import SendInvite from "@/src/components/SendInvite";
import ActivityTasks from "@/src/components/activityTasks";
import ActivityChat from "@/src/components/ActivityChat";
import { useCurrentUser } from "@/src/hooks/useUsers";

/* ============================================================
   🎨 CENTRAL THEME — change colors here
============================================================ */
const theme = {
  pageBg: "bg-zinc-950",
  pageText: "text-white",

  surface: "border border-zinc-800/80 bg-zinc-900/30",

  gradientText:
    "bg-gradient-to-b from-white via-white to-zinc-400 bg-clip-text text-transparent",
  gradientTextMuted:
    "bg-gradient-to-b from-zinc-200 to-zinc-500 bg-clip-text text-transparent",

  primaryBtn:
    "bg-gradient-to-b from-white to-zinc-300 text-zinc-900 hover:from-white hover:to-white",

  publicBadge:
    "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
  privateBadge: "bg-red-500/15 text-red-400 border border-red-500/30",
  memberBadge: "bg-zinc-800 text-zinc-300 border border-zinc-700",
  taskBadge: "bg-blue-500/15 text-blue-300 border border-blue-500/30",

  muted: "text-zinc-500",
  label: "text-zinc-400",

  tabActive: "text-white",
  tabInactive: "text-zinc-500 hover:text-zinc-300",
};

const SCROLL =
  "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-800";

/* Helper: format date like "Sep 4, 2026" */
function formatDate(dateStr?: string) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

type SidePanel = "members" | "invite" | "chat" | null;
type IconName = "tasks" | "members" | "invite" | "chat";

/* ============================================================
   SMALL UI PIECES
============================================================ */
function TabIcon({ name }: { name: IconName }) {
  const icons: Record<IconName, ReactNode> = {
    tasks: (
      <>
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </>
    ),
    members: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    invite: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-10 6L2 7" />
      </>
    ),
    chat: (
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    ),
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
}

function Avatar({
  src,
  name,
  className,
}: {
  src?: string | null;
  name?: string;
  className: string;
}) {
  return src ? (
    <img
      src={src}
      alt={name ?? ""}
      className={`shrink-0 border border-zinc-800 object-cover ${className}`}
    />
  ) : (
    <div
      className={`flex shrink-0 items-center justify-center border border-zinc-800 bg-gradient-to-br from-zinc-700 to-zinc-900 font-semibold ${theme.gradientTextMuted} ${className}`}
    >
      {name?.charAt(0).toUpperCase() ?? "?"}
    </div>
  );
}

function PageSkeleton() {
  return (
    <div className={`min-h-screen ${theme.pageBg}`} aria-busy="true">
      <div className="mx-auto max-w-7xl animate-pulse space-y-4 px-4 py-6 sm:px-6">
        <div className="h-3 w-24 rounded bg-zinc-800" />
        <div className="flex gap-4 rounded-xl border border-zinc-800/80 p-5">
          <div className="h-16 w-16 rounded-xl bg-zinc-800" />
          <div className="flex-1 space-y-3">
            <div className="h-5 w-1/3 rounded bg-zinc-800" />
            <div className="h-3 w-2/3 rounded bg-zinc-800/70" />
          </div>
        </div>
        <div className="h-64 rounded-xl bg-zinc-900/40" />
      </div>
    </div>
  );
}

/* ============================================================
   PAGE
============================================================ */
export default function ActivityDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { activity, members, memberLoading, memberError } =
    useActivityContext();

  const { data: user, isLoading: userLoading } = useCurrentUser();

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [activePanel, setActivePanel] = useState<SidePanel>(null);

  const togglePanel = (panel: SidePanel) => {
    setActivePanel((prev) => (prev === panel ? null : panel));
  };

  if (userLoading) {
    return <PageSkeleton />;
  }

  const member = members?.find((member) => member.userId === user?.id);

  // null = "Tasks" (no side panel). Invite and Chat are members only.
  const tabs: {
    key: SidePanel;
    label: string;
    icon: IconName;
    count?: number;
  }[] = [
    { key: null, label: "Tasks", icon: "tasks", count: activity?.taskCount },
    {
      key: "members",
      label: "Members",
      icon: "members",
      count: activity?.memberCount,
    },
    ...(member
      ? [
          { key: "invite" as const, label: "Invite", icon: "invite" as const },
          { key: "chat" as const, label: "Chat", icon: "chat" as const },
        ]
      : []),
  ];

  // On mobile, hide the long header details while a panel is open to save space
  const details = activePanel ? "hidden lg:block" : "";

  return (
    <div className={`min-h-screen w-full ${theme.pageBg} ${theme.pageText}`}>
      {/* ==================== BACK + HEADER ==================== */}
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6">
        <Link
          href="/dashboard"
          className="mb-3 inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 transition hover:text-white"
        >
          ← Dashboard
        </Link>

        <section className={`rounded-xl p-4 sm:p-5 ${theme.surface}`}>
          <div className="flex items-start gap-4">
            <Avatar
              src={activity?.imageUrl}
              name={activity?.name}
              className="h-14 w-14 rounded-xl text-xl sm:h-16 sm:w-16"
            />

            <div className="min-w-0 flex-1">
              <h1
                className={`truncate text-xl font-semibold tracking-tight sm:text-2xl ${theme.gradientText}`}
              >
                {activity?.name}
              </h1>

              <div className={details}>
                {activity?.description && (
                  <p
                    title={activity.description}
                    className={`mt-1 line-clamp-2 text-sm leading-relaxed ${theme.muted}`}
                  >
                    {activity.description}
                  </p>
                )}

                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                      activity?.visibility?.toLowerCase() === "public"
                        ? theme.publicBadge
                        : theme.privateBadge
                    }`}
                  >
                    {activity?.visibility}
                  </span>

                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${theme.memberBadge}`}
                  >
                    👥 {activity?.memberCount} members
                  </span>

                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${theme.taskBadge}`}
                  >
                    ✅ {activity?.taskCount} tasks
                  </span>

                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${theme.memberBadge}`}
                  >
                    🗓 {formatDate(activity?.createdAt)}
                  </span>
                </div>

                {activity?.creator && (
                  <div className="mt-3 flex items-center gap-2">
                    <Avatar
                      src={activity.creator.avatar}
                      name={activity.creator.name}
                      className="h-5 w-5 rounded-full text-[10px]"
                    />
                    <p className="text-xs">
                      <span className={theme.label}>Created by </span>
                      <span className="font-medium text-white">
                        {activity.creator.name}
                      </span>{" "}
                      <span className={theme.muted}>
                        @{activity.creator.username}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {member && activity?.creator.id === user?.id && (
              <button
                type="button"
                onClick={() => setShowTaskForm(true)}
                className={`flex shrink-0 items-center justify-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-semibold shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0 ${theme.primaryBtn}`}
              >
                <span className="text-lg leading-none">+</span>
                <span className="hidden sm:inline">Add Task</span>
                <span className="sm:hidden">Add</span>
              </button>
            )}
          </div>
        </section>
      </div>

      {/* ==================== TASK FORM MODAL ==================== */}
      {member && showTaskForm && (
        <CreateTaskForm
          activityId={id}
          onCloseAction={() => setShowTaskForm(false)}
        />
      )}

      {/* ==================== STICKY TAB BAR ==================== */}
      <nav
        role="tablist"
        aria-label="Activity sections"
        className="sticky top-0 z-30 mt-4 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 [scrollbar-width:none] sm:px-6 [&::-webkit-scrollbar]:hidden">
          {tabs.map((t) => {
            const active = activePanel === t.key;
            return (
              <button
                key={t.key ?? "tasks"}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => togglePanel(t.key)}
                className={`relative flex shrink-0 items-center gap-2 px-3 py-3 text-sm font-medium transition-colors ${
                  active ? theme.tabActive : theme.tabInactive
                }`}
              >
                <TabIcon name={t.icon} />
                {t.label}
                {t.count !== undefined && (
                  <span className="rounded-full bg-zinc-800 px-1.5 py-px text-[10px] font-semibold tabular-nums text-zinc-400">
                    {t.count}
                  </span>
                )}
                <span
                  className={`absolute inset-x-2 -bottom-px h-0.5 rounded-full transition-colors ${
                    active ? "bg-white" : "bg-transparent"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </nav>

      {/* ==================== MAIN LAYOUT (tasks + side panel) ==================== */}
      <main className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
          {/* -------- Tasks: always on desktop, hidden on mobile while a panel is open -------- */}
          <div
            className={`min-w-0 lg:flex-1 ${
              activePanel ? "hidden lg:block" : "w-full"
            }`}
          >
            <ActivityTasks activityId={id} ismember={member} />
          </div>

          {/* -------- Side panel -------- */}
          {activePanel && (
            <aside className="w-full min-w-0 lg:sticky lg:top-14 lg:w-[420px] xl:w-[480px]">
              <div
                className={`h-[calc(100dvh-12rem)] min-h-[360px] overflow-y-auto rounded-xl p-4 lg:h-[calc(100dvh-5.5rem)] ${theme.surface} ${SCROLL}`}
              >
                {activePanel === "members" && (
                  <MembersList
                    members={members!}
                    membersLoading={memberLoading}
                    membersError={memberError}
                  />
                )}

                {activePanel === "invite" && (
                  <SendInvite id={id} name={activity!.name} members={members} />
                )}

                {activePanel === "chat" && <ActivityChat activityId={id} />}
              </div>
            </aside>
          )}
        </div>
      </main>
    </div>
  );
}