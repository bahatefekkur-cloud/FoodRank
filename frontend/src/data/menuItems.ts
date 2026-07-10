import type { MenuItem } from "../types/MenuItem";

export const menuItems: MenuItem[] = [
  {
    id: 1,
    restaurantId: 1,

    category: "Kebap",

    name: "İskender",

    price: 520,

    gram: 180,

    foodRankScore: 98,

    lastUpdated: "07.07.2026",
  },

  {
    id: 2,
    restaurantId: 2,

    category: "Burger",

    name: "Cheeseburger",

    price: 340,

    gram: 160,

    foodRankScore: 90,

    lastUpdated: "07.07.2026",
  },

  {
    id: 3,
    restaurantId: 3,

    category: "Pizza",

    name: "Karışık Pizza",

    price: 410,

    gram: 550,

    foodRankScore: 95,

    lastUpdated: "07.07.2026",
  },
];
