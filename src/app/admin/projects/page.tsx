"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  Save,
  X,
  Briefcase,
  ExternalLink,
  Github,
  Star
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  githubUrl: string;
  tags: string[];
  featured: boolean;
  order: number;
}

const emptyProject: Omit<Project, "id"> = {
  title: "",
  description: "",
  imageUrl: "",
  projectUrl: "",
  githubUrl: "",
  tags: [],
  featured: false,
  order: 0,
};

function ProjectForm({
  project,
  setProject,
  onSave,
  onCancel,
  saving,
}: {
  project: Omit<Project, "id">;
  setProject: (p: Omit<Project, "id">) => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [tagInput, setTagInput] = useState("");

  const addTag = () => {
    if (tagInput.trim() && !project.tags.includes(tagInput.trim())) {
      setProject({ ...project, tags: [...project.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setProject({ ...project, tags: project.tags.filter((t) => t !== tag) });
  };

  return (
    <div className="glass rounded-2xl p-6">
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-foreground/40">
            Title
          </label>
          <input
            type="text"
            value={project.title}
            onChange={(e) => setProject({ ...project, title: e.target.value })}
            className="w-full rounded-xl border border-border bg-white/[0.02] px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary/50"
            placeholder="Project title"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-foreground/40">
            Description
          </label>
          <textarea
            value={project.description}
            onChange={(e) => setProject({ ...project, description: e.target.value })}
            rows={4}
            className="w-full resize-none rounded-xl border border-border bg-white/[0.02] px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary/50"
            placeholder="Brief description of the project..."
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-foreground/40">
              Live URL (Optional)
            </label>
            <input
              type="text"
              value={project.projectUrl}
              onChange={(e) => setProject({ ...project, projectUrl: e.target.value })}
              className="w-full rounded-xl border border-border bg-white/[0.02] px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary/50"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-foreground/40">
              GitHub URL (Optional)
            </label>
            <input
              type="text"
              value={project.githubUrl}
              onChange={(e) => setProject({ ...project, githubUrl: e.target.value })}
              className="w-full rounded-xl border border-border bg-white/[0.02] px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary/50"
              placeholder="https://github.com/..."
            />
          </div>
        </div>

        <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-foreground/40">
              Tech Stack (Tags)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                className="flex-1 rounded-xl border border-border bg-white/[0.02] px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary/50"
                placeholder="Add technology (e.g., React, Node.js)"
              />
              <button
                type="button"
                onClick={() => addTag()}
                className="rounded-xl bg-primary/10 px-4 text-sm font-medium text-primary hover:bg-primary/20"
              >
                Add
              </button>
            </div>
        </div>

        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-lg bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
              >
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="ml-1 hover:text-red-400"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4 pt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={project.featured}
              onChange={(e) => setProject({ ...project, featured: e.target.checked })}
              className="h-4 w-4 rounded border-border bg-white/[0.02] accent-primary"
            />
            <span className="text-sm text-foreground/60">Featured Project</span>
          </label>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            onClick={onSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-6 py-2.5 text-sm font-semibold text-background hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50"
          >
            <Save size={16} />
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            onClick={onCancel}
            className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-2.5 text-sm font-medium text-foreground/60 hover:bg-white/5"
          >
            <X size={16} />
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [creating, setCreating] = useState(false);
  const [newProject, setNewProject] = useState(emptyProject);
  const [saving, setSaving] = useState(false);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProjects();
  }, []);

  const handleCreate = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      });

      if (res.ok) {
        setCreating(false);
        setNewProject(emptyProject);
        fetchProjects();
      }
    } catch (err) {
      console.error("Failed to create project:", err);
    }
    setSaving(false);
  };

  const handleUpdate = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const res = await fetch("/api/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });

      if (res.ok) {
        setEditing(null);
        fetchProjects();
      }
    } catch (err) {
      console.error("Failed to update project:", err);
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchProjects();
      }
    } catch (err) {
      console.error("Failed to delete project:", err);
    }
  };

  return (
    <div className="pt-8 lg:pt-0">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          <span className="gradient-text">Projects</span>
        </h1>
        {!creating && !editing && (
          <button
            onClick={() => setCreating(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-5 py-2.5 text-sm font-semibold text-background hover:shadow-lg hover:shadow-primary/25"
          >
            <Plus size={16} />
            New Project
          </button>
        )}
      </div>

      {creating && (
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold">Create New Project</h2>
          <ProjectForm
            project={newProject}
            setProject={setNewProject as (p: typeof newProject) => void}
            onSave={handleCreate}
            saving={saving}
            onCancel={() => {
              setCreating(false);
              setNewProject(emptyProject);
            }}
          />
        </div>
      )}

      {editing && (
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold">Edit Project</h2>
          <ProjectForm
            project={editing}
            setProject={(p) => setEditing({ ...editing, ...p } as Project)}
            saving={saving}
            onSave={handleUpdate}
            onCancel={() => setEditing(null)}
          />
        </div>
      )}

      {!creating && !editing && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.length === 0 ? (
            <div className="glass col-span-full rounded-2xl p-12 text-center">
              <Briefcase size={48} className="mx-auto mb-4 text-foreground/20" />
              <p className="text-foreground/40">No projects yet</p>
              <p className="mt-1 text-sm text-foreground/30">
                Add your first portfolio project
              </p>
            </div>
          ) : (
            projects.map((project) => (
              <div
                key={project.id}
                className="glass glass-hover group flex flex-col rounded-xl p-5 transition-all duration-200"
              >
                <div className="mb-3 flex items-start justify-between">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span className="text-amber-400" title="Featured">
                      <Star size={16} fill="currentColor" />
                    </span>
                  )}
                </div>
                
                <p className="mb-4 text-sm text-foreground/60 line-clamp-3">
                  {project.description}
                </p>

                <div className="mb-4 flex flex-wrap gap-1">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-foreground/50">
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-foreground/50">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
                  <div className="flex gap-2 text-foreground/40">
                    {project.githubUrl && (
                       <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                         <Github size={16} />
                       </a>
                    )}
                    {project.projectUrl && (
                       <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                         <ExternalLink size={16} />
                       </a>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setEditing(project)}
                      className="rounded-lg p-2 text-foreground/30 transition-all hover:bg-white/5 hover:text-primary"
                      title="Edit"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="rounded-lg p-2 text-foreground/30 transition-all hover:bg-red-400/5 hover:text-red-400"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
