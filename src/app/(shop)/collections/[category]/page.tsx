import React from "react";
import { notFound } from "next/navigation";
import { MOCK_PRODUCTS } from "@/lib/constants";
import { ProductCard } from "@/components/common/ProductCard";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category } = await params;
  const readableTitle = category
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `${readableTitle} | LUCY Haute Couture`,
    description: `Discover luxury ${readableTitle} garments crafted with exquisite detailing by LUCY.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  const validCategories: Record<string, string> = {
    "luxury-pret": "Luxury Pret",
    "formals": "Formals & Festive",
    "kids": "LUCY Kids",
    "winter-2026": "Winter 2026 Edit",
    "bridal": "Bridal Couture",
    "lawn": "Luxury Festive Lawn",
  };

  const categoryTitle = validCategories[category] || category.replace("-", " ").toUpperCase();

  // Filter products by category (or all if not matched)
  const products = MOCK_PRODUCTS.filter((p) => p.category === category);

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Category Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#b38e5d] font-semibold block mb-2">
          COLLECTION
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl uppercase font-normal tracking-wider text-neutral-900">
          {categoryTitle}
        </h1>
        <div className="w-12 h-0.5 bg-[#b38e5d] mx-auto mt-4" />
        <p className="text-xs text-neutral-500 font-light mt-3 tracking-widest">
          SHOWING {products.length > 0 ? products.length : "NO"} PIECES
        </p>
      </div>

      {/* Product Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 space-y-4">
          <p className="text-sm text-neutral-500 font-light">
            New pieces are currently being finished at the atelier for this collection.
          </p>
          <div className="pt-2">
            <a
              href="/collections/luxury-pret"
              className="inline-block px-6 py-3 bg-black text-white text-xs uppercase tracking-[0.2em] font-medium"
            >
              EXPLORE LUXURY PRET
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
