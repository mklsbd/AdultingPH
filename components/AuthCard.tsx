import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function AuthCard({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 text-white font-display font-bold text-lg mb-8">
          <Link href="/" className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-accent-violet" />
            AdultingPH
          </Link>
        </div>
        <div className="glass-panel-light p-7 sm:p-9">
          <h1 className="font-display font-bold text-2xl text-navy-900 text-center">{title}</h1>
          <p className="text-navy-500 text-sm text-center mt-2 mb-7">{subtitle}</p>
          {children}
        </div>
        {footer && <div className="text-center mt-6">{footer}</div>}
      </div>
    </div>
  );
}
