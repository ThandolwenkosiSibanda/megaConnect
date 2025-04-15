import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL ||
    "https://adamapljzjhdxollvkge.supabase.co",
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkYW1hcGxqempoZHhvbGx2a2dlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2MzMzNzYsImV4cCI6MjA2MDIwOTM3Nn0.SywqfQ5XpSiHTLa7O9u9-WjD3rVhwCIzrNbYEreoymA"
);
