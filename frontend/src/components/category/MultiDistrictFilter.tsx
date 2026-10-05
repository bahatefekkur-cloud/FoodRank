import {
  Check,
  ChevronDown,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
} from "react";

interface Props {
  districts: string[];
  selectedDistricts: string[];
  setSelectedDistricts: (
    districts: string[]
  ) => void;
}

export default function MultiDistrictFilter({
  districts,
  selectedDistricts,
  setSelectedDistricts,
}: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (
        rootRef.current &&
        !rootRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function toggleDistrict(district: string) {
    if (selectedDistricts.includes(district)) {
      setSelectedDistricts(
        selectedDistricts.filter((item) => item !== district)
      );
      return;
    }

    setSelectedDistricts([...selectedDistricts, district]);
  }

  const summary =
    selectedDistricts.length === 0
      ? "Tümü"
      : selectedDistricts.length === 1
        ? selectedDistricts[0]
        : `${selectedDistricts.length} ilçe seçili`;

  return (
    <div ref={rootRef} className="relative">
      <label className="mb-1.5 block text-xs font-bold text-slate-700 sm:mb-2 sm:text-sm sm:font-semibold">
        İlçe
      </label>

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex h-11 w-full items-center justify-between gap-2 rounded-xl border border-gray-200 bg-white px-3 text-left text-sm font-medium text-slate-800 outline-none transition hover:border-gray-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
      >
        <span className="min-w-0 truncate">{summary}</span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-gray-400 transition ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-multiselectable="true"
          className="absolute left-0 right-0 z-40 mt-2 max-h-72 min-w-[220px] overflow-y-auto rounded-xl border border-gray-200 bg-white p-2 shadow-xl"
        >
          <button
            type="button"
            onClick={() => setSelectedDistricts([])}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-slate-700 transition hover:bg-orange-50"
          >
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-gray-300 bg-white">
              {selectedDistricts.length === 0 && (
                <Check size={14} className="text-orange-600" />
              )}
            </span>
            Tüm ilçeler
          </button>

          {districts.map((district) => {
            const selected = selectedDistricts.includes(district);

            return (
              <button
                key={district}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => toggleDistrict(district)}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-orange-50"
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                    selected
                      ? "border-orange-500 bg-orange-500"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {selected && (
                    <Check size={14} className="text-white" />
                  )}
                </span>
                <span className="min-w-0 truncate">{district}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
