import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
    try {
        const { campaignId, amount } = await req.json();

        if (!campaignId || !amount) {
            return NextResponse.json(
                { error: "campaignId and amount are required" },
                { status: 400 }
            );
        }

        // Ensure campaign exists & is unpaid
        const campaign = await prisma.campaign.findUnique({
            where: { id: campaignId },
        });

        if (!campaign) {
            return NextResponse.json(
                { error: "Campaign not found" },
                { status: 404 }
            );
        }

        if (campaign.paymentStatus === "PAID") {
            return NextResponse.json(
                { error: "Campaign already paid" },
                { status: 400 }
            );
        }

        // ✅ Create Razorpay payment link WITHOUT customer
        const paymentLink = await razorpay.paymentLink.create({
            amount: amount * 100,
            currency: "INR",
            description: "Musubi Campaign Activation",
            reference_id: campaignId,
            callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
            callback_method: "get",
        } as any);


        return NextResponse.json({
            paymentLink: paymentLink.short_url,
        });
    } catch (error: any) {
        console.error("Payment link error:", error);
        return NextResponse.json(
            { error: "Failed to create payment link" },
            { status: 500 }
        );
    }
}
