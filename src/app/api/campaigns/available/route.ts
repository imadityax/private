import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        const userId = (session?.user as any)?.id;

        if (!session || !userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get user's existing participations to exclude already joined campaigns
        const userParticipations = await prisma.campaignParticipant.findMany({
            where: { userId },
            select: { campaignId: true },
        });
        const joinedCampaignIds = userParticipations.map((p) => p.campaignId);

        // Fetch available campaigns (LIVE status, not created by user, not already joined)
        const campaigns = await prisma.campaign.findMany({
            where: {
                status: 'LIVE',
                creatorId: { not: userId }, // Not created by the current user
                id: { notIn: joinedCampaignIds }, // Not already joined
                startsAt: { lte: new Date() }, // Campaign has started
                endsAt: { gte: new Date() }, // Campaign hasn't ended
            },
            include: {
                participants: {
                    select: {
                        id: true,
                    },
                },
                creator: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        // Format campaigns with participant count and availability
        const formattedCampaigns = campaigns
            .map((campaign) => {
                const participantCount = campaign.participants.length;
                const isFull =
                    campaign.maxParticipants !== null &&
                    participantCount >= campaign.maxParticipants;

                // Calculate days remaining
                const endsAt = new Date(campaign.endsAt);
                const now = new Date();
                const daysRemaining = Math.ceil(
                    (endsAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
                );

                // Extract goal from title (assuming format is "Goal Campaign")
                const goal = campaign.title.replace(' Campaign', '');

                return {
                    id: campaign.id,
                    title: campaign.title,
                    description: campaign.description,
                    goal: goal,
                    budget: campaign.budgetTotal / 100, // Convert from paise to rupees
                    baseReward: campaign.baseReward / 100,
                    bonusPool: campaign.bonusPool / 100,
                    minFollowers: campaign.minFollowers,
                    maxParticipants: campaign.maxParticipants,
                    participantCount: participantCount,
                    isFull: isFull,
                    daysRemaining: daysRemaining,
                    startsAt: campaign.startsAt,
                    endsAt: campaign.endsAt,
                    createdAt: campaign.createdAt,
                    creator: campaign.creator,
                    mediaId: campaign.mediaId,
                };
            })
            .filter((campaign) => !campaign.isFull); // Only return campaigns that aren't full

        return NextResponse.json(
            { campaigns: formattedCampaigns },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error fetching available campaigns:', error);
        return NextResponse.json(
            { error: 'Failed to fetch available campaigns', details: error.message },
            { status: 500 }
        );
    }
}

