interface Props {
  cities: string[];
  selectedCity: string;
  setSelectedCity: (city: string) => void;
}

export default function CityFilter({
  cities,
  selectedCity,
  setSelectedCity,
}: Props) {
  return (
    <div className="mb-6">
      <label className="block font-semibold text-sm mb-2">
        📍 Şehir
      </label>

      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        className="w-full rounded-xl border px-4 py-2"
      >
        {cities.map((city) => (
          <option
            key={city}
            value={city}
          >
            {city}
          </option>
        ))}
      </select>
    </div>
  );
}