import React from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { DrawerMenu } from "@/components/common/DrawerMenu";
import { CartDrawer } from "@/components/common/CartDrawer";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-white text-neutral-900 selection:bg-[#b38e5d] selection:text-white">
      <Header />
      <DrawerMenu />
      <CartDrawer />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
