"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


export default function CampaignerOnboarding() {
    const router = useRouter();
  const [days, setDays] = useState<number>(7);
  const [budget, setBudget] = useState<number>(5000);
  const [customBudget, setCustomBudget] = useState<boolean>(false);
  const [goal, setGoal] = useState<string | null>(null);
  const [members, setMembers] = useState<number>(10);

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-neutral-950 to-black text-white px-6 py-16">
      {/* Background accents */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[420px] h-[420px] bg-red-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-20 left-10 text-[120px] font-bold text-white/5">
          発
        </div>
        <div className="absolute bottom-20 right-10 text-[120px] font-bold text-white/5">
          金
        </div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold mb-2 tracking-tight">
          Create your campaign
        </h1>
        <p className="text-gray-400 mb-12">
          Define duration, budget, reach, and scale.
        </p>

        {/* Duration */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-2">
            Campaign duration
          </h2>
          <p className="text-gray-400 mb-4">
            {days} day{days > 1 && "s"}
          </p>

          <input
            type="range"
            min={1}
            max={30}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-full accent-red-500"
          />
        </div>

        {/* Budget */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-2">
            Campaign budget
          </h2>
          <p className="text-gray-400 mb-4">
            ₹{budget.toLocaleString()}
          </p>

          {!customBudget && (
            <>
              <input
                type="range"
                min={1000}
                max={50000}
                step={500}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full accent-red-500"
              />

              <button
                onClick={() => setCustomBudget(true)}
                className="mt-3 text-sm text-red-400 hover:underline"
              >
                Enter custom amount
              </button>
            </>
          )}

          {customBudget && (
            <input
              type="number"
              min={50000}
              placeholder="Enter amount above ₹50,000"
              className="mt-3 w-full bg-black border border-white/10 rounded-lg px-4 py-3"
              onChange={(e) => setBudget(Number(e.target.value))}
            />
          )}
        </div>

        {/* Members */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-2">
            Number of promoters
          </h2>
          <p className="text-gray-400 mb-4">
            {members} promoter{members > 1 && "s"}
          </p>

          <input
            type="range"
            min={1}
            max={10}
            value={members}
            onChange={(e) => setMembers(Number(e.target.value))}
            className="w-full accent-red-500"
          />

          <p className="text-sm text-gray-500 mt-2">
            Controls how many promoters can join your campaign.
          </p>
        </div>

        {/* Goal */}
        <div className="mb-16">
          <h2 className="text-xl font-semibold mb-4">
            What do you want to grow?
          </h2>
          <div className="flex flex-wrap gap-4">
            {["Likes", "Views", "Followers"].map((g) => (
              <button
                key={g}
                onClick={() => setGoal(g)}
                className={`px-6 py-3 rounded-full border transition ${
                  goal === g
                    ? "border-red-500 bg-red-500/10"
                    : "border-white/10 hover:border-red-500/40"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Button
          className="w-full py-7 text-lg bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400"
          disabled={!goal || !budget || !days || !members}
          onClick={() => router.push("/campaigns/[id]")}
          variant="outline"
        >
          Create Campaign
        </Button>

        {/* Hint */}
        <p className="text-sm text-gray-500 mt-6 text-center">
          Rewards and performance rules can be configured after creation.
        </p>
      </div>
    </main>
  );
}
