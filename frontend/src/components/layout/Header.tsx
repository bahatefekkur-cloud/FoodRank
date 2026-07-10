export default function Header() {
  return (
    <header className="sticky top-0 bg-white border-b border-gray-200">
      <div className="max-w-md mx-auto flex items-center justify-between px-5 py-4">

        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍽️</span>

            <h1 className="text-3xl font-extrabold text-gray-900">
              FoodRank
            </h1>
          </div>

          <p className="text-sm text-gray-500 mt-1">
            Karşılaştır. Keşfet. Karar Ver.
          </p>
        </div>

        <button className="text-3xl hover:opacity-70">
          ☰
        </button>

      </div>
    </header>
  );
}