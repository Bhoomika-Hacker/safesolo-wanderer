import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MapPin, 
  Route, 
  Car, 
  UtensilsCrossed, 
  Shield, 
  Users, 
  Calendar,
  Star
} from "lucide-react";
import safetyImage from "@/assets/safety-features.jpg";

const Features = () => {
  const features = [
    {
      icon: MapPin,
      title: "Smart Trip Planner",
      description: "AI-powered planning with safety-first destination recommendations and curated experiences for solo travelers.",
      color: "text-primary"
    },
    {
      icon: Route,
      title: "Safe Route Navigation",
      description: "Maps with safety-based routing through well-lit areas, CCTV coverage, and public spaces with real-time safety scores.",
      color: "text-secondary"
    },
    {
      icon: Car,
      title: "Female Driver Network",
      description: "Connect with verified local female drivers. View fare estimates, ratings, and book with confidence.",
      color: "text-accent"
    },
    {
      icon: UtensilsCrossed,
      title: "Local Food & Shopping",
      description: "Discover women-friendly spots with filters for budget, hygiene standards, and women-owned businesses.",
      color: "text-success"
    },
    {
      icon: Shield,
      title: "Safety & Emergency Tools",
      description: "SOS button, live location sharing, 'I'm Safe' check-ins, and 24/7 emergency support.",
      color: "text-destructive"
    },
    {
      icon: Users,
      title: "Community Reviews",
      description: "Share tips, reviews, and hidden gems with fellow solo female travelers. Rate places for safety and comfort.",
      color: "text-primary"
    }
  ];

  return (
    <section className="py-20 bg-gradient-trust">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need for
            <span className="block text-primary">Safe Solo Travel</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From planning to navigation, community to safety - we've got you covered at every step of your journey.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-card hover:shadow-trust transition-all duration-300 transform hover:scale-105 bg-card/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center ${feature.color}`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Safety Features Highlight */}
        <div className="bg-card rounded-2xl shadow-trust overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="h-8 w-8 text-success" />
                <h3 className="text-2xl font-bold text-foreground">Safety First, Always</h3>
              </div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Our platform is built with safety as the core foundation. Every feature, every recommendation, 
                and every route is carefully vetted by our community of solo female travelers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="safety" size="lg">
                  <Calendar className="mr-2 h-5 w-5" />
                  Plan Your Safe Trip
                </Button>
                <Button variant="outline" size="lg">
                  <Star className="mr-2 h-5 w-5" />
                  Read Safety Reviews
                </Button>
              </div>
            </div>
            <div className="relative min-h-80 lg:min-h-0">
              <img 
                src={safetyImage} 
                alt="Safety features illustration" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-card/20"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;