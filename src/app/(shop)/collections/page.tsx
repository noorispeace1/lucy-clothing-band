import React from "react";
import Link from "next/link";
import { CATEGORY_TILES } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Collections | LUCY Haute Couture",
  description: "Explore the complete archives and ready-to-wear collections of LUCY.",
};

export default function CollectionsPage() {
  const allCategories = [
    ...CATEGORY_TILES,
    {
      title: "WINTER FESTIVE 2026",
      subtitle: "Gilded velvet & heavy resham embroidery",
      link: "/collections/winter-2026",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
      tag: "Winter Edit",
    },
    {
      title: "BRIDAL COUTURE",
      subtitle: "Bespoke handcrafted lehengas & peshwas",
      link: "/collections/bridal",
      image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80",
      tag: "Haute Couture",
    },
  ];

  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#b38e5d] font-semibold block mb-2">
          THE COMPLETE ATELIER
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl uppercase font-normal tracking-wider">
          ALL COLLECTIONS
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 font-light mt-3 tracking-wide">
          Curated silhouettes meticulously handcrafted by our master artisans.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allCategories.map((cat) => (
          <Link
            key={cat.title}
            href={cat.link}
            className="group relative h-[450px] overflow-hidden bg-neutral-900 flex flex-col justify-end p-8"
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110 opacity-85 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            <div className="relative z-10 space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#c8a97e] font-semibold">
                {cat.tag}
              </span>
              <h2 className="font-serif text-2xl text-white tracking-wider uppercase font-medium">
                {cat.title}
              </h2>
              <p className="text-xs text-neutral-300 font-light">
                {cat.subtitle}
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-white tracking-[0.2em] uppercase group-hover:text-[#c8a97e] transition-colors">
                <span>EXPLORE</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
