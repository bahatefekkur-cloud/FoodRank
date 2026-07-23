export interface MenuCard {
  id: number;

  restaurantName: string;
  restaurantSlug: string;

  itemName: string;

  category: string;
  categorySlug: string;

  subCategoryId: number;
  subCategorySlug: string;

  city: string;
  district: string;

  image: string;

  price: number;

  googleRating: number;
  googleReviews: number;

  mapsUrl: string;

  latitude: number | null;
  longitude: number | null;
  placeId?: string | null;
  address?: string | null;


  foodRankScore?: number;

  lastUpdated: string;
}

