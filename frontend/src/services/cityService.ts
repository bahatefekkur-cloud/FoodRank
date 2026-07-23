import { supabase } from "../lib/supabase";

export async function getCities() {
  const { data, error } = await supabase
    .from("menu_cards")
    .select("city");

  if (error) {
    console.error(error);
    return [];
  }

  const cities = [...new Set(data.map((item) => item.city))];

  return cities.sort();
}