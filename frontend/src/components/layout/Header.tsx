import logo from "../../assets/images/logo.png";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Sol */}
        <div className="flex items-center gap-4">

          <img
            src={logo}
            alt="FoodRank"
            className="h-14 w-auto"
          />

          <div>
            <p className="text-xl font-bold text-gray-900">
              Karşılaştır. Keşfet. Karar Ver.
            </p>

            <p className="text-sm text-gray-500">
              Güncel restoran fiyatlarını tek yerde karşılaştır.
            </p>
          </div>

        </div>

        {/* Sağ */}
        <div className="flex items-center gap-3">

          <button
            className="rounded-2xl border bg-white px-4 py-2 text-sm font-medium shadow-sm transition hover:border-orange-400 hover:text-orange-500"
          >
            📍 Bursa
          </button>

          <button
            className="rounded-2xl border bg-white px-3 py-2 shadow-sm transition hover:border-orange-400"
            title="Karşılaştır (Yakında)"
          >
            ⚖️
          </button>

          <button
            className="rounded-2xl border bg-white px-3 py-2 shadow-sm transition hover:border-orange-400"
            title="Favoriler (Yakında)"
          >
            ❤️
          </button>

        </div>

      </div>
    </header>
  );
}