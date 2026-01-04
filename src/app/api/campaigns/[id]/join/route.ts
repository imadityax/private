import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> | { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        const userId = (session?.user as any)?.id;

        if (!session || !userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Resolve params if it's a Promise (Next.js 15)
        const campaignId = 'then' in params ? (await params).id : params.id;

        // Check if user has Instagram account (required for joining)
        const instagramAccount = await prisma.instagramAccount.findUnique({
            where: { userId },
        });

        if (!instagramAccount) {
            return NextResponse.json(
                {
                    error: 'Instagram account required',
                    message:
                        'Please connect your Instagram account before joining campaigns',
                },
                { status: 400 }
            );
        }

        // Check if campaign exists and is available
        const campaign = await prisma.campaign.findUnique({
            where: { id: campaignId },
            include: {
                participants: {
                    select: {
                        id: true,
                        userId: true,
                    },
                },
            },
        });

        if (!campaign) {
            return NextResponse.json(
                { error: 'Campaign not found' },
                { status: 404 }
            );
        }

        // Check if campaign is LIVE
        if (campaign.status !== 'LIVE') {
            return NextResponse.json(
                { error: 'Campaign is not available for joining' },
                { status: 400 }
            );
        }

        // Check if campaign has ended
        if (new Date(campaign.endsAt) < new Date()) {
            return NextResponse.json(
                { error: 'Campaign has ended' },
                { status: 400 }
            );
        }

        // Check if user already joined
        const alreadyJoined = campaign.participants.some(
            (p) => p.userId === userId
        );
        if (alreadyJoined) {
            return NextResponse.json(
                { error: 'You have already joined this campaign' },
                { status: 400 }
            );
        }

        // Check if campaign is full
        if (
            campaign.maxParticipants !== null &&
            campaign.participants.length >= campaign.maxParticipants
        ) {
            return NextResponse.json(
                { error: 'Campaign is full' },
                { status: 400 }
            );
        }

        // Check if user meets minimum followers requirement
        // Note: This assumes instagramAccount has followers_count, you may need to fetch it from Instagram API
        // For now, we'll skip this check or add it later

        // Create participation
        const participation = await prisma.campaignParticipant.create({
            data: {
                campaignId: campaignId,
                userId: userId,
                eligible: false, // Will be set to true after verification
                disqualified: false,
            },
        });

        return NextResponse.json(
            {
                success: true,
                participation: {
                    id: participation.id,
                    campaignId: participation.campaignId,
                    joinedAt: participation.joinedAt,
                },
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Error joining campaign:', error);
        return NextResponse.json(
            { error: 'Failed to join campaign', details: error.message },
            { status: 500 }
        );
    }
}

