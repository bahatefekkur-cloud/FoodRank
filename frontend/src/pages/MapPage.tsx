import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import { getFoodRankCards } from "../services/foodrankService";
import type { MenuCard } from "../types/MenuCard";

import MarkerClusterGroup from "react-leaflet-cluster";
import { Link } from "react-router-dom";


delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function MapPage() {
  const [restaurants, setRestaurants] = useState<MenuCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const cards = await getFoodRankCards();
        setRestaurants(cards);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Yükleniyor...
      </div>
    );
  }

  return (
    <MapContainer
      center={[39.95, 32.85]}
      zoom={7}
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

     <MarkerClusterGroup
  chunkedLoading
  maxClusterRadius={60}
>
  {restaurants
    .filter(
      (r) =>
        typeof r.latitude === "number" &&
        typeof r.longitude === "number"
    )
    .map((restaurant) => (
      <Marker
        key={restaurant.id}
        position={[
          restaurant.latitude!,
          restaurant.longitude!,
        ]}
      >
        <Popup minWidth={260}>

          <div className="space-y-3">

            <div>

              <h3 className="font-bold text-base">
                {restaurant.restaurantName}
              </h3>

              <p className="text-sm text-gray-500">
                {restaurant.district}, {restaurant.city}
              </p>

            </div>

            <div className="flex justify-between">

              <span>
                ⭐ {restaurant.googleRating}
              </span>

              <span className="font-semibold">
                ₺ {restaurant.price}
              </span>

            </div>

            <div className="flex gap-2">

              <Link
                to={`/restaurant/${restaurant.restaurantSlug}`}
                className="flex-1 text-center rounded-lg bg-black text-white py-2 text-sm"
              >
                Restoranı Gör
              </Link>

              <a
                href={restaurant.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center rounded-lg border py-2 text-sm"
              >
                Yol Tarifi
              </a>

            </div>

          </div>

        </Popup>
      </Marker>
    ))}
</MarkerClusterGroup>

    </MapContainer>
  );
}
