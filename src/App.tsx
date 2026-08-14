import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { Layout } from "@/components/layout/Layout";
import { Preloader } from "@/components/layout/Preloader";
import Index from "./pages/Index";
import Productos from "./pages/Catalogo";
import ProductoDetalle from "./pages/ProductoDetalle";
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contacto";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import ScrollToTop from "@/components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <Preloader />
        <BrowserRouter>
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/producto/:id" element={<ProductoDetalle />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
