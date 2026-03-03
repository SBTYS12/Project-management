import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, UsersIcon, FolderOpen } from "lucide-react";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import CreateProjectDialog from "./CreateProjectDialog";

const ProjectOverview = () => {
  const statusColors = {
    PLANNING:
      "bg-zinc-100 text-zinc-700 ring-1 ring-zinc-200 dark:bg-zinc-800/70 dark:text-zinc-200 dark:ring-zinc-700/60",
    ACTIVE:
      "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-200 dark:ring-emerald-400/20",
    ON_HOLD:
      "bg-amber-100 text-amber-800 ring-1 ring-amber-200 dark:bg-amber-500/15 dark:text-amber-200 dark:ring-amber-400/20",
    COMPLETED:
      "bg-blue-100 text-blue-800 ring-1 ring-blue-200 dark:bg-blue-500/15 dark:text-blue-200 dark:ring-blue-400/20",
    CANCELLED:
      "bg-red-100 text-red-800 ring-1 ring-red-200 dark:bg-red-500/15 dark:text-red-200 dark:ring-red-400/20",
  };

  const priorityColors = {
    LOW: "border-zinc-300 dark:border-zinc-700",
    MEDIUM: "border-amber-300 dark:border-amber-500/70",
    HIGH: "border-green-300 dark:border-green-500/70",
  };

  const currentWorkspace = useSelector(
    (state) => state?.workspace?.currentWorkspace || null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(currentWorkspace?.projects || []);
  }, [currentWorkspace]);

  return (
    currentWorkspace && (
      <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950/60 dark:backdrop-blur supports-[backdrop-filter]:bg-zinc-950/40">
        {/* subtle top glow */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-blue-500/10 to-transparent dark:from-blue-500/10" />

        <div className="relative flex items-center justify-between border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
          <h2 className="text-sm font-semibold tracking-wide text-zinc-900 dark:text-zinc-200">
            Project Overview
          </h2>

          <Link
            to={"/projects"}
            className="group inline-flex items-center gap-2 text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            View all
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="relative">
          {projects.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-600 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:ring-zinc-800">
                <FolderOpen size={28} />
              </div>

              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                No projects yet
              </p>

              <button
                onClick={() => setIsDialogOpen(true)}
                className="mt-5 inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99] dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Create your First Project
              </button>

              <CreateProjectDialog
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
              />
            </div>
          ) : (
            <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {projects.slice(0, 5).map((project) => (
                <Link
                  key={project.id}
                  to={`/projectsDetail?id=${project.id}&tab=tasks`}
                  className="group block px-5 py-5 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
                >
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-[15px] font-semibold text-zinc-900 dark:text-zinc-200">
                        {project.name}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
                        {project.description || "No description"}
                      </p>
                    </div>

                    <div className="flex flex-shrink-0 items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${statusColors[project.status]}`}
                      >
                        {project.status
                          .replace("_", " ")
                          .replaceAll(/\b\w/g, (c) => c.toUpperCase())}
                      </span>

                      <div
                        className={`h-3 w-3 rounded-full border-2 ${priorityColors[project.priority]} bg-white dark:bg-zinc-950`}
                        title={`Priority: ${project.priority}`}
                      />
                    </div>
                  </div>

                  <div className="mb-4 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-500">
                    <div className="flex items-center gap-4">
                      {project.members?.length > 0 && (
                        <div className="inline-flex items-center gap-1.5">
                          <UsersIcon className="h-3.5 w-3.5" />
                          <span>{project.members.length} members</span>
                        </div>
                      )}

                      {project.end_date && (
                        <div className="inline-flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>
                            {format(new Date(project.end_date), "MMM d, yyyy")}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-500 dark:text-zinc-500">
                        Progress
                      </span>
                      <span className="font-medium text-zinc-700 dark:text-zinc-300">
                        {project.progress || 0}%
                      </span>
                    </div>

                    <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-[width] duration-300"
                        style={{ width: `${project.progress || 0}%` }}
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default ProjectOverview;