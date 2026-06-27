import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mssftoyksvbrukbovtzp.supabase.co';

const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zc2Z0b3lrc3ZicnVrYm92dHpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5MDMxOTQsImV4cCI6MjA5NjQ3OTE5NH0.eg40x7UcTMQXc5VTOL-BHnnbB5FeY6gsxtWoUBe4SG4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);