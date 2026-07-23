import { supabase } from "../lib/supabase";

export async function getMenuCards() {
  const { data, error } = await supabase
    .from("menu_cards")
    .select("*");

  if (error) {
    console.error(error);
    return [];
  }

  return (data ?? []).map((item) => ({
    id: item.id,

    restaurantName: item.restaurant_name,
    restaurantSlug: item.restaurant_name
      .toLowerCase()
      .replaceAll(" ", "-"),

    image: "https://picsum.photos/600/400",

    district: item.district,
    city: item.city,

    googleRating: item.google_rating,
    googleReviews: item.review_count,

    category: item.category,

    itemName: item.item_name,

    price: item.price,

    lastUpdated: "",
  }));
}

