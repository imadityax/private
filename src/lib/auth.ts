import { NextAuthOptions } from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
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
        // Step 1: Get user's Facebook pages
        const pagesResponse = await axios.get(
            `https://graph.facebook.com/v24.0/me/accounts?fields=id,name,instagram_business_account&access_token=${accessToken}`
        );

        console.log("pagesResponse", pagesResponse.data);

        const pages = pagesResponse.data.data;
        if (!pages || pages.length === 0) {
            console.warn('⚠️ No Facebook pages found for user');
            return null;
        }

        // Step 2: Find a page with an Instagram Business Account
        let instagramBusinessAccountId: string | null = null;
        for (const page of pages) {
            if (page.instagram_business_account) {
                instagramBusinessAccountId = page.instagram_business_account.id;
                break;
            }
        }

        if (!instagramBusinessAccountId) {
            console.warn('⚠️ No Instagram Business Account found connected to Facebook pages');
            return null;
        }

        // Step 3: Fetch Instagram account details using the Business Account ID
        const response = await axios.get(
            `https://graph.facebook.com/v24.0/${instagramBusinessAccountId}?fields=id,username,followers_count&access_token=${accessToken}`
        );

        return {
            igUserId: response.data.id,
            username: response.data.username,
            followers: response.data.followers_count || 0,
        };
    } catch (error: any) {
        console.error('❌ Error fetching Instagram account from Facebook:', error);
        if (error?.response) {
            console.error('Facebook API Error:', {
                status: error.response.status,
                data: error.response.data
            });
        }
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
                accessToken: accessToken,
                tokenExpires: tokenExpires,
            },
            update: {
                igUserId: igUserId,
                username: username,
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
        FacebookProvider({
            id: "facebook",
            clientId: process.env.FACEBOOK_CLIENT_ID as string,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
            authorization: {
                params: {
                    scope: "public_profile,pages_show_list,pages_read_engagement,business_management,instagram_basic,pages_read_engagement,business_management,pages_show_list"
                }
            },
            profile(profile) {
                return {
                    id: profile.id,
                    name: profile.name || profile.first_name || "User",
                    email: profile.email || `${profile.id}@facebook.temp`,
                    image: profile.picture?.data?.url || null,
                };
            },
        }),
    ],
    callbacks: {
        async signIn() {
            return true
        },
        async jwt({ token, user }) {
            // When user signs in, add user ID to the token
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            // Add user ID from token to session
            if (session.user && token.id) {
                (session.user as any).id = token.id as string;
            }
            return session;
        },
    },
    events: {
        async signIn({ user, account, profile }) {
            // Handle Instagram account for both Facebook and Instagram providers
            if (account && user?.id && (account.provider === 'facebook' || account.provider === 'instagram')) {
                console.log('🔗 Processing Instagram account for:', account.provider);
                try {
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
                } catch (error) {
                    console.error('❌ Error in signIn Instagram account handling:', error);
                    // Don't throw - allow sign-in to complete even if Instagram account setup fails
                }
            }
        },
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
