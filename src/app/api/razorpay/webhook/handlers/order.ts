import prisma from "@/lib/prisma";
import { findUserIdByCampaignId } from "../utils";

export async function handleOrderPaid(event: any) {
    const order = event.payload.order.entity;
    const payment = event.payload.payment?.entity;
    const campaignId = order.notes?.campaign_id || order.receipt;

    if (!campaignId) {
        console.error(`Order Paid: Missing campaignId for order ${order.id}`);
        return;
    }

    // Find existing order by pgOrderId first
    let dbOrder = await prisma.order.findFirst({
        where: { pgOrderId: order.id },
    });

    // If not found by pgOrderId, try to find by campaignId (backup mechanism)
    if (!dbOrder) {
        dbOrder = await prisma.order.findFirst({
            where: {
                campaignId: campaignId,
                status: "PENDING", // Only match pending orders
            },
        });

        // If found, update it with the pgOrderId
        if (dbOrder) {
            await prisma.order.update({
                where: { id: dbOrder.id },
                data: { pgOrderId: order.id },
            });
        }
    }

    if (!dbOrder) {
        console.error(`Order Paid: Order not found in DB for pgOrderId: ${order.id}, campaignId: ${campaignId}, eventType: ${event.event}`);
        return;
    }

    // Update order status
    await prisma.order.update({
        where: { id: dbOrder.id },
        data: {
            status: "PAID",
            updatedAt: new Date(),
        },
    });

    // Create payment if provided
    if (payment) {
        await prisma.payment.upsert({
            where: { pgPaymentId: payment.id },
            create: {
                pgPaymentId: payment.id,
                orderId: dbOrder.id,
                campaignId: campaignId,
                userId: dbOrder.userId,
                amount: payment.amount,
                currency: payment.currency || "INR",
                status: "CAPTURED",
                method: payment.method,
                eventType: "order.paid",
                metadata: payment as any,
            },
            update: {
                status: "CAPTURED",
                eventType: "order.paid",
                metadata: payment as any,
                updatedAt: new Date(),
            },
        });
    }

    // Update campaign
    await prisma.campaign.update({
        where: { id: campaignId },
        data: {
            paymentStatus: "PAID",
            status: "LIVE",
        },
    });
}

export async function handleOrderNotificationDelivered(event: any) {
    // Log notification events (no database changes needed)
    console.log(`Order notification ${event.event}:`, event.payload);
}

export async function handleOrderNotificationFailed(event: any) {
    // Log notification events (no database changes needed)
    console.log(`Order notification ${event.event}:`, event.payload);
}

