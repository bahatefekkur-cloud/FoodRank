import { supabase } from "../lib/supabase";
import type { MenuCard } from "../types/MenuCard";
import { getFoodRankRules } from "./foodRankRuleService";
import { calculateFoodRankScore } from "../utils/foodRank";

export function mapMenuCard(item: any): MenuCard {
  return {
    id: item.id,

    restaurantName: item.restaurant_name,

    restaurantSlug:
      item.slug ??
      item.restaurant_name
        .toLowerCase()
        .replaceAll(" ", "-")
        .replaceAll("ı", "i")
        .replaceAll("ş", "s")
        .replaceAll("ğ", "g")
        .replaceAll("ü", "u")
        .replaceAll("ö", "o")
        .replaceAll("ç", "c"),

    itemName: item.item_name,

    category: item.category,
    categorySlug: item.category_slug ?? "",

    subCategoryId: item.sub_category_id ?? 0,
    subCategorySlug: item.sub_category_slug ?? "",

    image: item.image_url,

    city: item.city,
    district: item.district,

    price: item.price,

    googleRating: item.google_rating,
    googleReviews: item.review_count,

    mapsUrl: item.maps_url,

    latitude: item.latitude,
    longitude: item.longitude,

    address: item.address ?? "",
    placeId: item.place_id ?? "",

    foodRankScore: item.food_rank_score ?? 0,

    lastUpdated: "",
  };
}

export async function getFoodRankCards(): Promise<MenuCard[]> {
  const { data, error } = await supabase
    .from("menu_cards")
    .select("*")

    .order("google_rating", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return (data ?? []).map(mapMenuCard);
}

export async function getFoodRankCardsByCategory(
  category: string,
  city?: string,
  district?: string
): Promise<MenuCard[]> {

  let query = supabase
    .from("menu_cards")
    .select("*")
    .eq("category", category);

  if (city) {
    query = query.eq("city", city);
  }

  if (district) {
    query = query.eq("district", district);
  }

  const { data, error } = await query.order("google_rating", {
    ascending: false,
  });

  if (error) {
    console.error(error);
    return [];
  }

  return (data ?? []).map(mapMenuCard);
}

export async function getSimilarRestaurants(
  category: string,
  city: string,
  currentRestaurant: string
): Promise<MenuCard[]> {

  const { data, error } = await supabase
    .from("menu_cards")
    .select("*")
    .eq("category", category)
    .eq("city", city)
    .neq("restaurant_name", currentRestaurant);

  if (error) {
    console.error(error);
    return [];
  }


  const cards = (data ?? []).map(mapMenuCard);

  const rules = await getFoodRankRules();

  const cheapestPrice = Math.min(
    ...cards.map((x) => x.price)
  );

  return cards
    .map((card) => ({
      ...card,
      score: calculateFoodRankScore(
        card,
        cheapestPrice,
        rules
      ),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

export async function getFoodRankCardsBySubCategory(
  slug: string,
  city?: string,
  district?: string
) {
  let query = supabase
    .from("menu_cards")
    .select("*")
    .eq("sub_category_slug", slug);

  if (city) {
    query = query.eq("city", city);
  }

  if (district) {
    query = query.eq("district", district);
  }

  const { data, error } = await query.order("google_rating", {
    ascending: false,
  });

  if (error) {
    console.error(error);
    return [];
  }

  return (data ?? []).map(mapMenuCard);
}
