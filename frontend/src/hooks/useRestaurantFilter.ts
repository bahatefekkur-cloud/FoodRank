import type { MenuCard } from "../types/MenuCard";

interface Props {
  menuCards: MenuCard[];
  search: string;
  selectedCategory: string;
  selectedSubCategory: string;
  sortBy: string;
}

export function useRestaurantFilter({
  menuCards,
  search,
  selectedCategory,
  selectedSubCategory,
  sortBy,
}: Props) {
  return [...menuCards]
    .filter((item) => {
      const text = search.trim().toLowerCase();

      const matchesSearch =
        item.restaurantName.toLowerCase().includes(text) ||
        item.itemName.toLowerCase().includes(text) ||
        item.category.toLowerCase().includes(text) ||
        item.district.toLowerCase().includes(text);

      const matchesCategory =
        selectedCategory === "all" ||
        item.category.trim().toLowerCase() ===
          selectedCategory.trim().toLowerCase();

      const matchesSubCategory =
        selectedSubCategory === "" ||
        item.itemName
          .toLowerCase()
          .includes(selectedSubCategory.toLowerCase());

      return (
        matchesSearch &&
        matchesCategory &&
        matchesSubCategory
);
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "google":
          return b.googleRating - a.googleRating;

        case "price":
          return a.price - b.price;

        default:
          return (b.foodRankScore ?? 0) - (a.foodRankScore ?? 0) ;
      }
    });
}