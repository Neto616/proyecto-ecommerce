// Importamos el modulo necesario de la paqueteria hono
import { Context } from "hono";
// Importamos los modulos que generamos dentro del proyecto
import { Favoritos, Usuarios } from "../db/consultas.ts";
import { vistas_productos, vistas_usuarios } from "../types/tipos_rutas.ts";
import { Productos } from "../db/consultas.ts";
import { getCookie } from 'hono/cookie';

//Generamos un objeto JSON que dentro tendrán funciones anonimas y estas son las acciones que se realizarán con los usuarios
const usuarios:vistas_usuarios= {
    //Tendremos una funcion de inicio
    inicio: async (c: Context) => {
        try {
            const filePath = "../index.html";
            const htmlContent = await Deno.readTextFile(filePath);
            console.log("Cargando html")
            return c.html(htmlContent);
        } catch (error) {
            console.error("Ha sucedido un error al cargar la vista: ", error);
            c.json({ estatus: 0 })
        }
    },
    //La función se llama existe que llama a nueustro objeto usuario y verifica que el usuari exista en base a su correo
    existe: async (c:Context) => {
      try {
        //El correo vendrá en el header de nuestra llamada a la petición 
        const correo = c.req.header("correo");
        console.log(correo)
        const { estatus, result } = (await Usuarios.isExist(correo?.toString() || ""));
        console.log(estatus)
        if(estatus == 0) return c.redirect("/"); //Ocurrio un error asi que se llevara al inicio
        if(estatus == 2) return c.json({ estatus: 2 }) //Estaria dando datos para crear cuenta
        return c.json({ estatus: 1 }) //Estaria dando a iniciar sesion
      } catch (error) {
        console.log(error);
        return c.redirect("/");
      }  
    },
    iniciar_sesion: async (c: Context) => {
        try {
            return c.json({ estatus: 1, 
                result: {
                    info: "Iniciar sesión", data: []
                }
            })
        } catch (error) {
            console.log(error);
            return c.redirect("/");
        }
    }

}

const productos:vistas_productos= {
    destacados: async (c: Context) => {
      try {
        const service = await Productos.productosDestacados();
        console.log(service);
        return c.json(service);     
      } catch (error) {
        console.log(error);
        return c.json({ estatus: 0, info: {
            message: "Ha ocurrido un error",
            error: error
        }});
      }  
    },
    //Llama y carga la vista de todos los productos que se tengan en al base de datos
    todos: async (c: Context) => {
        try {
            const seccion: string | undefined = c.req.query("section") || undefined;
            const busqueda: string | undefined = c.req.query("b") || undefined;
            const filtro: string | undefined = c.req.query("filtro") || undefined;
            let decodificada = decodeURIComponent(busqueda ?? "");
            decodificada = "%"+decodificada.split(" ").join("%")+"%";
            const pagina: number = parseInt(c.req.query("p") || "1");
            console.log(`Sección: ${seccion}\nBusqueda: ${decodificada}\nPagina: ${pagina}`)
            const productos = await Productos.mostrarTodos(decodificada, seccion, filtro, pagina, 12);
            console.log(productos)
            return c.json(productos)
        } catch (error) {
            return c.json({ estatus: 0, result: {
                info: "Error",
                error: error
            }})
        }
    },
    //Trae los datos del producto a buscar
    detalle: async (c: Context) => {
        try {
            const producto = c.req.param("producto");
            const detalles = await Productos.detalle(producto);
            return c.json(detalles)
        } catch (error) {
            return c.json({ estatus: 0, result: {
                info: "Error",
                error: error
            }})
        }
    },
    //Trae los productos que estan marcados como favoritos
    favoritos: async (c: Context) => {
        try {
            const { p } = c.req.query();
            const paginas: number = parseInt(p || "1");

            const peticion: Favoritos = new Favoritos(2);
            const resultado = await peticion.favorites(paginas, 10);

            return c.json(resultado);
        } catch (error) {
            console.log(error); 

            return c.json({
                estatus: 0,
                info: {
                    message: "Ha ocurrido un error: "+error,
                    data: {
                        productos: [],
                        pagina: 1,
                        cantidad: 10,
                        cantidadFavoritos: 0
                    }
                }
            });
        }
    }
}

const favoritos = {
    getFavs: async (c:Context) => {
        try {
            const session = JSON.parse(getCookie(c, 'usuario_cookie') || JSON.stringify({})); //Obtenemos la sesión del usuario para saber a quien le pertenece la cuenta
            const pagina: number = parseInt(c.req.query("p") || "1");
            console.log(session)
            const favoritos: Favoritos = new Favoritos(session.id);
            const resultados = await favoritos.favorites(pagina, 12);
            return c.json(resultados);
        } catch (error) {
            console.log(error);
            return c.json({ estatus: 0, result: {
                info: "Ha ocurrido un error",
                data: []
            }})
        }
    }
}
//Exportamos nuestros dos objetos que se usaran en las rutas
export {usuarios, productos, favoritos}