//Importamos las paqueterias necesarias
import { Hono } from "hono";
import usuarios_abc from "../controllers/ctrl_controllers.ts";
//Inicializamos nuestro objeto Hono
const route: Hono= new Hono()
//Creamos y nombramos las rutas que se van a utilizar en el API
//como paremetros estos reciben un callback donde ponemos una función
//estas funciones son las que creamos en los controladores
route.post("/crear-usuario", usuarios_abc.crear);
route.post("/iniciar-sesion", usuarios_abc.iniciar_sesion);
route.delete("/eliminar-usuario", usuarios_abc.eliminar);
//exportamos las rutas que estamos creando
export default route