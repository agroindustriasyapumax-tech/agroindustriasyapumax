import { Link } from "react-router-dom";
import { Facebook, Instagram, MessageCircle, Mail, FileText } from "lucide-react";
import { socialLinks } from "@/data/mockData";

const TikTokIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .56.04.83.12V9.36a6.33 6.33 0 0 0-1-.08A6.26 6.26 0 0 0 3 15.55a6.26 6.26 0 0 0 10.59 4.43V12.1a8.28 8.28 0 0 0 4.84 1.55V10.2a4.85 4.85 0 0 1-2.84-.96A4.8 4.8 0 0 1 19.59 6.69z" />
  </svg>
);

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border relative">
      <div className="h-[3px] w-full brand-gradient absolute top-0 left-0 rounded-b-full" />
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand */}
          <div className="md:col-span-2 lg:col-span-4">
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
                href={socialLinks.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en TikTok"
                className="h-11 w-11 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
              >
                <TikTokIcon className="h-5 w-5" />
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
          <div className="lg:col-span-2">
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
          <div className="lg:col-span-3">
            <h4 className="font-display text-lg font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="mailto:agroindustriasyapumax@gmail.com"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  <span className="break-all text-xs">agroindustriasyapumax@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Facebook className="h-4 w-4 shrink-0" />
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
                  <Instagram className="h-4 w-4 shrink-0" />
                  @agro_yapumax
                </a>
              </li>
              <li>
                <a
                  href={socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <TikTokIcon className="h-4 w-4 shrink-0" />
                  TikTok
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-3">
            <h4 className="font-display text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/terminos" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <FileText className="h-3.5 w-3.5" />
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://drive.google.com/file/d/1YykLaVK2LCmsFPM65zc3K7v0-ydMR1vI/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block hover:opacity-80 transition-opacity"
                  >
                    <img
                      src="/logo_reclamaciones.png"
                      alt="Libro de Reclamaciones"
                      className="w-full max-w-[150px] object-contain"
                    />
                  </a>
                  <p className="text-[10px] leading-tight text-muted-foreground">
                    Conforme a lo establecido en el Código de Protección y Defensa del Consumidor, este establecimiento cuenta con un Libro de Reclamaciones Virtual a tu disposición. Para registrar una queja o reclamo, haz clic en el logotipo, descarga el formato editable, complétalo y envíalo al correo electrónico: agroindustriasyapumax@gmail.com.
                  </p>
                </div>
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
