import { Button } from '@/components/ui/button';
import { Shield, Lock, Eye } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(220_90%_56%/0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,hsl(190_90%_50%/0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm text-foreground/80">Powered by FHE Encryption</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Sealed-Bid NFT Auctions
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              With True Privacy
            </span>
          </h1>
          
          <p className="text-xl text-foreground/70 mb-12 max-w-2xl mx-auto">
            Place encrypted bids on exclusive NFTs. No one can see the highest bid or leading bidder until the auction ends. Fair, transparent, and completely private.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mb-16">
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
              Explore Auctions
            </Button>
            <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/5">
              Learn More
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="p-6 rounded-xl bg-card/50 border border-border backdrop-blur-sm">
              <Lock className="h-8 w-8 text-primary mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Encrypted Bids</h3>
              <p className="text-sm text-foreground/60">All bids are encrypted with FHE technology</p>
            </div>
            
            <div className="p-6 rounded-xl bg-card/50 border border-border backdrop-blur-sm">
              <Eye className="h-8 w-8 text-accent mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">No Peeking</h3>
              <p className="text-sm text-foreground/60">Current highest bid remains hidden</p>
            </div>
            
            <div className="p-6 rounded-xl bg-card/50 border border-border backdrop-blur-sm">
              <Shield className="h-8 w-8 text-secondary mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Fair & Secure</h3>
              <p className="text-sm text-foreground/60">Smart contract ensures transparency</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
