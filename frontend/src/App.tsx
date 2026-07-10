import { useEffect } from "react";
import AppRouter from "./router/AppRouter";
import { supabase } from "./lib/supabase";

export default function App() {

  useEffect(() => {
    async function test() {
      const { data, error } = await supabase
        .from("restaurants")
        .select("*");

      console.log(data);
      console.log(error);
    }

    test();
  }, []);

  return <AppRouter />;
}
