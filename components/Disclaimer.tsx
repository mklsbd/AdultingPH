import { AlertTriangle } from "lucide-react";

export default function Disclaimer() {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-warning/30 bg-warning-light/80 backdrop-blur px-4 py-3.5 text-sm text-warning-dark">
      <AlertTriangle className="h-4.5 w-4.5 mt-0.5 shrink-0" />
      <p>
        This is an independent tracker and resource tool. AdultingPH is not affiliated with any
        Philippine government agency. Always verify requirements, fees, and steps on each agency's
        official website before transacting.
      </p>
    </div>
  );
}
