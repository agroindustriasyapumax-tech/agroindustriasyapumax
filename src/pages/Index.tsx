import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProductCard } from "@/components/products/ProductCard";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { InfiniteGallery } from "@/components/home/InfiniteGallery";
import { WorldMapSection } from "@/components/map/WorldMapSection";
import { ContactSection } from "@/components/home/ContactSection";
import { ImageGallerySection } from "@/components/home/ImageGallerySection";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { SEOHead } from "@/components/SEOHead";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useToast } from "@/hooks/use-toast";
import { products, testimonials, galleryImages } from "@/data/mockData";
import {
  ArrowRight,
  Truck,
  Shield,
  Star,
  Headphones,
  Quote,
  Send,
  Mail,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const Index = () => {
  const scrollRef = useScrollReveal();
  const { toast } = useToast();
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mensaje enviado",
      description: "Nos pondremos en contacto contigo lo antes posible.",
    });
  };

  // Dynamic background state
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate dynamic Theme (Background + Text color) based on scroll depth
  const getTheme = () => {
    if (scrollY < 600) return { bg: "bg-background", text: "text-foreground", isDark: false };
    if (scrollY >= 600 && scrollY < 1800) return { bg: "bg-primary", text: "text-white", isDark: true };
    if (scrollY >= 1800 && scrollY < 3000) return { bg: "bg-accent", text: "text-white", isDark: true };
    return { bg: "bg-foreground", text: "text-white", isDark: true };
  };

  const currentTheme = getTheme();

  return (
    <div
      ref={scrollRef}
      className={cn(
        "flex flex-col relative transition-colors duration-700 ease-in-out",
        currentTheme.bg,
        currentTheme.text
      )}
    >
      <SEOHead
        title="Agroindustrias Yapumax — Venta de Maní y Soya en Perú y Bolivia"
        description="Venta y exportación de Soya, Maní y Mantequilla de Maní de primera calidad. Distribuimos a todo el Perú y Bolivia. Calidad & Lealtad en tu mesa."
        path="/"
      />
      <h1 className="sr-only">Agroindustrias Yapumax — +20 años de Venta de Maní y Soya en Perú y Bolivia</h1>

      {/* ===== PARALLAX FLOATING ELEMENTS ===== */}
      <div className="pointer-events-none fixed inset-0 z-0" style={{ overflow: 'clip', width: '100vw' }}>
        <img
          src="/mani_flotante.png"
          alt=""
          className={cn(
            "absolute -left-16 w-48 animate-float-slow transition-all duration-700 ease-out max-[768px]:w-28 max-[768px]:-left-10",
            currentTheme.isDark ? "opacity-90 drop-shadow-2xl brightness-110" : "opacity-80 mix-blend-multiply"
          )}
          style={{ top: `${Math.max(20, 40 - scrollY * 0.05)}%`, transform: `rotate(${scrollY * 0.05}deg)` }}
        />

        <img
          src="/soya_flotante.png"
          alt=""
          className={cn(
            "absolute -right-20 w-56 animate-float-medium transition-all duration-700 ease-out max-[768px]:w-32 max-[768px]:-right-14",
            currentTheme.isDark ? "opacity-90 drop-shadow-2xl brightness-110" : "opacity-70 mix-blend-multiply"
          )}
          style={{ top: `${Math.max(40, 60 - scrollY * 0.03)}%`, transform: `rotate(${-scrollY * 0.03}deg)` }}
        />

        <img
          src="/mani_flotante.png"
          alt=""
          className={cn(
            "absolute right-[15%] w-24 animate-float-slow transition-all duration-700 ease-out blur-[2px] max-[768px]:w-16 max-[768px]:right-[5%]",
            currentTheme.isDark ? "opacity-60 drop-shadow-lg" : "opacity-50 mix-blend-multiply"
          )}
          style={{ top: `${Math.max(10, 30 - scrollY * 0.04)}%`, transform: `rotate(${scrollY * 0.1}deg)` }}
        />
      </div>

      <div className="relative z-10">
        {/* ===== HERO CAROUSEL ===== */}
        <div className={cn("relative z-20 transition-colors duration-700 ease-in-out", currentTheme.bg)}>
          <HeroCarousel />
        </div>

        {/* ===== FEATURES BAR ===== */}
        <section className={cn("py-10 md:py-12 border-b backdrop-blur-sm transition-colors duration-700", currentTheme.isDark ? "bg-black/10 border-white/10" : "bg-background/50 border-border/50")}>
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 stagger-children">
              {[
                { icon: Truck, text: "Envío Rápido" },
                { icon: Shield, text: "Pago Seguro" },
                { icon: Star, text: "Calidad Garantizada" },
                { icon: Headphones, text: "Soporte 24/7" },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="scroll-reveal flex flex-col items-center text-center gap-3"
                >
                  <div className={cn("h-14 w-14 rounded-[1.25rem] flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm", currentTheme.isDark ? "bg-white/10 text-white" : "bg-primary/10 text-primary")}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== MÁS VENDIDOS ===== */}
        <section className="py-16 md:py-24">
          <div className="container-custom">
            <div className="text-center mb-12 scroll-reveal">
              <span className={cn("font-medium text-sm uppercase tracking-wider px-4 py-1.5 rounded-full", currentTheme.isDark ? "bg-white/20 text-white" : "text-primary bg-primary/10")}>
                Lo Más Popular
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-6 mb-4">
                Nuestros Productos Estrella
              </h2>
              <p className={cn("max-w-2xl mx-auto text-lg", currentTheme.isDark ? "text-white/80" : "text-muted-foreground")}>
                Del campo a tu mesa, llevamos la mejor calidad en productos derivados del maní y soya, garantizando frescura, confianza y excelencia en cada entrega.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 stagger-children relative">
              {bestSellers.map((product) => (
                <div key={product.id} className="scroll-reveal w-full sm:w-[300px] flex">
                  {/* Wrap product card in a div that enforces light mode text if needed, since ProductCard uses foreground colors */}
                  <div className="text-foreground text-left w-full flex">
                    <ProductCard product={product} />
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12 scroll-reveal">
              <Button variant="default" size="lg" asChild className={cn("group rounded-full px-8 h-14 text-lg", currentTheme.isDark ? "bg-white text-primary hover:bg-white/90" : "")}>
                <Link to="/productos">
                  Ver todo el catálogo
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ===== NOSOTROS ===== */}
        <section className="py-16 md:py-32 relative">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />

          <div className="container-custom relative z-10">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="scroll-reveal-left">
                <div className="flex items-center gap-3 mb-4">
                  <span className={cn("font-medium text-sm uppercase tracking-wider px-4 py-1.5 rounded-full", currentTheme.isDark ? "bg-white/20 text-white" : "text-accent bg-accent/10")}>
                    Sobre Nosotros
                  </span>
                </div>
                <h2 className="font-display text-4xl md:text-6xl font-bold mt-2 mb-6 leading-tight">
                  Nuestra Historia Cultivada
                </h2>
                <div className="space-y-6 text-lg">
                  <p className={cn("leading-relaxed", currentTheme.isDark ? "text-white/90" : "text-muted-foreground")}>
                    <strong className="font-bold">Agroindustrias Yapumax</strong> es una empresa agroindustrial especializada en la producción y comercialización de productos derivados del maní y soya. Trabajamos directamente desde el origen para garantizar productos frescos, seguros y de excelente calidad, abasteciendo a clientes mayoristas y minoristas con un servicio confiable y comprometido con la satisfacción de cada cliente.
                  </p>
                  <p className={cn("leading-relaxed", currentTheme.isDark ? "text-white/90" : "text-muted-foreground")}>
                    En Agroindustrias Yapumax nos enfocamos en ofrecer productos elaborados bajo estrictos estándares de <strong className={currentTheme.isDark ? "text-white font-black" : "text-primary"}>Calidad & Lealtad</strong>. Cada lote pasa por un cuidadoso proceso de selección, limpieza y control, asegurando un producto fresco, natural y con todas sus propiedades nutricionales.
                  </p>
                </div>
                <div className="mt-10">
                  <Button asChild className={cn("group rounded-full px-8 h-14 text-lg", currentTheme.isDark ? "bg-white text-accent hover:bg-white/90" : "bg-cta hover:bg-cta/90 text-white")}>
                    <Link to="/nosotros">
                      Conoce nuestro proceso
                      <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="scroll-reveal-right">
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-black/20 to-black/5 shadow-2xl border-4 border-white/10 group">
                    <img
                      src="/about_us/central_camion_exportador.jpeg"
                      alt="Nuestra central exportadora"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    {/* Decorative leaf corner */}
                    <img
                      src="/hoja_deco_imagenes.png"
                      alt=""
                      className="absolute -bottom-6 -left-6 w-24 sm:w-32 drop-shadow-2xl z-10 transition-all duration-500 ease-out group-hover:-translate-y-4 group-hover:translate-x-4 group-hover:rotate-12 group-hover:scale-110 scale-x-[-1]"
                    />
                  </div>
                  <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-black/20 to-black/5 mt-16 shadow-2xl border-4 border-white/10 group">
                    <img
                      src="/about_us/sacos.jpg"
                      alt="Nuestros sacos listos"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    {/* Decorative leaf corner */}
                    <img
                      src="/hoja_deco_imagenes.png"
                      alt=""
                      className="absolute -bottom-6 -right-6 w-24 sm:w-32 drop-shadow-2xl z-10 transition-all duration-500 ease-out group-hover:-translate-y-4 group-hover:-translate-x-4 group-hover:-rotate-12 group-hover:scale-110"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== GALERÍA DE IMÁGENES (nueva sección) ===== */}
        <section className={cn("py-12 md:py-20 transition-colors duration-700", currentTheme.isDark ? "bg-black/5" : "bg-primary/5")}>
          <div className="container-custom mb-12">
            <div className="text-center scroll-reveal">
              <span className={cn("font-medium text-sm uppercase tracking-wider px-4 py-1.5 rounded-full", currentTheme.isDark ? "bg-white/20 text-white" : "text-primary bg-primary/10")}>
                Nuestra Producción
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-6 mb-4">
                Del Campo a tu Mesa
              </h2>
              <p className={cn("max-w-2xl mx-auto text-lg", currentTheme.isDark ? "text-white/80" : "text-muted-foreground")}>
                Cada paso de nuestro proceso garantiza la máxima calidad y frescura en cada producto.
              </p>
            </div>
          </div>
          <div className="scroll-reveal opacity-90 hover:opacity-100 transition-opacity">
            <InfiniteGallery
              rowOneImages={galleryImages.rowOne}
              rowTwoImages={galleryImages.rowTwo}
              speed={25}
            />
          </div>
        </section>

        {/* ===== MAPA MUNDIAL ===== */}
        <WorldMapSection />

        {/* ===== GALERÍA ANIMADA ANTES DE TESTIMONIOS ===== */}
        <ImageGallerySection />

        {/* ===== TESTIMONIOS ===== */}
        {/*
        <section className={cn("py-16 md:py-32 overflow-hidden transition-colors duration-700", currentTheme.isDark ? "bg-black/10" : "bg-white/40 backdrop-blur-md")}>
          <div className="container-custom">
            <div className="text-center mb-16 scroll-reveal">
              <span className={cn("font-medium text-sm uppercase tracking-wider px-4 py-1.5 rounded-full", currentTheme.isDark ? "bg-white/20 text-white" : "text-accent bg-accent/10")}>
                Nuestros Clientes
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-6 mb-4">
                Lo que dicen de nosotros
              </h2>
            </div>

            <TestimonialsCarousel currentTheme={currentTheme} />
          </div>
        </section>
        */}
        {/* ===== CONTACTO — Nuttin-style ===== */}
        <ContactSection />
      </div>
    </div>
  );
};

export default Index;
