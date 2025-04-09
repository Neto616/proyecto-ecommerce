import { Context } from "hono";
import { getCookie, getSignedCookie, setCookie, setSignedCookie,deleteCookie } from 'hono/cookie';

import { vistas_productos, vistas_usuarios } from "../types/tipos_rutas.ts";
import { Productos } from "../db/consultas.ts";

const usuarios:vistas_usuarios= {
    inicio: async (c: Context) => {
        return c.json({ estatus: 1 , 
            result: { 
                info: "Bienvenido", data: {}
            }})
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