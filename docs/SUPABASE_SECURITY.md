# Supabase Storage security reminder

Ensure the Supabase Storage bucket named `private-docs` has Row Level Security (RLS) enabled and restrictive policies. The bucket must not allow public, anonymous, or direct client access. Files should only be accessed through trusted server-side API code using the Supabase Service Role key.

Keep the Service Role key in a server-only environment variable. Never expose it through a `NEXT_PUBLIC_*` variable or send it to the browser. Review bucket policies and access logs before production handover.
