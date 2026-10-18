import { NextResponse } from "next/server";
import { MOCK_PRODUCTS } from "@/lib/constants";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const trending = searchParams.get("trending");

  let products = [...MOCK_PRODUCTS];

  if (category && category !== "all") {
    products = products.filter((p) => p.category === category);
  }

  if (trending === "true") {
    products = products.filter((p) => p.isTrending);
  }

  if (search) {
    const q = search.toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({
    success: true,
    count: products.length,
    products,
  });
}
