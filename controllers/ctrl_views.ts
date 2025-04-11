import { Context } from "hono";
import { getCookie, getSignedCookie, setCookie, setSignedCookie,deleteCookie } from 'hono/cookie';
import { Usuarios } from "../db/consultas.ts";
import { vistas_productos, vistas_usuarios } from "../types/tipos_rutas.ts";
import { Productos } from "../db/consultas.ts";

const usuarios:vistas_usuarios= {
    inicio: async (c: Context) => {
        return c.json({ estatus: 1 , 
            result: { 
                info: "Bienvenido", data: {}
            }})
    },
    existe: async (c:Context) => {
      try {
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

export {usuarios, productos}