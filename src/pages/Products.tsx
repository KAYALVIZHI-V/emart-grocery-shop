import { useState } from "react";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import ProductCard, { Product } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import applesImg from "@/assets/products/apples.jpg";
import bananasImg from "@/assets/products/bananas.jpg";
import milkImg from "@/assets/products/milk.jpg";
import eggsImg from "@/assets/products/eggs.jpg";
import breadImg from "@/assets/products/bread.jpg";
import orangeJuiceImg from "@/assets/products/orange-juice.jpg";
import tomatoesImg from "@/assets/products/tomatoes.jpg";
import carrotsImg from "@/assets/products/carrots.jpg";

const initialProducts: Product[] = [
  { id: "1", name: "Fresh Apples", price: 3.99, stock: 50, category: "Fruits", image: applesImg },
  { id: "2", name: "Organic Bananas", price: 2.49, stock: 3, category: "Fruits", image: bananasImg },
  { id: "3", name: "Whole Milk", price: 4.29, stock: 25, category: "Dairy", image: milkImg },
  { id: "4", name: "Brown Eggs", price: 5.99, stock: 0, category: "Dairy", image: eggsImg },
  { id: "5", name: "White Bread", price: 2.99, stock: 15, category: "Bakery", image: breadImg },
  { id: "6", name: "Orange Juice", price: 6.49, stock: 20, category: "Beverages", image: orangeJuiceImg },
  { id: "7", name: "Tomatoes", price: 3.49, stock: 30, category: "Vegetables", image: tomatoesImg },
  { id: "8", name: "Carrots", price: 2.79, stock: 4, category: "Vegetables", image: carrotsImg },
  { id: "9", name: "Chicken Breast", price: 9.99, stock: 12, category: "Meat" },
  { id: "10", name: "Ground Beef", price: 7.99, stock: 8, category: "Meat" },
  { id: "11", name: "Cheddar Cheese", price: 5.49, stock: 18, category: "Dairy" },
  { id: "12", name: "Greek Yogurt", price: 4.99, stock: 22, category: "Dairy" },
];

const Products = () => {
  const [products] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  
  const categories = ["all", ...new Set(products.map(p => p.category))];
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });
  
  const handleAddToCart = (product: Product) => {
    setCart(prev => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1
    }));
  };
  
  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar cartCount={cartCount} />
      
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Our Products</h1>
          <p className="text-muted-foreground">Browse our complete inventory of fresh groceries</p>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
