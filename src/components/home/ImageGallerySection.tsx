import { motion } from "framer-motion";

const images = [
  "/carrusel_hero/campo.jpg",
  "/about_us/central_camion_exportador.jpeg",
  "/about_us/sacos.jpg",
  "/carrusel_hero/mani.jpg",
];

export const ImageGallerySection = () => {
  return (
    <section className="w-full overflow-hidden flex flex-col md:flex-row md:h-[50vh]">
      {images.map((src, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
          className="relative flex-1 aspect-square md:aspect-auto md:h-full overflow-hidden group"
        >
          <img
            src={src}
            alt={`Galería Yapumax ${index + 1}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
        </motion.div>
      ))}
    </section>
  );
};
