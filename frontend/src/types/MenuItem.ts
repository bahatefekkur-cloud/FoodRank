export interface MenuItem {
  id: number;

  restaurantId: number;

  category: string;

  name: string;

  price: number;

  gram?: number;

  foodRankScore: number;

  lastUpdated: string;
}
