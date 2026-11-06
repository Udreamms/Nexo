import { env } from "./config/env";
import { createApp } from "./app";

createApp().listen(env.port, () => {
  console.log(`Backend de Nexo escuchando en http://localhost:${env.port}`);
});
