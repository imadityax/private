"use client";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { MarketplaceCard } from "@/components/dashboard/MarketplaceCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, IndianRupee, Play, Instagram, CheckCircle2, AlertCircle } from "lucide-react";

const mockMarketplace = [
  {
    id: "1",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=600&fit=crop",
    title: "Tech Product Unboxing - Latest Gadget Review",
    creator: "TechReviewer",
    cpm: 55,
    expectedViews: "100K",
    category: "Tech",
  },
  {
    id: "2",
    thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop",
    title: "5-Minute Morning Workout Routine",
    creator: "FitLife",
    cpm: 45,
    expectedViews: "80K",
    category: "Fitness",
  },
  {
    id: "3",
    thumbnail: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=400&h=600&fit=crop",
    title: "Easy Breakfast Recipe in 3 Steps",
    creator: "ChefQuick",
    cpm: 50,
    expectedViews: "120K",
    category: "Food",
  },
  {
    id: "4",
    thumbnail: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400&h=600&fit=crop",
    title: "Productivity Tips for Remote Work",
    creator: "WorkSmart",
    cpm: 40,
    expectedViews: "90K",
    category: "Lifestyle",
  },
];

export default function DistributorDashboard() {
  const handleAcceptLicense = (id: string) => {
    
  };

  return (
    <DashboardLayout role="distributor">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Discover content and track your distribution earnings.</p>
        </div>

        {/* Instagram Connection Status */}
        <Card variant="glass">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500 to-purple-500">
                  <Instagram className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">Instagram Connected</p>
                  <p className="text-sm text-muted-foreground">@lifestyle.channel • Creator Account</p>
                </div>
              </div>
              <Badge variant="success" className="flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                Active
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatsCard
            title="Total Views Generated"
            value="892K"
            change="+18.2% from last week"
            changeType="positive"
            icon={Eye}
          />
          <StatsCard
            title="Total Earnings"
            value="₹44,600"
            change="+₹5,800 this week"
            changeType="positive"
            icon={IndianRupee}
            variant="success"
          />
          <StatsCard
            title="Active Content"
            value="5"
            change="2 pending views"
            changeType="neutral"
            icon={Play}
          />
        </div>

        {/* Marketplace */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Content Marketplace</h2>
              <p className="text-sm text-muted-foreground">Browse available content to license and distribute</p>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {mockMarketplace.map((item) => (
              <MarketplaceCard
                key={item.id}
                {...item}
                onAccept={handleAcceptLicense}
              />
            ))}
          </div>
        </div>

        {/* Active Content Quick View */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Active Distributions</CardTitle>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Morning Routine Tips", views: "45.2K", earnings: "₹2,260", status: "tracking" },
                { title: "Quick Cooking Recipe", views: "28.1K", earnings: "₹1,405", status: "tracking" },
                { title: "Workout Challenge", views: "12.8K", earnings: "₹640", status: "pending" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Play className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.views} views</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-medium text-sm text-success">{item.earnings}</p>
                      <p className="text-xs text-muted-foreground">earned</p>
                    </div>
                    <Badge variant={item.status === "tracking" ? "success" : "pending"}>
                      {item.status === "tracking" ? (
                        <span className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                          Tracking
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          Pending
                        </span>
                      )}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
