"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Building2,
  FolderLock,
  BookOpen,
  LogOut,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getProfile } from "@/lib/storage";
import { UserProfile } from "@/lib/types";
import ChatAssistant from "./ChatAssistant";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/directory", label: "Agency Directory", icon: Building2 },
  { href: "/vault", label: "Document Vault", icon: FolderLock },
  { href: "/resources", label: "Resource Center", icon: BookOpen },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setProfile(getProfile());
  }, [pathname]);

  useEffect(() => {
    const stored = getProfile();
    if (!session && !stored) {
      router.replace("/login");
    }
  }, [session, router]);

  const displayName = session?.user?.name ?? profile?.name ?? "Jobseeker";
  const location = profile
    ? [profile.city, profile.province].filter(Boolean).join(", ")
    : "Location not set";

  return (
    <div className="min-h-screen w-full lg:flex">
      {/* Mobile top bar */}
      <div className="flex items-center justify-between lg:hidden px-4 py-3 glass-panel m-3 rounded-2xl">
        <div className="flex items-center gap-2 text-white font-display font-bold">
          <ShieldCheck className="h-5 w-5 text-accent-violet" />
          AdultingPH
        </div>
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="text-white p-2 rounded-lg bg-white/10"
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          mobileOpen ? "block" : "hidden"
        } lg:block lg:sticky lg:top-0 lg:h-screen w-full lg:w-72 shrink-0 p-3`}
      >
        <div className="glass-panel h-full flex flex-col p-5">
          <div className="hidden lg:flex items-center gap-2 text-white font-display font-bold text-lg mb-8 px-1">
            <ShieldCheck className="h-6 w-6 text-accent-violet" />
            AdultingPH
          </div>

          <nav className="flex-1 flex flex-col gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? "bg-white text-navy-900 shadow-glass"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="h-4.5 w-4.5" strokeWidth={2} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-5 border-t border-white/10">
            <div className="flex items-center gap-3 px-2 mb-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-accent-violet to-accent-indigo flex items-center justify-center text-white font-semibold">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-white text-sm font-medium truncate">{displayName}</p>
                <p className="text-white/50 text-xs truncate">{location}</p>
              </div>
            </div>
            <button
              onClick={() => {
                signOut({ redirect: false });
                router.push("/login");
              }}
              className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 p-3 lg:p-6">{children}</main>

      <ChatAssistant />
    </div>
  );
}
