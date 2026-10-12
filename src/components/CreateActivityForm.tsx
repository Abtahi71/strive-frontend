// // src/components/CreateActivityForm.tsx
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useCreateActivity } from "@/src/hooks/useActivities";

// /* ============================================================
//    🎨 CENTRAL THEME — change colors here
// ============================================================ */
// const theme = {
//   pageText: "text-white",

//   borderGradient: "bg-gradient-to-b from-white via-zinc-400 to-zinc-700",
//   borderGradientThin: "bg-gradient-to-b from-white via-zinc-500 to-zinc-800",
//   borderWidth: "p-[2px]",
//   borderWidthThin: "p-[1.5px]",
//   borderRadius: "rounded-3xl",
//   innerRadius: "rounded-[calc(1.5rem-2px)]",

//   surfaceSolid: "bg-zinc-950",
//   surfaceSoft: "bg-zinc-900/60",

//   gradientText:
//     "bg-gradient-to-b from-white via-white to-zinc-400 bg-clip-text text-transparent",
//   gradientTextMuted:
//     "bg-gradient-to-b from-zinc-200 to-zinc-500 bg-clip-text text-transparent",

//   primaryBtn:
//     "bg-gradient-to-b from-white to-zinc-300 text-zinc-900 hover:from-white hover:to-white",
//   ghostBtn:
//     "border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white",

//   input:
//     "bg-zinc-900/70 border border-zinc-800 text-white placeholder-zinc-500 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500/50",

//   dayBtnOn:
//     "bg-gradient-to-b from-white to-zinc-300 text-zinc-900 border border-white/20 shadow-md",
//   dayBtnOff:
//     "border border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white",

//   divider: "border-zinc-800",

//   muted: "text-zinc-500",
//   label: "text-zinc-400",
//   error: "text-red-400",
//   success: "text-emerald-400",
// };

// const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

// export default function CreateActivityForm() {
//   const router = useRouter();
//   const createActivity = useCreateActivity();

//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     imageUrl: "",
//     visibility: "PUBLIC" as "PUBLIC" | "INVITE_ONLY",
//     unit: "",
//     targetValue: 0,
//     scheduleType: "DAILY",
//     taskName: "",
//     taskDescription: "",
//     taskImage: "",
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
//     const result = await createActivity.mutateAsync(form);
//     router.push(`/activities/${result.activity.id}`);
//   };

//   return (
//     <div className="w-full">
//       {/* Gradient border wrapper */}
//       <div
//         className={`w-full ${theme.borderWidth} ${theme.borderRadius} ${theme.borderGradient} shadow-xl`}
//       >
//         <form
//           onSubmit={handleSubmit}
//           className={`space-y-6 p-6 lg:p-8 ${theme.surfaceSolid} ${theme.innerRadius}`}
//         >
//           {/* ==================== TITLE ==================== */}
//           <div>
//             <h1 className={`text-2xl font-semibold ${theme.gradientText}`}>
//               Create Activity
//             </h1>
//             <p className={`mt-1 text-sm ${theme.muted}`}>
//               Set up your activity and add your first task to get started.
//             </p>
//           </div>

//           {/* ==================== SECTION: ACTIVITY ==================== */}
//           <Section title="Activity Details" icon="📌">
//             <div className="flex flex-col gap-4">
//               <FormField label="Name">
//                 <input
//                   value={form.name}
//                   onChange={(e) => setForm({ ...form, name: e.target.value })}
//                   required
//                   placeholder="e.g. Morning Workout"
//                   className={`w-full rounded-xl px-3 py-2.5 text-sm outline-none transition ${theme.input}`}
//                 />
//               </FormField>

//               <FormField label="Description">
//                 <textarea
//                   value={form.description}
//                   onChange={(e) =>
//                     setForm({ ...form, description: e.target.value })
//                   }
//                   rows={3}
//                   placeholder="What is this activity about?"
//                   className={`w-full resize-none rounded-xl px-3 py-2.5 text-sm outline-none transition ${theme.input}`}
//                 />
//               </FormField>

//               <FormField label="Image URL">
//                 <input
//                   value={form.imageUrl}
//                   onChange={(e) =>
//                     setForm({ ...form, imageUrl: e.target.value })
//                   }
//                   placeholder="https://..."
//                   className={`w-full rounded-xl px-3 py-2.5 text-sm outline-none transition ${theme.input}`}
//                 />
//               </FormField>

//               <FormField label="Visibility">
//                 <select
//                   value={form.visibility}
//                   onChange={(e) =>
//                     setForm({
//                       ...form,
//                       visibility: e.target.value as "PUBLIC" | "INVITE_ONLY",
//                     })
//                   }
//                   className={`w-full rounded-xl px-3 py-2.5 text-sm outline-none transition ${theme.input}`}
//                 >
//                   <option value="PUBLIC">Public</option>
//                   <option value="INVITE_ONLY">Invite Only</option>
//                 </select>
//               </FormField>
//             </div>
//           </Section>

//           {/* ==================== SECTION: FIRST TASK ==================== */}
//           <Section title="First Task" icon="🎯">
//             <div className="flex flex-col gap-4">
//               <FormField label="Task name">
//                 <input
//                   value={form.taskName}
//                   onChange={(e) =>
//                     setForm({ ...form, taskName: e.target.value })
//                   }
//                   required
//                   placeholder="e.g. 30-minute run"
//                   className={`w-full rounded-xl px-3 py-2.5 text-sm outline-none transition ${theme.input}`}
//                 />
//               </FormField>

//               <FormField label="Task description">
//                 <textarea
//                   value={form.taskDescription}
//                   onChange={(e) =>
//                     setForm({
//                       ...form,
//                       taskDescription: e.target.value,
//                     })
//                   }
//                   rows={3}
//                   placeholder="Describe the task..."
//                   className={`w-full resize-none rounded-xl px-3 py-2.5 text-sm outline-none transition ${theme.input}`}
//                 />
//               </FormField>

//               <FormField label="Task image URL">
//                 <input
//                   value={form.taskImage}
//                   onChange={(e) =>
//                     setForm({ ...form, taskImage: e.target.value })
//                   }
//                   placeholder="https://..."
//                   className={`w-full rounded-xl px-3 py-2.5 text-sm outline-none transition ${theme.input}`}
//                 />
//               </FormField>

//               {/* Unit + Target */}
//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 <FormField label="Unit">
//                   <input
//                     placeholder="e.g. minutes, reps, pages"
//                     value={form.unit}
//                     onChange={(e) => setForm({ ...form, unit: e.target.value })}
//                     className={`w-full rounded-xl px-3 py-2.5 text-sm outline-none transition ${theme.input}`}
//                   />
//                 </FormField>

//                 <FormField label="Target value">
//                   <input
//                     type="number"
//                     value={form.targetValue}
//                     onChange={(e) =>
//                       setForm({
//                         ...form,
//                         targetValue: Number(e.target.value),
//                       })
//                     }
//                     placeholder="0"
//                     className={`w-full rounded-xl px-3 py-2.5 text-sm outline-none transition ${theme.input}`}
//                   />
//                 </FormField>
//               </div>

//               <FormField label="Schedule type">
//                 <select
//                   value={form.scheduleType}
//                   onChange={(e) =>
//                     setForm({ ...form, scheduleType: e.target.value })
//                   }
//                   className={`w-full rounded-xl px-3 py-2.5 text-sm outline-none transition ${theme.input}`}
//                 >
//                   <option value="DAILY">Daily</option>
//                   <option value="WEEKLY">Weekly</option>
//                   <option value="CUSTOM">Custom Days</option>
//                 </select>
//               </FormField>

//               {form.scheduleType === "CUSTOM" && (
//                 <FormField label="Select days">
//                   <div className="flex flex-wrap gap-2">
//                     {DAYS.map((day) => {
//                       const isOn = form.days.includes(day);
//                       return (
//                         <button
//                           key={day}
//                           type="button"
//                           onClick={() => toggleDay(day)}
//                           className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
//                             isOn ? theme.dayBtnOn : theme.dayBtnOff
//                           }`}
//                         >
//                           {day}
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </FormField>
//               )}
//             </div>
//           </Section>

//           {/* ==================== ACTION BAR ==================== */}
//           <div
//             className={`flex items-center justify-end gap-3 border-t pt-5 ${theme.divider}`}
//           >
//             <button
//               type="button"
//               onClick={() => router.back()}
//               className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${theme.ghostBtn}`}
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               disabled={createActivity.isPending}
//               className={`rounded-xl px-5 py-2.5 text-sm font-semibold shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 ${theme.primaryBtn}`}
//             >
//               {createActivity.isPending ? "Creating..." : "Create Activity"}
//             </button>
//           </div>

//           {/* ==================== STATUS ==================== */}
//           {createActivity.isError && (
//             <p className={`flex items-center gap-2 text-sm ${theme.error}`}>
//               <span>✕</span>
//               {(createActivity.error as Error).message}
//             </p>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// }

// /* ============================================================
//    🧩 SECTION WRAPPER
// ============================================================ */
// function Section({
//   title,
//   icon,
//   children,
// }: {
//   title: string;
//   icon?: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div>
//       <div className="mb-4 flex items-center gap-2">
//         {icon && <span className="text-lg">{icon}</span>}
//         <h2
//           className={`text-sm font-semibold uppercase tracking-wider ${theme.label}`}
//         >
//           {title}
//         </h2>
//         <div className={`ml-2 h-px flex-1 ${theme.divider} border-t`} />
//       </div>
//       {children}
//     </div>
//   );
// }

// /* ============================================================
//    🧩 FORM FIELD WRAPPER
// ============================================================ */
// function FormField({
//   label,
//   children,
// }: {
//   label: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="flex flex-col gap-1.5">
//       <label
//         className={`text-xs font-semibold uppercase tracking-wider ${theme.label}`}
//       >
//         {label}
//       </label>
//       {children}
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateActivity } from "@/src/hooks/useActivities";
import { useEffect} from "react";
import { createPortal } from "react-dom";

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

type Props = {
  onClose: () => void;
};

export default function CreateActivityForm({ onClose }: any) {
  const router = useRouter();
  const createActivity = useCreateActivity();

  const [mounted, setMounted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    imageUrl: "",
    visibility: "PUBLIC" as "PUBLIC" | "INVITE_ONLY",
    unit: "",
    targetValue: 0,
    scheduleType: "DAILY",
    taskName: "",
    taskDescription: "",
    taskImage: "",
    days: [] as string[],
  });

    useEffect(() => {
      setMounted(true);
    }, []);

    if (!mounted) return null;

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

    try {
      const result = await createActivity.mutateAsync(form);

      onClose();
      router.push(`/activities/${result.activity.id}`);
    } catch {
      // Error is already available through createActivity.isError
    }
  };

  return createPortal(
    <div
      // className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      className="fixed inset-0 z-500 flex items-start justify-center overflow-y-auto bg-black/70 p-4 pt-6 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/50">
        {/* ================= HEADER ================= */}
        <div className="flex shrink-0 items-center justify-between border-b border-zinc-800 px-5 py-4">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-white">
              Create Activity
            </h1>

            <p className="mt-0.5 text-xs text-zinc-500">
              Create an activity and its first task.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-lg text-zinc-500 transition hover:bg-zinc-900 hover:text-white"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* ================= FORM ================= */}
        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          {/* SCROLLABLE CONTENT */}
          <div className="overflow-y-auto px-5 py-5">
            <div className="grid gap-7 lg:grid-cols-2">
              {/* ================= ACTIVITY ================= */}
              <section>
                <SectionHeading
                  number="01"
                  title="Activity"
                  description="Basic information about your activity."
                />

                <div className="space-y-4">
                  <FormField label="Name">
                    <input
                      value={form.name}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          name: e.target.value,
                        })
                      }
                      required
                      placeholder="e.g. Morning Workout"
                      className="input"
                    />
                  </FormField>

                  <FormField label="Description">
                    <textarea
                      value={form.description}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          description: e.target.value,
                        })
                      }
                      rows={2}
                      placeholder="What is this activity about?"
                      className="input resize-none"
                    />
                  </FormField>

                  <FormField label="Image URL">
                    <input
                      value={form.imageUrl}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          imageUrl: e.target.value,
                        })
                      }
                      placeholder="https://..."
                      className="input"
                    />
                  </FormField>

                  <FormField label="Visibility">
                    <div className="grid grid-cols-2 gap-2">
                      <VisibilityOption
                        active={form.visibility === "PUBLIC"}
                        title="Public"
                        description="Anyone can join"
                        onClick={() =>
                          setForm({
                            ...form,
                            visibility: "PUBLIC",
                          })
                        }
                      />

                      <VisibilityOption
                        active={form.visibility === "INVITE_ONLY"}
                        title="Invite only"
                        description="Only invited users"
                        onClick={() =>
                          setForm({
                            ...form,
                            visibility: "INVITE_ONLY",
                          })
                        }
                      />
                    </div>
                  </FormField>
                </div>
              </section>

              {/* ================= FIRST TASK ================= */}
              <section>
                <SectionHeading
                  number="02"
                  title="First Task"
                  description="Define what members will do."
                />

                <div className="space-y-4">
                  <FormField label="Task name">
                    <input
                      value={form.taskName}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          taskName: e.target.value,
                        })
                      }
                      required
                      placeholder="e.g. 30-minute run"
                      className="input"
                    />
                  </FormField>

                  <FormField label="Description">
                    <textarea
                      value={form.taskDescription}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          taskDescription: e.target.value,
                        })
                      }
                      rows={2}
                      placeholder="Describe the task..."
                      className="input resize-none"
                    />
                  </FormField>

                  <FormField label="Task image URL">
                    <input
                      value={form.taskImage}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          taskImage: e.target.value,
                        })
                      }
                      placeholder="https://..."
                      className="input"
                    />
                  </FormField>

                  <div className="grid grid-cols-2 gap-3">
                    <FormField label="Unit">
                      <input
                        value={form.unit}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            unit: e.target.value,
                          })
                        }
                        placeholder="minutes, reps..."
                        className="input"
                      />
                    </FormField>

                    <FormField label="Target">
                      <input
                        type="number"
                        min="0"
                        value={form.targetValue}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            targetValue: Number(e.target.value),
                          })
                        }
                        placeholder="30"
                        className="input"
                      />
                    </FormField>
                  </div>

                  <FormField label="Schedule">
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        ["DAILY", "Daily"],
                        ["WEEKLY", "Weekly"],
                        ["CUSTOM", "Custom"],
                      ].map(([value, label]) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() =>
                            setForm({
                              ...form,
                              scheduleType: value,
                            })
                          }
                          className={`rounded-lg border px-2 py-2 text-xs font-medium transition ${
                            form.scheduleType === value
                              ? "border-zinc-500 bg-zinc-100 text-zinc-950"
                              : "border-zinc-800 bg-zinc-900/50 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </FormField>

                  {form.scheduleType === "CUSTOM" && (
                    <FormField label="Days">
                      <div className="flex gap-1.5">
                        {DAYS.map((day) => {
                          const active = form.days.includes(day);

                          return (
                            <button
                              key={day}
                              type="button"
                              onClick={() => toggleDay(day)}
                              className={`h-8 w-9 rounded-lg text-[10px] font-semibold transition ${
                                active
                                  ? "bg-white text-zinc-950"
                                  : "border border-zinc-800 bg-zinc-900 text-zinc-500 hover:text-white"
                              }`}
                            >
                              {day.slice(0, 1)}
                            </button>
                          );
                        })}
                      </div>
                    </FormField>
                  )}
                </div>
              </section>
            </div>
          </div>

          {/* ================= FOOTER ================= */}
          <div className="flex shrink-0 items-center justify-between border-t border-zinc-800 bg-zinc-950 px-5 py-3.5">
            <div className="min-w-0">
              {createActivity.isError && (
                <p className="truncate text-xs text-red-400">
                  {(createActivity.error as Error).message}
                </p>
              )}
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg px-4 py-2 text-xs font-medium text-zinc-500 transition hover:bg-zinc-900 hover:text-white"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={createActivity.isPending}
                className="rounded-lg bg-white px-4 py-2 text-xs font-semibold text-zinc-950 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {createActivity.isPending ? "Creating..." : "Create Activity"}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Local input styling */}
      <style jsx>{`
        :global(.input) {
          width: 100%;
          border-radius: 0.625rem;
          border: 1px solid rgb(39 39 42);
          background: rgb(24 24 27 / 0.7);
          padding: 0.55rem 0.7rem;
          font-size: 0.8rem;
          color: white;
          outline: none;
          transition: all 150ms;
        }

        :global(.input::placeholder) {
          color: rgb(82 82 91);
        }

        :global(.input:focus) {
          border-color: rgb(113 113 122);
          box-shadow: 0 0 0 2px rgb(113 113 122 / 0.1);
        }
      `}</style>
    </div>,
    document.body
  );
}

/* ============================================================
   SECTION HEADING
============================================================ */

function SectionHeading({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-semibold tracking-widest text-zinc-600">
          {number}
        </span>

        <h2 className="text-sm font-semibold text-zinc-200">{title}</h2>
      </div>

      <p className="mt-1 pl-6 text-xs text-zinc-600">{description}</p>
    </div>
  );
}

/* ============================================================
   FORM FIELD
============================================================ */

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
        {label}
      </label>

      {children}
    </div>
  );
}

/* ============================================================
   VISIBILITY OPTION
============================================================ */

function VisibilityOption({
  active,
  title,
  description,
  onClick,
}: {
  active: boolean;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border px-3 py-2.5 text-left transition ${
        active
          ? "border-zinc-500 bg-zinc-100/5"
          : "border-zinc-800 bg-zinc-900/30 hover:border-zinc-700"
      }`}
    >
      <div
        className={`text-xs font-medium ${
          active ? "text-white" : "text-zinc-400"
        }`}
      >
        {title}
      </div>

      <div className="mt-0.5 text-[10px] text-zinc-600">{description}</div>
    </button>
  );
}