import type { MenuCard } from "../types/MenuCard";
import type { FoodRankRule } from "../services/foodRankRuleService";

function getScore(
  value: number,
  rules: FoodRankRule[],
  type: "rating" | "review"
) {
  const filtered = rules
    .filter((x) => x.type === type)
    .sort((a, b) => b.min_value - a.min_value);

  for (const rule of filtered) {
    if (value >= rule.min_value) {
      return rule.score;
    }
  }

  return 0;
}

export function calculateFoodRankScore(
  card: MenuCard,
  cheapestPrice: number,
  rules: FoodRankRule[]
) {
  const ratingScore = getScore(
    card.googleRating,
    rules,
    "rating"
  );

  const reviewScore = getScore(
    card.googleReviews,
    rules,
    "review"
  );

  return (
    (ratingScore + reviewScore) /
    Math.sqrt(card.price / cheapestPrice)
  );
}
