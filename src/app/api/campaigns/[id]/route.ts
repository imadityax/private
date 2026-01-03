import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> | { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        const userId = (session?.user as any)?.id;

        if (!session || !userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const campaignId = 'then' in params ? (await params).id : params.id;

        // Fetch campaign with participants
        const campaign = await prisma.campaign.findUnique({
            where: {
                id: campaignId,
            },
            include: {
                participants: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                image: true,
                            },
                        },
                    },
                },
                creator: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });

        if (!campaign) {
            return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
        }

        // Check if user is the creator
        if (campaign.creatorId !== userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        // Format the response
        const response = {
            id: campaign.id,
            title: campaign.title,
            description: campaign.description,
            mediaId: campaign.mediaId,
            budgetTotal: campaign.budgetTotal,
            baseReward: campaign.baseReward,
            bonusPool: campaign.bonusPool,
            minFollowers: campaign.minFollowers,
            maxParticipants: campaign.maxParticipants,
            status: campaign.status,
            startsAt: campaign.startsAt,
            endsAt: campaign.endsAt,
            createdAt: campaign.createdAt,
            updatedAt: campaign.updatedAt,
            participants: campaign.participants.map((p) => ({
                id: p.id,
                userId: p.userId,
                userName: p.user.name,
                userEmail: p.user.email,
                userImage: p.user.image,
                joinedAt: p.joinedAt,
                eligible: p.eligible,
                disqualified: p.disqualified,
                status: p.eligible ? 'Approved' : p.disqualified ? 'Rejected' : 'Pending',
            })),
        };

        return NextResponse.json(response, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching campaign:', error);
        return NextResponse.json(
            { error: 'Failed to fetch campaign', details: error.message },
            { status: 500 }
        );
    }
}

