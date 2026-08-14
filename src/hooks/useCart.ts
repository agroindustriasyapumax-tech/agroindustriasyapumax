import { useState, useEffect, useCallback } from "react";
import { CartItem, Product } from "@/types";
import { calculateItemPrice } from "@/lib/utils";

const CART_STORAGE_KEY = "ecommerce-template-cart";

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error loading cart from localStorage:", e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((
    product: Product,
    quantity: number = 1,
    selectedColor?: string,
    selectedSize?: string,
    customNote?: string
  ) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [...prev, { product, quantity, selectedColor, selectedSize, customNote }];
    });
  }, []);

  const removeItem = useCallback((productId: string, selectedColor?: string, selectedSize?: string) => {
    setItems((prev) =>
      prev.filter(
        (item) =>
          !(item.product.id === productId &&
            item.selectedColor === selectedColor &&
            item.selectedSize === selectedSize)
      )
    );
  }, []);

  const updateQuantity = useCallback((
    productId: string,
    quantity: number,
    selectedColor?: string,
    selectedSize?: string
  ) => {
    if (quantity <= 0) {
      removeItem(productId, selectedColor, selectedSize);
      return;
    }

    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId &&
        item.selectedColor === selectedColor &&
        item.selectedSize === selectedSize
          ? { ...item, quantity }
          : item
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + calculateItemPrice(item), 0);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isOpen,
    openCart,
    closeCart,
    toggleCart,
  };
};
