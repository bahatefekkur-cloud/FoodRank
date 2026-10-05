import {
  ChevronDown,
  SlidersHorizontal,
} from "lucide-react";
import { useState } from "react";

import CityFilter from "./CityFilter";
import MultiDistrictFilter from "./MultiDistrictFilter";

interface Props {
  cities: string[];
  selectedCity: string;
  setSelectedCity: (city: string) => void;

  districts: string[];
  selectedDistricts: string[];
  setSelectedDistricts: (
    districts: string[]
  ) => void;

  minRating: string;
  setMinRating: (value: string) => void;

  minReviews: string;
  setMinReviews: (value: string) => void;

  maxPrice: string;
  setMaxPrice: (value: string) => void;

  onReset: () => void;
}

export default function ResultsFilters({
  cities,
  selectedCity,
  setSelectedCity,
  districts,
  selectedDistricts,
  setSelectedDistricts,
  minRating,
  setMinRating,
  minReviews,
  setMinReviews,
  maxPrice,
  setMaxPrice,
  onReset,
}: Props) {
  const [mobileOpen, setMobileOpen] =
    useState(false);

  const activeFilterCount = [
    selectedDistricts.length > 0,
    minRating,
    minReviews,
    maxPrice,
  ].filter(Boolean).length;

  const hasExtraFilters =
    activeFilterCount > 0;

  return (
    <section className="mb-5 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm sm:mb-7 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() =>
            setMobileOpen(
              (current) => !current
            )
          }
          className="flex min-w-0 flex-1 items-center gap-2 text-left sm:pointer-events-none"
          aria-expanded={mobileOpen}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600 sm:hidden">
            <SlidersHorizontal
              size={17}
            />
          </span>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-extrabold text-slate-900 sm:text-base">
                Filtreler
              </h2>

              {activeFilterCount >
                0 && (
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1.5 text-[10px] font-extrabold text-white">
                  {
                    activeFilterCount
                  }
                </span>
              )}
            </div>

            <p className="mt-0.5 hidden text-xs text-gray-500 sm:block">
              Sonuçları ihtiyacına göre
              daralt.
            </p>
          </div>

          <ChevronDown
            size={17}
            className={`ml-auto text-gray-400 transition sm:hidden ${
              mobileOpen
                ? "rotate-180"
                : ""
            }`}
          />
        </button>

        <button
          type="button"
          onClick={onReset}
          disabled={!hasExtraFilters}
          className="shrink-0 rounded-lg px-2.5 py-2 text-xs font-bold text-orange-600 transition hover:bg-orange-50 disabled:cursor-default disabled:text-gray-300 disabled:hover:bg-transparent sm:px-3"
        >
          Temizle
        </button>
      </div>

      <div
        className={`mt-4 gap-3 sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-5 ${
          mobileOpen
            ? "grid"
            : "hidden"
        }`}
      >
        <CityFilter
          cities={cities}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
        />

        <MultiDistrictFilter
          districts={districts}
          selectedDistricts={selectedDistricts}
          setSelectedDistricts={
            setSelectedDistricts
          }
        />

        <div>
          <label className="mb-1.5 block text-xs font-bold text-slate-700 sm:mb-2 sm:text-sm sm:font-semibold">
            Min. Google puanı
          </label>

          <select
            value={minRating}
            onChange={(e) =>
              setMinRating(e.target.value)
            }
            className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-medium text-slate-800 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          >
            <option value="">Tümü</option>
            <option value="4">
              4.0 ve üzeri
            </option>
            <option value="4.2">
              4.2 ve üzeri
            </option>
            <option value="4.5">
              4.5 ve üzeri
            </option>
            <option value="4.7">
              4.7 ve üzeri
            </option>
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-bold text-slate-700 sm:mb-2 sm:text-sm sm:font-semibold">
            Min. yorum
          </label>

          <select
            value={minReviews}
            onChange={(e) =>
              setMinReviews(
                e.target.value
              )
            }
            className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-medium text-slate-800 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          >
            <option value="">Tümü</option>
            <option value="100">
              100+
            </option>
            <option value="500">
              500+
            </option>
            <option value="1000">
              1.000+
            </option>
            <option value="5000">
              5.000+
            </option>
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-bold text-slate-700 sm:mb-2 sm:text-sm sm:font-semibold">
            Maks. fiyat
          </label>

          <div className="relative">
            <input
              type="number"
              min="0"
              step="10"
              inputMode="numeric"
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(
                  e.target.value
                )
              }
              placeholder="Örn. 500"
              className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 pr-9 text-sm font-medium text-slate-800 outline-none transition placeholder:text-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />

            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs font-semibold text-gray-400">
              TL
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
