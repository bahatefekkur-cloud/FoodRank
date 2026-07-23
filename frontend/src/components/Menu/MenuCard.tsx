import type { MenuCard } from "../../types/MenuCard";
import { Link } from "react-router-dom";

interface Props {
  item: MenuCard;
  rank: number;
}

export default function MenuCard({ item, rank }: Props) {
  const rankBadge = () => {
    if (rank === 1)
      return (
        <span className="rounded-full bg-yellow-400 px-3 py-1 text-sm font-bold text-black shadow">
          🥇 #1
        </span>
      );

    if (rank === 2)
      return (
        <span className="rounded-full bg-gray-300 px-3 py-1 text-sm font-bold text-black shadow">
          🥈 #2
        </span>
      );

    if (rank === 3)
      return (
        <span className="rounded-full bg-orange-300 px-3 py-1 text-sm font-bold text-black shadow">
          🥉 #3
        </span>
      );

    if (rank <= 10)
      return (
        <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-bold text-orange-700">
          #{rank}
        </span>
      );

    return null;
  };

  return (
    <Link
      to={`/restaurant/${item.restaurantSlug}?subcategory=${item.subCategorySlug}`}
      className="group overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      {/* Fotoğraf */}
<div className="relative overflow-hidden">
  <img
    src={item.image}
    alt={item.restaurantName}
    className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
  />

  <div className="absolute left-4 top-4">
    {rankBadge()}
  </div>
</div>


      <div className="p-4">
        <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
  <span className="text-yellow-500">⭐</span>

  <span className="font-semibold text-gray-800">
    {item.googleRating.toFixed(1)}
  </span>

  <span>•</span>

  <span>
    {item.googleReviews.toLocaleString("tr-TR")} yorum
  </span>
</div>


        {/* Restoran */}
        <h3 className="line-clamp-1 text-2xl font-bold text-gray-900">
          {item.restaurantName}
        </h3>

        {/* Ürün */}
        <div className="mt-5">

          <h4 className="mt-1 text-lg font-medium text-gray-700">
            {item.itemName}
          </h4>

        </div>

        {/* Fiyat */}
<div className="mt-6">
  <p className="text-3xl font-extrabold text-orange-600">
    {item.price} ₺
  </p>
</div>


        {/* Alt Bilgi */}
        <div className="mt-4 flex items-center justify-between border-t pt-3 text-sm">

  <span className="text-gray-500">
    📍 {item.district}, {item.city}
  </span>

<button
  type="button"
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(item.mapsUrl, "_blank");
  }}
  className="font-medium text-gray-500 transition hover:text-orange-600"
>
  Haritada Aç ↗
</button>
</div>


      </div>
    </Link>
  );
}