import { Context, Next } from "hono";

export async function hasEmptys(c: Context, next: Next) {
    try {
        const {correo, contrasena } = await c.req.json();
        console.log(correo, contrasena, contrasena.length)
        if(!correo || !contrasena) return c.json({ estatus: 3, result:{
            info: "Los campos obligatorios deben llenarse porfavor",
            data: []
        }});

        if(contrasena?.length < 6 && contrasena === "") return c.json({ estatus: 3, result: {
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