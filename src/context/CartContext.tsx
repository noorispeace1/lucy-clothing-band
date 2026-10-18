"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, CartItem } from "@/types/product";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, selectedSize?: string, quantity?: number) => void;
  removeFromCart: (productId: string, selectedSize: string) => void;
  updateQuantity: (productId: string, selectedSize: string, quantity: number) => void;
  clearCart: () => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  subtotal: number;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // Initialize from local storage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem("lucy_cart");
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load cart from storage", e);
    }
  }, []);

  // Save to local storage on cart change
  useEffect(() => {
    try {
      localStorage.setItem("lucy_cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart to storage", e);
    }
  }, [cart]);

  const addToCart = (product: Product, selectedSize = "M", quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [...prev, { product, selectedSize, quantity }];
    });
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (productId: string, selectedSize: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedSize === selectedSize)
      )
    );
  };

  const updateQuantity = (productId: string, selectedSize: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedSize === selectedSize) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => setCart([]);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        subtotal,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
}
