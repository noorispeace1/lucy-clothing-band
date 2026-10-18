import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export function CollectionBanner() {
  return (
    <section className="relative w-full py-28 sm:py-36 bg-[#0d0d0d] overflow-hidden">
      {/* Background Cinematic Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=2000&q=85"
          alt="Bespoke Couture"
          className="w-full h-full object-cover object-center opacity-40 filter saturate-150"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#b38e5d]/20 border border-[#b38e5d]/50 text-[#c8a97e] text-[10px] tracking-[0.25em] uppercase font-medium">
            <span>MASTER ATELIER</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal uppercase tracking-wider leading-tight">
            THE ROYAL VELVET EDIT
          </h2>

          <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed tracking-wider">
            Deep tones of royal sapphire, ruby crimson, and imperial emerald. Each garment is painstakingly embroidered over hundreds of artisan hours using heritage dabka, resham, and semi-precious stone setting.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href="/collections/winter-2026"
              className="px-8 py-3.5 bg-[#b38e5d] hover:bg-[#9c7849] text-white text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 shadow-md active:scale-95"
            >
              SHOP THE EDIT
            </Link>
            <Link
              href="/collections/bridal"
              className="px-8 py-3.5 bg-transparent border border-neutral-400 text-neutral-200 hover:text-white hover:border-white text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300"
            >
              BRIDAL CONSULTATION
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
