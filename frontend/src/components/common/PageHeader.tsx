import { useNavigate } from "react-router-dom";

type Props = {
  title: string;
  description?: string;
};

export default function PageHeader({
  title,
  description,
}: Props) {
  const navigate = useNavigate();

  return (
    <div className="mb-8">

      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm text-gray-500 hover:text-orange-500"
      >
        ← Geri
      </button>

      <h1 className="text-4xl font-bold">
        {title}
      </h1>

      {description && (
        <p className="mt-2 text-gray-500">
          {description}
        </p>
      )}

    </div>
  );
}
