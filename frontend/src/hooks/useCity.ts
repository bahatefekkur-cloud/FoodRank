import { useEffect, useState } from "react";

const STORAGE_KEY = "foodrank-city";

export function useCity() {
  const [city, setCity] = useState("Bursa");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      setCity(saved);
    }
  }, []);

  function changeCity(value: string) {
    setCity(value);
    localStorage.setItem(STORAGE_KEY, value);
  }

  return {
    city,
    changeCity,
  };
}