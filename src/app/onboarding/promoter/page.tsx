"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Navbar } from "@/components/navbar";
import { useRouter } from "next/navigation";

type Campaign = {
  id: string;
  title: string;
  description: string | null;
  goal: string;
  budget: number;
  baseReward: number;
  bonusPool: number;
  minFollowers: number;
  maxParticipants: number | null;
  participantCount: number;
  isFull: boolean;
  daysRemaining: number;
  startsAt: string;
  endsAt: string;
  createdAt: string;
  creator: {
    name: string | null;
    email: string;
  };
  mediaId: string;
};

const PAGE_SIZE = 12;

export default function PromoterDashboard() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<"latest" | "budget">("latest");
  const [joiningCampaignId, setJoiningCampaignId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch available campaigns
  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/campaigns/available");
      if (!response.ok) {
        throw new Error("Failed to fetch campaigns");
      }
      const data = await response.json();
      setCampaigns(data.campaigns || []);
    } catch (err: any) {
      console.error("Error fetching campaigns:", err);
      setError(err.message || "Failed to load campaigns");
    } finally {
      setLoading(false);
    }
  };

  const handleJoinCampaign = async (campaignId: string) => {
    setJoiningCampaignId(campaignId);
    setError(null);
    try {
      const response = await fetch(`/api/campaigns/${campaignId}/join`, {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to join campaign");
      }

      // Refresh campaigns list
      await fetchCampaigns();

      // Show success and navigate to campaign details
      alert("Successfully joined the campaign!");
      router.push(`/campaigns/${campaignId}`);
    } catch (err: any) {
      console.error("Error joining campaign:", err);
      setError(err.message || "Failed to join campaign");
      alert(err.message || "Failed to join campaign");
    } finally {
      setJoiningCampaignId(null);
    }
  };

  // Sort campaigns
  const sorted = [...campaigns].sort((a, b) => {
    if (sort === "budget") return b.budget - a.budget;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Paginate
  const paginated = sorted.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const totalPages = Math.ceil(campaigns.length / PAGE_SIZE);

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

          {/* Error Message */}
          {error && (
            <Card className="border-red-500/30 bg-red-500/10 mb-6">
              <CardContent className="p-4">
                <p className="text-red-400 text-sm">{error}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchCampaigns}
                  className="mt-3"
                >
                  Retry
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
              <p className="ml-3 text-gray-400">Loading campaigns...</p>
            </div>
          ) : campaigns.length === 0 ? (
            <Card className="border-white/10 bg-linear-to-br from-black/40 to-neutral-900/60">
              <CardContent className="p-12 text-center">
                <p className="text-gray-400 mb-2">No available campaigns at the moment</p>
                <p className="text-sm text-gray-500">
                  Check back later or create your own campaign as a campaigner
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginated.map((c) => {
                  const progress = c.maxParticipants
                    ? Math.round(
                      (c.participantCount / c.maxParticipants) * 100
                    )
                    : 0;

                  return (
                    <Card
                      key={c.id}
                      className="border-white/10 bg-linear-to-br from-black/40 to-neutral-900/60 hover:border-red-500/30 transition cursor-pointer"
                      onClick={() => router.push(`/campaigns/${c.id}`)}
                    >
                      <CardHeader>
                        <CardTitle className="text-lg tracking-wide">
                          {c.title}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {c.goal} · {c.daysRemaining} days left
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-300 mb-1">
                            Budget · ₹{c.budget.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-400">
                            Base Reward · ₹{c.baseReward.toLocaleString()}
                          </p>
                          {c.bonusPool > 0 && (
                            <p className="text-xs text-gray-400">
                              Bonus Pool · ₹{c.bonusPool.toLocaleString()}
                            </p>
                          )}
                        </div>

                        {/* Progress */}
                        {c.maxParticipants && (
                          <div>
                            <div className="flex justify-between text-xs text-gray-400 mb-1">
                              <span>
                                {c.participantCount} of {c.maxParticipants} joined
                              </span>
                              <span>{progress}%</span>
                            </div>
                            <Progress
                              value={progress}
                              className="h-2 bg-white/10 [&>div]:bg-linear-to-r [&>div]:from-red-500 [&>div]:to-red-400"
                            />
                          </div>
                        )}

                        <div className="text-xs text-gray-400">
                          <p>Min Followers: {c.minFollowers.toLocaleString()}</p>
                          <p className="mt-1">
                            By: {c.creator.name || c.creator.email.split("@")[0]}
                          </p>
                        </div>

                        <Button
                          className="w-full"
                          disabled={
                            joiningCampaignId === c.id ||
                            c.isFull
                          }
                          onClick={(e) => {
                            e.stopPropagation();
                            handleJoinCampaign(c.id);
                          }}
                        >
                          {joiningCampaignId === c.id
                            ? "Joining..."
                            : c.isFull
                              ? "Campaign Full"
                              : "Join Campaign"}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </>
          )}

          {/* PAGINATION */}
          {!loading && campaigns.length > 0 && totalPages > 1 && (
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
          )}
        </div>
      </main>
    </>
  );
}
