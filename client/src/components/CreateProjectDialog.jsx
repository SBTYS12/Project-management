import { useState } from "react";
import { XIcon } from "lucide-react";
import { useSelector } from "react-redux";

const CreateProjectDialog = ({ isDialogOpen, setIsDialogOpen }) => {
  const { currentWorkspace } = useSelector((state) => state.workspace);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "PLANNING",
    priority: "MEDIUM",
    start_date: "",
    end_date: "",
    team_members: [],
    team_lead: "",
    progress: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const removeTeamMember = (email) => {
    setFormData((prev) => ({
      ...prev,
      team_members: prev.team_members.filter((m) => m !== email),
    }));
  };

  if (!isDialogOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 text-left">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-zinc-950/30 backdrop-blur-sm dark:bg-black/70"
        onClick={() => setIsDialogOpen(false)}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-950/70 dark:backdrop-blur supports-[backdrop-filter]:bg-zinc-950/50">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-zinc-200 px-6 py-5 dark:border-zinc-800">
          <div className="min-w-0">
            <h2 className="text-base font-semibold tracking-wide text-zinc-900 dark:text-zinc-100">
              Create New Project
            </h2>
            {currentWorkspace && (
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                In workspace:{" "}
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  {currentWorkspace.name}
                </span>
              </p>
            )}
          </div>

          <button
            className="flex h-9 w-9 items-center justify-center rounded-xl text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
            onClick={() => setIsDialogOpen(false)}
            aria-label="Close dialog"
            type="button"
          >
            <XIcon className="size-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
          {/* Project Name */}
          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Project Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter project name"
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Describe your project"
              className="mt-2 h-24 w-full resize-none rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
            />
          </div>

          {/* Status & Priority */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-100 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
              >
                <option value="PLANNING">Planning</option>
                <option value="ACTIVE">Active</option>
                <option value="COMPLETED">Completed</option>
                <option value="ON_HOLD">On Hold</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }
                className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-100 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Start Date
              </label>
              <input
                type="date"
                value={formData.start_date}
                onChange={(e) =>
                  setFormData({ ...formData, start_date: e.target.value })
                }
                className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-100 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
                End Date
              </label>
              <input
                type="date"
                value={formData.end_date}
                onChange={(e) =>
                  setFormData({ ...formData, end_date: e.target.value })
                }
                min={
                  formData.start_date &&
                  new Date(formData.start_date).toISOString().split("T")[0]
                }
                className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-100 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
              />
            </div>
          </div>

          {/* Lead */}
          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Project Lead
            </label>
            <select
              value={formData.team_lead}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  team_lead: e.target.value,
                  team_members: e.target.value
                    ? [...new Set([...formData.team_members, e.target.value])]
                    : formData.team_members,
                })
              }
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-100 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
            >
              <option value="">No lead</option>
              {currentWorkspace?.members?.map((member) => (
                <option key={member.user.email} value={member.user.email}>
                  {member.user.email}
                </option>
              ))}
            </select>
          </div>

          {/* Team Members */}
          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Team Members
            </label>

            <select
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-100 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
              onChange={(e) => {
                if (e.target.value && !formData.team_members.includes(e.target.value)) {
                  setFormData((prev) => ({
                    ...prev,
                    team_members: [...prev.team_members, e.target.value],
                  }));
                }
              }}
            >
              <option value="">Add team members</option>
              {currentWorkspace?.members
                ?.filter((m) => !formData.team_members.includes(m.user.email))
                .map((member) => (
                  <option key={member.user.email} value={member.user.email}>
                    {member.user.email}
                  </option>
                ))}
            </select>

            {formData.team_members.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {formData.team_members.map((email) => (
                  <div
                    key={email}
                    className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700 ring-1 ring-blue-200 dark:bg-blue-500/10 dark:text-blue-200 dark:ring-blue-400/20"
                  >
                    <span className="max-w-[220px] truncate">{email}</span>
                    <button
                      type="button"
                      onClick={() => removeTeamMember(email)}
                      className="flex h-6 w-6 items-center justify-center rounded-full transition hover:bg-blue-100 dark:hover:bg-blue-500/20"
                      aria-label={`Remove ${email}`}
                    >
                      <XIcon className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setIsDialogOpen(false)}
              className="inline-flex items-center justify-center rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/30 dark:text-zinc-200 dark:hover:bg-zinc-900/60"
            >
              Cancel
            </button>

            <button
              disabled={isSubmitting || !currentWorkspace}
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              {isSubmitting ? "Creating..." : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectDialog;