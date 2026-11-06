# Nexo Salud

Plataforma para comparar y cotizar planes de Isapre. Monorepo TypeScript con npm workspaces.

## Estructura

| Carpeta | Responsabilidad |
| --- | --- |
| [`frontend/`](frontend) | Next.js 15 (App Router) + React 19. Páginas, componentes y estilos (CSS Modules). Organizado por *features*. |
| [`backend/`](backend) | API Express en capas: `routes → controllers → services → repositories`. Valida con Zod y persiste en Firestore. |
| [`functions/`](functions) | Cloud Functions de Firebase (triggers de Firestore y tareas programadas). |
| [`firebase/`](firebase) | Configuración de base de datos: `firebase.json`, reglas de Firestore/Storage e índices. |
| [`shared/`](shared) | Tipos y reglas de negocio puras (cálculo del 7%, factores de edad, ranking de planes) usadas por frontend y backend. |
| [`legacy/`](legacy) | Maquetas HTML originales, capturas y scripts. Solo referencia; no forman parte de la app. |

## Requisitos

- Node.js 20 o superior

## Primeros pasos

```bash
npm install
npm run dev            # frontend en http://localhost:3000
npm run dev:backend    # API en http://localhost:4000 (opcional)
```

El frontend reenvía `/api/*` al backend (`BACKEND_URL`). Copia los `.env.example` de `frontend/` y `backend/` a `.env.local` / `.env` para configurar.

## Scripts de la raíz

- `npm run dev`: compila `shared` y levanta Next en el puerto 3000.
- `npm run build`: compila todo en orden.
- `npm run typecheck`: verifica tipos en todos los paquetes.
- `npm test`: pruebas del dominio compartido.
- `npm run emulators`: emuladores de Firebase (Firestore 8080, Functions 5001, UI 4001).
- `npm run deploy:rules` / `npm run deploy:functions`: despliegue (requiere `firebase/.firebaserc`, ver `.firebaserc.example`).

## Convenciones

- La lógica de negocio vive en `shared/` y no depende de React ni de Express.
- Los componentes de UI no calculan: usan hooks de su feature (`useQuoteForm`) y funciones de `shared`.
- El backend nunca expone Firestore directamente al cliente: las reglas están cerradas y todo pasa por la API.
- `functions/` es independiente de `shared/` para simplificar el despliegue.
- Las UF y los planes de la muestra (`shared/src/constants.ts`) son datos de ejemplo; en producción vienen de Firestore (`plans/`, `config/uf`).
