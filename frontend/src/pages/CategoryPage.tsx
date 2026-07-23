import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getCategoryBySlug } from "../services/categoryDetailService";
import { 
  getSubCategories,
  getSubCategoryBySlug,
} from "../services/subCategoryService";
import { 
  getFoodRankCardsByCategory,
  getFoodRankCardsBySubCategory,
} from "../services/foodrankService";

import type { Category } from "../types/category";
import type { SubCategory } from "../types/subCategory";
import type { MenuCard } from "../types/MenuCard";

import Header from "../components/layout/Header";
import SubCategoryBar from "../components/home/SubCategoryBar";
import MenuCardComponent from "../components/Menu/MenuCard";
import { getCities } from "../services/cityService";
import CityFilter from "../components/category/CityFilter";
import DistrictFilter from "../components/category/DistrictFilter";
import { getDistricts } from "../services/districtService";
import {
  getFoodRankRules,
  type FoodRankRule,
} from "../services/foodRankRuleService";
import { useFoodRank } from "../hooks/useFoodRank";


export default function CategoryPage() {
  const { slug } = useParams();

  const [category, setCategory] = useState<Category | null>(null);
  const [pageTitle, setPageTitle] = useState("");
  const [isSubCategory, setIsSubCategory] = useState(false);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [cards, setCards] = useState<MenuCard[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [sortBy, setSortBy] = useState("recommended");
  const [selectedCity, setSelectedCity] = useState("");
  const [districts, setDistricts] = useState<string[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState<string[]>([]);
  const [foodRankRules, setFoodRankRules] = useState<FoodRankRule[]>([]);

  useEffect(() => {
  async function load() {
    if (!slug) return;

    setLoading(true);

    // Önce ana kategoriyi ara
    const cat = await getCategoryBySlug(slug);

    if (cat) {
      setIsSubCategory(false);
      setCategory(cat);
      setPageTitle(cat.name);

      const [subs, cityList, rules] = await Promise.all([
        getSubCategories(cat.id),
        getCities(),
        getFoodRankRules(),
      ]);

      setSubCategories(subs);
      setCities(cityList);
      setFoodRankRules(rules);

      if (cityList.length > 0) {
        setSelectedCity(cityList[0]);
      }

      setLoading(false);
      return;
    }

    // Ana kategori bulunamadıysa alt kategoriyi ara
    const sub = await getSubCategoryBySlug(slug);

    if (!sub) {
      setLoading(false);
      return;
    }

    setIsSubCategory(true);
    setPageTitle(sub.name);

    // Başlıkta kullanılacak
  setPageTitle(sub.name);

    const [subs, cityList, rules] = await Promise.all([
      getSubCategories(sub.category_id),
      getCities(),
      getFoodRankRules(),
    ]);

    setSubCategories(subs);
    setCities(cityList);
    setFoodRankRules(rules);

    if (cityList.length > 0) {
      setSelectedCity(cityList[0]);
    }

    setLoading(false);
  }

  load();
}, [slug]);


useEffect(() => {
  async function loadRestaurants() {
    if (!category || !selectedCity) return;

    const data = isSubCategory
  ? await getFoodRankCardsBySubCategory(
      slug!,
      selectedCity,
      selectedDistrict
    )
  : await getFoodRankCardsByCategory(
      category.name,
      selectedCity,
      selectedDistrict
    );

    setCards(data);
  }

  loadRestaurants();
}, [category, selectedCity, selectedDistrict]);


  useEffect(() => {
  async function loadDistricts() {
    if (!selectedCity) {
      setDistricts([]);
      setSelectedDistrict("");
      return;
    }

    const data = await getDistricts(selectedCity);

    setDistricts(data);
    setSelectedDistrict("");
  }

  loadDistricts();
}, [selectedCity]);


const filteredCards = useFoodRank({
  cards,
  selectedSubCategory,
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
            to="/"
            className="text-orange-500 font-semibold"
          >
            ← Tüm Kategoriler
          </Link>

          <h1 className="text-5xl font-bold mt-6 mb-8">
            {pageTitle}
          </h1>

<div className="flex flex-wrap gap-3 items-end mb-6">

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

<SubCategoryBar
  subCategories={subCategories}
  selectedSubCategory={selectedSubCategory}
  setSelectedSubCategory={setSelectedSubCategory}
/>

<div className="flex items-center justify-between mt-2 mb-6">

  <p className="text-sm text-gray-500 font-semibold">
    {filteredCards.length} restoran
  </p>

  <select
  value={sortBy}
  onChange={(e) => setSortBy(e.target.value)}
  className="border rounded-xl px-4 py-2 text-sm bg-white shadow-sm"
>
<option value="recommended">⭐ Önerilen</option>

<option value="rating">⭐ En Yüksek Puan</option>

<option value="reviews">💬 En Çok Yorum</option>

<option value="priceAsc">💰 Fiyat (Artan)</option>

<option value="priceDesc">💰 Fiyat (Azalan)</option>
</select>

  {/* Sıralama buraya gelecek */}

</div>


    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

      {filteredCards.map((item, index) => (
        <MenuCardComponent
          key={item.id}
          item={item}
          rank={index + 1}
        />
      ))}

    </div>

  </div>

      </main>
    </>
  );
}