/**
 * One-tap dev logins for a two-person app. Values come from .env (gitignored).
 * Only rendered when __DEV__ is true — safe to commit without secrets.
 */
export const DEV_LOGIN_PRESETS: {
  label: string;
  email: string;
  password: string;
}[] = [
  {
    label: "Usuario A",
    email: process.env.EXPO_PUBLIC_DEV_USER_A_EMAIL ?? "",
    password: process.env.EXPO_PUBLIC_DEV_USER_A_PASSWORD ?? "",
  },
  {
    label: "Usuario B",
    email: process.env.EXPO_PUBLIC_DEV_USER_B_EMAIL ?? "",
    password: process.env.EXPO_PUBLIC_DEV_USER_B_PASSWORD ?? "",
  },
];
