// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://jtxammisclbyzyvjydul.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0eGFtbWlzY2xieXp5dmp5ZHVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NjI4MzQsImV4cCI6MjA2NjIzODgzNH0.0ZVUZkzBwEBf0mSXLNArAHUTjnKcVqLCSDDXCY7g2c8";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);