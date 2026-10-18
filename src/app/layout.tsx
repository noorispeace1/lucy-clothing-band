import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { UIProvider } from "@/context/UIContext";
import { siteConfig } from "@/config/site";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Lucy Clothing",
    "Luxury Pret Bangladesh",
    "Haute Couture",
    "Winter 2026 Collection",
    "Formals",
    "Kids Festive",
    "Banani Dhaka Boutique",
  ],
  authors: [{ name: "LUCY Haute Couture" }],
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans bg-white text-neutral-900 antialiased selection:bg-[#b38e5d] selection:text-white">
        <UIProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </UIProvider>
      </body>
    </html>
  );
}
