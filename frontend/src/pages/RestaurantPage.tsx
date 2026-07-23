import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useSearchParams } from "react-router-dom";
import {
  getRestaurant,
  getRestaurantMenu,
  getRecommendedRestaurants,
} from "../services/restaurantService";



export default function RestaurantPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

const selectedSubCategory =
  searchParams.get("subcategory") ?? "";

  const [restaurant, setRestaurant] = useState<any>(null);
  const [menu, setMenu] = useState<any[]>([]);
  const [recommended, setRecommended] = useState<any[]>([]);

  useEffect(() => {
  async function load() {
    if (!slug) return;

    const restaurantData = await getRestaurant(slug);

    if (!restaurantData) return;

    setRestaurant(restaurantData);

    const menuData = await getRestaurantMenu(
      restaurantData.id
    );

    setMenu(menuData);

    const selectedItem =
      menuData.find(
        (item) =>
          item.sub_categories?.slug === selectedSubCategory
      ) ?? menuData[0];

    if (selectedItem) {
    const recommendedData =
  await getRecommendedRestaurants(
    selectedItem.sub_category_id,
    restaurantData.id
  );

const filtered = recommendedData.filter(
  (item: any) => item.restaurants.city === restaurantData.city
);


setRecommended(filtered.slice(0, 3));

    }
  }

  load();
}, [slug, selectedSubCategory]);


  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Yükleniyor...
      </div>
    );
  }


  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Yükleniyor...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Geri */}
        <Link
          to="/"
          className="text-orange-600 font-medium hover:underline"
        >
          ← Restoran Listesine Dön 
        </Link>

        {/* Fotoğraf */}
        <img
          src={restaurant.image_url}
          alt={restaurant.name}
          className="mt-6 mb-8 h-80 w-full rounded-3xl object-cover shadow-lg"
        />

        {/* Restoran */}
        <h1 className="text-5xl font-bold tracking-tight">
          {restaurant.name}
        </h1>

        {/* Google */}
        <p className="mt-4 text-lg text-gray-700">
          ⭐ {restaurant.google_rating} •{" "}
          {restaurant.review_count.toLocaleString("tr-TR")} yorum
        </p>

        {/* Konum */}
        <div className="mt-4 flex items-center justify-between border-b pb-6">

          <span className="text-gray-500">
            📍 {restaurant.district}, {restaurant.city}
          </span>

          <a
            href={restaurant.maps_url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-gray-500 transition hover:text-orange-600"
          >
            Haritada Aç ↗
          </a>

        </div>

        {/* Menü Başlığı */}
        <h2 className="mt-10 mb-6 text-2xl font-bold">
          Menü
        </h2>

        {/* Menü */}
  
        <div className="space-y-3">
  {menu.map((item) => (
    <div
      key={item.id}
      className="flex items-center justify-between rounded-2xl bg-white px-6 py-5 shadow-sm transition hover:shadow-md"
    >
      <span className="text-lg font-medium text-gray-800">
        {item.menu_name}
      </span>

      <span className="text-2xl font-bold text-orange-600">
        {item.price} ₺
      </span>
    </div>
  ))}
</div>


{recommended.length > 0 && (
  <div className="mt-16 border-t pt-10">

    <h2 className="text-2xl font-bold">
      Benzer Restoranlar
    </h2>

    <div className="mt-6 grid gap-4 md:grid-cols-3">

      {recommended.map((item: any) => (
        <Link
          key={item.restaurant_id}
          to={`/restaurant/${item.restaurants.slug}?subcategory=${selectedSubCategory}`}
          className="rounded-2xl border bg-white p-4 transition hover:shadow-lg"
        >
          <img
            src={item.restaurants.image_url}
            alt={item.restaurants.name}
            className="h-40 w-full rounded-xl object-cover"
          />

          <h3 className="mt-4 font-bold">
            {item.restaurants.name}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            ⭐ {item.restaurants.google_rating} • {item.restaurants.review_count.toLocaleString("tr-TR")} yorum
          </p>

          <p className="mt-1 text-sm text-gray-500">
            📍 {item.restaurants.district}, {item.restaurants.city}
          </p>

          <p className="mt-4 text-2xl font-bold text-orange-600">
            {item.price} ₺
          </p>
        </Link>
      ))}

    </div>

  </div>
)}

      </div>
    </main>
  );
}
