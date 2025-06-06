// Importamos el modulo necesario de la paqueteria hono
import { Context } from "hono";
// Importamos los modulos que generamos dentro del proyecto
import { Carrito, Favoritos, Usuarios } from "../db/consultas.ts";
import { vistas_productos, vistas_usuarios } from "../types/tipos_rutas.ts";
import { Productos } from "../db/consultas.ts";
import { getCookie } from 'hono/cookie';

//Generamos un objeto JSON que dentro tendrán funciones anonimas y estas son las acciones que se realizarán con los usuarios
const usuarios:vistas_usuarios= {
    //Tendremos una funcion de inicio que renderiza un documento html
    inicio: async (c: Context) => {
        try {
            const filePath = "../index.html";
            const htmlContent = await Deno.readTextFile(filePath);
            console.log("Cargando html")
            return c.html(htmlContent);
        } catch (error) {
            console.error("Ha sucedido un error al cargar la vista: ", error);
            c.json({ estatus: 0 })
        }
    },
    //La función se llama existe que llama a nueustro objeto usuario y verifica que el usuari exista en base a su correo
    existe: async (c:Context) => {
      try {
        //El correo vendrá en el header de nuestra llamada a la petición 
        const correo = c.req.header("correo");
        console.log(correo)
        const { estatus, result } = (await Usuarios.isExist(correo?.toString() || ""));
        console.log(estatus)
        if(estatus == 0) return c.redirect("/"); //Ocurrio un error asi que se llevara al inicio
        if(estatus == 2) return c.json({ estatus: 2 }) //Estaria dando datos para crear cuenta
        return c.json({ estatus: 1 }) //Estaria dando a iniciar sesion
      } catch (error) {
        console.log(error);
        return c.redirect("/");
      }  
    },
    iniciar_sesion: async (c: Context) => {
        try {
            return c.json({ estatus: 1, 
                result: {
                    info: "Iniciar sesión", data: []
                }
            })
        } catch (error) {
            console.log(error);
            return c.redirect("/");
        }
    }

}

const productos:vistas_productos= {
    // Funcion para obtener los prodcutos destacados
    destacados: async (c: Context) => {
      try {
        // El metodo es estatico entonces unicamente llamamos al metodo necesario
        const service = await Productos.productosDestacados();
        // Retornamos la respuesta que nos da el metodo
        return c.json(service);     
      } catch (error) {
        // En caso de error lo imprimimos en consola y retornamos un json con estatus cero
        console.log(error);
        return c.json({ estatus: 0, info: {
            message: "Ha ocurrido un error",
            error: error
        }});
      }  
    },
    //Llama y carga la vista de todos los productos que se tengan en al base de datos
    todos: async (c: Context) => {
        try {
            //Como esta función renderiza tambien los filtros que escoga el usuario a lo largo de su navegacion
            //Obtenemos la sección que tenga nuestra consulta
            const seccion: string | undefined = c.req.query("section") || undefined;
            //Obtenemos la busqueda que contenga la consulta
            const busqueda: string | undefined = c.req.query("b") || undefined;
            //Obtenemos le filtro que contega esta misma
            const filtro: string | undefined = c.req.query("filtro") || undefined;
            //Decodificamos la URL para evitar lo codigos que pone
            let decodificada = decodeURIComponent(busqueda ?? "");
            //convertimos todos los espacios en % para la consulta
            decodificada = "%"+decodificada.split(" ").join("%")+"%";
            //OPbtenemos la pagina en caso de no tener la decidimos en que sea la pagina numero uno
            const pagina: number = parseInt(c.req.query("p") || "1");
            //Hablamos al metodo estatico de nuestra clase producto y le pasamos todos los datos 
            //como lo son los filtros, la busqueda, la sección, la pagina y la cantidad de productos a mostrar por pagina
            const productos = await Productos.mostrarTodos(decodificada, seccion, filtro, pagina, 12);
            //Retornamos la respuesta que nos da el metodo llamado anteriormente
            return c.json(productos);
        } catch (error) {
            // En caso de error retornamo un estatus de cero para dar a enteder que ha ocurrido un error
            return c.json({ estatus: 0, result: {
                info: "Error",
                error: error
            }})
        }
    },
    //Trae los datos del producto a buscar
    detalle: async (c: Context) => {
        try {
            // Obtenemos el parametro producto que tenga el endopoint
            const producto = c.req.param("producto");
            //Pasamos ese dato que obtuvimos al detalle de nuestro producto
            const detalles = await Productos.detalle(producto);
            // Retornamos la respuesta que nos da el metodo
            return c.json(detalles);
        } catch (error) {
            // En caso de error retornamos un JSON con el estatus de cero
            return c.json({ estatus: 0, result: {
                info: "Error",
                error: error
            }})
        }
    },
    //Trae los productos que estan marcados como favoritos
    favoritos: async (c: Context) => {
        try {
            //Obtenemos del endpoint la consulta p
            const { p } = c.req.query();
            //En caso de ser indefinido le damos a entender que la pagina sera 1 por defecto
            const paginas: number = parseInt(p || "1");
            // Inicializamos nuestro objeto y le damos el id de nuestro usuario
            const peticion: Favoritos = new Favoritos(2);
            // Obtenemos los favoritos y le mencionamos nuestra pagina y la cantidad de productos que veremos por pagina
            const resultado = await peticion.favorites(paginas, 10);
            // Retornamos la respuesta que se nos de 
            return c.json(resultado);
        } catch (error) {
            // En caso de error retornamos un json con estatus cero
            console.log(error); 
            return c.json({
                estatus: 0,
                info: {
                    message: "Ha ocurrido un error: "+error,
                    data: {
                        productos: [],
                        pagina: 1,
                        cantidad: 10,
                        cantidadFavoritos: 0
                    }
                }
            });
        }
    }
}

const favoritos = {
    getFavs: async (c:Context) => {
        try {
            const session = JSON.parse(getCookie(c, 'usuario_cookie') || JSON.stringify({})); //Obtenemos la sesión del usuario para saber a quien le pertenece la cuenta
            const pagina: number = parseInt(c.req.query("p") || "1");
            console.log(session)
            const favoritos: Favoritos = new Favoritos(session.id);
            const resultados = await favoritos.favorites(pagina, 12);
            return c.json(resultados);
        } catch (error) {
            console.log(error);
            return c.json({ estatus: 0, result: {
                info: "Ha ocurrido un error",
                data: []
            }})
        }
    }
}
// Funciones para las vistas del carriot
const carrito = {
    // Obtenemos los productos del carrito dependiendo del usuario
    obtener: async (c:Context) => {
        // Encapsulamos nuestra función en un try catch para el contorl de errores
        try {
            //Obtenemos el id de nuestro usuario
            const userId = JSON.parse(getCookie(c, "usuario_cookie") || JSON.stringify({}));
            // Inicializamos nuestro Objeto Carrito y le pasamos el id del usuario
            const carrito: Carrito = new Carrito(userId.id);
            // Llamamos al metodo para obtener los productos del carrito que tiene el usuario
            const resultado = await carrito.carrito();
            // Retornamos la respuesta que nos retorna el carrito
            return c.json(resultado);
        } catch (error) {
            // En caso de error retornamos un estatus en cero dando a entender que ha sucedido un error
            console.error("Ha ocurrido un error favor de intentarlo nuevamente: ", error);
            return c.json({ estatus: 0, info: { message: "Ha ocurrido un error al momento de querer obtener los datos del carrito"}})
        }
    },
    // Función para obtener la cantidad de productos dentro del carrito
    conteo: async (c:Context) => {
        try {
            // Obtenemos la sesión que tenga el usuario
            const userId = JSON.parse(getCookie(c, "usuario_cookie") || JSON.stringify({ }));
            // Inicializamos nuestro carrito y le pasamos el id del usuario
            const carrito: Carrito = new Carrito(userId.id);
            // Llamamos al metodo que retorna la cantidad de productos que tenga en el carrito
            const resultado = await carrito.countProductCart();
            // Retornamos la respuesta que nos de el metodo llamado anteriormente
            return c.json(resultado);
        } catch (error) {
            // En caso de algun error lo imprimimos en consola y retornamos un estatus en cero para dar a entender que sucedio un error
            console.error("Ha ocurrido un error favor de intentarlo nuevamente: ", error);
            return c.json({ estatus: 0, info: { message: "Ha ocurrido un error al momento de quere obtener el conteo de productos del carrito" }});1
        }
    }
}
//Exportamos nuestros objetos que se usaran en las rutas
export {usuarios, productos, favoritos, carrito}