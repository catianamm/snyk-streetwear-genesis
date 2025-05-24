
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wldvlkzqwcgoykdnoinm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsZHZsa3pxd2Nnb3lrZG5vaW5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwNzA0MDEsImV4cCI6MjA2MzY0NjQwMX0.FCzxdS3oGOIS517BTJQPjoZONnClIIxG_iXAYPNVERE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
