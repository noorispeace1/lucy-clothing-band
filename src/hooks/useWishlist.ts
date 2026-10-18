import { useUIContext } from "@/context/UIContext";

export function useWishlist() {
  const { wishlist, toggleWishlist, isInWishlist } = useUIContext();

  return {
    wishlist,
    toggleWishlist,
    isInWishlist,
    wishlistCount: wishlist.length,
  };
}
