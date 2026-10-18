"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { HERO_SLIDES } from "@/lib/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <div className="relative w-full h-[75vh] sm:h-[85vh] lg:h-[90vh] bg-black overflow-hidden select-none">
      {HERO_SLIDES.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Background Image with Dark Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/50 z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              className={`w-full h-full object-cover object-top transition-transform duration-10000 ease-out ${
                isActive ? "scale-105" : "scale-100"
              }`}
            />

            {/* Slide Content Box */}
            <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4 sm:px-6">
              <div className="max-w-4xl space-y-4 sm:space-y-6">
                <span className="inline-block text-[10px] sm:text-xs font-semibold tracking-[0.35em] text-[#c8a97e] uppercase border border-[#c8a97e]/40 px-3.5 py-1.5 backdrop-blur-sm">
                  {slide.season}
                </span>

                <h1 className="font-serif text-3xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.15em] text-white font-normal uppercase leading-tight drop-shadow-md">
                  {slide.title}
                </h1>

                <p className="text-xs sm:text-sm md:text-base text-neutral-300 font-light max-w-xl mx-auto tracking-widest leading-relaxed drop-shadow">
                  {slide.subtitle}
                </p>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                  <Link
                    href={slide.ctaLink}
                    className="px-6 sm:px-8 py-3.5 bg-white text-black hover:bg-[#b38e5d] hover:text-white text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 shadow-lg active:scale-95"
                  >
                    {slide.ctaText}
                  </Link>
                  <Link
                    href={slide.secondaryCtaLink}
                    className="px-6 sm:px-8 py-3.5 bg-transparent border border-white text-white hover:bg-white hover:text-black text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 active:scale-95"
                  >
                    {slide.secondaryCtaText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-sm transition-all"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-sm transition-all"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 inset-x-0 z-30 flex items-center justify-center gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all duration-300 h-1.5 rounded-full ${
              currentSlide === i
                ? "w-8 bg-[#c8a97e]"
                : "w-2 bg-white/40 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
