import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, Package } from "lucide-react";
import { Product } from "./ProductCard";

interface CartItemProps {
  product: Product;
  quantity: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem = ({ product, quantity, onUpdateQuantity, onRemove }: CartItemProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 rounded bg-accent flex items-center justify-center flex-shrink-0">
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover rounded"
              />
            ) : (
              <Package className="h-8 w-8 text-muted-foreground" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold truncate">{product.name}</h3>
            <p className="text-sm text-muted-foreground">{product.category}</p>
            <p className="text-lg font-bold text-primary mt-1">${product.price.toFixed(2)}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => onUpdateQuantity(product.id, Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            
            <span className="w-12 text-center font-semibold">{quantity}</span>
            
            <Button
              size="icon"
              variant="outline"
              onClick={() => onUpdateQuantity(product.id, quantity + 1)}
              disabled={quantity >= product.stock}
            >
              <Plus className="h-4 w-4" />
            </Button>
            
            <Button
              size="icon"
              variant="destructive"
              onClick={() => onRemove(product.id)}
              className="ml-2"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="mt-2 text-sm text-muted-foreground text-right">
          Subtotal: <span className="font-semibold text-foreground">${(product.price * quantity).toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartItem;
