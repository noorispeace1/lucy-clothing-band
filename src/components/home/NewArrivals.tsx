import React from "react";
import Link from "next/link";
import { CATEGORY_TILES } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export function NewArrivals() {
  return (
    <section className="py-16 sm:py-24 bg-neutral-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#b38e5d] font-semibold block mb-2">
            CURATED EDITIONS
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl tracking-[0.15em] text-neutral-900 uppercase font-normal">
            SIGNATURE CATEGORIES
          </h2>
          <div className="w-12 h-0.5 bg-[#b38e5d] mx-auto mt-4" />
        </div>

        {/* 3 Grid Banner Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {CATEGORY_TILES.map((cat) => (
            <Link
              key={cat.title}
              href={cat.link}
              className="group relative h-[450px] sm:h-[520px] overflow-hidden bg-neutral-900 flex flex-col justify-end p-8 shadow-md"
            >
              {/* Background Image */}
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-300" />

              {/* Content */}
              <div className="relative z-10 space-y-2 transform transition-transform duration-300 group-hover:-translate-y-1">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#c8a97e] font-semibold">
                  {cat.tag}
                </span>
                <h3 className="font-serif text-2xl text-white tracking-wider uppercase font-medium">
                  {cat.title}
                </h3>
                <p className="text-xs text-neutral-300 font-light tracking-wide line-clamp-2">
                  {cat.subtitle}
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-white tracking-[0.2em] uppercase group-hover:text-[#c8a97e] transition-colors">
                  <span>DISCOVER NOW</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
