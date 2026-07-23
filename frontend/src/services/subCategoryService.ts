import { supabase } from "../lib/supabase";

export async function getSubCategories(categoryId: number) {
  const { data, error } = await supabase
    .from("sub_categories")
    .select("*")
    .eq("category_id", categoryId)
    .order("sort_order");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function getSubCategoryBySlug(slug: string) {
  const { data, error } = await supabase
    .from("sub_categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;

  return data;
}
