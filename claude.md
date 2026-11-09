# Finanzas App

Aplicación de finanzas personales: registro de ingresos y gastos, saldo, historial
con buscador y conversión del saldo a dólares. Proyecto de portfolio de Angular moderno.

## Stack

- Angular 22: standalone, zoneless y OnPush por defecto.
- Salida estática (`outputMode: "static"`): páginas públicas pre-renderizadas y
  privadas en cliente (`RenderMode.Client` en `app.routes.server.ts`).
- Signal Forms (`@angular/forms/signals`).
- `httpResource` para peticiones HTTP; interceptores funcionales.
- Tests con Vitest y TestBed.
- Despliegue en Vercel (`dist/finanzas-app/browser`).

## Convenciones de código

### Estado
- Todo el estado se gestiona con `signal` y `computed`.
- Los `computed` son puros: solo leen y devuelven, nunca modifican nada.
- `effect` solo para efectos fuera de la plantilla (localStorage, logs).
- Arrays y objetos se actualizan de forma inmutable con `update`/`set` (spread, `filter`, `map`).

### Servicios
- Se declaran con `@Service()`.
- Inyección siempre con `inject()` en la inicialización de propiedades.
- Patrón de dos puertas: signal privado y escribible (`_movimientos`) y propiedad
  pública de solo lectura (`movimientos = this._movimientos.asReadonly()`).
  El estado solo se modifica a través de métodos públicos del servicio.
- Las APIs del navegador (localStorage, window) solo se usan tras comprobar
  `isPlatformBrowser(inject(PLATFORM_ID))`.

### Componentes
- Entradas y salidas con `input()` / `input.required()` y `output()`.
- Componentes de presentación sin servicios: reciben datos por input y avisan por output.
  Los componentes contenedores son los que inyectan servicios.
- Plantillas con `@if`, `@for` (con `track` por id) y `@switch`.
- Los signals se leen con `()`. Para que algo reaccione a un signal, se pasa el signal
  (sin paréntesis), no su valor.

### Routing y HTTP
- Rutas con lazy loading (`loadComponent`).
- Guards funcionales (`CanActivateFn`); para redirigir, devolver un `UrlTree`.
- Con `httpResource`, comprobar `hasValue()` antes de leer `value()` y gestionar
  los estados de carga y error.
- Interceptores funcionales (`HttpInterceptorFn`) registrados con `withInterceptors`.
  Los errores se relanzan con `throwError`.

### TypeScript
- Prohibido `any`.
- Tipo explícito cuando el valor inicial no lo deja claro: `signal<Movimiento[]>([])`.
- Union types para valores cerrados (`'ingreso' | 'gasto'`) y `Omit<>` para variantes de un tipo.
- `const` por defecto; `let` solo si se reasigna.
- Ids con `crypto.randomUUID()`.

### Tests
- Todo servicio y componente nuevo lleva su `.spec.ts`, con patrón AAA.
- Inputs con `fixture.componentRef.setInput()`; outputs con `vi.fn()` y `subscribe`.
- `localStorage.clear()` antes de inyectar servicios que lo leen.

### Nombres
- Código en español, coherente con el existente (movimientos, saldo…).
- Clases sin sufijo `Component` ni `Service` (convención de Angular 22).

## Qué NO hacer

- NgModules, `CommonModule` ni `standalone: true` explícito.
- `*ngIf`, `*ngFor`, `@Input`, `@Output` ni `EventEmitter`.
- Inyección por constructor.
- `subscribe` manual en componentes: usar signals, `toSignal` o `httpResource`.
- Depender de Zone.js o usar `ChangeDetectionStrategy.Eager`.
- Mutar arrays de un signal (`push`, `splice`).
- Añadir dependencias nuevas sin preguntar.
- Hacer cambios fuera del alcance de la tarea pedida.

## Forma de trabajar

- Antes de cambios que afecten a varios archivos, presentar un plan y esperar aprobación.
- Cambios pequeños y enfocados. Después de cada cambio, ejecutar `ng test --no-watch` y `ng build`.
- No hacer commits: los hace el usuario después de revisar.

## Comandos

- `ng serve`: servidor de desarrollo.
- `ng test`: tests en modo watch. `ng test --no-watch`: una sola ejecución.
- `ng test --include <ruta>`: tests de un solo archivo.
- `ng build`: compilación de producción.