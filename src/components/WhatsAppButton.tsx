import { socialLinks } from "@/data/mockData";

export const WhatsAppButton = () => {
  const phoneNumber = socialLinks.whatsapp.replace("https://wa.me/", "");
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent("¡Hola! Me interesa obtener más información.")}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group"
    >
      {/* Tooltip */}
      <span className="hidden sm:block bg-card text-card-foreground text-sm font-medium px-4 py-2 rounded-full shadow-lg border border-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        ¿Necesitas ayuda?
      </span>

      {/* Button */}
      <span className="relative flex items-center justify-center h-14 w-14 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 animate-pulse-soft">
        <img
          src="/logo_whatsapp.png"
          alt="WhatsApp"
          className="h-full w-full object-contain drop-shadow-md"
        />

        {/* Ping indicator */}
        <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-red-500 border-2 border-white z-10" />
      </span>
    </a>
  );
};
