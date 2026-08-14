import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Product, CartItem } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMultiplier(selectedColor?: string): number {
  if (selectedColor === "Saco de 25 kg") return 25;
  if (selectedColor === "Saco de 40 kg") return 40;
  if (selectedColor === "Saco de 50 kg") return 50;
  return 1;
}

export function getBasePrice(product: Product, selectedSize?: string): number {
  let basePrice = product.price;
  if (selectedSize) {
    // Busca un precio en el formato "S/4.20" o similar
    const match = selectedSize.match(/S\/(\d+(\.\d+)?)/);
    if (match) {
      basePrice = parseFloat(match[1]);
    }
  }
  return basePrice;
}

export function calculateItemPrice(item: CartItem): number {
  const basePrice = getBasePrice(item.product, item.selectedSize);
  const multiplier = getMultiplier(item.selectedColor);
  return basePrice * multiplier * item.quantity;
}

export function calculateUnitTotal(product: Product, selectedColor?: string, selectedSize?: string): number {
  const basePrice = getBasePrice(product, selectedSize);
  const multiplier = getMultiplier(selectedColor);
  return basePrice * multiplier;
}
