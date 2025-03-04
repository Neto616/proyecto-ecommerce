import { Hono, Context } from 'hono';
import {default as vista} from './routes/rt_views.ts';
import {default as controllers} from './routes/rt_controllers.ts'

const app = new Hono()

app.route("/", vista)
app.route("/", controllers)
app.get("/*", (c: Context):Response => c.json({ estatus: 0, result: {info: "La ruta no existe"}}))


Deno.serve({port: 3001}, app.fetch)
