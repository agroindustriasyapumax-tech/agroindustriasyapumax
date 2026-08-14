import { Product, Testimonial, HeroSlide } from "@/types";

export const heroSlides: HeroSlide[] = [
  {
    id: "1",
    title: "+20 años de ",
    titleHighlight: "calidad",
    titleEnd: " del campo a tu mesa.",
    subtitle: "Del campo a tu mesa, llevamos la mejor calidad en productos derivados del maní y soya, garantizando frescura, confianza y excelencia en cada entrega.",
    cta: "Ver Catálogo",
    ctaLink: "/productos",
    gradient: "from-amber-800/95 via-amber-700/80 to-amber-600/50",
    image: "/carrusel_hero/mani.jpg"
  },
  {
    id: "2",
    title: "Cultivo ",
    titleHighlight: "Sostenible",
    titleEnd: " de Maní y Soya.",
    subtitle: "Productos agroindustriales premium elaborados de forma artesanal y sostenible. Maní y soya seleccionados de las mejores cosechas de Perú y Bolivia.",
    cta: "Conocer Historia",
    ctaLink: "/nosotros",
    gradient: "from-orange-800/95 via-amber-700/80 to-amber-600/50",
    image: "/carrusel_hero/campo.jpg"
  },
  {
    id: "3",
    title: "Soya de ",
    titleHighlight: "Alta",
    titleEnd: " Calidad",
    subtitle: "Soya en grano seleccionada para procesos industriales de máxima calidad. Alimentando un futuro más saludable en Sudamérica.",
    cta: "Ver Catálogo",
    ctaLink: "/productos",
    gradient: "from-amber-900/95 via-amber-800/80 to-amber-700/50",
    image: "/carrusel_hero/soya.jpg"
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Maní Crudo",
    shortDescription: "Granos seleccionados que conservan todas sus propiedades naturales.",
    description: "Seleccionamos granos de excelente calidad que conservan todas sus propiedades naturales, ideales para procesos industriales, tostado o consumo según las necesidades de nuestros clientes.",
    price: 3.30,
    images: ["/products/mani_crudo.png"],
    category: "mani-crudo",
    inStock: true,
    customizable: true,
    isBestSeller: true,
    colors: ["Saco de 40 kg", "Saco de 50 kg", "Por Kilo"],
    sizes: [
      "#1 Calibre 38/42 - S/4.30/kg",
      "#2 Calibre 40/50 - S/4.00/kg",
      "#3 Calibre 60/70 - S/3.80/kg",
      "#4 Calibre 70/80 - S/3.60/kg",
      "#5 Calibre 80/100 - S/3.30/kg",
      "Partido #1 Calibre 38/42 - S/3.80/kg",
      "Partido #2 Calibre 40/50 - S/3.60/kg"
    ],
  },
  {
    id: "2",
    name: "Maní Tostado",
    shortDescription: "Crocante, fresco y cuidadosamente tostado para conservar su sabor natural.",
    description: "Nuestro maní tostado es elaborado con granos cuidadosamente seleccionados y tostados de manera uniforme para conservar su sabor, textura crujiente y valor nutricional. Es nuestro producto más vendido gracias a su excelente calidad y frescura.",
    price: 5.60,
    images: ["/products/mani_tostado.png"],
    category: "mani-tostado",
    inStock: true,
    customizable: true,
    isBestSeller: true,
    colors: ["Saco de 25 kg", "Por Kilo"],
    sizes: [
      "#1 Calibre 38/42 - S/6.00/kg",
      "#2 Calibre 40/50 - S/5.80/kg",
      "#3 Calibre 60/70 - S/5.60/kg"
    ],
  },
  {
    id: "3",
    name: "Maní Molido",
    shortDescription: "Ideal para postres, salsas y aplicaciones gastronómicas.",
    description: "Elaborado a partir de maní de primera selección, nuestro maní molido mantiene su aroma, sabor y propiedades naturales, siendo ideal para la preparación de postres, salsas, alimentos tradicionales y diversas aplicaciones gastronómicas.",
    price: 4.00,
    images: ["/products/mani_molido.png"],
    category: "mani-molido",
    inStock: true,
    customizable: true,
    isBestSeller: true,
    colors: ["Saco de 25 kg", "Saco de 50 kg", "Por Kilo"],
    sizes: [
      "Comercial - S/4.00/kg",
      "Puro 100% - S/5.50/kg"
    ],
  },
  {
    id: "4",
    name: "Mantequilla de Maní Yapumax",
    shortDescription: "100% natural, súper cremosa y sin azúcares añadidos.",
    description: "¡Próximo Lanzamiento! Mantequilla de maní 100% natural, súper cremosa y elaborada con la mejor selección de granos. Sin azúcares ni aceites añadidos.",
    price: 0.00,
    images: ["/products/mantequilla_de_mani.jpg"],
    category: "mantequillas",
    inStock: false,
    customizable: true,
    isBestSeller: false,
    colors: ["Tarro de 250g", "Tarro de 500g", "Tarro de 1kg", "Tarro de 4kg"],
    sizes: ["Clásica Natural"],
  },
  {
    id: "5",
    name: "Soya en Grano",
    shortDescription: "Soya seleccionada de alta calidad para la industria alimentaria.",
    description: "Comercializamos soya cuidadosamente seleccionada, ofreciendo un producto limpio y de alta calidad para la industria alimentaria y otros sectores que requieren materia prima confiable.",
    price: 2.40,
    images: ["/products/soya.png"],
    category: "soya",
    inStock: true,
    customizable: true,
    isBestSeller: false,
    colors: ["Saco de 50 kg", "Por Kilo"],
    sizes: [
      "Calibre #1 - S/2.40/kg",
      "Calibre #2 - S/2.40/kg"
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "María Fernanda Rojas",
    content: "Excelente calidad en los calibres de maní crudo. Compramos al por mayor sacos de 50 kilos de Calibre 38/42 y el producto es súper homogéneo y limpio. Su lema 'Calidad & Lealtad' se nota en el trato.",
    rating: 5,
    image: "/placeholder.svg",
    date: "2026-05-15",
  },
  {
    id: "2",
    name: "Distribuidora San Juan",
    content: "El maní tostado calibre 40/50 tiene el tostado uniforme perfecto. Los sacos de 25 kg vienen sellados herméticamente garantizando la frescura. Excelente comunicación técnica por WhatsApp.",
    rating: 5,
    image: "/placeholder.svg",
    date: "2026-06-10",
  },
  {
    id: "3",
    name: "Panificadora El Sol",
    content: "Usamos el maní molido 100% puro para nuestras recetas de repostería y la calidad es constante. El grano de soya también cumple con estándares excelentes. Recomendamos a Agroindustrias Yapumax plenamente.",
    rating: 5,
    image: "/placeholder.svg",
    date: "2026-06-18",
  },
];

/** Gallery images for the infinite scrolling testimonial gallery */
export const galleryImages = {
  rowOne: [
    "/products/mani_crudo.png",
    "/products/soya.png",
    "/products/mani_tostado.png",
    "/products/mani_molido.png",
  ],
  rowTwo: [
    "/about_us/sacos.jpg",
    "/about_us/central_camion_exportador.jpeg",
    "/carrusel_hero/campo.jpg",
    "/carrusel_hero/soya.jpg",
    "/carrusel_hero/mani.jpg",
  ],
};

export const categories = [
  { id: "all", name: "Todos" },
  { id: "mani-crudo", name: "Maní Crudo" },
  { id: "mani-tostado", name: "Maní Tostado" },
  { id: "mani-molido", name: "Maní Molido" },
  { id: "mantequillas", name: "Mantequilla" },
  { id: "soya", name: "Soya" },
];

export const socialLinks = {
  instagram: "https://instagram.com/agro_yapumax",
  facebook: "https://www.facebook.com/profile.php?id=61592485581933",
  tiktok: "https://www.tiktok.com/@agroindustriasyapumax?_r=1&_t=ZS-98swLKuTqey",
  whatsapp: "https://wa.me/51944221793",
};
