import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCartContext } from "@/contexts/CartContext";
import { Minus, Plus, Trash2, ShoppingBag, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { calculateItemPrice } from "@/lib/utils";

export const CartDrawer = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice, totalItems } = useCartContext();

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 font-display">
            <ShoppingBag className="h-5 w-5 text-primary" />
            Mi Carrito ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="font-display text-lg font-semibold mb-2">
              Tu carrito está vacío
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              ¡Explora nuestros productos y encuentra algo especial!
            </p>
            <Button onClick={closeCart} asChild>
              <Link to="/productos">Ver Productos</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}-${index}`}
                  className="flex gap-4 p-4 bg-muted/50 rounded-lg"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-1">
                      {item.product.name}
                    </h4>
                    {item.selectedColor && (
                      <p className="text-xs text-muted-foreground">
                        Color: {item.selectedColor}
                      </p>
                    )}
                    {item.selectedSize && (
                      <p className="text-xs text-muted-foreground">
                        Tamaño: {item.selectedSize}
                      </p>
                    )}
                    <p className="text-sm font-bold text-primary mt-1">
                      S/ {calculateItemPrice(item).toFixed(2)}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.quantity - 1,
                            item.selectedColor,
                            item.selectedSize
                          )
                        }
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.quantity + 1,
                            item.selectedColor,
                            item.selectedSize
                          )
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive hover:text-white ml-auto"
                        onClick={() =>
                          removeItem(item.product.id, item.selectedColor, item.selectedSize)
                        }
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-border pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-xl font-bold">S/ {totalPrice.toFixed(2)}</span>
              </div>
              <Button className="w-full" size="lg" onClick={closeCart} asChild>
                <Link to="/checkout">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Proceder con pedido
                </Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
