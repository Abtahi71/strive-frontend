"use client";

import { useEffect, useState } from "react";
import { useUser } from "../hooks/useActivities";

/* ============================================================
   🎨 CENTRAL THEME — change colors here
============================================================ */
const theme = {
  borderGradient: "bg-gradient-to-b from-white via-zinc-500 to-zinc-800",
  borderWidth: "p-[1.5px]",
  borderRadius: "rounded-2xl",
  innerRadius: "rounded-[calc(1rem-1.5px)]",

  surface: "bg-zinc-950",

  gradientText:
    "bg-gradient-to-b from-white via-white to-zinc-400 bg-clip-text text-transparent",
  gradientTextMuted:
    "bg-gradient-to-b from-zinc-200 to-zinc-500 bg-clip-text text-transparent",

  input:
    "bg-zinc-900/70 border border-zinc-800 text-white placeholder-zinc-500 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500/50",

  muted: "text-zinc-500",
  label: "text-zinc-400",
  error: "text-red-400",

  rowHover: "hover:bg-zinc-800/60",
  rowSelected: "bg-zinc-800",
  rowDisabled: "opacity-40 cursor-not-allowed",

  memberTag: "bg-blue-500/15 text-blue-300 border border-blue-500/30",
};

export default function FriendSearch({ onUserSelect, pending, friends }: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  const { data: users, isLoading, error } = useUser(debouncedValue);

  console.log("THIS IS THE PENDING USERS", pending);

  console.log("THIS IS THE FRIENDS", friends);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div className="w-full space-y-3">
      {/* ==================== SEARCH INPUT ==================== */}
      <div className="relative w-full">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
          🔍
        </span>

        <input
          type="text"
          placeholder="Search users by username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full rounded-2xl py-3 pl-10 pr-4 text-sm outline-none transition ${theme.input}`}
        />
      </div>

      {/* ==================== STATES ==================== */}
      {isLoading && (
        <p className={`px-1 text-sm ${theme.muted}`}>Searching...</p>
      )}

      {error && (
        <p className={`px-1 text-sm ${theme.error}`}>Error: {error.message}</p>
      )}

      {/* ==================== RESULTS ==================== */}
      <div className="flex flex-col gap-2">
        {users?.user.map((user: any) => {
          const isFriend = friends?.some(
            (friend: any) => friend.userid === user.id
          );

          const isPending = pending?.some(
            (request: any) => request.userid === user.id
          );
          const isSelected = selectedUser === user.id;

          return (
            <button
              key={user.id}
              type="button"
              disabled={isFriend || isPending}
              onClick={() => {
                if (isFriend || isPending) return;
                onUserSelect(user.id);
                setSelectedUser(user.id);
              }}
              className={`w-full text-left transition ${
                isFriend || isPending
                  ? theme.rowDisabled
                  : `cursor-pointer ${theme.rowHover}`
              }`}
            >
              {/* Gradient border row */}
              <div
                className={`${theme.borderWidth} ${theme.borderRadius} ${
                  isSelected
                    ? "bg-gradient-to-b from-blue-300 via-blue-500 to-blue-800"
                    : theme.borderGradient
                }`}
              >
                <div
                  className={`flex items-center justify-between gap-3 p-3 ${
                    isSelected ? "bg-zinc-900" : theme.surface
                  } ${theme.innerRadius}`}
                >
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 bg-gradient-to-b from-zinc-700 to-zinc-900 text-sm font-semibold ${theme.gradientTextMuted}`}
                    >
                      {user.username?.charAt(0).toUpperCase() ?? "?"}
                    </div>

                    <div>
                      <p className="text-sm font-medium text-white">
                        {user.username}
                      </p>
                      {isSelected && (
                        <p className="text-xs text-blue-300">Selected</p>
                      )}
                    </div>
                  </div>

                  {/* Member tag */}
                  {isFriend?(
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${theme.memberTag}`}
                    >
                      Friend
                    </span>
                  ):isPending ? (
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${theme.memberTag}`}
                    >
                      Requested
                    </span>
                  ):null}
                </div>
              </div>
            </button>
          );
        })}

        {/* No results */}
        {debouncedValue && !isLoading && users?.length === 0 && (
          <p className={`px-1 py-4 text-center text-sm ${theme.muted}`}>
            No users found for "{debouncedValue}"
          </p>
        )}
      </div>
    </div>
  );
}
