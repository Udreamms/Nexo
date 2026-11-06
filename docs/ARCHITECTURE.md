# Arquitectura

## Principios

1. **Una sola API para todos los clientes.** Web, Android e iOS llaman a `/api/v1` del backend. Ningún cliente accede a Firestore directamente (las reglas están cerradas).
2. **Reglas de negocio en un solo lugar.** El cálculo del 7%, los factores de edad y el ranking viven en `shared/` y no dependen de React, Express ni React Native.
3. **API versionada.** Las apps publicadas en tiendas tardan en actualizarse: `/v1` debe seguir funcionando cuando exista `/v2`.
4. **Capas en el backend:** `routes → controllers → services → repositories`. Solo los repositorios conocen Firestore.

## Dependencias entre carpetas

```
shared  ◀── api-client ◀── android, ios
   ▲                         
   ├──────────────────────── web, backend
functions (independiente: se despliega con Firebase)
```

`functions/` no depende de `shared/` a propósito, para que el despliegue de Firebase sea simple.

## Seguridad del backend

| Medida | Dónde |
| --- | --- |
| Cabeceras de seguridad (`helmet`), sin `x-powered-by` | `backend/src/middleware/security.ts` |
| CORS con lista blanca (`CORS_ORIGINS`); las apps móviles no envían `Origin` | `security.ts` |
| Rate limit por IP: 120/min general, 10/min en `POST /leads` | `security.ts` |
| Validación estricta de entrada con Zod; límite de cuerpo de 20 KB | `schemas/`, `app.ts` |
| Errores sin detalles internos (500 genérico) | `middleware/http.ts` |
| Autenticación: Firebase ID token (`Authorization: Bearer`) | `middleware/auth.ts` |
| Autorización por rol (custom claim `role`), p. ej. `GET /leads` solo para `agent` | `middleware/auth.ts`, `routes/` |
| Credenciales solo por variables de entorno (`FIREBASE_SERVICE_ACCOUNT`) | `config/env.ts`, `lib/firebase.ts` |
| Firestore y Storage cerrados por defecto | `firebase/*.rules` |

### Limitaciones conocidas

- El rate limit usa memoria por instancia. En serverless cada instancia cuenta por separado: para producción conviene un almacén compartido (Upstash/Redis) o el firewall de Vercel.
- Los endpoints públicos (`/quote`, `/leads`) podrían abusarse desde scripts. Considera Firebase App Check o un captcha antes de lanzar.
- Los roles (`agent`) se asignan con custom claims desde un script de administración que aún no existe.
- El valor de la UF y los planes son datos de ejemplo en `shared/src/constants.ts`.

## Endpoints

| Método | Ruta | Acceso |
| --- | --- | --- |
| GET | `/api/v1/health` | público |
| POST | `/api/v1/quote` | público, limitado |
| POST | `/api/v1/leads` | público, limitado estricto |
| GET | `/api/v1/leads` | rol `agent` |
