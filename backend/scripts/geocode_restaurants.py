import sys
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parent.parent))

from config import supabase

from geopy.geocoders import Nominatim
from geopy.extra.rate_limiter import RateLimiter

from datetime import datetime
import time

print("=" * 60)
print("FoodRank Geocoder")
print("=" * 60)

geolocator = Nominatim(user_agent="foodrank_geocoder")

geocode = RateLimiter(
    geolocator.geocode,
    min_delay_seconds=1.2
)


def build_queries(r):

    return [

        f"{r['name']}, {r['address']}, {r['district']}, {r['city']}, Türkiye",

        f"{r['address']}, {r['district']}, {r['city']}, Türkiye",

        f"{r['name']}, {r['city']}, Türkiye",

    ]


response = (
    supabase
    .table("restaurants")
    .select("*")
    .is_("latitude", "null")
    .limit(10)
    .execute()
)

restaurants = response.data

success = 0
failed = 0

for restaurant in restaurants:

    found = False

    for query in build_queries(restaurant):

        print(f"🔍 {query}")

        try:

            location = geocode(query)

            if location:

                print(
                    f"   ✓ {location.latitude}, {location.longitude}"
                )

                (
                    supabase
                    .table("restaurants")
                    .update({
                        "latitude": location.latitude,
                        "longitude": location.longitude,
                        "geocoded_at": datetime.utcnow().isoformat()
                    })
                    .eq("id", restaurant["id"])
                    .execute()
                )

                success += 1
                found = True

                break

        except Exception as e:

            print(e)

        time.sleep(1)

    if not found:

        print(f"❌ Bulunamadı -> {restaurant['name']}")
        failed += 1

print("\n" + "=" * 60)
print(f"Başarılı : {success}")
print(f"Başarısız : {failed}")
print("=" * 60)
