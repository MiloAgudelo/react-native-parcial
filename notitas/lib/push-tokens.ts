import type { SupabaseClient } from '@supabase/supabase-js';

export async function savePushToken(
  supabase: SupabaseClient,
  userId: string,
  token: string,
): Promise<void> {
  await supabase
    .from('push_tokens')
    .upsert(
      { user_id: userId, token, updated_at: new Date().toISOString() },
      { onConflict: 'token' },
    );
}

export async function removePushToken(
  supabase: SupabaseClient,
  token: string,
): Promise<void> {
  await supabase.from('push_tokens').delete().eq('token', token);
}
