import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Users, Shield, ArrowRight, X } from "lucide-react";

const destinations = [
  { id: 1, name: "Bali, Indonesia", safety: 4.5, type: "Beach & Culture" },
  { id: 2, name: "Tokyo, Japan", safety: 4.8, type: "Urban & Culture" },
  { id: 3, name: "Copenhagen, Denmark", safety: 4.9, type: "City & Design" },
  { id: 4, name: "New Zealand", safety: 4.7, type: "Adventure & Nature" },
  { id: 5, name: "Singapore", safety: 4.9, type: "Urban & Food" },
  { id: 6, name: "Iceland", safety: 4.8, type: "Nature & Adventure" },
  { id: 7, name: "Portugal", safety: 4.6, type: "Culture & Beach" },
  { id: 8, name: "Canada", safety: 4.7, type: "Nature & Cities" },
  { id: 9, name: "South Korea", safety: 4.5, type: "Culture & Food" },
];

const TripPlanner = () => {
  const [selectedDestinations, setSelectedDestinations] = useState<typeof destinations>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDestinationSelect = (destination: typeof destinations[0]) => {
    if (selectedDestinations.find(d => d.id === destination.id)) {
      setSelectedDestinations(prev => prev.filter(d => d.id !== destination.id));
    } else if (selectedDestinations.length < 3) {
      setSelectedDestinations(prev => [...prev, destination]);
    }
  };

  const removeDestination = (id: number) => {
    setSelectedDestinations(prev => prev.filter(d => d.id !== id));
  };

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
                  <Label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    Destinations (Select up to 3)
                  </Label>
                  
                  {/* Selected Destinations */}
                  {selectedDestinations.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {selectedDestinations.map((dest) => (
                        <Badge 
                          key={dest.id} 
                          variant="secondary" 
                          className="flex items-center gap-1 py-1 px-2"
                        >
                          {dest.name}
                          <button
                            onClick={() => removeDestination(dest.id)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start text-muted-foreground"
                        disabled={selectedDestinations.length >= 3}
                      >
                        <MapPin className="h-4 w-4 mr-2" />
                        {selectedDestinations.length === 0 
                          ? "Choose your destinations..." 
                          : selectedDestinations.length >= 3 
                            ? "Maximum destinations selected" 
                            : "Add more destinations..."
                        }
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
                      <DialogHeader>
                        <DialogTitle>Choose Your Destinations</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2">
                        {destinations.map((destination) => {
                          const isSelected = selectedDestinations.find(d => d.id === destination.id);
                          const canSelect = selectedDestinations.length < 3 || isSelected;
                          
                          return (
                            <Card 
                              key={destination.id}
                              className={`cursor-pointer transition-all hover:shadow-md ${
                                isSelected 
                                  ? 'ring-2 ring-primary bg-primary/5' 
                                  : canSelect 
                                    ? 'hover:border-primary/50' 
                                    : 'opacity-50 cursor-not-allowed'
                              }`}
                              onClick={() => canSelect && handleDestinationSelect(destination)}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                  <h3 className="font-semibold text-foreground">{destination.name}</h3>
                                  <div className="flex items-center gap-1">
                                    <Shield className="h-4 w-4 text-success" />
                                    <span className="text-sm font-medium text-success">{destination.safety}</span>
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground">{destination.type}</p>
                                {isSelected && (
                                  <Badge variant="default" className="mt-2">
                                    Selected
                                  </Badge>
                                )}
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t">
                        <span className="text-sm text-muted-foreground">
                          {selectedDestinations.length}/3 destinations selected
                        </span>
                        <Button onClick={() => setIsDialogOpen(false)}>
                          Done
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
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