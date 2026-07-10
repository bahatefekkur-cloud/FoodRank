import os

from dotenv import load_dotenv

from supabase import create_client

# .env dosyasını oku
load_dotenv()

# Supabase bilgileri
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY")

# Supabase bağlantısı
supabase = create_client(
    SUPABASE_URL,
    SUPABASE_SERVICE_KEY
)
