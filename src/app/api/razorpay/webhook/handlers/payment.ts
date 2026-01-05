import prisma from "@/lib/prisma";
import { findCampaignByOrderId, findUserIdByCampaignId } from "../utils";

export async function handlePaymentAuthorized(event: any) {
    const payment = event.payload.payment.entity;
    const orderId = payment.order_id;
    const campaignId = payment.notes?.campaign_id ||
        (orderId ? await findCampaignByOrderId(orderId) : null);

    if (campaignId) {
        const order = orderId ? await prisma.order.findFirst({
            where: { pgOrderId: orderId },
        }) : null;

        await prisma.payment.upsert({
            where: { pgPaymentId: payment.id },
            create: {
                pgPaymentId: payment.id,
                orderId: order?.id,
                campaignId: campaignId,
                userId: order?.userId || await findUserIdByCampaignId(campaignId),
                amount: payment.amount,
                currency: payment.currency || "INR",
                status: "AUTHORIZED",
                method: payment.method,
                eventType: "payment.authorized",
                metadata: payment as any,
            },
            update: {
                status: "AUTHORIZED",
                method: payment.method,
                eventType: "payment.authorized",
                metadata: payment as any,
                updatedAt: new Date(),
            },
        });
    }
}

export async function handlePaymentCaptured(event: any) {
    const payment = event.payload.payment.entity;
    const orderId = payment.order_id;
    const campaignId = payment.notes?.campaign_id ||
        (orderId ? await findCampaignByOrderId(orderId) : null);

    if (campaignId) {
        const order = orderId ? await prisma.order.findFirst({
            where: { pgOrderId: orderId },
        }) : null;

        await prisma.payment.upsert({
            where: { pgPaymentId: payment.id },
            create: {
                pgPaymentId: payment.id,
                orderId: order?.id,
                campaignId: campaignId,
                userId: order?.userId || await findUserIdByCampaignId(campaignId),
                amount: payment.amount,
                currency: payment.currency || "INR",
                status: "CAPTURED",
                method: payment.method,
                eventType: "payment.captured",
                metadata: payment as any,
            },
            update: {
                status: "CAPTURED",
                method: payment.method,
                eventType: "payment.captured",
                metadata: payment as any,
                updatedAt: new Date(),
            },
        });

        // Update campaign to LIVE if payment captured
        await prisma.campaign.update({
            where: { id: campaignId },
            data: {
                paymentStatus: "PAID",
                status: "LIVE",
            },
        });

        if (order) {
            await prisma.order.update({
                where: { id: order.id },
                data: { status: "PAID" },
            });
        }
    }
}

export async function handlePaymentFailed(event: any) {
    const payment = event.payload.payment.entity;
    const orderId = payment.order_id;
    const campaignId = payment.notes?.campaign_id ||
        (orderId ? await findCampaignByOrderId(orderId) : null);

    if (campaignId) {
        const order = orderId ? await prisma.order.findFirst({
            where: { pgOrderId: orderId },
        }) : null;

        await prisma.payment.upsert({
            where: { pgPaymentId: payment.id },
            create: {
                pgPaymentId: payment.id,
                orderId: order?.id,
                campaignId: campaignId,
                userId: order?.userId || await findUserIdByCampaignId(campaignId),
                amount: payment.amount || 0,
                currency: payment.currency || "INR",
                status: "FAILED",
                method: payment.method,
                eventType: "payment.failed",
                metadata: payment as any,
            },
            update: {
                status: "FAILED",
                eventType: "payment.failed",
                metadata: payment as any,
                updatedAt: new Date(),
            },
        });

        if (order) {
            await prisma.order.update({
                where: { id: order.id },
                data: { status: "FAILED" },
            });
        }
    }
}

