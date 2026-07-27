import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Header from "../components/layout/Header";

import CityFilter from "../components/category/CityFilter";
import DistrictFilter from "../components/category/DistrictFilter";

import RestaurantGrid from "../components/restaurant/RestaurantGrid";
import RestaurantMap from "../components/map/RestaurantMap";

import {
  getSubCategoryBySlug,
} from "../services/subCategoryService";

import {
  getFoodRankCardsBySubCategory,
} from "../services/foodrankService";

import { getCities } from "../services/cityService";
import { getDistricts } from "../services/districtService";

import {
  getFoodRankRules,
  type FoodRankRule,
} from "../services/foodRankRuleService";

import { useFoodRank } from "../hooks/useFoodRank";

import type { MenuCard } from "../types/MenuCard";
import type { SubCategory } from "../types/subCategory";
import { getCategoryById } from "../services/categoryService";

export default function SubCategoryPage() {

  const { slug } = useParams();

  const [subCategory, setSubCategory] =
    useState<SubCategory | null>(null);

  const [cards, setCards] =
    useState<MenuCard[]>([]);

  const [cities, setCities] =
    useState<string[]>([]);

  const [districts, setDistricts] =
    useState<string[]>([]);

  const [selectedCity, setSelectedCity] =
    useState("");

  const [selectedDistrict, setSelectedDistrict] =
    useState("");

  const [sortBy, setSortBy] =
    useState("recommended");

  const [view, setView] =
    useState<"list" | "map">("list");

  const [loading, setLoading] =
    useState(true);

  const [foodRankRules, setFoodRankRules] =
    useState<FoodRankRule[]>([]);

  const [parentCategory, setParentCategory] = useState<any>(null);

  useEffect(() => {

    async function loadPage() {

      if (!slug) return;

      setLoading(true);

      const sub =
        await getSubCategoryBySlug(slug);

      if (!sub) {
        setLoading(false);
        return;
      }

      setSubCategory(sub);

      const category = await getCategoryById(sub.category_id);

      setParentCategory(category);

      const [cityList, rules] =
        await Promise.all([
          getCities(),
          getFoodRankRules(),
        ]);

      setCities(cityList);
      setFoodRankRules(rules);

      if (cityList.length > 0) {
        setSelectedCity(cityList[0]);
      }

      setLoading(false);

    }

    loadPage();

  }, [slug]);

  useEffect(() => {

    async function loadDistrictList() {

      if (!selectedCity) {
        setDistricts([]);
        setSelectedDistrict("");
        return;
      }

      const list =
        await getDistricts(selectedCity);

      setDistricts(list);

      if (selectedDistrict &&
          !list.includes(selectedDistrict)) {
        setSelectedDistrict("");
      }

    }

    loadDistrictList();

  }, [selectedCity]);

    useEffect(() => {

    async function loadRestaurants() {

      if (!slug || !selectedCity) return;

      const data =
        await getFoodRankCardsBySubCategory(
          slug,
          selectedCity,
          selectedDistrict
        );

      setCards(data);

    }

    loadRestaurants();

  }, [
    slug,
    selectedCity,
    selectedDistrict,
  ]);

  const filteredCards = useFoodRank({
    cards,
    selectedSubCategory: "",
    sortBy,
    rules: foodRankRules,
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Yükleniyor...
      </div>
    );
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-8">

          <Link
  to={`/category/${parentCategory?.slug}`}
  className="text-orange-500 font-semibold"
>
  ← {parentCategory?.name}
</Link>

          <h1 className="mt-6 mb-8 text-5xl font-bold">
            {subCategory?.name}
          </h1>

          <div className="mb-8 flex flex-wrap items-end gap-4">

            <div className="w-56">
              <CityFilter
                cities={cities}
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
              />
            </div>

            <div className="w-56">
              <DistrictFilter
                districts={districts}
                selectedDistrict={selectedDistrict}
                setSelectedDistrict={setSelectedDistrict}
              />
            </div>

          </div>

          <div className="mb-8 flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold">
                {filteredCards.length} restoran bulundu
              </h2>

              <div className="mt-3 flex gap-2">

                <button
                  onClick={() => setView("list")}
                  className={`rounded-xl px-4 py-2 ${
                    view === "list"
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  ☰ Liste
                </button>

                <button
                  onClick={() => setView("map")}
                  className={`rounded-xl px-4 py-2 ${
                    view === "map"
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  🗺 Harita
                </button>

              </div>

            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border bg-white px-4 py-2 shadow-sm"
            >
              <option value="recommended">
                ⭐ Önerilen
              </option>

              <option value="google">
                ⭐ En Yüksek Puan
              </option>

              <option value="reviews">
                💬 En Çok Yorum
              </option>

              <option value="price">
                💰 Fiyat
              </option>

            </select>

          </div>

          {view === "list" ? (
            <RestaurantGrid items={filteredCards} />
          ) : (
            <RestaurantMap items={filteredCards} />
          )}

        </div>
      </main>
    </>
  );
}