import { Link } from "react-router-dom";
import { Facebook, Instagram, MessageCircle, Mail } from "lucide-react";
import { socialLinks } from "@/data/mockData";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border relative">
      <div className="h-[3px] w-full brand-gradient absolute top-0 left-0 rounded-b-full" />
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <img
                src="/logo.png"
                alt="Agroindustrias Yapumax"
                className="h-14 md:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105 dark:bg-white/90 dark:rounded-2xl dark:p-1"
              />
            </Link>
            <p className="text-muted-foreground text-sm max-w-md mb-6">
              Agroindustrias Yapumax. Llevamos a tu mesa la máxima calidad en
              derivados de maní y productos agroindustriales premium, bajo
              nuestros pilares de Calidad & Lealtad.
            </p>
            <div className="flex gap-3">
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en Facebook"
                className="h-11 w-11 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en Instagram"
                className="h-11 w-11 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contáctanos por WhatsApp"
                className="h-11 w-11 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/productos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Productos
                </Link>
              </li>
              <li>
                <Link to="/nosotros" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="mailto:contacto@yapumax.com"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  contacto@yapumax.com
                </a>
              </li>
              <li>
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Facebook className="h-4 w-4" />
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                  @agroindustrias_yapumax
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} Agroindustrias Yapumax. Todos los derechos reservados.
          </p>
          <a
            href="https://jatzlabai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground hover:text-primary transition-all duration-300 group"
          >
            <span>Web Design by</span>
            <span className="font-semibold group-hover:text-primary transition-colors">JatzLabAI</span>
            <img
              src="/jatzlab_logo.png"
              alt="JatzLabAI Logo"
              className="h-5 md:h-6 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};
