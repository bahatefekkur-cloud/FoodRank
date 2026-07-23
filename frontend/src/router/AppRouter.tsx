import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import RestaurantList from "../pages/RestaurantList";
import CategoryPage from "../pages/CategoryPage";
import RestaurantPage from "../pages/RestaurantPage";
import SubCategoryPage from "../pages/SubCategoryPage";
import TopRestaurantsPage from "../pages/TopRestaurantsPage";
import MapPage from "../pages/MapPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<RestaurantList />}
        />

        <Route
          path="/map"
          element={<MapPage />}
        />


        <Route
          path="/category/:slug"
          element={<CategoryPage />}
        />

        <Route
          path="/restaurant/:slug"
          element={<RestaurantPage />}
        />

        <Route
          path="/subcategory/:slug"
          element={<SubCategoryPage />}
        />

        <Route
          path="/top-restaurants"
          element={<TopRestaurantsPage />}
        />

      </Routes>
    </BrowserRouter>
  );
}