import { Hono, Context } from 'https://deno.land/x/hono@v4.1.6/mod.ts';
import { cors } from "https://deno.land/x/hono@v4.1.6/middleware.ts"
// Importamos las rutas
import { default as vista } from './routes/rt_views.ts';
import { default as controllers } from './routes/rt_controllers.ts';
import { serveStatic } from "https://deno.land/x/hono@v4.1.6/middleware.ts";
const app = new Hono();

app.use(cors());
app.use("*", serveStatic({ root: "./images" }));

// Definimos las rutas
app.route('/', vista);
app.route('/', controllers);

// Ruta para recursos no encontrados
app.get('/*', (c: Context): Response => {
  return c.json({
    estatus: 0,
    result: { info: 'La ruta no existe' },
  });
});


// Iniciamos el servidor
const port = 3001;
console.log(`Servidor escuchando en http://localhost:${port}`);
Deno.serve({ port }, app.fetch);