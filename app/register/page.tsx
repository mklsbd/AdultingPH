import Link from "next/link";
import AuthCard from "@/components/AuthCard";
import GoogleButton from "@/components/GoogleButton";
import GuestButton from "@/components/GuestButton";
import { ListChecks, MapPinned, FolderLock } from "lucide-react";

const perks = [
  { icon: ListChecks, text: "A checklist for SSS, NBI, PhilHealth, Pag-IBIG, and BIR" },
  { icon: MapPinned, text: "Directions to the nearest office once you set your location" },
  { icon: FolderLock, text: "A private vault to store your documents on this device" },
];

export default function RegisterPage() {
  return (
    <AuthCard
      title="Create your account"
      subtitle="Sign up with Gmail — we'll ask for your location next so we can point you to the right offices."
      footer={
        <p className="text-white/50 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-accent-violet font-semibold hover:text-white">
            Log in
          </Link>
        </p>
      }
    >
      <div className="space-y-3 mb-6">
        <GoogleButton callbackUrl="/onboarding/location" label="Sign up with Gmail" />
        <GuestButton destination="/onboarding/location" />
      </div>

      <ul className="space-y-2.5">
        {perks.map((p) => {
          const Icon = p.icon;
          return (
            <li key={p.text} className="flex items-center gap-3 text-sm text-navy-600">
              <span className="h-8 w-8 rounded-lg bg-success-light flex items-center justify-center shrink-0">
                <Icon className="h-4 w-4 text-success-dark" />
              </span>
              {p.text}
            </li>
          );
        })}
      </ul>

      <p className="text-navy-400 text-xs text-center mt-6 leading-relaxed">
        By continuing, you agree that AdultingPH is an independent tool and not affiliated with
        any Philippine government agency.
      </p>
    </AuthCard>
  );
}
