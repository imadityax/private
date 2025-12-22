import Link from "next/link";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Upload, 
  ShoppingCart, 
  Shield, 
  Wallet,
  ArrowRight,
  BarChart3,
  Globe,
  Users,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Zap
} from "lucide-react";

export default function Home() {
  const dashboardCards = [
    {
      title: "Creator Studio",
      description: "Upload, manage, and monetize your creative content",
      icon: <Upload className="h-6 w-6" />,
      href: "/creator/dashboard",
      color: "bg-pastel-lavender",
      borderColor: "border-lavender-200",
      iconColor: "text-lavender-600",
      buttonColor: "bg-lavender-500 hover:bg-lavender-600",
      stats: "1.2K+ Active Creators",
      gradient: "from-lavender-100 to-lilac-50"
    },
    {
      title: "Marketplace",
      description: "Discover and distribute premium content worldwide",
      icon: <ShoppingCart className="h-6 w-6" />,
      href: "/distributor/dashboard",
      color: "bg-pastel-mint",
      borderColor: "border-mint-200",
      iconColor: "text-mint-600",
      buttonColor: "bg-mint-500 hover:bg-mint-600",
      stats: "850+ Distributors",
      gradient: "from-mint-100 to-seafoam-50"
    },
    {
      title: "Admin Console",
      description: "Platform oversight and moderation tools",
      icon: <Shield className="h-6 w-6" />,
      href: "/admin/dashboard",
      color: "bg-pastel-peach",
      borderColor: "border-peach-200",
      iconColor: "text-peach-600",
      buttonColor: "bg-peach-500 hover:bg-peach-600",
      stats: "Secure Management",
      gradient: "from-peach-100 to-coral-50"
    },
    {
      title: "Wallet Hub",
      description: "Track earnings, payouts, and financial insights",
      icon: <Wallet className="h-6 w-6" />,
      href: "/wallet",
      color: "bg-pastel-sky",
      borderColor: "border-sky-200",
      iconColor: "text-sky-600",
      buttonColor: "bg-sky-500 hover:bg-sky-600",
      stats: "Secure Payments",
      gradient: "from-sky-100 to-periwinkle-50"
    }
  ];

  const platformStats = [
    { 
      label: "Active Content", 
      value: "45.2K", 
      change: "+12%", 
      icon: <BarChart3 className="h-5 w-5" />,
      color: "bg-lavender-50 text-lavender-700"
    },
    { 
      label: "Live Deals", 
      value: "3.8K", 
      change: "+8%", 
      icon: <Globe className="h-5 w-5" />,
      color: "bg-mint-50 text-mint-700"
    },
    { 
      label: "Monthly Users", 
      value: "125K", 
      change: "+24%", 
      icon: <Users className="h-5 w-5" />,
      color: "bg-peach-50 text-peach-700"
    },
  ];

  const quickActions = [
    { label: "Upload Content", icon: <Upload className="h-4 w-4" />, href: "/creator/upload" },
    { label: "Browse Market", icon: <ShoppingCart className="h-4 w-4" />, href: "/marketplace" },
    { label: "View Analytics", icon: <TrendingUp className="h-4 w-4" />, href: "/analytics" },
    { label: "Get Support", icon: <ShieldCheck className="h-4 w-4" />, href: "/support" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-pastel-cream to-white p-4 sm:p-8">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-lavender-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-mint-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-peach-100 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Header Section */}
        <header className="mb-12 text-center relative">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-lavender-200 to-sky-200 rounded-2xl mb-6 shadow-sm">
            <div className="bg-white p-2.5 rounded-xl shadow-xs">
              <div className="h-8 w-8 bg-gradient-to-r from-lavender-400 to-sky-400 rounded-lg" />
            </div>
          </div>
          
          <div className="inline-flex items-center gap-2 bg-lavender-50 px-4 py-2 rounded-full mb-4">
            <Sparkles className="h-4 w-4 text-lavender-500" />
            <span className="text-sm font-medium text-lavender-700">
              The Future of Content Monetization
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-lavender-400 via-sky-400 to-mint-400 bg-clip-text text-transparent">
              ViewPay
            </span>
          </h1>
          
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed">
            A seamless platform for creators, distributors, and administrators to 
            manage content, licensing, and payments in one beautiful workspace.
          </p>

          {/* Platform Stats */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {platformStats.map((stat, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-2xl px-5 py-4 shadow-xs border border-gray-100 hover:shadow-sm transition-shadow duration-300"
              >
                <div className={`p-3 rounded-xl ${stat.color.split(' ')[0]} bg-opacity-20`}>
                  <div className={stat.color.split(' ')[1]}>
                    {stat.icon}
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-gray-500">{stat.label}</div>
                    <div className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {stat.change}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </header>

        {/* Dashboard Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {dashboardCards.map((card, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden border ${card.borderColor} bg-white/90 backdrop-blur-sm shadow-xs hover:shadow-md transition-all duration-500 hover:-translate-y-1.5 group`}
            >
              {/* Decorative Corner */}
              <div className={`absolute top-0 right-0 w-16 h-16 ${card.color} rounded-bl-full opacity-10`} />
              
              {/* Hover Effect Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <CardContent className="p-6 relative">
                {/* Icon with Pastel Background */}
                <div className={`inline-flex p-3 rounded-xl ${card.color} bg-opacity-20 mb-5`}>
                  <div className={card.iconColor}>
                    {card.icon}
                  </div>
                </div>

                <CardTitle className="text-xl font-bold text-gray-800 mb-3">
                  {card.title}
                </CardTitle>
                
                <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                  {card.description}
                </p>

                {/* Stats */}
                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <div className="h-2 w-2 bg-emerald-400 rounded-full mr-2" />
                  {card.stats}
                </div>

                {/* Button */}
                <Button 
                  asChild 
                  className={`w-full ${card.buttonColor} text-white shadow-xs hover:shadow-sm transition-all duration-300 group/btn rounded-xl`}
                  size="lg"
                >
                  <Link href={card.href} className="flex items-center justify-center">
                    <span className="font-medium">Access</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-r from-lavender-50/50 to-sky-50/50 rounded-3xl p-8 border border-gray-100 shadow-xs">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Quick Actions</h2>
                <p className="text-gray-600">
                  Get started with these common tasks
                </p>
              </div>
              <Zap className="h-8 w-8 text-amber-400" />
            </div>
            
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  asChild
                  variant="outline"
                  className="h-auto py-4 px-5 bg-white/70 backdrop-blur-sm border-gray-200 hover:border-lavender-300 hover:bg-lavender-50/50 transition-all duration-300 rounded-xl group/action"
                >
                  <Link href={action.href} className="flex flex-col items-center justify-center gap-2">
                    <div className="p-2 rounded-lg bg-lavender-50 group-hover/action:bg-lavender-100 transition-colors duration-300">
                      {action.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{action.label}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-sm text-gray-500">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>Enterprise-grade security • 99.9% uptime • 24/7 support</span>
          </div>
          
          <p className="text-sm text-gray-500">
            Need assistance?{" "}
            <Link 
              href="/help" 
              className="text-lavender-600 hover:text-lavender-700 font-medium hover:underline transition-colors"
            >
              Visit our help center
            </Link>
            {" • "}
            <Link 
              href="/contact" 
              className="text-sky-600 hover:text-sky-700 font-medium hover:underline transition-colors"
            >
              contact support
            </Link>
            {" • "}
            <Link 
              href="/demo" 
              className="text-mint-600 hover:text-mint-700 font-medium hover:underline transition-colors"
            >
              request a demo
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}