//Importamos los modulos necesarios de la paquetería hono y tambien importamos los modulos necesarios
//para controlar las cookies que nos ayudará a tener control sobre las sesiones de los usuarios
import { Context } from "hono";
import { getCookie, setCookie} from 'hono/cookie'
//Importamos los modulos que generamos de nuestor proyecto
import { controladores_carrito, controladores_usuario } from "../types/tipos_rutas.ts";
import { Carrito, Categorias, Favoritos, Usuarios, Pedido, MiCuenta } from '../db/consultas.ts';
import { controladores_favoritos } from '../types/tipos_rutas.ts';

//Generamos nuestra constante que sera un JSON del tipo asignado con las funciones necesarias para 
//ser llamadas en la ruta correspondiente
const usuarios_abc: controladores_usuario = {
    //Funcion encargada de crear usuarios donde su unico parametro sera el contexto actual de la ruta
    crear: async (c: Context) => {
        //Obtenemos los datos que queremos unicamente obtener que sera:
        //nombre, apellidos, correo, contraseña del body de la peticion que tengamos.
        const {nombre, apellidos, correo, contrasena} = await c.req.json();
        //Generamos una constante de tipo usuario y le pasamos cada uno de los datos necesarios
        //para poder ser inicializado
        const consulta: Usuarios = new Usuarios(
            nombre.toString(), 
            apellidos.toString(), 
            correo.toString(), 
            contrasena.toString()
        );
        //Una vez inicializamos nuestro objeto llamamos a su metodo para crear un usuario en la bd
        const bd_response = await consulta.crearUsuario();
        //retornamos tambien un JSON con un estatus que se ocupara al momento de realizar las peticiones por al api
        return c.json(bd_response);
    },
    //Funcion encargada de actualizar los datos del usuario
    actualizar: async (c: Context) => {
        const userId = JSON.parse(getCookie(c, "usuario_cookie") || JSON.stringify({ id: 0 }));
        //Se obtienen unicamente los elementos necesarios del body para poder actualizar los datos del usuario
        const {nombre, apellidos, wpp } = await c.req.json();
        //En caso de que no se tenga un identifiacdor retorna un estatus que hara que se mueve a la seccion para iniciar sesión
        if(!userId.id) return c.json({ estatus: 3, result: {info: "No hay usuario"}});
        //Generamos nuestra constante de tipo Usuarios con los datos necesarios para poder inicializarlos
        const consulta: Usuarios = new Usuarios(
            nombre.toString(),
            apellidos.toString(),
            "",
            "",
            wpp?.toString()
        )
        //Llamamos al metodo actualizar usuario y le pasamos su identificador como parametro
        consulta.actualizarUsuario(userId.id);
        
        //Retornamos un JSON que sera procesado por el fron mas delante
        return c.json({ estatus: 1, result: {info: "Actualizar usuario", result: {}}});
    },
    //Función encargada de eliminar usuarios del sitio
    eliminar: async (c: Context) => {
        try {
            const userId = JSON.parse(getCookie(c, "usuario_cookie") || JSON.stringify({ id: 0 }));
            //El metodo eliminar es un metodo estatico entonces no inicializamos este objeto unicamente llamamos a su respectivo metodo
            await Usuarios.eliminar(userId.id);
            //Retornamos un JSON que el front procesará
            return c.json({ estatus: 1, result: {info: "Eliminar usuario"}});
        } catch (error) {
            //En caso de algun error retornaremos un estado distinto para poder manejarlos de manera correcta
            return c.json({ estatus: 0, result: {info: "Hubo un error", error: error}});
        }
    },
    //Función para iniciar sesión
    iniciar_sesion: async (c: Context) => {
        try {
            //Del body unicamente obtenemos los datos correo y contraseña
            const {correo, contrasena} = await c.req.json();
            //Obtenemos el resultado de lo que nos entregue al el metodo iniciarSesion del objeto Usuarios donde en los paremotros
            //ponemos que si correo no es nulo que se ponga un string vacio y lo mismo con contrasena
            const { result } = (await Usuarios.iniciarSesion(correo?.toString() || "", contrasena?.toString() || "")).result;
            console.log(result);
            //En caso de que result tenga longitud 0 se retornara un estado para que se maneja desde el front la vista que se mostrara
            if(!result.length) return c.json({
                estatus: 2, 
                result: { 
                    info: "No existe un usuario con esas credenciales.", 
            }});
            //Creamos una constante para unir los datos de nombre y apellido
            const usuario_nombre: string = (result[0].nombre+" "+result[0].apellidos);
            //Creamos una cookie con nombre usuario_cooki y en su valor le damos el identificador y el nombre
            //Tambien mencionamos que esta cookie se podra usar en todas las rutas
            setCookie(c, 'usuario_cookie', JSON.stringify({id: result[0].id, nombre: usuario_nombre}), {path: "/", maxAge: 3600, httpOnly: true, secure: false, sameSite: "Lax"});
            //retornamos un json con la respuesta para que en front se pueda manejar
            return c.json({
                estatus: 1, 
                result: { 
                    info: "Iniciar sesión", 
                    nombre: usuario_nombre
                }});
        } catch (error) {
            //En caso de error lo redireccionamos para el inicio de la pagina
            console.log(error);
            return c.redirect("/");
        }
    }
}
// Función para obtener lo necesario para la información de "mi cuenta"
const miCuenta = {
    //Funcion que obtiene los datos del usuario
    userInfo: async (c:Context) => {
        //Encapsulamos la función en un try catch para tener control sobre posibles errores
        try {
            //Obtenemos la sesión de nuestor usuario
            const userId = JSON.parse(getCookie(c, "usuario_cookie") || JSON.stringify({}));
            // Inicializamos nuestro objeto y le pasamos el id de la sesión
            const userInfo: MiCuenta = new MiCuenta(userId.id);
            //Llamamos el metodo para obtener la información del usuario
            const resultado = await userInfo.getInfo();
            // Retornamos el resultado que nos da el metodo 
            return c.json( resultado );
        } catch (error) {
            //En caso de algun error imprimimos nuestro error en consola y retornamos nuestro estatus cero para dar a enteder que ocurrio un error
            console.error("Ha ocurrido un error: ", error);
            return c.json({ estatus: 0, result: {
                info: "Ha ocurrido un error",
                data: []
            }})
        }
    }
}

const favorites_abc: controladores_favoritos = {
    decideAction: async (c: Context) => {
        try {
            const { producto } = await c.req.json(); //Obtenemos del JSON que nos llega el atributo producto de manera especifica
            const productoID = parseInt(producto || "0"); //Obtenemos el identificador de nuestro producto
            const session = JSON.parse(getCookie(c, 'usuario_cookie') || JSON.stringify({})); //Obtenemos la sesión del usuario para saber a quien le pertenece la cuenta
            const favorito: Favoritos = new Favoritos(session.id); //Dentro de este objeto pondremos el identificador del usuario que se traera en base a la cookie que se tenga guardada
            const resultado = await favorito.decideAction(productoID); //Decidimos si el producto se va a marcar como favorito o se va a desmarcar de la lista de favoritos
            //Retornamos el valor que nos devuelva nuestro metodo
            return c.json( resultado );
        } catch (error) {
            //En caso de error imprimimos el error en consola
            console.log(error);
            //Retonramos un estado de cero para mencionar que ha ocurrido un error
            return c.json({ estatus: 0, result: {
                info: "Ha ocurrido un error",
                data: []
            }})
        }
    },
}

const carritos_abc: controladores_carrito = {
    //Función para guardar productos al carrito donde le pasamos el contexto que tenga actualmente
    guardar: async (c:Context) => {
        //Encapsulamos la función en un try catch para tener control de los errores que puedan suceder
        try {
            //Obtenemos los datos del cuerpo de la peticion
            const {producto, cantidad} = await c.req.json()
            //Obtenemos el id que almacena la cookie osea la sesión de nuestro usuario
            const userId = JSON.parse(getCookie(c, "usuario_cookie") || JSON.stringify({}));
            //Inicializamos nuestro objeto Carrito y en el parametro le pasamos el identificador del usuario
            const carrito: Carrito = new Carrito(userId.id);
            //Ejecutamos el metodo para añadir dicho producot al carrito
            const resultado = await carrito.addToCart(producto, (cantidad ?? 1));
            //Retornamos el resultado que nos da el metodo 
            return c.json( resultado );
        } catch (error) {
            //En caos de algun error imprimimos en consola el error y retornamos un estatus en cero 
            console.log("[Ruta guardar carrito] Ha ocurrido un error: ", error);
            return c.json({ estatus: 0, result: {
                info: "Ha ocurrido un error",
                data: []
            }});
        }
    },
    //Funcion encargada de eliminar un producto del carrito
    eliminar: async (c:Context) => {
        //Encapsulamos la función en un try catch para tener control de los errores que puedan suceder
        try {
            //Obtenemos el id del producto que no llega dentor de los paramestros del end point
            const producto = parseInt(c.req.param("producto") ?? 0);
            //Obtenemos el identificador del usuario
            const userId = JSON.parse(getCookie(c, "usuario_cookie") || JSON.stringify({}));
            //Inicializamos el objeto Carrito
            const carrito: Carrito = new Carrito( userId.id );
            //Ejecutamos el metodo encargado de borrar un producto del carrito
            const resultado = await carrito.deleteCart( producto );
            //Retornamos nuestra respuesta del metodo
            return c.json( resultado );
        } catch (error) {
            //En caso de algun error lo imprimmos en consola y reotrnamos un estatus de cero
            console.log("[Ruta eliminar carrito] Ha ocurrido un problema: ", error);
            return c.json({ estatus: 0, result: {
                info: "Ha ocurrido un error",
                data: []
            }});
        }
    }
}

const pedidos_abc = {
    finalizar: async (c:Context) => {
        //Encapsulamos la función en un try catch para tener control de los errores que puedan suceder
        try {
            //Obtenemos el ID de la sesión de nuestro usuario
            const userId = JSON.parse(getCookie(c, "usuario_cookie") || JSON.stringify({}));
            //Inicializamos nuestor objeto Pedido y le pasamos el id del usuario a su parametro
            const pedido: Pedido = new Pedido( userId.id );
            //Ejecutamos nuestro metodo que se encarga de cerrar los pedidos
            const resultado = await pedido.cerrarPedido();
            //Retornamos un json con el resultado que retorna cerrar pedido
            return c.json( resultado );
        } catch (error) {
            // En caso de algun error lo mostramos en consola y retornamos un estatus de cero
            console.error("Ha ocurrido un error: ", error);
            return c.json({
                estatus: 0, result: {
                    info: "Ha ocurrido un error"
                }
            })
        }
    },
    pedidosUsuarios: async (c:Context) => {
        //Encapsulamos la función en un try catch para tener control de los errores que puedan suceder
        try {
            //obtenemos el identificador de la sesión del usuario
            const userId = JSON.parse(getCookie(c, "usuario_cookie") || JSON.stringify({}));
            //Inicializamos nuestro objeto Pedido que le pasamos el identificador del usuario
            const pedido: Pedido = new Pedido(userId.id);
            //Obtenemos los primeros 12 pedidos
            const resultado = await pedido.getOrders(1, 12);
            //Retornamos el valor que nos da el resultado anterior
            return c.json(resultado);
        } catch (error) {
            //En caso de algun error imprimimos en consola el error y retornamos un estatus de cero para dar a entender que hay un error
            console.error("Ha ocurrido un error: ", error);
            return c.json({
                estatus: 0, result: {
                    info: "Ha ocurrido un error",
                    data: []
                }
            })
        }
    }
}

const categorias = {
    getCategoria: async (c: Context) => {
        //Encapsulamos la función en un try catch para tener control de los errores que puedan suceder
        try {
            //Inicializamos el objeto de categorias
            const categoria: Categorias = new Categorias();
            //Llamamos el metodo para obtener las categorias de base de datos
            const resultado = await categoria.getCategorias();
            //Retornamos el resultado para que en el front lo procesen
            return c.json(resultado);
        } catch (error) {
            //En caso de error imprimimos el error y retornamos un estatus de cero
            console.error(error);
            return c.json({ estatus: 0, result: {info: "Hubo un error", error: error}});
        }
    }
}
//Exportamos todos los json que tienen las funciones necesarias para poder
export { 
    usuarios_abc, 
    miCuenta,
    favorites_abc,
    carritos_abc,
    pedidos_abc,
    categorias
}