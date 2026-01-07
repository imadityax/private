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

        // Fetch user with wallet
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                wallet: true,
                campaigns: {
                    where: {
                        status: {
                            not: 'CANCELLED', // Exclude cancelled campaigns from profile
                        },
                    },
                    orderBy: { createdAt: 'desc' },
                    select: {
                        id: true,
                        title: true,
                        status: true,
                        budgetTotal: true,
                        paymentStatus: true,
                        paymentLinkUrl: true,
                        createdAt: true,
                    },
                },
                participations: {
                    select: {
                        id: true,
                        campaignId: true,
                        eligible: true,
                        disqualified: true,
                        baseRewardPaid: true,
                        bonusRewardPaid: true,
                        joinedAt: true,
                        campaign: {
                            select: {
                                id: true,
                                title: true,
                                status: true,
                                budgetTotal: true,
                                baseReward: true,
                                bonusPool: true,
                            },
                        },
                    },
                    orderBy: { joinedAt: 'desc' },
                },
                transactions: {
                    orderBy: { createdAt: 'desc' },
                    take: 10, // Get last 10 transactions
                    select: {
                        id: true,
                        type: true,
                        amount: true,
                        reference: true,
                        createdAt: true,
                    },
                },
            },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Calculate wallet balance (in paise, convert to rupees)
        const walletBalance = user.wallet?.balance || 0;
        const balanceInRupees = walletBalance / 100;

        // Calculate pending payments (campaigns where user is participant and eligible but not paid)
        const pendingPayments = user.participations
            .filter((p) => p.eligible && (!p.baseRewardPaid || !p.bonusRewardPaid))
            .reduce((sum, p) => {
                let pending = 0;
                if (!p.baseRewardPaid && p.campaign?.baseReward) {
                    pending += p.campaign.baseReward / 100;
                }
                // Note: Bonus rewards are typically distributed from a pool, so we don't calculate individual bonus amounts here
                // You may want to adjust this logic based on your bonus distribution system
                return sum + pending;
            }, 0);

        // Calculate total earned/spent
        const totalEarned = user.transactions
            .filter((t) => t.type === 'BASE_REWARD' || t.type === 'BONUS_REWARD')
            .reduce((sum, t) => sum + (t.amount > 0 ? t.amount : 0), 0) / 100;

        const totalSpent = user.transactions
            .filter((t) => t.type === 'CAMPAIGN_FUND')
            .reduce((sum, t) => sum + Math.abs(t.amount), 0) / 100;

        // Format campaigns created
        const campaignsCreated = user.campaigns.map((campaign) => ({
            id: campaign.id,
            title: campaign.title,
            status: campaign.status,
            paymentStatus: campaign.paymentStatus,
            paymentLinkUrl: campaign.paymentLinkUrl,
            budget: campaign.budgetTotal / 100,
            createdAt: campaign.createdAt,
        }));

        // Format campaigns joined
        const campaignsJoined = user.participations.map((participation) => ({
            id: participation.id,
            campaignId: participation.campaignId,
            campaignTitle: participation.campaign.title,
            status: participation.eligible
                ? 'Approved'
                : participation.disqualified
                    ? 'Rejected'
                    : 'Pending',
            budget: participation.campaign.budgetTotal / 100,
            joinedAt: participation.joinedAt,
        }));

        // Format transactions
        const transactions = user.transactions.map((transaction) => ({
            id: transaction.id,
            type: transaction.type,
            amount: transaction.amount / 100, // Convert from paise to rupees
            reference: transaction.reference,
            createdAt: transaction.createdAt,
        }));

        return NextResponse.json(
            {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    role: user.role,
                },
                wallet: {
                    balance: balanceInRupees,
                    pendingPayments,
                    totalEarned,
                    totalSpent,
                },
                campaignsCreated,
                campaignsJoined,
                transactions,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error fetching profile data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch profile data', details: error.message },
            { status: 500 }
        );
    }
}

