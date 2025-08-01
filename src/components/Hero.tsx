import { Button } from "@/components/ui/button";
import { MapPin, Shield, Users } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Solo female traveler at sunset" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-secondary/60 to-transparent"></div>
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6 animate-float">
            <Shield className="h-8 w-8 text-accent" />
            <span className="text-xl font-semibold text-accent">SafeSolo</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Explore the World
            <span className="block bg-gradient-sunset bg-clip-text text-transparent">
              Safely & Confidently
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
            The first travel platform designed exclusively for solo female travelers. 
            Plan, navigate, and explore with confidence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" variant="hero" className="text-lg px-8 py-4">
              Start Planning Your Trip
              <MapPin className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="trust" className="text-lg px-8 py-4">
              Join Our Community
              <Users className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse-glow"></div>
              <span>50,000+ Safe Trips Planned</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse-glow"></div>
              <span>Verified Female Drivers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse-glow"></div>
              <span>24/7 Safety Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;