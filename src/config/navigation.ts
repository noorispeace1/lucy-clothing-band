import { NavItem } from "@/types/nav";

export const drawerNavigation: NavItem[] = [
  {
    title: "NEW ARRIVALS",
    href: "/collections/winter-2026",
    highlight: true,
    subItems: [
      { title: "Winter Festive '26", href: "/collections/winter-2026" },
      { title: "Gilded Velvet Edit", href: "/collections/winter-2026" },
      { title: "Most Trending Pieces", href: "/collections/luxury-pret" },
    ],
  },
  {
    title: "LUXURY PRET",
    href: "/collections/luxury-pret",
    subItems: [
      { title: "Embroidered 3-Piece", href: "/collections/luxury-pret" },
      { title: "Raw Silk Kurtis", href: "/collections/luxury-pret" },
      { title: "Organza & Chiffon Sets", href: "/collections/luxury-pret" },
      { title: "Co-ord Sets", href: "/collections/luxury-pret" },
    ],
  },
  {
    title: "FORMALS & FESTIVE",
    href: "/collections/formals",
    subItems: [
      { title: "Hand-Embellished Anarkalis", href: "/collections/formals" },
      { title: "Heavily Worked Ghararas", href: "/collections/formals" },
      { title: "Tissue Silk Peshwas", href: "/collections/formals" },
    ],
  },
  {
    title: "LUCY KIDS",
    href: "/collections/kids",
    subItems: [
      { title: "Little Princess Formals", href: "/collections/kids" },
      { title: "Festive Pret for Girls", href: "/collections/kids" },
      { title: "Boy's Kurta Sets", href: "/collections/kids" },
    ],
  },
  {
    title: "BRIDAL COUTURE",
    href: "/collections/bridal",
    subItems: [
      { title: "Bespoke Bridal Lehengas", href: "/collections/bridal" },
      { title: "Bridal Consultation", href: "/collections/bridal" },
    ],
  },
  {
    title: "WORN & LOVED",
    href: "/#lookbook",
  },
];

export const footerNavigation = {
  shop: [
    { title: "Winter 2026", href: "/collections/winter-2026" },
    { title: "Luxury Pret", href: "/collections/luxury-pret" },
    { title: "Formals", href: "/collections/formals" },
    { title: "Kids Collection", href: "/collections/kids" },
    { title: "Bridal Couture", href: "/collections/bridal" },
  ],
  support: [
    { title: "Track Your Order", href: "/cart" },
    { title: "Size & Fitting Guide", href: "/collections/luxury-pret" },
    { title: "Shipping & Handling", href: "/checkout" },
    { title: "Exchange & Returns Policy", href: "/collections/luxury-pret" },
    { title: "Contact Concierge", href: "/#newsletter" },
  ],
  boutiques: [
    { name: "Banani Flagship", address: "Plot 42, Road 11, Banani, Dhaka" },
    { name: "Gulshan Atelier", address: "South Avenue, Gulshan 1, Dhaka" },
    { name: "Chittagong Lounge", address: "GEC Circle, Nasirabad, Chittagong" },
  ],
};
