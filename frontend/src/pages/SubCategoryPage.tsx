import {
  lazy,
  Suspense,
  useEffect,
  useState,
} from "react";
import { Link, useParams } from "react-router-dom";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import BottomNavigation from "../components/home/BottomNavigation";
import ResultsFilters from "../components/category/ResultsFilters";
import SortSelect from "../components/category/SortSelect";
import NearbyButton from "../components/location/NearbyButton";
import RestaurantGrid from "../components/restaurant/RestaurantGrid";

import { getSubCategoryBySlug } from "../services/subCategoryService";
import { getFoodRankCardsBySubCategory } from "../services/foodrankService";
import { getDistricts } from "../services/districtService";
import {
  getFoodRankRules,
  type FoodRankRule,
} from "../services/foodRankRuleService";
import { getCategoryById } from "../services/categoryService";

import { useFoodRank } from "../hooks/useFoodRank";
import { useFilter } from "../hooks/useFilter";

import { useUserLocation } from "../hooks/useUserLocation";
import { useSeo } from "../hooks/useSeo";
import { countDistinctRestaurants } from "../utils/visibility";
import { buildBreadcrumbJsonLd } from "../utils/seoStructuredData";
import type { MenuCard } from "../types/MenuCard";
import type { SubCategory } from "../types/subCategory";
import type { Category } from "../types/category";

/*
 * Leaflet + react-leaflet bu import sayesinde
 * sadece kullanıcı Harita görünümüne geçtiğinde yüklenir.
 */
const RestaurantMap = lazy(
  () =>
    import(
      "../components/map/RestaurantMap"
    )
);

function MapLoading() {
  return (
    <div className="flex min-h-[360px] items-center justify-center rounded-2xl border border-gray-200 bg-white">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-orange-100 border-t-orange-500" />

        <p className="mt-3 text-sm font-semibold text-gray-500">
          Harita yükleniyor...
        </p>
      </div>
    </div>
  );
}

export default function SubCategoryPage() {
  const { slug } = useParams();

  const [subCategory, setSubCategory] =
    useState<SubCategory | null>(null);

  const [cards, setCards] =
    useState<MenuCard[]>([]);

  const [districts, setDistricts] =
    useState<string[]>([]);

  const [
    selectedDistricts,
    setSelectedDistricts,
  ] = useState<string[]>([]);

  const [minRating, setMinRating] =
    useState("");

  const [minReviews, setMinReviews] =
    useState("");

  const [maxPrice, setMaxPrice] =
    useState("");

  const [sortBy, setSortBy] =
    useState("foodrank");

  const [view, setView] =
    useState<"list" | "map">(
      "list"
    );

  const [loading, setLoading] =
    useState(true);

  const [cardsLoading, setCardsLoading] =
    useState(true);

  const [
    foodRankRules,
    setFoodRankRules,
  ] = useState<FoodRankRule[]>([]);

  const [
    parentCategory,
    setParentCategory,
  ] = useState<Category | null>(
    null
  );

  const {
    city,
    setCity,
    cities,
  } = useFilter();

  const {
    location: userLocation,
    loading: locationLoading,
    error: locationError,
    requestLocation,
  } = useUserLocation();

  useEffect(() => {
    async function loadPage() {
      if (!slug) return;

      setLoading(true);
      setCards([]);
      setSelectedDistricts([]);
      setMinRating("");
      setMinReviews("");
      setMaxPrice("");
      setView("list");

      const sub =
        await getSubCategoryBySlug(
          slug
        );

      if (!sub) {
        setSubCategory(null);
        setParentCategory(null);
        setLoading(false);
        return;
      }

      setSubCategory(sub);

      const [
        category,
        rules,
      ] = await Promise.all([
        getCategoryById(
          sub.category_id
        ),
        getFoodRankRules(),
      ]);

      setParentCategory(category);
      setFoodRankRules(rules);
      setLoading(false);
    }

    loadPage();
  }, [slug]);

  useEffect(() => {
    async function loadDistrictList() {
      if (!city) {
        setDistricts([]);
        setSelectedDistricts([]);
        return;
      }

      const list =
        await getDistricts(city);

      setDistricts(list);
      setSelectedDistricts([]);
    }

    loadDistrictList();
  }, [city]);

  useEffect(() => {
    let cancelled = false;

    async function loadRestaurants() {
      if (!slug || !city) {
        setCards([]);
        setCardsLoading(false);
        return;
      }

      setCardsLoading(true);

      const data =
        await getFoodRankCardsBySubCategory(
          slug,
          city
        );

      if (!cancelled) {
        setCards(data);
        setCardsLoading(false);
      }
    }

    loadRestaurants();

    return () => {
      cancelled = true;
    };
  }, [slug, city]);

  const restaurantCount =
    countDistinctRestaurants(cards);

  const isVisible =
    Boolean(subCategory?.is_visible) &&
    restaurantCount > 0;

  const displayCards =
    selectedDistricts.length > 0
      ? cards.filter((card) =>
          selectedDistricts.includes(
            card.district
          )
        )
      : cards;

  useSeo({
    title: subCategory
      ? `${city}'da ${subCategory.name} Nerede Yenir? Menü Fiyatları | FoodRank`
      : undefined,
    description: subCategory
      ? `${city}'da ${subCategory.name} sunan restoranların menü fiyatlarını, Google Maps puanlarını ve yorum sayılarını karşılaştır. FoodRank F/P sıralamasını incele ve kararını ver.`
      : undefined,
    path: slug
      ? `/subcategory/${slug}`
      : "/",
    indexable:
      Boolean(subCategory) &&
      isVisible,
    jsonLd:
      subCategory && slug
        ? buildBreadcrumbJsonLd([
            { name: "FoodRank", path: "/" },
            ...(parentCategory
              ? [
                  {
                    name: parentCategory.name,
                    path: `/category/${parentCategory.slug}`,
                  },
                ]
              : []),
            {
              name: subCategory.name,
              path: `/subcategory/${slug}`,
            },
          ])
        : null,
  });

  const rankedCards =
    useFoodRank({
      cards: isVisible
        ? displayCards
        : [],
      selectedSubCategory: "",
      sortBy,
      rules: foodRankRules,
      userLocation,
    });

  const filteredCards =
    rankedCards.filter(
      (card) => {
        const matchesRating =
          minRating === "" ||
          card.googleRating >=
            Number(minRating);

        const matchesReviews =
          minReviews === "" ||
          card.googleReviews >=
            Number(minReviews);

        const matchesPrice =
          maxPrice === "" ||
          card.price <=
            Number(maxPrice);

        return (
          matchesRating &&
          matchesReviews &&
          matchesPrice
        );
      }
    );

  async function activateNearby() {
    const nextLocation =
      await requestLocation();

    if (!nextLocation) return;

    setSelectedDistricts([]);
    setSortBy("distance");
  }

  function resetFilters() {
    setSelectedDistricts([]);
    setMinRating("");
    setMinReviews("");
    setMaxPrice("");
  }

  if (loading || cardsLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Yükleniyor...
      </div>
    );
  }

  if (!subCategory) {
    return (
      <>
        <Header />

        <main className="min-h-screen bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
            <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Alt kategori bulunamadı
            </h1>

            <Link
              to="/"
              className="mt-4 inline-block font-semibold text-orange-500"
            >
              ← Ana sayfaya dön
            </Link>
          </div>
        </main>
      </>
    );
  }

  if (!isVisible) {
    return (
      <>
        <Header />

        <main className="min-h-screen bg-gray-50">
          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-20">
            <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-500">
                Karşılaştırma kapsamı
              </p>

              <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                {subCategory.name}
              </h1>

              <p className="mt-4 leading-7 text-gray-600">
                {subCategory.is_visible
                  ? "Bu yemek için şu anda aktif restoran verisi bulunmuyor."
                  : "Bu yemek şu anda FoodRank karşılaştırmalarında yayınlanmıyor."}
              </p>

              <Link
                to={
                  parentCategory
                    ? `/category/${parentCategory.slug}`
                    : "/"
                }
                className="mt-6 inline-flex rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
              >
                Diğer yemeklere dön
              </Link>
            </div>
          </div>

          <Footer />
        </main>

        <BottomNavigation />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
          <Link
            to={
              parentCategory
                ? `/category/${parentCategory.slug}`
                : "/"
            }
            className="text-sm font-semibold text-orange-500"
          >
            ←{" "}
            {parentCategory?.name ??
              "Tüm Kategoriler"}
          </Link>

          <h1 className="mb-3 mt-4 text-2xl font-extrabold tracking-tight text-slate-900 min-[390px]:text-3xl sm:mt-6 sm:text-4xl lg:text-5xl">
            {city}'da {subCategory.name} Nerede Yenir?
          </h1>

          <p className="mb-5 max-w-3xl text-sm leading-6 text-gray-600 sm:mb-8 sm:text-base lg:max-w-none">
            Menü fiyatlarını, Google Maps puanlarını ve yorum sayılarını karşılaştır; FoodRank F/P sıralamasını incele ve kararını ver.
          </p>

          <ResultsFilters
            cities={cities}
            selectedCity={city}
            setSelectedCity={setCity}
            districts={districts}
            selectedDistricts={
              selectedDistricts
            }
            setSelectedDistricts={
              setSelectedDistricts
            }
            minRating={minRating}
            setMinRating={setMinRating}
            minReviews={minReviews}
            setMinReviews={
              setMinReviews
            }
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            onReset={resetFilters}
          />

          <div className="mb-6 flex flex-col gap-3 sm:mb-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                {
                  filteredCards.length
                }{" "}
                restoran bulundu
              </h2>

              <div className="mt-3 inline-flex w-full rounded-xl bg-gray-100 p-1 sm:w-auto">
                <button
                  type="button"
                  onClick={() =>
                    setView("list")
                  }
                  className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition sm:flex-none ${
                    view === "list"
                      ? "bg-white text-orange-600 shadow-sm"
                      : "text-gray-500 hover:text-slate-900"
                  }`}
                >
                  ☰ Liste
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setView("map")
                  }
                  className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition sm:flex-none ${
                    view === "map"
                      ? "bg-white text-orange-600 shadow-sm"
                      : "text-gray-500 hover:text-slate-900"
                  }`}
                >
                  🗺 Harita
                </button>
              </div>
            </div>

            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-end">
              <NearbyButton
                active={sortBy === "distance"}
                loading={locationLoading}
                error={locationError}
                onClick={activateNearby}
              />

              <SortSelect
                value={sortBy}
                onChange={setSortBy}
                showDistance={Boolean(userLocation)}
              />
            </div>
          </div>

          {filteredCards.length ===
          0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
              <h2 className="text-lg font-bold text-slate-900">
                Bu filtrelerle sonuç
                bulunamadı
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Filtrelerden birini
                gevşeterek tekrar
                deneyebilirsin.
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Filtreleri temizle
              </button>
            </div>
          ) : view === "list" ? (
            <RestaurantGrid
              items={filteredCards}
            />
          ) : (
            <Suspense
              fallback={<MapLoading />}
            >
              <RestaurantMap
                items={
                  filteredCards
                }
                rankItems={
                  rankedCards
                }
                userLocation={
                  sortBy === "distance"
                    ? userLocation
                    : null
                }
              />
            </Suspense>
          )}
        </div>

        <Footer />
      </main>

      <BottomNavigation />
    </>
  );
}
