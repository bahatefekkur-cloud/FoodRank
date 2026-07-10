import streamlit as st
import pandas as pd
import urllib.parse

# Sayfa ayarları
st.set_page_config(
    page_title="FoodRank",
    page_icon="🍽️",
    layout="wide"
)
st.markdown("""
<style
section.main > div {
    padding-top: 0rem;
}
<style>
""", unsafe_allow_html=True)

# Başlık
st.title("🍽️ FoodRank")
st.caption(
    "En iyi fiyat/performans restoranlarını keşfet"
)

# Filtreler

col1, col2, col3, col4 = st.columns(4)

kategori_df = pd.read_excel(
    "Foodrank.xlsx",
    sheet_name="Veriler"
)

kategori_listesi = sorted(
    kategori_df["Yemek"]
    .dropna()
    .astype(str)
    .unique()
    .tolist()
)

with col1:
    kategori = st.selectbox(
        "Ne Yesek",
        ["Lütfen Seçiniz"] + kategori_listesi
    )

with col2:

    sehir_listesi = sorted(
        kategori_df["Şehir"]
        .dropna()
        .astype(str)
        .unique()
        .tolist()
    )

    sehir = st.selectbox(
        "Şehir",
        ["Lütfen seçiniz"] + sehir_listesi
    )

avrupa_yakasi = [
    "Arnavutköy","Avcılar","Bağcılar","Bahçelievler","Bakırköy",
    "Başakşehir","Bayrampaşa","Beşiktaş","Beylikdüzü","Beyoğlu",
    "Büyükçekmece","Çatalca","Esenler","Esenyurt","Eyüpsultan",
    "Fatih","Gaziosmanpaşa","Güngören","Kağıthane","Küçükçekmece",
    "Sarıyer","Silivri","Sultangazi","Şişli","Zeytinburnu"
]

anadolu_yakasi = [
    "Adalar","Ataşehir","Beykoz","Çekmeköy","Kadıköy","Kartal",
    "Maltepe","Pendik","Sancaktepe","Sultanbeyli","Şile",
    "Tuzla","Ümraniye","Üsküdar"
]

with col3:

    if sehir == "Lütfen seçiniz":

        ilce_listesi = []

    else:

        ilceler = sorted(
            kategori_df[
                kategori_df["Şehir"] == sehir
            ]["İlçe"]
            .dropna()
            .astype(str)
            .unique()
            .tolist()
        )

        if sehir == "İstanbul":

            ilce_listesi = (
                [
                    "📍 Avrupa Yakası (Tümü)",
                    "📍 Anadolu Yakası (Tümü)"
                ]
                + ilceler
            )

        else:

            ilce_listesi = ilceler

    ilce = st.selectbox(
        "İlçe",
        ["Hepsi"] + ilce_listesi
    )

with col4:

    siralama = st.selectbox(
        "Sıralamayı Değiştir",
        [
            "Fiyat/Performans Sıralaması (önerilen)",
            "Porsiyon Fiyatına Göre Artan",
            "Porsiyon Fiyatına Göre Azalan",
            "Google Puana Göre Artan",
            "Google Puana Göre Azalan",
            "Google Yorum Sayısına Göre Artan",
            "Google Yorum Sayısına Göre Azalan"
        ]
    )

arama = st.text_input(
    "",
    placeholder="🔍 Restoran ara..."
)


# Excel dosyası
if sehir == "Lütfen seçiniz" or kategori == "Lütfen seçiniz":
    st.info("👆 önce yemek ve şehir seçimi yapın, sonra nerede yiyeceğinize karar verin.")
    st.stop()

dosya = "Foodrank.xlsx"

# Sayfa seçimi
if sehir == "Lütfen seçiniz" or kategori == "Lütfen seçiniz":
    st.info("👆 Şehir ve yemek seçerek sıralamayı görüntüleyin.")
    st.stop()

# Tüm veriyi oku
@st.cache_data
def veriyi_yukle():

    df = pd.read_excel(
        dosya,
        sheet_name="Veriler"
    )

    return df.dropna(subset=["Restoran"])


master_df = veriyi_yukle()


def restoran_menusu(restoran):

    menu = master_df[
        master_df["Restoran"] == restoran
    ].copy()

    menu = menu.sort_values("Yemek")

    return menu


# Çalışacağımız kopya
df = master_df.copy()


@st.cache_data
def ayarlari_yukle():

    return pd.read_excel(
        dosya,
        sheet_name="Ayarlar"
    )

ayarlar = ayarlari_yukle()

puan_tablosu=(
    ayarlar[["Google Puan", "Puan Skoru"]]
    .dropna()
    .values.tolist()
)
yorum_tablosu=(
    ayarlar[["Google Yorum", "Yorum Skoru"]]
    .dropna()
    .values.tolist()
)

# İlk satırı kolon yap
df=master_df.copy()

df=df[df["Şehir"]==sehir]

df = df[df["Yemek"] == kategori]

if ilce == "🌍 Avrupa Yakası (Tümü)":

    df = df[
        df["İlçe"].isin(avrupa_yakasi)
    ]

elif ilce == "🌍 Anadolu Yakası (Tümü)":

    df = df[
        df["İlçe"].isin(anadolu_yakasi)
    ]

if ilce == "📍 Avrupa Yakası (Tümü)":

    df = df[
        df["İlçe"].isin(avrupa_yakasi)
    ]

elif ilce == "📍 Anadolu Yakası (Tümü)":

    df = df[
        df["İlçe"].isin(anadolu_yakasi)
    ]

elif ilce != "Hepsi":

    df = df[
        df["İlçe"] == ilce
    ]


if arama:

    df = df[
        df["Restoran"]
        .astype(str)
        .str.contains(
            arama,
            case=False,
            na=False
        )
    ]




# Sayısal alanları düzelt
for kolon in [
    "Google Puan", 
    "Google Yorum Sayısı",
    "Fiyat (tl)",
    ]:
    if kolon in df.columns:
        df[kolon] = pd.to_numeric(
            df[kolon],
            errors="coerce"
        )

st.header(f"{kategori} Nerede Yenir")
st.caption(f"{len(df)} restoran listeleniyor")


# Google puan skoru

# En düşük fiyat
min_fiyat = df["Fiyat (tl)"].min()

# Ayarlar tablolarını oluştur
puan_tablosu = list(
    zip(
        ayarlar["Google Puan"],
        ayarlar["Puan Skoru"]
    )
)

yorum_tablosu = list(
    zip(
        ayarlar["Google Yorum"],
        ayarlar["Yorum Skoru"]
    )
)

# Excel'deki ARA() fonksiyonu mantığı
from bisect import bisect_right

def lookup(deger, tablo):
    esikler = [x[0] for x in tablo]
    skorlar = [x[1] for x in tablo]

    i = bisect_right(esikler, deger) - 1

    if i < 0:
        return skorlar[0]

    return skorlar[i]



# FoodRank F/P Hesabı
df["Puan Skoru"] = df["Google Puan"].apply(
    lambda x: lookup(x, puan_tablosu)
)

df["Yorum Skoru"] = df["Google Yorum Sayısı"].apply(
    lambda x: lookup(x, yorum_tablosu)
)

df["F/P Skoru"] = (
    (
        df["Puan Skoru"] +
        df["Yorum Skoru"]
    )
    /
    (
        (df["Fiyat (tl)"] / min_fiyat) ** 0.5
    )
)

df["F/P Skoru"] = df["F/P Skoru"].round(2)


if siralama == "Fiyat/Performans Sıralaması (önerilen)":
    df = df.sort_values(by="F/P Skoru", ascending=False)

elif siralama == "Porsiyon Fiyatına Göre Artan":
    df = df.sort_values(by="Fiyat (tl)", ascending=True)

elif siralama == "Porsiyon Fiyatına Göre Azalan":
    df = df.sort_values(by="Fiyat (tl)", ascending=False)

elif siralama == "Google Puana Göre Artan":
    df = df.sort_values(by="Google Puan", ascending=True)

elif siralama == "Google Puana Göre Azalan":
    df = df.sort_values(by="Google Puan", ascending=False)

elif siralama == "Google Yorum Sayısına Göre Artan":
    df = df.sort_values(by="Google Yorum Sayısı", ascending=True)

elif siralama == "Google Yorum Sayısına Göre Azalan":
    df = df.sort_values(by="Google Yorum Sayısı", ascending=False)

if siralama == "Fiyat/Performans Sıralaması (önerilen)":
    aciklama = "Foodrank algoritmasına göre en iyi fiyat/performans seçimi"

elif siralama == "Porsiyon Fiyatına Göre Artan":
    aciklama = "Listelenen restoranlar arasındaki en uygun porsiyon fiyatı"

elif siralama == "Porsiyon Fiyatına Göre Azalan":
    aciklama = "Listelenen restoranlar arasındaki en yüksek porsiyon fiyatı"

elif siralama == "Google Puana Göre Artan":
    aciklama = "Listelenen restoranlar arasındaki en düşük google puanı"

elif siralama == "Google Puana Göre Azalan":
    aciklama = "Listelenen restoranlar arasındaki en yüksek google puanı"

elif siralama == "Google Yorum Sayısına Göre Artan":
    aciklama = "Listelenen restoranlar arasındaki en az kullanıcı yorumu"

elif siralama == "Google Yorum Sayısına Göre Azalan":
    aciklama = "Listelenen restoranlar arasındaki en fazla kullanıcı yorumu"

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

        st.markdown(
    f"""
<div style="
padding:18px 18px 10px 18px;
border-radius:12px;
border:1px solid #ddd;
background:#f8f9fa;
text-align:center;
box-shadow:0 2px 6px rgba(0,0,0,.08);
">

<div style="
font-size:22px;
font-weight:700;
margin-bottom:14px;
line-height:1.3;
">
{madalya} {row["Restoran"]}
</div>

<div style="
color:#1e3a8a;
font-size:40px;
font-weight:700;
margin-bottom:14px;
line-height:1;
">
₺{int(row["Fiyat (tl)"])}
</div>

<div style="
color:#666;
font-size:14px;
line-height:1.2;
">
⭐ {row["Google Puan"]}
&nbsp;&nbsp;•&nbsp;&nbsp;
💬 {int(row["Google Yorum Sayısı"]):,}
</div>

</div>
""",
    unsafe_allow_html=True,
)

        st.markdown("<div style='margin-top:6px'></div>", unsafe_allow_html=True)

        bos1, buton1, buton2, bos2 = st.columns([0.6,1,1,0.4])

        with buton1:
            st.link_button(
                "📍 Haritada Aç",
                row["Adres"],
                use_container_width=True
            )

        with buton2:

            menu = restoran_menusu(row["Restoran"])

            with st.popover("🍽 Menü"):

                for _, urun in menu.iterrows():

                    st.write(
                        f'**{urun["Yemek"]}** — ₺{int(urun["Fiyat (tl)"])}'
                    )

st.markdown(
    f"""
<div style="
text-align:left;
color:#ea580c;
font-size:14px;
font-style:italic;
margin-top:12px;
margin-bottom:8px;
">
{aciklama}
</div>
""",
    unsafe_allow_html=True
)

st.divider()


# Tüm tablo

df_liste = df.iloc[3:]

cols = st.columns(3)

for i, (_, row) in enumerate(df_liste.iterrows(), start=4):

    with cols[(i - 4) % 3]:

        st.markdown(
            f"""
<div style="
padding:14px;
border-radius:12px;
border:1px solid #ddd;
background:#ffffff;
text-align:center;
box-shadow:0 2px 6px rgba(0,0,0,.08);
">

<div style="
font-size:20px;
font-weight:700;
margin-bottom:12px;
line-height:1.3;
">
{i}) {row["Restoran"]}
</div>

<div style="
color:#1e3a8a;
font-size:34px;
font-weight:700;
margin-bottom:12px;
line-height:1;
">
₺{int(row["Fiyat (tl)"])}
</div>

<div style="
color:#666;
font-size:14px;
line-height:1.2;
">
⭐ {row["Google Puan"]}
&nbsp;&nbsp;•&nbsp;&nbsp;
💬 {int(row["Google Yorum Sayısı"]):,}
</div>

</div>
""",
            unsafe_allow_html=True,
        )

        st.markdown(
            "<div style='margin-top:6px'></div>",
            unsafe_allow_html=True
        )

        bos1, buton1, buton2, bos2 = st.columns([0.6, 1, 1, 0.4])

        with buton1:
            st.link_button(
                "📍 Haritada Aç",
                row["Adres"],
                use_container_width=True
            )

        with buton2:

            menu = restoran_menusu(row["Restoran"])

            with st.popover("🍽 Menü"):

                for _, urun in menu.iterrows():

                    st.write(
                        f'**{urun["Yemek"]}** — ₺{int(urun["Fiyat (tl)"])}'
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
