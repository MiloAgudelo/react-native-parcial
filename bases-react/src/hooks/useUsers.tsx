import { useEffect, useRef, useState } from 'react';
import type { User } from '../interfaces/reqres.response';
import { loadUsersAction } from '../actions/load-users.action';

// Este hook encapsula la lógica para cargar usuarios y navegar páginas.
export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const currentPageRef = useRef(1);

  // Al cargar el componente, pedimos la primera página de usuarios.
  useEffect(() => {
    loadUsersAction(1).then(setUsers);
  }, []);

  // Avanza a la página siguiente si existe información.
  const nextPage = async () => {
    currentPageRef.current++;
    const users = await loadUsersAction(currentPageRef.current);

    if (users.length > 0) {
      setUsers(users);
    } else {
      currentPageRef.current--;
    }
  };

  // Vuelve a la página anterior.
  const prevPage = async () => {
    if (currentPageRef.current <= 1) return;

    currentPageRef.current--;

    const users = await loadUsersAction(currentPageRef.current);
    setUsers(users);
  };

  return {
    users,
    nextPage,
    prevPage,
  };
};
