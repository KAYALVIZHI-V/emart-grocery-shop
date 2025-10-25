import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Package, TrendingUp, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import heroImage from "@/assets/hero-grocery.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/50" />
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                E-Mart
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Your complete inventory management solution for fresh groceries and daily essentials. 
              Manage stock, track products, and streamline your shopping experience.
            </p>
            <div className="flex gap-4">
              <Link to="/products">
                <Button size="lg" className="transition-all hover:scale-105">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Start Shopping
                </Button>
              </Link>
              <Link to="/admin">
                <Button size="lg" variant="secondary" className="transition-all hover:scale-105">
                  <Package className="mr-2 h-5 w-5" />
                  Manage Inventory
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-accent/30">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything You Need for Inventory Management
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg border shadow-sm hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Stock Tracking</h3>
              <p className="text-muted-foreground">
                Monitor product availability and get instant alerts for low stock items.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border shadow-sm hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Restocking</h3>
              <p className="text-muted-foreground">
                Quickly restock products and manage inventory levels with intuitive controls.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border shadow-sm hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-full bg-accent/50 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Reliable</h3>
              <p className="text-muted-foreground">
                Your data is safe with our robust and secure inventory management system.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Browse our complete product catalog or dive into the admin dashboard to manage your inventory.
          </p>
          <Link to="/products">
            <Button size="lg" className="transition-all hover:scale-105">
              Browse Products
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
