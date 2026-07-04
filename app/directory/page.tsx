"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AppShell from "@/components/AppShell";
import Disclaimer from "@/components/Disclaimer";
import { agencies } from "@/data/agencies";
import { getProfile } from "@/lib/storage";
import { UserProfile } from "@/lib/types";
import { Search, ExternalLink, MapPin, CheckCircle2, Circle } from "lucide-react";
import { getChecklist, setChecklistItem } from "@/lib/storage";

function DirectoryContent() {
  const searchParams = useSearchParams();
  const highlightId = searchParams.get("agency");
  const [query, setQuery] = useState("");
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setProfile(getProfile());
    setChecklist(getChecklist());
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return agencies;
    return agencies.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.fullName.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q)
    );
  }, [query]);

  const locationLabel = profile ? [profile.city, profile.province].filter(Boolean).join(", ") : "";

  function officeMapUrl(agencyFullName: string) {
    const place = locationLabel
      ? `${agencyFullName} office near ${locationLabel}, Philippines`
      : `${agencyFullName} office Philippines`;
    return `https://www.google.com/maps/search/${encodeURIComponent(place)}`;
  }

  function toggleDone(id: string, done: boolean) {
    setChecklist(setChecklistItem(id, done));
  }

  return (
    <AppShell>
      <div className="space-y-6 pb-24 lg:pb-6">
        <div className="glass-panel p-6">
          <h1 className="font-display font-bold text-2xl text-white">Agency Directory</h1>
          <p className="text-white/60 text-sm mt-1.5 max-w-xl">
            Verified links and step-by-step guides for every mandatory pre-employment
            requirement.
          </p>
          <div className="relative mt-5 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search SSS, NBI, PhilHealth…"
              className="input-field pl-10"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filtered.map((agency) => {
            const done = !!checklist[agency.id];
            return (
              <div
                key={agency.id}
                id={agency.id}
                className={`glass-card p-6 ${
                  highlightId === agency.id ? "ring-2 ring-accent-violet" : ""
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-4 min-w-0">
                    <div
                      className="h-12 w-12 rounded-2xl shrink-0 flex items-center justify-center text-white font-display font-bold text-sm"
                      style={{
                        background: `linear-gradient(135deg, ${agency.colorFrom}, ${agency.colorTo})`,
                      }}
                    >
                      {agency.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="font-semibold text-navy-900">{agency.fullName}</h2>
                        {agency.freeUnderRA11261 && (
                          <span className="badge-success">Free under RA 11261</span>
                        )}
                      </div>
                      <p className="text-navy-500 text-sm mt-1 leading-relaxed max-w-xl">
                        {agency.description}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleDone(agency.id, !done)}
                    className="shrink-0 self-start sm:self-center"
                    aria-label="Toggle completed"
                  >
                    {done ? (
                      <CheckCircle2 className="h-7 w-7 text-success" />
                    ) : (
                      <Circle className="h-7 w-7 text-navy-200 hover:text-accent-violet transition-colors" />
                    )}
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-5">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-navy-400 mb-2.5">
                      Step-by-step guide
                    </h3>
                    <ol className="space-y-2">
                      {agency.steps.map((s) => (
                        <li key={s.step} className="flex gap-2.5 text-sm text-navy-700">
                          <span className="h-5 w-5 rounded-full bg-navy-100 text-navy-600 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {s.step}
                          </span>
                          <span className="leading-relaxed">{s.text}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-navy-400 mb-2.5">
                      What you'll need
                    </h3>
                    <ul className="space-y-1.5 mb-5">
                      {agency.requirements.map((r) => (
                        <li key={r} className="text-sm text-navy-700 flex gap-2">
                          <span className="text-accent-violet">•</span>
                          {r}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2.5">
                      <a
                        href={agency.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary text-sm py-2 px-4"
                      >
                        Official portal <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                      <a
                        href={officeMapUrl(agency.fullName)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost text-sm py-2 px-4"
                      >
                        <MapPin className="h-3.5 w-3.5" />
                        {locationLabel ? `Offices near ${locationLabel}` : "Find nearest office"}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="glass-card p-10 text-center text-navy-400 text-sm">
              No agency matches "{query}".
            </div>
          )}
        </div>

        <Disclaimer />
      </div>
    </AppShell>
  );
}

export default function DirectoryPage() {
  return (
    <Suspense fallback={null}>
      <DirectoryContent />
    </Suspense>
  );
}
