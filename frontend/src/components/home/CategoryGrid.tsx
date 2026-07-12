import type { Category } from "../../types/category";

interface Props {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export default function CategoryGrid({
  categories,
  selectedCategory,
  setSelectedCategory,
}: Props) {
  return (
    <section className="mb-10">
      <h2 className="text-3xl font-bold mb-6">
        Kategoriler
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-5">

        {/* Tümü */}
        <div
          onClick={() => setSelectedCategory("all")}
          className={`
            cursor-pointer
            overflow-hidden
            rounded-3xl
            bg-white
            shadow-md
            hover:shadow-xl
            hover:-translate-y-1
            transition-all
            duration-300
            ${
              selectedCategory === "all"
                ? "ring-4 ring-orange-500"
                : ""
            }
          `}
        >
          <div className="h-36 flex items-center justify-center bg-gradient-to-br from-orange-400 to-red-500">
            <span className="text-5xl">🍽️</span>
          </div>

          <div className="p-4 text-center">
            <h3 className="font-bold text-lg">
              Tümü
            </h3>
          </div>
        </div>

        {categories.map((category) => {
          const active =
            selectedCategory === category.name;

          return (
            <div
              key={category.id}
              onClick={() =>
                setSelectedCategory(
                  active ? "all" : category.name
                )
              }
              className={`
                cursor-pointer
                overflow-hidden
                rounded-3xl
                bg-white
                shadow-md
                hover:shadow-xl
                hover:-translate-y-1
                transition-all
                duration-300
                ${
                  active
                    ? "ring-4 ring-orange-500"
                    : ""
                }
              `}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-36 object-cover"
              />

              <div className="p-4 text-center">
                <h3 className="font-bold text-lg">
                  {category.name}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}