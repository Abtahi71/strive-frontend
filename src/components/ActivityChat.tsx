


// "use client";

// import { useEffect, useState } from "react";
// import { useQueryClient } from "@tanstack/react-query";
// import { socket } from "@/src/lib/socket";
// import { Message } from "@/src/types/message";
// import { useMessages } from "@/src/hooks/useMessages";
// import { useCurrentUser } from "@/src/hooks/useUsers";

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

//   surfaceSolid: "bg-zinc-950",

//   gradientText:
//     "bg-gradient-to-b from-white via-white to-zinc-400 bg-clip-text text-transparent",
//   gradientTextMuted:
//     "bg-gradient-to-b from-zinc-200 to-zinc-500 bg-clip-text text-transparent",

//   // My message (blue)
//   myBubble:
//     "bg-gradient-to-br from-blue-500 to-blue-700 text-white border border-blue-400/30 shadow-md shadow-blue-900/40",

//   // Other's message (dark)
//   otherBubble: "bg-zinc-800/80 text-zinc-100 border border-zinc-700",

//   input:
//     "bg-zinc-900/70 border border-zinc-800 text-white placeholder-zinc-500 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500/50",
//   primaryBtn:
//     "bg-gradient-to-b from-white to-zinc-300 text-zinc-900 hover:from-white hover:to-white",

//   muted: "text-zinc-500",
//   label: "text-zinc-400",
//   error: "text-red-400",
//   divider: "border-zinc-800",
// };

// interface ActivityChatProps {
//   activityId: string;
// }

// export default function ActivityChat({ activityId }: ActivityChatProps) {
//   const queryClient = useQueryClient();

//   const { data: messages = [], isLoading, isError } = useMessages(activityId);
//   const {
//     data: user,
//     isLoading: userLoading,
//     isError: userError,
//   } = useCurrentUser();

//   const [content, setContent] = useState("");

//   /* ==================== SOCKET SETUP ==================== */
//   useEffect(() => {
//     if (!activityId) return;

//     socket.connect();
//     socket.emit("activity:join", activityId);

//     const handleNewMessage = (message: Message) => {
//       queryClient.setQueryData<Message[]>(
//         ["messages", activityId],
//         (oldMessages = []) => {
//           if (oldMessages.some((item: any) => item.id === message.id)) {
//             return oldMessages;
//           }
//           return [...oldMessages, message];
//         }
//       );
//     };

//     const handleMessageUpdated = (updatedMessage: Message) => {
//       queryClient.setQueryData<Message[]>(
//         ["messages", activityId],
//         (oldMessages = []) =>
//           oldMessages.map((message: any) =>
//             message.id === updatedMessage.id
//               ? { ...message, ...updatedMessage }
//               : message
//           )
//       );
//     };

//     const handleMessageDeleted = (deletedMessage: {
//       id: string;
//       senderId: string;
//       deletedAt: string;
//     }) => {
//       queryClient.setQueryData<Message[]>(
//         ["messages", activityId],
//         (oldMessages = []) =>
//           oldMessages.map((message: any) =>
//             message.id === deletedMessage.id
//               ? { ...message, content: null }
//               : message
//           )
//       );
//     };

//     socket.on("message:new", handleNewMessage);
//     socket.on("message:updated", handleMessageUpdated);
//     socket.on("message:deleted", handleMessageDeleted);

//     return () => {
//       socket.emit("activity:leave", activityId);
//       socket.off("message:new", handleNewMessage);
//       socket.off("message:updated", handleMessageUpdated);
//       socket.off("message:deleted", handleMessageDeleted);
//       socket.disconnect();
//     };
//   }, [activityId, queryClient]);

//   /* ==================== SEND ==================== */
//   const sendMessage = () => {
//     if (!content.trim()) return;

//     socket.emit("message:send", {
//       activityId,
//       content: content.trim(),
//     });

//     setContent("");
//   };

//   /* ==================== STATES ==================== */
//   if (isLoading || userLoading) {
//     return (
//       <div className={`${theme.borderWidth} ${theme.borderRadius} ${theme.borderGradient}`}>
//         <div className={`p-6 ${theme.surfaceSolid} ${theme.innerRadius} ${theme.muted}`}>
//           Loading chat...
//         </div>
//       </div>
//     );
//   }

//   if (isError || userError) {
//     return (
//       <div className={`${theme.borderWidth} ${theme.borderRadius} ${theme.borderGradient}`}>
//         <div className={`p-6 ${theme.surfaceSolid} ${theme.innerRadius} ${theme.error}`}>
//           Failed to load chat.
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className={`flex h-[600px] w-full flex-col ${theme.borderWidth} ${theme.borderRadius} ${theme.borderGradient} shadow-xl`}
//     >
//       <div
//         className={`flex h-full flex-col overflow-hidden ${theme.surfaceSolid} ${theme.innerRadius}`}
//       >
//         {/* ==================== HEADER ==================== */}
//         <div
//           className={`flex items-center justify-between border-b px-5 py-3 ${theme.divider}`}
//         >
//           <h2 className={`text-base font-semibold ${theme.gradientText}`}>
//             Activity Chat
//           </h2>
//           <span className={`text-xs ${theme.muted}`}>
//             {messages.length} message{messages.length === 1 ? "" : "s"}
//           </span>
//         </div>

//         {/* ==================== MESSAGES ==================== */}
//         <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
//           {messages.length === 0 ? (
//             <div
//               className={`flex h-full flex-col items-center justify-center text-center ${theme.muted}`}
//             >
//               <div className="mb-3 text-4xl">💬</div>
//               <p className="text-sm">No messages yet.</p>
//               <p className="text-xs">Be the first to say something!</p>
//             </div>
//           ) : (
//             messages.map((message: any) => {
//               const isMine =
//                 message.sender?.id === user?.id ||
//                 message.senderId === user?.id;

//               return (
//                 <div
//                   key={message.id}
//                   className={`flex w-full ${
//                     isMine ? "justify-end" : "justify-start"
//                   }`}
//                 >
//                   {/* Bubble — hugs content, max 50% width */}
//                   <div
//                     className={`max-w-[50%] min-w-0 break-words ${
//                       isMine ? theme.myBubble : theme.otherBubble
//                     } rounded-2xl px-4 py-2.5 shadow-sm`}
//                   >
//                     {/* Sender label */}
//                     <div
//                       className={`mb-1 text-xs font-semibold ${
//                         isMine ? "text-blue-100" : "text-zinc-400"
//                       }`}
//                     >
//                       {isMine
//                         ? "me"
//                         : message.sender?.username ?? "Unknown"}
//                     </div>

//                     {/* Content */}
//                     <div className="whitespace-pre-wrap text-sm leading-relaxed">
//                       {message.content ?? (
//                         <span className="italic opacity-60">
//                           This message was deleted.
//                         </span>
//                       )}
//                     </div>

//                     {/* Timestamp */}
//                     <div
//                       className={`mt-1 text-right text-[10px] ${
//                         isMine ? "text-blue-200/80" : "text-zinc-500"
//                       }`}
//                     >
//                       {new Date(message.createdAt).toLocaleTimeString([], {
//                         hour: "2-digit",
//                         minute: "2-digit",
//                       })}
//                       {message.edited && " • edited"}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           )}
//         </div>

//         {/* ==================== INPUT ==================== */}
//         <div
//           className={`flex gap-2 border-t px-4 py-3 ${theme.divider}`}
//         >
//           <input
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && !e.shiftKey) {
//                 e.preventDefault();
//                 sendMessage();
//               }
//             }}
//             placeholder="Write a message..."
//             className={`flex-1 rounded-xl px-3 py-2.5 text-sm outline-none transition ${theme.input}`}
//           />

//           <button
//             onClick={sendMessage}
//             disabled={!content.trim()}
//             className={`rounded-xl px-5 py-2.5 text-sm font-semibold shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 ${theme.primaryBtn}`}
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { socket } from "@/src/lib/socket";
import { Message } from "@/src/types/message";
import { useMessages } from "@/src/hooks/useMessages";
import { useCurrentUser } from "@/src/hooks/useUsers";
import { LoadingList } from "@/src/components/Loading";

/* ============================================================
   🎨 CENTRAL THEME — change colors here
============================================================ */
const theme = {
  gradientText:
    "bg-gradient-to-b from-white via-white to-zinc-400 bg-clip-text text-transparent",
  gradientTextMuted:
    "bg-gradient-to-b from-zinc-200 to-zinc-500 bg-clip-text text-transparent",

  // My message
  myBubble: "bg-blue-600 text-white",
  myMeta: "text-blue-200/80",

  // Others' messages
  otherBubble: "bg-zinc-800 text-zinc-100",
  otherMeta: "text-zinc-500",

  muted: "text-zinc-500",
  label: "text-zinc-400",
  error: "text-red-400",
  divider: "border-zinc-800/80",
};

const SCROLL =
  "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-800";

// Messages from the same sender within this window are visually grouped
const GROUP_WINDOW_MS = 5 * 60 * 1000;

/* ============================================================
   HELPERS
============================================================ */
/** "Oct 9 · 10:32 AM" (the year is added when it isn't the current year) */
function formatStamp(dateStr: string) {
  const d = new Date(dateStr);
  const sameYear = d.getFullYear() === new Date().getFullYear();

  const date = d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    ...(sameYear ? {} : { year: "numeric" }),
  });

  const time = d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${date} · ${time}`;
}

function fullStamp(dateStr: string) {
  return new Date(dateStr).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/* ============================================================
   COMPONENT
============================================================ */
interface ActivityChatProps {
  activityId: string;
}

export default function ActivityChat({ activityId }: ActivityChatProps) {
  const queryClient = useQueryClient();

  const { data: messages = [], isLoading, isError } = useMessages(activityId);
  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useCurrentUser();

  const [content, setContent] = useState("");
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  /* ==================== SOCKET SETUP ==================== */
  useEffect(() => {
    if (!activityId) return;

    socket.connect();
    socket.emit("activity:join", activityId);

    const handleNewMessage = (message: Message) => {
      queryClient.setQueryData<Message[]>(
        ["messages", activityId],
        (oldMessages = []) => {
          if (oldMessages.some((item: any) => item.id === message.id)) {
            return oldMessages;
          }
          return [...oldMessages, message];
        }
      );
    };

    const handleMessageUpdated = (updatedMessage: Message) => {
      queryClient.setQueryData<Message[]>(
        ["messages", activityId],
        (oldMessages = []) =>
          oldMessages.map((message: any) =>
            message.id === updatedMessage.id
              ? { ...message, ...updatedMessage }
              : message
          )
      );
    };

    const handleMessageDeleted = (deletedMessage: {
      id: string;
      senderId: string;
      deletedAt: string;
    }) => {
      queryClient.setQueryData<Message[]>(
        ["messages", activityId],
        (oldMessages = []) =>
          oldMessages.map((message: any) =>
            message.id === deletedMessage.id
              ? { ...message, content: null }
              : message
          )
      );
    };

    socket.on("message:new", handleNewMessage);
    socket.on("message:updated", handleMessageUpdated);
    socket.on("message:deleted", handleMessageDeleted);

    return () => {
      socket.emit("activity:leave", activityId);
      socket.off("message:new", handleNewMessage);
      socket.off("message:updated", handleMessageUpdated);
      socket.off("message:deleted", handleMessageDeleted);
      socket.disconnect();
    };
  }, [activityId, queryClient]);

  /* ==================== UI EFFECTS ==================== */
  // Keep the message list (not the page) scrolled to the newest message
  useEffect(() => {
    const el = messagesRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages.length, isLoading, userLoading]);

  // Auto-grow the textarea up to a max height
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [content, isLoading, userLoading]);

  /* ==================== SEND ==================== */
  const sendMessage = () => {
    if (!content.trim()) return;

    socket.emit("message:send", {
      activityId,
      content: content.trim(),
    });

    setContent("");
  };

  /* ==================== STATES ==================== */
  if (isLoading || userLoading) {
    return <LoadingList rows={6} className="p-2" />;
  }

  if (isError || userError) {
    return (
      <div className="flex h-full min-h-[200px] flex-col items-center justify-center text-center">
        <div className="mb-2 text-3xl">⚠️</div>
        <p className={`text-sm font-medium ${theme.error}`}>
          Failed to load chat.
        </p>
      </div>
    );
  }

  /* ==================== MAIN ==================== */
  return (
    <div className="flex h-full min-h-0 w-full flex-col">
      {/* ==================== HEADER ==================== */}
      <div
        className={`flex shrink-0 items-center justify-between gap-3 border-b pb-3 ${theme.divider}`}
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-300">
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
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <h2 className={`text-sm font-semibold ${theme.gradientText}`}>
            Activity chat
          </h2>
        </div>

        <span className={`text-xs tabular-nums ${theme.muted}`}>
          {messages.length} message{messages.length === 1 ? "" : "s"}
        </span>
      </div>

      {/* ==================== MESSAGES ==================== */}
      <div
        ref={messagesRef}
        className={`min-h-0 flex-1 overflow-y-auto py-4 pr-1 ${SCROLL}`}
      >
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 text-2xl">
              💬
            </div>
            <p className="text-sm font-medium text-white">No messages yet</p>
            <p className={`mt-1 text-xs ${theme.muted}`}>
              Be the first to say something!
            </p>
          </div>
        ) : (
          <div className="flex flex-col">
            {messages.map((message: any, index: number) => {
              const senderId = message.sender?.id ?? message.senderId;
              const isMine = senderId === user?.id;

              const prev: any = messages[index - 1];
              const prevSenderId = prev?.sender?.id ?? prev?.senderId;

              // First message of a run from the same sender
              const startsGroup =
                !prev ||
                prevSenderId !== senderId ||
                new Date(message.createdAt).getTime() -
                  new Date(prev.createdAt).getTime() >
                  GROUP_WINDOW_MS;

              const name = isMine
                ? "You"
                : message.sender?.username ?? "Unknown";

              return (
                <div
                  key={message.id}
                  className={`flex w-full items-end gap-2 ${
                    isMine ? "justify-end" : "justify-start"
                  } ${startsGroup ? "mt-3 first:mt-0" : "mt-0.5"}`}
                >
                  {/* Avatar (others only; spacer keeps grouped bubbles aligned) */}
                  {!isMine &&
                    (startsGroup ? (
                      message.sender?.avatar ? (
                        <img
                          src={message.sender.avatar}
                          alt={name}
                          className="h-7 w-7 shrink-0 rounded-full border border-zinc-800 object-cover"
                        />
                      ) : (
                        <div
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-zinc-800 bg-gradient-to-br from-zinc-700 to-zinc-900 text-[11px] font-semibold ${theme.gradientTextMuted}`}
                        >
                          {name.charAt(0).toUpperCase()}
                        </div>
                      )
                    ) : (
                      <div className="w-7 shrink-0" />
                    ))}

                  <div
                    className={`flex min-w-0 max-w-[85%] flex-col sm:max-w-[75%] ${
                      isMine ? "items-end" : "items-start"
                    }`}
                  >
                    {/* Sender label (first message of a group, others only) */}
                    {startsGroup && !isMine && (
                      <span
                        className={`mb-1 px-1 text-[11px] font-medium ${theme.label}`}
                      >
                        {name}
                      </span>
                    )}

                    <div
                      className={`min-w-0 break-words rounded-2xl px-3.5 py-2 ${
                        isMine
                          ? `${theme.myBubble} ${
                              startsGroup ? "" : "rounded-tr-md"
                            } rounded-br-md`
                          : `${theme.otherBubble} ${
                              startsGroup ? "" : "rounded-tl-md"
                            } rounded-bl-md`
                      }`}
                    >
                      {/* Content */}
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {message.content ?? (
                          <span className="italic opacity-60">
                            This message was deleted.
                          </span>
                        )}
                      </div>

                      {/* Date + time on every message */}
                      <div
                        title={fullStamp(message.createdAt)}
                        className={`mt-1 text-right text-[10px] tabular-nums ${
                          isMine ? theme.myMeta : theme.otherMeta
                        }`}
                      >
                        {formatStamp(message.createdAt)}
                        {message.edited && " · edited"}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ==================== INPUT ==================== */}
      <div className={`shrink-0 border-t pt-3 ${theme.divider}`}>
        <div className="flex items-end gap-2 rounded-xl border border-zinc-800 bg-zinc-950 p-1.5 transition focus-within:border-zinc-600">
          <textarea
            ref={inputRef}
            rows={1}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                !e.shiftKey &&
                !e.nativeEvent.isComposing
              ) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Write a message..."
            className="max-h-[120px] flex-1 resize-none bg-transparent px-2.5 py-1.5 text-sm text-white placeholder-zinc-500 outline-none"
          />

          <button
            type="button"
            onClick={sendMessage}
            disabled={!content.trim()}
            aria-label="Send message"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-zinc-900 transition hover:bg-zinc-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </button>
        </div>

        <p className="mt-1.5 hidden px-1 text-[10px] text-zinc-600 sm:block">
          Enter to send · Shift+Enter for a new line
        </p>
      </div>
    </div>
  );
}