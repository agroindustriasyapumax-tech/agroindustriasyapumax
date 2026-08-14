import React, { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import geoData from "@/data/countries.geo.json";
import peFlag from "@/data/pe.svg";
import boFlag from "@/data/bo.svg";

export const InteractiveMap = () => {
  const [activeCountry, setActiveCountry] = useState<"PE" | "BO" | null>(null);

  return (
    <section className="py-24 md:py-32 transition-colors duration-700 relative z-10">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block font-medium text-sm uppercase tracking-wider px-4 py-1.5 rounded-full bg-primary/10 text-primary"
          >
            Presencia Internacional
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 max-w-3xl mx-auto font-display text-4xl font-bold md:text-5xl"
          >
            Presencia Productiva Regional
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Column: The Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary/10 via-white to-accent/5 dark:from-primary/5 dark:via-card dark:to-accent/5 shadow-2xl"
            onClick={() => setActiveCountry(null)}
          >
            {/* Subtle grid pattern overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 0.5px, transparent 0)', backgroundSize: '24px 24px' }} />

            <div className="w-full h-full cursor-default relative z-10">
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{ scale: 800, center: [-63, -15] }}
                className="w-full h-full object-contain"
              >
                <Geographies geography={geoData}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const isPeru = geo.properties.adm0_a3 === "PER" || geo.id === "PER" || geo.properties.iso_a3 === "PER";
                      const isBolivia = geo.properties.adm0_a3 === "BOL" || geo.id === "BOL" || geo.properties.iso_a3 === "BOL";
                      const isHighlighted = isPeru || isBolivia;

                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={isHighlighted ? (isPeru ? "#B5BF32" : "#6B7037") : "currentColor"}
                          className={cn(
                            "transition-all duration-300 outline-none",
                            isHighlighted
                              ? "opacity-100 cursor-pointer"
                              : "opacity-[0.08] dark:opacity-10 text-foreground pointer-events-none"
                          )}
                          stroke={isHighlighted ? "#ffffff" : "transparent"}
                          strokeWidth={isHighlighted ? 0.8 : 0}
                          onClick={(e) => {
                            if (isPeru) { e.stopPropagation(); setActiveCountry("PE"); }
                            else if (isBolivia) { e.stopPropagation(); setActiveCountry("BO"); }
                          }}
                          style={{
                            default: {
                              outline: "none",
                              filter: isHighlighted ? `drop-shadow(0px 4px 16px ${isPeru ? 'rgba(181,191,50,0.4)' : 'rgba(107,112,55,0.4)'})` : "none"
                            },
                            hover: {
                              outline: "none",
                              filter: isHighlighted ? `drop-shadow(0px 4px 20px ${isPeru ? 'rgba(181,191,50,0.6)' : 'rgba(107,112,55,0.6)'})` : "none",
                              opacity: isHighlighted ? 0.9 : undefined
                            },
                            pressed: { outline: "none" },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>

                {/* Pins with Flags */}
                <defs>
                  <clipPath id="circle-clip">
                    <circle cx="0" cy="0" r="16" />
                  </clipPath>
                </defs>

                <Marker coordinates={[-75, -9.5]} onClick={(e) => { e.stopPropagation(); setActiveCountry("PE"); }}>
                  <g className="cursor-pointer transition-transform hover:scale-110">
                    <circle r={20} fill="#ffffff" className="drop-shadow-lg" />
                    <circle r={18} fill="#ffffff" />
                    <image href={peFlag} width={32} height={32} x={-16} y={-16} clipPath="url(#circle-clip)" />
                  </g>
                </Marker>

                <Marker coordinates={[-64, -16.5]} onClick={(e) => { e.stopPropagation(); setActiveCountry("BO"); }}>
                  <g className="cursor-pointer transition-transform hover:scale-110">
                    <circle r={20} fill="#ffffff" className="drop-shadow-lg" />
                    <circle r={18} fill="#ffffff" />
                    <image href={boFlag} width={32} height={32} x={-16} y={-16} clipPath="url(#circle-clip)" />
                  </g>
                </Marker>
              </ComposableMap>
            </div>
          </motion.div>

          {/* Right Column: Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            {/* Toggle Buttons */}
            <div className="flex gap-3 mb-10 flex-wrap">
              <button
                onClick={() => setActiveCountry(null)}
                className={cn(
                  "px-6 py-3.5 rounded-full font-semibold transition-all duration-300 text-sm",
                  activeCountry === null
                    ? "bg-foreground text-background shadow-lg scale-105"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                Presencia Global
              </button>
              <button
                onClick={() => setActiveCountry("PE")}
                className={cn(
                  "px-6 py-3.5 rounded-full font-semibold transition-all duration-300 text-sm",
                  activeCountry === "PE"
                    ? "bg-primary text-white shadow-lg shadow-primary/25 scale-105"
                    : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                )}
              >
                Sede Perú
              </button>
              <button
                onClick={() => setActiveCountry("BO")}
                className={cn(
                  "px-6 py-3.5 rounded-full font-semibold transition-all duration-300 text-sm",
                  activeCountry === "BO"
                    ? "bg-[#6B7037] text-white shadow-lg shadow-[#6B7037]/25 scale-105"
                    : "bg-muted text-muted-foreground hover:bg-[#6B7037]/10 hover:text-[#6B7037]"
                )}
              >
                Sede Bolivia
              </button>
            </div>

            {/* Details Content */}
            <div className="min-h-[280px] relative">
              <AnimatePresence mode="wait">
                {activeCountry === null && (
                  <motion.div
                    key="none"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col space-y-6 py-8 px-8 bg-gradient-to-br from-primary/10 to-accent/5 dark:from-primary/10 dark:to-accent/5 rounded-[2rem] border border-border/50"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground">Agroindustrias Yapumax en la Región</h3>
                    <p className="text-muted-foreground leading-relaxed">Desarrollamos nuestras operaciones agrícolas y de exportación en Perú y Bolivia, fortaleciendo la cadena productiva con calidad y lealtad.</p>
                    <div className="flex items-center gap-6 pt-2">
                      <div className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-full overflow-hidden shadow-sm group-hover:scale-110 transition-transform border-2 border-primary/30">
                          <img src={peFlag} alt="Perú" className="w-full h-full object-cover" />
                        </div>
                        <span className="font-medium text-foreground">Perú</span>
                      </div>
                      <div className="w-px h-8 bg-border" />
                      <div className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-full overflow-hidden shadow-sm group-hover:scale-110 transition-transform border-2 border-[#6B7037]/30">
                          <img src={boFlag} alt="Bolivia" className="w-full h-full object-cover" />
                        </div>
                        <span className="font-medium text-foreground">Bolivia</span>
                      </div>
                    </div>
                  </motion.div>
                )}
                {activeCountry === "PE" && (
                  <motion.div
                    key="pe"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 p-2.5 shadow-sm border border-primary/20">
                        <img src={peFlag} alt="Perú" className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <h3 className="font-display text-2xl font-bold text-foreground">Perú</h3>
                        <p className="text-primary font-medium">Operaciones Agrícolas</p>
                      </div>
                    </div>
                    <div className="w-full h-52 rounded-[1.5rem] overflow-hidden shadow-xl">
                      <img src="/about_us/sacos.jpg" alt="Sede Perú" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Nuestra sede principal y centro de operaciones. Aquí cultivamos el mejor maní y soya con técnicas sostenibles y en alianza directa con los agricultores locales, garantizando frescura y calidad premium.
                    </p>
                  </motion.div>
                )}

                {activeCountry === "BO" && (
                  <motion.div
                    key="bo"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-[#6B7037]/10 p-2.5 shadow-sm border border-[#6B7037]/20">
                        <img src={boFlag} alt="Bolivia" className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <h3 className="font-display text-2xl font-bold text-foreground">Bolivia</h3>
                        <p className="text-[#6B7037] font-medium">Expansión y Logística</p>
                      </div>
                    </div>
                    <div className="w-full h-52 rounded-[1.5rem] overflow-hidden shadow-xl">
                      <img src="/about_us/central_camion_exportador.jpeg" alt="Sede Bolivia" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Nuestra gran sucursal internacional. Conectando nuestra producción agroindustrial con el exigente mercado sudamericano, manteniendo los estándares de calidad que nos caracterizan y fortaleciendo la cadena productiva.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};
