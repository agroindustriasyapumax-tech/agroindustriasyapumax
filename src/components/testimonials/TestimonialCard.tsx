import { Testimonial } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <Card className="bg-card h-full hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <Quote className="h-8 w-8 text-primary/20 mb-4" />

        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < testimonial.rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>

        <p className="text-sm text-muted-foreground mb-4 italic leading-relaxed">
          "{testimonial.content}"
        </p>

        <div className="flex items-center gap-3">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="h-10 w-10 rounded-full object-cover"
            loading="lazy"
          />
          <div>
            <p className="font-medium text-sm">{testimonial.name}</p>
            <p className="text-xs text-muted-foreground">
              {new Date(testimonial.date).toLocaleDateString("es-PE", {
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
