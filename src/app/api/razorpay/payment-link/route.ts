import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        const userId = (session?.user as any)?.id;

        if (!session || !userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

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

        // ✅ Create Razorpay payment link
        // Note: Razorpay will create an order automatically when the payment link is opened/paid
        // We'll update pgOrderId from webhook events (payment_link.paid or order.paid)
        // This avoids creating duplicate orders

        // Set expiry time to 2 days from now (in Unix timestamp)
        const expiryDays = 2;
        const expireBy = Math.floor(Date.now() / 1000) + (expiryDays * 24 * 60 * 60);

        const paymentLink = await razorpay.paymentLink.create({
            amount: amount * 100,
            currency: "INR",
            description: "Musubi Campaign Activation",
            reference_id: campaignId,
            callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
            callback_method: "get",
            expire_by: expireBy, // Payment link expires in 2 days
        } as any);

        // Create Order record without pgOrderId initially
        // pgOrderId will be updated from webhook events when payment link is opened/paid
        const order = await prisma.order.create({
            data: {
                pgPaymentLinkId: paymentLink.id,
                pgOrderId: null, // Will be updated from webhook events
                campaignId: campaignId,
                userId: userId,
                amount: amount * 100, // Convert to paise
                currency: "INR",
                status: "PENDING",
                description: "Musubi Campaign Activation",
            },
        });

        // Update campaign with payment link URL so users can return to pay
        await prisma.campaign.update({
            where: { id: campaignId },
            data: {
                paymentLinkUrl: paymentLink.short_url,
            },
        });

        return NextResponse.json({
            paymentLink: paymentLink.short_url,
            orderId: order.id,
        });
    } catch (error: any) {
        console.error("Payment link error:", error);
        return NextResponse.json(
            { error: "Failed to create payment link" },
            { status: 500 }
        );
    }
}
