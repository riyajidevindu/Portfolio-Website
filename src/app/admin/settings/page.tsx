"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, CheckCircle } from "lucide-react";

interface Settings {
  siteTitle: string;
  siteDescription: string;
  primaryColor: string;
  secondaryColor: string;
  showBlog: boolean;
  showContact: boolean;
  socialLinks: {
    linkedin: string;
    github: string;
    email: string;
  };
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
      }
    } catch (err) {
      console.error("Failed to fetch settings:", err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data fetch on mount
    fetchSettings();
  }, []);

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch (err) {
      console.error("Failed to save settings:", err);
    }
    setSaving(false);
  };

  if (!settings) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="pt-8 lg:pt-0">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          <span className="gradient-text">Settings</span>
        </h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-5 py-2.5 text-sm font-semibold text-background transition-all hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50"
        >
          {saving ? (
            <Loader2 size={16} className="animate-spin" />
          ) : saved ? (
            <CheckCircle size={16} />
          ) : (
            <Save size={16} />
          )}
          {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="space-y-6">
        {/* General Settings */}
        <div className="glass rounded-2xl p-6">
          <h2 className="mb-5 text-lg font-semibold">General</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-foreground/40">
                Site Title
              </label>
              <input
                type="text"
                value={settings.siteTitle}
                onChange={(e) =>
                  setSettings({ ...settings, siteTitle: e.target.value })
                }
                className="w-full rounded-xl border border-border bg-white/[0.02] px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary/50"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-foreground/40">
                Site Description
              </label>
              <input
                type="text"
                value={settings.siteDescription}
                onChange={(e) =>
                  setSettings({ ...settings, siteDescription: e.target.value })
                }
                className="w-full rounded-xl border border-border bg-white/[0.02] px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary/50"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="glass rounded-2xl p-6">
          <h2 className="mb-5 text-lg font-semibold">Social Links</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-foreground/40">
                GitHub URL
              </label>
              <input
                type="url"
                value={settings.socialLinks.github}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, github: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-border bg-white/[0.02] px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary/50"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-foreground/40">
                LinkedIn URL
              </label>
              <input
                type="url"
                value={settings.socialLinks.linkedin}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, linkedin: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-border bg-white/[0.02] px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary/50"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-foreground/40">
                Email
              </label>
              <input
                type="email"
                value={settings.socialLinks.email}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, email: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-border bg-white/[0.02] px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary/50"
              />
            </div>
          </div>
        </div>

        {/* Visibility */}
        <div className="glass rounded-2xl p-6">
          <h2 className="mb-5 text-lg font-semibold">Visibility</h2>
          <div className="space-y-4">
            <label className="flex cursor-pointer items-center justify-between rounded-xl p-3 hover:bg-white/[0.02]">
              <div>
                <p className="text-sm font-medium text-foreground/80">
                  Show Blog Section
                </p>
                <p className="text-xs text-foreground/40">
                  Display blog posts on the homepage
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.showBlog}
                onChange={(e) =>
                  setSettings({ ...settings, showBlog: e.target.checked })
                }
                className="h-5 w-5 rounded border-border bg-white/[0.02] accent-primary"
              />
            </label>
            <label className="flex cursor-pointer items-center justify-between rounded-xl p-3 hover:bg-white/[0.02]">
              <div>
                <p className="text-sm font-medium text-foreground/80">
                  Show Contact Section
                </p>
                <p className="text-xs text-foreground/40">
                  Display contact form on the homepage
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.showContact}
                onChange={(e) =>
                  setSettings({ ...settings, showContact: e.target.checked })
                }
                className="h-5 w-5 rounded border-border bg-white/[0.02] accent-primary"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
