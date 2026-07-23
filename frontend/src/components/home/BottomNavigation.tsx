import { NavLink } from "react-router-dom";

const menus = [
  {
    title: "Ana Sayfa",
    icon: "🏠",
    path: "/",
  },
  {
    title: "Ara",
    icon: "🔍",
    path: "/search",
  },
  {
    title: "Favoriler",
    icon: "❤️",
    path: "/favorites",
  },
  {
    title: "Harita",
    icon: "📍",
    path: "/map",
  },
  {
    title: "Profil",
    icon: "👤",
    path: "/profile",
  },
];

export default function BottomNavigation() {
  return (
    <nav
      className="
        sticky
        bottom-0
        z-50
        border-t
        border-gray-200
        bg-white/95
        backdrop-blur
      "
    >
      <div className="mx-auto flex h-20 max-w-5xl items-center justify-around">
        {menus.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 transition ${
                isActive
                  ? "text-orange-500"
                  : "text-gray-400 hover:text-orange-500"
              }`
            }
          >
            <span className="text-2xl">{item.icon}</span>

            <span className="text-xs font-medium">
              {item.title}
            </span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}