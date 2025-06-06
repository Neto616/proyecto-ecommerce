//Importamos Context y la función Next de la libreria de hono
import { Context, Next } from "hono";
//Exportamos la funcion hasEmptys 
export async function hasEmptys(c: Context, next: Next) {
    // Encapsulamos nuestra funcion en un try catch para tener los errores bajo control
    try {
        //Obtenemos del body de la petición el correo y la contraseña
        const {correo, contrasena } = await c.req.json();
        //En caso de que el correo o la contraseña sean falsy retornaremos un estatus 3 dando a entender que hace faltan datos por escribir
        if(!correo || !contrasena) return c.json({ estatus: 3, result:{
            info: "Los campos obligatorios deben llenarse porfavor",
            data: []
        }});
        //En caso de que la contraseña tenga menos de seis caracteres retornamos un estatus 3 dando a entender que hacen falta datos
        if(contrasena?.length < 6 && contrasena === "") return c.json({ estatus: 3, result: {
            info: "La contraseña deber ser mayor de seis digitos",
            data: []
        }});
        //En caso contrario continuamos con la siguiente funcion
        return await next();        
    } catch (error) {
        //En caso de algun error lo imprimimos en consola y retornamos un estatus de cero
        console.log("[crearMdw]: Ha ocurrido un error la momento de verificar los vacios: ", error);
        return c.json({ estatus: 0, result: {
            info: "Ha ocurrido un error",
            error: error
        }});
    }
}