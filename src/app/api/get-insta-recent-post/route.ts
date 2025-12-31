import axios from 'axios';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get user's Instagram connection
        const connection = await prisma.platformConnection.findFirst({
            where: {
                userId: session.user.id,
                platform: 'facebook',
                isActive: true,
            },
        });

        if (!connection) {
            return NextResponse.json({ error: "Instagram account not connected" }, { status: 404 });
        }

        const response = await axios.get(`https://graph.facebook.com/v23.0/${process.env.INSTA_ID}/media?fields=id,media_url,permalink,timestamp,caption&access_token=${connection.accessToken}`);
        const data = await response.data;
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching Instagram posts:', error);
        return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
    }
}

// api to get individual post data
// https://graph.facebook.com/v23.0/17958470069978271?fields=id,media_type,media_url,like_count,comments_count,caption,timestamp&access_token={access_token}