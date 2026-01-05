import prisma from "@/lib/prisma";

export async function handleRefundCreated(event: any) {
    const refund = event.payload.refund.entity;
    const paymentId = refund.payment_id;

    await prisma.payment.updateMany({
        where: { pgPaymentId: paymentId },
        data: {
            status: "REFUNDED",
            eventType: "refund.created",
            metadata: refund as any,
            updatedAt: new Date(),
        },
    });
}

export async function handleRefundProcessed(event: any) {
    const refund = event.payload.refund.entity;
    const paymentId = refund.payment_id;

    await prisma.payment.updateMany({
        where: { pgPaymentId: paymentId },
        data: {
            status: "REFUNDED",
            eventType: "refund.processed",
            metadata: refund as any,
            updatedAt: new Date(),
        },
    });

    // Update campaign if refunded
    const payment = await prisma.payment.findFirst({
        where: { pgPaymentId: paymentId },
    });

    if (payment) {
        await prisma.campaign.update({
            where: { id: payment.campaignId },
            data: {
                paymentStatus: "REFUNDED",
            },
        });
    }
}

export async function handleRefundFailed(event: any) {
    const refund = event.payload.refund.entity;
    const paymentId = refund.payment_id;

    // Revert payment status if refund failed
    await prisma.payment.updateMany({
        where: { pgPaymentId: paymentId },
        data: {
            status: "CAPTURED", // Revert to captured
            eventType: "refund.failed",
            metadata: refund as any,
            updatedAt: new Date(),
        },
    });
}

export async function handleRefundSpeedChanged(event: any) {
    const refund = event.payload.refund.entity;
    const paymentId = refund.payment_id;

    await prisma.payment.updateMany({
        where: { pgPaymentId: paymentId },
        data: {
            eventType: "refund.speed_changed",
            metadata: refund as any,
            updatedAt: new Date(),
        },
    });
}

