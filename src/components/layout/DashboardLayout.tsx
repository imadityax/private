"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Upload, 
  Wallet, 
  Settings, 
  LogOut,
  Menu,
  X,
  ShoppingBag,
  Instagram,
  Shield
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: "creator" | "distributor" | "admin";
}

const creatorNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/creator" },
  { icon: Upload, label: "Upload Content", href: "/creator/upload" },
  { icon: Wallet, label: "Wallet", href: "/wallet" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

const distributorNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/distributor" },
  { icon: ShoppingBag, label: "Marketplace", href: "/distributor/marketplace" },
  { icon: Instagram, label: "Active Content", href: "/distributor/active" },
  { icon: Wallet, label: "Wallet", href: "/wallet" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

const adminNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Shield, label: "Users", href: "/admin/users" },
  { icon: ShoppingBag, label: "Content", href: "/admin/content" },
  { icon: Wallet, label: "Payouts", href: "/admin/payouts" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navItems = role === "creator"
    ? creatorNavItems
    : role === "distributor"
    ? distributorNavItems
    : adminNavItems;

  const roleLabel = role === "creator" ? "Creator" : role === "distributor" ? "Distributor" : "Admin";

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 glass-strong h-16">
        <div className="flex items-center justify-between h-full px-4">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-info flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">V</span>
            </div>
            <span className="font-semibold">ViewPay</span>
          </Link>
          <div className="w-5" />
        </div>
      </header>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 z-50 h-full w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-info flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">V</span>
              </div>
              <span className="font-semibold">ViewPay</span>
            </Link>
            <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Role Badge */}
          <div className="px-4 py-3">
            <div className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium inline-block">
              {roleLabel} Account
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-2 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-sidebar-border">
            <Button variant="ghost" className="w-full justify-start gap-3" asChild>
              <Link href="/">
                <LogOut className="h-4 w-4" />
                Log out
              </Link>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:pl-64 pt-16 lg:pt-0 min-h-screen">
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
