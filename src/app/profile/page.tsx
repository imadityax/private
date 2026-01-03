"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Navbar } from "@/components/navbar";

type ProfileData = {
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    role: string;
  };
  wallet: {
    balance: number;
    pendingPayments: number;
    totalEarned: number;
    totalSpent: number;
  };
  campaignsCreated: Array<{
    id: string;
    title: string;
    status: string;
    budget: number;
    createdAt: string;
  }>;
  campaignsJoined: Array<{
    id: string;
    campaignId: string;
    campaignTitle: string;
    status: string;
    budget: number;
    joinedAt: string;
  }>;
  transactions: Array<{
    id: string;
    type: string;
    amount: number;
    reference: string | null;
    createdAt: string;
  }>;
};

export default function ProfilePage() {
  const { data: session } = useSession();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch("/api/profile");
        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }
        const data = await response.json();
        setProfileData(data);
      } catch (err: any) {
        setError(err.message || "Failed to load profile data");
        console.error("Error fetching profile data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  const getRoleLabel = (role: string) => {
    const roleMap: Record<string, string> = {
      CREATOR: "Campaigner",
      DISTRIBUTOR: "Promoter",
      ADMIN: "Admin",
    };
    return roleMap[role] || role;
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="relative min-h-screen text-white px-6 py-10 pt-28 overflow-hidden">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
            <p className="ml-3 text-gray-400">Loading profile...</p>
          </div>
        </main>
      </>
    );
  }

  if (error || !profileData) {
    return (
      <>
        <Navbar />
        <main className="relative min-h-screen text-white px-6 py-10 pt-28 overflow-hidden">
          <div className="flex items-center justify-center min-h-[60vh]">
            <Card className="border-red-500/30 bg-red-500/10">
              <CardContent className="p-6">
                <p className="text-red-400">{error || "Failed to load profile data"}</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen text-white px-6 py-10 pt-28 overflow-hidden">
        {/* ===== BACKGROUND ===== */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-linear-to-br from-neutral-900 via-[#0f0f0f] to-neutral-900" />

          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-red-600/15 rounded-full blur-[160px]" />

          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='1.5' fill='%23ffffff'/%3E%3Ccircle cx='80' cy='40' r='1' fill='%23ffffff'/%3E%3Ccircle cx='50' cy='90' r='1.2' fill='%23ffffff'/%3E%3C/svg%3E")`,
              backgroundSize: "200px 200px",
            }}
          />

          <div className="absolute top-20 left-10 text-[160px] font-bold text-white/5">
            人
          </div>
        </div>

        {/* ===== CONTENT ===== */}
        <div className="max-w-6xl mx-auto space-y-10">

          {/* PROFILE HEADER */}
          <Card className="border-white/10 bg-linear-to-br from-black/40 to-neutral-900/60">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {profileData.user.image ? (
                    <img
                      src={profileData.user.image}
                      alt={profileData.user.name || "User"}
                      className="w-14 h-14 rounded-full border border-red-500/30 object-cover"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full border border-red-500/30 bg-red-500/10 flex items-center justify-center text-xl font-bold text-red-400">
                      {profileData.user.name?.[0]?.toUpperCase() || profileData.user.email[0]?.toUpperCase() || "結"}
                    </div>
                  )}
                  <div>
                    <CardTitle className="text-xl">
                      {profileData.user.name || profileData.user.email.split("@")[0]}
                    </CardTitle>
                    <CardDescription>
                      {getRoleLabel(profileData.user.role)}
                    </CardDescription>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-400">Wallet Balance</p>
                  <p className="text-2xl font-semibold text-green-400">
                    {formatCurrency(profileData.wallet.balance)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* TABS */}
          <Tabs defaultValue="created" className="w-full">
            <TabsList className="border-b border-white/10 rounded-none bg-transparent p-0 h-auto gap-6">
              <TabsTrigger
                value="created"
                className="data-[state=active]:border-b-2 data-[state=active]:border-red-500 data-[state=active]:text-red-400 data-[state=active]:bg-transparent rounded-none pb-2"
              >
                Campaigns Created
              </TabsTrigger>
              <TabsTrigger
                value="joined"
                className="data-[state=active]:border-b-2 data-[state=active]:border-red-500 data-[state=active]:text-red-400 data-[state=active]:bg-transparent rounded-none pb-2"
              >
                Campaigns Joined
              </TabsTrigger>
              <TabsTrigger
                value="payments"
                className="data-[state=active]:border-b-2 data-[state=active]:border-red-500 data-[state=active]:text-red-400 data-[state=active]:bg-transparent rounded-none pb-2"
              >
                Payments
              </TabsTrigger>
              <TabsTrigger
                value="instagram"
                className="data-[state=active]:border-b-2 data-[state=active]:border-red-500 data-[state=active]:text-red-400 data-[state=active]:bg-transparent rounded-none pb-2"
              >
                Instagram
              </TabsTrigger>
            </TabsList>

            {/* TAB CONTENT */}
            <Card className="border-white/10 bg-linear-to-br from-black/40 to-neutral-900/60 mt-0">
              <CardContent className="p-6">
                <TabsContent value="created">
                  <CampaignsCreated campaigns={profileData.campaignsCreated} />
                </TabsContent>
                <TabsContent value="joined">
                  <CampaignsJoined campaigns={profileData.campaignsJoined} />
                </TabsContent>
                <TabsContent value="payments">
                  <Payments
                    wallet={profileData.wallet}
                    transactions={profileData.transactions}
                  />
                </TabsContent>
                <TabsContent value="instagram">
                  <InstagramAnalytics />
                </TabsContent>
              </CardContent>
            </Card>
          </Tabs>
        </div>
      </main>
    </>
  );
}

/* ---------- TAB CONTENT ---------- */

function CampaignsCreated({
  campaigns,
}: {
  campaigns: ProfileData["campaignsCreated"];
}) {
  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      DRAFT: "Draft",
      LIVE: "Live",
      ENDED: "Ended",
      SETTLED: "Settled",
      CANCELLED: "Cancelled",
    };
    return statusMap[status] || status;
  };

  if (campaigns.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No campaigns created yet</p>
        <p className="text-sm text-gray-500 mt-2">
          Create your first campaign to get started
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {campaigns.map((campaign) => (
        <Row
          key={campaign.id}
          left={campaign.title}
          center={getStatusLabel(campaign.status)}
          right={formatCurrency(campaign.budget)}
        />
      ))}
    </div>
  );
}

function CampaignsJoined({
  campaigns,
}: {
  campaigns: ProfileData["campaignsJoined"];
}) {
  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  if (campaigns.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No campaigns joined yet</p>
        <p className="text-sm text-gray-500 mt-2">
          Join campaigns to start earning rewards
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {campaigns.map((campaign) => (
        <Row
          key={campaign.id}
          left={campaign.campaignTitle}
          center={campaign.status}
          right={campaign.status === "Pending" ? "—" : formatCurrency(campaign.budget)}
        />
      ))}
    </div>
  );
}

function Payments({
  wallet,
  transactions,
}: {
  wallet: ProfileData["wallet"];
  transactions: ProfileData["transactions"];
}) {
  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  const totalEarnedSpent = wallet.totalEarned + wallet.totalSpent;

  return (
    <div className="space-y-6">
      <Stat title="Available Balance" value={formatCurrency(wallet.balance)} />
      <Stat
        title="Pending Payments"
        value={formatCurrency(wallet.pendingPayments)}
      />
      <Stat
        title="Total Earned / Spent"
        value={formatCurrency(totalEarnedSpent)}
      />

      {transactions.length > 0 && (
        <div className="mt-6">
          <CardTitle className="text-lg mb-4">Recent Transactions</CardTitle>
          <div className="space-y-2">
            {transactions.map((transaction) => (
              <Card
                key={transaction.id}
                className="border-white/10 bg-linear-to-br from-black/40 to-neutral-900/60"
              >
                <CardContent className="px-5 py-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-white">
                        {transaction.type.replace(/_/g, " ")}
                      </p>
                      {transaction.reference && (
                        <p className="text-xs text-gray-400">
                          Ref: {transaction.reference}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`font-medium ${transaction.amount > 0
                        ? "text-green-400"
                        : "text-red-400"
                        }`}
                    >
                      {transaction.amount > 0 ? "+" : ""}
                      {formatCurrency(transaction.amount)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-4 pt-4">
        <Button variant="outline">Withdraw Balance</Button>
        <Button variant="outline">View All Transactions</Button>
      </div>
    </div>
  );
}

/* ---------- UI HELPERS ---------- */

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <Card className="border-white/10 bg-linear-to-br from-black/40 to-neutral-900/60">
      <CardContent className="p-5">
        <CardDescription className="mb-1">{title}</CardDescription>
        <p className="text-xl font-semibold text-white">{value}</p>
      </CardContent>
    </Card>
  );
}

function Row({
  left,
  center,
  right,
}: {
  left: string;
  center: string;
  right: string;
}) {
  return (
    <Card className="border-white/10 bg-linear-to-br from-black/40 to-neutral-900/60">
      <CardContent className="px-5 py-4">
        <div className="flex justify-between items-center">
          <span className="text-white">{left}</span>
          <CardDescription className="text-sm">{center}</CardDescription>
          <span className="font-medium text-white">{right}</span>
        </div>
      </CardContent>
    </Card>
  );
}

/* ---------- INSTAGRAM ANALYTICS ---------- */

function InstagramAnalytics() {
  const [accountData, setAccountData] = useState<any>(null);
  const [insights, setInsights] = useState<any[]>([]);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInstagramData();
  }, []);

  const fetchInstagramData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch account data
      const accountRes = await fetch("/api/get-insta-data");
      if (accountRes.ok) {
        const account = await accountRes.json();
        setAccountData(account);
      }

      // Fetch insights
      const insightsRes = await fetch("/api/get-insta-insights?metric=reach,profile_views,total_interactions&period=day");
      if (insightsRes.ok) {
        const insightsData = await insightsRes.json();
        setInsights(insightsData);
      }

      // Fetch recent posts
      const postsRes = await fetch("/api/get-insta-recent-post");
      if (postsRes.ok) {
        const postsData = await postsRes.json();
        setRecentPosts(postsData.data || []);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load Instagram data");
      console.error("Error fetching Instagram data:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPostDetails = async (mediaId: string) => {
    try {
      const res = await fetch(`/api/get-post-details?media_id=${mediaId}`);
      if (res.ok) {
        const postData = await res.json();
        setSelectedPost(postData);
      }
    } catch (err) {
      console.error("Error fetching post details:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
        <p className="ml-3 text-gray-400">Loading Instagram data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <Card className="border-red-500/30 bg-red-500/10">
          <CardContent className="p-4">
            <p className="text-red-400 text-sm">{error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchInstagramData}
              className="mt-3"
            >
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!accountData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Instagram account not connected</p>
        <p className="text-sm text-gray-500 mt-2">
          Please connect your Instagram account to view analytics
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Account Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Stat
          title="Username"
          value={`@${accountData.username || "N/A"}`}
        />
        <Stat
          title="Followers"
          value={accountData.followers_count?.toLocaleString() || "0"}
        />
        <Stat
          title="Media Count"
          value={accountData.media_count?.toLocaleString() || "0"}
        />
      </div>

      {/* Insights */}
      {insights.length > 0 && (
        <div>
          <CardTitle className="text-lg mb-4">Today's Insights</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {insights.map((insight, idx) => (
              <Stat
                key={idx}
                title={insight.title}
                value={insight.value?.toLocaleString() || "0"}
              />
            ))}
          </div>
        </div>
      )}

      {/* Recent Posts */}
      <div>
        <CardTitle className="text-lg mb-4">Recent Posts</CardTitle>
        {recentPosts.length === 0 ? (
          <Card className="border-white/10">
            <CardContent className="p-6 text-center">
              <p className="text-gray-400">No posts found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentPosts.slice(0, 6).map((post) => (
              <Card
                key={post.id}
                className="border-white/10 cursor-pointer hover:border-red-500/40 transition"
                onClick={() => fetchPostDetails(post.id)}
              >
                <CardContent className="p-0">
                  {post.media_url && (
                    <img
                      src={post.media_url}
                      alt={post.caption || "Instagram post"}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  )}
                  <div className="p-4">
                    {post.caption && (
                      <p className="text-sm text-gray-400 line-clamp-2 mb-2">
                        {post.caption}
                      </p>
                    )}
                    <p className="text-xs text-gray-500">
                      {post.timestamp
                        ? new Date(post.timestamp).toLocaleDateString()
                        : ""}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Post Details Modal */}
      {selectedPost && (
        <Card className="border-white/10 mt-6">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle>Post Details</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedPost(null)}
              >
                ×
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedPost.media_url && (
              <img
                src={selectedPost.media_url}
                alt={selectedPost.caption || "Post"}
                className="w-full max-w-md rounded-lg"
              />
            )}
            <div className="grid grid-cols-2 gap-4">
              <Stat
                title="Likes"
                value={selectedPost.like_count?.toLocaleString() || "0"}
              />
              <Stat
                title="Comments"
                value={selectedPost.comments_count?.toLocaleString() || "0"}
              />
            </div>
            {selectedPost.caption && (
              <div>
                <CardDescription className="mb-2">Caption</CardDescription>
                <p className="text-sm text-gray-300">{selectedPost.caption}</p>
              </div>
            )}
            {selectedPost.permalink && (
              <Button
                variant="outline"
                onClick={() => window.open(selectedPost.permalink, "_blank")}
              >
                View on Instagram
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
