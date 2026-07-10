from pathlib import Path
import sys

sys.path.append(str(Path(__file__).resolve().parent.parent))

import pandas as pd

from config import supabase

# Excel'i oku
excel_path = Path(__file__).parent.parent / "data" / "FoodRank.xlsx"
df = pd.read_excel(excel_path)

print(f"Toplam kayıt: {len(df)}")

restaurants_added = 0

# Aynı restoranı tekrar işlememek için
processed = set()

for _, row in df.iterrows():

    maps_url = row["maps_url"]

    if maps_url in processed:
        continue

    processed.add(maps_url)

    # Veritabanında var mı?
    existing = (
        supabase.table("restaurants")
        .select("id")
        .eq("maps_url", maps_url)
        .execute()
    )

    if existing.data:
        continue

    # Yeni restoran ekle
    supabase.table("restaurants").insert({
        "name": row["restaurant_name"],
        "city": row["city"],
        "district": row["district"],
        "maps_url": maps_url,
        "google_rating": row["google_rating"],
        "review_count": row["review_count"],
        "is_active": row["is_active"]
    }).execute()

    restaurants_added += 1

print(f"\n✅ {restaurants_added} yeni restoran eklendi.")
