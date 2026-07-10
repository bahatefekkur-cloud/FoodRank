from pathlib import Path
import sys

sys.path.append(str(Path(__file__).resolve().parent.parent))

import pandas as pd

from config import supabase
from category_map import CATEGORY_MAP

# Excel
excel_path = Path(__file__).parent.parent / "data" / "FoodRank.xlsx"
df = pd.read_excel(excel_path)

print(f"Toplam kayıt: {len(df)}")

# Restaurant sözlüğü (maps_url -> id)
restaurants = (
    supabase
    .table("restaurants")
    .select("id,maps_url")
    .execute()
)

restaurant_map = {
    r["maps_url"]: r["id"]
    for r in restaurants.data
}

menu_items = []
not_found = []

for _, row in df.iterrows():

    restaurant_id = restaurant_map.get(row["maps_url"])

    if restaurant_id is None:
        print(f"Restaurant bulunamadı: {row['restaurant_name']}")
        continue

    category_id = CATEGORY_MAP.get(row["menu_name"])

    if category_id is None:
        not_found.append(row["menu_name"])
        continue

    menu_items.append({
        "restaurant_id": restaurant_id,
        "category_id": category_id,
        "menu_name": row["menu_name"],
        "price": float(row["price"]),
        "gramaj": None if pd.isna(row["gramaj"]) else row["gramaj"],
        "source": row["source"],
        "is_active": bool(row["is_active"])
    })

print(f"\nEklenecek menu item: {len(menu_items)}")

# 500'erli ekle
for i in range(0, len(menu_items), 500):

    batch = menu_items[i:i+500]

    supabase.table("menu_items").insert(batch).execute()

    print(f"{min(i+500, len(menu_items))} / {len(menu_items)}")

print("\n✅ Menü aktarımı tamamlandı.")

if not_found:

    print("\nKategori bulunamayan ürünler:")

    for item in sorted(set(not_found)):
        print("-", item)
