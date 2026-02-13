"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  Save,
  X,
  FileText,
} from "lucide-react";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  tags: string[];
  published: boolean;
}

const emptyPost: Omit<Post, "id"> = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  date: new Date().toISOString().split("T")[0],
  tags: [],
  published: true,
};

function PostForm({
  post,
  setPost,
  onSave,
  onCancel,
  saving,
}: {
  post: Omit<Post, "id">;
  setPost: (p: Omit<Post, "id">) => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [tagInput, setTagInput] = useState("");

  const addTag = () => {
    if (tagInput.trim() && !post.tags.includes(tagInput.trim())) {
      setPost({ ...post, tags: [...post.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setPost({ ...post, tags: post.tags.filter((t) => t !== tag) });
  };

  return (
    <div className="glass rounded-2xl p-6">
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-foreground/40">
              Title
            </label>
            <input
              type="text"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              className="w-full rounded-xl border border-border bg-white/[0.02] px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary/50"
              placeholder="Post title"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-foreground/40">
              Slug
            </label>
            <input
              type="text"
              value={post.slug}
              onChange={(e) => setPost({ ...post, slug: e.target.value })}
              className="w-full rounded-xl border border-border bg-white/[0.02] px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary/50"
              placeholder="auto-generated-from-title"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-foreground/40">
            Excerpt
          </label>
          <input
            type="text"
            value={post.excerpt}
            onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
            className="w-full rounded-xl border border-border bg-white/[0.02] px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary/50"
            placeholder="Brief description"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-foreground/40">
            Content
          </label>
          <textarea
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            rows={12}
            className="w-full resize-none rounded-xl border border-border bg-white/[0.02] px-4 py-2.5 font-mono text-sm text-foreground outline-none focus:border-primary/50"
            placeholder="Write your post content here... (supports ## headings and ### subheadings)"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-foreground/40">
              Date
            </label>
            <input
              type="date"
              value={post.date}
              onChange={(e) => setPost({ ...post, date: e.target.value })}
              className="w-full rounded-xl border border-border bg-white/[0.02] px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary/50"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-foreground/40">
              Tags
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                className="flex-1 rounded-xl border border-border bg-white/[0.02] px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary/50"
                placeholder="Add tag"
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
        </div>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
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

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={post.published}
              onChange={(e) => setPost({ ...post, published: e.target.checked })}
              className="h-4 w-4 rounded border-border bg-white/[0.02] accent-primary"
            />
            <span className="text-sm text-foreground/60">Published</span>
          </label>
        </div>

        <div className="flex gap-3 pt-2">
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

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editing, setEditing] = useState<Post | null>(null);
  const [creating, setCreating] = useState(false);
  const [newPost, setNewPost] = useState(emptyPost);
  const [saving, setSaving] = useState(false);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts");
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data fetch on mount
    fetchPosts();
  }, []);

  const handleCreate = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });

      if (res.ok) {
        setCreating(false);
        setNewPost(emptyPost);
        fetchPosts();
      }
    } catch (err) {
      console.error("Failed to create post:", err);
    }
    setSaving(false);
  };

  const handleUpdate = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const res = await fetch("/api/posts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });

      if (res.ok) {
        setEditing(null);
        fetchPosts();
      }
    } catch (err) {
      console.error("Failed to update post:", err);
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const res = await fetch(`/api/posts?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchPosts();
      }
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };

  return (
    <div className="pt-8 lg:pt-0">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          <span className="gradient-text">Posts</span>
        </h1>
        {!creating && !editing && (
          <button
            onClick={() => setCreating(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-5 py-2.5 text-sm font-semibold text-background hover:shadow-lg hover:shadow-primary/25"
          >
            <Plus size={16} />
            New Post
          </button>
        )}
      </div>

      {/* Create Form */}
      {creating && (
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold">Create New Post</h2>
          <PostForm
            post={newPost}
            setPost={setNewPost as (p: typeof newPost) => void}
            onSave={handleCreate}
            saving={saving}
            onCancel={() => {
              setCreating(false);
              setNewPost(emptyPost);
            }}
          />
        </div>
      )}

      {/* Edit Form */}
      {editing && (
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold">Edit Post</h2>
          <PostForm
            post={editing}
            setPost={(p) => setEditing({ ...editing, ...p } as Post)}
            saving={saving}
            onSave={handleUpdate}
            onCancel={() => setEditing(null)}
          />
        </div>
      )}

      {/* Posts List */}
      {!creating && !editing && (
        <div className="space-y-3">
          {posts.length === 0 ? (
            <div className="glass rounded-2xl p-12 text-center">
              <FileText
                size={48}
                className="mx-auto mb-4 text-foreground/20"
              />
              <p className="text-foreground/40">No posts yet</p>
              <p className="mt-1 text-sm text-foreground/30">
                Create your first blog post
              </p>
            </div>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="glass glass-hover group flex items-center justify-between rounded-xl p-5 transition-all duration-200"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    {post.published ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                        <Eye size={10} />
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/10 px-2 py-0.5 text-[10px] font-medium text-amber-400">
                        <EyeOff size={10} />
                        Draft
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-foreground/40">
                    {post.date} • {post.tags.join(", ")}
                  </p>
                </div>

                <div className="flex gap-1">
                  <button
                    onClick={() => setEditing(post)}
                    className="rounded-lg p-2 text-foreground/30 transition-all hover:bg-white/5 hover:text-primary"
                    title="Edit"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="rounded-lg p-2 text-foreground/30 transition-all hover:bg-red-400/5 hover:text-red-400"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
