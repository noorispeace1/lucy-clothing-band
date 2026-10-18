"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useCartContext } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { ShieldCheck, CheckCircle2, ShoppingBag } from "lucide-react";

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCartContext();
  const [paymentMethod, setPaymentMethod] = useState("bkash");
  const [isOrdered, setIsOrdered] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "Dhaka",
    postalCode: "",
    notes: "",
  });

  const shipping = subtotal >= 10000 || subtotal === 0 ? 0 : 250;
  const grandTotal = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrdered(true);
    clearCart();
  };

  if (isOrdered) {
    return (
      <div className="py-24 max-w-xl mx-auto px-4 text-center space-y-6">
        <CheckCircle2 className="w-16 h-16 mx-auto text-[#b38e5d] stroke-[1.2]" />
        <h1 className="font-serif text-3xl uppercase tracking-wider text-neutral-900">
          ORDER RECEIVED
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
          Thank you for choosing LUCY Haute Couture. Your bespoke order has been assigned reference <strong className="text-black">#LCY-2026-9842</strong>. Our client concierge will contact you shortly to confirm your delivery specifications.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-block px-8 py-3.5 bg-black text-white hover:bg-neutral-800 text-xs font-semibold tracking-[0.2em] uppercase transition-colors"
          >
            RETURN TO BOUTIQUE
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="py-24 max-w-xl mx-auto px-4 text-center space-y-4">
        <ShoppingBag className="w-12 h-12 mx-auto text-neutral-400 stroke-1" />
        <h1 className="font-serif text-2xl uppercase tracking-wider">
          NO ITEMS TO CHECK OUT
        </h1>
        <p className="text-xs text-neutral-500">
          Your shopping bag is currently empty.
        </p>
        <Link
          href="/collections/luxury-pret"
          className="inline-block px-6 py-3 bg-black text-white text-xs uppercase tracking-widest"
        >
          EXPLORE CATALOG
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#b38e5d] font-semibold block mb-1">
          SECURE ENCRYPTED CHECKOUT
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl uppercase tracking-wider text-neutral-900">
          DELIVERY & PAYMENT
        </h1>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Shipping Form Left (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Customer Details */}
          <div className="space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-900 pb-2 border-b border-neutral-200">
              1. CLIENT CONTACT
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="First Name"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Nusrat"
              />
              <Input
                label="Last Name"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Jahan"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Phone Number"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+880 1700-000000"
              />
              <Input
                label="Email Address"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="nusrat@example.com"
              />
            </div>
          </div>

          {/* Delivery Address */}
          <div className="space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-900 pb-2 border-b border-neutral-200">
              2. SHIPPING ADDRESS (BANGLADESH)
            </h2>
            <Input
              label="Street Address / House / Road"
              name="address"
              required
              value={formData.address}
              onChange={handleInputChange}
              placeholder="House 14, Road 7, Block D, Banani"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <label className="text-[11px] font-semibold tracking-wider uppercase text-neutral-600">
                  City / Region
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="px-4 py-3 bg-white border border-neutral-300 text-xs tracking-wider uppercase focus:outline-none focus:border-black"
                >
                  <option value="Dhaka">Dhaka Metropolitan</option>
                  <option value="Chittagong">Chittagong</option>
                  <option value="Sylhet">Sylhet</option>
                  <option value="Rajshahi">Rajshahi</option>
                  <option value="Khulna">Khulna</option>
                  <option value="Cox's Bazar">Cox's Bazar</option>
                  <option value="Other">Other Districts</option>
                </select>
              </div>
              <Input
                label="Postal Code (Optional)"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                placeholder="1213"
              />
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-900 pb-2 border-b border-neutral-200">
              3. PAYMENT METHOD
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: "bkash", label: "bKash Digital Payment", sub: "Instant 1.5% cashback" },
                { id: "nagad", label: "Nagad Gateway", sub: "Fast mobile checkout" },
                { id: "card", label: "Credit / Debit Card", sub: "Visa, Mastercard, Amex" },
                { id: "cod", label: "Cash On Delivery", sub: "Pay upon courier arrival" },
              ].map((method) => (
                <label
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`p-4 border cursor-pointer flex flex-col justify-between transition-all ${
                    paymentMethod === method.id
                      ? "border-black bg-neutral-50 shadow-sm"
                      : "border-neutral-200 hover:border-neutral-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-black">
                      {method.label}
                    </span>
                    <input
                      type="radio"
                      name="paymentOption"
                      checked={paymentMethod === method.id}
                      onChange={() => setPaymentMethod(method.id)}
                      className="accent-black"
                    />
                  </div>
                  <span className="text-[11px] text-neutral-500 mt-1">
                    {method.sub}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary Right (5 cols) */}
        <div className="lg:col-span-5 bg-neutral-50 p-6 sm:p-8 border border-neutral-200 space-y-6">
          <h2 className="font-serif text-lg uppercase tracking-wider text-neutral-900 pb-3 border-b border-neutral-200">
            SUMMARY ({cart.length} ITEMS)
          </h2>

          <div className="max-h-72 overflow-y-auto divide-y divide-neutral-200 pr-1 space-y-3">
            {cart.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedSize}`}
                className="pt-3 first:pt-0 flex items-center gap-3"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-14 h-18 object-cover bg-neutral-200 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-medium text-neutral-900 truncate">
                    {item.product.name}
                  </h4>
                  <span className="text-[10px] text-neutral-500 block">
                    Size: {item.selectedSize} &times; {item.quantity}
                  </span>
                  <span className="text-xs font-semibold text-black block mt-0.5">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-neutral-200 space-y-2 text-xs tracking-wide">
            <div className="flex justify-between text-neutral-600">
              <span>Subtotal</span>
              <span className="text-black font-medium">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Courier Delivery</span>
              <span className="text-black font-medium">
                {shipping === 0 ? "FREE" : formatPrice(shipping)}
              </span>
            </div>
            <div className="pt-3 border-t border-neutral-200 flex justify-between text-sm sm:text-base font-semibold text-neutral-900">
              <span>GRAND TOTAL</span>
              <span>{formatPrice(grandTotal)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-black hover:bg-neutral-800 text-white text-xs font-semibold tracking-[0.2em] uppercase transition-colors shadow-md active:scale-[0.99]"
          >
            CONFIRM & PLACE ORDER
          </button>

          <div className="text-center text-[10px] uppercase tracking-wider text-neutral-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#b38e5d]" />
            <span>Guaranteed Safe Checkout by LUCY</span>
          </div>
        </div>
      </form>
    </div>
  );
}
