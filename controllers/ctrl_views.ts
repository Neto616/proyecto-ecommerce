// Importamos el modulo necesario de la paqueteria hono
import { Context } from "hono";
// Importamos los modulos que generamos dentro del proyecto
import { Usuarios } from "../db/consultas.ts";
import { vistas_productos, vistas_usuarios } from "../types/tipos_rutas.ts";
import { Productos } from "../db/consultas.ts";

//Generamos un objeto JSON que dentro tendrán funciones anonimas y estas son las acciones que se realizarán con los usuarios
const usuarios:vistas_usuarios= {
    //Tendremos una funcion de inicio
    inicio: async (c: Context) => {
        return c.json({ estatus: 1 , 
            result: { 
                info: "Bienvenido", data: {}
            }})
    },
    //La función se llama existe que llama a nueustro objeto usuario y verifica que el usuari exista en base a su correo
    existe: async (c:Context) => {
      try {
        //El correo vendrá en el header de nuestra llamada a la petición 
        const correo = c.req.header("correo");
        const { estatus, result } = (await Usuarios.isExist(correo?.toString() || ""));

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
    //Llama y carga la vista de todos los productos que se tengan en al base de datos
    todos: async (c: Context) => {
        try {
            const productos = await Productos.mostrarTodos();

            return c.json({ estatus: 1, 
                result: {
                    info: "Todos los productos", data: { productos }
                }})
        } catch (error) {
            return c.json({ estatus: 0, result: {
                info: "Error",
                error: error
            }})
        }
    },
    //Trae los datos del producto a buscar
    detalle: async (c: Context) => {
        try {
            const producto = c.req.param("producto");
            const detalles = await Productos.detalle(producto);
            return c.json({ estatus: 1, 
                result: {
                    info: "Detalle del producto", data: {producto: producto, detalles}
                }})
        } catch (error) {
            return c.json({ estatus: 0, result: {
                info: "Error",
                error: error
            }})
        }
    }
}
//Exportamos nuestros dos objetos que se usaran en las rutas
export {usuarios, productos}