//Importamos las librerias necesarias
import { Hono, Context } from 'hono';
//Este modulo nos permitira borrar las cookies creadas
import { getCookie, deleteCookie } from 'hono/cookie'
//Importamos los modulos que hemos creado
import { usuarios, productos, favoritos, carrito }from '../controllers/ctrl_views.ts';
import { categorias } from "../controllers/ctrl_controllers.ts";
import { hasSession } from "../middlewares/general.ts";
//Inicializamos nuestro objeto de tipo Hono
const route: Hono = new Hono()
//Creamos y nombramos las rutas que se van a utilizar en el API
//como paremetros estos reciben un callback donde ponemos una función
//estas funciones son las que creamos en los controladores
route.get("/session", (c: Context): Response => {
    try {
        return c.json(JSON.parse(getCookie(c, "usuario_cookie") || "{}"))
    } catch (error) {
        console.log("error_ ", error);
        return c.json({ estatus: 0 })
    }
})
//Estas rutas cargaran una de las vistas del E-commerce
route.get("/", usuarios.inicio);

//Estas rutas traen información en un JSON
route.get("/productos", productos.todos); //Recolecta y envia los productos dependiendo de los filtros que este tenga en la ruta
route.get("/destacados", productos.destacados); //Trae los productos destacados del sitio (Los primeros 4)
route.get("/carrito", /*hasSession,*/ carrito.obtener);
route.get("/favoritos", hasSession, favoritos.getFavs); 
route.get("/categoria", categorias.getCategoria); //Trae una lista con todas las categorias que se tengan en base de datos
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
}) //Ruta para cerrar sesion
//exportamos las rutas que estamos creando
export default route