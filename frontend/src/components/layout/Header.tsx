import logo from "../../assets/images/logo.png";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5">

        {/* Sol */}
        <div className="flex items-center gap-4">

          <img
            src={logo}
            alt="FoodRank"
            className="h-28 w-28 flex-shrink-0 object-contain"
          />

          <div>

            <h1 className="text-5xl font-extrabold leading-none">
              <span className="text-slate-900">Food</span>
              <span className="text-orange-500">Rank</span>
            </h1>

            <p className="mt-2 text-xl font-semibold text-slate-700">
              Karşılaştır. Keşfet. Karar Ver.
            </p>

            <p className="mt-2 text-base text-gray-500">
              Binlerce restoranı karşılaştır, en doğru seçimi yap.
            </p>

          </div>

        </div>

        {/* Sağ */}
        <div className="flex items-center gap-3">

          <button
            className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold shadow-sm transition hover:border-orange-400 hover:text-orange-500 hover:shadow-md"
          >
            📍 Bursa
          </button>

          <button
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200 bg-white text-xl shadow-sm transition hover:border-orange-400 hover:shadow-md"
            title="Karşılaştır"
          >
            ⚖️
          </button>

          <button
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200 bg-white text-xl shadow-sm transition hover:border-orange-400 hover:shadow-md"
            title="Favoriler"
          >
            ❤️
          </button>

        </div>

      </div>
    </header>
  );
}