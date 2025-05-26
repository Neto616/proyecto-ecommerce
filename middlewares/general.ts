import { Hono, Context, Next } from 'hono';
import { getCookie } from 'hono/cookie';
import { info } from "https://deno.land/std@0.104.0/log/mod.ts";

export async function isCorreo(c:Context, next: Next) {
    try {
        const { correo } = await c.req.json();
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        
        if(!regex.test(correo as string)){
            return c.json({ estatus: -1, result: {
                info: "La correo no es una correo",
                data: []
            }})
        }
        return await next();
    } catch (error) {
        console.error("[generalMdw] Ha ocurrido un error al verificar la estructura del usaurio");
        return c.json({ estatus: 0, result: {
            info: "Ha ocurrido un error",
            error: error
        }});
    }
}

export async function hasSession (c: Context, next: Next) {
    try {
        const miCookie = getCookie(c, "usuario_cookie");

        if(miCookie) return next();
        return c.json({ estatus: -2, result: {
            info: "El usuario no tiene cuenta activa"
        }})
    } catch (error) {
        console.log("[hasSessionMdw] Ha ocurrido un error al detectar la cuenta");

    }
}