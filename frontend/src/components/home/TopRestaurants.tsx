import { Link } from "react-router-dom";
import MenuCard from "../Menu/MenuCard";
import type { MenuCard as MenuCardType } from "../../types/MenuCard";

type Props = {
  items: MenuCardType[];
};

export default function TopRestaurants({ items }: Props) {
  // Aynı restoranı tekilleştir
  const uniqueRestaurants = Array.from(
    new Map(
      items.map((item) => [
        item.restaurantSlug,
        item,
      ])
    ).values()
  );

  // İlk 3 restoran
  const topRestaurants = uniqueRestaurants.slice(0, 6);

  return (
    <section className="mb-14">

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-3xl font-bold">
            ⭐ En Avantajlı Restoranlar
          </h2>

          <p className="mt-1 text-gray-500">
            Şehrindeki en avantajlı restoranları keşfet.
          </p>
        </div>

        {uniqueRestaurants.length > 3 && (
          <Link
            to="/top-restaurants"
            className="font-semibold text-orange-500 hover:underline"
          >
            Tümünü Gör →
          </Link>
        )}

      </div>

      <div className="grid gap-6 md:grid-cols-3">

        {topRestaurants.map((item, index) => (
          <MenuCard
            key={item.restaurantSlug}
            item={item}
            rank={index + 1}
          />
        ))}

      </div>

    </section>
  );
}
