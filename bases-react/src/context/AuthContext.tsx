import { useEffect, useState, type PropsWithChildren } from 'react';
import { AuthStatus, type AuthStatus as AuthStatusType, type User } from './auth.types';
import { AuthContext } from './auth.context';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [status, setStatus] = useState<AuthStatusType>(AuthStatus.checking);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    setTimeout(() => {
      setStatus(AuthStatus.unauthenticated);
    }, 1500);
  }, []);

  const loginWithEmailPassword = (email: string) => {
    setUser({
      name: 'susana',
      email: email,
    });
    setStatus(AuthStatus.authenticated);
  };

  const logout = () => {
    setUser(undefined);
    setStatus(AuthStatus.unauthenticated);
  };

  return ( // los hijos de este provider van a tener acceso a todo lo que se pasa en el value
    <AuthContext.Provider
      value={{
        status: status,
        user: user,

        // Getter
        isChecking: status === AuthStatus.checking,
        isAuthenticated: status === AuthStatus.authenticated,

        // Method
        loginWithEmailPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
