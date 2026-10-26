// ============================================================
// Supabase Configuration
// ============================================================
const SUPABASE_URL = "https://yneyidzigakknmbegxuf.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_mnULuXg3y5MDOUYfhGsFGQ_GfZCgsM8";

var supabaseClient = null;
try {
  if (typeof window !== 'undefined' && window.supabase && window.supabase.createClient) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    window.supabaseClient = supabaseClient;
  }
} catch (e) {
  console.warn('Could not initialize Supabase client:', e);
}
