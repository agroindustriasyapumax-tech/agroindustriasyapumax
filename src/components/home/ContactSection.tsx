import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export const ContactSection = () => {
  const scrollRef = useScrollReveal();
  const { toast } = useToast();
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mensaje enviado",
      description: "Nos pondremos en contacto contigo lo antes posible.",
    });
  };

  return (
    <section ref={scrollRef} className="relative overflow-hidden w-full">
      {/* Warm beige background — explicitly opaque to prevent bleed from parent dark modes */}
      <div className="bg-gradient-to-br from-[#f8f5ee] via-[#f1eee4] to-[#e8e4da] py-16 md:py-28 w-full">
        {/* Floating product images — decorative */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            src="/mani_flotante.png"
            alt=""
            className="absolute top-[10%] left-[45%] w-28 md:w-40 opacity-40 rotate-12 animate-float-slow drop-shadow-2xl"
          />
          <img
            src="/soya_flotante.png"
            alt=""
            className="absolute top-[5%] left-[35%] w-20 md:w-28 opacity-30 -rotate-6 animate-float-medium drop-shadow-xl"
          />
          <img
            src="/mantequilla_flotante.png"
            alt=""
            className="absolute bottom-[15%] left-[40%] w-24 md:w-36 opacity-30 rotate-6 animate-float-reverse drop-shadow-2xl"
          />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left — Text */}
            <div className="scroll-reveal-left">
              <span className="font-medium text-sm uppercase tracking-wider px-4 py-1.5 rounded-full text-[#B5BF32] bg-[#B5BF32]/10">
                Contacto
              </span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-6 mb-6 leading-[1.1] text-[#2C3316]">
                ¿Quieres conocer más sobre nuestros productos o explorar oportunidades de negocio?
              </h2>
              <p className="text-lg text-[#2C3316]/80 mb-6 max-w-md">
                Completa el formulario y nos pondremos en contacto contigo a la brevedad.
              </p>
              <p className="text-[#2C3316]/80">
                También puedes escribirnos directamente a{" "}
                <a
                  href="mailto:agroindustriasyapumax@gmail.com"
                  className="font-bold text-[#2C3316] hover:text-[#B5BF32] transition-colors underline decoration-[#B5BF32]/50 underline-offset-4"
                >
                  agroindustriasyapumax@gmail.com
                </a>
              </p>
            </div>

            {/* Right — Contact Form */}
            <div className="scroll-reveal-right">
              <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-black/5">
                <h3 className="font-display text-2xl font-bold mb-6 text-[#2C3316]">
                  Formulario de Contacto
                </h3>
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="home-message"
                      className="text-xs font-bold uppercase tracking-wider text-[#2C3316]/70"
                    >
                      Mensaje
                    </label>
                    <Textarea
                      id="home-message"
                      placeholder="Escribe tu mensaje aquí..."
                      rows={4}
                      required
                      className="rounded-xl border-2 bg-transparent text-[#2C3316] border-[#2C3316]/10 focus-visible:ring-0 focus-visible:border-[#B5BF32] resize-none transition-colors"
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
                      <Link to="/terminos" target="_blank" className="text-primary font-semibold underline underline-offset-2 hover:text-[#B5BF32] transition-colors">
                        Términos y Condiciones
                      </Link>{" "}
                      y las Políticas de Privacidad.
                    </span>
                  </label>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={!acceptedTerms}
                    className="w-full h-14 rounded-full text-lg font-bold group shadow-lg bg-[#D9A527] hover:bg-[#D9A527]/90 text-white border-none"
                  >
                    Enviar
                    <Send className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
