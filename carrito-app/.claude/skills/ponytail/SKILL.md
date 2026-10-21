---
name: ponytail
description: Simplificar la solución al escribir, corregir o revisar código de este proyecto. Usar también cuando se pida Ponytail, YAGNI o reducir complejidad. Admite lite, full y ultra.
license: MIT
---

# Ponytail

Adaptación de la skill Ponytail para este proyecto Expo.
Busca la solución más simple que cumpla el comportamiento solicitado.

## Método

1. Lee el flujo afectado y sus consumidores antes de elegir la solución.
2. Reutiliza código y patrones existentes; luego considera biblioteca estándar,
   capacidades nativas y dependencias ya instaladas.
3. Añade código o dependencias solo cuando lo anterior no resuelva el requisito.
4. Corrige la causa compartida del fallo, comprobando los consumidores afectados.
5. Elimina complejidad innecesaria: wrappers sin responsabilidad, configuración
   especulativa, duplicación y abstracciones con un solo caso sin beneficio concreto.
6. Verifica el comportamiento con la infraestructura existente: `npx tsc --noEmit` y la app
   en ejecución. No inventes otro sistema de pruebas.

## Intensidad

- **lite**: cumple lo pedido y señala una alternativa más simple si resulta relevante.
- **full** (por defecto): aplica el método y entrega el menor cambio claro que resuelva la tarea.
- **ultra**: busca eliminar conceptos o capas completas dentro del alcance autorizado.

La intensidad rige la tarea actual salvo que el usuario solicite mantenerla.
No sacrifiques legibilidad por contar líneas ni introduzcas abstracciones solo para
reducir el tamaño de un archivo.

## Límites y entrega

Conserva validaciones, seguridad, accesibilidad, integridad de datos y requisitos explícitos.
No reduzcas unilateralmente el alcance pedido. Revisa sin editar si el usuario pidió revisión.
Comenta solo lo que el código no explica solo; no impongas etiquetas de Ponytail.

Explica el resultado, las comprobaciones y cualquier límite real de la simplificación.
Si se pidió un análisis detallado, entrégalo. No impongas límites artificiales de respuesta.
