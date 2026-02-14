import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase URL and Anon Key from your dashboard
const supabaseUrl = 'https://aukcisdbzfcbjtursprv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1a2Npc2RiemZjYmp0dXJzcHJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5OTQwMjAsImV4cCI6MjA4NjU3MDAyMH0.0NCw6LjEAch4BB9owUhgHIaSQPCN6L9Ko5qYGuORoz4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);