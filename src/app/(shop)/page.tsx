import React from "react";
import { HeroSlider } from "@/components/home/HeroSlider";
import { NewArrivals } from "@/components/home/NewArrivals";
import { TrendingSection } from "@/components/home/TrendingSection";
import { CollectionBanner } from "@/components/home/CollectionBanner";
import { WornAndLoved } from "@/components/home/WornAndLoved";
import { Newsletter } from "@/components/common/Newsletter";

export default function HomePage() {
  return (
    <div className="w-full">
      {/* 1. Hero Slider Banner ("Gilded Legacy / Winter 2026") */}
      <HeroSlider />

      {/* 2. Signature Categories Grid (Kids, Luxury Pret, Formals) */}
      <NewArrivals />

      {/* 3. Most Trending Products with interactive category tabs */}
      <TrendingSection />

      {/* 4. Single Large Showcase Collection Banner */}
      <CollectionBanner />

      {/* 5. Instagram & Community Lookbook ("Worn & Loved") */}
      <WornAndLoved />

      {/* 6. VIP Newsletter Subscription Section */}
      <Newsletter />
    </div>
  );
}
