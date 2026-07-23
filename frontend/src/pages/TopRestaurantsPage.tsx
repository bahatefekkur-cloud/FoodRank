import { useEffect, useState } from "react";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import BottomNavigation from "../components/home/BottomNavigation";

import RestaurantGrid from "../components/restaurant/RestaurantGrid";
import PageHeader from "../components/common/PageHeader";

import { getFoodRankCards } from "../services/foodrankService";

import type { MenuCard } from "../types/MenuCard";

export default function TopRestaurantsPage() {

  const [items, setItems] = useState<MenuCard[]>([]);

  useEffect(() => {

    getFoodRankCards().then(setItems);

  }, []);

  return (
    <>

      <Header />

      <main className="min-h-screen bg-gray-50">

        <div className="mx-auto max-w-7xl px-6 py-8">

          <PageHeader
            title="⭐ En Avantajlı Restoranlar"
            description="FoodRank puanına göre listelenmiştir."
          />

          <RestaurantGrid
            items={items}
          />

        </div>

      </main>

      <Footer />

      <BottomNavigation />

    </>
  );
}

