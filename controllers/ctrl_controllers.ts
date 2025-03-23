import { Context } from "hono";
import { controladores_usuario } from "../types/tipos_rutas.ts";
import {Usuarios} from '../db/consultas.ts';

const usuarios_abc: controladores_usuario = {
    crear: async (c: Context) => {
        const {nombre, apellidos, correo, contrasena} = await c.req.parseBody();
console.log(`
=============================
Nombre:     ${nombre}
Apellidos:  ${apellidos}
Correo:     ${correo}
Contraseña: ${contrasena}
=============================`);
        const consulta: Usuarios = new Usuarios(
            nombre.toString(), 
            apellidos.toString(), 
            correo.toString(), 
            contrasena.toString()
        );
        const bd_response = await consulta.crearUsuario();
        return c.json({ estatus: 1, result: {info: "Crear usuario", result: {db_response: bd_response}}});
    },
    actualizar: async (c: Context) => {
        const { id } = c.req.param()
        const {nombre, apellidos, correo, whatsapp, contrasena, confirmacion} = await c.req.parseBody();

console.log(`
=============================
Id:                   ${id}
Nombre:               ${nombre}
Apellidos:            ${apellidos}
Whatsapp:             ${whatsapp}
Correo:               ${correo}
Contraseña            ${contrasena}
Confirmar Contraseña: ${confirmacion}
=============================`);

        if(!id) return c.json({ estatus: 3, result: {info: "No hay usuario"}});
        if(contrasena !== confirmacion) return c.json({ estatus: 2, result: {info: "Contraseñas no similarerss"}});
        
        const consulta: Usuarios = new Usuarios(
            nombre.toString(),
            apellidos.toString(),
            correo.toString(),
            contrasena.toString(),
            whatsapp?.toString()
        )
        consulta.actualizarUsuario(id);
        return c.json({ estatus: 1, result: {info: "Actualizar usuario", result: {}}});
    },
    eliminar: async (c: Context) => {
        try {
            const id:string = "1";
            await Usuarios.eliminar(id);
            return c.json({ estatus: 1, result: {info: "Eliminar usuario"}})
        } catch (error) {
            return c.json({ estatus: 0, result: {info: "Hubo un error", error: error}})
        }
    }
}

export default usuarios_abc