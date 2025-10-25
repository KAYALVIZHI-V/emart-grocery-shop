import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import CartItem from "@/components/CartItem";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/components/ProductCard";

const Cart = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<Record<string, { product: Product; quantity: number }>>({});
  
  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(prev => ({
      ...prev,
      [id]: { ...prev[id], quantity }
    }));
  };
  
  const handleRemove = (id: string) => {
    setCartItems(prev => {
      const newCart = { ...prev };
      delete newCart[id];
      return newCart;
    });
    toast({
      title: "Item removed",
      description: "Product has been removed from your cart.",
    });
  };
  
  const items = Object.values(cartItems);
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const handleCheckout = () => {
    toast({
      title: "Order placed!",
      description: `Your order of ${cartCount} items has been placed successfully.`,
    });
    setCartItems({});
    setTimeout(() => navigate("/products"), 1500);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar cartCount={cartCount} />
      
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">Review your items and complete your order</p>
        </div>
        
        {items.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map(({ product, quantity }) => (
                <CartItem
                  key={product.id}
                  product={product}
                  quantity={quantity}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemove}
                />
              ))}
            </div>
            
            <div>
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (8%)</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-primary">${total.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleCheckout} className="w-full" size="lg">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Checkout
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <ShoppingBag className="h-20 w-20 mx-auto text-muted-foreground/30 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Add some products to get started!</p>
            <Button onClick={() => navigate("/products")}>
              Browse Products
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
