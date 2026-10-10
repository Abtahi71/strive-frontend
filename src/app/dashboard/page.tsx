

// "use client";

// import { useState } from "react";
// import Invitations from "@/src/components/Invitations";
// import MyActivities from "./_components/MyActvities";
// import FriendList from "@/src/components/FriendList";
// import FriendRequests from "@/src/components/FriendRequests";
// import TodaysTasks from "@/src/components/TodaysTask";
// import CreateActivityForm from "@/src/components/CreateActivityForm";
// import MyCreatedActivities from "@/src/components/MyCreatedActivites";
// import CreateActivityButton from "@/src/components/CreateActivityButton";
// import ActivityHeatmap from "@/src/components/Progress";
// import ChatBot from "./_components/chatbot";
// import UsagePage from "@/src/components/usagePage";

// export default function DashboardPage() {
//   const [showFriends, setShowFriends] = useState(false);

//   return (
//     <div className="min-h-screen bg-zinc-950 text-white">
//       <div className="mx-auto max-w-7xl px-6 py-10">
//         {/* Header */}
//         <div className="mb-10 flex items-end justify-between">
//           <div>
//             <p className="mb-1 text-xs uppercase tracking-[0.18em] text-zinc-600">
//               Overview
//             </p>
//             <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
//           </div>

//           <div className="flex items-center gap-3">
//             <button
//               type="button"
//               onClick={() => setShowFriends(true)}
//               className="rounded-lg border border-zinc-800 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"
//             >
//               Friends
//             </button>

//             <CreateActivityButton />
//           </div>
//         </div>

//         <div>
//           <ActivityHeatmap />
//         </div>

//         <div>
//           <UsagePage/>
//         </div>

//         <div>
//           <ChatBot/>
//         </div>

//         {/* Activities */}
//         <section>
//           <div className="">
//             <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
//               Activities
//             </p>
//           </div>

//           <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:divide-x lg:divide-zinc-800">
//             {/* My Activities */}
//             <div className="min-w-0">
//               <div className="max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-800">
//                 <MyActivities />
//               </div>
//             </div>

//             {/* Created Activities */}
//             <div className="min-w-0">
//               <div className="max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-800">
//                 <MyCreatedActivities />
//               </div>
//             </div>
//           </div>
//         </section>

//         <div className="my-8 h-px bg-zinc-800" />

//         {/* Invitations + Friend Requests */}
//         <section className="mt-10">
//           <div className="mb-4">
//             <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
//               Social
//             </p>
//             <h2 className="mt-1 text-lg font-semibold">
//               Activity & Social Updates
//             </h2>
//           </div>

//           <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:divide-x lg:divide-zinc-800">
//             <Invitations />
//             <FriendRequests />
//           </div>
//         </section>
//       </div>

//       {/* Friend Modal */}
//       {showFriends && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
//           onMouseDown={(e) => {
//             if (e.target === e.currentTarget) {
//               setShowFriends(false);
//             }
//           }}
//         >
//           <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
//             {/* Close */}
//             <button
//               type="button"
//               onClick={() => setShowFriends(false)}
//               className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-900 hover:text-white"
//               aria-label="Close friends"
//             >
//               ×
//             </button>

//             <FriendList />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



"use client";

import { useEffect, useState, type ReactNode } from "react";
import Invitations from "@/src/components/Invitations";
import MyActivities from "./_components/MyActvities";
import FriendList from "@/src/components/FriendList";
import FriendRequests from "@/src/components/FriendRequests";
import MyCreatedActivities from "@/src/components/MyCreatedActivites";
import CreateActivityButton from "@/src/components/CreateActivityButton";
import ActivityHeatmap from "@/src/components/Progress";
import ChatBot from "./_components/chatbot";
import UsagePage from "@/src/components/usagePage";

/* ============================================================
   TABS
============================================================ */
type TabKey = "overview" | "activities" | "usage" | "social" | "assistant";

const TABS: { key: TabKey; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "activities", label: "Activities" },
  { key: "usage", label: "Usage" },
  { key: "social", label: "Social" },
  { key: "assistant", label: "Assistant" },
];

const SCROLL =
  "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-800";

const PANE_HEIGHT = {
  // no mobile switch above the pane
  full: "h-[calc(100dvh-10rem)]",
  // mobile segmented switch sits above the pane
  split: "h-[calc(100dvh-13rem)] lg:h-[calc(100dvh-10rem)]",
};

/* ============================================================
   SMALL UI PIECES
============================================================ */
function TabIcon({ name }: { name: TabKey }) {
  const icons: Record<TabKey, ReactNode> = {
    overview: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </>
    ),
    activities: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="12" cy="12" r="0.8" />
      </>
    ),
    usage: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    social: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    assistant: (
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
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

function Surface({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`min-w-0 rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-4 ${className}`}
    >
      {children}
    </div>
  );
}

function Pane({
  children,
  height = "full",
}: {
  children: ReactNode;
  height?: keyof typeof PANE_HEIGHT;
}) {
  return (
    <div
      className={`${PANE_HEIGHT[height]} min-h-[360px] overflow-y-auto rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-4 ${SCROLL}`}
    >
      {children}
    </div>
  );
}

/**
 * Two panes side by side on desktop.
 * On mobile only one is visible, chosen with a segmented switch.
 */
function SplitView({
  panes,
}: {
  panes: { key: string; label: string; node: ReactNode }[];
}) {
  const [active, setActive] = useState(panes[0].key);

  return (
    <>
      <div
        className="mb-3 grid grid-cols-2 gap-1 rounded-lg border border-zinc-800 bg-zinc-900/40 p-1 lg:hidden"
        role="tablist"
      >
        {panes.map((p) => (
          <button
            key={p.key}
            type="button"
            role="tab"
            aria-selected={active === p.key}
            onClick={() => setActive(p.key)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
              active === p.key
                ? "bg-zinc-800 text-white"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {panes.map((p) => (
          <div
            key={p.key}
            className={`min-w-0 ${
              active === p.key ? "block" : "hidden"
            } lg:block`}
          >
            <Pane height="split">{p.node}</Pane>
          </div>
        ))}
      </div>
    </>
  );
}

/* ============================================================
   PAGE
============================================================ */
export default function DashboardPage() {
  const [showFriends, setShowFriends] = useState(false);
  const [tab, setTab] = useState<TabKey>("overview");
  // Tabs mount on first visit and then stay mounted (keeps chat state, avoids refetch flicker)
  const [visited, setVisited] = useState<Set<TabKey>>(
    () => new Set<TabKey>(["overview"])
  );

  const goTo = (key: TabKey) => {
    setTab(key);
    setVisited((prev) => (prev.has(key) ? prev : new Set(prev).add(key)));
  };

  useEffect(() => {
    if (!showFriends) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowFriends(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showFriends]);

  const panel = (key: TabKey, node: ReactNode) =>
    visited.has(key) && (
      <div
        key={key}
        role="tabpanel"
        id={`panel-${key}`}
        aria-labelledby={`tab-${key}`}
        hidden={tab !== key}
      >
        {node}
      </div>
    );

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* ==================== STICKY HEADER + TABS ==================== */}
      <header className="sticky top-0 z-30 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between gap-3 pt-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                Overview
              </p>
              <h1 className="text-lg font-semibold tracking-tight">
                Dashboard
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowFriends(true)}
                className="flex items-center gap-2 rounded-lg border border-zinc-800 px-3.5 py-2 text-sm font-medium text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"
              >
                <TabIcon name="social" />
                Friends
              </button>

              <CreateActivityButton />
            </div>
          </div>

          <nav
            role="tablist"
            aria-label="Dashboard sections"
            className="-mb-px mt-3 flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {TABS.map((t) => {
              const active = tab === t.key;
              return (
                <button
                  key={t.key}
                  type="button"
                  role="tab"
                  id={`tab-${t.key}`}
                  aria-selected={active}
                  aria-controls={`panel-${t.key}`}
                  onClick={() => goTo(t.key)}
                  className={`relative flex shrink-0 items-center gap-2 px-3 py-3 text-sm font-medium transition-colors ${
                    active ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <TabIcon name={t.key} />
                  {t.label}
                  <span
                    className={`absolute inset-x-2 -bottom-px h-0.5 rounded-full transition-colors ${
                      active ? "bg-white" : "bg-transparent"
                    }`}
                  />
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* ==================== CONTENT ==================== */}
      <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
        {panel(
          "overview",
          <div className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-3">
              <Surface className="overflow-x-auto lg:col-span-2">
                <ActivityHeatmap />
              </Surface>

              <Surface>
                <UsagePage
                  variant="compact"
                  limit={5}
                  onViewAll={() => goTo("usage")}
                />
              </Surface>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <Surface>
                <MyActivities limit={5} onViewAll={() => goTo("activities")} />
              </Surface>

              <Surface>
                <MyCreatedActivities
                  limit={4}
                  onViewAll={() => goTo("activities")}
                />
              </Surface>
            </div>
          </div>
        )}

        {panel(
          "activities",
          <SplitView
            panes={[
              { key: "joined", label: "My activities", node: <MyActivities /> },
              {
                key: "created",
                label: "Created by me",
                node: <MyCreatedActivities />,
              },
            ]}
          />
        )}

        {panel(
          "usage",
          <Pane>
            <UsagePage variant="full" />
          </Pane>
        )}

        {panel(
          "social",
          <SplitView
            panes={[
              {
                key: "invitations",
                label: "Invitations",
                node: <Invitations />,
              },
              {
                key: "requests",
                label: "Friend requests",
                node: <FriendRequests />,
              },
            ]}
          />
        )}

        {panel(
          "assistant",
          <div className="h-[calc(100dvh-10rem)] min-h-[360px] overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/30">
            <ChatBot embedded />
          </div>
        )}
      </main>

      {/* ==================== FRIENDS DRAWER ==================== */}
      {showFriends && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setShowFriends(false);
            }
          }}
        >
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Friends"
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-zinc-800 bg-zinc-950 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-zinc-900 px-5 py-4">
              <h2 className="text-sm font-semibold">Friends</h2>
              <button
                type="button"
                onClick={() => setShowFriends(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-900 hover:text-white"
                aria-label="Close friends"
              >
                ×
              </button>
            </div>

            <div className={`flex-1 overflow-y-auto p-5 ${SCROLL}`}>
              <FriendList />
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}