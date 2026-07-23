import { supabase } from "../lib/supabase";
import { getFoodRankRules } from "./foodRankRuleService";
import { calculateFoodRankScore } from "../utils/foodRank";

export async function getRestaurant(slug: string) {

  const { data, error } = await supabase
    .from("restaurants")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;

  return data;
}

export async function getRestaurantMenu(restaurantId: number) {
  const { data, error } = await supabase
    .from("menu_items")
.select(`
  *,
  sub_categories(
    id,
    name,
    slug
  )
`)
.eq("restaurant_id", restaurantId)
.order("price");


 if (error) {
  console.error("getRestaurantMenu error:", error);
  return [];
}

  return data;
}

export async function getRecommendedRestaurants(
  subCategoryId: number,
  currentRestaurantId: number
) {
  const { data, error } = await supabase
    .from("menu_items")
    .select(`
      id,
      price,
      restaurant_id,
      restaurants (
        id,
        name,
        slug,
        image_url,
        district,
        city,
        google_rating,
        review_count,
        maps_url
      )
    `)
    .eq("sub_category_id", subCategoryId)
    .neq("restaurant_id", currentRestaurantId);

  if (error) {
    console.error(error);
    return [];
  }

  const rules = await getFoodRankRules();

  const cheapestPrice = Math.min(
    ...(data ?? []).map((x: any) => x.price)
  );

  return (data ?? [])
    .map((item: any) => ({
      ...item,
      score: calculateFoodRankScore(
        {
          price: item.price,
          googleRating: item.restaurants.google_rating,
          googleReviews: item.restaurants.review_count,
        } as any,
        cheapestPrice,
        rules
      ),
    }))
    .sort((a, b) => b.score - a.score);
}