import { useState } from "react";

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
