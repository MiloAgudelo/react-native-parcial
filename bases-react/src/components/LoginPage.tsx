import { useAuthContext } from '../context/useAuthContext';

export const LoginPage = () => {
  // Extraemos del contexto lo que necesitamos para controlar el login.
  const { isChecking, isAuthenticated, loginWithEmailPassword, user, logout } =
    useAuthContext();

  // Mientras se valida el usuario, mostramos un mensaje temporal.
  if (isChecking) {
    return <h1>Verificando usuario</h1>;
  }

  return (
    <>
      {isAuthenticated ? (
        <>
          <h3>Bienvenido</h3>
          <pre>{JSON.stringify(user, null, 2)}</pre>

          <button
            onClick={() => logout()}
            className="bg-blue-500 p-2 text-white rounded-xl mt-2"
          >
            Salir
          </button>
        </>
      ) : (
        <>
          <h3>Ingresar a la aplicación</h3>

          <button
            onClick={() => loginWithEmailPassword('susana@google.com')}
            className="bg-blue-500 p-2 text-white rounded-xl mt-2"
          >
            Ingresar
          </button>
        </>
      )}
    </>
  );
};
