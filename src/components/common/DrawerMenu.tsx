"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useUIContext } from "@/context/UIContext";
import { drawerNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { X, ChevronDown, ChevronUp, MapPin, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/common/Icons";

export function DrawerMenu() {
  const { isDrawerOpen, setIsDrawerOpen } = useUIContext();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  if (!isDrawerOpen) return null;

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 left-0 max-w-sm w-full bg-white shadow-2xl flex flex-col z-10 animate-slide-right">
        {/* Drawer Header */}
        <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
          <Link
            href="/"
            onClick={() => setIsDrawerOpen(false)}
            className="font-serif text-2xl tracking-[0.25em] text-black"
          >
            {siteConfig.name}
          </Link>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-2 text-neutral-500 hover:text-black transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Categories Navigation */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
          <div className="space-y-1">
            {drawerNavigation.map((item, idx) => {
              const isExpanded = expandedIndex === idx;
              const hasSub = item.subItems && item.subItems.length > 0;

              return (
                <div key={item.title} className="border-b border-neutral-100 pb-2">
                  <div className="flex items-center justify-between py-2.5">
                    <Link
                      href={item.href}
                      onClick={() => setIsDrawerOpen(false)}
                      className={`text-xs uppercase font-medium tracking-[0.2em] transition-colors ${
                        item.highlight
                          ? "text-[#b38e5d] font-semibold"
                          : "text-neutral-800 hover:text-black"
                      }`}
                    >
                      {item.title}
                    </Link>

                    {hasSub && (
                      <button
                        onClick={() => toggleExpand(idx)}
                        className="p-1 text-neutral-400 hover:text-black"
                        aria-label="Toggle subcategories"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 stroke-[1.5]" />
                        ) : (
                          <ChevronDown className="w-4 h-4 stroke-[1.5]" />
                        )}
                      </button>
                    )}
                  </div>

                  {hasSub && isExpanded && (
                    <div className="pl-4 pb-2 space-y-2 border-l border-neutral-200 ml-1 animate-fade-in">
                      {item.subItems!.map((sub) => (
                        <Link
                          key={sub.title}
                          href={sub.href}
                          onClick={() => setIsDrawerOpen(false)}
                          className="block text-[11px] text-neutral-500 hover:text-black tracking-wider transition-colors py-1"
                        >
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick links & VIP Concierge */}
          <div className="pt-6 space-y-3">
            <h4 className="text-[10px] uppercase font-bold tracking-[0.25em] text-neutral-400">
              Customer Concierge
            </h4>
            <div className="space-y-2 text-xs text-neutral-600">
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="flex items-center gap-2 hover:text-black transition-colors"
              >
                <Phone className="w-3.5 h-3.5 stroke-[1.5]" />
                <span>{siteConfig.contact.phone}</span>
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 stroke-[1.5] mt-0.5" />
                <span className="text-[11px] leading-relaxed">
                  {siteConfig.contact.flagshipStore}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Footer with Socials */}
        <div className="p-6 border-t border-neutral-100 bg-neutral-50/50">
          <div className="flex items-center justify-between text-neutral-600">
            <div className="flex items-center gap-4">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="hover:text-black transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="hover:text-black transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
            </div>
            <span className="text-[10px] tracking-widest uppercase text-neutral-400">
              Dhaka, Bangladesh
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
