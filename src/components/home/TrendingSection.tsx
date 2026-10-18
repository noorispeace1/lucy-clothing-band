"use client";
import React, { useState } from "react";
import Link from "next/link";
import { MOCK_PRODUCTS } from "@/lib/constants";
import { ProductCard } from "@/components/common/ProductCard";
import { Tabs } from "@/components/ui/tabs";

const FILTER_TABS = [
  { id: "all", label: "ALL PIECES" },
  { id: "winter-2026", label: "WINTER '26" },
  { id: "luxury-pret", label: "LUXURY PRET" },
  { id: "formals", label: "FORMALS" },
  { id: "kids", label: "LUCY KIDS" },
];

export function TrendingSection() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredProducts =
    activeTab === "all"
      ? MOCK_PRODUCTS
      : MOCK_PRODUCTS.filter((p) => p.category === activeTab);

  return (
    <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#b38e5d] font-semibold block mb-2">
            CLIENT FAVORITES
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl tracking-[0.15em] text-neutral-900 uppercase font-normal">
            MOST TRENDING
          </h2>
          <div className="w-12 h-0.5 bg-[#b38e5d] mx-auto mt-4 mb-8" />

          {/* Interactive Filter Tabs */}
          <Tabs
            tabs={FILTER_TABS}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Action Button */}
        <div className="text-center mt-12 sm:mt-16">
          <Link
            href="/collections/luxury-pret"
            className="inline-block px-8 py-3.5 border border-black text-black hover:bg-black hover:text-white text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300"
          >
            VIEW ENTIRE CATALOG
          </Link>
        </div>
      </div>
    </section>
  );
}
