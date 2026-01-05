import prisma from "@/lib/prisma";

export async function handleDisputeCreated(event: any) {
    const dispute = event.payload.dispute.entity;
    const paymentId = dispute.payment_id;

    await prisma.payment.updateMany({
        where: { pgPaymentId: paymentId },
        data: {
            status: "DISPUTED",
            eventType: event.event,
            metadata: dispute as any,
            updatedAt: new Date(),
        },
    });
}

export async function handleDisputeUnderReview(event: any) {
    return handleDisputeCreated(event);
}

export async function handleDisputeActionRequired(event: any) {
    return handleDisputeCreated(event);
}

export async function handleDisputeWon(event: any) {
    const dispute = event.payload.dispute.entity;
    const paymentId = dispute.payment_id;

    await prisma.payment.updateMany({
        where: { pgPaymentId: paymentId },
        data: {
            status: "CAPTURED", // Revert to captured after winning dispute
            eventType: event.event,
            metadata: dispute as any,
            updatedAt: new Date(),
        },
    });
}

export async function handleDisputeLost(event: any) {
    const dispute = event.payload.dispute.entity;
    const paymentId = dispute.payment_id;

    await prisma.payment.updateMany({
        where: { pgPaymentId: paymentId },
        data: {
            status: "DISPUTED",
            eventType: event.event,
            metadata: dispute as any,
            updatedAt: new Date(),
        },
    });
}

export async function handleDisputeClosed(event: any) {
    return handleDisputeLost(event);
}

