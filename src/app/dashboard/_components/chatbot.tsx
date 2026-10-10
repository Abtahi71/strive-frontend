// // ChatBot.tsx
// "use client";
// import { useState, FormEvent, useRef, useEffect } from "react";
// import { useChat } from "@/src/hooks/useActivities";

// type Message = {
//   role: "user" | "assistant";
//   content: string;
// };

// export default function ChatBot() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [conversationId, setConversationId] = useState<string | null>(null);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const bottomRef = useRef<HTMLDivElement>(null);

//   const createChat = useChat();

//   // Auto-scroll to the latest message
//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, loading, isOpen]);

//   // Close on Escape
//   useEffect(() => {
//     if (!isOpen) return;
//     const onKey = (e: KeyboardEvent) => {
//       if (e.key === "Escape") setIsOpen(false);
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [isOpen]);

//   async function handleSubmit(e: FormEvent) {
//     e.preventDefault();
//     const trimmed = input.trim();
//     if (!trimmed || loading) return;

//     const userMessage: Message = { role: "user", content: trimmed };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setLoading(true);
//     setError(null);

//     try {
//       console.log("SENDING CONVERSATION ID:", conversationId);
//       createChat.mutate(
//         { message: trimmed, conversationId },
//         {
//           onSuccess: (data: any) => {
//             setConversationId(data.conversationId);
//             setMessages((prev) => [
//               ...prev,
//               { role: "assistant", content: data.response },
//             ]);
//           },
//           onError: (err: any) => {
//             const message =
//               err instanceof Error ? err.message : "Something went wrong.";
//             setError(message);
//           },
//           onSettled: () => setLoading(false),
//         }
//       );
//     } catch (err) {
//       const message =
//         err instanceof Error ? err.message : "Something went wrong.";
//       setError(message);
//       setLoading(false);
//     }
//   }

//   return (
//     <>
//       {/* Floating bot button */}
//       <button
//         type="button"
//         onClick={() => setIsOpen((v) => !v)}
//         aria-label={isOpen ? "Close chat" : "Open chat"}
//         className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-white shadow-lg transition hover:scale-105 hover:bg-zinc-800 active:scale-95"
//       >
//         {isOpen ? (
//           // X icon
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="h-6 w-6"
//           >
//             <line x1="18" y1="6" x2="6" y2="18" />
//             <line x1="6" y1="6" x2="18" y2="18" />
//           </svg>
//         ) : (
//           // Bot icon
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="h-6 w-6"
//           >
//             <rect x="4" y="8" width="16" height="12" rx="3" />
//             <line x1="12" y1="4" x2="12" y2="8" />
//             <circle cx="12" cy="3" r="1" fill="currentColor" />
//             <circle cx="9" cy="14" r="1.5" fill="currentColor" stroke="none" />
//             <circle cx="15" cy="14" r="1.5" fill="currentColor" stroke="none" />
//           </svg>
//         )}
//       </button>

//       {/* Modal */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 z-40 flex items-end justify-end bg-black/60 p-4 backdrop-blur-sm sm:items-center sm:justify-center"
//           onMouseDown={(e) => {
//             if (e.target === e.currentTarget) setIsOpen(false);
//           }}
//         >
//           <div className="flex h-[600px] w-full max-w-2xl flex-col rounded-2xl border border-zinc-800 bg-zinc-900 p-4 shadow-2xl">
//             <div className="mb-4 flex items-center justify-between">
//               <h1 className="text-lg font-semibold text-white">
//                 Chat with LLM
//               </h1>
//               <button
//                 type="button"
//                 onClick={() => setIsOpen(false)}
//                 className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-800 hover:text-white"
//                 aria-label="Close chat"
//               >
//                 ×
//               </button>
//             </div>

//             {/* Messages */}
//             <div className="flex-1 space-y-3 overflow-y-auto pr-1">
//               {messages.length === 0 && (
//                 <p className="text-sm text-zinc-500">
//                   Ask me anything to get started.
//                 </p>
//               )}

//               {messages.map((msg, i) => (
//                 <div
//                   key={i}
//                   className={`flex ${
//                     msg.role === "user" ? "justify-end" : "justify-start"
//                   }`}
//                 >
//                   <div
//                     className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2 text-sm ${
//                       msg.role === "user"
//                         ? "bg-white text-zinc-900"
//                         : "bg-zinc-800 text-white"
//                     }`}
//                   >
//                     {msg.content}
//                   </div>
//                 </div>
//               ))}

//               {loading && (
//                 <div className="flex justify-start">
//                   <div className="rounded-2xl bg-zinc-800 px-4 py-2 text-sm text-zinc-400">
//                     Thinking…
//                   </div>
//                 </div>
//               )}

//               {error && <p className="text-sm text-red-400">Error: {error}</p>}

//               <div ref={bottomRef} />
//             </div>

//             {/* Input */}
//             <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
//               <input
//                 type="text"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 placeholder="Type your message…"
//                 disabled={loading}
//                 className="flex-1 rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-zinc-600 disabled:opacity-50"
//               />
//               <button
//                 type="submit"
//                 disabled={loading || !input.trim()}
//                 className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
//               >
//                 Send
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }


// ChatBot.tsx
"use client";
import { useState, FormEvent, KeyboardEvent, useRef, useEffect } from "react";
import { useChat } from "@/src/hooks/useActivities";

type Message = {
  role: "user" | "assistant";
  content: string;
};

// Edit these to match what your backend can actually answer
const SUGGESTIONS = [
  "What should I focus on today?",
  "Give me tips to build a daily habit",
  "How do I keep a streak going?",
  "Help me plan a new activity",
];

const SCROLL =
  "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-800";

function BotIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="4" y="8" width="16" height="12" rx="3" />
      <line x1="12" y1="4" x2="12" y2="8" />
      <circle cx="12" cy="3" r="1" fill="currentColor" />
      <circle cx="9" cy="14" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="15" cy="14" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function ChatBot({ embedded = false }: { embedded?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const createChat = useChat();

  // Inline mode is always "open"
  const visible = embedded || isOpen;

  // Auto-scroll the message list (not the page) to the latest message
  useEffect(() => {
    const el = messagesRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, loading, error, visible]);

  // Focus the input when the chat appears (skip on touch devices to avoid the keyboard popping up)
  useEffect(() => {
    if (!visible) return;
    if (window.matchMedia("(pointer: fine)").matches) {
      inputRef.current?.focus();
    }
  }, [visible]);

  // Auto-grow the textarea up to a max height
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
  }, [input, visible]);

  // Close on Escape (floating mode only)
  useEffect(() => {
    if (embedded || !isOpen) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [embedded, isOpen]);

  function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMessage: Message = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      console.log("SENDING CONVERSATION ID:", conversationId);
      createChat.mutate(
        { message: trimmed, conversationId },
        {
          onSuccess: (data: any) => {
            setConversationId(data.conversationId);
            setMessages((prev) => [
              ...prev,
              { role: "assistant", content: data.response },
            ]);
          },
          onError: (err: any) => {
            const message =
              err instanceof Error ? err.message : "Something went wrong.";
            setError(message);
          },
          onSettled: () => setLoading(false),
        }
      );
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
      setLoading(false);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  // Enter sends, Shift+Enter inserts a new line
  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  function resetChat() {
    if (loading) return;
    setConversationId(null);
    setMessages([]);
    setError(null);
    setInput("");
  }

  /* ============================================================
     CHAT PANEL (shared by inline and floating modes)
  ============================================================ */
  const panel = (
    <div
      className={`flex min-h-0 flex-col ${
        embedded
          ? "h-full w-full"
          : "h-[600px] max-h-full w-full max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl"
      }`}
    >
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-zinc-800/80 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-300">
            <BotIcon className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">Assistant</h2>
            <p className="text-[11px] text-zinc-500">
              {loading ? "Thinking…" : "Ask anything"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {messages.length > 0 && (
            <button
              type="button"
              onClick={resetChat}
              disabled={loading}
              className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-zinc-400 transition hover:bg-zinc-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              New chat
            </button>
          )}

          {!embedded && (
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-800 hover:text-white"
              aria-label="Close chat"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div
        ref={messagesRef}
        className={`min-h-0 flex-1 overflow-y-auto px-4 py-4 ${SCROLL}`}
      >
        {messages.length === 0 && !loading ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 text-zinc-300">
              <BotIcon className="h-6 w-6" />
            </div>
            <p className="text-sm font-medium text-white">How can I help?</p>
            <p className="mt-1 text-xs text-zinc-500">
              Pick a suggestion or type your own question.
            </p>

            <div className="mt-5 grid w-full max-w-md grid-cols-1 gap-2 sm:grid-cols-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => sendMessage(s)}
                  className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-2.5 text-left text-xs text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-4 py-2 text-sm sm:max-w-[80%] ${
                    msg.role === "user"
                      ? "bg-white text-zinc-900"
                      : "bg-zinc-800 text-white"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div
                  className="flex items-center gap-1 rounded-2xl bg-zinc-800 px-4 py-3"
                  aria-label="Assistant is typing"
                >
                  {[0, 150, 300].map((delay) => (
                    <span
                      key={delay}
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400"
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-400"
              >
                Error: {error}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="shrink-0 border-t border-zinc-800/80 p-3"
      >
        <div className="flex items-end gap-2 rounded-xl border border-zinc-800 bg-zinc-950 p-1.5 transition focus-within:border-zinc-600">
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message…"
            className="max-h-36 flex-1 resize-none bg-transparent px-2.5 py-1.5 text-sm text-white placeholder-zinc-500 outline-none"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label="Send message"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-zinc-900 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
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
      </form>
    </div>
  );

  /* ============================================================
     INLINE MODE: just the panel, no launcher, no overlay
  ============================================================ */
  if (embedded) return panel;

  /* ============================================================
     FLOATING MODE
  ============================================================ */
  return (
    <>
      {/* Floating bot button (hidden on mobile while open so it doesn't cover Send) */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        className={`fixed bottom-6 right-6 z-50 h-14 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-white shadow-lg transition hover:scale-105 hover:bg-zinc-800 active:scale-95 ${
          isOpen ? "hidden sm:flex" : "flex"
        }`}
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <BotIcon />
        )}
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 flex items-end justify-end bg-black/60 p-4 backdrop-blur-sm sm:items-center sm:justify-center"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          {panel}
        </div>
      )}
    </>
  );
}