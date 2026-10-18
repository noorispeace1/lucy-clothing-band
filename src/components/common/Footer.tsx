import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { footerNavigation } from "@/config/navigation";
import { MapPin, Phone, Mail } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/common/Icons";

export function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-300 pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-neutral-800">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl tracking-[0.25em] text-white block">
                {siteConfig.name}
              </span>
              <span className="text-[9px] tracking-[0.35em] uppercase text-[#b38e5d] block mt-0.5">
                Haute Couture
              </span>
            </Link>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Luxury Collections */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white mb-4">
              COLLECTIONS
            </h3>
            <ul className="space-y-2.5">
              {footerNavigation.shop.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-xs text-neutral-400 hover:text-[#b38e5d] transition-colors tracking-wide"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white mb-4">
              CLIENT SERVICES
            </h3>
            <ul className="space-y-2.5">
              {footerNavigation.support.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-xs text-neutral-400 hover:text-[#b38e5d] transition-colors tracking-wide"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Flagship Boutiques */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white mb-4">
              BOUTIQUES & ATELIER
            </h3>
            <div className="space-y-3">
              {footerNavigation.boutiques.map((b) => (
                <div key={b.name} className="text-xs">
                  <span className="text-white font-medium block tracking-wide">
                    {b.name}
                  </span>
                  <span className="text-neutral-400 text-[11px] block mt-0.5">
                    {b.address}
                  </span>
                </div>
              ))}
              <div className="pt-2 text-xs text-neutral-400 space-y-1">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#b38e5d]" />
                  <span>{siteConfig.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#b38e5d]" />
                  <span>{siteConfig.contact.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Payment Badges */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p className="text-[11px] tracking-wider">
            &copy; 2026 {siteConfig.name} CLOTHING. ALL RIGHTS RESERVED.
          </p>

          <div className="flex items-center gap-3 text-[10px] tracking-wider uppercase">
            <span className="border border-neutral-800 px-2 py-1 bg-neutral-900 rounded text-neutral-400">
              bKash
            </span>
            <span className="border border-neutral-800 px-2 py-1 bg-neutral-900 rounded text-neutral-400">
              Nagad
            </span>
            <span className="border border-neutral-800 px-2 py-1 bg-neutral-900 rounded text-neutral-400">
              Visa / Mastercard
            </span>
            <span className="border border-neutral-800 px-2 py-1 bg-neutral-900 rounded text-neutral-400">
              Cash On Delivery
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
