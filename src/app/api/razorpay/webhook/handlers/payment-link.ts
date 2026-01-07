import prisma from "@/lib/prisma";
import { findUserIdByCampaignId } from "../utils";

export async function handlePaymentLinkPaid(event: any) {
    const paymentLink = event.payload.payment_link.entity;
    const payment = event.payload.payment?.entity;
    const campaignId = paymentLink.reference_id;

    if (campaignId) {
        // Find order by payment link ID
        const dbOrder = await prisma.order.findFirst({
            where: { pgPaymentLinkId: paymentLink.id },
        });

        if (dbOrder) {
            // Update pgOrderId if missing (backup mechanism)
            const updateData: any = { status: "PAID" };
            if (!dbOrder.pgOrderId && paymentLink.order_id) {
                updateData.pgOrderId = paymentLink.order_id;
            }

            await prisma.order.update({
                where: { id: dbOrder.id },
                data: updateData,
            });
        }

        // Create payment record
        if (payment) {
            await prisma.payment.upsert({
                where: { pgPaymentId: payment.id },
                create: {
                    pgPaymentId: payment.id,
                    orderId: dbOrder?.id,
                    campaignId: campaignId,
                    userId: dbOrder?.userId || await findUserIdByCampaignId(campaignId),
                    amount: payment.amount,
                    currency: payment.currency || "INR",
                    status: "CAPTURED",
                    method: payment.method,
                    eventType: "payment_link.paid",
                    metadata: payment as any,
                },
                update: {
                    status: "CAPTURED",
                    eventType: "payment_link.paid",
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
}

export async function handlePaymentLinkPartiallyPaid(event: any) {
    const paymentLink = event.payload.payment_link.entity;
    const payment = event.payload.payment?.entity;
    const campaignId = paymentLink.reference_id;

    if (campaignId && payment) {
        const dbOrder = await prisma.order.findFirst({
            where: { pgPaymentLinkId: paymentLink.id },
        });

        await prisma.payment.upsert({
            where: { pgPaymentId: payment.id },
            create: {
                pgPaymentId: payment.id,
                orderId: dbOrder?.id,
                campaignId: campaignId,
                userId: dbOrder?.userId || await findUserIdByCampaignId(campaignId),
                amount: payment.amount,
                currency: payment.currency || "INR",
                status: "PARTIALLY_CAPTURED",
                method: payment.method,
                eventType: "payment_link.partially_paid",
                metadata: payment as any,
            },
            update: {
                status: "PARTIALLY_CAPTURED",
                eventType: "payment_link.partially_paid",
                metadata: payment as any,
                updatedAt: new Date(),
            },
        });
    }
}

export async function handlePaymentLinkExpired(event: any) {
    const paymentLink = event.payload.payment_link.entity;
    const campaignId = paymentLink.reference_id;

    if (campaignId) {
        await prisma.order.updateMany({
            where: { pgPaymentLinkId: paymentLink.id },
            data: { status: "EXPIRED" },
        });
    }
}

export async function handlePaymentLinkCancelled(event: any) {
    const paymentLink = event.payload.payment_link.entity;
    const campaignId = paymentLink.reference_id;

    if (campaignId) {
        await prisma.order.updateMany({
            where: { pgPaymentLinkId: paymentLink.id },
            data: { status: "CANCELLED" },
        });
    }
}

