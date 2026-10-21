export const AuthStatus = {
  checking: 'checking',
  authenticated: 'authenticated',
  unauthenticated: 'unauthenticated',
} as const;

export type AuthStatus = (typeof AuthStatus)[keyof typeof AuthStatus];

export interface User {
  name: string;
  email: string;
}

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;
  isChecking: boolean;
  isAuthenticated: boolean;
  loginWithEmailPassword: (email: string) => void;
  logout: () => void;
}
