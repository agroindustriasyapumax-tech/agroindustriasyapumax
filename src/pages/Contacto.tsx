import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { MapPin, Phone, Mail, Clock, Send, ShieldCheck, Truck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SEOHead } from "@/components/SEOHead";

const Contacto = () => {
  const scrollRef = useScrollReveal();
  const { toast } = useToast();
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mensaje enviado",
      description: "Nos pondremos en contacto contigo lo antes posible.",
    });
  };

  return (
    <div ref={scrollRef} className="flex flex-col min-h-screen bg-background transition-colors duration-500">
      <SEOHead
        title="Contacto"
        description="Contáctanos para pedidos mayoristas, cotizaciones y consultas sobre maní y soya. Ubicados en La Victoria, Lima, Perú. Atención por WhatsApp, correo y redes sociales."
        path="/contacto"
      />

      {/* Header Block */}
      <div className="relative pt-36 pb-24 text-accent-foreground overflow-hidden rounded-b-[3rem]">
        {/* Background Image & Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url('/about_us/central_camion_exportador.jpeg')` }}
        />
        <div className="absolute inset-0 bg-black/55 z-0" />
        <div className="absolute inset-0 z-0" style={{ background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)' }} />

        <div className="mx-auto max-w-7xl px-6 relative z-10 drop-shadow-md">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-white animate-fade-in">
            Atención al Cliente
          </p>
          <h1 className="mt-6 max-w-4xl font-display text-5xl font-bold leading-[1.05] md:text-7xl text-white animate-fade-in-up">
            Hablemos de <span className="italic text-secondary">Negocios</span> y crecimiento.
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-primary-foreground/80 leading-relaxed animate-fade-in-up animation-delay-100">
            Estamos listos para atender tus pedidos mayoristas, cotizaciones o resolver cualquier duda sobre nuestra producción.
          </p>
        </div>
      </div>

      {/* Interactive Contact Section with Floating Items */}
      <div className="relative w-full overflow-hidden">
        {/* Floating Background Items */}
        <div className="absolute inset-0 pointer-events-none z-0 hidden md:block">
          <img
            src="/soya_flotante.png"
            alt=""
            className="absolute top-[5%] left-[-2%] w-48 opacity-40 animate-float drop-shadow-2xl blur-[1px]"
          />
          <img
            src="/mani_flotante.png"
            alt=""
            className="absolute top-[35%] right-[-3%] w-64 opacity-40 animate-float-delayed drop-shadow-2xl blur-[2px]"
          />
          <img
            src="/soya_flotante.png"
            alt=""
            className="absolute bottom-[10%] left-[8%] w-40 opacity-30 animate-float drop-shadow-xl"
          />
          <img
            src="/mani_flotante.png"
            alt=""
            className="absolute bottom-[25%] right-[10%] w-32 opacity-20 animate-float-delayed drop-shadow-lg blur-[3px]"
          />
        </div>

        <div className="container-custom py-16 md:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left Column: Info & Trust signals */}
            <div className="space-y-12 scroll-reveal">
              <div className="bg-white/80 backdrop-blur-sm dark:bg-card/90 rounded-3xl p-8 border border-border shadow-2xl">
                <h3 className="font-display text-2xl font-semibold mb-8 text-foreground">Información de Contacto</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <MapPin className="h-6 w-6 text-secondary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-lg text-foreground">Nuestra Planta</p>
                      <p className="text-muted-foreground leading-relaxed">Pje Pisagua 445-215, La Victoria 15018 <br />Lima, Perú</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Phone className="h-6 w-6 text-accent" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-lg text-foreground">Llámanos</p>
                      <p className="text-muted-foreground">+51 944 221 793</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Mail className="h-6 w-6 text-blue-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-lg text-foreground">Correo Electrónico</p>
                      <p className="text-muted-foreground break-all">agroindustriasyapumax@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Clock className="h-6 w-6 text-purple-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-lg text-foreground">Horario de Atención</p>
                      <p className="text-muted-foreground">Lunes a viernes 8:00 AM - 5:30 PM<br />Sábados 8:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/80 backdrop-blur-sm dark:bg-card/90 rounded-2xl p-6 border border-border shadow-lg flex items-center gap-4 hover:-translate-y-1 transition-transform">
                  <ShieldCheck className="h-8 w-8 text-accent shrink-0" />
                  <span className="font-medium text-foreground text-sm sm:text-base">Calidad <br />Garantizada</span>
                </div>
                <div className="bg-white/80 backdrop-blur-sm dark:bg-card/90 rounded-2xl p-6 border border-border shadow-lg flex items-center gap-4 hover:-translate-y-1 transition-transform">
                  <Truck className="h-8 w-8 text-secondary shrink-0" />
                  <span className="font-medium text-foreground text-sm sm:text-base">Despachos <br />Nacionales</span>
                </div>
              </div>
            </div>

            {/* Right Column: Floating Form */}
            <div className="scroll-reveal md:-mt-24 relative z-20">
              <div className="bg-white/95 backdrop-blur-md dark:bg-card/95 rounded-[2.5rem] p-6 sm:p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-border text-foreground relative">
                <div className="absolute top-0 right-8 md:right-12 w-16 md:w-24 h-2 bg-secondary rounded-b-xl" />

                <h2 className="font-display text-3xl font-bold mb-2">Envíanos un mensaje</h2>
                <p className="text-muted-foreground mb-8">Completa el formulario y un asesor se pondrá en contacto contigo.</p>

                <form onSubmit={handleSubmit} className="space-y-6">


                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-semibold text-foreground">Mensaje</label>
                    <Textarea
                      id="message"
                      placeholder="¿En qué te podemos ayudar? (Volúmenes, cotizaciones, etc.)"
                      rows={5}
                      required
                      className="rounded-xl border-2 bg-muted/20 focus-visible:ring-0 focus-visible:border-primary resize-none"
                    />
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary accent-primary shrink-0"
                    />
                    <span className="text-sm text-muted-foreground leading-snug">
                      He leído y acepto los{" "}
                      <Link to="/terminos" target="_blank" className="text-primary font-semibold underline underline-offset-2 hover:text-accent transition-colors">
                        Términos y Condiciones
                      </Link>{" "}
                      y las Políticas de Privacidad.
                    </span>
                  </label>

                  <Button type="submit" size="lg" className="w-full h-14 rounded-xl text-lg font-bold group shadow-lg shadow-primary/20" disabled={!acceptedTerms}>
                    Enviar Mensaje
                    <Send className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              </div>
            </div>

          </div>
        </div>

        {/* Map Section */}
        <div className="container-custom pb-16 md:pb-24 relative z-10">
          <div className="text-center mb-12 scroll-reveal-up">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Ubícanos
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Visítanos en nuestras instalaciones. Estamos ubicados estratégicamente para ofrecerte el mejor servicio y distribución.
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm dark:bg-card/90 rounded-[2.5rem] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-border overflow-hidden scroll-reveal-up">
            <div className="rounded-[2rem] overflow-hidden h-[500px] md:h-[650px] w-full relative group">
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.6400555996543!2d-77.00941430000002!3d-12.068268399999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c70062ca451b%3A0x8e134556414159c7!2sAgro%20Industrias%20Yapumax!5e0!3m2!1ses!2spe!4v1786742582791!5m2!1ses!2spe"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Ubicación"
                className="grayscale-[20%] contrast-[1.1] hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Contacto;
