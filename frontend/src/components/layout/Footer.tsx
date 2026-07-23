import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-200 bg-white">

      <div className="mx-auto max-w-7xl px-6 py-14">

        <div className="grid gap-10 md:grid-cols-5">

          {/* LOGO */}

          <div className="md:col-span-2">

            <div className="flex items-center gap-3">

              <img
                src={logo}
                alt="FoodRank"
                className="h-12 w-12"
              />

              <div>

                <h2 className="text-3xl font-bold">
                  <span className="text-slate-900">
                    Food
                  </span>
                  <span className="text-orange-500">
                    Rank
                  </span>
                </h2>

                <p className="text-sm font-medium text-slate-700">
                  Karşılaştır. Keşfet. Karar Ver.
                </p>

              </div>

            </div>

            <p className="mt-6 max-w-sm text-[13px] leading-6 text-gray-500">
                
              Güncel menü fiyatları, Google puanları ve kullanıcı
              yorumlarını tek ekranda karşılaştırarak en avantajlı
              seçimi yapmanı sağlar.

            </p>

          </div>

          {/* Kurumsal */}

          <div>

            <h3 className="mb-5 font-semibold text-slate-900">
              Kurumsal
            </h3>

            <ul className="space-y-3 text-sm text-gray-500">

              <li>
                <Link to="/about" className="hover:text-orange-500">
                  FoodRank Nedir?
                </Link>
              </li>

              <li>
                <Link to="/company" className="hover:text-orange-500">
                  Hakkımızda
                </Link>
              </li>

              <li>
                <Link to="/blog" className="hover:text-orange-500">
                  Blog
                </Link>
              </li>

            </ul>

          </div>

          {/* Yardım */}

          <div>

            <h3 className="mb-5 font-semibold text-slate-900">
              Yardım
            </h3>

            <ul className="space-y-3 text-sm text-gray-500">

              <li>
                <Link to="/faq" className="hover:text-orange-500">
                  Sıkça Sorulan Sorular
                </Link>
              </li>

              <li>
                <Link to="/contact" className="hover:text-orange-500">
                  İletişim
                </Link>
              </li>

              <li>
                <Link to="/privacy" className="hover:text-orange-500">
                  Gizlilik Politikası
                </Link>
              </li>

              <li>
                <Link to="/terms" className="hover:text-orange-500">
                  Kullanım Koşulları
                </Link>
              </li>

            </ul>

          </div>

          {/* İletişim */}

          <div>

            <h3 className="mb-5 font-semibold text-slate-900">
              İletişim
            </h3>

            <div className="space-y-4 text-sm text-gray-500">

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="block hover:text-orange-500"
              >
                📷 Instagram
              </a>

              <a
                href="mailto:info@foodrank.com"
                className="block hover:text-orange-500"
              >
                ✉ info@foodrank.com
              </a>

            </div>

          </div>

        </div>

        <div className="mt-12 border-t border-gray-200 pt-6">

          <p className="text-center text-sm text-gray-400">
            © 2026 FoodRank • Tüm hakları saklıdır.
          </p>

        </div>

      </div>

    </footer>
  );
}