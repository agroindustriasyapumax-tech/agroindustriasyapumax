import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Keep the preloader for 2 seconds, then animate out.
    const timer = setTimeout(() => {
      setLoading(false);
      // Wait for the slide-up animation to finish before removing from DOM
      setTimeout(() => setVisible(false), 800);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.7,0,0.3,1)] overflow-hidden",
        !loading && "-translate-y-full" // The "garage door" sliding up effect
      )}
    >
      <div className="flex flex-col items-center gap-8 px-4 text-center">
        {/* Giant Logo */}
        <div className="relative">
          <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl scale-150 animate-pulse-soft" />
          <img
            src="/logo.png"
            alt="Agroindustrias Yapumax"
            className="w-56 md:w-80 lg:w-96 h-auto object-contain relative z-10 animate-float"
          />
        </div>

        {/* Loading text and progress indicator */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-48 md:w-64 h-2 rounded-full bg-muted overflow-hidden relative">
            <div className="absolute top-0 left-0 h-full rainbow-gradient animate-fill-bar" />
          </div>
        </div>
      </div>

      {/* Thick rainbow bar at the bottom acting as the garage door edge */}
      <div className="absolute bottom-0 left-0 w-full h-6 md:h-8 rainbow-gradient shadow-[0_-10px_30px_rgba(0,0,0,0.1)]" />
    </div>
  );
};
