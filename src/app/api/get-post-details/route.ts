import axios from 'axios';
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

        // Get user's Instagram account
        const instagramAccount = await prisma.instagramAccount.findUnique({
            where: {
                userId: userId,
            },
        });

        if (!instagramAccount) {
            return NextResponse.json({ error: "Instagram account not connected" }, { status: 404 });
        }

        // Get media ID from query parameters, or use a default
        const { searchParams } = new URL(request.url);
        const mediaId = searchParams.get('media_id') || searchParams.get('id');

        if (!mediaId) {
            return NextResponse.json({ error: "Media ID is required. Use ?media_id=YOUR_MEDIA_ID" }, { status: 400 });
        }

        const response = await axios.get(
            `https://graph.facebook.com/v23.0/${mediaId}?fields=id,media_type,media_url,like_count,comments_count,caption,timestamp&access_token=${instagramAccount.accessToken}`
        );
        const data = await response.data;
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Error fetching post details:', error);

        // Handle axios errors
        if (error?.response) {
            return NextResponse.json({
                error: "Error fetching post details",
                details: error.response.data?.error?.message || error.message
            }, { status: error.response.status || 500 });
        }

        return NextResponse.json({
            error: "Error fetching post details",
            details: error.message || "Unknown error occurred"
        }, { status: 500 });
    }
}
