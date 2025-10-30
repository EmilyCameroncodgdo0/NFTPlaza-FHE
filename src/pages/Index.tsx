import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AuctionGrid from '@/components/AuctionGrid';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <AuctionGrid />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Index;
