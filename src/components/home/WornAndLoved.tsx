"use client";
import React, { useState } from "react";
import Link from "next/link";
import { LOOKBOOK_POSTS } from "@/lib/constants";
import { LookbookPost } from "@/types/nav";
import { formatPrice } from "@/lib/utils";
import { Heart, ArrowUpRight, ShoppingBag } from "lucide-react";
import { InstagramIcon } from "@/components/common/Icons";

export function WornAndLoved() {
  const [selectedPost, setSelectedPost] = useState<LookbookPost | null>(null);

  return (
    <section id="lookbook" className="py-20 bg-neutral-100/60 px-4 sm:px-6 lg:px-8 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#b38e5d] font-semibold mb-2">
            <InstagramIcon className="w-3.5 h-3.5" />
            <span>@LUCY.LUXURY</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl tracking-[0.15em] text-neutral-900 uppercase font-normal">
            WORN & LOVED
          </h2>
          <p className="text-xs text-neutral-500 font-light mt-2 tracking-wider">
            Tag #LucyMuse on Instagram to be featured on our curated editorial wall.
          </p>
          <div className="w-12 h-0.5 bg-[#b38e5d] mx-auto mt-4" />
        </div>

        {/* Lookbook Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {LOOKBOOK_POSTS.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-[4/5] bg-neutral-200 overflow-hidden cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <img
                src={post.imageUrl}
                alt={post.productName}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium tracking-wide">{post.username}</span>
                  <div className="flex items-center gap-1 text-[11px] text-neutral-300">
                    <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                    <span>{post.likes}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#c8a97e] block">
                    SHOP THIS LOOK
                  </span>
                  <p className="text-xs font-serif font-medium line-clamp-1">
                    {post.productName}
                  </p>
                  <p className="text-xs font-semibold text-white">
                    {formatPrice(post.price)}
                  </p>
                  <div className="pt-1 flex items-center gap-1 text-[10px] tracking-widest text-[#c8a97e] uppercase font-semibold">
                    <span>VIEW PIECE</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Look Details */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
            <div
              className="fixed inset-0"
              onClick={() => setSelectedPost(null)}
            />
            <div className="relative bg-white max-w-xl w-full z-10 overflow-hidden shadow-2xl flex flex-col md:flex-row border border-neutral-200">
              <div className="w-full md:w-1/2 aspect-[4/5] bg-neutral-100">
                <img
                  src={selectedPost.imageUrl}
                  alt={selectedPost.productName}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-neutral-900 tracking-wide">
                      {selectedPost.username}
                    </span>
                    <button
                      onClick={() => setSelectedPost(null)}
                      className="text-xs font-semibold uppercase text-neutral-400 hover:text-black tracking-widest"
                    >
                      CLOSE
                    </button>
                  </div>

                  <p className="text-xs text-neutral-600 italic mb-6 leading-relaxed">
                    "{selectedPost.caption}"
                  </p>

                  <div className="p-3 bg-neutral-50 border border-neutral-200 mb-6">
                    <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-semibold block mb-1">
                      FEATURED GARMENT
                    </span>
                    <h4 className="text-xs font-medium text-neutral-900">
                      {selectedPost.productName}
                    </h4>
                    <p className="text-xs font-bold text-black mt-1">
                      {formatPrice(selectedPost.price)}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/products/${selectedPost.productSlug}`}
                  className="w-full py-3 bg-black hover:bg-neutral-800 text-white text-xs font-semibold tracking-[0.2em] uppercase text-center flex items-center justify-center gap-2 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>VIEW PRODUCT</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
