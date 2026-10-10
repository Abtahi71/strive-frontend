import { useState } from "react";


const theme = {
  backdrop: "bg-black/70 backdrop-blur-sm",

  // 🆕 Gradient border system
  borderGradient: "bg-gradient-to-b from-white via-zinc-400 to-zinc-700",
  borderGradientThin: "bg-gradient-to-b from-white via-zinc-500 to-zinc-800",
  borderWidth: "p-[2px]",
  borderWidthThin: "p-[1.5px]",
  borderRadius: "rounded-3xl",
  innerRadius: "rounded-[calc(1.5rem-2px)]",
  rowRadius: "rounded-2xl",
  rowInnerRadius: "rounded-[calc(1rem-1.5px)]",

  // Surfaces (dark inside the gradient border)
  surfaceSolid: "bg-zinc-950",
  surfaceSoft: "bg-zinc-900/70",

  // Gradient text
  gradientText:
    "bg-gradient-to-b from-white via-white to-zinc-400 bg-clip-text text-transparent",
  gradientTextMuted:
    "bg-gradient-to-b from-zinc-200 to-zinc-500 bg-clip-text text-transparent",

  // Buttons
  primaryBtn:
    "bg-gradient-to-b from-white to-zinc-300 text-zinc-900 hover:from-white hover:to-white",
  ghostBtn:
    "border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white",
  accentBtn: "border-2 border-blue-500 text-blue-400 hover:bg-blue-500/10",

  // Inputs
  input:
    "bg-zinc-900/70 border border-zinc-800 text-white placeholder-zinc-500 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500/50",

  // Divider
  divider: "border-zinc-800",

  // Status
  success: "text-emerald-400",
  error: "text-red-400",
  muted: "text-zinc-500",

  modalMaxWidth: "max-w-lg",
};

export default function ChecklistProgress({
  task,
  pendingId,
  successTaskId,
  errorTaskId,
  onSubmit,
}: {
  task: any;
  pendingId: string | null;
  successTaskId: string | null;
  errorTaskId: string | null;
  onSubmit: (checked: boolean) => void;
}) {
  const [checked, setChecked] = useState(false);
  const isPending = pendingId === task.id;

  return (
    <div className="mb-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
        Mark as done
      </p>

      <label className="flex cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          checked={checked}
          disabled={isPending}
          onChange={(e) => {
            const next = e.target.checked;
            setChecked(next);
            if (next) onSubmit(true); // tick => submit value 1
          }}
          className="h-5 w-5 accent-emerald-500"
        />
        <span className="text-sm text-zinc-300">
          {isPending ? "Submitting..." : "Completed this task"}
        </span>
      </label>

      {successTaskId === task.id && (
        <p
          className={`mt-3 flex items-center gap-1.5 text-sm ${theme.success}`}
        >
          <span>✓</span> Progress submitted successfully.
        </p>
      )}
      {errorTaskId === task.id && (
        <p className={`mt-3 flex items-center gap-1.5 text-sm ${theme.error}`}>
          <span>✕</span> Failed to submit progress.
        </p>
      )}
    </div>
  );
}
