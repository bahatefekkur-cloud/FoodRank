import type { MenuCard } from "../../types/MenuCard";
import { Link } from "react-router-dom";

interface Props {
  item: MenuCard;
  rank: number;
}

export default function MenuCard({
  item,
  rank,
}: Props)
 {
  return (
    <Link
  to={`/restaurant/${item.restaurantSlug}`}
  className="block bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition"
>

      <img
        src={item.image}
        alt={item.restaurantName}
        className="w-full h-48 object-cover"
      />

      <div className="p-5">

<div className="mb-3">

  {rank === 1 && (
    <span className="bg-yellow-400 text-black px-3 py-1 rounded-full font-bold">
      🥇 #1
    </span>
  )}

  {rank === 2 && (
    <span className="bg-gray-300 text-black px-3 py-1 rounded-full font-bold">
      🥈 #2
    </span>
  )}

  {rank === 3 && (
    <span className="bg-orange-300 text-black px-3 py-1 rounded-full font-bold">
      🥉 #3
    </span>
  )}

  {rank > 3 && rank <= 10 && (
    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-bold">
      #{rank}
    </span>
  )}

</div>

        <h3 className="text-xl font-bold">
          {item.restaurantName}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          ⭐ {item.googleRating} ({item.googleReviews} yorum)
        </p>

        <hr className="my-4" />

        <h2 className="text-2xl font-bold">
          {item.itemName}
        </h2>

        <p className="text-gray-500">
          {item.gram} gr
        </p>

        <div className="mt-4 flex justify-center">

          <span className="text-3xl font-extrabold text-orange-600">
            {item.price} ₺
          </span>

        </div>

        <div className="mt-5 space-y-2 text-sm text-gray-500">

  <div className="flex justify-between">

    <span>📍 {item.district}</span>

    <span>{item.city}</span>

  </div>

  <div className="flex justify-between">

    <span>Son Güncelleme</span>

    <span>{item.lastUpdated}</span>

  </div>

</div>

<button
  className="w-full mt-5 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition"
>
  Menüyü İncele →
</button>

      </div>

    </Link>
  );
}
