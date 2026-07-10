import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import RestaurantList from "../pages/RestaurantList";
import RestaurantPage from "../pages/RestaurantPage";

export default function AppRouter() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<RestaurantList />}
        />

        <Route
          path="/restaurant/:slug"
          element={<RestaurantPage />}
        />

      </Routes>

    </BrowserRouter>
  );
}
