"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";

type Campaign = {
    id: string;
    title: string;
    description: string | null;
    mediaId: string;
    budget: number;
    days: number;
    goal: string;
    status: string;
    maxParticipants: number | null;
    participantsCount: number;
    approvedCount: number;
    pendingCount: number;
    createdAt: string;
    endsAt: string;
};

export default function CampaignsListPage() {
    const router = useRouter();
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<"all" | "DRAFT" | "LIVE" | "ENDED">("all");

    useEffect(() => {
        const fetchCampaigns = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch("/api/campaigns");
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || "Failed to fetch campaigns");
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

        fetchCampaigns();
    }, []);

    const filteredCampaigns = campaigns.filter((campaign) => {
        if (filter === "all") return true;
        return campaign.status === filter;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case "LIVE":
                return "text-green-400";
            case "DRAFT":
                return "text-amber-400";
            case "ENDED":
                return "text-gray-400";
            case "CANCELLED":
                return "text-red-400";
            default:
                return "text-gray-400";
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "LIVE":
                return "bg-green-500/10 border-green-500/30 text-green-400";
            case "DRAFT":
                return "bg-amber-500/10 border-amber-500/30 text-amber-400";
            case "ENDED":
                return "bg-gray-500/10 border-gray-500/30 text-gray-400";
            case "CANCELLED":
                return "bg-red-500/10 border-red-500/30 text-red-400";
            default:
                return "bg-gray-500/10 border-gray-500/30 text-gray-400";
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <main className="min-h-screen bg-linear-to-br from-black via-neutral-950 to-black text-white px-6 py-10">
                    <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[60vh]">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
                            <p className="text-gray-400">Loading campaigns...</p>
                        </div>
                    </div>
                </main>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-linear-to-br from-black via-neutral-950 to-black text-white px-6 py-10">
                <div className="max-w-7xl mx-auto">

                    {/* FILTERS */}
                    <div className="mb-6 flex gap-2">
                        <Button
                            variant={filter === "all" ? "default" : "outline"}
                            onClick={() => setFilter("all")}
                            className={filter === "all" ? "bg-red-500/10 border-red-500 text-red-400" : ""}
                        >
                            All
                        </Button>
                        <Button
                            variant={filter === "DRAFT" ? "default" : "outline"}
                            onClick={() => setFilter("DRAFT")}
                            className={filter === "DRAFT" ? "bg-amber-500/10 border-amber-500 text-amber-400" : ""}
                        >
                            Draft
                        </Button>
                        <Button
                            variant={filter === "LIVE" ? "default" : "outline"}
                            onClick={() => setFilter("LIVE")}
                            className={filter === "LIVE" ? "bg-green-500/10 border-green-500 text-green-400" : ""}
                        >
                            Live
                        </Button>
                        <Button
                            variant={filter === "ENDED" ? "default" : "outline"}
                            onClick={() => setFilter("ENDED")}
                            className={filter === "ENDED" ? "bg-gray-500/10 border-gray-500 text-gray-400" : ""}
                        >
                            Ended
                        </Button>
                    </div>

                    {/* ERROR STATE */}
                    {error && (
                        <Card className="border-red-500/30 bg-red-500/10 mb-6">
                            <CardContent className="p-4">
                                <p className="text-red-400 text-sm">{error}</p>
                            </CardContent>
                        </Card>
                    )}

                    {/* CAMPAIGNS GRID */}
                    {filteredCampaigns.length === 0 ? (
                        <Card className="border-white/10">
                            <CardContent className="p-12 text-center">
                                <p className="text-gray-400 mb-4">
                                    {filter === "all"
                                        ? "No campaigns yet. Create your first campaign!"
                                        : `No ${filter.toLowerCase()} campaigns found.`}
                                </p>
                                {filter === "all" && (
                                    <Button
                                        onClick={() => router.push("/onboarding/campaigner")}
                                        className="bg-linear-to-r from-red-600 to-red-500"
                                    >
                                        Create Campaign
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredCampaigns.map((campaign) => (
                                <Card
                                    key={campaign.id}
                                    onClick={() => router.push(`/campaigns/${campaign.id}`)}
                                    className="cursor-pointer border-white/10 hover:border-red-500/40 transition bg-linear-to-br from-black/40 to-neutral-900/60"
                                >
                                    <CardHeader>
                                        <div className="flex items-start justify-between mb-2">
                                            <CardTitle className="text-lg">{campaign.title}</CardTitle>
                                            <span
                                                className={`px-2 py-1 text-xs rounded border ${getStatusBadge(
                                                    campaign.status
                                                )}`}
                                            >
                                                {campaign.status}
                                            </span>
                                        </div>
                                        {campaign.description && (
                                            <CardDescription className="line-clamp-2">
                                                {campaign.description}
                                            </CardDescription>
                                        )}
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-400">Budget</span>
                                                <span className="text-white font-semibold">
                                                    ₹{campaign.budget.toLocaleString()}
                                                </span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-400">Goal</span>
                                                <span className="text-white">{campaign.goal}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-400">Duration</span>
                                                <span className="text-white">{campaign.days} days</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-400">Participants</span>
                                                <span className="text-white">
                                                    {campaign.participantsCount} / {campaign.maxParticipants || "∞"}
                                                </span>
                                            </div>
                                            {campaign.participantsCount > 0 && (
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-400">Approved</span>
                                                    <span className="text-green-400">{campaign.approvedCount}</span>
                                                </div>
                                            )}
                                            <div className="pt-2 border-t border-white/10">
                                                <p className="text-xs text-gray-500">
                                                    Created {new Date(campaign.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}

