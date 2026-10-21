import { createClient } from 'jsr:@supabase/supabase-js@2';

interface WebhookPayload {
  type: 'INSERT';
  record: { id: string; content: string; sender_id: string };
}

Deno.serve(async (req: Request) => {
  const { record }: WebhookPayload = await req.json();

  if (!record.sender_id) return new Response('ok', { status: 200 });

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  // Get all tokens for the recipient (supports multiple devices)
  const { data: rows } = await supabase
    .from('push_tokens')
    .select('token')
    .neq('user_id', record.sender_id);

  if (!rows?.length) return new Response('no tokens', { status: 200 });

  // Expo Push API accepts an array — one request for N devices
  await fetch('https://exp.host/--/exponent-push-notification-service/v2/push/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(
      rows.map(({ token }) => ({
        to: token,
        title: 'Notitas 💌',
        body: record.content,
        sound: 'default',
        priority: 'high',
      })),
    ),
  });

  return new Response('ok', { status: 200 });
});
