//Importamos las paqueterias necesarias
import { Hono } from "hono";
import { favorites_abc, usuarios_abc, carritos_abc } from "../controllers/ctrl_controllers.ts";
import { hasSession, isCorreo } from "../middlewares/general.ts";
import { hasEmptys as crearHasEmpty, passwordsEquals } from "../middlewares/usuarios/crearMdw.ts";
import { hasEmptys as loginHasEmpty } from "../middlewares/usuarios/loginMdw.ts";
//Inicializamos nuestro objeto Hono
const route: Hono= new Hono()
//Creamos y nombramos las rutas que se van a utilizar en el API
//como paremetros estos reciben un callback donde ponemos una función
//estas funciones son las que creamos en los controladores

//Rutas que tengan que ver con los usuarios
route.post("/crear-usuario", crearHasEmpty, isCorreo, passwordsEquals, usuarios_abc.crear);
route.post("/iniciar-sesion", loginHasEmpty, isCorreo, usuarios_abc.iniciar_sesion);
route.delete("/eliminar-usuario", usuarios_abc.eliminar);

//Rutas que tengan que ver con las acciones para los productos favoritos
route.post("/add_fav", hasSession, favorites_abc.decideAction); //Ruta para marcar un producto comno favorito o no

//Rutas que tengan que ver con las acciones para poder realizar con el carrito
route.post("/carrito", /*hasSession,*/ carritos_abc.guardar);
route.put("/carrito")
route.delete("/carrito")

//exportamos las rutas que estamos creando
export default route