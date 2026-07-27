import { useEffect, useState } from "react";

import { getFoodRankCards } from "../services/foodrankService";
import { getFoodRankRules, type FoodRankRule } from "../services/foodRankRuleService";

import type { MenuCard } from "../types/MenuCard";

import RestaurantGrid from "../components/restaurant/RestaurantGrid";
import RestaurantMap from "../components/map/RestaurantMap";

import { useFoodRank } from "../hooks/useFoodRank";
import { useRestaurantFilter } from "../hooks/useRestaurantFilter";
import { useFilter } from "../context/FilterContext";

export default function ResultsPage() {

  const [cards, setCards] = useState<MenuCard[]>([]);
  const [rules, setRules] = useState<FoodRankRule[]>([]);
  const [loading, setLoading] = useState(true);

  const [viewMode, setViewMode] =
    useState<"list" | "map">("list");

  const {
    subCategory,
    sortBy,
  } = useFilter();


  useEffect(() => {

    async function load() {

      const [menuCards, foodRules] = await Promise.all([
        getFoodRankCards(),
        getFoodRankRules(),
      ]);

      setCards(menuCards);
      setRules(foodRules);
      setLoading(false);

    }

    load();

  }, []);

  const filtered = useRestaurantFilter(cards);

  const ranked = useFoodRank({
    cards: filtered,
    selectedSubCategory: subCategory,
    sortBy,
    rules,
  });

  if (loading)
    return <div className="p-10">Yükleniyor...</div>;

  return (

    <div className="max-w-7xl mx-auto px-6 py-8">

      <div className="flex items-center justify-between mb-6">

        <h1 className="text-2xl font-bold">

          {ranked.length} restoran bulundu

        </h1>

        <div className="flex rounded-xl overflow-hidden border">

          <button
            onClick={() => setViewMode("list")}
            className={`px-5 py-2 ${
              viewMode === "list"
                ? "bg-black text-white"
                : "bg-white"
            }`}
          >
            ☰ Liste
          </button>

          <button
            onClick={() => setViewMode("map")}
            className={`px-5 py-2 ${
              viewMode === "map"
                ? "bg-black text-white"
                : "bg-white"
            }`}
          >
            🗺 Harita
          </button>

        </div>

      </div>

      {viewMode === "list" ? (

        <RestaurantGrid items={ranked} />

      ) : (

        <RestaurantMap items={ranked} />

      )}

    </div>

  );

}
