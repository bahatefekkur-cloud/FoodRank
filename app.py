import streamlit as st
import pandas as pd
import urllib.parse

# Sayfa ayarları
st.set_page_config(
    page_title="FoodRank",
    page_icon="🍽️",
    layout="wide"
)

# Başlık
st.title("🍽️ FoodRank Türkiye")
st.caption(
    "En iyi fiyat/performans restoranlarını keşfet"
)

# Filtreler

col1, col2 = st.columns(2)

with col1:
    sehir = st.selectbox(
        "Hangi Şehirdesin",
        ["Bursa", "İstanbul", "Ankara", "Adana"]
    )

with col2:
    kategori = st.selectbox(
        "Bugün Ne Yemek İstersin",
        [
            "İskender (Bursa Kebabı)",
            "Pideli Köfte",
            "Ciğer"
        ]
    )

# Excel dosyası
dosya = "Bursa.xlsx"

# Sayfa seçimi
sheet_map = {
    "İskender (Bursa Kebabı)": "iskender",
    "Pideli Köfte": "pideli köfte",
    "Ciğer": "ciğer"
}

sheet_adi = sheet_map[kategori]

# Veri oku
df = pd.read_excel(
    dosya,
    sheet_name=sheet_adi
)

# İlk satırı kolon yap
df.columns = df.iloc[0]
df = df[1:]
df = df.dropna(subset=["Restoran"])


# Sayısal alanları düzelt
for kolon in ["Google Puan", "Fiyat (tl)", "F/P Skoru"]:
    if kolon in df.columns:
        df[kolon] = pd.to_numeric(
            df[kolon],
            errors="coerce"
        )

# Sıralama
df["F/P Skoru"] = (
    pd.to_numeric(df["F/P Skoru"], errors="coerce")
    .fillna(0)
    .round()
    .astype(int)
)
df = df.sort_values(
    by="F/P Skoru",
    ascending=False
)

# İlk 3
st.header(f"{kategori} Nerede Yenir?")

st.subheader("FoodRank F/P Sıralaması")
st.caption(
    "F/P Skoru; yemek birim fiyatı ile restoranın google puanı ve yorum sayısı dikkate alınarak hesaplanan bir skordur."
)

ilk_uc = df.head(3)

col1, col2, col3 = st.columns(3)

sutunlar = [col1, col2, col3]

for i, (_, row) in enumerate(ilk_uc.iterrows()):

    if i == 0:
        madalya = "🥇"
    elif i == 1:
        madalya = "🥈"
    else:
        madalya = "🥉"

    with sutunlar[i]:

        st.success(
            f"""
{madalya} {row['Restoran']}

⭐ Google {row['Google Puan']}  |  💬{int(row['Google Yorum Sayısı']):,} yorum

💰 ₺{row['Fiyat (tl)']} ({row['Gramaj']} gr) 

Birim fiyat (100 gr): ₺{int(row['Birim Fiyat'])}

📈 F/P Skoru: {row['F/P Skoru']}

"""
        )

# Tüm tablo
st.header(f"Şehrin Popüler Restoranları")

st.caption(f"{len(df)} restoran listeleniyor")

for i, (_, row) in enumerate(df.iterrows(), start=1):

    st.markdown("---")

    st.subheader(f"#{i} {row['Restoran']}")

    st.write(
    f"⭐ {row['Google Puan']} | "
    f"💬 {row['Google Yorum Sayısı']} yorum | "
    f"💰 ₺{row['Fiyat (tl)']} | "
    f"📈 {row['F/P Skoru']}"
)
    
    st.markdown(
    f"[📍 Haritada Aç]({row['Adres']})"
)

df.insert(
    0,
    "Sıra",
    range(1, len(df) + 1)
)

st.divider()

st.caption(
    "FoodRank • En iyi fiyat/performans restoranlarını keşfet"
)