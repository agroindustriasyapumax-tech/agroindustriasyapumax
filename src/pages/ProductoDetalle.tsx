import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { products } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCartContext } from "@/contexts/CartContext";
import { ArrowLeft, ShoppingCart, Minus, Plus, Share2, Info } from "lucide-react";
import { cn, calculateUnitTotal } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ProductCard } from "@/components/products/ProductCard";

const ProductoDetalle = () => {
  const scrollRef = useScrollReveal();
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, openCart } = useCartContext();

  const product = products.find((p) => p.id === id);
  const colorLabel = product?.category === "mantequillas" ? "Presentación" : (product?.category.startsWith("mani") || product?.category === "soya") ? "Empaque" : "Color";
  const sizeLabel = (product?.category === "mani-crudo" || product?.category === "mani-tostado") ? "Calibre" : "Variedad";

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product?.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product?.sizes?.[0]);
  const [customNote, setCustomNote] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="font-display text-2xl font-bold mb-4">Producto no encontrado</h1>
        <Button asChild>
          <Link to="/productos">Volver al catálogo</Link>
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!product.inStock) return;

    addItem(product, quantity, selectedColor, selectedSize, customNote || undefined);
    openCart();
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({
        title: product.name,
        text: product.description,
        url,
      });
    } else {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link copiado",
        description: "El enlace del producto ha sido copiado al portapapeles.",
      });
    }
  };

  // Related products (same category, excluding current)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  let multiplier = 1;
  let priceSuffix = " / kg";
  if (selectedColor === "Saco de 25 kg") {
    multiplier = 25;
    priceSuffix = " / Saco 25kg";
  } else if (selectedColor === "Saco de 40 kg") {
    multiplier = 40;
    priceSuffix = " / Saco 40kg";
  } else if (selectedColor === "Saco de 50 kg") {
    multiplier = 50;
    priceSuffix = " / Saco 50kg";
  } else if (product?.category === "mantequillas") {
    priceSuffix = "";
  }

  const unitTotal = product ? calculateUnitTotal(product, selectedColor, selectedSize) : 0;
  const displayPrice = (unitTotal * quantity).toFixed(2);

  return (
    <div ref={scrollRef} className="pb-12 bg-[#faf9f6] dark:bg-background relative overflow-hidden min-h-screen">
      {/* Floating product images — decorative */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <img
          src="/mani_flotante.png"
          alt=""
          className="absolute top-[20%] right-[0%] w-32 md:w-56 opacity-20 rotate-12 animate-float-slow drop-shadow-2xl"
        />
        <img
          src="/soya_flotante.png"
          alt=""
          className="absolute top-[60%] left-[2%] w-24 md:w-40 opacity-30 -rotate-6 animate-float-medium drop-shadow-xl"
        />
      </div>

      {/* Clear Header Hero (No Opacity/Blur) */}
      <div className="relative h-[35vh] min-h-[300px] md:h-[50vh] w-full flex items-center justify-center overflow-hidden mb-8 md:mb-16 rounded-b-[3rem] z-10">
        {/* Back Button */}
        <Link
          to="/productos"
          className="absolute top-8 left-6 md:top-10 md:left-10 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-black/20 hover:bg-black/50 backdrop-blur-md transition-all text-white shadow-lg border border-white/10 group"
          aria-label="Volver al catálogo"
        >
          <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        </Link>

        {/* Crisp background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${product.images[0]})` }}
        />
        {/* Subtle gradient only at the very bottom to ensure text readability if needed, but mostly clear */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Content over hero */}
        <div className="relative z-10 container-custom text-center scroll-reveal translate-y-8">
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
            {product.name}
          </h1>
          <p className="text-xl md:text-2xl text-white/95 max-w-2xl mx-auto font-medium drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            Agroindustrias Yapumax
          </p>
        </div>
      </div>

      <div className="container-custom relative z-10">
        {/* Main Layout Grid */}
        <div className="flex flex-col-reverse md:grid md:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left Column: Narrative & Gallery */}
          <div className="md:col-span-7 lg:col-span-8 space-y-12 w-full">

            {/* Gallery Section */}
            <div className="space-y-4 scroll-reveal-left">
              <div className="aspect-video sm:aspect-[4/3] rounded-2xl overflow-hidden bg-muted border border-border shadow-sm">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={cn(
                        "flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300",
                        selectedImage === i
                          ? "border-primary ring-2 ring-primary/20 ring-offset-1"
                          : "border-transparent opacity-70 hover:opacity-100 hover:border-primary/50"
                      )}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Narrative / Storytelling */}
            <div className="prose prose-lg dark:prose-invert max-w-none scroll-reveal">
              <h2 className="font-display text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
                <Info className="h-6 w-6 text-primary" />
                Sobre este producto
              </h2>

              <p className="text-muted-foreground leading-relaxed text-lg">
                {product.description}
              </p>

              <div className="my-8 p-6 rounded-2xl bg-primary/5 border border-primary/10">
                <p className="text-foreground font-medium italic text-lg m-0 text-center">
                  "En Agroindustrias Yapumax, procesamos cada grano respetando su origen.
                  Nuestro lema Calidad & Lealtad se refleja en el sabor auténtico que llega a tu mesa."
                </p>
              </div>

              <h3 className="font-display text-xl font-semibold mb-4 text-foreground">Origen y Selección</h3>
              <p className="text-muted-foreground leading-relaxed">
                Seleccionamos rigurosamente nuestras cosechas asegurando que cada lote cumpla con los estándares más altos de pureza y frescura. Al eliminar intermediarios y procesar de forma artesanal, preservamos el valor nutricional y el sabor natural intacto.
              </p>

              <div className="grid sm:grid-cols-2 gap-8 sm:gap-6 mt-8">
                <div className="bg-card p-5 rounded-xl border border-border relative group">
                  <div className="relative z-20 pb-4">
                    <h4 className="font-semibold text-primary mb-2">Proceso Artesanal</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Cada paso es supervisado bajo estrictos controles, garantizando que el producto final esté libre de conservantes y aditivos innecesarios.
                    </p>
                  </div>
                  {/* Hoja decorativa */}

                </div>

                <div className="bg-card p-5 rounded-xl border border-border relative group">
                  <div className="relative z-20 pb-4">
                    <h4 className="font-semibold text-primary mb-2">Nutrición Auténtica</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Al conservar sus aceites naturales, ofrecemos un alimento altamente nutritivo, ideal para dietas balanceadas o procesamiento industrial de calidad.
                    </p>
                  </div>
                  {/* Hoja decorativa */}

                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Buy Card (Sticky on Desktop, First on Mobile) */}
          <div className="md:col-span-5 lg:col-span-4 w-full md:sticky md:top-24 scroll-reveal-right">
            <div className="bg-card rounded-3xl border border-border shadow-xl shadow-primary/5 p-6 md:p-8 space-y-6">

              {/* Badges and Share */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {!product.inStock && (
                    <Badge variant="destructive">Sin Stock</Badge>
                  )}
                  {product.customizable && (
                    <Badge className="bg-accent/10 text-accent hover:bg-accent/20 border-accent/20">Venta Mayorista</Badge>
                  )}
                  {product.isBestSeller && (
                    <Badge className="bg-secondary/10 text-secondary hover:bg-secondary/20 border-secondary/20">Top Ventas</Badge>
                  )}
                </div>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary" onClick={handleShare} aria-label="Compartir producto">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Price */}
              <div className="flex flex-col">
                <p className="text-sm text-muted-foreground font-medium mb-1">Precio referencial</p>
                <p className="text-4xl font-display font-bold text-foreground">
                  S/ {displayPrice}
                  <span className="text-base font-normal text-muted-foreground ml-1">{priceSuffix}</span>
                </p>
              </div>

              <div className="w-full h-px bg-border" />

              {/* Color/Packaging Selection */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <Label className="text-sm font-semibold mb-3 block text-foreground uppercase tracking-wider">{colorLabel}</Label>
                  <RadioGroup
                    value={selectedColor}
                    onValueChange={setSelectedColor}
                    className="flex flex-col gap-2"
                  >
                    {product.colors.map((color) => (
                      <Label
                        key={color}
                        className={cn(
                          "flex items-center px-4 py-3 rounded-xl border-2 cursor-pointer transition-all duration-300",
                          selectedColor === color
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-border hover:border-primary/30 hover:bg-muted/50"
                        )}
                      >
                        <RadioGroupItem value={color} className="sr-only" />
                        <span className="font-medium">{color}</span>
                        {selectedColor === color && (
                          <div className="ml-auto w-2 h-2 rounded-full bg-primary" />
                        )}
                      </Label>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {/* Size/Caliber Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <Label className="text-sm font-semibold mb-3 block text-foreground uppercase tracking-wider">{sizeLabel}</Label>
                  <RadioGroup
                    value={selectedSize}
                    onValueChange={setSelectedSize}
                    className="flex flex-col gap-2"
                  >
                    {product.sizes.map((size) => (
                      <Label
                        key={size}
                        className={cn(
                          "flex items-center px-4 py-3 rounded-xl border-2 cursor-pointer transition-all duration-300",
                          selectedSize === size
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-border hover:border-primary/30 hover:bg-muted/50"
                        )}
                      >
                        <RadioGroupItem value={size} className="sr-only" />
                        <span className="font-medium text-sm">{size}</span>
                        {selectedSize === size && (
                          <div className="ml-auto w-2 h-2 rounded-full bg-primary" />
                        )}
                      </Label>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {/* Custom Note */}
              {product.customizable && (
                <div>
                  <Label htmlFor="customNote" className="text-sm font-medium mb-2 block">
                    Cotización especial (opcional)
                  </Label>
                  <Textarea
                    id="customNote"
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    placeholder="¿Necesitas un volumen específico?"
                    className="resize-none rounded-xl"
                    rows={2}
                  />
                </div>
              )}

              {/* Quantity */}
              <div>
                <Label className="text-sm font-semibold mb-3 block text-foreground uppercase tracking-wider">Cantidad</Label>
                <div className="flex items-center justify-between p-2 rounded-xl border-2 border-border">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-lg hover:bg-muted"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-16 text-center font-bold text-lg">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-lg hover:bg-muted"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart */}
              <Button
                size="lg"
                className="w-full group rounded-xl h-14 text-base font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                {product.inStock ? "Agregar al carrito" : "Sin stock"}
              </Button>

              {!product.inStock && (
                <p className="text-sm text-muted-foreground text-center pt-2">
                  Este producto no está disponible actualmente.
                  <Link to="/contacto" className="text-primary hover:underline font-medium block mt-1">
                    ¿Contáctanos para disponibilidad?
                  </Link>
                </p>
              )}
            </div>
          </div>

        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 md:mt-32 pt-12 border-t border-border">
            <h2 className="font-display text-3xl font-bold mb-10 text-center scroll-reveal">
              También podría interesarte
            </h2>
            <div className="flex flex-wrap justify-center gap-6 stagger-children">
              {relatedProducts.map((p) => (
                <div key={p.id} className="scroll-reveal w-full sm:w-[300px] flex">
                  <div className="w-full flex">
                    <ProductCard product={p} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductoDetalle;
