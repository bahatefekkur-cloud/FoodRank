import { categories } from "../../data/categories";

interface Props {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export default function CategoryGrid({
  selectedCategory,
  setSelectedCategory,
}: Props) {
  return (
    <section className="px-6 py-8">

      <h2 className="text-2xl font-bold mb-6">
        Kategoriler
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {categories.map((category) => {

          const active = selectedCategory === category.name;

          return (
            <div
              key={category.id}
              onClick={() =>
                setSelectedCategory(
                  active ? "" : category.name
                )
              }
              className={`rounded-2xl p-6 text-center cursor-pointer transition
                ${
                  active
                    ? "bg-orange-500 text-white shadow-lg"
                    : "bg-white shadow-sm hover:shadow-lg"
                }`}
            >

              <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center mb-3 mx-auto">

                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />

              </div>

              <div className="font-semibold">
                {category.name}
              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
}
