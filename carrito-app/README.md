# carrito-app

Reto "incorporar un carrito de compras". El proyecto parte de `navegacion-app`, conserva su navegación (drawer, tabs y stack) y le agrega un carrito.

## Cómo correrlo

```bash
pnpm install
pnpm start
```

Abre la app con Expo Go, un emulador o la tecla `w` para la versión web.

## Datos

No hay base de datos. El catálogo está en `src/store/products.json` y `src/store/products.store.ts` lo expone con el tipo `Product`.

El carrito vive en memoria, en un Context de React (`src/store/cart.store.tsx`). Se conserva al cambiar de pantalla y se vacía al cerrar la app.

## Análisis del proyecto original

- **Rutas**: Expo Router, una ruta por archivo dentro de `src/app/`. `src/app/index.tsx` redirige a `/home`.
- **Navegación**: un Drawer (`(drawer)/_layout.tsx`) contiene unas Tabs (`(tabs)/_layout.tsx`). La primera pestaña es un Stack (`(stack)/_layout.tsx`) con productos, detalle, perfil y ajustes. Usuario y Horario cuelgan del drawer.
- **Listado de productos**: `src/app/(drawer)/(tabs)/(stack)/products/index.tsx`.
- **Detalle**: cada producto del listado tiene un `Link` a `/products/[id]`. La pantalla lee el `id` con `useLocalSearchParams` y busca el producto en `products.store.ts`.
- **Reutilizable**: `CustomButton`, el header del Stack y `products.store.ts`.
- **Información compartida**: los productos agregados y su cantidad. El total y el conteo salen de ahí.

## Cambios para el carrito

Las rutas de pantallas son relativas a `src/app/(drawer)/(tabs)/`.

| Archivo | Cambio |
| --- | --- |
| `src/store/cart.store.tsx` | Nuevo. `CartProvider` y `useCart`: agregar, eliminar, conteo y total. |
| `src/app/_layout.tsx` | Envuelve la app con `CartProvider`. |
| `(stack)/cart/index.tsx` | Nueva pantalla Carrito: lista, botón Eliminar, total y aviso de carrito vacío. |
| `(stack)/_layout.tsx` | Registra `cart/index`, pone el ícono del carrito con el conteo en el header y arregla la flecha de regreso, que en el original no volvía atrás. |
| `(stack)/products/[id].tsx` | Botón "Agregar al carrito" con el producto seleccionado. |
| `home/index.tsx` | Botón "Carrito (N)". Abre el carrito con el listado debajo (`withAnchor`), así la flecha regresa a Productos. |
| `src/components/shared/CartButton.tsx` | Nuevo. Ícono del carrito para el header. |
| `src/helpers/format-price.ts` | Nuevo. Muestra los precios como `$45.000`. |

Si agregas el mismo producto dos veces, sube su cantidad. Eliminar quita la línea completa.

## Estilo

Blanco y negro con la fuente del sistema. Se quitaron las fuentes Work Sans y los colores de marca. También salieron los archivos y dependencias de la plantilla de Expo que no se usaban.

## Pruebas del reto

Probadas en la versión web:

1. Agregar un producto desde su detalle y ver en el carrito ese mismo producto.
2. Volver al listado, agregar otro producto y verlo en el carrito junto al primero.
3. Eliminar un producto y ver que desaparece.
4. Ver que el total cambia al agregar o eliminar.
5. Vaciar el carrito y ver el aviso "Tu carrito está vacío".
6. Pasar por el drawer, las pestañas y el stack sin perder el carrito.
