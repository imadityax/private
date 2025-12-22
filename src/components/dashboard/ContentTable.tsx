import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Play } from "lucide-react";

interface ContentItem {
  id: string;
  thumbnail: string;
  title: string;
  cpm: number;
  distributor: string | null;
  views: number;
  status: "active" | "pending" | "completed";
}

interface ContentTableProps {
  content: ContentItem[];
  type: "creator" | "distributor";
}

export function ContentTable({ content, type }: ContentTableProps) {
  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[300px]">Content</TableHead>
            <TableHead>CPM (₹)</TableHead>
            {type === "creator" && <TableHead>Distributor</TableHead>}
            {type === "distributor" && <TableHead>Creator</TableHead>}
            <TableHead>Views</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {content.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-10 rounded-md overflow-hidden bg-muted flex-shrink-0 group">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="h-4 w-4 text-foreground" />
                    </div>
                  </div>
                  <span className="font-medium text-sm truncate max-w-[180px]">{item.title}</span>
                </div>
              </TableCell>
              <TableCell>
                <span className="font-medium">₹{item.cpm}</span>
                <span className="text-muted-foreground text-xs">/1K</span>
              </TableCell>
              <TableCell>
                {item.distributor ? (
                  <span className="text-sm">{item.distributor}</span>
                ) : (
                  <span className="text-muted-foreground text-sm">—</span>
                )}
              </TableCell>
              <TableCell>
                <span className="font-medium">{formatViews(item.views)}</span>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    item.status === "active" ? "success" :
                    item.status === "pending" ? "pending" :
                    /* completed */ "secondary"
                  }
                >
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
