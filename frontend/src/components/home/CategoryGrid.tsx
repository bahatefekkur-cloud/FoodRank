import { useNavigate } from "react-router-dom";
import type { Category } from "../../types/category";

interface Props {
  categories: Category[];
}

export default function CategoryGrid({
  categories,
}: Props) {
  const navigate = useNavigate();

  return (
    <section className="mb-10">

      <h2 className="text-3xl font-bold mb-6">
        Kategoriler
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-5">

        {categories.map((category) => (

          <div
            key={category.id}
            onClick={() =>
              navigate(`/category/${category.slug}`)
            }
            className="
              cursor-pointer
              overflow-hidden
              rounded-3xl
              bg-white
              shadow-md
              hover:shadow-xl
              hover:-translate-y-1
              transition-all
              duration-300
            "
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

        ))}

      </div>

    </section>
  );
}