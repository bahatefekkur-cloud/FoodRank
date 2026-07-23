type Props = {
  selectedCity: string;
  setSelectedCity: React.Dispatch<React.SetStateAction<string>>;
};

const cities = [
  {
    name: "Bursa",
    image:
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800",
  },
  {
    name: "İstanbul",
    image:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800",
  },
  {
    name: "Ankara",
    image:
      "https://images.unsplash.com/photo-1628519592419-bf288f08cef5?w=800",
  },
  {
    name: "İzmir",
    image:
      "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=800",
  },
];

export default function CityGrid({
  selectedCity,
  setSelectedCity,
}: Props) {
  return (
    <section className="mb-14">

      <div className="mb-6">

        <h2 className="text-3xl font-bold">
          📍 Şehir Seç
        </h2>

        <p className="mt-1 text-gray-500">
          Restoranları bulunduğun şehre göre filtrele.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-4">

        {cities.map((city) => (

          <button
            key={city.name}
            onClick={() => setSelectedCity(city.name)}
            className={`
              overflow-hidden
              rounded-3xl
              bg-white
              shadow-md
              transition
              hover:-translate-y-1
              hover:shadow-xl

              ${
                selectedCity === city.name
                  ? "ring-4 ring-orange-500"
                  : ""
              }
            `}
          >

            <img
              src={city.image}
              className="h-40 w-full object-cover"
            />

            <div className="p-5">

              <h3 className="text-xl font-bold">
                {city.name}
              </h3>

            </div>

          </button>

        ))}

      </div>

    </section>
  );
}
