import { supabase } from "../lib/supabase";
import type { MenuCard } from "../types/MenuCard";

export async function getFoodRankCards(): Promise<MenuCard[]> {

  const { data, error } = await supabase
    .from("menu_cards")
    .select("*")
    .order("google_rating", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  console.log("ilk kayıt", data?.[0]);

  return (data ?? []).map((item) => ({

    id: item.id,

    restaurantName: item.restaurant_name,

    restaurantSlug: item.restaurant_name
      .toLowerCase()
      .replaceAll(" ", "-")
      .replaceAll("ı", "i")
      .replaceAll("ş", "s")
      .replaceAll("ğ", "g")
      .replaceAll("ü", "u")
      .replaceAll("ö", "o")
      .replaceAll("ç", "c"),

    image: "https://picsum.photos/600/400",

    district: item.district,
    city: item.city,

    googleRating: item.google_rating,
    googleReviews: item.review_count,

    category: item.category,

    itemName: item.item_name,

    price: item.price,

    gram: item.gramaj ?? 0,

    // Geçici
    foodRankScore: 0,

    // Geçici
    lastUpdated: "",

  }));
}
