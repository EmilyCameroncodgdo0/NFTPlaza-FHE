import AuctionCard from './AuctionCard';

const mockAuctions = [
  {
    id: 1,
    title: "Cosmic Dreams #4821",
    image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=800&h=800&fit=crop",
    endTime: "2h 34m",
    bidCount: 12,
    minBid: "0.5"
  },
  {
    id: 2,
    title: "Digital Genesis Collection",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&h=800&fit=crop",
    endTime: "5h 12m",
    bidCount: 8,
    minBid: "1.2"
  },
  {
    id: 3,
    title: "Abstract Realms #007",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=800&fit=crop",
    endTime: "1d 3h",
    bidCount: 24,
    minBid: "2.5"
  },
  {
    id: 4,
    title: "Neon Nights Cityscape",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=800&fit=crop",
    endTime: "4h 45m",
    bidCount: 15,
    minBid: "0.8"
  },
  {
    id: 5,
    title: "Ethereal Landscapes #12",
    image: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=800&h=800&fit=crop",
    endTime: "8h 20m",
    bidCount: 19,
    minBid: "1.5"
  },
  {
    id: 6,
    title: "Quantum Particle Study",
    image: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=800&h=800&fit=crop",
    endTime: "12h 55m",
    bidCount: 31,
    minBid: "3.0"
  }
];

const AuctionGrid = () => {
  return (
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
          {mockAuctions.map((auction) => (
            <AuctionCard key={auction.id} {...auction} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuctionGrid;
