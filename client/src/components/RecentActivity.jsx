import { useEffect, useState } from "react";
import { GitCommit, MessageSquare, Clock, Bug, Zap, Square } from "lucide-react";
import { format } from "date-fns";
import { useSelector } from "react-redux";

const typeIcons = {
  BUG: { icon: Bug, color: "text-red-600 dark:text-red-400" },
  FEATURE: { icon: Zap, color: "text-blue-600 dark:text-blue-400" },
  TASK: { icon: Square, color: "text-emerald-600 dark:text-emerald-400" },
  IMPROVEMENT: { icon: MessageSquare, color: "text-amber-600 dark:text-amber-400" },
  OTHER: { icon: GitCommit, color: "text-purple-600 dark:text-purple-400" },
};

const statusColors = {
  TODO:
    "bg-zinc-100 text-zinc-700 ring-1 ring-zinc-200 dark:bg-zinc-800/70 dark:text-zinc-200 dark:ring-zinc-700/60",
  IN_PROGRESS:
    "bg-amber-100 text-amber-800 ring-1 ring-amber-200 dark:bg-amber-500/15 dark:text-amber-200 dark:ring-amber-400/20",
  DONE:
    "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-200 dark:ring-emerald-400/20",
};

const RecentActivity = () => {
  const [tasks, setTasks] = useState([]);
  const { currentWorkspace } = useSelector((state) => state.workspace);

  const getTasksFromCurrentWorkspace = () => {
    if (!currentWorkspace) return;
    const tasks = currentWorkspace.projects.flatMap((project) =>
      project.tasks.map((task) => task)
    );
    setTasks(tasks);
  };

  useEffect(() => {
    getTasksFromCurrentWorkspace();
  }, [currentWorkspace]);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950/60 dark:backdrop-blur supports-[backdrop-filter]:bg-zinc-950/40">
      {/* subtle top glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-blue-500/10 to-transparent dark:from-blue-500/10" />

      <div className="relative border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
        <h2 className="text-sm font-semibold tracking-wide text-zinc-900 dark:text-zinc-200">
          Recent Activity
        </h2>
      </div>

      <div className="relative p-0">
        {tasks.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-600 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:ring-zinc-800">
              <Clock className="h-7 w-7" />
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              No recent activity
            </p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {tasks.map((task) => {
              const TypeIcon = typeIcons[task.type]?.icon || Square;
              const iconColor =
                typeIcons[task.type]?.color || "text-zinc-600 dark:text-zinc-400";

              return (
                <div
                  key={task.id}
                  className="group px-5 py-5 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
                >
                  <div className="flex items-start gap-4">
                    {/* Icon pill */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-100 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800">
                      <TypeIcon className={`h-5 w-5 ${iconColor}`} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex items-start justify-between gap-3">
                        <h4 className="truncate text-[15px] font-semibold text-zinc-900 dark:text-zinc-200">
                          {task.title}
                        </h4>

                        <span
                          className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ${
                            statusColors[task.status] ||
                            "bg-zinc-100 text-zinc-700 ring-1 ring-zinc-200 dark:bg-zinc-800/70 dark:text-zinc-200 dark:ring-zinc-700/60"
                          }`}
                        >
                          {task.status.replace("_", " ")}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-500 dark:text-zinc-400">
                        <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-700 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:ring-zinc-800">
                          {task.type.toLowerCase()}
                        </span>

                        {task.assignee && (
                          <div className="flex items-center gap-2">
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-200 text-[11px] font-semibold text-zinc-800 ring-1 ring-zinc-300 dark:bg-zinc-800 dark:text-zinc-200 dark:ring-zinc-700">
                              {task.assignee.name?.[0]?.toUpperCase()}
                            </div>
                            <span className="truncate">{task.assignee.name}</span>
                          </div>
                        )}

                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          {format(new Date(task.updatedAt), "MMM d, h:mm a")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;