"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { useRouter } from "next/navigation";

type InstagramMedia = {
  id: string;
  media_url: string;
  permalink?: string;
  timestamp?: string;
  caption?: string;
};

export default function CampaignerOnboarding() {
  const router = useRouter();
  const [days, setDays] = useState<number>(7);
  const [budget, setBudget] = useState<number>(5000);
  const [customBudget, setCustomBudget] = useState<boolean>(false);
  const [goal, setGoal] = useState<string | null>(null);
  const [members, setMembers] = useState<number>(10);
  const [selectedMediaId, setSelectedMediaId] = useState<string | null>(null);
  const [instagramMedia, setInstagramMedia] = useState<InstagramMedia[]>([]);
  const [loadingMedia, setLoadingMedia] = useState<boolean>(true);
  const [mediaError, setMediaError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect if query params are present (clean URL)
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.search) {
      router.replace("/onboarding/campaigner");
    }
  }, [router]);

  // Fetch Instagram media on component mount
  useEffect(() => {
    const fetchInstagramMedia = async () => {
      setLoadingMedia(true);
      setMediaError(null);
      try {
        const response = await fetch("/api/get-insta-recent-post");
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch Instagram media");
        }
        const data = await response.json();
        setInstagramMedia(data.data || []);
      } catch (err: any) {
        console.error("Error fetching Instagram media:", err);
        setMediaError(err.message || "Failed to load Instagram posts");
      } finally {
        setLoadingMedia(false);
      }
    };

    fetchInstagramMedia();
  }, []);

  const handleCreateCampaign = async () => {
    if (!goal || !budget || !days || !members) {
      setError("Please fill in all fields");
      return;
    }

    // Validate budget is a multiple of 100
    if (budget % 100 !== 0) {
      setError("Budget must be a multiple of ₹100");
      return;
    }

    if (!selectedMediaId) {
      setError("Please select an Instagram post for your campaign");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          days,
          budget,
          goal,
          members,
          mediaId: selectedMediaId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create campaign");
      }

      // Navigate to the created campaign
      router.push(`/campaigns/${data.campaign.id}`);
    } catch (err: any) {
      console.error("Error creating campaign:", err);
      setError(err.message || "Failed to create campaign. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-linear-to-br from-black via-neutral-950 to-black text-white px-6 py-16">
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
            <Label htmlFor="duration" className="text-xl font-semibold mb-2 block">
              Campaign duration
            </Label>
            <p className="text-gray-400 mb-4">
              {days} day{days > 1 && "s"}
            </p>

            <Slider
              id="duration"
              min={1}
              max={30}
              value={[days]}
              onValueChange={(value) => setDays(value[0])}
              className="w-full"
            />
          </div>

          {/* Budget */}
          <div className="mb-12">
            <Label htmlFor="budget" className="text-xl font-semibold mb-2 block">
              Campaign budget
            </Label>
            <p className="text-gray-400 mb-4">
              ₹{budget.toLocaleString()}
            </p>

            {!customBudget && (
              <>
                <Slider
                  id="budget"
                  min={1000}
                  max={50000}
                  step={100}
                  value={[budget]}
                  onValueChange={(value) => {
                    // Round to nearest 100
                    const rounded = Math.round(value[0] / 100) * 100;
                    setBudget(rounded);
                  }}
                  className="w-full"
                />

                <Button
                  variant="ghost"
                  onClick={() => setCustomBudget(true)}
                  className="mt-3 text-sm text-red-400 hover:text-red-300 hover:underline p-0 h-auto"
                >
                  Enter custom amount
                </Button>
              </>
            )}

            {customBudget && (
              <Input
                type="number"
                min={50000}
                step={100}
                placeholder="Enter amount above ₹50,000 (multiple of 100)"
                value={budget || ""}
                onChange={(e) => {
                  const value = Number(e.target.value) || 0;
                  // Round to nearest 100
                  const rounded = Math.round(value / 100) * 100;
                  setBudget(rounded);
                }}
                className="mt-3"
              />
            )}
            <p className="text-xs text-gray-500 mt-2">
              Budget must be a multiple of ₹100
            </p>
          </div>

          {/* Members */}
          <div className="mb-12">
            <Label htmlFor="members" className="text-xl font-semibold mb-2 block">
              Number of promoters
            </Label>
            <p className="text-gray-400 mb-4">
              {members} promoter{members > 1 && "s"}
            </p>

            <Slider
              id="members"
              min={1}
              max={10}
              value={[members]}
              onValueChange={(value) => setMembers(value[0])}
              className="w-full"
            />

            <p className="text-sm text-gray-500 mt-2">
              Controls how many promoters can join your campaign.
            </p>
          </div>

          {/* Goal */}
          <div className="mb-12">
            <Label className="text-xl font-semibold mb-4 block">
              What do you want to grow?
            </Label>
            <div className="flex flex-wrap gap-4">
              {["Likes", "Views", "Followers"].map((g) => (
                <Button
                  key={g}
                  onClick={() => setGoal(g)}
                  variant={goal === g ? "default" : "outline"}
                  className={`px-6 py-3 rounded-full transition ${goal === g
                    ? "border-red-500 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold"
                    : "border-white/10 hover:border-red-500/40 text-white"
                    }`}
                >
                  {g}
                </Button>
              ))}
            </div>
          </div>

          {/* Instagram Media Selection */}
          <div className="mb-16">
            <Label className="text-xl font-semibold mb-4 block">
              Select Instagram Post
            </Label>
            <p className="text-gray-400 mb-4 text-sm">
              Choose the Instagram post you want to run a campaign on.
            </p>

            {loadingMedia ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                <p className="ml-3 text-gray-400">Loading your Instagram posts...</p>
              </div>
            ) : mediaError ? (
              <Card className="border-red-500/30 bg-red-500/10">
                <CardContent className="p-4">
                  <p className="text-red-400 text-sm mb-2">{mediaError}</p>
                  <p className="text-gray-400 text-xs">
                    Make sure your Instagram account is connected in your profile.
                  </p>
                </CardContent>
              </Card>
            ) : instagramMedia.length === 0 ? (
              <Card className="border-white/10">
                <CardContent className="p-6 text-center">
                  <p className="text-gray-400">No Instagram posts found.</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Please connect your Instagram account and create some posts.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto">
                {instagramMedia.map((media) => (
                  <Card
                    key={media.id}
                    onClick={() => setSelectedMediaId(media.id)}
                    className={`cursor-pointer transition border-2 p-0 rounded-xl ${selectedMediaId === media.id
                      ? "border-red-500 bg-red-500/10"
                      : "border-white/10 hover:border-red-500/40"
                      }`}
                  >
                    <CardContent className="p-0">
                      {media.media_url && (
                        <div className="relative aspect-square">
                          <img
                            src={media.media_url}
                            alt={media.caption || "Instagram post"}
                            className="w-full h-full object-cover rounded-xl"
                          />
                          {selectedMediaId === media.id && (
                            <div className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                              <svg
                                className="w-4 h-4 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                      )}
                      {media.caption && (
                        <div className="p-2">
                          <p className="text-xs text-gray-400 line-clamp-2">
                            {media.caption}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* CTA */}
          <Button
            className="w-full py-7 text-lg bg-linear-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400"
            disabled={!goal || !budget || !days || !members || !selectedMediaId || isLoading}
            onClick={handleCreateCampaign}
            variant="outline"
          >
            {isLoading ? "Creating Campaign..." : "Create Campaign"}
          </Button>

          {/* Hint */}
          <p className="text-sm text-gray-500 mt-6 text-center">
            Rewards and performance rules can be configured after creation.
          </p>
        </div>
      </main>
    </>
  );
}
