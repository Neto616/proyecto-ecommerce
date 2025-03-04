import { Context } from "hono";
import {default as db} from "../db/connection.ts";
import { vistas_usuarios } from "../types/tipos_rutas.ts";

const usuarios:vistas_usuarios= {
    inicio: async (c: Context) => {
        return c.json({ estatus: 1 , 
            result: { 
                info: "Bienvenido", data: []
            }})
    }    
}

export default usuarios