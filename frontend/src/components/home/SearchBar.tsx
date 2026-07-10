type Props = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export default function SearchBar({
  search,
  setSearch,
}: Props) {
  return (
    <div className="w-full">

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Restoran veya yemek ara..."
        className="w-full rounded-2xl border border-gray-200 px-5 py-4 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
      />

    </div>
  );
}
