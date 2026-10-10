// // src/components/CreateTaskForm.tsx
// "use client";

// import { useState } from "react";
// import { useCreateTask } from "@/src/hooks/useActivities";

// const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

// export default function CreateTaskForm({
//   activityId,
//   onCloseAction,
// }: {
//   activityId: string;
//   onCloseAction: () => void;
// }) {
//   const createTask = useCreateTask(activityId);

//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     imageUrl: "",
//     unit: "",
//     targetValue: 0,
//     scheduleType: "DAILY",
//     days: [] as string[],
//   });

//   const toggleDay = (day: string) => {
//     setForm((prev) => ({
//       ...prev,
//       days: prev.days.includes(day)
//         ? prev.days.filter((d) => d !== day)
//         : [...prev.days, day],
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await createTask.mutateAsync(form);
//     setForm({
//       name: "",
//       description: "",
//       imageUrl: "",
//       unit: "",
//       targetValue: 0,
//       scheduleType: "DAILY",
//       days: [],
//     });
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       style={{
//         maxWidth: "400px",
//         padding: "20px",
//         border: "1px solid #ddd",
//         borderRadius: "8px",
//         background: "#fafafa",
//         display: "flex",
//         flexDirection: "column",
//         gap: "12px",
//       }}
//     >
//       <h3 style={{ margin: "0 0 8px 0", fontSize: "1.2rem" }}>Add Task</h3>

//       <label
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           gap: "4px",
//           fontSize: "0.9rem",
//         }}
//       >
//         Name
//         <input
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//           required
//           style={inputStyle}
//         />
//       </label>

//       <label
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           gap: "4px",
//           fontSize: "0.9rem",
//         }}
//       >
//         Description
//         <textarea
//           value={form.description}
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//           rows={3}
//           style={{ ...inputStyle, resize: "vertical" }}
//         />
//       </label>

//       <label
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           gap: "4px",
//           fontSize: "0.9rem",
//         }}
//       >
//         Image URL
//         <input
//           value={form.imageUrl}
//           onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
//           style={inputStyle}
//         />
//       </label>

//       <label
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           gap: "4px",
//           fontSize: "0.9rem",
//         }}
//       >
//         Unit
//         <input
//           value={form.unit}
//           onChange={(e) => setForm({ ...form, unit: e.target.value })}
//           style={inputStyle}
//         />
//       </label>

//       <label
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           gap: "4px",
//           fontSize: "0.9rem",
//         }}
//       >
//         Target Value
//         <input
//           type="number"
//           value={form.targetValue}
//           onChange={(e) =>
//             setForm({ ...form, targetValue: Number(e.target.value) })
//           }
//           style={inputStyle}
//         />
//       </label>

//       <label
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           gap: "4px",
//           fontSize: "0.9rem",
//         }}
//       >
//         Schedule Type
//         <select
//           value={form.scheduleType}
//           onChange={(e) => setForm({ ...form, scheduleType: e.target.value })}
//           style={inputStyle}
//         >
//           <option value="DAILY">Daily</option>
//           <option value="WEEKLY">Weekly</option>
//           <option value="CUSTOM">Custom Days</option>
//         </select>
//       </label>

//       {form.scheduleType === "CUSTOM" && (
//         <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
//           {DAYS.map((day) => (
//             <label
//               key={day}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "4px",
//                 fontSize: "0.85rem",
//                 cursor: "pointer",
//               }}
//             >
//               <input
//                 type="checkbox"
//                 checked={form.days.includes(day)}
//                 onChange={() => toggleDay(day)}
//               />
//               {day}
//             </label>
//           ))}
//         </div>
//       )}

//       <button
//         type="submit"
//         disabled={createTask.isPending}
//         style={{
//           marginTop: "8px",
//           padding: "10px",
//           background: createTask.isPending ? "#aaa" : "#2563eb",
//           color: "white",
//           border: "none",
//           borderRadius: "6px",
//           cursor: createTask.isPending ? "not-allowed" : "pointer",
//           fontWeight: 500,
//         }}
//       >
//         {createTask.isPending ? "Adding..." : "Add Task"}
//       </button>

//       {createTask.isError && (
//         <p style={{ color: "#dc2626", margin: 0, fontSize: "0.9rem" }}>
//           {(createTask.error as Error).message}
//         </p>
//       )}
//     </form>
//   );
// }

// const inputStyle: React.CSSProperties = {
//   padding: "8px 10px",
//   border: "1px solid #ccc",
//   borderRadius: "6px",
//   fontSize: "0.95rem",
// };


// src/components/CreateTaskForm.tsx
"use client";

import { useState } from "react";
import { useCreateTask } from "@/src/hooks/useActivities";

/* ============================================================
   🎨 CENTRAL THEME — change colors here
============================================================ */
const theme = {
  backdrop: "bg-black/70 backdrop-blur-sm",

  borderGradient: "bg-gradient-to-b from-white via-zinc-400 to-zinc-700",
  borderGradientThin: "bg-gradient-to-b from-white via-zinc-500 to-zinc-800",
  borderWidth: "p-[2px]",
  borderWidthThin: "p-[1.5px]",
  borderRadius: "rounded-3xl",
  innerRadius: "rounded-[calc(1.5rem-2px)]",

  surfaceSolid: "bg-zinc-950",
  surfaceSoft: "bg-zinc-900/60",

  gradientText:
    "bg-gradient-to-b from-white via-white to-zinc-400 bg-clip-text text-transparent",
  gradientTextMuted:
    "bg-gradient-to-b from-zinc-200 to-zinc-500 bg-clip-text text-transparent",

  primaryBtn:
    "bg-gradient-to-b from-white to-zinc-300 text-zinc-900 hover:from-white hover:to-white",
  ghostBtn:
    "border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white",

  input:
    "bg-zinc-900/70 border border-zinc-800 text-white placeholder-zinc-500 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500/50",

  dayBtnOn:
    "bg-gradient-to-b from-white to-zinc-300 text-zinc-900 border border-white/20 shadow-md",
  dayBtnOff:
    "border border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white",

  divider: "border-zinc-800",

  muted: "text-zinc-500",
  label: "text-zinc-400",
  error: "text-red-400",
  success: "text-emerald-400",
};

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export default function CreateTaskForm({
  activityId,
  onCloseAction,
}: {
  activityId: string;
  onCloseAction: () => void;
}) {
  const createTask = useCreateTask(activityId);

  const [form, setForm] = useState({
    name: "",
    description: "",
    imageUrl: "",
    unit: "",
    targetValue: 0,
    scheduleType: "DAILY",
    days: [] as string[],
  });

  const toggleDay = (day: string) => {
    setForm((prev) => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTask.mutateAsync(form);
    setForm({
      name: "",
      description: "",
      imageUrl: "",
      unit: "",
      targetValue: 0,
      scheduleType: "DAILY",
      days: [],
    });
  };

  return (
    /* ==================== MODAL BACKDROP ==================== */
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${theme.backdrop}`}
      onClick={onCloseAction}
    >
      {/* Gradient border wrapper */}
      <div
        className={`w-full max-w-xl ${theme.borderWidth} ${theme.borderRadius} ${theme.borderGradient} shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <form
          onSubmit={handleSubmit}
          className={`max-h-[85vh] overflow-y-auto p-6 lg:p-7 ${theme.surfaceSolid} ${theme.innerRadius}`}
        >
          {/* ==================== HEADER ==================== */}
          <div
            className={`mb-6 flex items-center justify-between border-b pb-4 ${theme.divider}`}
          >
            <div>
              <h3 className={`text-xl font-semibold ${theme.gradientText}`}>
                Add Task
              </h3>
              <p className={`mt-1 text-xs ${theme.muted}`}>
                Fill in the details to create a new task.
              </p>
            </div>

            <button
              type="button"
              onClick={onCloseAction}
              className="rounded-lg px-3 py-1 text-xl text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
            >
              ×
            </button>
          </div>

          {/* ==================== FORM FIELDS ==================== */}
          <div className="flex flex-col gap-4">
            {/* Name */}
            <FormField label="Name">
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                placeholder="e.g. Morning Run"
                className={`w-full rounded-xl px-3 py-2.5 text-sm outline-none transition ${theme.input}`}
              />
            </FormField>

            {/* Description */}
            <FormField label="Description">
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={3}
                placeholder="What is this task about?"
                className={`w-full resize-none rounded-xl px-3 py-2.5 text-sm outline-none transition ${theme.input}`}
              />
            </FormField>

            {/* Image URL */}
            <FormField label="Image URL">
              <input
                value={form.imageUrl}
                onChange={(e) =>
                  setForm({ ...form, imageUrl: e.target.value })
                }
                placeholder="https://..."
                className={`w-full rounded-xl px-3 py-2.5 text-sm outline-none transition ${theme.input}`}
              />
            </FormField>

            {/* Unit + Target */}
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Unit">
                <input
                  value={form.unit}
                  onChange={(e) =>
                    setForm({ ...form, unit: e.target.value })
                  }
                  placeholder="e.g. km, reps"
                  className={`w-full rounded-xl px-3 py-2.5 text-sm outline-none transition ${theme.input}`}
                />
              </FormField>

              <FormField label="Target value">
                <input
                  type="number"
                  value={form.targetValue}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      targetValue: Number(e.target.value),
                    })
                  }
                  placeholder="0"
                  className={`w-full rounded-xl px-3 py-2.5 text-sm outline-none transition ${theme.input}`}
                />
              </FormField>
            </div>

            {/* Schedule Type */}
            <FormField label="Schedule type">
              <select
                value={form.scheduleType}
                onChange={(e) =>
                  setForm({ ...form, scheduleType: e.target.value })
                }
                className={`w-full rounded-xl px-3 py-2.5 text-sm outline-none transition ${theme.input}`}
              >
                <option value="DAILY">Daily</option>
                <option value="WEEKLY">Weekly</option>
                <option value="CUSTOM">Custom Days</option>
              </select>
            </FormField>

            {/* Custom days */}
            {form.scheduleType === "CUSTOM" && (
              <FormField label="Days">
                <div className="flex flex-wrap gap-2">
                  {DAYS.map((day) => {
                    const isOn = form.days.includes(day);
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleDay(day)}
                        className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
                          isOn ? theme.dayBtnOn : theme.dayBtnOff
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </FormField>
            )}
          </div>

          {/* ==================== ACTIONS ==================== */}
          <div
            className={`mt-6 flex items-center justify-end gap-3 border-t pt-5 ${theme.divider}`}
          >
            <button
              type="button"
              onClick={onCloseAction}
              className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${theme.ghostBtn}`}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={createTask.isPending}
              className={`rounded-xl px-5 py-2.5 text-sm font-semibold shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 ${theme.primaryBtn}`}
            >
              {createTask.isPending ? "Adding..." : "Add Task"}
            </button>
          </div>

          {/* ==================== STATUS ==================== */}
          {createTask.isError && (
            <p className={`mt-4 flex items-center gap-2 text-sm ${theme.error}`}>
              <span>✕</span>
              {(createTask.error as Error).message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

/* ============================================================
   🧩 FORM FIELD WRAPPER
============================================================ */
function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className={`text-xs font-semibold uppercase tracking-wider ${theme.label}`}
      >
        {label}
      </label>
      {children}
    </div>
  );
}