import { useEffect } from 'react';
import { Lock, Upload, Award, Shield } from 'lucide-react';

const steps = [
  {
    icon: Shield,
    title: "Connect Wallet",
    description: "Link your Web3 wallet using RainbowKit to access the platform securely."
  },
  {
    icon: Upload,
    title: "Submit Encrypted Bid",
    description: "Your bid is encrypted using FHE technology before being submitted to the smart contract."
  },
  {
    icon: Lock,
    title: "Sealed Until Close",
    description: "All bids remain encrypted and hidden from everyone, including the seller and other bidders."
  },
  {
    icon: Award,
    title: "Winner Revealed",
    description: "When the auction ends, the smart contract decrypts bids and determines the highest bidder."
  }
];

const HowItWorks = () => {
  useEffect(() => {
    // Handle smooth scroll to video when URL hash is #how-it-works
    if (window.location.hash === '#how-it-works') {
      const videoSection = document.getElementById('demo-video');
      if (videoSection) {
        setTimeout(() => {
          videoSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    }
  }, []);

  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(220_90%_56%/0.08),transparent_70%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How Sealed Auctions Work
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Our FHE-powered system ensures complete privacy throughout the bidding process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-secondary text-background flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-foreground/60">{step.description}</p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(100%+1rem)] w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
              </div>
            );
          })}
        </div>

        {/* Demo Video Section */}
        <div id="demo-video" className="max-w-4xl mx-auto mt-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-3">See It In Action</h3>
            <p className="text-lg text-foreground/60">
              Watch how our FHE-powered sealed auction platform works end-to-end
            </p>
          </div>

          <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-primary/20 bg-background/50 backdrop-blur shadow-2xl">
            <video
              controls
              className="w-full h-full"
              poster="/placeholder.svg"
            >
              <source src="/how_it_works.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
