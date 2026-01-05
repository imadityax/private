import Razorpay from "razorpay";
import axios from "axios";
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

        // ✅ Create Razorpay payment link WITHOUT customer
        const paymentLink = await razorpay.paymentLink.create({
            amount: amount * 100,
            currency: "INR",
            description: "Musubi Campaign Activation",
            reference_id: campaignId,
            callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
            callback_method: "get",
        } as any);

        // Fetch payment link details via REST API to get order_id
        const authString = Buffer.from(
            `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
        ).toString("base64");

        const paymentLinkResponse = await axios.get(
            `https://api.razorpay.com/v1/payment_links/${paymentLink.id}`,
            {
                headers: {
                    Authorization: `Basic ${authString}`,
                },
            }
        );


        const pgOrderId = paymentLinkResponse.data.order_id || null;
        // TODO: PB pg order id in payment link response is not coming

        // Create Order record
        const order = await prisma.order.create({
            data: {
                pgPaymentLinkId: paymentLink.id,
                pgOrderId: pgOrderId, // Razorpay order ID (order_xyz format) from REST API response
                campaignId: campaignId,
                userId: userId,
                amount: amount * 100, // Convert to paise
                currency: "INR",
                status: "PENDING",
                description: "Musubi Campaign Activation",
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
