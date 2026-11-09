# Finanzas App

<Una frase: qué es la app y para qué sirve.>

🔗 **Demo:** https://finanzas-app-vert-beta.vercel.app

## Funcionalidades

- <Qué puede hacer un usuario, una por línea: registrar ingresos y gastos, ver el saldo...>

## Tecnologías

- Angular 22
- <El resto de lo que has usado: signals, Signal Forms, httpResource, etc.>

## Decisiones técnicas

- **<Decisión 1>:** <qué hiciste y por qué>.
- **<Decisión 2>:** <qué hiciste y por qué>.
- **<Decisión 3>:** <qué hiciste y por qué>.
- **Un bug que encontraron los tests:** <la historia de los ids con Date.now() y cómo lo resolviste>.

## Limitaciones conocidas

- **La sesión se pierde al recargar la página:** el login es simulado y el estado
  de sesión solo vive en memoria (un signal del servicio `Auth`). Al recargar,
  la sesión vuelve a estar cerrada y el guard de `/historial` redirige al login.
  Es intencionado: la app no tiene backend ni autenticación real, y el objetivo
  del login es mostrar el uso de guards funcionales.

## Ejecutar en local

npm install
ng serve
ng test