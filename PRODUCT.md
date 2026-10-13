# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Una sola persona (el dueño del programa), que usa el CMS tanto desde el celular (entre series, en el gimnasio) como desde el computador (planificando). Trabaja y estudia, hace sesiones de 60–90 min y quiere ajustar su programa sin tocar código.

## Product Purpose
"Bitácora de Hierro" es un programa de recomposición corporal (torso/pierna a doble frecuencia) publicado como una página. El CMS en /admin permite editar en MongoDB lo que esa página muestra: ejercicios, rutinas, el orden de la semana y los textos. Éxito: cambiar un peso, un descanso o mover un día toma segundos y se ve de inmediato en la página pública.

## Positioning
No es un CMS genérico: está hecho a la medida de un único programa de entrenamiento, con sus entidades reales (rutinas, ejercicios, semana) y sin conceptos de más.

## Operating Context
- Stack ya definido: Next.js (App Router), MongoDB (`routines`, `week`, `content`), Tailwind 4, fuentes Inter y Oswald.
- Acceso protegido por una contraseña única en `.env` (`ADMIN_PASSWORD`) con cookie de sesión firmada.
- Los datos originales viven en `app/config/*` y se pueden restaurar con el seed.

## Capabilities and Constraints
- Editar: ejercicios (nombre, series, reps, descanso, nota), rutinas completas (nombre, etiqueta, color, intro, encabezados), orden y contenido de la semana, textos de la página (reglas, límites, calentamiento, movilidad/natación) y restaurar los datos originales.
- Las rutinas `mobility` y `pool` alimentan tarjetas fijas de la página pública; no se pueden eliminar.
- Una rutina no se puede eliminar mientras esté asignada a un día de la semana.
- Terminología: Pierna/Torso, Series, Reps, Desc. (descanso), Nota, Franja (Mañana/Tarde), Foco.

## Brand Commitments
Nombre "Bitácora de Hierro", idioma español, paleta y tipografía de la página pública (Inter + Oswald; ember/moss/sky para etiquetas).

## Evidence on Hand
Datos reales del programa en `app/config/routine/*` y `app/config/week.ts`. No hay usuarios múltiples ni roles.

## Product Principles
- Rápido sobre completo: lo que se cambia a diario (series, reps, descanso, día) debe estar a un toque.
- Nada se pierde en silencio: cambios sin guardar visibles, acciones destructivas explícitas.
- La página pública es la fuente de verdad visual: el CMS usa su mismo vocabulario.
- Funciona igual de bien con el pulgar que con el teclado.

## Accessibility & Inclusion
Objetivos táctiles de al menos 44px, contraste AA, navegación completa por teclado, modo claro/oscuro según el sistema.
