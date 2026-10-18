export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  category: 'luxury-pret' | 'formals' | 'kids' | 'winter-2026' | 'lawn' | 'bridal';
  categoryLabel: string;
  description: string;
  details: string[];
  fabric: string;
  care: string[];
  images: string[];
  sizes: ('XS' | 'S' | 'M' | 'L' | 'XL')[];
  inStock: boolean;
  isNew?: boolean;
  isTrending?: boolean;
  isBestSeller?: boolean;
  discountPercentage?: number;
  rating?: number;
  reviewCount?: number;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}

export type CategoryKey = 
  | 'all'
  | 'luxury-pret' 
  | 'formals' 
  | 'kids' 
  | 'winter-2026' 
  | 'lawn'
  | 'bridal';
