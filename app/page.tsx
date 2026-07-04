import Link from "next/link";
import {
  ShieldCheck,
  FileCheck2,
  MapPinned,
  FolderLock,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Disclaimer from "@/components/Disclaimer";

const features = [
  {
    icon: FileCheck2,
    title: "One checklist, five agencies",
    desc: "Track SSS, NBI, PhilHealth, Pag-IBIG, and BIR progress in a single dashboard.",
  },
  {
    icon: MapPinned,
    title: "Offices near you",
    desc: "Tell us your city once, and get directions to the nearest branch for every requirement.",
  },
  {
    icon: FolderLock,
    title: "Private document vault",
    desc: "Store scanned IDs and clearances locally on your device — nothing leaves your browser.",
  },
  {
    icon: Sparkles,
    title: "Built-in AI assistant",
    desc: "Ask questions about fees, requirements, or RA 11261 benefits anytime.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-6 lg:px-12 py-6">
        <div className="flex items-center gap-2 text-white font-display font-bold text-lg">
          <ShieldCheck className="h-6 w-6 text-accent-violet" />
          AdultingPH
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="btn-ghost">
            Log in
          </Link>
          <Link href="/register" className="btn-accent">
            Get started
          </Link>
        </div>
      </header>

      <main className="flex-1 px-6 lg:px-12">
        <section className="max-w-5xl mx-auto text-center pt-12 lg:pt-20 pb-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 text-white/80 text-xs font-medium px-4 py-1.5 mb-6">
            <Sparkles className="h-3.5 w-3.5 text-accent-violet" />
            Made for first-time job seekers in the Philippines
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight">
            Every government requirement,
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-accent-violet to-success bg-clip-text text-transparent">
              tracked in one place.
            </span>
          </h1>
          <p className="mt-6 text-white/60 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            AdultingPH helps you get job-ready by organizing your SSS, NBI Clearance, PhilHealth,
            Pag-IBIG, and BIR paperwork — with verified links, local guides, and a private
            document vault.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/register" className="btn-accent px-7 py-3 text-base">
              Create your free account <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/login" className="btn-ghost px-7 py-3 text-base">
              I already have an account
            </Link>
          </div>
        </section>

        <section className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-20">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="glass-panel p-5 text-left">
                <div className="h-10 w-10 rounded-xl bg-accent-violet/20 flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-accent-violet" />
                </div>
                <h3 className="text-white font-semibold text-sm mb-1.5">{f.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </section>

        <section className="max-w-3xl mx-auto pb-16">
          <Disclaimer />
        </section>
      </main>

      <footer className="text-center text-white/30 text-xs pb-8">
        © {new Date().getFullYear()} AdultingPH. An independent, unofficial resource tool.
      </footer>
    </div>
  );
}
