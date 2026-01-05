import prisma from "@/lib/prisma";
import { findUserIdByCampaignId } from "../utils";

export async function handleInvoicePaid(event: any) {
    const invoice = event.payload.invoice.entity;
    const payment = event.payload.payment?.entity;
    const campaignId = invoice.notes?.campaign_id;

    if (campaignId && payment) {
        await prisma.payment.upsert({
            where: { pgPaymentId: payment.id },
            create: {
                pgPaymentId: payment.id,
                campaignId: campaignId,
                userId: await findUserIdByCampaignId(campaignId),
                amount: payment.amount,
                currency: payment.currency || "INR",
                status: "CAPTURED",
                method: payment.method,
                eventType: "invoice.paid",
                metadata: { invoice, payment } as any,
            },
            update: {
                status: "CAPTURED",
                eventType: "invoice.paid",
                metadata: { invoice, payment } as any,
                updatedAt: new Date(),
            },
        });

        await prisma.campaign.update({
            where: { id: campaignId },
            data: {
                paymentStatus: "PAID",
                status: "LIVE",
            },
        });
    }
}

export async function handleInvoicePartiallyPaid(event: any) {
    const invoice = event.payload.invoice.entity;
    const payment = event.payload.payment?.entity;
    const campaignId = invoice.notes?.campaign_id;

    if (campaignId && payment) {
        await prisma.payment.upsert({
            where: { pgPaymentId: payment.id },
            create: {
                pgPaymentId: payment.id,
                campaignId: campaignId,
                userId: await findUserIdByCampaignId(campaignId),
                amount: payment.amount,
                currency: payment.currency || "INR",
                status: "PARTIALLY_CAPTURED",
                method: payment.method,
                eventType: "invoice.partially_paid",
                metadata: { invoice, payment } as any,
            },
            update: {
                status: "PARTIALLY_CAPTURED",
                eventType: "invoice.partially_paid",
                metadata: { invoice, payment } as any,
                updatedAt: new Date(),
            },
        });
    }
}

export async function handleInvoiceExpired(event: any) {
    const invoice = event.payload.invoice.entity;
    const campaignId = invoice.notes?.campaign_id;

    if (campaignId) {
        await prisma.order.updateMany({
            where: { campaignId: campaignId, status: "PENDING" },
            data: { status: "EXPIRED" },
        });
    }
}

