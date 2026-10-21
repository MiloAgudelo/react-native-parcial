# Guía del Proyecto React + TypeScript

**React • TypeScript • Vite • Tailwind CSS**  
*Material organizado para lectura y estudio*

---

## Contenido

1. [¿Qué es este proyecto?](#1-qué-es-este-proyecto)
2. [Estructura general](#2-estructura-general)
3. [Carpetas y archivos de la raíz](#3-carpetas-y-archivos-de-la-raíz)
4. [Carpeta `src`](#4-carpeta-src)
5. [Carpeta `src/typescript`](#5-carpeta-srctypescript)
6. [Carpeta `src/components`](#6-carpeta-srccomponents)
7. [Carpeta `src/hooks`](#7-carpeta-srchooks)
8. [Carpeta `src/actions`](#8-carpeta-srcactions)
9. [Carpeta `src/interfaces`](#9-carpeta-srcinterfaces)
10. [Carpeta `src/context`](#10-carpeta-srccontext)
11. [Carpeta `src/assets`](#11-carpeta-srcassets)
12. [Cómo instalar y ejecutar](#12-cómo-instalar-y-ejecutar)
13. [Variable de entorno para ReqRes](#13-variable-de-entorno-para-reqres)
14. [Cómo probar cada ejemplo](#14-cómo-probar-cada-ejemplo)
15. [Flujo resumido de la aplicación](#15-flujo-resumido-de-la-aplicación)

---

## 1. ¿Qué es este proyecto?

Este proyecto es una aplicación web construida con **React**, **TypeScript**, **Vite** y **Tailwind CSS**. La carpeta `01-base` usa elementos HTML estándar (`div`, `form`, `table`, `button`) y `react-dom`, por lo que corresponde a una aplicación React para navegador y no a una aplicación React Native móvil.

El proyecto sirve como base y como material didáctico. Contiene ejemplos de:
* Tipos básicos y funciones en TypeScript.
* Objetos tipados mediante interfaces.
* Componentes funcionales de React.
* Estado local con `useState`.
* Hooks personalizados (*Custom Hooks*).
* Formularios con `react-hook-form`.
* Contexto global para una autenticación simulada (Context API).
* Peticiones HTTP con Axios a la API de ReqRes.
* Paginación de usuarios.

> **Nota:** La pantalla que se muestra actualmente al abrir la aplicación es `FormsPage`. Las otras pantallas están preparadas, pero sus importaciones y etiquetas JSX están comentadas en `src/App.tsx`.

---

## 2. Estructura general

```text
01-base/
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── public/
├── src/
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── vite-env.d.ts
│   ├── actions/
│   │   └── load-users.action.ts
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components/
│   │   ├── Counter.tsx
│   │   ├── FormsPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── UserRow.tsx
│   │   └── UsersPage.tsx
│   ├── context/
│   │   ├── auth.context.ts
│   │   ├── auth.types.ts
│   │   ├── AuthContext.tsx
│   │   └── useAuthContext.ts
│   ├── hooks/
│   │   ├── useCounter.tsx
│   │   └── useUsers.tsx
│   ├── interfaces/
│   │   └── reqres.response.ts
│   └── typescript/
│       ├── BasicFunctions.tsx
│       ├── BasicTypes.tsx
│       └── ObjectLiterals.tsx
```

---

## 3. Carpetas y archivos de la raíz

### `package.json`
Es el manifiesto del proyecto. Define:
* El nombre, versión y tipo de módulos del proyecto.
* Los comandos disponibles: `npm run dev`, `npm run build`, `npm run lint` y `npm run preview`.
* Las dependencias de ejecución: React, React DOM, Axios, React Hook Form y Tailwind CSS.
* Las dependencias de desarrollo: Vite, TypeScript, ESLint y los plugins de React.

### `package-lock.json`
Bloquea las versiones exactas de las dependencias instaladas. Permite que otra persona instale versiones idénticas y obtenga un resultado reproducible usando `npm install`.

### `index.html`
Es la página HTML inicial que carga el navegador. El elemento esencial es:
```html
<div id="root"></div>
```
React busca ese elemento en `src/main.tsx` y monta allí toda la aplicación. También enlaza `src/main.tsx` como módulo y define el título de la pestaña.

### `vite.config.ts`
Configura Vite y sus plugins:
* `@vitejs/plugin-react`: procesa JSX/TSX y habilita React.
* `reactCompilerPreset`: habilita el compilador de React.
* `@rolldown/plugin-babel`: integra la transformación de Babel.
* `@tailwindcss/vite`: integra Tailwind CSS con Vite.

### `tsconfig.json`
Es la configuración principal de TypeScript. No compila directamente archivos, sino que referencia las configuraciones específicas de la aplicación y de Vite.

### `tsconfig.app.json`
Configura TypeScript para el código de `src/`. Incluye las bibliotecas del navegador, JSX con la transformación moderna de React, resolución de módulos para empaquetadores y reglas como `noUnusedLocals` y `noUnusedParameters`.

### `tsconfig.node.json`
Configura TypeScript para los archivos de configuración ejecutados por Node/Vite (actualmente `vite.config.ts`).

### `eslint.config.js`
Define las reglas de calidad del código. Usa las configuraciones recomendadas de JavaScript, TypeScript, hooks de React y React Refresh. Además, ignora la carpeta `dist/`.

### `README.md`
README generado por la plantilla de Vite que explica la configuración básica de React + TypeScript, React Compiler y extensiones de ESLint.

### `public/`
Carpeta para archivos estáticos que Vite sirve directamente sin procesamiento adicional.

---

## 4. Carpeta `src`

Contiene todo el código fuente de la aplicación.

### `src/main.tsx`
Es el punto de entrada de la aplicación React. Importa los estilos globales, la aplicación y monta la raíz mediante `createRoot`.  
Envuelve el árbol de componentes en:
* `StrictMode`: para advertencias y buenas prácticas en desarrollo.
* `AuthProvider`: provee el estado global de autenticación a toda la jerarquía de componentes.

```tsx
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
```

### `src/App.tsx`
Componente raíz de la interfaz. Actualmente muestra el título y `FormsPage`. Los demás componentes están listos para activarse descomentándolos:

```tsx
// <BasicTypes />
// <ObjectLiterals />
// <BasicFunctions />
// <Counter />
// <LoginPage />
// <UsersPage />
<FormsPage />
```

### `src/index.css`
Importación global de Tailwind CSS:
```css
@import "tailwindcss";
```

### `src/vite-env.d.ts`
Tipado para variables de entorno de Vite:
```ts
interface ImportMetaEnv {
  readonly VITE_REQRES_API_KEY: string;
}
```

---

## 5. Carpeta `src/typescript`

Módulos de aprendizaje de TypeScript en React.

### `BasicTypes.tsx`
Muestra tipado primitivo y arreglos:
```tsx
const name: string = 'susana';
const age: number = 39;
const isActive: boolean = false;
const powers: string[] = ['React', 'ReactNative', 'Astro'];
```

### `BasicFunctions.tsx`
Muestra funciones con argumentos y valor de retorno tipados:
```tsx
const addTwoNumbers = (a: number, b: number): string => {
  return `${a + b}`;
};
```

### `ObjectLiterals.tsx`
Muestra modelado de datos anidados e interfaces con campos opcionales (`?`):
```tsx
interface Address {
  country: string;
  houseNo: string;
  street?: string;
}

interface Person {
  age: number;
  firstName: string;
  lastName: string;
  address: Address;
}
```
Se visualiza en pantalla con `<pre>{JSON.stringify(person, null, 2)}</pre>`.

---

## 6. Carpeta `src/components`

Componentes funcionales de interfaz.

### `FormsPage.tsx`
Gestión de formularios con `react-hook-form`:
```tsx
type FormInputs = {
  email: string;
  password: string;
};

const { register, handleSubmit } = useForm<FormInputs>({
  defaultValues: {
    email: 'susana@google.com',
    password: '123456',
  },
});
```

### `Counter.tsx`
Contador desacoplado conectado a `useCounter`:
```tsx
const { count, increaseBy } = useCounter();
<button onClick={() => increaseBy(+1)}>+1</button>
<button onClick={() => increaseBy(-1)}>-1</button>
```

### `LoginPage.tsx`
Control de sesión simulada mediante `useAuthContext`:
* Mientras `isChecking` sea verdadero, muestra el mensaje *"Verificando usuario"*.
* Si está autenticado, muestra los datos del usuario y el botón de salida (*logout*).
* Si no está autenticado, presenta el botón de ingreso (*login*).

### `UserRow.tsx`
Fila atómica para renderizar usuarios en tabla:
```tsx
interface Props {
  user: User;
}

export const UserRow = ({ user }: Props) => {
  return (
    <tr>
      <td><img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} /></td>
      <td>{user.first_name} {user.last_name}</td>
      <td>{user.email}</td>
    </tr>
  );
};
```

### `UsersPage.tsx`
Tabla de usuarios paginada que utiliza el hook `useUsers` y delega la renderización a `UserRow`:
```tsx
{users.map((user) => (
  <UserRow key={user.id} user={user} />
))}
```

---

## 7. Carpeta `src/hooks`

Hooks personalizados con lógica desacoplada.

### `useCounter.tsx`
Encapsula el estado de conteo impidiendo valores negativos mediante `Math.max`:
```tsx
const [count, setCount] = useState<number>(10);

const increaseBy = (value: number) => {
  setCount(Math.max(value + count, 0));
};
```

### `useUsers.tsx`
Maneja la carga asíncrona y paginación:
1. `useState<User[]>([])`: almacena la colección de usuarios.
2. `useRef(1)`: mantiene la página actual sin disparar re-renderizados innecesarios.
3. `useEffect`: ejecuta la carga inicial en el montaje.
4. `nextPage` y `prevPage`: controlan la navegación hacia adelante y atrás.

---

## 8. Carpeta `src/actions`

Aislamiento de llamadas externas y servicios de red.

### `load-users.action.ts`
Consulta la API REST de ReqRes con Axios:
```ts
const { data } = await axios.get<UserListResponse>(reqresApiUrl, {
  params: { page },
  headers: reqresHeaders,
});
return data.data;
```
*Si la petición falla o no se cuenta con la API Key, captura el error y retorna un arreglo vacío `[]` para proteger la estabilidad de la UI.*

---

## 9. Carpeta `src/interfaces`

Contratos y tipado de datos de APIs externas.

### `reqres.response.ts`
Define las interfaces `UserListResponse`, `User` y `Support`:
```ts
export interface UserListResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
  support: Support;
}
```

---

## 10. Carpeta `src/context`

Gestión de estado global con Context API.

### `auth.types.ts`
Define las constantes y tipos de estado:
```ts
export const AuthStatus = {
  checking: 'checking',
  authenticated: 'authenticated',
  unauthenticated: 'unauthenticated',
} as const;
```

### `auth.context.ts`
Instanciación del contexto con TypeScript:
```ts
export const AuthContext = createContext({} as AuthState);
```

### `AuthContext.tsx`
Proveedor de contexto (`AuthProvider`) que maneja las sesiones y temporizadores simulados.

### `useAuthContext.ts`
Hook utilitario de acceso rápido:
```ts
export const useAuthContext = () => useContext(AuthContext);
```

---

## 11. Carpeta `src/assets`

Recursos estáticos:
* `hero.png`: imagen gráfica local.
* `react.svg`: icono vectorial oficial de React.
* `vite.svg`: logotipo vectorial de Vite.

---

## 12. Cómo instalar y ejecutar

### Requisitos
* Node.js (versión LTS recomendada).
* Gestor de paquetes `npm`.
* Navegador moderno.
* Conexión a internet para el consumo de ReqRes.

### Comandos de ejecución
```bash
# Instalación de dependencias
npm install

# Servidor de desarrollo
npm run dev

# Verificación de tipos y build de producción
npm run build

# Análisis de linter y estilos
npm run lint

# Previsualización del build local
npm run preview
```

---

## 13. Variable de entorno para ReqRes

Crear el archivo `.env.local` en la raíz del proyecto (`01-base`):
```env
VITE_REQRES_API_KEY=tu_clave_de_reqres
```
> *Nota:* Toda variable que deba ser visible por el cliente en Vite debe llevar el prefijo `VITE_`. Tras modificarlo, reiniciar el servidor de desarrollo.

---

## 14. Cómo probar cada ejemplo

1. Abrir el archivo `src/App.tsx`.
2. Descomentar la importación del ejemplo deseado:
   ```tsx
   import { BasicTypes } from './typescript/BasicTypes';
   import { BasicFunctions } from './typescript/BasicFunctions';
   import { ObjectLiterals } from './typescript/ObjectLiterals';
   import { Counter } from './components/Counter';
   import { LoginPage } from './components/LoginPage';
   import { UsersPage } from './components/UsersPage';
   ```
3. Descomentar el componente dentro del bloque de retorno JSX.
4. Comentar `<FormsPage />` para visualizar únicamente el componente seleccionado.
5. Guardar y verificar en el navegador.

---

## 15. Flujo resumido de la aplicación

```text
index.html
    │
    ▼
src/main.tsx
    │
    ├─► AuthProvider (Estado global de sesión)
    │        │
    │        ▼
    └────► App.tsx
              │
              ├─► FormsPage (Activo por defecto)
              ├─► Counter (Usa useCounter)
              ├─► LoginPage (Usa AuthContext)
              ├─► UsersPage (Usa useUsers y ReqRes)
              └─► Ejemplos TypeScript (BasicTypes, BasicFunctions, ObjectLiterals)
```
