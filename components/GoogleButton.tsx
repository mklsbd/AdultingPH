"use client";

import { signIn } from "next-auth/react";

export default function GoogleButton({
  callbackUrl,
  label = "Continue with Google",
}: {
  callbackUrl: string;
  label?: string;
}) {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl })}
      className="w-full flex items-center justify-center gap-3 rounded-xl border border-navy-100 bg-white px-5 py-3 text-sm font-semibold text-navy-800 hover:bg-navy-50 active:scale-[0.99] transition-all shadow-sm"
    >
      <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
        <path
          fill="#FFC107"
          d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l6-6C34.5 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.4-.1-2.7-.4-3.5z"
        />
        <path
          fill="#FF3D00"
          d="m6.3 14.7 6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.8 1.1 8 3l6-6C34.5 5.1 29.6 3 24 3c-7.7 0-14.3 4.4-17.7 10.7z"
        />
        <path
          fill="#4CAF50"
          d="M24 45c5.5 0 10.4-1.9 14.2-5.1l-6.6-5.4C29.6 36.1 27 37 24 37c-5.3 0-9.7-3.4-11.3-8l-6.6 5.1C9.6 40.5 16.2 45 24 45z"
        />
        <path
          fill="#1976D2"
          d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.6l6.6 5.4C39.9 36.5 44 31 44 24c0-1.4-.1-2.7-.4-3.5z"
        />
      </svg>
      {label}
    </button>
  );
}
