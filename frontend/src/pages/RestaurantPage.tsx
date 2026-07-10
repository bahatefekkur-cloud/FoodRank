import { useParams } from "react-router-dom";

export default function RestaurantPage() {
  const { slug } = useParams();

  return (
    <main className="min-h-screen bg-gray-50">

      <div className="max-w-6xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold">
          {slug}
        </h1>

        <p className="mt-3 text-gray-600">
          Buraya restoran detayları gelecek.
        </p>

      </div>

    </main>
  );
}
