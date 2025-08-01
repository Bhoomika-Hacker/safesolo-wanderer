import { Button } from "@/components/ui/button";
import { Shield, Menu, X } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">SafeSolo</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-foreground hover:text-primary transition-colors font-medium">
              Features
            </a>
            <a href="#planner" className="text-foreground hover:text-primary transition-colors font-medium">
              Plan Trip
            </a>
            <a href="#community" className="text-foreground hover:text-primary transition-colors font-medium">
              Community
            </a>
            <a href="#safety" className="text-foreground hover:text-primary transition-colors font-medium">
              Safety
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Sign In
            </Button>
            <Button variant="hero" size="sm">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMenu}
            className="md:hidden"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-card/95 backdrop-blur-md border-b border-border/50 shadow-trust">
            <div className="px-6 py-4 space-y-4">
              <a href="#features" className="block text-foreground hover:text-primary transition-colors font-medium py-2">
                Features
              </a>
              <a href="#planner" className="block text-foreground hover:text-primary transition-colors font-medium py-2">
                Plan Trip
              </a>
              <a href="#community" className="block text-foreground hover:text-primary transition-colors font-medium py-2">
                Community
              </a>
              <a href="#safety" className="block text-foreground hover:text-primary transition-colors font-medium py-2">
                Safety
              </a>
              <div className="pt-4 border-t border-border/50 space-y-3">
                <Button variant="ghost" className="w-full justify-start text-foreground hover:text-primary">
                  Sign In
                </Button>
                <Button variant="hero" className="w-full">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;