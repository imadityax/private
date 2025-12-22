import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, TrendingUp, User } from "lucide-react";

interface MarketplaceCardProps {
  id: string;
  thumbnail: string;
  title: string;
  creator: string;
  cpm: number;
  expectedViews: string;
  category?: string;
  onAccept: (id: string) => void;
}

export function MarketplaceCard({
  id,
  thumbnail,
  title,
  creator,
  cpm,
  expectedViews,
  category,
  onAccept,
}: MarketplaceCardProps) {
  const expectedEarnings = ((parseInt(expectedViews.replace(/[^0-9]/g, '')) / 1000) * cpm).toFixed(0);

  return (
    <Card variant="interactive" className="overflow-hidden group">
      {/* Thumbnail */}
      <div className="relative aspect-[9/16] max-h-48 overflow-hidden bg-muted">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="p-3 rounded-full bg-background/90 backdrop-blur-sm">
            <Play className="h-6 w-6 text-foreground" />
          </div>
        </div>
        {category && (
          <Badge variant="secondary" className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm">
            {category}
          </Badge>
        )}
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Title */}
        <h3 className="font-medium text-sm line-clamp-2 min-h-[2.5rem]">{title}</h3>

        {/* Creator */}
        <div className="flex items-center gap-2 text-muted-foreground">
          <User className="h-3.5 w-3.5" />
          <span className="text-xs">{creator}</span>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div>
            <p className="text-lg font-semibold">₹{cpm}</p>
            <p className="text-xs text-muted-foreground">per 1K views</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-success">
              <TrendingUp className="h-3.5 w-3.5" />
              <span className="text-sm font-medium">~₹{expectedEarnings}</span>
            </div>
            <p className="text-xs text-muted-foreground">{expectedViews} expected</p>
          </div>
        </div>

        <Button className="w-full" size="sm" onClick={() => onAccept(id)}>
          Accept License
        </Button>
      </CardContent>
    </Card>
  );
}

export default MarketplaceCard;
