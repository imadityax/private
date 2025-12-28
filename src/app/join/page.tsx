"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function JoinPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-neutral-950 to-black text-white flex items-center justify-center px-6">
      {/* Background accents */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Soft red sun glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[420px] h-[420px] bg-red-600/10 rounded-full blur-[140px]" />

        {/* Kanji watermark */}
        <div className="absolute top-20 left-10 text-[120px] font-bold text-white/5">
          結
        </div>
        <div className="absolute bottom-20 right-10 text-[120px] font-bold text-white/5">
          繋
        </div>
      </div>

      <div className="relative z-10 max-w-3xl w-full text-center">
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
          How do you want to use{" "}
          <span className="bg-gradient-to-r from-red-400 to-red-200 bg-clip-text text-transparent">
            Musubi
          </span>
          ?
        </h1>

        <p className="text-gray-400 mb-12 tracking-wide">
          Choose your role. You can switch anytime.
        </p>

        {/* Role Cards */}
        <div className="grid sm:grid-cols-2 gap-8">
          {/* Campaigner */}
          <div className="group relative border border-white/10 rounded-2xl p-8 transition hover:border-red-500/40 bg-gradient-to-br from-black to-neutral-900">
            {/* Kanji */}
            <div className="absolute top-4 right-4 text-4xl text-red-500/20 font-bold">
              発
            </div>

            <h2 className="text-2xl font-semibold mb-3 tracking-wide">
              Campaigner
            </h2>

            <p className="text-gray-400 mb-6 leading-relaxed">
              Launch campaigns, set budgets, and pay for real engagement.
            </p>

            <Button
              className="w-full py-6 text-lg bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400"
              onClick={() => router.push("/onboarding/campaigner")}
              variant="outline"
            >
              Continue as Campaigner
            </Button>
          </div>

          {/* Promoter */}
          <div className="group relative border border-white/10 rounded-2xl p-8 transition hover:border-amber-500/40 bg-gradient-to-br from-black to-neutral-900">
            {/* Kanji */}
            <div className="absolute top-4 right-4 text-4xl text-amber-500/20 font-bold">
              伝
            </div>

            <h2 className="text-2xl font-semibold mb-3 tracking-wide">
              Promoter
            </h2>

            <p className="text-gray-400 mb-6 leading-relaxed">
              Promote campaigns, drive reach, and earn based on performance.
            </p>

            <Button
              variant="outline"
              className="w-full py-6 text-lg border-amber-500/30 hover:bg-amber-100/10 hover:text-white"
              onClick={() => router.push("/onboarding/promoter")}
            >
              Continue as Promoter
            </Button>
          </div>
        </div>

        {/* Bottom divider */}
        <div className="mt-16 flex items-center gap-4 opacity-50">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <span className="text-sm tracking-widest text-gray-400">
            結びの選択
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      </div>
    </main>
  );
}
