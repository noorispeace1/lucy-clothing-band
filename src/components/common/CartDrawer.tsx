"use client";
import React from "react";
import Link from "next/link";
import { useCartContext } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

export function CartDrawer() {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    totalItems,
  } = useCartContext();

  if (!isCartDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col z-10 animate-slide-left">
        {/* Header */}
        <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
            <h2 className="text-xs uppercase font-semibold tracking-[0.2em] text-black">
              SHOPPING BAG ({totalItems})
            </h2>
          </div>
          <button
            onClick={() => setIsCartDrawerOpen(false)}
            className="p-1 text-neutral-400 hover:text-black transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <ShoppingBag className="w-12 h-12 mx-auto text-neutral-300 stroke-1" />
              <p className="text-sm text-neutral-500 font-light tracking-wide">
                Your shopping bag is currently empty.
              </p>
              <button
                onClick={() => setIsCartDrawerOpen(false)}
                className="inline-block px-6 py-2.5 bg-black text-white text-xs uppercase tracking-[0.2em] font-medium"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          ) : (
            <div className="divide-y divide-neutral-100">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}`}
                  className="py-4 first:pt-0 flex gap-4"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover bg-neutral-100 flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-medium text-neutral-900 tracking-wide line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() =>
                            removeFromCart(item.product.id, item.selectedSize)
                          }
                          className="text-neutral-400 hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[11px] text-neutral-500 block mt-0.5">
                        Size: {item.selectedSize}
                      </span>
                      <span className="text-xs font-semibold text-black block mt-1">
                        {formatPrice(item.product.price)}
                      </span>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-neutral-200">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedSize,
                              item.quantity - 1
                            )
                          }
                          className="p-1 text-neutral-500 hover:text-black"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-medium">
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
                          className="p-1 text-neutral-500 hover:text-black"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Subtotal & Checkout */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-neutral-100 bg-neutral-50 space-y-4">
            <div className="flex items-center justify-between text-xs font-semibold tracking-wider uppercase">
              <span>SUBTOTAL</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <p className="text-[10px] text-neutral-500 tracking-wide">
              Taxes and courier shipping calculated at checkout.
            </p>

            <div className="space-y-2 pt-2">
              <Link
                href="/checkout"
                onClick={() => setIsCartDrawerOpen(false)}
                className="w-full py-3.5 bg-black hover:bg-neutral-800 text-white text-xs font-semibold tracking-[0.2em] uppercase text-center block transition-colors"
              >
                PROCEED TO CHECKOUT
              </Link>
              <Link
                href="/cart"
                onClick={() => setIsCartDrawerOpen(false)}
                className="w-full py-3 bg-white border border-neutral-300 text-neutral-800 hover:bg-neutral-100 text-xs font-semibold tracking-[0.2em] uppercase text-center block transition-colors"
              >
                VIEW SHOPPING BAG
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
