"use client";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet as WalletIcon, 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock, 
  CheckCircle2,
  Calendar,
  IndianRupee,
  Download
} from "lucide-react";

const transactions = [
  {
    id: "1",
    type: "payout",
    description: "Weekly Settlement",
    amount: 5800,
    status: "completed",
    date: "Dec 15, 2024",
  },
  {
    id: "2",
    type: "earning",
    description: "Morning Routine Tips - 45.2K views",
    amount: 2260,
    status: "completed",
    date: "Dec 14, 2024",
  },
  {
    id: "3",
    type: "earning",
    description: "Quick Cooking Recipe - 28.1K views",
    amount: 1405,
    status: "completed",
    date: "Dec 13, 2024",
  },
  {
    id: "4",
    type: "payout",
    description: "Weekly Settlement",
    amount: 4200,
    status: "completed",
    date: "Dec 8, 2024",
  },
  {
    id: "5",
    type: "earning",
    description: "Tech Review - 89K views",
    amount: 4450,
    status: "pending",
    date: "Dec 12, 2024",
  },
];

export default function Wallet() {
  return (
    <DashboardLayout role="creator">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Wallet</h1>
            <p className="text-muted-foreground">Manage your earnings and payouts.</p>
          </div>
          <Button>
            <Download className="h-4 w-4" />
            Export Statement
          </Button>
        </div>

        {/* Balance Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Available Balance</p>
                  <p className="text-3xl font-bold tracking-tight">₹12,450</p>
                  <p className="text-xs text-muted-foreground">Ready to withdraw</p>
                </div>
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                  <WalletIcon className="h-5 w-5" />
                </div>
              </div>
              <Button className="w-full mt-4" variant="outline">
                Withdraw Funds
              </Button>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-warning">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Pending Earnings</p>
                  <p className="text-3xl font-bold tracking-tight">₹4,450</p>
                  <p className="text-xs text-muted-foreground">Processing views</p>
                </div>
                <div className="p-2.5 rounded-lg bg-warning/10 text-warning">
                  <Clock className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 p-3 rounded-lg bg-warning/5 border border-warning/20">
                <p className="text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3 inline mr-1" />
                  Next settlement: Dec 22, 2024
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-success">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Total Earned</p>
                  <p className="text-3xl font-bold tracking-tight">₹48,900</p>
                  <p className="text-xs text-success">All time</p>
                </div>
                <div className="p-2.5 rounded-lg bg-success/10 text-success">
                  <IndianRupee className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Settlement Info */}
        <Card variant="glass">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Weekly Settlement Schedule</p>
                  <p className="text-sm text-muted-foreground">Every Sunday at 11:59 PM IST</p>
                </div>
              </div>
              <div className="flex-1 h-px bg-border sm:h-auto sm:w-px sm:self-stretch" />
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-success/10">
                  <CheckCircle2 className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="font-medium">Auto-Payout Enabled</p>
                  <p className="text-sm text-muted-foreground">Bank: HDFC ****4523</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Transaction History</CardTitle>
                <CardDescription>Your recent earnings and payouts</CardDescription>
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div 
                  key={transaction.id} 
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${
                      transaction.type === "payout" 
                        ? "bg-primary/10 text-primary" 
                        : "bg-success/10 text-success"
                    }`}>
                      {transaction.type === "payout" ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className={`font-medium ${
                        transaction.type === "payout" ? "text-foreground" : "text-success"
                      }`}>
                        {transaction.type === "payout" ? "-" : "+"}₹{transaction.amount.toLocaleString()}
                      </p>
                    </div>
                    <Badge variant={transaction.status === "completed" ? "success" : "pending"}>
                      {transaction.status}
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
