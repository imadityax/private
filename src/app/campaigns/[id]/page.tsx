"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/navbar";

type Participant = {
  id: string;
  userId: string;
  userName: string | null;
  userEmail: string;
  userImage: string | null;
  joinedAt: string;
  eligible: boolean;
  disqualified: boolean;
  status: "Pending" | "Approved" | "Rejected";
};

type Campaign = {
  id: string;
  title: string;
  description: string | null;
  mediaId: string;
  budgetTotal: number;
  baseReward: number;
  bonusPool: number;
  minFollowers: number;
  maxParticipants: number | null;
  status: string;
  startsAt: string;
  endsAt: string;
  createdAt: string;
  updatedAt: string;
  participants: Participant[];
};

type InstagramMedia = {
  id: string;
  media_type?: string;
  media_url: string;
  permalink?: string;
  timestamp?: string;
  caption?: string;
  like_count?: number;
  comments_count?: number;
};

export default function CampaignDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const campaignId = params.id as string;

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [media, setMedia] = useState<InstagramMedia | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampaignData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch campaign data
        const campaignResponse = await fetch(`/api/campaigns/${campaignId}`);
        if (!campaignResponse.ok) {
          const errorData = await campaignResponse.json();
          throw new Error(errorData.error || "Failed to fetch campaign");
        }

        const campaignData = await campaignResponse.json();
        setCampaign(campaignData);

        // Fetch Instagram media details
        if (campaignData.mediaId) {
          const mediaResponse = await fetch(`/api/get-post-details?media_id=${campaignData.mediaId}`);
          if (mediaResponse.ok) {
            const mediaData = await mediaResponse.json();
            setMedia(mediaData);
          }
        }
      } catch (err: any) {
        console.error("Error fetching campaign data:", err);
        setError(err.message || "Failed to load campaign");
      } finally {
        setLoading(false);
      }
    };

    if (campaignId) {
      fetchCampaignData();
    }
  }, [campaignId]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-linear-to-br from-black via-neutral-950 to-black text-white px-6 py-10">
          <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading campaign...</p>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (error || !campaign) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-linear-to-br from-black via-neutral-950 to-black text-white px-6 py-10">
          <div className="max-w-7xl mx-auto">
            <Card className="border-red-500/30 bg-red-500/10">
              <CardContent className="p-6">
                <p className="text-red-400 mb-4">{error || "Campaign not found"}</p>
                <Button
                  onClick={() => router.push("/dashboard")}
                  variant="outline"
                  className="text-white"
                >
                  Go to Dashboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </>
    );
  }

  // Calculate days from dates
  const startsAt = new Date(campaign.startsAt);
  const endsAt = new Date(campaign.endsAt);
  const days = Math.ceil((endsAt.getTime() - startsAt.getTime()) / (1000 * 60 * 60 * 24));

  // Extract goal from title (format: "Goal Campaign")
  const goal = campaign.title.replace(" Campaign", "");

  // Convert budget from paise to rupees
  const budget = campaign.budgetTotal / 100;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-linear-to-br from-black via-neutral-950 to-black text-white px-6 py-10">
        <div className="max-w-7xl mx-auto">
          {/* MAIN GRID */}
          <div className="grid grid-cols-12 gap-6">
            {/* CENTER: Campaign Details */}
            <Card className="col-span-8 border-white/10">
              <CardHeader>
                <CardTitle className="text-xl">
                  {campaign.title}
                </CardTitle>
                {campaign.description && (
                  <CardDescription>{campaign.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent>
                {/* Instagram Media Display */}
                {media && (
                  <div className="mb-8">
                    <Label className="text-lg font-semibold mb-4 block text-white">
                      Campaign Media
                    </Label>
                    <Card className="border-white/10 bg-black/40 p-0">
                      <CardContent className="p-0">
                        {media.media_url && (
                          <div className="relative">
                            <img
                              src={media.media_url}
                              alt={media.caption || "Instagram post"}
                              className="w-full h-auto rounded-xl"
                            />
                          </div>
                        )}
                        {media.caption && (
                          <div className="p-4">
                            <p className="text-sm text-gray-300 mb-2">{media.caption}</p>
                            <div className="flex gap-4 text-xs text-gray-400">
                              {media.like_count !== undefined && (
                                <span>❤️ {media.like_count.toLocaleString()} likes</span>
                              )}
                              {media.comments_count !== undefined && (
                                <span>💬 {media.comments_count.toLocaleString()} comments</span>
                              )}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <Stat label="Duration" value={`${days} day${days !== 1 ? "s" : ""}`} />
                  <Stat label="Budget" value={`₹${budget.toLocaleString()}`} />
                  <Stat label="Goal" value={goal} />
                  <Stat label="Promoters" value={`${campaign.participants.length} / ${campaign.maxParticipants || "∞"}`} />
                  <Stat label="Status" value={campaign.status} />
                  <Stat label="Base Reward" value={`₹${(campaign.baseReward / 100).toLocaleString()}`} />
                </div>

                <div className="flex gap-4">
                  <Button
                    className="bg-linear-to-r from-red-600 to-red-500"
                    onClick={() => {
                      if (campaign.status === "DRAFT") {
                        router.push(`/campaigns/${campaign.id}/fund`);
                      }

                      if (campaign.status === "LIVE") {
                        // later: pause API
                        console.log("Pause campaign");
                      }

                      if (campaign.status === "ENDED") {
                        // later: resume API
                        console.log("Resume campaign");
                      }
                    }}
                  >
                    {campaign.status === "DRAFT"
                      ? "Fund & Launch Campaign"
                      : campaign.status === "LIVE"
                        ? "Pause Campaign"
                        : "Resume Campaign"}
                  </Button>

                  {media?.permalink && (
                    <Button
                      variant="outline"
                      onClick={() => window.open(media.permalink, "_blank")}
                    >
                      View on Instagram
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* RIGHT: Participants */}
            <aside className="col-span-4 border border-white/10 rounded-xl p-4 max-h-[70vh] overflow-y-auto">
              <h2 className="text-lg font-semibold mb-4 text-white">Participants</h2>

              {campaign.participants.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  No participants yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {campaign.participants.map((participant) => (
                    <Card
                      key={participant.id}
                      className="border-white/10"
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center gap-3 mb-2">
                          {participant.userImage ? (
                            <img
                              src={participant.userImage}
                              alt={participant.userName || participant.userEmail}
                              className="w-8 h-8 rounded-full"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-xs text-red-400">
                              {(participant.userName || participant.userEmail)[0].toUpperCase()}
                            </div>
                          )}
                          <div className="flex-1">
                            <p className="font-medium text-white text-sm">
                              {participant.userName || participant.userEmail}
                            </p>
                            <CardDescription className="text-xs">
                              {participant.userEmail}
                            </CardDescription>
                          </div>
                        </div>
                        <p
                          className={`text-sm font-medium ${participant.status === "Approved"
                            ? "text-green-400"
                            : participant.status === "Rejected"
                              ? "text-red-400"
                              : "text-amber-400"
                            }`}
                        >
                          {participant.status}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-gray-400 mb-1">{label}</p>
      <p className="text-lg font-semibold text-white">{value}</p>
    </div>
  );
}
