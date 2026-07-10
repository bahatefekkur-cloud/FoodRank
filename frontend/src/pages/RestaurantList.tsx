import { useEffect, useState } from "react";

import { getFoodRankCards } from "../services/foodrankService";

import type { MenuCard as MenuCardType } from "../types/MenuCard";

import MenuCard from "../components/Menu/MenuCard";
import SearchBar from "../components/home/SearchBar";
import CategoryGrid from "../components/home/CategoryGrid";
import LocationPicker from "../components/home/LocationPicker";
import FilterBar from "../components/home/FilterBar";


export default function RestaurantList() {
  const [menuCards, setMenuCards] = useState<MenuCardType[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
  async function loadData() {
    const data = await getFoodRankCards();

    setMenuCards(data);
    setLoading(false);
  }

  loadData();
}, []);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("foodrank");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredItems = [...menuCards]
    .filter((item) => {
      const text = search.toLowerCase();

      const matchesSearch =
        item.restaurantName.toLowerCase().includes(text) ||
        item.itemName.toLowerCase().includes(text) ||
        item.category.toLowerCase().includes(text) ||
        item.district.toLowerCase().includes(text);

      const matchesCategory =
        selectedCategory === "" ||
        item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "google":
          return b.googleRating - a.googleRating;

        case "price":
          return a.price - b.price;

        default:
          return b.foodRankScore - a.foodRankScore;
      }
    });

    if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center text-xl">
      Yükleniyor...
    </div>
  );
}

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-8">

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <CategoryGrid
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <div className="flex flex-wrap items-center justify-between gap-4 my-6">

          <LocationPicker />

          <FilterBar
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

        </div>

        {filteredItems.length > 0 ? (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {filteredItems.map((item) => (

              <MenuCard
                key={item.id}
                item={item}
              />

            ))}

          </div>

        ) : (

          <div className="text-center py-20">

            <h2 className="text-2xl font-bold">
              😕 Sonuç bulunamadı
            </h2>

            <p className="text-gray-500 mt-2">
              Arama kriterini değiştirerek tekrar deneyin.
            </p>

          </div>

        )}

      </div>
    </main>
  );
}

