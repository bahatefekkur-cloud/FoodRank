export default function CampaignSection() {
  return (
    <section className="mb-14">

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-3xl font-bold">
            🎁 Güncel Kampanyalar
          </h2>

          <p className="mt-1 text-gray-500">
            Restoranların güncel fırsatlarını kaçırma.
          </p>
        </div>

        <button className="font-semibold text-orange-500 hover:underline">
          Tümünü Gör →
        </button>

      </div>

      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-3xl bg-gradient-to-br from-orange-500 to-red-500 p-8 text-white shadow-lg">

          <span className="rounded-full bg-white/20 px-3 py-1 text-sm">
            Burger
          </span>

          <h3 className="mt-6 text-2xl font-bold">
            Whopper Menü
          </h3>

          <p className="mt-2 text-orange-100">
            Seçili şubelerde geçerli.
          </p>

          <p className="mt-8 text-4xl font-extrabold">
            %20
          </p>

          <p className="text-lg">
            İndirim
          </p>

        </div>

        <div className="rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 p-8 text-white shadow-lg">

          <span className="rounded-full bg-white/20 px-3 py-1 text-sm">
            Pizza
          </span>

          <h3 className="mt-6 text-2xl font-bold">
            Büyük Boy Pizza
          </h3>

          <p className="mt-2 text-orange-100">
            Bugüne özel kampanya.
          </p>

          <p className="mt-8 text-4xl font-extrabold">
            199₺
          </p>

        </div>

        <div className="rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 p-8 text-white shadow-lg">

          <span className="rounded-full bg-white/20 px-3 py-1 text-sm">
            Tavuk
          </span>

          <h3 className="mt-6 text-2xl font-bold">
            2 Al 1 Öde
          </h3>

          <p className="mt-2 text-gray-300">
            Sınırlı süre.
          </p>

          <p className="mt-8 text-4xl font-extrabold">
            BUGÜN
          </p>

        </div>

      </div>

    </section>
  );
}
