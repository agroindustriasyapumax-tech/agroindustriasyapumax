import { motion } from "framer-motion";
import { Shield, Store, Tag, Lock, Mail, AlertTriangle } from "lucide-react";

const sections = [
  {
    icon: Store,
    title: "1. Naturaleza del Sitio Web y Proceso de Compra",
    items: [
      "Este sitio web funciona estrictamente como un catálogo informativo e interactivo para la solicitud de cotizaciones, no como una tienda virtual transaccional (e-commerce).",
      "La plataforma no solicita, no procesa, no recolecta ni almacena ningún tipo de dato personal (como nombres, correos electrónicos o teléfonos), ni información financiera o bancaria.",
      "Al hacer clic en los botones de consulta, el usuario es redirigido de forma externa y directa a la aplicación WhatsApp o a un cliente de correo.",
      "La formalización de la venta, el envío de datos de contacto, la definición de los métodos de pago y los plazos de entrega se acordarán de manera exclusiva y privada a través de la comunicación directa con un asesor comercial, fuera de este sitio web.",
    ],
  },
  {
    icon: Tag,
    title: "2. Precios y Disponibilidad (Stock Referencial)",
    items: [
      "Toda la información mostrada en el sitio web, incluyendo la disponibilidad de inventario (stock), características, presentaciones y precios de los productos, es de carácter estrictamente referencial e ilustrativo.",
      "La empresa no garantiza que los productos mostrados en la web se encuentren con stock disponible al momento de establecer la comunicación por WhatsApp.",
      "La empresa se reserva el derecho de actualizar, modificar o corregir los precios publicados sin previo aviso.",
      "El stock real y el precio final a pagar serán validados y confirmados únicamente por el asesor comercial durante la atención directa.",
    ],
  },
  {
    icon: AlertTriangle,
    title: "3. Exención de Responsabilidad",
    items: [
      "Comercial: Dado que la web es un medio de contacto referencial, la empresa queda completamente eximida de cualquier obligación legal de concretar una venta basada en la información mostrada en la pantalla. No se aceptarán exigencias de cumplimiento de entrega por pedidos o consultas no confirmadas explícitamente por nuestros asesores en los canales privados.",
      "Técnica: La empresa no se hace responsable por fallas técnicas, caídas de red, interrupciones en el servidor o errores en la redirección externa hacia la aplicación de WhatsApp.",
    ],
  },
  {
    icon: Shield,
    title: "4. Solución de Conflictos y Libro de Reclamaciones",
    items: [
      "Cualquier queja, reclamo o conflicto deba resolverse bajo las leyes peruanas. Para tal fin, el usuario tiene a su plena disposición nuestro Libro de Reclamaciones Virtual, accesible de manera visible desde la página principal de este sitio web de conformidad con las normas de INDECOPI.",
    ],
  },
];

const TerminosCondiciones = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background transition-colors duration-500">
      {/* Hero */}
      <section className="relative pt-36 pb-24 text-white overflow-hidden rounded-b-[3rem]">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url('/carrusel_hero/campo.jpg')` }}
        />
        <div className="absolute inset-0 bg-black/60 z-0" />
        <div className="absolute inset-0 z-0" style={{ background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)' }} />

        <div className="mx-auto max-w-7xl px-6 relative z-10 drop-shadow-md">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-medium uppercase tracking-[0.3em] text-white/80"
          >
            Legal
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 max-w-4xl font-display text-4xl sm:text-5xl font-bold leading-[1.1] md:text-7xl text-white"
          >
            Términos y <span className="italic text-secondary">Condiciones</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 max-w-2xl text-lg text-white/80 leading-relaxed"
          >
            Políticas de Privacidad y condiciones de uso de este sitio web.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-[2rem] border border-border p-8 md:p-12 shadow-xl mb-10"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl text-white bg-cta shrink-0">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  Términos y Condiciones y Políticas de Privacidad
                </h2>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed text-lg">
              El acceso y uso de este sitio web se rige por las leyes de la República del Perú, especialmente por el Código de Protección y Defensa del Consumidor (Ley N° 29571). Al utilizar este sitio web, su catálogo informativo y sus funciones de redirección a canales de atención, el usuario comprende, acepta y se sujeta a las siguientes condiciones operativas y comerciales:
            </p>
          </motion.div>

          <div className="space-y-8">
            {sections.map((section, i) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl text-white bg-accent shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-foreground">{section.title}</h3>
                  </div>
                  <ul className="space-y-4">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex gap-3 text-muted-foreground leading-relaxed">
                        <span className="text-accent mt-1.5 shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TerminosCondiciones;
