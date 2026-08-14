import { useEffect, useRef, useCallback } from "react";

/**
 * Custom hook that uses IntersectionObserver to reveal elements on scroll.
 * Performance-optimized: uses GPU-accelerated CSS classes (transform + opacity).
 * 
 * Usage:
 *   const containerRef = useScrollReveal();
 *   <div ref={containerRef}>
 *     <div className="scroll-reveal">...</div>
 *     <div className="scroll-reveal-left">...</div>
 *   </div>
 */
export const useScrollReveal = (threshold = 0.1, rootMargin = "0px 0px -40px 0px") => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleIntersect = useCallback((entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const query = ".scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale";

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      const elements = container.querySelectorAll(query);
      elements.forEach((el) => el.classList.add("revealed"));
      
      const mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
          mutation.addedNodes.forEach(node => {
            if (node instanceof HTMLElement) {
              if (node.matches(query)) node.classList.add("revealed");
              node.querySelectorAll(query).forEach(el => el.classList.add("revealed"));
            }
          });
        });
      });
      mutationObserver.observe(container, { childList: true, subtree: true });
      return () => mutationObserver.disconnect();
    }

    const observer = new IntersectionObserver(handleIntersect, {
      threshold,
      rootMargin,
    });

    const observeNodes = (root: HTMLElement) => {
      if (root.matches && root.matches(query)) observer.observe(root);
      root.querySelectorAll(query).forEach((el) => observer.observe(el));
    };

    // Initial observe
    observeNodes(container);

    // Watch for dynamically added elements
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            observeNodes(node);
          }
        });
      });
    });

    mutationObserver.observe(container, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [threshold, rootMargin, handleIntersect]);

  return containerRef;
};
