import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarDays, MapPin, Users, Shield, ArrowRight } from "lucide-react";

const TripPlanner = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Plan Your Perfect
            <span className="block bg-gradient-primary bg-clip-text text-transparent">Solo Adventure</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Let our AI create a personalized, safety-focused itinerary just for you
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-trust border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="flex items-center justify-center gap-3 text-2xl">
                <MapPin className="h-6 w-6 text-primary" />
                Smart Trip Planner
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="space-y-2">
                  <Label htmlFor="destination" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    Where to?
                  </Label>
                  <Input 
                    id="destination"
                    placeholder="Enter destination city"
                    className="border-border/50 focus:border-primary transition-colors"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="checkin" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-secondary" />
                    Check-in
                  </Label>
                  <Input 
                    id="checkin"
                    type="date"
                    className="border-border/50 focus:border-primary transition-colors"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="checkout" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-secondary" />
                    Check-out
                  </Label>
                  <Input 
                    id="checkout"
                    type="date"
                    className="border-border/50 focus:border-primary transition-colors"
                  />
                </div>
              </div>

              {/* Safety Features Preview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gradient-to-br from-success/10 to-success/5 p-4 rounded-lg border border-success/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="h-5 w-5 text-success" />
                    <span className="font-medium text-foreground">Safety Score</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Get real-time safety ratings for your destination</p>
                </div>
                
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-4 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span className="font-medium text-foreground">Community Tips</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Access advice from fellow solo travelers</p>
                </div>
                
                <div className="bg-gradient-to-br from-accent/10 to-accent/5 p-4 rounded-lg border border-accent/20">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="h-5 w-5 text-accent" />
                    <span className="font-medium text-foreground">Safe Routes</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Navigate through well-lit, public areas</p>
                </div>
              </div>

              <div className="text-center">
                <Button size="lg" variant="hero" className="text-lg px-8 py-4">
                  Create My Safe Itinerary
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <p className="text-sm text-muted-foreground mt-3">
                  Free to start • Personalized recommendations • Safety-first planning
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TripPlanner;