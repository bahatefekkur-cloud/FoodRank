import { useState } from "react";
import MenuCard from "../Menu/MenuCard";
import type { MenuCard as MenuCardType } from "../../types/MenuCard";

type Props = {
  items: MenuCardType[];
};

const PAGE_SIZE = 12;

export default function RestaurantGrid({ items }: Props) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visibleItems = items.slice(0, visibleCount);

  return (
    <section className="mt-16">

      <div className="mb-8 flex items-center justify-between">

        <div>
          <h2 className="text-3xl font-bold">
            🍽️ Restoranlar
          </h2>

          <p className="mt-1 text-gray-500">
            {items.length} restoran bulundu
          </p>
        </div>

      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        {visibleItems.map((item, index) => (
          <MenuCard
            key={item.id}
            item={item}
            rank={index + 1}
          />
        ))}

      </div>

      {visibleCount < items.length && (

        <div className="mt-10 flex justify-center">

          <button
            onClick={() =>
              setVisibleCount((v) => v + PAGE_SIZE)
            }
            className="
            rounded-2xl
            bg-orange-500
            px-8
            py-3
            font-semibold
            text-white
            transition
            hover:bg-orange-600
            "
          >
            Daha Fazla Göster
          </button>

        </div>

      )}

    </section>
  );
}
