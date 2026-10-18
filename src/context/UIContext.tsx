"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/types/product";

interface UIContextType {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lucy_wishlist");
      if (saved) {
        setWishlist(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load wishlist from storage", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("lucy_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error("Failed to save wishlist to storage", e);
    }
  }, [wishlist]);

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  return (
    <UIContext.Provider
      value={{
        isDrawerOpen,
        setIsDrawerOpen,
        isSearchOpen,
        setIsSearchOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUIContext() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUIContext must be used within a UIProvider");
  }
  return context;
}
