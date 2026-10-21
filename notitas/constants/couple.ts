/**
 * Map Supabase Auth emails (lowercase) to first names. Must match the emails you use in Auth.
 * Update these when you create Milo / Val accounts.
 */
export const COUPLE_EMAIL_TO_NAME: Record<string, "Milo" | "Val"> = {
  "agudelojaramillocamilo00@gmail.com": "Milo",
  "lauravalentinaavilaguativa@gmail.com": "Val",
};

export function getCoupleDisplayName(
  email: string | undefined | null,
): "Milo" | "Val" | null {
  if (!email) return null;
  const key = email.trim().toLowerCase();
  return COUPLE_EMAIL_TO_NAME[key] ?? null;
}

/** The other person in the chat (for placeholders). */
export function getPartnerNameForPlaceholder(
  me: "Milo" | "Val",
): "Milo" | "Val" {
  return me === "Milo" ? "Val" : "Milo";
}

/** Local time: 6–11 Buenos Días, 12–19 Buenas Tardes, else Buenas Noches. */
export function getTimeOfDayGreeting():
  | "Buenos Días"
  | "Buenas Tardes"
  | "Buenas Noches" {
  const h = new Date().getHours();
  if (h >= 6 && h <= 11) return "Buenos Días";
  if (h >= 12 && h <= 19) return "Buenas Tardes";
  return "Buenas Noches";
}

export function getInputPlaceholder(
  displayName: "Milo" | "Val" | null,
): string {
  if (displayName === "Milo") return "¿Qué le quieres decir a Val?";
  if (displayName === "Val") return "¿Qué le quieres decir a Milo?";
  return "Escribe un mensaje…";
}

/** Apodos que rotan en el saludo del chat (animación tipo máquina de escribir). */
export const CHAT_GREETING_WORDS_MILO = [
  "amorcito",
  "mi amor",
  "vida",
  "milo",
] as const;

export const CHAT_GREETING_WORDS_VAL = [
  "cielito",
  "princesa",
  "mi vida",
  "amortito",
  "Val",
] as const;

export function getChatGreetingTypewriterWords(
  displayName: "Milo" | "Val" | null,
): string[] {
  if (displayName === "Milo") return [...CHAT_GREETING_WORDS_MILO];
  if (displayName === "Val") return [...CHAT_GREETING_WORDS_VAL];
  return [];
}
