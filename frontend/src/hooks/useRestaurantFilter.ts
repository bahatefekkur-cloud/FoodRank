import type { MenuCard } from "../types/MenuCard";
import { useFilter } from "../context/FilterContext";

export function useRestaurantFilter(menuCards: MenuCard[]) {
  const {
  city,
  category,
  subCategory,
  search,
  sortBy,
} = useFilter();
  return [...menuCards]
    .filter((item) => {
      const text = search.trim().toLowerCase();

      const matchesSearch =
        item.restaurantName.toLowerCase().includes(text) ||
        item.itemName.toLowerCase().includes(text) ||
        item.category.toLowerCase().includes(text) ||
        item.district.toLowerCase().includes(text);

      const matchesCategory =
        category === "" ||
        category === "all" ||
        item.category.trim().toLowerCase() ===
          category.trim().toLowerCase();

      const matchesSubCategory =
        subCategory === "" ||
        item.itemName
          .toLowerCase()
          .includes(subCategory.toLowerCase());

      const matechesCity =
        city === "" ||
        item.city === city;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesSubCategory &&
        matechesCity
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