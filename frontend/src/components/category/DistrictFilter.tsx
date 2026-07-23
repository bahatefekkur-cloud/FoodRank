interface Props {
  districts: string[];
  selectedDistrict: string;
  setSelectedDistrict: (district: string) => void;
}

export default function DistrictFilter({
  districts,
  selectedDistrict,
  setSelectedDistrict,
}: Props) {
  return (
    <div className="mb-6">
      <label className="block font-semibold text-sm mb-2">
        🏙 İlçe
      </label>

      <select
        value={selectedDistrict}
        onChange={(e) => setSelectedDistrict(e.target.value)}
        className="w-full rounded-xl border px-4 py-2"
      >
        <option value="">
          Tümü
        </option>

        {districts.map((district) => (
          <option
            key={district}
            value={district}
          >
            {district}
          </option>
        ))}
      </select>
    </div>
  );
}