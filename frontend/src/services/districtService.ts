import { supabase } from "../lib/supabase";

export async function getDistricts(city: string) {
  const { data, error } = await supabase
    .from("menu_cards")
    .select("district")
    .eq("city", city);

  if (error) {
    console.error(error);
    return [];
  }

  const districts = [...new Set(data.map((x) => x.district))];

  return districts.sort();
}