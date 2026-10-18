"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils";
import { useUIContext } from "@/context/UIContext";
import { useCartContext } from "@/context/CartContext";
import { Heart, ShoppingBag, Check } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useUIContext();
  const { addToCart } = useCartContext();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || "M");
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedSize, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      className="group relative flex flex-col bg-white overflow-hidden transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Box */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <img
            src={
              isHovered && product.images[1]
                ? product.images[1]
                : product.images[0]
            }
            alt={product.name}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isNew && (
            <span className="bg-black text-white text-[9px] tracking-[0.2em] font-medium uppercase px-2.5 py-1 shadow-sm">
              NEW
            </span>
          )}
          {product.isTrending && !product.isNew && (
            <span className="bg-[#b38e5d] text-white text-[9px] tracking-[0.2em] font-medium uppercase px-2.5 py-1 shadow-sm">
              TRENDING
            </span>
          )}
          {product.discountPercentage && (
            <span className="bg-red-800 text-white text-[9px] tracking-[0.2em] font-medium uppercase px-2.5 py-1 shadow-sm">
              -{product.discountPercentage}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-neutral-700 hover:text-red-500 shadow-sm transition-all duration-200 z-10"
          aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`w-4 h-4 stroke-[1.5] ${
              isFavorited ? "fill-red-500 text-red-500" : ""
            }`}
          />
        </button>

        {/* Quick Add Overlay on Desktop Hover */}
        <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-sm p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden sm:block border-t border-neutral-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] tracking-wider uppercase text-neutral-500">
              Select Size:
            </span>
            <div className="flex items-center gap-1.5">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedSize(size);
                  }}
                  className={`text-[10px] font-medium px-1.5 py-0.5 border transition-colors ${
                    selectedSize === size
                      ? "border-black bg-black text-white"
                      : "border-neutral-200 text-neutral-600 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={handleQuickAdd}
            className="w-full py-2 bg-black hover:bg-neutral-800 text-white text-[11px] font-medium tracking-[0.2em] uppercase flex items-center justify-center gap-2 transition-colors"
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-400" />
                <span>ADDED TO BAG</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>QUICK ADD</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="pt-3 pb-2 flex flex-col flex-1">
        <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 font-medium">
          {product.categoryLabel}
        </span>
        <Link
          href={`/products/${product.slug}`}
          className="text-xs sm:text-sm font-medium tracking-wide text-neutral-900 mt-1 hover:text-[#b38e5d] transition-colors line-clamp-1"
        >
          {product.name}
        </Link>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-xs sm:text-sm font-semibold text-black tracking-wide">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-[11px] text-neutral-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
