"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useCartContext } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, subtotal, totalItems } = useCartContext();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState("");

  const shipping = subtotal >= 10000 || subtotal === 0 ? 0 : 250;
  const finalTotal = Math.max(0, subtotal - discount + shipping);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.toUpperCase() === "LUCY10") {
      const disc = Math.round(subtotal * 0.1);
      setDiscount(disc);
      setPromoMessage("10% Privilege Discount applied successfully!");
    } else {
      setPromoMessage("Invalid privilege coupon code.");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <ShoppingBag className="w-16 h-16 mx-auto text-neutral-300 stroke-[1.2]" />
        <h1 className="font-serif text-3xl uppercase tracking-wider text-neutral-900">
          YOUR BAG IS EMPTY
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 font-light max-w-md mx-auto tracking-wide">
          Explore our signature Winter '26 and Luxury Pret edits to begin curating your festive wardrobe.
        </p>
        <div className="pt-2">
          <Link
            href="/collections/luxury-pret"
            className="inline-block px-8 py-3.5 bg-black text-white hover:bg-neutral-800 text-xs font-semibold tracking-[0.2em] uppercase transition-colors"
          >
            DISCOVER COLLECTIONS
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="font-serif text-3xl sm:text-4xl uppercase tracking-wider text-neutral-900">
          YOUR SHOPPING BAG
        </h1>
        <p className="text-xs text-neutral-500 tracking-widest mt-1">
          {totalItems} {totalItems === 1 ? "PIECE" : "PIECES"} IN YOUR SELECTION
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Items Table */}
        <div className="lg:col-span-2 divide-y divide-neutral-200 border-t border-b border-neutral-200">
          {cart.map((item) => (
            <div
              key={`${item.product.id}-${item.selectedSize}`}
              className="py-6 flex flex-col sm:flex-row gap-6 items-start"
            >
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                className="w-28 sm:w-32 aspect-[3/4] object-cover bg-neutral-100 flex-shrink-0"
              />

              <div className="flex-1 flex flex-col justify-between h-full space-y-4">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[10px] tracking-[0.2em] uppercase text-[#b38e5d] font-semibold block mb-1">
                        {item.product.categoryLabel}
                      </span>
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="font-serif text-base sm:text-lg text-neutral-900 hover:text-[#b38e5d] transition-colors"
                      >
                        {item.product.name}
                      </Link>
                    </div>
                    <button
                      onClick={() =>
                        removeFromCart(item.product.id, item.selectedSize)
                      }
                      className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <span className="text-xs text-neutral-500 block mt-2">
                    Size: <strong className="text-black">{item.selectedSize}</strong>
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center border border-neutral-300">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.selectedSize,
                          item.quantity - 1
                        )
                      }
                      className="px-3 py-1.5 text-neutral-600 hover:text-black"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.selectedSize,
                          item.quantity + 1
                        )
                      }
                      className="px-3 py-1.5 text-neutral-600 hover:text-black"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="text-sm sm:text-base font-semibold text-black tracking-wide">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary & Checkout */}
        <div className="bg-neutral-50 p-6 sm:p-8 border border-neutral-200 space-y-6">
          <h2 className="font-serif text-lg uppercase tracking-wider text-neutral-900 pb-3 border-b border-neutral-200">
            ORDER SUMMARY
          </h2>

          <div className="space-y-3 text-xs tracking-wide">
            <div className="flex justify-between text-neutral-600">
              <span>Item Subtotal</span>
              <span className="font-medium text-black">{formatPrice(subtotal)}</span>
            </div>

            <div className="flex justify-between text-neutral-600">
              <span>Nationwide Courier</span>
              <span className="font-medium text-black">
                {shipping === 0 ? "COMPLIMENTARY" : formatPrice(shipping)}
              </span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-green-700 font-medium">
                <span>Privilege Discount (10%)</span>
                <span>-{formatPrice(discount)}</span>
              </div>
            )}

            <div className="pt-4 border-t border-neutral-200 flex justify-between text-sm sm:text-base font-semibold text-neutral-900">
              <span>TOTAL (BDT)</span>
              <span>{formatPrice(finalTotal)}</span>
            </div>
          </div>

          {/* Coupon Form */}
          <form onSubmit={applyPromo} className="pt-2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="PROMO CODE (e.g. LUCY10)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 px-3 py-2.5 bg-white border border-neutral-300 text-xs tracking-wider uppercase focus:outline-none focus:border-black"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-neutral-900 text-white text-[10px] font-semibold tracking-widest uppercase hover:bg-black transition-colors"
              >
                APPLY
              </button>
            </div>
            {promoMessage && (
              <p
                className={`text-[11px] mt-2 ${
                  discount > 0 ? "text-green-600" : "text-red-500"
                }`}
              >
                {promoMessage}
              </p>
            )}
          </form>

          {/* Checkout Button */}
          <Link
            href="/checkout"
            className="w-full py-4 bg-black hover:bg-neutral-800 text-white text-xs font-semibold tracking-[0.2em] uppercase text-center flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <span>PROCEED TO CHECKOUT</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="pt-2 flex items-center justify-center gap-2 text-[10px] uppercase tracking-wider text-neutral-500">
            <ShieldCheck className="w-4 h-4 text-[#b38e5d]" />
            <span>Encrypted 256-Bit Secure Checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
}
