import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Package, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface NavbarProps {
  cartCount?: number;
}

const Navbar = ({ cartCount = 0 }: NavbarProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Package className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            E-Mart
          </span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/products">
            <Button 
              variant={isActive("/products") ? "default" : "ghost"}
              className="transition-all"
            >
              <Package className="mr-2 h-4 w-4" />
              Products
            </Button>
          </Link>
          
          <Link to="/cart" className="relative">
            <Button 
              variant={isActive("/cart") ? "default" : "ghost"}
              className="transition-all"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Cart
              {cartCount > 0 && (
                <Badge className="ml-2 bg-secondary text-secondary-foreground">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </Link>
          
          <Link to="/admin">
            <Button 
              variant={isActive("/admin") ? "secondary" : "outline"}
              className="transition-all"
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Admin
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
