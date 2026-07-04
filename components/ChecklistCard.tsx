"use client";

import { Agency } from "@/lib/types";
import { CheckCircle2, Circle, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function ChecklistCard({
  agency,
  done,
  onToggle,
}: {
  agency: Agency;
  done: boolean;
  onToggle: (id: string, done: boolean) => void;
}) {
  return (
    <div className="glass-card p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="h-11 w-11 rounded-2xl shrink-0 flex items-center justify-center text-white font-display font-bold text-sm"
            style={{
              background: `linear-gradient(135deg, ${agency.colorFrom}, ${agency.colorTo})`,
            }}
          >
            {agency.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-navy-900 truncate">{agency.name}</p>
            <p className="text-xs text-navy-500 truncate">{agency.fullName}</p>
          </div>
        </div>
        <button
          onClick={() => onToggle(agency.id, !done)}
          aria-pressed={done}
          aria-label={`Mark ${agency.name} as ${done ? "not done" : "done"}`}
          className="shrink-0"
        >
          {done ? (
            <CheckCircle2 className="h-7 w-7 text-success" />
          ) : (
            <Circle className="h-7 w-7 text-navy-200 hover:text-accent-violet transition-colors" />
          )}
        </button>
      </div>

      <p className="text-sm text-navy-600 leading-relaxed">{agency.description}</p>

      <div className="flex items-center justify-between mt-auto pt-1">
        {done ? (
          <span className="badge-success">Completed</span>
        ) : (
          <span className="badge-warning">Pending</span>
        )}
        <Link
          href={`/directory?agency=${agency.id}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-accent-violet hover:text-accent-indigo"
        >
          View guide <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
