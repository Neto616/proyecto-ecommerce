import { Context, Next } from 'hono';

/**
 * Dentro de este archivo generamos Middlewares para las rutas qeu tengan que ver con la creción o formularios que los usuarios pueden
 * llenar estos detectan ciertas situaciones antes de que el proceso llegue a la funcion principal
 */

// Función que verifica si las contraseñas que el usuario escriba se parezcan en caso de que si sean iguales este continua a la 
// siguiente funcion o mdw que este posicionado a lado de este.
export async function passwordsEquals(c:Context, next: Next) {
    //Encapsulamos todo nuestro codigo interno en un try catch para poder tener control de los errores que puedan suceder
    try {
        //Obtenemos del body las dos contraseñas
        const {contrasena, confirmarContrasena} = await c.req.parseBody();
        //En caso de que estas no sean iguales retornamos un json con un valor de 2 y el mensaje de que no son las mismas
        if(contrasena !== confirmarContrasena) return ({ estatus: 2, result: {
            info: "Las contraseñas deben ser las mismas",
            data: []
        }});
        //En caso contrario llamamos a la función next para que continue con su proceso normal
        return await next();
    } catch (error) {
        //En caso de detectar un error lo imprimimos en consola y tambien retornamos un estatus de cero
        console.log("[crearMdw]: Ha occurido un error al momento de verificar las contraseñas: ", error);
        return c.json({ estatus: 0 });
    }
}
//Esta función se encarga de detectar que el formulario para crear usuarios no llegue vacio ya que todos los campos son obligatorios
export async function hasEmptys(c: Context, next: Next) {
    try {
        //Obtenemos del body todos los datos de los campos que requerimos visualizar
        const {nombre, apellidos, correo, contrasena, confirmarContrasena} = await c.req.json();
        //Verificamos si son datos que entren en lo "falsy" que maneja javaScript y en caso de que nos falte un dato
        //Retornaremos un estatus 3 y una información dando a entender que faltan campos por llenar
        if(!nombre || !apellidos || !correo || !contrasena || !confirmarContrasena) return c.json({ estatus: 3, result:{
            info: "Los campos obligatorios deben llenarse porfavor",
            data: []
        }});
        //Tambien verificamos que la longitud de la contraseña sea mayor a seis
        if((contrasena as string).length < 6 && contrasena === "") return c.json({ estatus: 3, result: {
            info: "La contraseña deber ser mayor de seis digitos",
            data: []
        }});
        //EN caso de que ninguna de estas opciones haya pasado contianuaremos hacia la siguiente funcion
        return await next();        
    } catch (error) {
        //En caso de error imprimimos nuestor error en consola y retornamos un estatus en cero
        console.log("[crearMdw]: Ha ocurrido un error la momento de verificar los vacios: ", error);
        return c.json({ estatus: 0, result: {
            info: "Ha ocurrido un error",
            error: error
        }});
    }
}