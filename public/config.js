// ============================================================
// FILL THESE IN with your own Supabase project's values.
// Dashboard > Project Settings > API > "Project URL" and "anon public" key.
// This "anon" key is safe to expose in a public frontend — access is
// controlled by the Row Level Security policies in schema.sql, not by
// keeping this key secret.
// ============================================================
const SUPABASE_URL = "https://yneyidzigakknmbegxuf.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_mnULuXg3y5MDOUYfhGsFGQ_GfZCgsM8";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
