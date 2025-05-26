import { Hono, Context, Next } from 'hono';
import { resolveCallback } from "hono/utils/html";

export async function passwordsEquals(c:Context, next: Next) {
    try {
        const {contrasena, confirmarContrasena} = await c.req.parseBody();
        if(contrasena !== confirmarContrasena) return ({ estatus: 2, result: {
            info: "Las contraseñas deben ser las mismas",
            data: []
        }});

        return await next();
    } catch (error) {
        console.log("[crearMdw]: Ha occurido un error al momento de verificar las contraseñas: ", error);
        return c.json({ estatus: 0 });
    }
}

export async function hasEmptys(c: Context, next: Next) {
    try {
        const {nombre, apellidos, correo, contrasena, confirmarContrasena} = await c.req.json();
        console.log(nombre, apellidos, correo, contrasena, confirmarContrasena)
        if(!nombre || !apellidos || !correo || !contrasena || !confirmarContrasena) return c.json({ estatus: 3, result:{
            info: "Los campos obligatorios deben llenarse porfavor",
            data: []
        }});

        if((contrasena as string).length < 6 && contrasena === "") return c.json({ estatus: 3, result: {
            info: "La contraseña deber ser mayor de seis digitos",
            data: []
        }});

        return await next();        
    } catch (error) {
        console.log("[crearMdw]: Ha ocurrido un error la momento de verificar los vacios: ", error);
        return c.json({ estatus: 0, result: {
            info: "Ha ocurrido un error",
            error: error
        }});
    }
}