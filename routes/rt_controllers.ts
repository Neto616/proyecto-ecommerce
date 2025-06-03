//Importamos las paqueterias necesarias
import { Hono } from "hono";
import { favorites_abc, usuarios_abc, carritos_abc, pedidos_abc } from "../controllers/ctrl_controllers.ts";
import { hasSession, isCorreo } from "../middlewares/general.ts";
import { hasEmptys as crearHasEmpty, passwordsEquals } from "../middlewares/usuarios/crearMdw.ts";
import { hasEmptys as loginHasEmpty } from "../middlewares/usuarios/loginMdw.ts";
//Inicializamos nuestro objeto Hono
const route: Hono= new Hono()
//Creamos y nombramos las rutas que se van a utilizar en el API
//como paremetros estos reciben un callback donde ponemos una función
//estas funciones son las que creamos en los controladores

//Rutas que tengan que ver con los usuarios
route.post("/crear-usuario", crearHasEmpty, isCorreo, passwordsEquals, usuarios_abc.crear); //Ruta para crear usuarios que hace uso de 3 Middlewares
//El primero verifica sus campos para que no esten vacios en caso de estar vacio hace un retorno temprano y no entra a la función principal
//El segundo verifica que el correo tenga cuerpo de un correo en caso de no cumplir con esto realiza un retorno temprano y no entra a la función principal
//El tercero verifica que las dos contraseñas sean identicas en caso de no cumplir con esto realiza un retorno temprano y no entra a la función principal
route.post("/iniciar-sesion", loginHasEmpty, isCorreo, usuarios_abc.iniciar_sesion); //Ruta para iniciar sesión hace uso uso de 2 Middlewares
//El primero verifica que no tenga ningun campo vacio en caso de tener un vacio retorna de manera temprana y no entra a la función principal
//El segundo verifica si el correo que recibe si tenga el formato de un correo en caso de no cumplir el formato retorna de manera temprana y no entra a la función principal
route.put("/actualizar-usuario", hasSession, usuarios_abc.actualizar); // Ruta para actualizar los datos de nuestro usuario hace uso de un Middlwares
//Este verifica que el usuario tenga la sesión iniciada en caso de tenterla realiza un retorno tempranon antes de entrar a la función principal
route.delete("/eliminar-usuario", hasSession, usuarios_abc.eliminar); // Ruta para eliminar un usuario que hace uso de un Middlewares
//Este verifica que el usuario tenga la sesión iniciada en caso de no tenerla realiza un retorno antes de entrar a la función principal

//Rutas que tengan que ver con las acciones para los productos favoritos
route.post("/add_fav", hasSession, favorites_abc.decideAction); //Ruta para marcar un producto comno favorito o no hace uso de un Middleware
//Este verifica que el usuario tenga la sesión iniciada en caso de no tenerla realiza un retorno antes de entrar a la función principal

//Rutas que tengan que ver con las acciones para poder realizar con el carrito
route.post("/carrito", hasSession, carritos_abc.guardar); //Ruta para guardar el producto marcado al carrito hace uso de un Middleware
//Este verifica que el usuario tenga la sesión iniciada en caso de no tenerla realiza un retorno antes de entrar a la función principal
route.put("/finalizar_pedido", hasSession, pedidos_abc.finalizar); //Ruta para finalizar algun pedido hace uso de un middleware
//Este verifica que el usuario tenga la sesión iniciada en caso de no tenerla realiza un retorno antes de entrar a la función principal
route.delete("/carrito/:producto", hasSession, carritos_abc.eliminar); //Ruta para eliminar producto del carrito
//Este verifica que el usuario tenga la sesión iniciada en caso de no tenerla realiza un retorno antes de entrar a la función principal

//Exportamos las rutas que estamos creando
export default route