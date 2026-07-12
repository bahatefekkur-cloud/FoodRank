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
      to={`/restaurant/${item.restaurantSlug}`}
      className="group overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      {/* Fotoğraf */}
      <div className="relative overflow-hidden">
        <img
          src={item.image}
          alt={item.restaurantName}
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute left-4 top-4">
          {rankBadge()}
        </div>

        <div className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1 text-sm font-semibold shadow">
          ⭐ {item.googleRating}
        </div>
      </div>

      <div className="p-5">

        {/* Restoran */}
        <h3 className="line-clamp-1 text-xl font-bold">
          {item.restaurantName}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          💬 {item.googleReviews.toLocaleString()} yorum
        </p>

        {/* Ürün */}
        <div className="mt-5">
          <p className="text-sm uppercase tracking-wide text-orange-500 font-semibold">
            Menü
          </p>

          <h2 className="mt-1 text-2xl font-bold">
            {item.itemName}
          </h2>

          <p className="mt-1 text-gray-500">
            {item.gram} gr
          </p>
        </div>

        {/* Fiyat */}
        <div className="mt-6 flex items-end justify-between">
          <div>
            <p className="text-sm text-gray-500">
              Güncel Fiyat
            </p>

            <p className="text-4xl font-extrabold text-orange-600">
              {item.price} ₺
            </p>
          </div>

          <div className="rounded-2xl bg-orange-50 px-4 py-2 text-center">
            <p className="text-xs text-gray-500">
              FoodRank
            </p>

            <p className="text-xl font-bold text-orange-600">
              {item.foodRankScore}
            </p>
          </div>
        </div>

        {/* Alt Bilgi */}
        <div className="mt-6 flex items-center justify-between border-t pt-4 text-sm text-gray-500">

          <span>
            📍 {item.district}, {item.city}
          </span>

          <span>{item.lastUpdated}</span>

        </div>

      </div>
    </Link>
  );
}