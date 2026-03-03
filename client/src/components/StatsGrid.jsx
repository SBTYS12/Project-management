import { FolderOpen, CheckCircle, Users, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function StatsGrid() {
  const currentWorkspace = useSelector(
    (state) => state?.workspace?.currentWorkspace || null
  );

  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    myTasks: 0,
    overdueIssues: 0,
  });

  const statCards = [
    {
      icon: FolderOpen,
      title: "Total Projects",
      value: stats.totalProjects,
      subtitle: `projects in ${currentWorkspace?.name}`,
      bgColor: "bg-blue-500/10",
      textColor: "text-blue-600 dark:text-blue-400",
      ringColor: "ring-blue-500/10",
    },
    {
      icon: CheckCircle,
      title: "Completed Projects",
      value: stats.completedProjects,
      subtitle: `of ${stats.totalProjects} total`,
      bgColor: "bg-emerald-500/10",
      textColor: "text-emerald-600 dark:text-emerald-400",
      ringColor: "ring-emerald-500/10",
    },
    {
      icon: Users,
      title: "My Tasks",
      value: stats.myTasks,
      subtitle: "assigned to me",
      bgColor: "bg-purple-500/10",
      textColor: "text-purple-600 dark:text-purple-400",
      ringColor: "ring-purple-500/10",
    },
    {
      icon: AlertTriangle,
      title: "Overdue",
      value: stats.overdueIssues,
      subtitle: "need attention",
      bgColor: "bg-amber-500/10",
      textColor: "text-amber-600 dark:text-amber-400",
      ringColor: "ring-amber-500/10",
    },
  ];

  useEffect(() => {
    if (currentWorkspace) {
      setStats({
        totalProjects: currentWorkspace.projects.length,
        activeProjects: currentWorkspace.projects.filter(
          (p) => p.status !== "CANCELLED" && p.status !== "COMPLETED"
        ).length,
        completedProjects: currentWorkspace.projects
          .filter((p) => p.status === "COMPLETED")
          .reduce((acc, project) => acc + project.tasks.length, 0),
        myTasks: currentWorkspace.projects.reduce(
          (acc, project) =>
            acc +
            project.tasks.filter(
              (t) => t.assignee?.email === currentWorkspace.owner.email
            ).length,
          0
        ),
        overdueIssues: currentWorkspace.projects.reduce(
          (acc, project) =>
            acc + project.tasks.filter((t) => t.due_date < new Date()).length,
          0
        ),
      });
    }
  }, [currentWorkspace]);

  return (
    <div className="my-9 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-5">
      {statCards.map(
        ({ icon: Icon, title, value, subtitle, bgColor, textColor, ringColor }, i) => (
          <div
            key={i}
            className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950/60 dark:backdrop-blur supports-[backdrop-filter]:bg-zinc-950/40"
          >
            {/* subtle top glow */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/60 to-transparent dark:from-white/5" />

            <div className="relative flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-medium tracking-wide text-zinc-500 dark:text-zinc-400">
                  {title}
                </p>

                <p className="mt-2 text-3xl font-semibold leading-none text-zinc-900 dark:text-zinc-100">
                  {value}
                </p>

                {subtitle && (
                  <p className="mt-2 truncate text-xs text-zinc-400 dark:text-zinc-500">
                    {subtitle}
                  </p>
                )}
              </div>

              <div
                className={`relative flex h-11 w-11 items-center justify-center rounded-2xl ${bgColor} ring-1 ${ringColor} transition-transform duration-200 group-hover:scale-[1.03]`}
              >
                <Icon size={20} className={textColor} />
              </div>
            </div>

            {/* bottom divider accent */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-800" />
          </div>
        )
      )}
    </div>
  );
}