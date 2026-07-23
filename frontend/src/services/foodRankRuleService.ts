import { supabase } from "../lib/supabase";

export interface FoodRankRule {
  id: number;
  type: string;
  min_value: number;
  score: number;
  sort_order: number;
  version: number;
}

export async function getFoodRankRules() {
  const { data, error } = await supabase
    .from("foodrank_rules")
    .select("*")
    .eq("version", 1)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }

  return data as FoodRankRule[];
}
