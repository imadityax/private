import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("x-razorpay-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(body)
    .digest("hex");

  if (signature !== expectedSignature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(body);

  // Handle successful payment
  if (event.event === "payment_link.paid") {
    const campaignId = event.payload.payment_link.entity.reference_id;

    await prisma.campaign.update({
      where: { id: campaignId },
      data: {
        paymentStatus: "PAID",
        status: "LIVE",
      },
    });
  }

  return NextResponse.json({ success: true });
}
