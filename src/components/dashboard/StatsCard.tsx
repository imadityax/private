import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  variant?: "default" | "success" | "warning";
}

export function StatsCard({ 
  title, 
  value, 
  change, 
  changeType = "neutral",
  icon: Icon,
  variant = "default"
}: StatsCardProps) {
  return (
    <Card variant={variant === "success" ? "success" : variant === "warning" ? "warning" : "stat"}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-semibold tracking-tight">{value}</p>
            {change && (
              <p className={cn(
                "text-xs font-medium",
                changeType === "positive" && "text-success",
                changeType === "negative" && "text-destructive",
                changeType === "neutral" && "text-muted-foreground"
              )}>
                {change}
              </p>
            )}
          </div>
          <div className={cn(
            "p-2.5 rounded-lg",
            variant === "success" ? "bg-success/10 text-success" :
            variant === "warning" ? "bg-warning/10 text-warning" :
            "bg-primary/10 text-primary"
          )}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
