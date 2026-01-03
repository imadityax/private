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

        // Get query parameters for customizable insights
        const { searchParams } = new URL(request.url);
        const metric = searchParams.get('metric') || 'reach,views,profile_views,total_interactions,shares,accounts_engaged';
        const period = searchParams.get('period') || 'day';

        // Build the insights API URL using the Instagram account's ID
        const insightsUrl = `https://graph.facebook.com/v23.0/${instagramAccount.igUserId}/insights?metric=${metric}&period=${period}&metric_type=total_value&access_token=${instagramAccount.accessToken}`

        const response = await axios.get(insightsUrl);

        // Format the response for better readability
        const extractedData = response.data.data.map((item: { title: string; description: string; total_value: { value: number } }) => ({
            title: item.title,
            description: item.description,
            value: item.total_value.value,
        }));

        return NextResponse.json(extractedData);
    } catch (error: unknown) {
        console.error('Error fetching Instagram insights:', error);

        // Handle axios errors with proper type checking
        if (error && typeof error === 'object' && 'response' in error) {
            const axiosError = error as {
                response?: {
                    status?: number;
                    data?: { error?: { message?: string } }
                };
                message?: string;
            };

            if (axiosError.response?.status === 400) {
                return NextResponse.json({
                    error: "Bad request - check your media ID and metric parameters",
                    details: axiosError.response?.data?.error?.message || "Invalid request parameters"
                }, { status: 400 });
            }

            if (axiosError.response?.status === 403) {
                return NextResponse.json({
                    error: "Insufficient permissions - Instagram insights require specific permissions",
                    details: "Make sure your app has instagram_basic and instagram_manage_insights permissions"
                }, { status: 403 });
            }

            return NextResponse.json({
                error: "Error fetching Instagram insights",
                details: axiosError.response?.data?.error?.message || axiosError.message || "Unknown error"
            }, { status: 500 });
        }

        return NextResponse.json({
            error: "Error fetching Instagram insights",
            details: "Unknown error occurred"
        }, { status: 500 });
    }
}

// Example usage:
// GET /api/get-insta-insights
// GET /api/get-insta-insights?metric=reach&period=day
// GET /api/get-insta-insights?metric=impressions,reach,engagement&period=week
// GET /api/get-insta-insights?media_id=17841473279014420&metric=reach&period=day
// GET /api/get-insta-insights?metric=reach&period=day&since=2024-01-01&until=2024-01-31
