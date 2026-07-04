"use client";

export default function ProgressBar({
  percent,
  label,
}: {
  percent: number;
  label?: string;
}) {
  const clamped = Math.min(100, Math.max(0, percent));
  return (
    <div className="w-full">
      {label && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-navy-700">{label}</span>
          <span className="text-sm font-semibold text-navy-900">{clamped}%</span>
        </div>
      )}
      <div className="h-3 w-full rounded-full bg-navy-100/70 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent-violet to-accent-indigo transition-all duration-700 ease-out"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
