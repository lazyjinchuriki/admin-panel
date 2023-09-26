import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const createSupabaseClient = () => {
  return createClientComponentClient({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });
};
