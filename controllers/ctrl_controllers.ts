import { Context } from "hono";
import { getCookie, setCookie} from 'hono/cookie'
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
    },
    iniciar_sesion: async (c: Context) => {
        try {
            const {correo, contrasena} = await c.req.parseBody();
            const { result } = (await Usuarios.iniciarSesion(correo?.toString() || "", contrasena?.toString() || "")).result;
            if(!result.length) return c.json({
                estatus: 2, 
                result: { 
                    info: "No existe un usuario con esas credenciales.", 
            }});
            const usuario_nombre: string = (result[0].nombre+" "+result[0].apellidos);
            setCookie(c, 'usuario_cookie', JSON.stringify({id: result[0].id, nombre: usuario_nombre}), {path: "/"});
            console.log(`Cookie del usuario: ${getCookie(c, 'usuario_cookie')}`);
            return c.json({
                estatus: 1, 
                result: { 
                    info: "Iniciar sesión", 
                    nombre: usuario_nombre
                }});
        } catch (error) {
            console.log(error);
            return c.redirect("/");
        }
    }
}

export default usuarios_abc