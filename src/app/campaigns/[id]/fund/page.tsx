"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

type Campaign = {
    id: string;
    title: string;
    budgetTotal: number;
    status: string;
    paymentStatus: string;
    startsAt: string;
    endsAt: string;
};

export default function FundCampaignPage() {
    const { id } = useParams();
    const [campaign, setCampaign] = useState<Campaign | null>(null);
    const [loading, setLoading] = useState(true);
    const [paying, setPaying] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCampaign = async () => {
            try {
                const res = await fetch(`/api/campaigns/${id}`, {
                    credentials: "include",
                });
                const data = await res.json();

                if (!res.ok) throw new Error(data.error);
                setCampaign(data); // ✅ FIX HERE
            } catch (err: any) {
                setError(err.message || "Failed to load campaign");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchCampaign();
    }, [id]);


    const handlePay = async () => {
        if (!campaign) return;

        setPaying(true);
        setError(null);

        try {
            const res = await fetch("/api/razorpay/payment-link", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    campaignId: campaign.id,
                    amount: campaign.budgetTotal / 100, // convert paise → INR
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error);

            // Redirect to Razorpay
            window.location.href = data.paymentLink;
        } catch (err: any) {
            setError(err.message || "Payment failed");
            setPaying(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                Loading campaign…
            </div>
        );
    }

    if (!campaign) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-400">
                Campaign not found
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-black via-neutral-950 to-black text-white px-6 py-16">
            <div className="max-w-xl mx-auto border border-white/10 rounded-2xl p-8 bg-gradient-to-br from-black to-neutral-900">
                <h1 className="text-3xl font-bold mb-2">
                    Fund Campaign
                </h1>

                <p className="text-gray-400 mb-8">
                    Activate your campaign by funding it.
                </p>

                <div className="space-y-4 mb-10">
                    <Info label="Campaign" value={campaign.title} />
                    <Info
                        label="Duration"
                        value={`${Math.ceil(
                            (new Date(campaign.endsAt).getTime() -
                                new Date(campaign.startsAt).getTime()) /
                            (1000 * 60 * 60 * 24)
                        )} days`}
                    />
                    <Info
                        label="Budget"
                        value={`₹${(campaign.budgetTotal / 100).toLocaleString()}`}
                    />
                    <Info
                        label="Status"
                        value={campaign.paymentStatus}
                        highlight
                    />
                </div>

                {error && (
                    <p className="text-sm text-red-400 mb-4">{error}</p>
                )}

                <Button
                    className="w-full py-6 text-lg bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400"
                    onClick={handlePay}
                    disabled={paying}
                >
                    {paying ? "Redirecting to payment…" : "Pay & Activate Campaign"}
                </Button>

                <p className="text-xs text-gray-500 mt-4 text-center">
                    Payments are securely handled by Razorpay.
                </p>
            </div>
        </main>
    );
}

function Info({
    label,
    value,
    highlight,
}: {
    label: string;
    value: string;
    highlight?: boolean;
}) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-gray-400">{label}</span>
            <span
                className={
                    highlight
                        ? "text-amber-400 font-semibold"
                        : "text-white"
                }
            >
                {value}
            </span>
        </div>
    );
}
