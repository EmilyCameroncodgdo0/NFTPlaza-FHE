import { useState } from 'react';
import AuctionCard from './AuctionCard';
import { BidDialog } from './BidDialog';

const mockAuctions = [
  {
    id: 1,
    title: "Crypto Punk #3100",
    image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=800&h=800&fit=crop",
    endTime: "60 days",
    bidCount: 0,
    minBid: "0.1"
  },
  {
    id: 2,
    title: "Bored Ape #8817",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&h=800&fit=crop",
    endTime: "60 days",
    bidCount: 0,
    minBid: "0.1"
  },
  {
    id: 3,
    title: "Azuki #9605",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=800&fit=crop",
    endTime: "60 days",
    bidCount: 0,
    minBid: "0.1"
  },
  {
    id: 4,
    title: "Doodles #4620",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=800&fit=crop",
    endTime: "60 days",
    bidCount: 0,
    minBid: "0.1"
  },
];

const AuctionGrid = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isBidDialogOpen, setIsBidDialogOpen] = useState(false);

  const handleBidClick = (index: number) => {
    setSelectedIndex(index);
    setIsBidDialogOpen(true);
  };

  return (
    <>
      <section id="auctions" className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Live Sealed Auctions
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              All bids are encrypted and hidden until the auction concludes. Place your bid with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockAuctions.map((auction, index) => (
              <AuctionCard
                key={auction.id}
                {...auction}
                onBidClick={() => handleBidClick(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {selectedIndex !== null && (
        <BidDialog
          open={isBidDialogOpen}
          onOpenChange={setIsBidDialogOpen}
          auctionTitle={mockAuctions[selectedIndex].title}
          auctionIndex={selectedIndex}
          minBid={mockAuctions[selectedIndex].minBid}
        />
      )}
    </>
  );
};

export default AuctionGrid;
