import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Clock, TrendingUp } from 'lucide-react';

interface AuctionCardProps {
  id: number;
  title: string;
  image: string;
  endTime: string;
  bidCount: number;
  minBid: string;
}

const AuctionCard = ({ title, image, endTime, bidCount, minBid }: AuctionCardProps) => {
  return (
    <Card className="group overflow-hidden border-border bg-card hover:shadow-[0_0_30px_hsl(220_90%_56%/0.2)] transition-all duration-300">
      <div className="aspect-square overflow-hidden relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-4 line-clamp-1">{title}</h3>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground/60 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Ends in
            </span>
            <span className="font-semibold text-foreground">{endTime}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground/60 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Bids
            </span>
            <span className="font-semibold text-primary">{bidCount} encrypted</span>
          </div>
          
          <div className="pt-3 border-t border-border">
            <div className="text-xs text-foreground/60 mb-1">Minimum Bid</div>
            <div className="text-lg font-bold text-secondary">{minBid} ETH</div>
          </div>
        </div>
        
        <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
          Place Sealed Bid
        </Button>
      </div>
    </Card>
  );
};

export default AuctionCard;
