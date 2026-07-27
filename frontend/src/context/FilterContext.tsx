import { createContext, useContext, useState, type Dispatch, type SetStateAction, } from "react";

type FilterContextType = {

  city: string;
  setCity: Dispatch<SetStateAction<string>>;

  district: string;
  setDistrict: Dispatch<SetStateAction<string>>;

  category: string;
  setCategory: Dispatch<SetStateAction<string>>;

  subCategory: string;
  setSubCategory: Dispatch<SetStateAction<string>>;

  search: string;
  setSearch: Dispatch<SetStateAction<string>>;

  sortBy: string;
  setSortBy: Dispatch<SetStateAction<string>>;

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

  const [sortBy, setSortBy] =useState("foodrank");

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

        sortBy,
        setSortBy,
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
