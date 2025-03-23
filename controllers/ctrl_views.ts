import { Context } from "hono";
import {default as db} from "../db/connection.ts";
import { vistas_productos, vistas_usuarios } from "../types/tipos_rutas.ts";
import { Productos } from "../db/consultas.ts";

const usuarios:vistas_usuarios= {
    inicio: async (c: Context) => {
        return c.json({ estatus: 1 , 
            result: { 
                info: "Bienvenido", data: []
            }})
    },

}

const productos:vistas_productos= {
    todos: async (c: Context) => {
        try {
            const productos = await Productos.mostrarTodos();

            return c.json({ estatus: 1, 
                result: {
                    info: "Todos los productos", data: [productos]
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
            let producto = c.req.param("producto");
            const detalles = await Productos.detalle(producto);
            return c.json({ estatus: 1, 
                result: {
                    info: "Detalle del producto", producto: c.req.param("producto"), data: [detalles]
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