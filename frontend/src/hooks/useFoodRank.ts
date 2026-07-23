import { useMemo } from "react";
import type { MenuCard } from "../types/MenuCard";
import type { FoodRankRule } from "../services/foodRankRuleService";
import { calculateFoodRankScore } from "../utils/foodRank.ts";

interface Props {
  cards: MenuCard[];
  selectedSubCategory: string;
  sortBy: string;
  rules: FoodRankRule[];
}

export function useFoodRank({
  cards,
  selectedSubCategory,
  sortBy,
  rules,
}: Props) {
  return useMemo(() => {
    const cheapestPrice = Math.min(
  ...cards.map((x) => x.price)
);
    let result = [...cards];
    result = result.map((card) => ({
  ...card,
  foodRankScore: calculateFoodRankScore(
    card,
    cheapestPrice,
    rules
  ),
}));


    // Alt kategori filtresi
    if (selectedSubCategory) {
      result = result.filter(
        (card) => card.itemName === selectedSubCategory
      );
    }

    // Şimdilik Google puanına göre sıralıyoruz.
    // Bir sonraki adımda burada FoodRank hesaplanacak.
    result.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.googleRating - a.googleRating;

        case "reviews":
          return b.googleReviews - a.googleReviews;

        case "priceAsc":
          return a.price - b.price;

        case "priceDesc":
          return b.price - a.price;

        default:
          return (b.foodRankScore ?? 0) - (a.foodRankScore ?? 0);
  
      }
    });

    return result;
  }, [cards, selectedSubCategory, sortBy, rules]);
}
