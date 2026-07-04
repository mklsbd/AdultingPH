"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import AppShell from "@/components/AppShell";
import ProgressBar from "@/components/ProgressBar";
import ChecklistCard from "@/components/ChecklistCard";
import Disclaimer from "@/components/Disclaimer";
import { agencies } from "@/data/agencies";
import { getChecklist, setChecklistItem, getProfile } from "@/lib/storage";
import { ChecklistState, UserProfile } from "@/lib/types";
import {
  Share2,
  ScrollText,
  MapPinned,
  FolderLock,
  ArrowRight,
  Check,
} from "lucide-react";
import Link from "next/link";

const highlightCards = [
  { icon: ScrollText, title: "Stay organized", desc: "One checklist for every agency" },
  { icon: FolderLock, title: "Vault your files", desc: "Keep IDs safely on this device" },
  { icon: MapPinned, title: "Find your office", desc: "Get directions near you" },
];

export default function DashboardPage() {
  const { data: session } = useSession();
  const [checklist, setChecklist] = useState<ChecklistState>({});
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setChecklist(getChecklist());
    setProfile(getProfile());
  }, []);

  const doneCount = agencies.filter((a) => checklist[a.id]).length;
  const percent = Math.round((doneCount / agencies.length) * 100);
  const firstName = (session?.user?.name ?? profile?.name ?? "there").split(" ")[0];

  function handleToggle(id: string, done: boolean) {
    setChecklist(setChecklistItem(id, done));
  }

  function shareProgress() {
    const text = `I've completed ${doneCount} of ${agencies.length} pre-employment requirements on AdultingPH! 🎯`;
    if (navigator.share) {
      navigator.share({ title: "My AdultingPH progress", text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <AppShell>
      <div className="space-y-6 pb-24 lg:pb-6">
        {/* Header row */}
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="glass-panel p-6 lg:col-span-2 flex flex-col justify-center">
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-white">
              Hi, {firstName}!
            </h1>
            <p className="text-white/60 mt-1.5 text-sm sm:text-base max-w-md">
              Here's where things stand with your pre-employment requirements.
            </p>
          </div>
          <div className="hidden lg:grid grid-cols-3 gap-3">
            {highlightCards.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.title} className="glass-panel p-4 flex flex-col items-start justify-center">
                  <Icon className="h-5 w-5 text-accent-violet mb-2" />
                  <p className="text-white text-xs font-semibold leading-tight">{c.title}</p>
                  <p className="text-white/40 text-[11px] leading-tight mt-0.5">{c.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress + CTA row */}
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="glass-card p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-1">
              <h2 className="font-semibold text-navy-900">Job-Ready Progress</h2>
              <button
                onClick={shareProgress}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-violet hover:text-accent-indigo"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
                {copied ? "Copied!" : "Share progress"}
              </button>
            </div>
            <p className="text-navy-500 text-sm mb-5">
              {doneCount} of {agencies.length} requirements completed
            </p>
            <ProgressBar percent={percent} />
          </div>

          <div className="rounded-3xl p-6 bg-gradient-to-br from-accent-violet to-accent-indigo text-white flex flex-col justify-between shadow-glow-violet">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-white/70">
                Republic Act 11261
              </p>
              <h3 className="font-display font-bold text-lg mt-1.5 leading-snug">
                Get these documents for free
              </h3>
              <p className="text-white/70 text-sm mt-2 leading-relaxed">
                First-time job seekers can claim SSS, NBI, PhilHealth, Pag-IBIG, and BIR
                registration at no cost.
              </p>
            </div>
            <Link
              href="/resources"
              className="inline-flex items-center gap-1.5 text-sm font-semibold mt-5 bg-white text-accent-indigo rounded-xl px-4 py-2.5 w-fit hover:bg-white/90 transition-all"
            >
              Learn how <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Checklist grid */}
        <div>
          <h2 className="text-white font-semibold mb-3 px-1">Your requirements checklist</h2>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {agencies.map((agency) => (
              <ChecklistCard
                key={agency.id}
                agency={agency}
                done={!!checklist[agency.id]}
                onToggle={handleToggle}
              />
            ))}
          </div>
        </div>

        <Disclaimer />
      </div>
    </AppShell>
  );
}
