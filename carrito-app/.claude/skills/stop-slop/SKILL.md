---
name: stop-slop
description: Escribir o revisar cualquier texto que vaya a leer una persona (cuerpo de PR, README, documentación, mensajes de usuario, correos) sin patrones de redacción de IA. Usar al redactar de cero y al editar; también cuando se mencione slop, relleno o "suena a IA".
---

# Stop Slop (adaptación para este proyecto)

Skill original en inglés, conservada íntegra abajo con sus referencias. Para este proyecto
cambian tres cosas:

- **Se aplica también al escribir de cero**, no solo al editar: cuerpos de PR, README y
  textos que ve el usuario en las pantallas de `src/app/`. Antes de entregar cualquiera de esos
  textos, repásalo con las reglas de `references/`.
- **El texto de salida va en español** (documentación, commits y textos de la app). Las
  listas de frases de `references/phrases.md` están en inglés; aplica el patrón, no la frase
  literal: "Aquí está la cosa:", "La verdad es que", "No es X, es Y", "Esto importa porque",
  adverbios de relleno ("realmente", "simplemente", "básicamente"), listas de tres por inercia,
  rayas largas (em dashes) y metacomentario ("en esta sección veremos").
- **El changelog solo cuando editas** un texto ajeno. Al escribir de cero entrega el texto y nada
  más.

Sin em dashes en textos de cara al usuario.

---
# Stop Slop

Edit existing prose to remove predictable AI writing patterns. Return the revised text with a brief summary of what changed.

## What This Skill Does

Takes a user's draft and applies the rules in the reference files to produce cleaner, more direct prose. The output is always:
1. The revised text
2. A short changelog (bullet list, plain language, no more than 8 items)

## Process

### Step 1: Read the reference files

Before editing, read all three:
- `references/phrases.md` — phrases and adverbs to cut or replace
- `references/structures.md` — structural patterns to break
- `references/examples.md` — before/after pairs to calibrate judgment

### Step 2: Edit the draft

Work through the text top to bottom. Apply every rule. Do not skip patterns because they feel minor. Common fixes ranked by frequency:

1. Cut throat-clearing openers ("Here's the thing:", "It turns out", "The truth is")
2. Kill all adverbs (-ly words, "really", "just", "actually", "genuinely", etc.)
3. Rewrite binary contrasts ("Not X. Y." → state Y directly)
4. Replace passive voice (find the actor, put them at the front)
5. Name the human behind false agency ("the data tells us" → "the analysis shows" or name who drew the conclusion)
6. Remove vague declaratives ("The implications are significant" → name the specific implication or cut)
7. Break formulaic structures (negative listings, dramatic fragmentation, rhetorical setups)
8. Replace business jargon (navigate → handle, landscape → situation, lean into → accept)
9. Cut meta-commentary ("Let me walk you through", "As we'll see", "In this section")
10. Fix sentence starters (restructure Wh- openers; cut "So," paragraph starters; remove "Look,")
11. Remove em dashes — replace with commas or periods
12. Trim three-item lists to two where possible

When in doubt about whether to cut something: cut it.

### Step 3: Write the changelog

After the revised text, write a brief changelog. Format:

---
**What changed:**
- [Pattern removed or fixed] — [one-line explanation]
- ...

Keep it under 8 bullets. Group similar changes. No need to cite every instance, just the pattern types that appeared.

## Output Format

```
[Revised text, clean, no annotations inline]

---
**What changed:**
- ...
```

Do not add any preamble before the revised text. Do not explain what you are about to do. Start with the edited prose.
