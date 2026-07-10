interface Props {
  sortBy: string;
  setSortBy: (value: string) => void;
}

export default function FilterBar({
  sortBy,
  setSortBy,
}: Props) {
  const buttons = [
    { label: "🏆 FoodRank", value: "foodrank" },
    { label: "⭐ Google", value: "google" },
    { label: "💰 Fiyat", value: "price" },
  ];

  return (
    <div className="flex gap-2 flex-wrap">
      {buttons.map((button) => (
        <button
          key={button.value}
          onClick={() => setSortBy(button.value)}
          className={`px-4 py-2 rounded-full transition
            ${
              sortBy === button.value
                ? "bg-orange-500 text-white"
                : "bg-white border hover:bg-gray-100"
            }`}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
}
