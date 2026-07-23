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
  return (
    <div className="flex gap-3 overflow-x-auto pb-3 mb-6 scrollbar-hide">

      <button
        onClick={() => setSelectedSubCategory("")}
        className={`whitespace-nowrap rounded-full px-4 py-2 font-medium transition
          ${
            selectedSubCategory === ""
              ? "bg-orange-500 text-white shadow-md"
              : "bg-white border shadow-sm hover:bg-orange-50 hover:shadow-md"
          }`}
      >
        Tümü
      </button>

      {subCategories.map((item) => (
        <button
          key={item.id}
          onClick={() => setSelectedSubCategory(item.name)}
          className={`whitespace-nowrap rounded-full px-4 py-2 font-medium transition
            ${
              selectedSubCategory === item.name
                ? "bg-orange-500 text-white shadow-md"
                : "bg-white border shadow-sm hover:bg-orange-50 hover:shadow-md"
            }`}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}