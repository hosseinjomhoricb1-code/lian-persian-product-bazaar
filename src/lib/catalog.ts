import food from "@/assets/food.png.asset.json";
import toy from "@/assets/toy.png.asset.json";
import care from "@/assets/care.png.asset.json";
import bed from "@/assets/bed.png.asset.json";
import collar from "@/assets/collar.png.asset.json";
import carrier from "@/assets/carrier.png.asset.json";
import clothing from "@/assets/clothing.png.asset.json";
import other from "@/assets/other.png.asset.json";
import kibble from "@/assets/kibble.png.asset.json";
import rope from "@/assets/rope.png.asset.json";
import sofa from "@/assets/sofa.png.asset.json";
import brush from "@/assets/brush.png.asset.json";
import hoodie from "@/assets/hoodie.png.asset.json";
import litter from "@/assets/litter.png.asset.json";
import duck from "@/assets/duck.png.asset.json";
import tree from "@/assets/tree.png.asset.json";

export const categories = [
  { id: "food", name: "غذای حیوانات", image: food.url },
  { id: "toy", name: "اسباب‌بازی", image: toy.url },
  { id: "care", name: "لوازم بهداشتی", image: care.url },
  { id: "bed", name: "تجهیزات رفاهی", image: bed.url },
  { id: "collar", name: "قلاده و بند", image: collar.url },
  { id: "carrier", name: "باکس و حمل‌ونقل", image: carrier.url },
  { id: "clothing", name: "لباس و اکسسوری", image: clothing.url },
  { id: "other", name: "سایر محصولات", image: other.url },
];
export type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  pet: "cat" | "dog" | "both";
  rating: number;
  fresh?: boolean;
};
export const products: Product[] = [
  {
    id: "kibble",
    name: "غذای خشک گربه رویال",
    image: kibble.url,
    price: 355000,
    category: "food",
    pet: "cat",
    rating: 4.7,
  },
  {
    id: "rope",
    name: "اسباب‌بازی طنابی سگ",
    image: rope.url,
    price: 95000,
    category: "toy",
    pet: "dog",
    rating: 4.5,
  },
  {
    id: "sofa",
    name: "خوابگاه حیوانات",
    image: sofa.url,
    price: 770000,
    category: "bed",
    pet: "both",
    rating: 4.6,
  },
  {
    id: "brush",
    name: "برس مخصوص حیوانات",
    image: brush.url,
    price: 170000,
    category: "care",
    pet: "both",
    rating: 4.4,
  },
  {
    id: "hoodie",
    name: "هودی صورتی حیوانات",
    image: hoodie.url,
    price: 285000,
    category: "clothing",
    pet: "both",
    rating: 4.5,
    fresh: true,
  },
  {
    id: "litter",
    name: "ظرف خاک گربه",
    image: litter.url,
    price: 420000,
    category: "care",
    pet: "cat",
    rating: 4.6,
    fresh: true,
  },
  {
    id: "duck",
    name: "اسباب‌بازی اردک",
    image: duck.url,
    price: 85000,
    category: "toy",
    pet: "both",
    rating: 4.4,
    fresh: true,
  },
  {
    id: "tree",
    name: "درخت و اسکرچر گربه",
    image: tree.url,
    price: 1250000,
    category: "bed",
    pet: "cat",
    rating: 4.7,
    fresh: true,
  },
];
export const persianNumber = (value: number) => value.toLocaleString("fa-IR");
export const priceLabel = (value: number) => `${persianNumber(value)} تومان`;
export function filterProducts(
  items: Product[],
  query: string,
  category: string,
  favorites: string[] = [],
) {
  return items.filter(
    (p) =>
      p.name.includes(query.trim()) &&
      (!category ||
        (category === "favorites"
          ? favorites.includes(p.id)
          : category === "dog" || category === "cat"
            ? p.pet === category || p.pet === "both"
            : p.category === category)),
  );
}
export function cartTotal(cart: Record<string, number>) {
  return products.reduce((sum, p) => sum + p.price * (cart[p.id] || 0), 0);
}
