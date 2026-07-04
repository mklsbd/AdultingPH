import AppShell from "@/components/AppShell";
import Disclaimer from "@/components/Disclaimer";
import { BookOpen, CheckCircle2, XCircle, MapPin, ScrollText } from "lucide-react";

const covered = [
  "Barangay clearance/certification",
  "Police clearance from the PNP",
  "NBI Clearance",
  "SSS registration and SS number issuance",
  "PhilHealth member registration",
  "Pag-IBIG (HDMF) membership registration",
  "BIR Tax Identification Number (TIN)",
  "Medical certificate from a public hospital (lab tests and procedures are still charged)",
  "Other government-issued documents an employer requires for hiring",
];

const notCovered = [
  "Professional licensure exam fees (PRC)",
  "Driver's license applications (LTO)",
  "Anyone who already benefits from the JobStart Program or a similar fee waiver",
  "A second attempt — the waiver can only be used once per person",
];

export default function ResourcesPage() {
  return (
    <AppShell>
      <div className="space-y-6 pb-24 lg:pb-6">
        <div className="glass-panel p-6">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-accent-violet/20 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-accent-violet" />
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl text-white">Resource Center</h1>
              <p className="text-white/60 text-sm mt-0.5">
                Understanding Republic Act 11261, the First Time Jobseekers Assistance Act
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-3">
            <ScrollText className="h-5 w-5 text-accent-violet" />
            <h2 className="font-display font-bold text-xl text-navy-900">What RA 11261 does</h2>
          </div>
          <p className="text-navy-600 text-sm leading-relaxed">
            Signed into law in 2019, RA 11261 waives government fees on the documents most
            employers ask for before hiring someone, as long as it's the applicant's very first
            time entering the workforce. The goal is to remove the cost barrier that often keeps
            new graduates and young workers from completing their paperwork before their first
            job offer expires.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="h-5 w-5 text-success" />
              <h3 className="font-semibold text-navy-900">Fee-free for first-timers</h3>
            </div>
            <ul className="space-y-2">
              {covered.map((item) => (
                <li key={item} className="text-sm text-navy-700 flex gap-2">
                  <span className="text-success mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <XCircle className="h-5 w-5 text-danger" />
              <h3 className="font-semibold text-navy-900">Not covered by the waiver</h3>
            </div>
            <ul className="space-y-2">
              {notCovered.map((item) => (
                <li key={item} className="text-sm text-navy-700 flex gap-2">
                  <span className="text-danger mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="glass-card p-6 sm:p-8">
          <h3 className="font-semibold text-navy-900 mb-4">How to claim the benefit</h3>
          <ol className="space-y-4">
            {[
              "Visit your Barangay Hall and request a Barangay Certification stating you're a first-time job seeker. You'll usually need to have lived in that barangay for at least six months.",
              "Bring that certification whenever you register for SSS, PhilHealth, Pag-IBIG, BIR, or apply for an NBI or police clearance — mention RA 11261 at the counter or upload it if applying online.",
              "Drop by your city or municipality's Public Employment Service Office (PESO). Under the law, PESO acts as a one-stop shop to help first-time job seekers complete these requirements.",
              "Keep in mind the waiver can only be used once. Falsifying your first-time job seeker status is punishable under the Revised Penal Code, so only claim it if it genuinely applies to you.",
            ].map((text, i) => (
              <li key={i} className="flex gap-3">
                <span className="h-6 w-6 rounded-full bg-accent-violet/15 text-accent-violet text-xs font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <p className="text-sm text-navy-700 leading-relaxed">{text}</p>
              </li>
            ))}
          </ol>

          <a
            href="https://lawphil.net/statutes/repacts/ra2019/ra_11261_2019.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-violet hover:text-accent-indigo mt-6"
          >
            <MapPin className="h-3.5 w-3.5" />
            Read the full text of RA 11261
          </a>
        </div>

        <Disclaimer />
      </div>
    </AppShell>
  );
}
