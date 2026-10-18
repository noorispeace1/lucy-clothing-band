"use client";
import React, { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useUIContext } from "@/context/UIContext";
import { useCartContext } from "@/context/CartContext";
import { Menu, Search, Heart, ShoppingBag, User, X } from "lucide-react";

export function Header() {
  const { setIsDrawerOpen, wishlist } = useUIContext();
  const { totalItems, setIsCartDrawerOpen } = useCartContext();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/collections/luxury-pret?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-neutral-100 transition-all">
      {/* Top Announcement Bar - Infinite Marquee */}
      {siteConfig.announcement.enabled && (
        <div className="bg-[#111111] text-white text-[10px] sm:text-[11px] font-medium tracking-[0.2em] py-2 overflow-hidden border-b border-neutral-800 select-none">
          <div className="animate-marquee whitespace-nowrap flex items-center">
            {[0, 1, 2, 3].map((idx) => (
              <div key={idx} className="flex items-center gap-6 sm:gap-8 mx-4 sm:mx-6 shrink-0">
                <span className="text-neutral-200">{siteConfig.announcement.text}</span>
                <Link
                  href={siteConfig.announcement.linkHref}
                  className="underline underline-offset-4 text-[#c8a97e] hover:text-white transition-colors font-semibold"
                >
                  {siteConfig.announcement.linkText}
                </Link>
                <span className="text-[#b38e5d] text-[10px]">✦</span>
                <span className="text-neutral-300">BESPOKE BRIDAL ATELIER CONSULTATIONS OPEN AT BANANI</span>
                <span className="text-[#b38e5d] text-[10px]">✦</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left Actions: Menu Drawer Trigger & Search */}
          <div className="flex items-center gap-4 sm:gap-6 flex-1">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="p-1.5 text-neutral-800 hover:text-black transition-transform active:scale-95 flex items-center gap-2"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 stroke-[1.5]" />
              <span className="hidden lg:inline text-[11px] tracking-[0.2em] uppercase font-semibold text-neutral-800">
                Menu
              </span>
            </button>

            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-1.5 text-neutral-800 hover:text-black transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Center: Brand Identity "LUCY" */}
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <Link href="/" className="group inline-block">
              <span className="font-serif text-3xl sm:text-4xl tracking-[0.3em] font-normal text-black block transition-all group-hover:opacity-90">
                {siteConfig.name}
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.35em] uppercase text-neutral-400 block -mt-1 font-sans">
                Haute Couture
              </span>
            </Link>
          </div>

          {/* Right Actions: User Account, Wishlist, Shopping Bag */}
          <div className="flex items-center justify-end gap-3 sm:gap-5 flex-1">
            <Link
              href="/login"
              className="p-1.5 text-neutral-800 hover:text-black transition-colors hidden sm:inline-block"
              aria-label="Account"
            >
              <User className="w-5 h-5 stroke-[1.5]" />
            </Link>

            <Link
              href="/wishlist"
              className="p-1.5 text-neutral-800 hover:text-black transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 stroke-[1.5]" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#b38e5d] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="p-1.5 text-neutral-800 hover:text-black transition-colors relative"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Desktop Category Navigation */}
        <nav className="hidden lg:flex items-center justify-center gap-8 py-2.5 border-t border-neutral-100">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={`text-[11px] font-medium tracking-[0.2em] uppercase transition-colors hover:text-[#b38e5d] ${
                item.highlight
                  ? "text-[#b38e5d] font-semibold"
                  : "text-neutral-700"
              }`}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>

      {/* Inline Search Bar Popup */}
      {searchOpen && (
        <div className="border-t border-neutral-200 bg-neutral-50 px-4 py-4 animate-fade-in shadow-inner">
          <form
            onSubmit={handleSearchSubmit}
            className="max-w-2xl mx-auto flex items-center gap-3"
          >
            <Search className="w-5 h-5 text-neutral-400 stroke-[1.5]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH SILK KURTIS, VELVET PESHWAS, KIDS FORMALS..."
              className="flex-1 bg-transparent border-b border-neutral-400 py-1.5 text-xs tracking-wider uppercase focus:outline-none focus:border-black placeholder:text-neutral-400"
              autoFocus
            />
            <button
              type="submit"
              className="text-xs uppercase font-medium tracking-widest text-black hover:text-[#b38e5d] px-2"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="text-neutral-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}
    </header>
  );
}
