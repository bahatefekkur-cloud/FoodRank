from config import supabase

print("=" * 50)
print("FoodRank Backend")
print("=" * 50)

try:
    response = supabase.table("categories").select("*").execute()

    print("✅ Supabase bağlantısı başarılı.")
    print()

    print("Kategoriler:")

    for category in response.data:
        print(f"- {category['name']}")

except Exception as e:
    print("❌ Bağlantı hatası:")
    print(e)
