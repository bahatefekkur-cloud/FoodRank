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
st.title("🍽️ FoodRank")
st.caption(
    "En iyi fiyat/performans restoranlarını keşfet"
)

# Sol menü
st.sidebar.header("Filtreler")

sehir = st.sidebar.selectbox(
    "Şehir",
    ["Bursa", "İstanbul", "Ankara", "Adana"]
)

kategori = st.sidebar.selectbox(
    "Kategori",
    ["İskender", "Pideli Köfte", "Ciğer"]
)

# Excel dosyası
dosya = "Bursa.xlsx"

# Sayfa seçimi
sheet_map = {
    "İskender": "iskender",
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


# Sayısal alanları düzelt
for kolon in ["Google Puan", "Fiyat (tl)", "F/P Skoru"]:
    if kolon in df.columns:
        df[kolon] = pd.to_numeric(
            df[kolon],
            errors="coerce"
        )

# Filtreler
min_puan = st.sidebar.slider(
    "Minimum Google Puan",
    1.0,
    5.0,
    3.0,
    0.1
)

arama = st.sidebar.text_input(
    "Restoran Ara"
)

# Filtre uygula
df = df[df["Google Puan"] >= min_puan]

if arama:
    df = df[
        df["Restoran"].astype(str)
        .str.contains(arama, case=False, na=False)
    ]

# Sıralama
df["F/P Skoru"] = df["F/P Skoru"].round().astype(int)
df = df.sort_values(
    by="F/P Skoru",
    ascending=False
)

# İlk 3
st.header(f"🏆 {kategori} Nerede Yenir")

st.subheader("En İyi 3 Restoran")

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

⭐ {row['Google Puan']}

💰 ₺{row['Fiyat (tl)']}

📈 F/P {row['F/P Skoru']}
"""
        )

# Tüm tablo
st.header(f"Şehrin Popüler Restoranları")

st.info(f"{len(df)} restoran listeleniyor")

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