import Link from "next/link";
import AuthCard from "@/components/AuthCard";
import GoogleButton from "@/components/GoogleButton";
import GuestButton from "@/components/GuestButton";

export default function LoginPage() {
  return (
    <AuthCard
      title="Welcome back"
      subtitle="Log in to keep tracking your pre-employment requirements."
      footer={
        <p className="text-white/50 text-sm">
          New to AdultingPH?{" "}
          <Link href="/register" className="text-accent-violet font-semibold hover:text-white">
            Create an account
          </Link>
        </p>
      }
    >
      <div className="space-y-3">
        <GoogleButton callbackUrl="/dashboard" label="Continue with Gmail" />
        <GuestButton destination="/dashboard" />
      </div>
      <p className="text-navy-400 text-xs text-center mt-6 leading-relaxed">
        By continuing, you agree that AdultingPH is an independent tool and not affiliated with
        any Philippine government agency.
      </p>
    </AuthCard>
  );
}
