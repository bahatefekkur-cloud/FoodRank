import { createContext, useContext, useState } from "react";

type FilterContextType = {

  city: string;
  setCity: (v: string) => void;

  district: string;
  setDistrict: (v: string) => void;

  category: string;
  setCategory: (v: string) => void;

  subCategory: string;
  setSubCategory: (v: string) => void;

  search: string;
  setSearch: (v: string) => void;

};

const FilterContext = createContext<FilterContextType | null>(null);

export function FilterProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");

  const [category, setCategory] = useState("");

  const [subCategory, setSubCategory] = useState("");

  const [search, setSearch] = useState("");

  return (

    <FilterContext.Provider
      value={{
        city,
        setCity,

        district,
        setDistrict,

        category,
        setCategory,

        subCategory,
        setSubCategory,

        search,
        setSearch,
      }}
    >

      {children}

    </FilterContext.Provider>

  );

}

export function useFilter() {

  const context = useContext(FilterContext);

  if (!context)
    throw new Error("FilterProvider eksik.");

  return context;

}
