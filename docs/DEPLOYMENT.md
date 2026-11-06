# Despliegue

Un mismo repositorio, varios destinos. En Vercel se crean **dos proyectos** conectados al mismo repo de GitHub.

## 1. Backend en Vercel (proyecto `nexo-api`)

- **Root Directory:** `backend`
- Activa «Include source files outside of the Root Directory in the Build Step» (los workspaces `shared/` y `api-client/` están fuera).
- `backend/vercel.json` ya define install/build y reenvía todo a `api/index.ts`.
- **Variables de entorno:**
  - `NODE_ENV=production`
  - `CORS_ORIGINS=https://<dominio-de-la-web>`
  - `FIREBASE_PROJECT_ID=<tu proyecto>`
  - `FIREBASE_SERVICE_ACCOUNT=<JSON completo de la cuenta de servicio>`

## 2. Web en Vercel (proyecto `nexo-web`)

- **Root Directory:** `web`, con la misma opción de incluir archivos fuera del directorio raíz.
- `web/vercel.json` define install/build.
- **Variable:** `BACKEND_URL=https://<dominio-del-backend>`.

## 3. Firebase (reglas, índices y functions)

```bash
cp firebase/.firebaserc.example firebase/.firebaserc   # edita el ID del proyecto
npm run deploy:rules
npm run deploy:functions
```

## 4. Apps móviles

Ambas usan Expo (React Native). Para generar los binarios de las tiendas se usa EAS Build:

```bash
npm install -g eas-cli
cd android && eas build --platform android    # genera .aab para Google Play
cd ios && eas build --platform ios            # genera .ipa para App Store
```

- Configura `EXPO_PUBLIC_API_URL` con la URL pública de la API (`https://<backend>/api/v1`).
- Identificadores: `cl.nexo.salud` (Android `package` e iOS `bundleIdentifier`). Cámbialos antes de publicar si no te corresponden.
- Requiere cuentas de Apple Developer (de pago anual) y Google Play Console (pago único). Verifica los precios vigentes.

## Estado de verificación

Verificado localmente (typecheck, pruebas, build de producción y arranque de servidores). **No** se ha desplegado en Vercel, Firebase ni las tiendas: eso requiere tus cuentas y credenciales.
