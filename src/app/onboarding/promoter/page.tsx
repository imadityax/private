"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Navbar } from "@/components/navbar";
import { useRouter } from "next/navigation";

type Campaign = {
  id: string;
  name: string;
  goal: string;
  budget: number;
  members: number;
  selected: number;
  createdAt: string;
};

/* 24 mock campaigns → 12 per page */
const mockCampaigns: Campaign[] = Array.from({ length: 24 }).map((_, i) => ({
  id: `${i + 1}`,
  name: `Campaign ${i + 1}`,
  goal: ["Views", "Likes", "Followers", "Clicks"][i % 4],
  budget: [3000, 5000, 8000, 12000, 20000, 40000][i % 6],
  members: 10 + (i % 5) * 5,
  selected: Math.floor(Math.random() * 6),
  createdAt: new Date(
    Date.now() - i * 24 * 60 * 60 * 1000
  ).toISOString(),
}));

const PAGE_SIZE = 12;

export default function PromoterDashboard() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<"latest" | "budget">("latest");

  // Redirect if query params are present (clean URL)
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.search) {
      router.replace("/onboarding/promoter");
    }
  }, [router]);

  const sorted = [...mockCampaigns].sort((a, b) => {
    if (sort === "budget") return b.budget - a.budget;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const paginated = sorted.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const totalPages = Math.ceil(mockCampaigns.length / PAGE_SIZE);

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen text-white px-6 py-10 overflow-hidden">
        {/* ===== BACKGROUND ===== */}
        <div className="fixed inset-0 -z-10">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-linear-to-br from-neutral-900 via-[#0f0f0f] to-neutral-900" />

          {/* Red sun glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-red-600/15 rounded-full blur-[160px]" />

          {/* Secondary glow */}
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[140px]" />

          {/* Washi texture */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='1.5' fill='%23ffffff'/%3E%3Ccircle cx='80' cy='40' r='1' fill='%23ffffff'/%3E%3Ccircle cx='50' cy='90' r='1.2' fill='%23ffffff'/%3E%3Ccircle cx='100' cy='100' r='1.3' fill='%23ffffff'/%3E%3C/svg%3E")`,
              backgroundSize: "200px 200px",
            }}
          />

          {/* Kanji watermark */}
          <div className="absolute top-16 left-10 text-[160px] font-bold text-white/5">
            結
          </div>
          <div className="absolute bottom-20 right-10 text-[160px] font-bold text-white/5">
            繋
          </div>
        </div>

        {/* ===== CONTENT ===== */}
        <div className="max-w-7xl mx-auto">
          {/* TOP BAR */}
          <div className="mb-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-full border border-red-500/30 bg-red-500/10 text-red-400 font-bold">
                結
              </div>
              <div>
                <p className="font-semibold tracking-wide text-white">
                  Promoter Space
                </p>
                <p className="text-sm text-gray-400">
                  Participate in aligned campaigns
                </p>
              </div>
            </div>

            {/* Sort */}
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={sort === "latest" ? "default" : "outline"}
                onClick={() => setSort("latest")}
              >
                Latest
              </Button>
              <Button
                size="sm"
                variant={sort === "budget" ? "default" : "outline"}
                onClick={() => setSort("budget")}
              >
                High Value
              </Button>
            </div>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((c) => {
              const progress = Math.round(
                (c.selected / c.members) * 100
              );

              return (
                <Card
                  key={c.id}
                  className="border-white/10 bg-linear-to-br from-black/40 to-neutral-900/60 hover:border-red-500/30 transition"
                >
                  <CardHeader>
                    <CardTitle className="text-lg tracking-wide">
                      {c.name}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      Objective · {c.goal}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-300">
                      Budget · ₹{c.budget.toLocaleString()}
                    </p>

                    {/* Progress */}
                    <div>
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>
                          {c.selected} of {c.members} selected
                        </span>
                        <span>{progress}%</span>
                      </div>
                      <Progress
                        value={progress}
                        className="h-2 bg-white/10 [&>div]:bg-linear-to-r [&>div]:from-red-500 [&>div]:to-red-400"
                      />
                    </div>

                    <Button
                      className="w-full"
                      disabled={c.selected >= c.members}
                    >
                      {c.selected >= c.members
                        ? "Campaign Full"
                        : "Request Participation"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* PAGINATION */}
          <div className="mt-12 flex items-center justify-center gap-4 text-sm">
            <Button
              size="sm"
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              ← Previous
            </Button>

            <span className="text-gray-400">
              Page {page} of {totalPages}
            </span>

            <Button
              size="sm"
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next →
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
