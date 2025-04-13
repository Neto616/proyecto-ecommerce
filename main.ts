// Importamos los modulos necesarios de la libreria que estamos usando
// Hono la clase que nos permitira crear todo lo necesario para poder crear nuestra API
// Context nos dara acceso a el response y la request de que le llegue a la API
import { Hono, Context } from 'hono';
// Importamos las rutas que generamos en otros archivos
import {default as vista} from './routes/rt_views.ts';
import {default as controllers} from './routes/rt_controllers.ts'

//Inicializamos nuestra clase Hono para acceder a los metodos
const app = new Hono()

//Creamos nuestras rutas y le decimos a que archivos permenecen las rutas que esten de manera interna
app.route("/", vista)
app.route("/", controllers)
//Creamos una ruta para cuando intenten ingresar a una ruta que no exista puedan ver una respuesta y no solo una pantalla de error
app.get("/*", (c: Context):Response => c.json({ estatus: 0, result: {info: "La ruta no existe"}}))
//Inicializamos el servidor dandole el puerto al que se tendra que enlazar y le diremos que es una API
Deno.serve({port: 3001}, app.fetch)
