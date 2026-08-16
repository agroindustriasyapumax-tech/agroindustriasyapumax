import { useState, useMemo } from "react";
import { ProductCard } from "@/components/products/ProductCard";
import { products, categories } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, X } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SEOHead } from "@/components/SEOHead";

const Productos = () => {
  const scrollRef = useScrollReveal();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showOnlyInStock, setShowOnlyInStock] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      const matchesStock = !showOnlyInStock || product.inStock;

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [searchQuery, selectedCategory, showOnlyInStock]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setShowOnlyInStock(false);
  };

  const hasActiveFilters =
    searchQuery || selectedCategory !== "all" || showOnlyInStock;

  return (
    <div ref={scrollRef} className="flex flex-col min-h-screen bg-cta transition-colors duration-500">
      <SEOHead
        title="Catálogo de Productos"
        description="Explora nuestro catálogo de maní crudo, tostado, molido, soya en grano y mantequilla de maní. Productos agroindustriales de alta calidad para mayoristas y minoristas."
        path="/productos"
      />
      {/* Header Block */}
      <div className="relative pt-36 pb-24 text-accent-foreground overflow-hidden rounded-b-[3rem]">
        {/* Background Image & Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url('/about_us/sacos.jpg')` }}
        />
        <div className="absolute inset-0 bg-black/55 z-0" />
        <div className="absolute inset-0 z-0" style={{ background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)' }} />

        <div className="mx-auto max-w-7xl px-6 relative z-10 drop-shadow-md">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-white animate-fade-in">
            Catálogo Yapumax
          </p>
          <h1 className="mt-6 max-w-4xl font-display text-5xl font-bold leading-[1.05] md:text-7xl text-white animate-fade-in-up">
            Descubre nuestros <span className="italic text-secondary">productos estrella.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-primary-foreground/80 leading-relaxed animate-fade-in-up animation-delay-100">
            De la tierra a tu mesa. Productos cultivados con lealtad y procesados con los más altos estándares de calidad para el mercado mayorista.
          </p>
        </div>
      </div>

      {/* Filters & Grid Section */}
      <div className="container-custom py-12 md:py-16">
        {/* Floating Filters Panel */}
        <div className="bg-white dark:bg-card rounded-3xl p-6 md:p-8 mb-12 shadow-2xl shadow-primary/5 border border-border/50 scroll-reveal transform hover:-translate-y-1 transition-transform duration-300 relative z-20 -mt-24">
          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            {/* Search */}
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Busca maní, soya, mantequilla..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-base rounded-2xl border-2 focus-visible:ring-0 focus-visible:border-primary transition-all bg-muted/30"
                id="search-products"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-56 h-14 text-base rounded-2xl border-2 bg-muted/30" id="filter-category">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-2">
                <SelectItem value="all" className="py-3 cursor-pointer">Todas las categorías</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id} className="py-3 cursor-pointer">
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Stock Toggle */}
            <Button
              variant={showOnlyInStock ? "default" : "outline"}
              onClick={() => setShowOnlyInStock(!showOnlyInStock)}
              className={`h-14 px-6 text-base rounded-2xl border-2 transition-all ${showOnlyInStock ? "shadow-lg shadow-primary/20 scale-105" : "bg-muted/30 hover:bg-muted/50"
                }`}
              id="filter-stock"
            >
              <Filter className="h-5 w-5 mr-2" />
              Disponibles
            </Button>
          </div>

          {/* Active filters indicator */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-3 mt-6 pt-6 border-t border-border/50 animate-fade-in">
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Filtros aplicados:</span>
              <Button variant="ghost" size="sm" onClick={clearFilters} className="rounded-full hover:bg-destructive/10 hover:text-destructive">
                <X className="h-4 w-4 mr-2" />
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-8 scroll-reveal">
          <h2 className="font-display text-2xl font-bold text-white">Resultados</h2>
          <p className="text-sm font-medium text-white bg-muted/50 px-4 py-1.5 rounded-full">
            {filteredProducts.length} productos
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 stagger-children">
            {filteredProducts.map((product) => (
              <div key={product.id} className="scroll-reveal">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 scroll-reveal bg-white dark:bg-card rounded-3xl border border-dashed border-border">
            <div className="w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="font-display text-3xl font-bold mb-4 text-foreground">
              No hay coincidencias
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
              No encontramos ningún producto con esos filtros. Intenta buscando otro término o categoría.
            </p>
            <Button size="lg" onClick={clearFilters} className="rounded-full px-8 h-12 text-base">
              Ver todos los productos
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Productos;
