import { useEffect, useState } from "react";
import { testimonials } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeState } from "@/pages/Index";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

export const TestimonialsCarousel = ({ currentTheme }: { currentTheme: ThemeState }) => {
  const [api, setApi] = useState<CarouselApi>();

  // Auto-scroll logic
  useEffect(() => {
    if (!api) {
      return;
    }

    const intervalId = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 4000);

    return () => clearInterval(intervalId);
  }, [api]);

  return (
    <div className="w-full max-w-5xl mx-auto mt-12 px-12">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4 md:-ml-6">
          {testimonials.map((t) => (
            <CarouselItem key={t.id} className="pl-4 md:pl-6 md:basis-1/2">
              <Card
                className={cn(
                  "border-none shadow-xl hover:-translate-y-1 transition-all duration-300 h-full rounded-[2rem]",
                  currentTheme.isDark
                    ? "bg-white/10 backdrop-blur-md text-white"
                    : "bg-background/90 backdrop-blur-sm"
                )}
              >
                <CardContent className="p-8 md:p-10 flex flex-col h-full">
                  <Quote
                    className={cn(
                      "h-10 w-10 mb-6",
                      currentTheme.isDark ? "text-white/20" : "text-accent/20"
                    )}
                  />
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < t.rating
                            ? "text-secondary fill-secondary drop-shadow-sm"
                            : currentTheme.isDark
                            ? "text-white/20"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p
                    className={cn(
                      "text-lg mb-6 italic leading-relaxed font-light flex-grow",
                      currentTheme.isDark ? "text-white/90" : "text-muted-foreground"
                    )}
                  >
                    "{t.content}"
                  </p>
                  <div>
                    <p
                      className={cn(
                        "text-base font-bold",
                        currentTheme.isDark ? "text-white" : "text-primary"
                      )}
                    >
                      {t.name}
                    </p>
                    <p
                      className={cn(
                        "text-sm",
                        currentTheme.isDark ? "text-white/60" : "text-muted-foreground/60"
                      )}
                    >
                      {new Date(t.date).toLocaleDateString("es-PE", {
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious 
          className={cn(
            "flex -left-4 md:-left-12 border-none transition-colors",
            currentTheme.isDark 
              ? "bg-white/20 text-white hover:bg-white hover:text-primary" 
              : "bg-primary/10 text-primary hover:bg-primary hover:text-white"
          )} 
        />
        <CarouselNext 
          className={cn(
            "flex -right-4 md:-right-12 border-none transition-colors",
            currentTheme.isDark 
              ? "bg-white/20 text-white hover:bg-white hover:text-primary" 
              : "bg-primary/10 text-primary hover:bg-primary hover:text-white"
          )} 
        />
      </Carousel>
    </div>
  );
};
