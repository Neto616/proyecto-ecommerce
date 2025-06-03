//Importamos los modulos necesarios de la paquetería hono y tambien importamos los modulos necesarios
//para controlar las cookies que nos ayudará a tener control sobre las sesiones de los usuarios
import { Context } from "hono";
import { getCookie, setCookie} from 'hono/cookie'
//Importamos los modulos que generamos de nuestor proyecto
import { controladores_carrito, controladores_usuario } from "../types/tipos_rutas.ts";
import {Carrito, Categorias, Favoritos, Usuarios, Pedido} from '../db/consultas.ts';
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
        const { id } = c.req.param() //Se cambiara para obtener el identificador desde la sesion que se tenga
        //Se obtienen unicamente los elementos necesarios del body para poder actualizar los datos del usuario
        const {nombre, apellidos, correo, whatsapp, contrasena, confirmacion} = await c.req.parseBody();
        //En caso de que no se tenga un identifiacdor retorna un estatus que hara que se mueve a la seccion para iniciar sesión
        if(!id) return c.json({ estatus: 3, result: {info: "No hay usuario"}});
        //En caso de que la contraseña y la confirmación no sean iguales se avisara con un estado distinto para que  se proceso en el front
        if(contrasena !== confirmacion) return c.json({ estatus: 2, result: {info: "Contraseñas no similarerss"}});
        //Generamos nuestra constante de tipo Usuarios con los datos necesarios para poder inicializarlos
        const consulta: Usuarios = new Usuarios(
            nombre.toString(),
            apellidos.toString(),
            correo.toString(),
            contrasena.toString(),
            whatsapp?.toString()
        )
        //Llamamos al metodo actualizar usuario y le pasamos su identificador como parametro
        consulta.actualizarUsuario(id);
        //Retornamos un JSON que sera procesado por el fron mas delante
        return c.json({ estatus: 1, result: {info: "Actualizar usuario", result: {}}});
    },
    //Función encargada de eliminar usuarios del sitio
    eliminar: async (c: Context) => {
        try {
            const id:string = "1"; //El id se cambiara para obtenerse desde la cookie que se genere con los datos que este tenga
            //El metodo eliminar es un metodo estatico entonces no inicializamos este objeto unicamente llamamos a su respectivo metodo
            await Usuarios.eliminar(id);
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
    guardar: async (c:Context) => {
        try {
            console.log("C papu")
            const {producto, cantidad} = await c.req.json()
            const userId = JSON.parse(getCookie(c, "usuario_cookie") || JSON.stringify({ id: 2 }));
            const carrito: Carrito = new Carrito(userId.id);
            const resultado = await carrito.addToCart(producto, (cantidad ?? 1));
            return c.json( resultado );
        } catch (error) {
            console.log("[Ruta guardar carrito] Ha ocurrido un error: ", error);
            return c.json({ estatus: 0, result: {
                info: "Ha ocurrido un error",
                data: []
            }});
        }
    },
    actualizar: async (c:Context) => {
        return c.json({ estatus: 1 });
    },
    eliminar: async (c:Context) => {
        try {
            console.log("C papu");
            const producto = parseInt(c.req.param("producto") ?? 0);
            console.log("El id del producto es: ", producto)
            const userId = JSON.parse(getCookie(c, "usuario_cookie") || JSON.stringify({ id: 2 }));
            const carrito: Carrito = new Carrito( userId.id );
            const resultado = await carrito.deleteCart( producto  );
            return c.json( resultado );
        } catch (error) {
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
        try {
            const userId = JSON.parse(getCookie(c, "usuario_cookie") || JSON.stringify({}));
            const pedido: Pedido = new Pedido( userId.id );
            const resultado = await pedido.cerrarPedido();

            return c.json( resultado );
        } catch (error) {
            console.error("Ha ocurrido un error: ", error);
            return c.json({
                estatus: 0, result: {
                    info: "Ha ocurrido un error"
                }
            })
        }
    }
}

const categorias = {
    getCategoria: async (c: Context) => {
        try {
            const categoria: Categorias = new Categorias();
            const resultado = await categoria.getCategorias();
            // console.log("Categorias: ", resultado)
            return c.json(resultado);
        } catch (error) {
            console.error(error);
            return c.json({ estatus: 0, result: {info: "Hubo un error", error: error}});
        }
    }
}

export { 
    usuarios_abc, 
    favorites_abc,
    carritos_abc,
    pedidos_abc,
    categorias
}