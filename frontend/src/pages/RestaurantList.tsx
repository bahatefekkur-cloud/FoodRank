import { useEffect, useState } from "react";

import { getFoodRankCards } from "../services/foodrankService";
import { getCategories } from "../services/categoryService";
import { getSubCategories } from "../services/subCategoryService";

import type { MenuCard as MenuCardType } from "../types/MenuCard";
import type { Category } from "../types/category";
import type { SubCategory } from "../types/subCategory";

import { useRestaurantFilter } from "../hooks/useRestaurantFilter";

import Header from "../components/layout/Header";
import SearchBar from "../components/home/SearchBar";
import CategoryGrid from "../components/home/CategoryGrid";
import SubCategoryBar from "../components/home/SubCategoryBar";
import LocationPicker from "../components/home/LocationPicker";
import FilterBar from "../components/home/FilterBar";
import MenuCard from "../components/Menu/MenuCard";

export default function RestaurantList() {
  const [menuCards, setMenuCards] = useState<MenuCardType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("foodrank");

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const [cards, cats] = await Promise.all([
          getFoodRankCards(),
          getCategories(),
        ]);

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

useEffect(() => {
  async function loadSubCategories() {
    console.log("Selected:", selectedCategory);

    if (selectedCategory === "all") {
      setSubCategories([]);
      setSelectedSubCategory("");
      return;
    }

    const category = categories.find(
      (c) => c.name === selectedCategory
    );

    console.log("Category:", category);

    if (!category) return;

    const data = await getSubCategories(category.id);

    console.log("SubCategories:", data);

    setSubCategories(data);
    setSelectedSubCategory("");
  }

  loadSubCategories();
}, [selectedCategory, categories]);

  const filteredItems = useRestaurantFilter({
    menuCards,
    search,
    selectedCategory,
    selectedSubCategory,
    sortBy,
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
          />

          <CategoryGrid
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <SubCategoryBar
            subCategories={subCategories}
            selectedSubCategory={selectedSubCategory}
            setSelectedSubCategory={setSelectedSubCategory}
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
              {filteredItems.map((item, index) => (
                <MenuCard
                  key={item.id}
                  item={item}
                  rank={index + 1}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <h2 className="text-2xl font-bold">
                😕 Sonuç bulunamadı
              </h2>

              <p className="mt-2 text-gray-500">
                Arama kriterini değiştirerek tekrar deneyin.
              </p>
            </div>
          )}

        </div>
      </main>
    </>
  );
}