// "use client"

// import { useState } from "react";
// import Searchbar from "./SearchBar";
// import { useSendInvite } from "../hooks/useActivities";

// export default function SendInvite({id,name,members}:{id:string,name:string,members:any}) {
//     const [receiverId, setReceiverId] = useState("");
//     const {mutate:invite, isPending,error} = useSendInvite(id,receiverId,name);
//     console.log("THIS IS THE RECIPIENT",receiverId)
    

//     return (
//         <div className="text-black">
//             <button disabled={isPending || !receiverId} className={isPending ? "bg-gray-400" : ""} onClick={()=>{invite()}}>{isPending ? "Sending..." : "Send Invite"}</button>
//             <Searchbar onUserSelect={setReceiverId} members={members} id={id}/>
//         </div>
        
//     )
// }

"use client";

import { useState } from "react";
import Searchbar from "./SearchBar";
import { useGetInvites, useSendInvite } from "../hooks/useActivities";


/* ============================================================
   🎨 CENTRAL THEME — change colors here
============================================================ */
const theme = {
  borderGradient: "bg-gradient-to-b from-white via-zinc-400 to-zinc-700",
  borderWidth: "p-[2px]",
  borderRadius: "rounded-3xl",
  innerRadius: "rounded-[calc(1.5rem-2px)]",

  surfaceSolid: "bg-zinc-950",

  gradientText:
    "bg-gradient-to-b from-white via-white to-zinc-400 bg-clip-text text-transparent",
  gradientTextMuted:
    "bg-gradient-to-b from-zinc-200 to-zinc-500 bg-clip-text text-transparent",

  primaryBtn:
    "bg-gradient-to-b from-white to-zinc-300 text-zinc-900 hover:from-white hover:to-white",
  accentBtn: "border-2 border-blue-500 text-blue-400 hover:bg-blue-500/10",

  muted: "text-zinc-500",
  label: "text-zinc-400",
  success: "text-emerald-400",
  error: "text-red-400",
};

export default function SendInvite({
  id,
  name,
  members,
}: {
  id: string;
  name: string;
  members: any;
}) {
  const [receiverId, setReceiverId] = useState("");
  const {
    mutate: invite,
    isPending,
    error,
    isSuccess,
  } = useSendInvite(id, receiverId, name);

  const {data:invitations,isLoading} = useGetInvites(id);

  return (
    <div className="w-full">
      {/* ==================== HEADER ==================== */}
      <div className="mb-5">
        <h2 className={`text-xl font-semibold ${theme.gradientText}`}>
          Invite Members
        </h2>
        <p className={`mt-1 text-sm ${theme.muted}`}>
          Search for a user and send them an invite to join{" "}
          <span className="text-zinc-300">{name}</span>.
        </p>
      </div>

      {/* ==================== SEARCH ==================== */}
      <div className="mb-5">
        <Searchbar onUserSelect={setReceiverId} members={members} id={id} invitations={invitations} />
      </div>

      {/* ==================== SEND BUTTON ==================== */}
      <div className="flex flex-col gap-3">
        <button
          disabled={isPending || !receiverId}
          onClick={() => invite()}
          className={`w-full rounded-2xl px-5 py-3 text-sm font-semibold shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 ${theme.primaryBtn}`}
        >
          {isPending ? "Sending invite..." : "Send Invite"}
        </button>

        {/* Status messages */}
        {isSuccess && (
          <p className={`flex items-center gap-2 text-sm ${theme.success}`}>
            <span>✓</span>
            Invite sent successfully.
          </p>
        )}

        {error && (
          <p className={`flex items-center gap-2 text-sm ${theme.error}`}>
            <span>✕</span>
            {error.message}
          </p>
        )}
      </div>
    </div>
  );
}