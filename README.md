# Nexo Salud

Plataforma para comparar y cotizar planes de Isapre. Monorepo TypeScript con npm workspaces: una API central que usan la web, la app Android y la app iOS.

```
 web (Next.js) ──┐
 android (Expo) ─┼──▶ backend (API /api/v1) ──▶ Firestore
 ios (Expo) ─────┘            ▲
                              └── functions (Cloud Functions, triggers y tareas)
```

## Estructura

| Carpeta | Responsabilidad | Se despliega en |
| --- | --- | --- |
| [`web/`](web) | Sitio y plataforma web: Next.js 15 + React 19, organizado por *features*. | Vercel (proyecto 1) |
| [`backend/`](backend) | API Express versionada (`/api/v1`): helmet, CORS con lista blanca, rate limit, validación Zod, auth con Firebase ID tokens. | Vercel (proyecto 2) |
| [`android/`](android) | App Android (React Native + Expo, TypeScript). | Google Play |
| [`ios/`](ios) | App iOS (React Native + Expo, TypeScript). | App Store |
| [`api-client/`](api-client) | Cliente tipado de la API, compartido por web y apps. | (librería) |
| [`shared/`](shared) | Tipos y reglas de negocio puras (7%, factores de edad, ranking). | (librería) |
| [`functions/`](functions) | Cloud Functions de Firebase. | Firebase |
| [`firebase/`](firebase) | Reglas de Firestore/Storage, índices y emuladores. | Firebase |
| [`docs/`](docs) | Arquitectura, seguridad y despliegue. | |
| [`legacy/`](legacy) | Maquetas HTML originales (solo referencia). | |

## Requisitos

Node.js 20 o superior.

## Primeros pasos

```bash
npm install
npm run dev            # web en http://localhost:3000
npm run dev:backend    # API en http://localhost:4000
npm run dev:android    # app Android con Expo (requiere Android Studio o un dispositivo)
npm run dev:ios        # app iOS con Expo (requiere macOS con Xcode o Expo Go)
```

Copia cada `.env.example` a `.env.local` (web) o `.env` (backend, android, ios).

## Verificación

```bash
npm run check          # typecheck + pruebas + build de todo
```

| Script | Qué hace |
| --- | --- |
| `npm run typecheck` | Verifica tipos en todos los paquetes (incluidas las apps móviles). |
| `npm test` | Pruebas de `shared`, `api-client` y de la API (seguridad, validación, CORS, rate limit, auth). |
| `npm run build` | Compila librerías, web, backend y functions. |
| `npm run emulators` | Emuladores de Firebase (Firestore 8080, Functions 5001, UI 4001). |

## Más información

- [Arquitectura y seguridad](docs/ARCHITECTURE.md)
- [Despliegue (Vercel, Firebase y tiendas)](docs/DEPLOYMENT.md)
