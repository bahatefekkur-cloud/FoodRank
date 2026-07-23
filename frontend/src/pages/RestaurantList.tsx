import { useEffect, useState } from "react";
import { getFoodRankCards } from "../services/foodrankService";
import { getCategories } from "../services/categoryService";
import type { MenuCard as MenuCardType } from "../types/MenuCard";
import type { Category } from "../types/category";
import { useRestaurantFilter } from "../hooks/useRestaurantFilter";
import Header from "../components/layout/Header";
import SearchBar from "../components/home/SearchBar";
import CategoryGrid from "../components/home/CategoryGrid";
import TopRestaurants from "../components/home/TopRestaurants";
import CampaignSection from "../components/home/CampaignSection";
import CityGrid from "../components/home/CityGrid";
import { useFoodRank } from "../hooks/useFoodRank";
import {
  getFoodRankRules,
  type FoodRankRule,
} from "../services/foodRankRuleService";
import Footer from "../components/layout/Footer";
import BottomNavigation from "../components/home/BottomNavigation";
import RestaurantGrid from "../components/restaurant/RestaurantGrid";

export default function RestaurantList() {
  const [menuCards, setMenuCards] = useState<MenuCardType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("foodrank");
  const [selectedCity, setSelectedCity] = useState("Bursa");
  const [foodRankRules, setFoodRankRules] =
  useState<FoodRankRule[]>([]);


  useEffect(() => {
    async function loadData() {
      try {
        const [cards, cats, rules] = await Promise.all([
          getFoodRankCards(),
          getCategories(),
          getFoodRankRules(),
        ]);

        setFoodRankRules(rules);
        setMenuCards(cards);
        setCategories(cats);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const filteredItems = useRestaurantFilter({
    menuCards,
    search,
    selectedCategory: "all",
    selectedSubCategory: "",
    sortBy,
  });

  const rankedItems = useFoodRank({
  cards: filteredItems,
  selectedSubCategory: "",
  sortBy,
  rules: foodRankRules,
});


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Yükleniyor...
      </div>
    );
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-8">

          <SearchBar
            search={search}
            setSearch={setSearch}
            suggestions={menuCards.filter(
              (x) => selectedCity === "" || x.city === selectedCity
            )}
            city={selectedCity}
          />

          <CategoryGrid categories={categories} />

          <CityGrid
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          />

          <TopRestaurants items={rankedItems} />

          <CampaignSection />

          <RestaurantGrid items={rankedItems} />

          <Footer />

          <BottomNavigation />

          

        </div>
      </main>
    </>
  );
}
