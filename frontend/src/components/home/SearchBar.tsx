type Props = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const popularSearches = [
  "İskender",
  "Pizza",
  "Lahmacun",
  "Hamburger",
];

export default function SearchBar({
  search,
  setSearch,
}: Props) {
  return (
    <section className="mb-8">

      <div className="rounded-3xl bg-white p-6 shadow-md">

        <h2 className="mb-5 text-2xl font-bold text-gray-900">
          Bugün ne yemek istiyorsun?
        </h2>

        <div className="relative">

          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl">
            🔍
          </span>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="İskender, Pizza, Döner veya restoran ara..."
            className="w-full rounded-2xl border border-gray-200 py-4 pl-14 pr-12 text-lg outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-400 hover:text-gray-700"
            >
              ×
            </button>
          )}

        </div>

        <div className="mt-5 flex flex-wrap gap-2">

          <span className="text-sm font-semibold text-gray-500">
            🔥 Popüler:
          </span>

          {popularSearches.map((item) => (
            <button
              key={item}
              onClick={() => setSearch(item)}
              className="rounded-full bg-orange-50 px-4 py-2 text-sm font-medium text-orange-600 transition hover:bg-orange-100"
            >
              {item}
            </button>
          ))}

        </div>

      </div>

    </section>
  );
}