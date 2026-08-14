export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription?: string;
  price: number;
  images: string[];
  category: string;
  inStock: boolean;
  customizable?: boolean;
  colors?: string[];
  sizes?: string[];
  originalPrice?: number;
  isBestSeller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  customNote?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  content: string;
  rating: number;
  image: string;
  deliveryImage?: string;
  date: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  titleHighlight?: string;
  titleEnd?: string;
  subtitle: string;
  cta: string;
  ctaLink: string;
  gradient: string;
  image?: string;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  customer: CustomerInfo;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  total: number;
  createdAt: string;
  notes?: string;
}
