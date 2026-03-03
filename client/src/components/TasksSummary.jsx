import { useEffect, useState } from "react";
import { ArrowRight, Clock, AlertTriangle, User } from "lucide-react";
import { useSelector } from "react-redux";

export default function TasksSummary() {
  const { currentWorkspace } = useSelector((state) => state.workspace);
  const user = { id: "user_1" };
  const [tasks, setTasks] = useState([]);

  // Get all tasks for all projects in current workspace
  useEffect(() => {
    if (currentWorkspace) {
      setTasks(currentWorkspace.projects.flatMap((project) => project.tasks));
    }
  }, [currentWorkspace]);

  const myTasks = tasks.filter((i) => i.assigneeId === user.id);
  const overdueTasks = tasks.filter(
    (t) => t.due_date && new Date(t.due_date) < new Date() && t.status !== "DONE"
  );
  const inProgressIssues = tasks.filter((i) => i.status === "IN_PROGRESS");

  const summaryCards = [
    {
      title: "My Tasks",
      count: myTasks.length,
      icon: User,
      color:
        "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-200 dark:ring-emerald-400/20",
      items: myTasks.slice(0, 3),
    },
    {
      title: "Overdue",
      count: overdueTasks.length,
      icon: AlertTriangle,
      color:
        "bg-red-100 text-red-800 ring-1 ring-red-200 dark:bg-red-500/15 dark:text-red-200 dark:ring-red-400/20",
      items: overdueTasks.slice(0, 3),
    },
    {
      title: "In Progress",
      count: inProgressIssues.length,
      icon: Clock,
      color:
        "bg-blue-100 text-blue-800 ring-1 ring-blue-200 dark:bg-blue-500/15 dark:text-blue-200 dark:ring-blue-400/20",
      items: inProgressIssues.slice(0, 3),
    },
  ];

  return (
    <div className="space-y-5">
      {summaryCards.map((card) => (
        <div
          key={card.title}
          className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950/60 dark:backdrop-blur supports-[backdrop-filter]:bg-zinc-950/40"
        >
          {/* subtle top glow */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/70 to-transparent dark:from-white/5" />

          <div className="relative border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-100 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800">
                <card.icon className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
              </div>

              <div className="flex flex-1 items-center justify-between gap-3">
                <h3 className="text-sm font-semibold tracking-wide text-zinc-900 dark:text-zinc-200">
                  {card.title}
                </h3>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${card.color}`}
                >
                  {card.count}
                </span>
              </div>
            </div>
          </div>

          <div className="relative px-5 py-4">
            {card.items.length === 0 ? (
              <p className="py-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
                No {card.title.toLowerCase()}
              </p>
            ) : (
              <div className="space-y-3">
                {card.items.map((issue) => (
                  <div
                    key={issue.id}
                    className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:bg-zinc-900/70"
                  >
                    <h4 className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {issue.title}
                    </h4>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                      <span className="capitalize">{issue.type?.toLowerCase()}</span>{" "}
                      • {issue.priority?.toLowerCase()} priority
                    </p>
                  </div>
                ))}

                {card.count > 3 && (
                  <button className="group inline-flex w-full items-center justify-center rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-zinc-400 dark:hover:bg-zinc-900/40 dark:hover:text-zinc-200">
                    View {card.count - 3} more
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* bottom divider accent */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-800" />
        </div>
      ))}
    </div>
  );
}