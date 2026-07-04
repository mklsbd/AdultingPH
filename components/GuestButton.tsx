"use client";

import { useRouter } from "next/navigation";
import { UserRound } from "lucide-react";
import { saveProfile } from "@/lib/storage";

export default function GuestButton({
  destination = "/onboarding/location",
}: {
  destination?: string;
}) {
  const router = useRouter();

  function continueAsGuest() {
    // Minimal placeholder profile so AppShell's auth guard lets the user in.
    // This is local-only and meant for previewing the app before Google
    // OAuth credentials are configured.
    saveProfile({
      name: "Guest",
      email: "",
      region: "",
      province: "",
      city: "",
      onboardingComplete: false,
    });
    router.push(destination);
  }

  return (
    <button
      onClick={continueAsGuest}
      className="w-full flex items-center justify-center gap-2 rounded-xl border border-dashed border-navy-200 bg-navy-50/60 px-5 py-3 text-sm font-semibold text-navy-600 hover:bg-navy-50 active:scale-[0.99] transition-all"
    >
      <UserRound className="h-4 w-4" />
      Preview without Google (guest mode)
    </button>
  );
}
