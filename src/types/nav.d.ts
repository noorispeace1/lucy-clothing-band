export interface NavSubItem {
  title: string;
  href: string;
  badge?: string;
}

export interface NavItem {
  title: string;
  href: string;
  highlight?: boolean;
  subItems?: NavSubItem[];
}

export interface LookbookPost {
  id: string;
  username: string;
  imageUrl: string;
  productName: string;
  productSlug: string;
  price: number;
  caption: string;
  likes: number;
}
