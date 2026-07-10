import logo from "../../assets/images/logo.png";

export default function Header() {
  return (
    <header className="bg-white border-b">

      <div className="max-w-6xl mx-auto px-6 py-6">

        <div className="flex items-center gap-4">

          <img
            src={logo}
            alt="FoodRank"
            className="w-20 h-20"
          />

          <div>

            <h1 className="text-5xl font-extrabold">

              <span className="text-gray-900">
                Food
              </span>

              <span className="text-orange-500">
                Rank
              </span>

            </h1>

            <p className="text-lg font-semibold text-gray-700">

              Karşılaştır. Keşfet. Karar Ver.

            </p>

            <p className="text-gray-500 mt-1">

              Binlerce restoranı karşılaştır,
              en doğru seçimi yap.

            </p>

          </div>

        </div>

      </div>

    </header>
  );
}
