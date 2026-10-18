import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 text-center">
      <span className="font-serif text-4xl sm:text-6xl tracking-[0.3em] font-normal text-black mb-4">
        {siteConfig.name}
      </span>
      <span className="text-[10px] uppercase tracking-[0.3em] text-[#b38e5d] font-semibold mb-2">
        ERROR 404
      </span>
      <h1 className="font-serif text-2xl sm:text-4xl uppercase tracking-wider text-neutral-900 mb-3">
        PAGE NOT FOUND
      </h1>
      <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto mb-8 font-light tracking-wide">
        The requested silhouette or archive could not be located. It may have been retired or moved.
      </p>
      <Link
        href="/"
        className="px-8 py-3.5 bg-black hover:bg-neutral-800 text-white text-xs font-semibold tracking-[0.2em] uppercase transition-colors"
      >
        RETURN TO HOME
      </Link>
    </div>
  );
}
