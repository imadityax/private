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

        // Get user's Facebook connection (using facebook platform)
        const connection = await prisma.platformConnection.findFirst({
            where: {
                userId: session.user.id,
                platform: 'facebook',
                isActive: true,
            },
        });

        if (!connection) {
            return NextResponse.json({ error: "Facebook account not connected" }, { status: 404 });
        }

        const response = await axios.get(`https://graph.facebook.com/v23.0/${process.env.INSTA_ID}?fields=username,followers_count,media_count&access_token=${connection.accessToken}`);
        const data = await response.data;
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching Instagram data:', error);
        return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
    }
}
