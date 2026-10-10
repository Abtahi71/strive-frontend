"use client";

import { useState } from "react";
import CreateActivityForm from "./CreateActivityForm";

export default function CreateActivityButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
      >
        + Create Activity
      </button>

      {open && <CreateActivityForm onClose={() => setOpen(false)} />}
    </>
  );
}
