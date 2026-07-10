type Props = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export default function SearchBar({
  search,
  setSearch,
}: Props) {
  return (
    <section className="mb-10">

      <div className="relative">

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 İskender, Lahmacun, Pizza veya restoran ara..."
          className="w-full rounded-3xl border border-gray-200 bg-white px-7 py-5 text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
        />

      </div>

    </section>
  );
}
