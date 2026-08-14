import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { heroSlides } from "@/data/mockData";
import { cn } from "@/lib/utils";

export const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  // Reset zoom key to restart animation on slide change
  const [zoomKey, setZoomKey] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(index);
      setZoomKey((k) => k + 1);
      setTimeout(() => setIsTransitioning(false), 700);
    },
    [isTransitioning]
  );

  const next = useCallback(() => {
    goTo((current + 1) % heroSlides.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + heroSlides.length) % heroSlides.length);
  }, [current, goTo]);

  // Autoplay
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative w-full overflow-hidden rounded-b-[2.5rem]" aria-label="Carrusel principal">
      {/* Slides */}
      <div className="relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-[85vh]">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 flex items-end transition-all duration-700 ease-in-out",
              index === current
                ? "opacity-100 translate-x-0 z-10"
                : index < current
                  ? "opacity-0 -translate-x-full z-0"
                  : "opacity-0 translate-x-full z-0"
            )}
            aria-hidden={index !== current}
          >
            {/* Background image with slow zoom */}
            {slide.image && (
              <div
                key={`zoom-${zoomKey}-${index}`}
                className={cn(
                  "absolute inset-0 bg-cover bg-center",
                  index === current && "animate-hero-zoom"
                )}
                style={{ backgroundImage: `url(${slide.image})`, transformOrigin: "center center" }}
              />
            )}

            {/* Background gradient overlay — minimal, only for contrast */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-br",
                slide.image ? "opacity-0" : "opacity-100",
                slide.gradient
              )}
            />

            {/* Strong bottom-to-top gradient for text readability (Nuttin-style) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Decorative shapes and floating leaves */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
              
              {/* Floating Leaves */}
              <img 
                src="/hojas-flotantes.png" 
                alt="" 
                className="absolute top-[10%] -right-12 w-48 md:w-80 opacity-90 drop-shadow-2xl animate-float-slow z-20"
              />
              <img 
                src="/hojas-flotantes.png" 
                alt="" 
                className="absolute bottom-[30%] -left-16 w-32 md:w-64 opacity-70 drop-shadow-xl animate-float-medium scale-x-[-1] blur-[2px] z-20 rotate-12"
              />
            </div>

            {/* Content — positioned at bottom with padding */}
            <div className="container-custom relative z-10 text-white pb-28 sm:pb-32 lg:pb-36">
              <div className="max-w-4xl">
                <h2
                  className={cn(
                    "font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-4 sm:mb-6 transition-all duration-700 delay-200",
                    index === current
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  )}
                >
                  {slide.title}
                  {slide.titleHighlight && (
                    <span className="relative inline-block">
                      {/* Highlight bar behind text */}
                      <span className="absolute -inset-x-2 bottom-0 h-[35%] bg-accent/60 rounded-lg -z-10" />
                      <span className="italic text-white">{slide.titleHighlight}</span>
                    </span>
                  )}
                  {slide.titleEnd}
                </h2>
                <p
                  className={cn(
                    "text-base sm:text-lg md:text-xl text-white/80 leading-relaxed mb-6 sm:mb-8 max-w-2xl transition-all duration-700 delay-300",
                    index === current
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  )}
                >
                  {slide.subtitle}
                </p>
                <div
                  className={cn(
                    "transition-all duration-700 delay-[400ms]",
                    index === current
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  )}
                >
                  <Button
                    size="lg"
                    variant="default"
                    className="group text-base shadow-xl rounded-full px-7 sm:px-8 h-12 sm:h-14 bg-primary hover:bg-primary/90"
                    asChild
                  >
                    <Link to={slide.ctaLink}>
                      {slide.cta}
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation and Dots Container */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 sm:gap-6">
        {/* Dots */}
        <div className="flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={cn(
                "h-2 sm:h-3 rounded-full transition-all duration-500",
                index === current
                  ? "w-8 sm:w-10 bg-primary"
                  : "w-2 sm:w-3 bg-white/50 hover:bg-white/80"
              )}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows (below dots) */}
        <div className="flex gap-3 sm:gap-4">
          <button
            onClick={prev}
            className="h-9 w-9 sm:h-12 sm:w-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-lg hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110 border border-white/20"
            aria-label="Slide anterior"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button
            onClick={next}
            className="h-9 w-9 sm:h-12 sm:w-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-lg hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110 border border-white/20"
            aria-label="Slide siguiente"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
