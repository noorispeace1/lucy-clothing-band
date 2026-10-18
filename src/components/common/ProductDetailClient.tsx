"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils";
import { useCartContext } from "@/context/CartContext";
import { useUIContext } from "@/context/UIContext";
import { Heart, ShoppingBag, Check, ShieldCheck, RefreshCw, Truck } from "lucide-react";

export function ProductDetailClient({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || "M");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const { addToCart } = useCartContext();
  const { isInWishlist, toggleWishlist } = useUIContext();

  const isFavorited = isInWishlist(product.id);

  const handleAdd = () => {
    addToCart(product, selectedSize, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
      {/* Image Gallery */}
      <div className="space-y-4">
        {/* Main Big Display */}
        <div className="aspect-[3/4] w-full bg-neutral-100 overflow-hidden relative">
          <img
            src={product.images[activeImage] || product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-top"
          />
          {product.isNew && (
            <span className="absolute top-4 left-4 bg-black text-white text-[10px] tracking-[0.2em] font-medium uppercase px-3 py-1">
              NEW ATELIER PIECE
            </span>
          )}
        </div>

        {/* Thumbnail Selector */}
        {product.images.length > 1 && (
          <div className="flex items-center gap-3">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`w-20 aspect-[3/4] bg-neutral-100 overflow-hidden border-2 transition-all ${
                  activeImage === idx ? "border-black" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={img}
                  alt={`View ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Buying Info */}
      <div className="space-y-6 lg:pl-6">
        <div>
          <span className="text-[11px] font-semibold tracking-[0.25em] text-[#b38e5d] uppercase block mb-1">
            {product.categoryLabel}
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl text-neutral-900 font-normal tracking-wide">
            {product.name}
          </h1>

          <div className="flex items-center gap-3 mt-3">
            <span className="text-xl sm:text-2xl font-semibold text-black tracking-wide">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-neutral-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            {product.discountPercentage && (
              <span className="text-xs bg-red-100 text-red-800 font-semibold px-2 py-0.5 rounded">
                SAVE {product.discountPercentage}%
              </span>
            )}
          </div>
          <span className="text-[11px] text-neutral-400 block mt-1 tracking-wider uppercase">
            INCLUSIVE OF ALL TAXES & IMPORT DUTIES
          </span>
        </div>

        {/* Size Selection */}
        <div className="space-y-3 pt-4 border-t border-neutral-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-neutral-900">
              SELECT SIZE: {selectedSize}
            </span>
            <span className="text-[11px] text-neutral-500 underline cursor-pointer hover:text-black">
              Size Chart
            </span>
          </div>
          <div className="flex items-center gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-12 h-11 text-xs font-medium uppercase border transition-all ${
                  selectedSize === size
                    ? "border-black bg-black text-white"
                    : "border-neutral-300 text-neutral-800 hover:border-black"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity & Actions */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-neutral-300 h-12 px-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-neutral-500 hover:text-black px-2 text-sm"
              >
                -
              </button>
              <span className="px-4 text-xs font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="text-neutral-500 hover:text-black px-2 text-sm"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAdd}
              className="flex-1 h-12 bg-black hover:bg-neutral-800 text-white text-xs font-semibold tracking-[0.2em] uppercase flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
            >
              {added ? (
                <>
                  <Check className="w-4 h-4 text-green-400" />
                  <span>ADDED TO BAG</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO SHOPPING BAG</span>
                </>
              )}
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              className="w-12 h-12 border border-neutral-300 flex items-center justify-center text-neutral-700 hover:text-red-500 hover:border-red-500 transition-colors"
              aria-label="Wishlist"
            >
              <Heart
                className={`w-5 h-5 ${isFavorited ? "fill-red-500 text-red-500" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Guarantee Points */}
        <div className="grid grid-cols-3 gap-2 py-4 border-y border-neutral-100 text-[10px] text-neutral-600 tracking-wider uppercase">
          <div className="flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-[#b38e5d]" />
            <span>Fast Express Delivery</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#b38e5d]" />
            <span>100% Authentic Fabric</span>
          </div>
          <div className="flex items-center gap-1.5">
            <RefreshCw className="w-4 h-4 text-[#b38e5d]" />
            <span>Complimentary Exchange</span>
          </div>
        </div>

        {/* Description & Details Accordion / Sections */}
        <div className="space-y-4 pt-2">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-900 mb-2">
              DESIGNER NOTES
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed font-light">
              {product.description}
            </p>
          </div>

          <div className="pt-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-900 mb-2">
              DETAILS & CRAFTSMANSHIP
            </h3>
            <ul className="space-y-1.5 text-xs text-neutral-600 list-disc list-inside font-light">
              {product.details.map((detail, i) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>
          </div>

          <div className="pt-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-900 mb-1">
              FABRIC & CARE
            </h3>
            <p className="text-xs text-neutral-600 font-light">
              <span className="font-medium text-neutral-800">Fabric Composition:</span>{" "}
              {product.fabric}
            </p>
            <p className="text-xs text-neutral-600 font-light mt-1">
              <span className="font-medium text-neutral-800">Care Instructions:</span>{" "}
              {product.care.join(", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
