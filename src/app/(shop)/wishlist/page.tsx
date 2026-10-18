"use client";
import React from "react";
import Link from "next/link";
import { useWishlist } from "@/hooks/useWishlist";
import { useCartContext } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCartContext();

  if (wishlist.length === 0) {
    return (
      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <Heart className="w-16 h-16 mx-auto text-neutral-300 stroke-[1.2]" />
        <h1 className="font-serif text-3xl uppercase tracking-wider text-neutral-900">
          YOUR WISHLIST IS EMPTY
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 font-light max-w-md mx-auto tracking-wide">
          Save your favorite festive looks and bespoke luxury pret pieces to revisit anytime.
        </p>
        <div className="pt-2">
          <Link
            href="/collections/luxury-pret"
            className="inline-block px-8 py-3.5 bg-black text-white hover:bg-neutral-800 text-xs font-semibold tracking-[0.2em] uppercase transition-colors"
          >
            EXPLORE COLLECTIONS
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#b38e5d] font-semibold block mb-1">
          YOUR CURATED PIECES
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl uppercase tracking-wider text-neutral-900">
          MY WISHLIST ({wishlist.length})
        </h1>
        <div className="w-12 h-0.5 bg-[#b38e5d] mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="group flex flex-col bg-white border border-neutral-100 p-3 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
              <Link href={`/products/${product.slug}`}>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
              <button
                onClick={() => toggleWishlist(product)}
                className="absolute top-2 right-2 p-1.5 bg-white/90 text-neutral-500 hover:text-red-500 rounded-full"
                aria-label="Remove from wishlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="pt-3 pb-1 flex flex-col flex-1 justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#b38e5d] font-semibold">
                  {product.categoryLabel}
                </span>
                <Link
                  href={`/products/${product.slug}`}
                  className="text-xs font-medium text-neutral-900 line-clamp-1 block mt-0.5 hover:text-[#b38e5d]"
                >
                  {product.name}
                </Link>
                <span className="text-xs font-bold text-black block mt-1">
                  {formatPrice(product.price)}
                </span>
              </div>

              <button
                onClick={() => addToCart(product, product.sizes[0] || "M", 1)}
                className="mt-4 w-full py-2 bg-black hover:bg-neutral-800 text-white text-[11px] font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>MOVE TO BAG</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
