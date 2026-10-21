# Herramientas Necesarias para Iniciar React Native Expo: Aplicaciones Nativas para iOS y Android

## Documentación Oficial
* **React Native:** [https://reactnative.dev/](https://reactnative.dev/)
* **Expo:** [https://docs.expo.dev/](https://docs.expo.dev/)

---

## Instalaciones Necesarias

* **Visual Studio Code**
* **Postman**
* **Git**
  ```bash
  git config --global user.name "Tu nombre"
  git config --global user.email "Tu correo"
  ```
* **Node.js**
* **Android Studio**
* **Expo Go** (Android / iOS)

### Extensiones de VSCode recomendadas
* Error Lens
* ES7 React/Redux
* Simple React Snippets
* Auto Close Tag
* Paste JSON as Code
* Tailwind CSS IntelliSense
* Colorize

### Temas e Iconos en VSCode
* **Tema:** Tokyo Night
* **Iconos:** Bearded Icons

---

## Creación y Configuración del Proyecto Base

### 1. Crear carpeta del proyecto
Crear una carpeta con el nombre (en este caso `react-native`), abrirla en la terminal de Visual Studio Code y navegar a ella:

```bash
C:\2026\americas\movil2>cd react-native
C:\2026\americas\movil2\react-native>
```

### 2. Inicializar proyecto React con Vite
Ejecutar:
```bash
npm create vite
```

Flujo interactivo de configuración:
```text
C:\2026\americas\movil2\react-native>npm create vite
Need to install the following packages:
create-vite@9.1.1
Ok to proceed? (y) y

> npx
> create-vite

|
o  Project name:
|  bases
|
*  Select a framework:
|    Vanilla
|    Vue
|  > React
|    Preact
|    Lit
|    Svelte
|    Solid
|    Ember
|    Qwik
|    Angular
|    Marko
|    Others
|  ↑/↓ to navigate • Enter: confirm
```

* **Project name:** `base` (o renombrado luego a `01-base`)
* **Select a framework:** `React`
* **Select a variant:** `TypeScript + React Compiler`
* **Which linter to use?:** `ESLint`
* **Install with npm and start now?:** `Yes`

### 3. Navegar a la carpeta e instalar dependencias
Si se cancela la instalación automática o se renombra la carpeta:
```bash
cd 01-base
npm i
```

Salida de la instalación:
```text
added 158 packages, and audited 159 packages in 21s
42 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

### 4. Ejecutar el servidor de desarrollo
```bash
npm run dev
```

Salida en consola:
```text
  VITE v8.1.3  ready in 2983 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

Abrir en el navegador [http://localhost:5173/](http://localhost:5173/) e inspeccionar la consola del desarrollador.

---

## Configuración de Variables de Entorno de VS Code

Para poder ejecutar el comando `code` desde la consola de Windows, agregar al `Path` de variables de entorno del sistema/usuario:
```text
%USERPROFILE%\AppData\Local\Programs\Microsoft VS Code\bin
```

Verificación en terminal:
```bash
code --version
```

---

## Estructura Inicial del Proyecto

### `src/main.tsx`
Punto de entrada de React con `createRoot`:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx' // Escrito en TypeScript, por eso la extensión .tsx
// Acá se importan los estilos y nuestro primer componente

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

> **Tip:** Activar en las opciones de VSCode la casilla **Editor: Format On Save** para formateo automático al guardar archivos.

### `index.html`
Contenedor principal donde se monta la aplicación de React:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>base</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### `src/App.tsx` (Inicial)
```tsx
import './App.css'

function App() {
  return (
    <>
      <h1>React + TS</h1>
    </>
  )
}

export default App
```

---

## Fundamentos de TypeScript en React

### 1. Tipos Básicos (`src/typescript/BasicTypes.tsx`)
Crear la carpeta `src/typescript/` y el archivo `BasicTypes.tsx`:

```tsx
export const BasicTypes = () => {
  const name: string = 'Fernando';
  const age: number = 38;
  const isActive: boolean = false;

  const powers: string[] = ['React', 'ReactNative', 'Astro'];

  return (
    <>
      <h3>Tipos básicos</h3>
      {name} - {age} - {isActive ? 'Activo' : 'No Activo'}
      <p>{powers.join(', ')}</p>
    </>
  );
};
```

Incorporar en `App.tsx`:
```tsx
import './App.css'
import { BasicTypes } from './typescript/BasicTypes'

function App() {
  return (
    <>
      <h1>React + TS</h1>
      <BasicTypes />
    </>
  );
}

export default App
```

---

### 2. Objetos Literales e Interfaces (`src/typescript/ObjectLiterals.tsx`)
En JavaScript casi todo es un objeto. En TypeScript tipamos la estructura con interfaces:

```tsx
interface Person {
  age: number;
  firstName: string;
  lastName: string;
  address: Address;
}

interface Address {
  country: string;
  houseNo: string;
  street?: string;
}

export const ObjectLiterals = () => {
  const person: Person = {
    age: 38,
    firstName: 'susana',
    lastName: 'dias',
    address: {
      country: 'Canada',
      houseNo: '615',
    },
  };

  return (
    <>
      <h3>Objetos literales</h3>
      <pre>{JSON.stringify(person, null, 2)}</pre>
    </>
  );
};
```

Llamar al componente en `App.tsx`:
```tsx
import './App.css'
import { BasicTypes } from './typescript/BasicTypes'
import { ObjectLiterals } from './typescript/ObjectLiterals'

function App() {
  return (
    <>
      <h1>React + TS</h1>
      <BasicTypes />
      <ObjectLiterals />
    </>
  );
}

export default App
```

---

### 3. Funciones Tipadas (`src/typescript/BasicFunctions.tsx`)
Función con parámetros y valor de retorno tipados:

```tsx
const addTwoNumbers = (a: number, b: number): string => {
  return `${a + b}`;
};

export const BasicFunctions = () => {
  return (
    <>
      <h3>Funciones</h3>
      <span>El resultado de sumar 2+8 = {addTwoNumbers(2, 8)}</span>
    </>
  );
};
```

Actualizar `App.tsx`:
```tsx
import './App.css'
import { BasicTypes } from './typescript/BasicTypes'
import { ObjectLiterals } from './typescript/ObjectLiterals'
import { BasicFunctions } from './typescript/BasicFunctions'

function App() {
  return (
    <>
      <h1>React + TS</h1>
      <BasicTypes />
      <ObjectLiterals />
      <BasicFunctions />
    </>
  );
}

export default App
```

---

## Integración y Configuración de Tailwind CSS v4

### 1. Instalación
Desde la documentación oficial de Tailwind CSS para Vite:
```bash
npm install tailwindcss @tailwindcss/vite
```

### 2. Configuración en `vite.config.ts`
```ts
import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})
```

### 3. Configuración en `src/index.css`
Reemplazar todo el contenido por la importación de Tailwind v4:
```css
@import "tailwindcss";
```

### 4. Limpieza y estilos con Tailwind
Eliminar `src/App.css` y quitar su importación en `src/App.tsx`. Estilizar con clases utilitarias:

```tsx
// import { BasicTypes } from './typescript/BasicTypes';
// import { ObjectLiterals } from './typescript/ObjectLiterals';
// import { BasicFunctions } from './typescript/BasicFunctions';

function App() {
  return (
    <div className="flex flex-col justify-center items-center h-svh">
      <h1 className="text-4xl mb-5">React + TS</h1>
      {/* <BasicTypes /> */}
      {/* <ObjectLiterals /> */}
      {/* <BasicFunctions /> */}
    </div>
  );
}

export default App
```

---

## Componentes y Estado: Contador

Crear `src/components/Counter.tsx`:

```tsx
import { useState } from 'react'

export const Counter = () => {
  const [count, setCount] = useState(10);

  const increaseBy = (value: number) => {
    setCount(count + value);
  };

  return (
    <>
      <h3 className="text-2xl">
        Contador: <small className="font-bold">{count}</small>
      </h3>

      <div>
        <button
          onClick={() => increaseBy(+1)}
          className="p-2 bg-blue-500 rounded-xl w-10 mx-2 text-white hover:bg-blue-700"
        >
          +1
        </button>
        <button
          onClick={() => increaseBy(-1)}
          className="p-2 bg-blue-500 rounded-xl w-10 mx-2 text-white hover:bg-blue-700"
        >
          -1
        </button>
      </div>
    </>
  );
};
```

Renderizar en `App.tsx`:
```tsx
import { Counter } from "./components/Counter";

function App() {
  return (
    <div className="flex flex-col justify-center items-center h-svh">
      <h1 className="text-4xl mb-5">React + TS</h1>
      {/* <BasicTypes /> */}
      {/* <ObjectLiterals /> */}
      {/* <BasicFunctions /> */}
      <Counter />
    </div>
  );
}

export default App
```

---

## Custom Hooks

Los Custom Hooks en React son funciones cuyo nombre inicia con `use` y sirven para extraer y reutilizar la lógica de los componentes (contadores, peticiones HTTP, formularios, autenticación, etc.).

### 1. Crear Hook `src/hooks/useCounter.tsx`
```tsx
import { useState } from 'react';

export const useCounter = () => {
  const [count, setCount] = useState<number>(10);

  const increaseBy = (value: number) => {
    // setCount(count + value);
    // setCount((current) => current + value);
    setCount(Math.max(value + count, 0));
  };

  return {
    // Properties
    count,

    // Actions
    increaseBy,
  };
};
```

### 2. Refactorizar `src/components/Counter.tsx`
```tsx
import { useCounter } from '../hooks/useCounter';

export const Counter = () => {
  const { count, increaseBy } = useCounter();

  return (
    <>
      <h3 className="text-2xl">
        Contador: <small className="font-bold">{count}</small>
      </h3>

      <div>
        <button
          onClick={() => increaseBy(+1)}
          className="p-2 bg-blue-500 rounded-xl w-10 mx-2 text-white hover:bg-blue-700"
        >
          +1
        </button>
        <button
          onClick={() => increaseBy(-1)}
          className="p-2 bg-blue-500 rounded-xl w-10 mx-2 text-white hover:bg-blue-700"
        >
          -1
        </button>
      </div>
    </>
  );
};
```

---

## Context API: Autenticación Global

El **Context API** permite compartir datos de manera global entre múltiples componentes sin necesidad de pasarlos manualmente vía *props* (*prop drilling*).

Crear `src/context/AuthContext.tsx`:

```tsx
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
      name: 'Fernando Herrera',
      email: email,
    });
    setStatus(AuthStatus.authenticated);
  };

  const logout = () => {
    setUser(undefined);
    setStatus(AuthStatus.unauthenticated);
  };

  return (
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
```

---

## Consumo de Servicios REST con REQRES y Axios

### 1. REQRES API
[ReqRes](https://reqres.in/) proporciona un backend mock para pruebas de peticiones HTTP:
* `GET`: Obtener usuarios o datos (ej. `https://reqres.in/api/users?page=2`).
* `POST`: Simular creación de recursos.
* `PUT / PATCH`: Actualización de datos.
* `DELETE`: Eliminación de datos.
* `Login / Register`: Pruebas de autenticación con respuesta de token.

### 2. Instalación de Axios
```bash
npm i axios
```

### 3. Variables de Entorno (`.env.local`)
Guardar la API Key de ReqRes en el archivo `.env.local`:
```env
VITE_REQRES_API_KEY=free_user_3G9B6asL6Z2ngylbaI2Muw3xxZa
```

---

## Formularios con React Hook Form

Librería para simplificar y optimizar la gestión de estado y validación en formularios de React.

### Instalación
```bash
npm install react-hook-form
```

Ejemplo de integración para formulario de login mostrando en consola el submit `{ email: 'susana@google.com', password: '******' }`.
