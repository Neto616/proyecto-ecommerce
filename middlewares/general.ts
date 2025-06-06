/**
 * Dentro de este archivo estan las funciones que son generales para el funcionamiento de nuestro sitio verificando 
 * Los datos que son importantes para ciertas secciones
 * 
 * Obtenemos las funciones de Context y Next de la libreria Hono y tambien la función getCookie de la libreria hono/cookie
 */
import { Context, Next } from 'hono';
import { getCookie } from 'hono/cookie';
//Creamos nuestra función para detectar que lo que nos escriban tenga el formato correcto de un correo
export async function isCorreo(c:Context, next: Next) {
    //Encapsulamos nuestro codigo en un try catch para tener mejor control sobre los posibles errores que tengamos
    try {
        //Obtenemos el atributo correo del request
        const { correo } = await c.req.json();
        //Creamos nuestra expresión regular que sera la encargada de detectar si un correo es un correo
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        //Testeamos el nuestra expresión regular con el correo que recibimos en caso de que sea falso retornaremos un estatus de -1
        if(!regex.test(correo as string)){
            return c.json({ estatus: -1, result: {
                info: "La correo no es una correo",
                data: []
            }})
        }
        //En caso de que no suceda el caso anterior continuaremos con las demas funciones que se tengan adelante
        return await next();
    } catch (error) {
        // En caso de algun error lo imprimimos en consola y retornamos un estatus de cero
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