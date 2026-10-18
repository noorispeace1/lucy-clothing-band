import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MOCK_PRODUCTS } from "@/lib/constants";
import { ProductDetailClient } from "@/components/common/ProductDetailClient";
import { ProductCard } from "@/components/common/ProductCard";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found | LUCY",
    };
  }

  return {
    title: `${product.name} | LUCY Haute Couture`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="py-8 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-neutral-400 mb-8">
        <Link href="/" className="hover:text-black">
          Home
        </Link>
        <span>/</span>
        <Link href={`/collections/${product.category}`} className="hover:text-black">
          {product.categoryLabel}
        </Link>
        <span>/</span>
        <span className="text-neutral-900 font-medium truncate max-w-[200px] sm:max-w-none">
          {product.name}
        </span>
      </nav>

      {/* Main Product Showcase */}
      <ProductDetailClient product={product} />

      {/* Related / Complete The Look */}
      {relatedProducts.length > 0 && (
        <div className="mt-24 pt-16 border-t border-neutral-200">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#b38e5d] font-semibold block mb-2">
              COMPLEMENTARY SILHOUETTES
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl uppercase font-normal tracking-wider">
              YOU MAY ALSO ADMIRE
            </h2>
            <div className="w-12 h-0.5 bg-[#b38e5d] mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
