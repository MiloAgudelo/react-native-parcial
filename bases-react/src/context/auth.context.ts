import { createContext } from 'react';
import type { AuthState } from './auth.types';

export const AuthContext = createContext({} as AuthState);
