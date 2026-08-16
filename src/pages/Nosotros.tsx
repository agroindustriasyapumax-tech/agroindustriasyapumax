import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Shield, Heart, Users, MessageCircle, Award, Handshake, Lightbulb, Wheat, Search, Apple } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { WorldMapSection } from "@/components/map/WorldMapSection";
import { ContactSection } from "@/components/home/ContactSection";
import { SEOHead } from "@/components/SEOHead";

type ThemeState = { bg: string; text: string; isDark: boolean };

const VALUES = [
  { icon: Award, title: "Calidad", body: "Garantizamos excelencia en nuestros productos agropecuarios y procesos responsables desde la chacra hasta el cliente." },
  { icon: Handshake, title: "Confianza", body: "Construimos relaciones sólidas y duraderas basadas en el servicio, la cercanía y la lealtad mutua." },
  { icon: Lightbulb, title: "Innovación", body: "Invertimos en tecnología especializada para optimizar nuestra producción y mantenernos a la vanguardia de la industria." },
  { icon: Users, title: "Responsabilidad", body: "Trabajamos directamente con agricultores, generando un impacto positivo a largo plazo en toda nuestra cadena de valor." },
];

const TIMELINE = [
  {
    year: "Inicios",
    title: "Nuestros Primeros Pasos",
    body: "Nuestros inicios comenzaron con la elaboración y comercialización de maní molido y maní tostado, trabajando directamente con nuestros clientes y buscando siempre mejorar la calidad de nuestros productos.",
    image: "/carrusel_hero/campo.jpg",
  },
  {
    year: "Crecimiento",
    title: "Conexión con el Origen",
    body: "Fortalecimos nuestras relaciones con proveedores de maní crudo, avanzando hacia la compra directa en la frontera y posteriormente trabajando directamente con agricultores, creando una cadena más cercana.",
    image: "/about_us/central_camion_exportador.jpeg",
  },
  {
    year: "Innovación",
    title: "Tecnología y Producción",
    body: "Desarrollamos nuestra primera tostadora de maní inspirada en tecnología italiana e implementamos un horno especializado que permitió mejorar nuestra producción y atender mayores volúmenes.",
    image: "/products/mani_crudo.png",
  },
  {
    year: "Actualidad",
    title: "Compromiso de Calidad",
    body: "Hoy continuamos creciendo con el compromiso de ofrecer productos agropecuarios de calidad, construyendo relaciones basadas en confianza, servicio y lealtad con todos nuestros clientes.",
    image: "/about_us/sacos.jpg",
  },
];

const STORY_WORDS = [
  { word: "Construimos", italic: false },
  { word: "relaciones", italic: true },
  { word: "basadas", italic: false },
  { word: "en", italic: false },
  { word: "confianza", italic: true },
  { word: "y", italic: false },
  { word: "lealtad.", italic: true },
];

const PEANUT_SECTIONS = [
  {
    icon: Wheat,
    title: "Historia del Maní",
    body: "El maní es un alimento de origen sudamericano con una historia que se remonta a miles de años. Fue cultivado por antiguas civilizaciones y, con el paso del tiempo, se expandió hacia diferentes partes del mundo gracias a su alto valor nutricional y versatilidad en la alimentación. Actualmente es uno de los cultivos más importantes para la producción de alimentos y derivados.",
    image: "/carrusel_hero/mani.jpg",
  },
  {
    icon: Search,
    title: "Selección del Maní",
    body: "La calidad del maní comienza desde su selección. Los granos son cuidadosamente clasificados para elegir únicamente aquellos que presentan el tamaño, color y estado adecuados. Posteriormente pasan por procesos de limpieza y clasificación que garantizan un producto uniforme, seguro y listo para su comercialización.",
    image: "/products/mani_molido.png",
  },
  {
    icon: Apple,
    title: "Nutrición del Maní",
    body: "El maní es una excelente fuente de proteínas vegetales, grasas saludables, fibra, vitaminas y minerales esenciales como magnesio, fósforo y vitamina E. Su consumo aporta energía, favorece la salud cardiovascular y contribuye al mantenimiento de una alimentación equilibrada, convirtiéndolo en un alimento altamente nutritivo para personas de todas las edades.",
    image: "/products/mani2.png",
  },
];

const Nosotros = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getTheme = (): ThemeState => {
    if (scrollY < 500) return { bg: "bg-background", text: "text-foreground", isDark: false };
    if (scrollY >= 500 && scrollY < 1800) return { bg: "bg-primary", text: "text-white", isDark: true };
    return { bg: "bg-background", text: "text-foreground", isDark: false };
  };

  const currentTheme = getTheme();

  return (
    <div className={cn("flex flex-col min-h-screen transition-colors duration-700 ease-in-out", currentTheme.bg, currentTheme.text)}>
      <SEOHead
        title="Sobre Nosotros"
        description="Conoce la historia, misión y visión de Agroindustrias Yapumax. Más de 20 años de experiencia en producción y comercialización de maní y soya en Perú y Bolivia."
        path="/nosotros"
      />
      <Hero currentTheme={currentTheme} />
      <CompanyDescription currentTheme={currentTheme} />
      <AutoRevealStory currentTheme={currentTheme} />
      <TimelineSection currentTheme={currentTheme} />
      <MissionVisionSection currentTheme={currentTheme} />
      <PeanutDeepDiveSection currentTheme={currentTheme} />
      <MediaGridSection currentTheme={currentTheme} />
      <ValuesSection currentTheme={currentTheme} />
      <WorldMapSection />
      <ContactSection />
    </div>
  );
};

/* -------------------- HERO -------------------- */
function Hero({ currentTheme }: { currentTheme: ThemeState }) {
  return (
    <section className="relative pt-36 pb-24 text-white overflow-hidden rounded-b-[3rem]">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url('/carrusel_hero/campo.jpg')` }}
      />
      <div className="absolute inset-0 bg-black/55 z-0" />
      <div className="absolute inset-0 z-0" style={{ background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)' }} />

      <div className="mx-auto max-w-7xl px-6 relative z-10 drop-shadow-md">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-medium uppercase tracking-[0.3em] text-white/80"
        >
          Sobre Nosotros
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6 max-w-4xl font-display text-5xl font-bold leading-[1.05] md:text-7xl text-white"
        >
          Nuestra <span className="italic text-secondary">Historia</span> y compromiso.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 max-w-2xl text-lg text-white/80 leading-relaxed"
        >
          Agro Industrias Yapumax nace de la visión y esfuerzo de su fundador Adolfo Yapuchura Huayta, con más de 20 años de experiencia en la industria agropecuaria, ofreciendo productos de alta calidad al mercado.
        </motion.p>
      </div>
    </section>
  );
}

/* -------------------- COMPANY DESCRIPTION -------------------- */
function CompanyDescription({ currentTheme }: { currentTheme: ThemeState }) {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden transition-colors duration-700">
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className={cn("font-medium text-xs uppercase tracking-[0.3em] px-4 py-1.5 rounded-full", currentTheme.isDark ? "bg-white/20 text-white" : "text-accent bg-accent/10")}>
              ¿Quiénes somos?
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold mt-6 mb-6 leading-tight">
              Especializados en maní y soya de <span className={cn("italic", currentTheme.isDark ? "text-secondary" : "text-accent")}>calidad.</span>
            </h2>
            <div className="space-y-5 text-lg">
              <p className={cn("leading-relaxed", currentTheme.isDark ? "text-white/90" : "text-muted-foreground")}>
                <strong className="font-bold">Agroindustrias Yapumax</strong> es una empresa agroindustrial especializada en la producción y comercialización de productos derivados del maní y soya. Trabajamos directamente desde el origen para garantizar productos frescos, seguros y de excelente calidad, abasteciendo a clientes mayoristas y minoristas con un servicio confiable y comprometido con la satisfacción de cada cliente.
              </p>
              <p className={cn("leading-relaxed", currentTheme.isDark ? "text-white/90" : "text-muted-foreground")}>
                Nuestro compromiso es brindar alimentos que destaquen por su sabor, pureza y confianza.
              </p>
            </div>
          </motion.div>

          {/* Quality Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative group rounded-[2rem] bg-white p-8 md:p-10 shadow-2xl border border-border overflow-hidden">
              <div className="absolute inset-0 z-0 opacity-15 transition-transform duration-700 group-hover:scale-105">
                <img src="/carrusel_hero/campo.jpg" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-white/90 z-0 backdrop-blur-[2px]" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl text-white bg-cta transition-all group-hover:bg-accent">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-slate-900">Calidad de nuestros productos</h3>
                </div>
                <p className="text-slate-700 leading-relaxed text-lg">
                  En Agroindustrias Yapumax nos enfocamos en ofrecer productos elaborados bajo estrictos estándares de calidad. Cada lote pasa por un cuidadoso proceso de selección, limpieza y control, asegurando un producto fresco, natural y con todas sus propiedades nutricionales.
                </p>
              </div>

              {/* Hoja Decorativa */}
              <img
                src="/hoja_deco_imagenes.png"
                alt=""
                className="absolute -bottom-8 -right-8 w-32 opacity-80 drop-shadow-xl z-20 transition-all duration-500 ease-out group-hover:-translate-y-4 group-hover:-translate-x-4 group-hover:-rotate-12"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- AUTO-REVEAL STORY -------------------- */
function AutoRevealStory({ currentTheme }: { currentTheme: ThemeState }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= STORY_WORDS.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 300);
    return () => clearInterval(interval);
  }, [hasStarted]);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 relative z-10 transition-colors duration-700">
      <div className="mx-auto max-w-6xl px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={cn("mb-12 text-center text-[11px] font-semibold uppercase tracking-[0.4em]", currentTheme.isDark ? "text-secondary" : "text-accent")}
        >
          Nuestra historia
        </motion.p>
        <h2 className="font-display text-center text-[2.25rem] font-semibold leading-[1.05] tracking-tight md:text-[5rem] lg:text-[6rem]">
          {STORY_WORDS.map((item, i) => (
            <span
              key={i}
              className={cn(
                "mr-3 inline-block transition-all duration-700 ease-out",
                item.italic ? (currentTheme.isDark ? "italic text-foreground drop-shadow-sm" : "italic text-accent") : (currentTheme.isDark ? "text-white" : "text-primary"),
                i < visibleCount ? "opacity-100 translate-y-0" : "opacity-[0.1] translate-y-2"
              )}
            >
              {item.word}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}

/* -------------------- PEANUT DEEP DIVE (Immersive Scroll) -------------------- */
function PeanutDeepDiveSection({ currentTheme }: { currentTheme: ThemeState }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={sectionRef} className="py-20 md:py-32 relative overflow-hidden transition-colors duration-700 bg-white text-slate-900">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.img
          src="/mani_flotante.png"
          alt=""
          className="absolute top-20 -left-10 w-40 md:w-64 opacity-20"
          animate={{ y: [0, -25, 0], rotate: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        />
        <motion.img
          src="/soya_flotante.png"
          alt=""
          className="absolute bottom-20 -right-10 w-40 md:w-56 opacity-20"
          animate={{ y: [0, 20, 0], rotate: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1.5 }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        {/* Section heading */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-medium uppercase tracking-[0.3em] text-accent"
          >
            Conoce más sobre el maní
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 max-w-3xl mx-auto font-display text-4xl font-bold md:text-6xl text-slate-900"
          >
            Un grano con <span className="italic text-accent">historia.</span>
          </motion.h2>
        </div>

        {/* Immersive cards */}
        <div className="space-y-24 md:space-y-32">
          {PEANUT_SECTIONS.map((section, i) => {
            const Icon = section.icon;
            const isReversed = i % 2 !== 0;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="relative"
              >
                <div className={cn(
                  "grid md:grid-cols-2 gap-10 md:gap-16 items-center",
                  isReversed && "md:[direction:rtl] md:*:[direction:ltr]"
                )}>
                  {/* Text */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl text-white bg-cta shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-display text-3xl md:text-4xl font-bold text-slate-900">{section.title}</h3>
                    </div>
                    <p className="text-slate-700 text-lg leading-relaxed max-w-xl">
                      {section.body}
                    </p>
                  </div>

                  {/* Image */}
                  <div className="relative group w-full aspect-[4/3] md:aspect-video">
                    <motion.div
                      whileInView={{ scale: [0.95, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="w-full h-full rounded-3xl overflow-hidden shadow-2xl"
                    >
                      <img
                        src={section.image}
                        alt={section.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    </motion.div>

                    {/* Decorative leaf */}
                    <img
                      src="/hoja_deco_imagenes.png"
                      alt=""
                      className={cn(
                        "absolute -bottom-8 md:-bottom-12 w-24 md:w-32 opacity-100 drop-shadow-2xl z-30 transition-all duration-500 ease-out group-hover:-translate-y-4 group-hover:scale-110",
                        isReversed
                          ? "-left-8 md:-left-12 scale-x-[-1] group-hover:translate-x-4 group-hover:rotate-12"
                          : "-right-8 md:-right-12 group-hover:-translate-x-4 group-hover:-rotate-12"
                      )}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


/* -------------------- MEDIA GRID -------------------- */
function MediaGridSection({ currentTheme }: { currentTheme: ThemeState }) {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden transition-colors duration-700">
      {/* Elementos flotantes de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.img
          src="/soya_flotante.png"
          alt=""
          className="absolute top-20 right-10 w-48 md:w-64 opacity-30"
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 2 }}
        />
        <motion.img
          src="/mani_flotante.png"
          alt=""
          className="absolute bottom-20 left-10 w-48 md:w-64 opacity-30"
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-medium uppercase tracking-[0.3em] text-accent"
          >
            Nuestras Instalaciones
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 max-w-3xl mx-auto font-display text-4xl font-bold md:text-5xl text-slate-900"
          >
            De nuestra planta a tu mesa.
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-[3rem] overflow-hidden shadow-2xl relative bg-muted/20 aspect-[3/4]"
            >
              <video src="/about_us/video1.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="rounded-[2rem] overflow-hidden shadow-xl relative bg-muted/20 aspect-video group"
            >
              <img src="/about_us/central_camion_exportador.jpeg" alt="Central exportadora" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" loading="lazy" />
            </motion.div>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="col-span-2 rounded-[2rem] overflow-hidden shadow-xl aspect-video bg-muted/20 relative group"
            >
              <img src="/about_us/sacos.jpg" alt="Nuestros sacos" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" loading="lazy" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="rounded-[2rem] overflow-hidden shadow-lg aspect-square bg-muted/20"
            >
              <video src="/about_us/video2.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="rounded-[2rem] overflow-hidden shadow-lg aspect-square bg-muted/20 mt-12"
            >
              <video src="/about_us/video3.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="rounded-[2rem] overflow-hidden shadow-lg aspect-[4/3] bg-muted/20 group"
            >
              <img src="/products/mani2.png" alt="Maní crudo" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" loading="lazy" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="rounded-[2rem] overflow-hidden shadow-lg aspect-[4/3] bg-muted/20 group relative"
            >
              <video src="/about_us/video4.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover scale-[3.5] transition-transform duration-1000 group-hover:scale-[3.6]" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- TIMELINE -------------------- */
function TimelineSection({ currentTheme }: { currentTheme: ThemeState }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative py-32 bg-white text-slate-900 transition-colors duration-700">
      {/* Elementos flotantes de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.img
          src="/soya_flotante.png"
          alt=""
          className="absolute top-20 left-10 w-48 md:w-64 opacity-30"
          animate={{ y: [0, 20, 0], rotate: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        />
        <motion.img
          src="/mani_flotante.png"
          alt=""
          className="absolute bottom-40 right-10 w-48 md:w-64 opacity-30"
          animate={{ y: [0, -20, 0], rotate: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
        />
        <motion.img
          src="/soya_flotante.png"
          alt=""
          className="absolute top-1/2 right-20 w-32 md:w-48 opacity-30"
          animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 2 }}
        />
        <motion.img
          src="/mani_flotante.png"
          alt=""
          className="absolute bottom-1/4 left-20 w-32 md:w-48 opacity-30"
          animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 9, ease: "easeInOut", delay: 3 }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-medium uppercase tracking-[0.3em] text-accent"
            >
              Trayectoria
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-4 font-display text-4xl font-bold md:text-5xl text-slate-900"
            >
              Cosechando lealtad y excelencia.
            </motion.h2>
          </div>
          <div className="relative pl-10">
            <div className="absolute left-3 top-0 h-full w-px bg-slate-200" />
            <motion.div style={{ height: lineHeight }} className="absolute left-3 top-0 w-px bg-accent" />
            <div className="space-y-24 md:space-y-32 mt-12">
              {TIMELINE.map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7, delay: i * 0.05 }} className="relative">
                  <span className="absolute -left-[31px] top-6 h-3 w-3 rounded-full ring-4 ring-transparent z-10 bg-accent" />

                  <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                    {/* Texto */}
                    <div className={cn("order-2 md:pb-8", i % 2 === 0 ? "md:order-1" : "md:order-2")}>
                      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                        {step.year}
                      </span>
                      <h3 className="mt-3 font-display text-2xl font-bold md:text-4xl leading-tight text-slate-900">{step.title}</h3>
                      <p className="mt-4 max-w-xl text-base md:text-lg leading-relaxed text-slate-700">{step.body}</p>
                    </div>

                    {/* Imagen con Hoja (Sin overflow-hidden en el padre para no recortar la hoja) */}
                    <div className={cn("order-1 relative group w-full aspect-[4/3] md:aspect-video", i % 2 === 0 ? "md:order-2" : "md:order-1")}>
                      <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                        <img src={step.image} alt={step.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                      </div>

                      {/* Hoja Decorativa que sobresale */}
                      <img
                        src="/hoja_deco_imagenes.png"
                        alt=""
                        className={cn(
                          "absolute -bottom-8 md:-bottom-12 w-24 md:w-32 opacity-100 drop-shadow-2xl z-30 transition-all duration-500 ease-out group-hover:-translate-y-4 group-hover:scale-110",
                          i % 2 === 0
                            ? "-right-8 md:-right-12 group-hover:-translate-x-4 group-hover:-rotate-12"
                            : "-left-8 md:-left-12 scale-x-[-1] group-hover:translate-x-4 group-hover:rotate-12"
                        )}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- VALUES -------------------- */
function ValuesSection({ currentTheme }: { currentTheme: ThemeState }) {
  const getFillColor = (bgClass: string) => {
    switch (bgClass) {
      case 'bg-primary': return 'hsl(var(--primary))';
      case 'bg-accent': return 'hsl(var(--accent))';
      case 'bg-background':
      default: return 'hsl(var(--background))';
    }
  };

  return (
    <section className="relative py-28 transition-colors duration-700 overflow-hidden">
      {/* Background image & overlay */}
      <div className="absolute inset-0 z-0">
        <img src="/carrusel_hero/campo.jpg" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/95 mix-blend-multiply" />
        <div className="absolute inset-0 bg-primary/20" />
      </div>

      {/* Top curved shape divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10" style={{ transform: "translateY(-1px)" }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[60px] md:h-[120px]">
          <path d="M0,0 C400,100 800,20 1200,60 L1200,0 L0,0 Z" fill={getFillColor(currentTheme.bg)}></path>
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-20 mt-8 md:mt-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-medium uppercase tracking-[0.3em] text-secondary"
        >
          Nuestros Pilares
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 max-w-3xl font-display text-4xl font-bold md:text-6xl text-white"
        >
          Lo que nos define.
        </motion.h2>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group flex flex-col rounded-2xl border bg-white border-border hover:border-accent p-8 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-white bg-cta group-hover:bg-accent transition-all">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground">{v.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------- MISSION & VISION -------------------- */
function MissionVisionSection({ currentTheme }: { currentTheme: ThemeState }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Fondo aparece al entrar (0→0.15 → opacidad 1) y desaparece al salir (0.85→1 → opacidad 0)
  const bgOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Fondo marrón animado con scroll */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ backgroundColor: "hsl(30 55% 55%)", opacity: bgOpacity }}
      />

      {/* Elementos flotantes de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-1">
        <motion.img
          src="/soya_flotante.png"
          alt=""
          className="absolute top-10 left-10 w-48 md:w-64 opacity-30"
          animate={{ y: [0, 20, 0], rotate: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        />
        <motion.img
          src="/mani_flotante.png"
          alt=""
          className="absolute bottom-10 right-10 w-48 md:w-64 opacity-30"
          animate={{ y: [0, -20, 0], rotate: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">

          {/* Misión Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative group rounded-[2rem] bg-white p-8 md:p-12 shadow-2xl border border-border overflow-hidden"
          >
            <div className="absolute inset-0 z-0 opacity-20 transition-transform duration-700 group-hover:scale-105">
              <img src="/carrusel_hero/campo.jpg" alt="Fondo Misión" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-white/90 z-0 backdrop-blur-[2px]" />

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl text-white bg-cta transition-all group-hover:bg-accent">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="font-display text-3xl font-bold text-slate-900">Nuestra Misión</h3>
              </div>
              <p className="text-slate-700 leading-relaxed text-lg mb-6">
                Ser una empresa agroindustrial dedicada a la compra directa desde la chacra y comercialización de soya en grano, maní y productos derivados del maní, brindando soluciones de calidad para clientes mayoristas y minoristas del rubro de legumbres.
              </p>
              <p className="text-slate-700 leading-relaxed text-lg">
                Trabajamos desde el origen de nuestra materia prima, manteniendo una conexión directa con agricultores para ofrecer productos confiables, con procesos responsables y una atención cercana a nuestros clientes.
              </p>
            </div>

            {/* Hoja Decorativa */}
            <img
              src="/hoja_deco_imagenes.png"
              alt=""
              className="absolute -bottom-8 -right-8 w-32 opacity-80 drop-shadow-xl z-20 transition-all duration-500 ease-out group-hover:-translate-y-4 group-hover:-translate-x-4 group-hover:-rotate-12"
            />
          </motion.div>

          {/* Visión Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative group rounded-[2rem] bg-white p-8 md:p-12 shadow-2xl border border-border overflow-hidden"
          >
            <div className="absolute inset-0 z-0 opacity-20 transition-transform duration-700 group-hover:scale-105">
              <img src="/about_us/sacos.jpg" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-white/90 z-0 backdrop-blur-[2px]" />

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl text-white bg-cta transition-all group-hover:bg-accent">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="font-display text-3xl font-bold text-slate-900">Nuestra Visión</h3>
              </div>
              <p className="text-slate-700 leading-relaxed text-lg mb-6">
                Convertirnos en una empresa internacional líder en productos agropecuarios, reconocida por la calidad de nuestros productos, la innovación en nuestros procesos y el compromiso con nuestros clientes y agricultores.
              </p>
              <p className="text-slate-700 leading-relaxed text-lg">
                Buscamos generar un impacto positivo a largo plazo mediante el desarrollo de una marca confiable, con excelencia en servicio, productos de alto valor y relaciones duraderas.
              </p>
            </div>

            {/* Hoja Decorativa */}
            <img
              src="/hoja_deco_imagenes.png"
              alt=""
              className="absolute -bottom-8 -right-8 w-32 opacity-80 drop-shadow-xl z-20 transition-all duration-500 ease-out group-hover:-translate-y-4 group-hover:-translate-x-4 group-hover:-rotate-12"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default Nosotros;
