import { useCartContext } from "@/context/CartContext";

export function useCart() {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    subtotal,
    totalItems,
  } = useCartContext();

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    subtotal,
    totalItems,
  };
}
