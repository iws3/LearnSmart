// lib/supabase/client.ts (or a similar utility file)

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { auth as clerkAuthServer } from "@clerk/nextjs/server"; // For Clerk's server-side auth

// --- Client for Frontend / User-Context Operations ---
// This uses the ANON key and can be enhanced with the user's Clerk JWT
// to act on behalf of the user, respecting user-specific RLS.
let supabaseFrontendInstance: SupabaseClient | null = null;

export function getSupabaseFrontendClient(): SupabaseClient {
  if (supabaseFrontendInstance) {
    return supabaseFrontendInstance;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL or Anonymous Key is missing from .env for frontend client');
  }

  supabaseFrontendInstance = createClient(supabaseUrl, supabaseAnonKey, {
    // This part makes the client act as the currently logged-in Clerk user
    // by passing their JWT to Supabase.
    // Supabase will then apply RLS based on this user's authenticated session.
    global: {
      fetch: async (input, init) => {
        const auth = clerkAuthServer(); // Get Clerk auth object
        const token = await auth.getToken({ template: 'supabase' }); // Get Supabase-compatible token from Clerk

        const headers = new Headers(init?.headers);
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }

        return fetch(input, { ...init, headers });
      },
    },
  });
  return supabaseFrontendInstance;
}


// --- Client for Server-Side Actions / Admin Operations ---
// This uses the SERVICE ROLE key and BYPASSES RLS.
// It should ONLY be used in secure server-side environments like Next.js Server Actions.
export function createSupabaseServerAdminClient(): SupabaseClient {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error('Supabase URL or Service Role Key is missing from .env for server admin client');
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    }
  });
}