import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X, Leaf } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCartContext } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Productos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems, openCart } = useCartContext();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-card/95 backdrop-blur-xl shadow-md border-b border-border/50"
          : "bg-card/80 backdrop-blur-sm"
      )}
    >
      {/* Thin brand gradient accent bar */}
      <div className={cn(
        "w-full brand-gradient transition-all duration-500",
        isScrolled ? "h-[2px] rounded-b-full" : "h-[3px]"
      )} />
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-24">
          {/* Logo */ }
          <Link
            to="/"
            onClick={handleHomeClick}
            className="flex items-center gap-2 group py-1"
          >
            <img
              src="/logo.png"
              alt="Agroindustrias Yapumax"
              className="h-10 md:h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105 dark:bg-white/90 dark:rounded-2xl dark:p-1"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={(e) => {
                  if (location.pathname === link.href) {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className={cn(
                  "flex items-center gap-2 text-base font-medium transition-all duration-300 relative group",
                  isActive(link.href) 
                    ? "text-primary dark:text-primary" 
                    : "text-muted-foreground hover:text-primary dark:hover:text-primary"
                )}
              >
                {link.label}
                {isActive(link.href) && <Leaf className="h-4 w-4" />}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-0.5 rounded-full bg-primary dark:bg-primary transition-all duration-300",
                    isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full"
              onClick={openCart}
              aria-label="Abrir carrito de compras"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-cta text-cta-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-scale-in">
                  {totalItems}
                </span>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <nav className="py-4 border-t border-border">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={(e) => {
                    if (location.pathname === link.href) {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                    setIsMenuOpen(false);
                  }}
                  className={cn(
                    "px-4 py-3 rounded-2xl text-sm font-medium transition-colors flex items-center gap-2",
                    isActive(link.href)
                      ? "bg-primary/15 dark:bg-primary/20 text-primary dark:text-primary"
                      : "text-foreground hover:bg-primary/5"
                  )}
                >
                  {link.label}
                  {isActive(link.href) && <Leaf className="h-4 w-4" />}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
