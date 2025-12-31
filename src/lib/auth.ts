import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import InstagramProvider from "next-auth/providers/instagram";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import axios from "axios";

// Helper function to fetch Instagram account data from Facebook Graph API
async function fetchInstagramAccountFromFacebook(accessToken: string): Promise<{
    igUserId: string;
    username: string;
    followers: number;
} | null> {
    try {
        // First, get the Instagram Business Account ID from Facebook
        // This assumes the user has connected their Instagram Business Account to their Facebook Page
        const instagramAccountId = process.env.INSTA_ID;

        if (!instagramAccountId) {
            console.warn('⚠️ INSTA_ID not configured, skipping Instagram account fetch');
            return null;
        }

        // Fetch Instagram account details
        const response = await axios.get(
            `https://graph.facebook.com/v23.0/${instagramAccountId}?fields=id,username,followers_count&access_token=${accessToken}`
        );

        return {
            igUserId: response.data.id,
            username: response.data.username,
            followers: response.data.followers_count || 0,
        };
    } catch (error) {
        console.error('❌ Error fetching Instagram account from Facebook:', error);
        return null;
    }
}

// Helper function to handle Instagram account creation/update
async function handleInstagramAccount(
    userId: string,
    account: {
        providerAccountId: string;
        access_token?: string;
        expires_at?: number;
    },
    profile: any, // NextAuth profile type varies by provider
    instagramData?: {
        igUserId: string;
        username: string;
        followers: number;
    }
) {
    try {
        const igUserId = instagramData?.igUserId || profile?.id || account.providerAccountId;
        const username = instagramData?.username || profile?.username || '';
        const followers = instagramData?.followers || 0;
        const accessToken = account.access_token || '';
        const tokenExpires = account.expires_at
            ? new Date(account.expires_at * 1000)
            : new Date(Date.now() + 60 * 24 * 60 * 60 * 1000); // Default to 60 days if not provided

        // Use userId as the id for InstagramAccount (since userId is unique)
        await prisma.instagramAccount.upsert({
            where: {
                userId: userId,
            },
            create: {
                id: userId, // Using userId as the primary key
                userId: userId,
                igUserId: igUserId,
                username: username,
                followers: followers,
                accessToken: accessToken,
                tokenExpires: tokenExpires,
            },
            update: {
                igUserId: igUserId,
                username: username,
                followers: followers,
                accessToken: accessToken,
                tokenExpires: tokenExpires,
            },
        });

        console.log("✅ Instagram account stored successfully");
    } catch (error) {
        console.error('❌ Error handling Instagram account:', error);
        throw error;
    }
}

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID as string,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
            authorization: {
                params: {
                    scope: "pages_manage_posts,pages_read_engagement,pages_show_list,instagram_basic,instagram_content_publish"
                }
            }
        }),
        InstagramProvider({
            clientId: process.env.INSTAGRAM_CLIENT_ID!,
            clientSecret: process.env.INSTAGRAM_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn() {
            return true
        },
        async session({ session, user }) {
            if (session.user && user) {
                (session.user as any).id = user.id;
            }
            return session;
        },
    },
    events: {
        async signIn({ user, account, profile }) {
            // Handle Instagram account for Facebook and Instagram providers
            if (account && user?.id && (account.provider === 'facebook' || account.provider === 'instagram')) {
                console.log('🔗 Processing Instagram account for:', account.provider);
                try {
                    if (account.provider === 'facebook') {
                        // Fetch Instagram account data from Facebook Graph API
                        if (account.access_token) {
                            const instagramData = await fetchInstagramAccountFromFacebook(account.access_token);
                            await handleInstagramAccount(
                                user.id,
                                {
                                    providerAccountId: account.providerAccountId,
                                    access_token: account.access_token,
                                    expires_at: account.expires_at,
                                },
                                profile as any,
                                instagramData || undefined
                            );
                            console.log('✅ Instagram account created from Facebook connection');
                        }
                    } else if (account.provider === 'instagram') {
                        // Direct Instagram authentication
                        await handleInstagramAccount(
                            user.id,
                            {
                                providerAccountId: account.providerAccountId,
                                access_token: account.access_token,
                                expires_at: account.expires_at,
                            },
                            profile as any
                        );
                        console.log('✅ Instagram account created from Instagram connection');
                    }
                } catch (error) {
                    console.error('❌ Error in signIn Instagram account handling:', error);
                    // Don't throw - allow sign-in to complete even if Instagram account setup fails
                }
            }
        },
    },
    session: {
        strategy: "database",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
