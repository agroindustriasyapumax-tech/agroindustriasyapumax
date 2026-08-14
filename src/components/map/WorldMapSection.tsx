import { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import geoData from "@/data/countries.geo.json";
import peFlag from "@/data/pe.svg";
import boFlag from "@/data/bo.svg";

interface CountryInfo {
  key: "PE" | "BO";
  name: string;
  tagline: string;
  description: string;
  coordinates: [number, number];
  color: string;
}

const COUNTRIES: CountryInfo[] = [
  {
    key: "PE",
    name: "Perú",
    tagline: "Comercialización y Distribución",
    description:
      "Perú es el centro de comercialización y distribución de Agroindustrias Yapumax. Desde aquí abastecemos a clientes mayoristas y minoristas, garantizando entregas oportunas, atención personalizada y productos de alta calidad para todo el mercado nacional.",
    coordinates: [-75, -9.5],
    color: "#B5BF32",
  },
  {
    key: "BO",
    name: "Bolivia",
    tagline: "Producción Agrícola",
    description:
      "En Bolivia se desarrolla el proceso agrícola, donde el maní y la soya son cultivados, cosechados y cuidadosamente seleccionados. Posteriormente, los productos son preparados y cargados para su traslado, asegurando que cada lote conserve su calidad desde el origen.",
    coordinates: [-64, -16.5],
    color: "#6B7037",
  },
];

export const WorldMapSection = () => {
  const [activeCountry, setActiveCountry] = useState<"PE" | "BO" | null>(null);

  return (
    <section className="py-24 md:py-32 transition-colors duration-700 relative z-10 overflow-hidden bg-background">
      {/* Floating product images — decorative */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <img
          src="/mani_flotante.png"
          alt=""
          className="absolute top-[10%] left-[5%] w-24 md:w-48 object-contain animate-float opacity-30"
        />
        <img
          src="/soya_flotante.png"
          alt=""
          className="absolute bottom-[20%] right-[5%] w-32 md:w-56 object-contain animate-float-delayed opacity-30"
        />
      </div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">

        {/* Simple title above map */}
        <div className="text-center mb-4 md:mb-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-medium uppercase tracking-[0.3em] text-accent mb-4"
          >
            Producción y Distribución
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl mx-auto font-display text-4xl font-bold md:text-5xl text-foreground"
          >
            Producción y distribución en Perú y Bolivia.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-muted-foreground"
          >
            Garantizando calidad desde el origen hasta la entrega final.
          </motion.p>
        </div>

        {/* Map layout — Transparent background, large map */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* MAP */}
          <div className="relative w-full aspect-[4/3] max-w-xl mx-auto">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ scale: 650, center: [-60, -18] }}
              className="w-full h-full drop-shadow-sm"
            >
              <Geographies geography={geoData}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const isPeru =
                      geo.properties.adm0_a3 === "PER" ||
                      geo.id === "PER" ||
                      geo.properties.iso_a3 === "PER";
                    const isBolivia =
                      geo.properties.adm0_a3 === "BOL" ||
                      geo.id === "BOL" ||
                      geo.properties.iso_a3 === "BOL";

                    const isHighlighted = isPeru || isBolivia;
                    const fillColor = isPeru ? "#155734" : isBolivia ? "#B5BF32" : "#F5F3ED";

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={fillColor}
                        className={cn(
                          "transition-all duration-300 outline-none",
                          isHighlighted ? "cursor-pointer" : "pointer-events-none"
                        )}
                        stroke="#ffffff"
                        strokeWidth={0.5}
                        onClick={() => {
                          if (isPeru) setActiveCountry("PE");
                          else if (isBolivia) setActiveCountry("BO");
                        }}
                        style={{
                          default: { outline: "none", opacity: isHighlighted ? 1 : 0.8 },
                          hover: { outline: "none", opacity: 1 },
                          pressed: { outline: "none" },
                        }}
                      />
                    );
                  })
                }
              </Geographies>

              {/* Lines to info cards */}
              <Line
                from={[-75, -9.5]}
                to={[-48, -10]}
                stroke="#D9A527" // Yellow/Amber dashed line
                strokeWidth={2}
                strokeDasharray="4 4"
                strokeLinecap="round"
                className="animate-pulse"
              />

              <Line
                from={[-64, -16.5]}
                to={[-48, -22]}
                stroke="#D9A527"
                strokeWidth={2}
                strokeDasharray="4 4"
                strokeLinecap="round"
                className="animate-pulse"
              />

              {/* Labels at end of lines */}
              <Marker coordinates={[-46, -10]}>
                <image href={peFlag} width={62} height={62} x={0} y={-31} />
                <text x={84} y={16} fontFamily="system-ui" fontSize={46} fontWeight="bold" fill="#155734">Perú</text>
              </Marker>

              <Marker coordinates={[-46, -22]}>
                <image href={boFlag} width={72} height={72} x={0} y={-36} />
                <text x={84} y={16} fontFamily="system-ui" fontSize={46} fontWeight="bold" fill="#B5BF32">Bolivia</text>
              </Marker>

              {/* Markers on Countries */}
              {COUNTRIES.map((country) => (
                <Marker
                  key={country.key}
                  coordinates={country.coordinates}
                  onClick={() => setActiveCountry(country.key)}
                >
                  <g className="cursor-pointer transition-transform hover:scale-125">
                    <circle r={8} fill="#D9A527" className="animate-pulse-soft" opacity={0.4} />
                    <circle r={4} fill="#D9A527" />
                  </g>
                </Marker>
              ))}
            </ComposableMap>
          </div>

          {/* INFO CARDS (Right side) */}
          <div className="flex flex-col gap-6 justify-center max-w-lg">
            {COUNTRIES.map((country, index) => (
              <motion.div
                key={country.key}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: country.key === 'PE' ? 0.2 : 0.4 }}
                className={cn(
                  "relative group flex flex-col bg-white rounded-3xl p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-border/40 transition-all hover:-translate-y-1 hover:shadow-xl",
                  activeCountry === country.key ? "ring-2 ring-primary border-transparent" : ""
                )}
                onMouseEnter={() => setActiveCountry(country.key)}
                onMouseLeave={() => setActiveCountry(null)}
              >
                <div className="relative z-20 pb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="font-display text-3xl font-bold" style={{ color: "#155734" }}>{country.name}</h3>
                    <span className="bg-secondary/20 text-secondary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{country.tagline}</span>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {country.description}
                  </p>
                </div>
                
                {/* Decorative leaf corner */}
                <img 
                  src="/hoja_deco_imagenes.png" 
                  alt="" 
                  className={cn(
                    "absolute -bottom-12 md:-bottom-14 w-20 md:w-28 opacity-100 drop-shadow-xl z-30 transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-110",
                    index % 2 === 0
                      ? "-right-12 md:-right-14 group-hover:-translate-x-2 group-hover:-rotate-12"
                      : "-left-12 md:-left-14 scale-x-[-1] group-hover:translate-x-2 group-hover:rotate-12"
                  )}
                />
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
