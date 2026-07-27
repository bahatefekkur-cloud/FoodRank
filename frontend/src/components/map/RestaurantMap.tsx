import { MapContainer, TileLayer, Marker, Popup, useMap, } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import type { MenuCard } from "../../types/MenuCard";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

type Props = {
  items: MenuCard[];
};

function FitBounds({
  items,
}: {
  items: MenuCard[];
}) {

  const map = useMap();

  useEffect(() => {

    const points = items
      .filter(
        (x) =>
          typeof x.latitude === "number" &&
          typeof x.longitude === "number"
      )
      .map(
        (x) =>
          [x.latitude!, x.longitude!] as [
            number,
            number
          ]
      );

    if (points.length === 0) return;

    const bounds = L.latLngBounds(points);

    map.fitBounds(bounds, {
      padding: [40, 40],
    });

  }, [items, map]);

  return null;
}

export default function RestaurantMap({ items }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl shadow">
      <MapContainer
        center={[39.95, 32.85]}
        zoom={7}
        style={{
          width: "100%",
          height: "700px",
        }}
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitBounds items={items} />

        {items
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
              <Popup>
                <strong>{restaurant.restaurantName}</strong>
                <br />
                ⭐ {restaurant.googleRating}
                <br />
                ₺ {restaurant.price}
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}
