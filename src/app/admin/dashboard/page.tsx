"use client";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Play,
  IndianRupee,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Eye,
  MoreHorizontal,
  Shield,
} from "lucide-react";

const pendingApprovals = [
  {
    id: "1",
    title: "Travel Vlog: Mountain Trek",
    creator: "AdventureTime",
    submittedAt: "2 hours ago",
    type: "content",
  },
  {
    id: "2",
    title: "Cooking Tutorial: Pasta Recipe",
    creator: "ChefMaster",
    submittedAt: "4 hours ago",
    type: "content",
  },
  {
    id: "3",
    title: "New Distributor Application",
    creator: "GrowthMedia",
    submittedAt: "1 day ago",
    type: "user",
  },
];

const recentDisputes = [
  {
    id: "1",
    issue: "View count discrepancy",
    parties: "Creator: TechGuru vs Dist: TechDaily",
    amount: "₹2,450",
    status: "open",
    priority: "high",
  },
  {
    id: "2",
    issue: "Content attribution missing",
    parties: "Creator: FitnessLife vs Dist: HealthHub",
    amount: "₹890",
    status: "investigating",
    priority: "medium",
  },
  {
    id: "3",
    issue: "Late payment claim",
    parties: "Creator: FoodieCreates",
    amount: "₹3,200",
    status: "resolved",
    priority: "low",
  },
];

const usersList = [
  {
    id: "1",
    name: "Rahul Sharma",
    email: "rahul@example.com",
    role: "creator",
    status: "active",
    joined: "Oct 15, 2024",
    earnings: "₹45,200",
  },
  {
    id: "2",
    name: "Priya Patel",
    email: "priya@example.com",
    role: "distributor",
    status: "active",
    joined: "Nov 2, 2024",
    earnings: "₹28,900",
  },
  {
    id: "3",
    name: "Amit Kumar",
    email: "amit@example.com",
    role: "creator",
    status: "pending",
    joined: "Dec 18, 2024",
    earnings: "₹0",
  },
];

export default function AdminDashboard() {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Platform overview and management.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Users"
            value="1,234"
            change="+48 this week"
            changeType="positive"
            icon={Users}
          />
          <StatsCard
            title="Active Content"
            value="892"
            change="+23 pending"
            changeType="neutral"
            icon={Play}
          />
          <StatsCard
            title="Weekly Payouts"
            value="₹2.4L"
            change="+12% from last week"
            changeType="positive"
            icon={IndianRupee}
            variant="success"
          />
          <StatsCard
            title="Open Disputes"
            value="7"
            change="2 high priority"
            changeType="negative"
            icon={AlertTriangle}
            variant="warning"
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="approvals" className="space-y-6">
          <TabsList>
            <TabsTrigger value="approvals">Pending Approvals</TabsTrigger>
            <TabsTrigger value="disputes">Disputes</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          {/* Approvals Tab */}
          <TabsContent value="approvals">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pending Approvals</CardTitle>
                <CardDescription>Review and approve new content and user applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingApprovals.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${
                          item.type === "content" ? "bg-primary/10 text-primary" : "bg-info/10 text-info"
                        }`}>
                          {item.type === "content" ? <Play className="h-4 w-4" /> : <Users className="h-4 w-4" />}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{item.title}</p>
                          <p className="text-xs text-muted-foreground">
                            by {item.creator} • {item.submittedAt}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Review
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-success hover:text-success">
                          <CheckCircle2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Disputes Tab */}
          <TabsContent value="disputes">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Dispute Resolution</CardTitle>
                <CardDescription>Handle view adjustments and payment disputes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentDisputes.map((dispute) => (
                    <div
                      key={dispute.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${
                          dispute.priority === "high" ? "bg-destructive/10 text-destructive" :
                          dispute.priority === "medium" ? "bg-warning/10 text-warning" :
                          "bg-muted text-muted-foreground"
                        }`}>
                          <AlertTriangle className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{dispute.issue}</p>
                          <p className="text-xs text-muted-foreground">{dispute.parties}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-medium text-sm">{dispute.amount}</p>
                        <Badge variant={
                          dispute.status === "open" ? "destructive" :
                          dispute.status === "investigating" ? "warning" :
                          "success"
                        }>
                          {dispute.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Manage
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">User Management</CardTitle>
                    <CardDescription>View and manage platform users</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    Export Users
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Earnings</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usersList.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-sm">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="capitalize">
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.status === "active" ? "success" : "pending"}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {user.joined}
                        </TableCell>
                        <TableCell className="font-medium">{user.earnings}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
