import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cfzdklyngdxutymxeoot.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmemRrbHluZ2R4dXR5bXhlb290Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0ODcwOTcsImV4cCI6MjA5OTA2MzA5N30.U67NExrUD9GNQsPwrKp52L12hW051QKHO9q3ZCl3TYo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
