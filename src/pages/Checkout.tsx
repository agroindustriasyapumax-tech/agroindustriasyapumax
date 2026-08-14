import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCartContext } from "@/contexts/CartContext";
import { ArrowLeft, MessageCircle, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { socialLinks } from "@/data/mockData";
import { calculateItemPrice } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Checkout = () => {
  const scrollRef = useScrollReveal();
  const { items, totalPrice, updateQuantity, removeItem } = useCartContext();


  const [additionalNotes, setAdditionalNotes] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const generateWhatsAppMessage = () => {
    const itemsList = items
      .map((item) => {
        let details = `• ${item.product.name} x${item.quantity} - S/ ${calculateItemPrice(item).toFixed(2)}`;
        if (item.selectedColor) details += `\n  Color: ${item.selectedColor}`;
        if (item.selectedSize) details += `\n  Tamaño: ${item.selectedSize}`;
        if (item.customNote) details += `\n  Nota: ${item.customNote}`;
        return details;
      })
      .join("\n\n");

    const message = `
🛒 *SOLICITUD DE PEDIDO*

📦 *Productos:*
${itemsList}

💰 *Total: S/ ${totalPrice.toFixed(2)}*

${additionalNotes ? `📝 *Notas adicionales:*\n${additionalNotes}` : ""}

¡Gracias por tu pedido! 🙌
    `.trim();

    return encodeURIComponent(message);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = generateWhatsAppMessage();
    const phoneNumber = socialLinks.whatsapp.replace("https://wa.me/", "");
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

    window.open(whatsappUrl, "_blank");
  };

  if (items.length === 0) {
    return (
      <div className="container-custom py-20 text-center">
        <ShoppingBag className="h-20 w-20 text-muted-foreground/50 mx-auto mb-6" />
        <h1 className="font-display text-2xl font-bold mb-4">Tu carrito está vacío</h1>
        <p className="text-muted-foreground mb-6">
          Agrega algunos productos antes de continuar con tu pedido.
        </p>
        <Button asChild>
          <Link to="/productos">Ver Productos</Link>
        </Button>
      </div>
    );
  }

  return (
    <div ref={scrollRef} className="py-8 md:py-12">
      <div className="container-custom">
        <Button variant="ghost" className="mb-6" asChild>
          <Link to="/productos">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Seguir comprando
          </Link>
        </Button>

        {/* H1 — unique for this route */}
        <h1 className="font-display text-3xl font-bold mb-8 scroll-reveal">
          Finalizar Pedido
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Cart Items */}
          <div className="space-y-4 scroll-reveal-left">
            <h2 className="font-display text-xl font-semibold mb-4">Tu carrito</h2>

            {items.map((item, index) => (
              <div
                key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}-${index}`}
                className="flex gap-4 p-4 bg-card rounded-xl border border-border"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded-lg"
                  loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium line-clamp-1">{item.product.name}</h3>
                  {item.selectedColor && (
                    <p className="text-sm text-muted-foreground">Color: {item.selectedColor}</p>
                  )}
                  {item.selectedSize && (
                    <p className="text-sm text-muted-foreground">Tamaño: {item.selectedSize}</p>
                  )}
                  {item.customNote && (
                    <p className="text-sm text-muted-foreground italic">Nota: {item.customNote}</p>
                  )}
                  <p className="text-lg font-bold text-primary mt-2">
                    S/ {calculateItemPrice(item).toFixed(2)}
                  </p>

                  <div className="flex items-center gap-2 mt-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.quantity - 1,
                          item.selectedColor,
                          item.selectedSize
                        )
                      }
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.quantity + 1,
                          item.selectedColor,
                          item.selectedSize
                        )
                      }
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive ml-auto"
                      onClick={() =>
                        removeItem(item.product.id, item.selectedColor, item.selectedSize)
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center p-4 bg-muted rounded-xl">
              <span className="font-medium">Total</span>
              <span className="text-2xl font-bold text-primary">S/ {totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Customer Form */}
          <div className="scroll-reveal-right">
            <h2 className="font-display text-xl font-semibold mb-4">Detalles del pedido</h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <Label htmlFor="checkout-notes">Notas adicionales (opcional)</Label>
                <Textarea
                  id="checkout-notes"
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="¿Tienes alguna indicación especial para tu pedido?"
                  rows={3}
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

              <Button type="submit" size="lg" className="w-full group" disabled={!acceptedTerms}>
                <MessageCircle className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                Enviar pedido por WhatsApp
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                Al enviar, serás redirigido a WhatsApp con tu pedido formateado.
                Te contactaremos para confirmar disponibilidad y coordinar el pago.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
