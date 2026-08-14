import { cn } from "@/lib/utils";

interface InfiniteGalleryProps {
  /** Images for the first row (scrolls right) */
  rowOneImages: string[];
  /** Images for the second row (scrolls left) */
  rowTwoImages: string[];
  /** Speed in seconds for one full cycle */
  speed?: number;
}

/**
 * Double-row infinite scrolling gallery.
 * Row 1 moves to the right, Row 2 moves to the left.
 * Pure CSS animation — GPU accelerated, no JS runtime cost.
 */
export const InfiniteGallery = ({
  rowOneImages,
  rowTwoImages,
  speed = 30,
}: InfiniteGalleryProps) => {
  // Duplicate images to create seamless loop
  const row1 = [...rowOneImages, ...rowOneImages];
  const row2 = [...rowTwoImages, ...rowTwoImages];

  return (
    <div className="w-full overflow-hidden space-y-4" aria-hidden="true">
      {/* Row 1 — scrolls right */}
      <div
        className="flex gap-4 animate-scroll-right"
        style={{
          animationDuration: `${speed}s`,
          width: `${row1.length * 280}px`,
        }}
      >
        {row1.map((src, i) => (
          <div
            key={`r1-${i}`}
            className="flex-shrink-0 w-64 h-44 md:w-72 md:h-48 rounded-[1.5rem] overflow-hidden relative group"
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            {/* Brand color gradient overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/10 to-accent/15 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Row 2 — scrolls left */}
      <div
        className="flex gap-4 animate-scroll-left"
        style={{
          animationDuration: `${speed}s`,
          width: `${row2.length * 280}px`,
        }}
      >
        {row2.map((src, i) => (
          <div
            key={`r2-${i}`}
            className="flex-shrink-0 w-64 h-44 md:w-72 md:h-48 rounded-[1.5rem] overflow-hidden relative group"
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            {/* Brand color gradient overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/10 to-accent/15 pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
};
