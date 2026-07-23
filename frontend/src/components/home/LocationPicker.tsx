import { useFilter } from "../../context/FilterContext";

export default function LocationPicker() {

  const {
    city,
    setCity,
  } = useFilter();

  return (
    <section className="max-w-md mx-auto px-5 mt-5">

      <button
        onClick={() => setCity("Bursa")}
        className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm border border-gray-200 hover:shadow-md transition"
      >
        📍

        <span className="font-medium">
          {city || "Şehir Seç"}
        </span>

        <span>▼</span>

      </button>

    </section>
  );
}
