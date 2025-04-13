//Importamos las librerias necesarias
import { Hono, Context } from 'hono';
//Este modulo nos permitira borrar las cookies creadas
import { deleteCookie } from 'hono/cookie'
//Importamos los modulos que hemos creado
import { usuarios, productos }from '../controllers/ctrl_views.ts';
//Inicializamos nuestro objeto de tipo Hono
const route: Hono = new Hono()
//Creamos y nombramos las rutas que se van a utilizar en el API
//como paremetros estos reciben un callback donde ponemos una función
//estas funciones son las que creamos en los controladores
route.get("/", usuarios.inicio);
route.get("/user_exist", usuarios.existe);
route.get("/productos", productos.todos);
route.get("/detalle/:producto", productos.detalle);
route.get("/cerrar-sesion", (c: Context): Response => {
    try {
        deleteCookie(c, "usuario_cookie");
        return c.redirect("/");
    } catch (error) {
        console.log(error);
        return c.redirect("/");
    }
})
//exportamos las rutas que estamos creando
export default route