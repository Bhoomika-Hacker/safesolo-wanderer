import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import TripPlanner from "@/components/TripPlanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <div id="features">
        <Features />
      </div>
      <div id="planner">
        <TripPlanner />
      </div>
    </div>
  );
};

export default Index;
