export interface MenuCard {
  id: number;

  restaurantName: string;

  restaurantSlug: string;

  image: string;

  district: string;

  city: string;

  googleRating: number;

  googleReviews: number;

  category: string;

  itemName: string;

  price: number;

  gram?: number;

  foodRankScore: number;

  lastUpdated: string;
}
