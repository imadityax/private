"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Razorpay may append params like payment_link_id, reference_id etc.
  const campaignId = searchParams.get("reference_id");

  useEffect(() => {
    // Optional: auto-redirect after a delay
    const timer = setTimeout(() => {
      if (campaignId) {
        router.push(`/campaigns/${campaignId}`);
      }
    }, 6000);

    return () => clearTimeout(timer);
  }, [campaignId, router]);

  return (
    <main className="relative min-h-screen flex items-center justify-center px-6 text-white overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-neutral-900" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-green-500/15 rounded-full blur-[160px]" />
        <div className="absolute top-20 left-10 text-[140px] font-bold text-white/5">
          支
        </div>
      </div>

      {/* Card */}
      <div className="max-w-md w-full border border-white/10 rounded-2xl p-8 bg-gradient-to-br from-black/40 to-neutral-900/60 text-center">
        {/* Icon */}
        <div className="w-14 h-14 mx-auto mb-4 rounded-full border border-green-500/30 bg-green-500/10 flex items-center justify-center text-green-400 text-2xl">
          ✓
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold mb-2">
          Payment Successful
        </h1>

        {/* Message */}
        <p className="text-gray-400 mb-6 leading-relaxed">
          Your payment has been received.
          <br />
          We’re activating your campaign securely.
        </p>

        {/* Status box */}
        <div className="border border-white/10 rounded-lg px-4 py-3 bg-black/30 text-sm text-gray-400 mb-6">
          Campaign status will update automatically once payment is verified.
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400"
            onClick={() => {
              if (campaignId) {
                router.push(`/campaigns/${campaignId}`);
              }
            }}
          >
            Go to Campaign
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push("/profile")}
          >
            Go to Profile
          </Button>
        </div>

        {/* Footer hint */}
        <p className="text-xs text-gray-500 mt-6">
          You’ll see your campaign as active once payment verification is complete.
        </p>
      </div>
    </main>
  );
}
