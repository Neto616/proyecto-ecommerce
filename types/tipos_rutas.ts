import { Context } from 'hono';

// Dentro generamos los tipos de rutas que existen dentro de la API
// y definimos su nombre y lo que nos retornara dicha ruta

// Generamos un tipo que es un objeeto que dentro tendran funciones que retornan una promesa y su tipo en la mayoria Response
export type vistas_usuarios = {
    inicio: (c:Context) => Promise<any>,
    existe: (c:Context) => Promise<Response>,
    iniciar_sesion: (c:Context) => Promise<Response>
};

// Generamos el tipo que tendrarn las rutas que al igual que el anterior tendra funciones
export type vistas_productos = {
    todos: (c:Context) => Promise<Response>,
    destacados: (c:Context) => Promise<Response>,
    detalle: (c:Context) => Promise<Response>,
    favoritos: (c:Context) => Promise<Response>,
};

// Generamos el tipo que tendrarn las rutas que al igual que el anterior tendra funciones
export type controladores_usuario = {
    crear:      (c:Context) => Promise<Response>,
    actualizar: (c:Context) => Promise<Response>,
    eliminar:   (c:Context) => Promise<Response>,
    iniciar_sesion: (c: Context) => Promise<Response>
};
// Generamos el tipo que tendrarn las rutas que al igual que el anterior tendra funciones
export type controladores_productos = {
};

// Generamos el tipo que tendrarn las rutas que al igual que el anterior tendra funciones
export type controladores_carrito = {
    guardar: (c:Context)    => Promise<Response>,
    eliminar: (c:Context)   => Promise<Response>
};

// Generamos el tipo que tendrarn las rutas que al igual que el anterior tendra funciones
export type controladores_favoritos = {
    decideAction: (c: Context) => Promise<Response>,
}