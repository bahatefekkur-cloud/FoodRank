import type { SubCategory } from "../../types/subCategory";

interface Props {
  subCategories: SubCategory[];
  selectedSubCategory: string;
  setSelectedSubCategory: (value: string) => void;
}

export default function SubCategoryBar({
  subCategories,
  selectedSubCategory,
  setSelectedSubCategory,
}: Props) {
  if (subCategories.length === 0) return null;

  return (
    <div className="mb-8 flex flex-wrap gap-3">
      {subCategories.map((item) => (
        <button
          key={item.id}
          onClick={() =>
            setSelectedSubCategory(
              selectedSubCategory === item.name ? "" : item.name
            )
          }
          className={`rounded-full px-5 py-2 transition ${
            selectedSubCategory === item.name
              ? "bg-orange-500 text-white"
              : "bg-white border hover:bg-orange-50"
          }`}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}