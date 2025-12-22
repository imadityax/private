"use client";
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ContentTable } from "@/components/dashboard/ContentTable";
import { UploadModal } from "@/components/dashboard/UploadModal";
import { Button } from "@/components/ui/button";
import { Eye, IndianRupee, FileCheck, Upload, Plus } from "lucide-react";

const mockContent = [
  {
    id: "1",
    thumbnail: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=200&h=120&fit=crop",
    title: "Morning Routine Motivation",
    cpm: 45,
    distributor: "@lifestyle.vibes",
    views: 125000,
    status: "active" as const,
  },
  {
    id: "2",
    thumbnail: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=200&h=120&fit=crop",
    title: "Quick Cooking Hack",
    cpm: 50,
    distributor: "@food.daily",
    views: 89000,
    status: "active" as const,
  },
  {
    id: "3",
    thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=120&fit=crop",
    title: "Fitness Challenge Day 1",
    cpm: 55,
    distributor: null,
    views: 0,
    status: "pending" as const,
  },
  {
    id: "4",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=120&fit=crop",
    title: "Tech Review: Latest Gadgets",
    cpm: 60,
    distributor: "@tech.insider",
    views: 342000,
    status: "completed" as const,
  },
];

export default function CreatorDashboard() {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  return (
    <DashboardLayout role="creator">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Track your content performance and earnings.</p>
          </div>
          <Button onClick={() => setUploadModalOpen(true)}>
            <Plus className="h-4 w-4" />
            Upload Content
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatsCard
            title="Total Views"
            value="556K"
            change="+12.5% from last week"
            changeType="positive"
            icon={Eye}
          />
          <StatsCard
            title="Total Earnings"
            value="₹27,850"
            change="+₹3,200 this week"
            changeType="positive"
            icon={IndianRupee}
            variant="success"
          />
          <StatsCard
            title="Active Licenses"
            value="3"
            change="2 pending review"
            changeType="neutral"
            icon={FileCheck}
          />
        </div>

        {/* Content Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Your Content</h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
          <ContentTable content={mockContent} type="creator" />
        </div>
      </div>

      <UploadModal open={uploadModalOpen} onOpenChange={setUploadModalOpen} />
    </DashboardLayout>
  );
}
