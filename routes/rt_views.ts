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

//Estas rutas cargaran una de las vistas del E-commerce
route.get("/", usuarios.inicio);
route.get("/productos", productos.todos);

//Estas rutas traen información en un JSON
route.get("/user_exist", usuarios.existe); //Ruta que avisa si el usuario existe o no para saber donde redirigirlo
route.get("/detalle/:producto", productos.detalle); //Ruta que nos traera el JSON con el detalle del producto
route.get("/productos-favoritos", productos.favoritos); //Ruta que nos traera el JSON con los productos marcados como favoritos por el usuario
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