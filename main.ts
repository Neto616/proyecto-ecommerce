import { Hono, Context } from 'https://deno.land/x/hono@v4.1.6/mod.ts';
import { cors } from "https://deno.land/x/hono@v4.1.6/middleware.ts"
// Importamos las rutas
import { default as vista } from './routes/rt_views.ts';
import { default as controllers } from './routes/rt_controllers.ts';
import { serveStatic } from "https://deno.land/x/hono@v4.1.6/middleware.ts";
const app = new Hono();

app.use(cors());

// Definimos las rutas
app.route('/api/', vista);
app.route('/api/', controllers);
app.use("/images/*", serveStatic({ root: "./images", rewriteRequestPath: (path) => path.replace("/images", "") }));
app.use(
  '*', // Aplica este middleware a todas las rutas
  serveStatic({
    root: "./app/build", // La raíz donde está tu app de React compilada
    rewriteRequestPath: (path) => {
        if (path.includes('.')) {
            return path;
        }
        return '/index.html';
    },
  })
);

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