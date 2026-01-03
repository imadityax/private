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

        // Get the Instagram Business Account ID from Facebook pages
        const pagesResponse = await axios.get(
            `https://graph.facebook.com/v23.0/me/accounts?fields=id,name,instagram_business_account&access_token=${instagramAccount.accessToken}`
        );

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

        const response = await axios.get(
            `https://graph.facebook.com/v23.0/${instagramBusinessAccountId}/media?fields=id,media_url,permalink,timestamp,caption&access_token=${instagramAccount.accessToken}`
        );
        const data = await response.data;
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching Instagram posts:', error);
        return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
    }
}

// api to get individual post data
// https://graph.facebook.com/v23.0/17958470069978271?fields=id,media_type,media_url,like_count,comments_count,caption,timestamp&access_token={access_token}