import { useNavigate } from "react-router-dom";
import type { MenuCard } from "../../types/MenuCard";

type Props = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  suggestions: MenuCard[];
  city: string;
};

const popularSearches = [
  "İskender",
  "Pizza",
  "Lahmacun",
  "Hamburger",
];

export default function SearchBar({
  search,
  setSearch,
  suggestions,
  city,
}: Props) {

  const navigate = useNavigate();

  const text = search.trim().toLocaleLowerCase("tr");

  const citySuggestions =
    city === ""
      ? suggestions
      : suggestions.filter((x) => x.city === city);

  // Ürün önerileri
  const productSuggestions =
    text.length < 3
      ? []
      : Array.from(
          new Map(
            citySuggestions
              .filter((x) =>
                x.itemName
                  .toLocaleLowerCase("tr")
                  .includes(text)
              )
              .map((x) => [x.subCategorySlug, x])
          ).values()
        ).slice(0, 5);

  // Restoran önerileri
  const restaurantSuggestions =
    text.length < 3
      ? []
      : Array.from(
          new Map(
            citySuggestions
              .filter(
                (x) =>
                  x.restaurantName
                    .toLocaleLowerCase("tr")
                    .includes(text)

)
              .sort(
                (a, b) =>
                  b.googleRating - a.googleRating
              )
              .map((x) => [x.restaurantSlug, x])
          ).values()
        ).slice(0, 5);

  return (
    <section className="mb-8">

      <div className="rounded-3xl bg-white p-6 shadow-md">

        <h2 className="mb-5 text-2xl font-bold text-gray-900">
          Bugün ne yemek istiyorsun?
        </h2>

        <div className="relative">

          <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl">
            🔍
          </span>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="İskender, Kebap, Pizza veya restoran ara..."
            className="
              h-14
              w-full
              rounded-2xl
              border
              border-gray-200
              bg-white
              pl-14
              pr-12
              text-base
              placeholder:text-gray-400
              shadow-sm
              transition-all
              duration-200
              outline-none
              hover:border-orange-300
              hover:shadow-md
              focus:border-orange-400
              focus:ring-4
              focus:ring-orange-100
              focus:shadow-lg
            "
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              className="
                absolute
                right-5
                top-1/2
                -translate-y-1/2
                text-xl
                text-gray-400
                hover:text-orange-500
              "
            >
              ✕
            </button>
          )}

          {(productSuggestions.length > 0 ||
            restaurantSuggestions.length > 0) && (

            <div
              className="
                absolute
                left-0
                right-0
                top-16
                z-50
                overflow-hidden
                rounded-2xl
                border
                border-gray-200
                bg-white
                shadow-2xl
                max-h-96
                overflow-y-auto
              "
            >

              {/* ÜRÜNLER */}

              {productSuggestions.length > 0 && (
                <>
                  <div className="bg-orange-50 px-5 py-2 text-xs font-bold uppercase text-orange-600">
                    🍽️ Yemekler
                  </div>

                  {productSuggestions.map((item) => (
                    <button
                      key={item.subCategorySlug}
                      onClick={() => {
                        setSearch("");
                        navigate(`/subcategory/${item.subCategorySlug}`);
                      }}
                      className="flex w-full items-center justify-between px-5 py-4 text-left transition hover:bg-orange-50"
                    >
                      <div>
                        <p className="font-semibold text-gray-900">
                          🥙 {item.itemName}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          {item.category}
                        </p>
                      </div>
                    </button>
                  ))}
                </>
              )}

              {/* RESTORANLAR */}

              {restaurantSuggestions.length > 0 && (
                <>
                  <div className="bg-gray-100 px-5 py-2 text-xs font-bold uppercase text-gray-600">
                    🏪 Restoranlar
                  </div>

                  {restaurantSuggestions.map((item) => (
                    <button
                      key={item.restaurantSlug}
                      onClick={() => {
                        setSearch("");
                        navigate(`/restaurant/${item.restaurantSlug}`);
                      }}
                      className="flex w-full items-center justify-between px-5 py-4 text-left transition hover:bg-orange-50"
                    >
                      <div>
                        <p className="font-semibold text-gray-900">
                          🍽️ {item.restaurantName}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          {item.itemName} • {item.district}
                        </p>
                      </div>

                      <span className="font-bold text-orange-500">
                        ₺{item.price}
                      </span>
                    </button>
                  ))}
                </>
              )}

            </div>
          )}

        </div>

        <div className="mt-3 flex flex-wrap gap-2">

          <span className="text-base font-semibold text-gray-700">
            🔥 Popüler:
          </span>

          {popularSearches.map((item) => (
            <button
              key={item}
              onClick={() => setSearch(item)}
              className="rounded-full bg-orange-50 px-5 py-2.5 text-sm font-semibold text-orange-600 transition hover:bg-orange-500 hover:text-white hover:shadow-md"
            >
              {item}
            </button>
          ))}

        </div>

      </div>

    </section>
  );
}
