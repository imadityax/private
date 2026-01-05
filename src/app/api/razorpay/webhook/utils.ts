import prisma from "@/lib/prisma";

export async function findCampaignByOrderId(orderId: string): Promise<string | null> {
    const order = await prisma.order.findFirst({
        where: { pgOrderId: orderId },
    });
    return order?.campaignId || null;
}

export async function findUserIdByCampaignId(campaignId: string): Promise<string> {
    const campaign = await prisma.campaign.findUnique({
        where: { id: campaignId },
        select: { creatorId: true },
    });
    return campaign?.creatorId || "";
}

