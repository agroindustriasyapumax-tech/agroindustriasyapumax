import { Product } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden card-glow-hover bg-card border-none shadow-md h-full flex flex-col rounded-[2rem]">
      <div className="relative aspect-square overflow-hidden flex-shrink-0">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {!product.inStock && (
            <Badge variant="destructive" className="shadow-lg">
              Sin Stock
            </Badge>
          )}
          {product.isBestSeller && (
            <Badge className="bg-secondary text-secondary-foreground shadow-lg">
              Top Ventas
            </Badge>
          )}
          {product.originalPrice && (
            <Badge className="bg-accent text-accent-foreground shadow-lg">
              Oferta
            </Badge>
          )}
        </div>

        {/* Overlay actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Link to={`/producto/${product.id}`}>
            <Button size="sm" variant="secondary" className="shadow-lg">
              <ShoppingCart className="h-4 w-4 mr-1" />
              Comprar
            </Button>
          </Link>
        </div>
      </div>

      <CardContent className="p-4 flex-1 flex flex-col justify-between">
        <div className="mb-4">
          <h3 className="font-display text-lg font-semibold mb-1 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.shortDescription || product.description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                S/ {product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-xl font-bold text-primary">
              S/ {product.price.toFixed(2)}
              {product.category !== "mantequillas" && product.category !== "combos" && (
                <span className="text-xs font-normal text-muted-foreground"> / kg</span>
              )}
            </span>
          </div>
          <span className={cn(
            "text-xs font-semibold px-2.5 py-1 rounded-full",
            product.inStock
              ? "bg-accent/15 text-accent"
              : product.category === "mantequillas"
              ? "bg-secondary/15 text-secondary"
              : "bg-destructive/15 text-destructive"
          )}>
            {product.inStock ? "Disponible" : product.category === "mantequillas" ? "Próximamente" : "Agotado"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
