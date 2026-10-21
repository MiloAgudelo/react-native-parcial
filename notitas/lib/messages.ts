/**
 * Message data and Supabase helpers shared by the app (and reusable by a home-screen widget
 * or native layer). Pass a SupabaseClient from `lib/supabase` (or another source).
 *
 * Widget note: Android widgets run in a separate process; they cannot read the app's
 * AsyncStorage-backed session. A widget will likely need its own auth strategy (e.g. a
 * restricted service role via a backend, SharedPreferences with a copied token, or an
 * Edge Function). This module stays UI-agnostic so you can call the same queries with any
 * client instance.
 */

import type { SupabaseClient } from '@supabase/supabase-js';

export type MessageRow = {
  id: string;
  created_at: string;
  content: string;
  sender_id: string | null;
};

const TABLE = 'messages';

export async function fetchRecentMessages(
  client: SupabaseClient,
  limit = 20,
): Promise<MessageRow[]> {
  const { data, error } = await client
    .from(TABLE)
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as MessageRow[];
}

export async function insertMessage(
  client: SupabaseClient,
  params: { content: string; sender_id: string },
): Promise<MessageRow> {
  const { data, error } = await client
    .from(TABLE)
    .insert({ content: params.content, sender_id: params.sender_id })
    .select()
    .single();

  if (error) throw error;
  return data as MessageRow;
}

export async function updateMessage(
  client: SupabaseClient,
  params: { id: string; content: string; sender_id: string },
): Promise<MessageRow> {
  const { data, error } = await client
    .from(TABLE)
    .update({ content: params.content })
    .eq('id', params.id)
    .eq('sender_id', params.sender_id)
    .select()
    .single();

  if (error) throw error;
  return data as MessageRow;
}

export async function deleteMessage(
  client: SupabaseClient,
  params: { id: string; sender_id: string },
): Promise<void> {
  const { error } = await client
    .from(TABLE)
    .delete()
    .eq('id', params.id)
    .eq('sender_id', params.sender_id);

  if (error) throw error;
}

export type MessageInsertPayload = {
  new: MessageRow;
};

export type MessageRealtimeHandlers = {
  onInsert: (row: MessageRow) => void;
  onUpdate: (row: MessageRow) => void;
  onDelete: (id: string) => void;
};

/** Suscripción a INSERT, UPDATE y DELETE; devuelve función para cancelar. */
export function subscribeToMessagesRealtime(
  client: SupabaseClient,
  handlers: MessageRealtimeHandlers,
): () => void {
  const channel = client
    .channel('messages-realtime')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: TABLE },
      (payload) => {
        handlers.onInsert(payload.new as MessageRow);
      },
    )
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: TABLE },
      (payload) => {
        handlers.onUpdate(payload.new as MessageRow);
      },
    )
    .on(
      'postgres_changes',
      { event: 'DELETE', schema: 'public', table: TABLE },
      (payload) => {
        const id = (payload.old as { id?: string }).id;
        if (id) handlers.onDelete(id);
      },
    )
    .subscribe();

  return () => {
    client.removeChannel(channel);
  };
}
