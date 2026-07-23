import { supabase } from "../lib/supabase";
import type { Category } from "../types/category";

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order");

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}