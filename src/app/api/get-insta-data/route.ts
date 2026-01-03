import axios from 'axios';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        const userId = (session?.user as any)?.id;
        if (!session || !userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get user's Instagram account
        const instagramAccount = await prisma.instagramAccount.findUnique({
            where: {
                userId: userId,
            },
        });

        if (!instagramAccount) {
            return NextResponse.json({ error: "Instagram account not connected" }, { status: 404 });
        }

        // Check if token is expired
        if (instagramAccount.tokenExpires && new Date(instagramAccount.tokenExpires) < new Date()) {
            return NextResponse.json({
                error: "Access token expired",
                message: "Please reconnect your Instagram account"
            }, { status: 401 });
        }

        // Get the Instagram Business Account ID from Facebook pages
        // First, get user's Facebook pages
        const pagesResponse = await axios.get(
            `https://graph.facebook.com/v23.0/me/accounts?fields=id,name,instagram_business_account&access_token=${instagramAccount.accessToken}`
        );
        console.log("pagesResponse", pagesResponse.data);

        const pages = pagesResponse.data.data;
        if (!pages || pages.length === 0) {
            return NextResponse.json({
                error: "No Facebook pages found",
                message: "Please connect a Facebook page with an Instagram Business Account"
            }, { status: 404 });
        }

        // Find a page with an Instagram Business Account
        let instagramBusinessAccountId: string | null = null;
        for (const page of pages) {
            if (page.instagram_business_account) {
                instagramBusinessAccountId = page.instagram_business_account.id;
                break;
            }
        }

        if (!instagramBusinessAccountId) {
            return NextResponse.json({
                error: "No Instagram Business Account found",
                message: "Please connect an Instagram Business Account to your Facebook page"
            }, { status: 404 });
        }

        console.log('Fetching Instagram data for:', {
            igUserId: instagramBusinessAccountId,
            username: instagramAccount.username,
            hasAccessToken: !!instagramAccount.accessToken,
            tokenExpires: instagramAccount.tokenExpires
        });

        // Now fetch Instagram Business Account data using the correct ID
        const response = await axios.get(
            `https://graph.facebook.com/v23.0/${instagramBusinessAccountId}?fields=username,followers_count,media_count&access_token=${instagramAccount.accessToken}`
        );
        const data = await response.data;
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Error fetching Instagram data:', error);

        // Provide more detailed error information
        if (error?.response) {
            const errorData = error.response.data;
            console.error('Facebook API Error:', {
                status: error.response.status,
                data: errorData
            });

            return NextResponse.json({
                error: "Error fetching Instagram data",
                details: errorData?.error?.message || error.message,
                facebookError: errorData?.error
            }, { status: error.response.status || 500 });
        }

        return NextResponse.json({
            error: "Error fetching Instagram data",
            details: error.message || "Unknown error occurred"
        }, { status: 500 });
    }
}
