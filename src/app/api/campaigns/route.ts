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

        // Fetch all campaigns for the user
        const campaigns = await prisma.campaign.findMany({
            where: {
                creatorId: userId,
            },
            include: {
                participants: {
                    select: {
                        id: true,
                        eligible: true,
                        disqualified: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        // Format the response
        const formattedCampaigns = campaigns.map((campaign) => {
            const approvedCount = campaign.participants.filter((p) => p.eligible).length;
            const pendingCount = campaign.participants.filter(
                (p) => !p.eligible && !p.disqualified
            ).length;

            // Calculate days from dates
            const startsAt = new Date(campaign.startsAt);
            const endsAt = new Date(campaign.endsAt);
            const days = Math.ceil(
                (endsAt.getTime() - startsAt.getTime()) / (1000 * 60 * 60 * 24)
            );

            // Extract goal from title
            const goal = campaign.title.replace(' Campaign', '');

            return {
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
                days,
                goal,
                budget: campaign.budgetTotal / 100, // Convert from paise to rupees
                participantsCount: campaign.participants.length,
                approvedCount,
                pendingCount,
            };
        });

        return NextResponse.json({ campaigns: formattedCampaigns }, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching campaigns:', error);
        return NextResponse.json(
            { error: 'Failed to fetch campaigns', details: error.message },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        const userId = (session?.user as any)?.id;

        if (!session || !userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { days, budget, goal, members, mediaId } = body;

        // Validation
        if (!days || !budget || !goal || !members || !mediaId) {
            return NextResponse.json(
                { error: 'Missing required fields: days, budget, goal, members, mediaId' },
                { status: 400 }
            );
        }

        if (days < 1 || days > 30) {
            return NextResponse.json(
                { error: 'Days must be between 1 and 30' },
                { status: 400 }
            );
        }

        if (budget < 1000) {
            return NextResponse.json(
                { error: 'Budget must be at least ₹1,000' },
                { status: 400 }
            );
        }

        if (members < 1 || members > 50) {
            return NextResponse.json(
                { error: 'Members must be between 1 and 50' },
                { status: 400 }
            );
        }

        // Calculate dates
        const startsAt = new Date();
        const endsAt = new Date();
        endsAt.setDate(endsAt.getDate() + days);

        // Convert budget to paise (multiply by 100)
        const budgetTotal = Math.round(budget * 100);

        // Calculate rewards (you can adjust these formulas)
        // Base reward: 60% of budget divided by members
        const baseReward = Math.round((budgetTotal * 0.6) / members);
        // Bonus pool: 30% of budget
        const bonusPool = Math.round(budgetTotal * 0.3);
        // Remaining 10% can be for platform fees or other purposes

        // Generate title from goal
        const title = `${goal} Campaign`;

        // Create campaign
        const campaign = await prisma.campaign.create({
            data: {
                creatorId: userId,
                mediaId: mediaId, // Instagram media ID selected by user
                title: title,
                description: `Campaign to grow ${goal.toLowerCase()}`,
                budgetTotal: budgetTotal,
                baseReward: baseReward,
                bonusPool: bonusPool,
                minFollowers: 1000, // Default minimum followers
                maxParticipants: members,
                status: 'DRAFT', // Start as draft, can be activated later
                startsAt: startsAt,
                endsAt: endsAt,
                paymentStatus: "UNPAID"
            },
        });

        return NextResponse.json(
            {
                success: true,
                campaign: {
                    id: campaign.id,
                    title: campaign.title,
                    status: campaign.status,
                }
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Error creating campaign:', error);
        return NextResponse.json(
            { error: 'Failed to create campaign', details: error.message },
            { status: 500 }
        );
    }
}

