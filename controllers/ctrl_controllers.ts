import { Context } from "hono";
import { controladores_usuario } from "../types/tipos_rutas.ts";
import Usuarios from '../db/consultas.ts';

const usuarios_abc: controladores_usuario = {
    crear: async (c: Context) => {
        const {nombre, apellidos, correo, contrasena} = await c.req.parseBody()
console.log(`
Nombre:     ${nombre}
Apellidos:  ${apellidos}
Correo:     ${correo}
Contraseña: ${contrasena}
`)
        const consulta: Usuarios = new Usuarios(
            nombre.toString(), 
            apellidos.toString(), 
            correo.toString(), 
            contrasena.toString()
        );
        
        await consulta.crearUsuario();

        return c.json({ estatus: 1, result: {info: "Crear usuario"}})
    },
    actualizar: async (c: Context) => c.json({ estatus: 1, result: {info: "Actualizar usuario"}}),
    eliminar: async (c: Context) => c.json({ estatus: 1, result: {info: "Eliminar usuario"}})
}

export default usuarios_abc