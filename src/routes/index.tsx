import { createFileRoute } from "@tanstack/react-router";
import { Storefront } from "@/components/storefront";

// The home route ships no og:image, so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "لیان | فروشگاه محصولات حیوانات خانگی" },
      {
        name: "description",
        content: "زندگی شادتر با محصولات لیان؛ غذای حیوانات، اسباب‌بازی و لوازم سگ و گربه.",
      },
      { property: "og:title", content: "لیان | فروشگاه محصولات حیوانات خانگی" },
      {
        property: "og:description",
        content: "غذا، اسباب‌بازی و لوازم دوست‌داشتنی برای حیوانات خانگی شما در لیان.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Storefront,
});
