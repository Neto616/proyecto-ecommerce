import { Context } from 'hono';

// Dentro generamos los tipos de rutas que existen dentro de la API
// y definimos su nombre y lo que nos retornara dicha ruta
export type vistas_usuarios = {
    inicio: (c:Context) => Promise<any>,
    existe: (c:Context) => Promise<Response>,
    iniciar_sesion: (c:Context) => Promise<Response>
};

export type vistas_productos = {
    todos: (c:Context) => Promise<Response>,
    destacados: (c:Context) => Promise<Response>,
    detalle: (c:Context) => Promise<Response>,
    favoritos: (c:Context) => Promise<Response>,
};

export type controladores_usuario = {
    crear:      (c:Context) => Promise<Response>,
    actualizar: (c:Context) => Promise<Response>,
    eliminar:   (c:Context) => Promise<Response>,
    iniciar_sesion: (c: Context) => Promise<Response>
};

export type controladores_productos = {
};

export type controladores_carrito = {
    obtener: (c:Context)    => Promise<Response>,
    guardar: (c:Context)    => Promise<Response>,
    actualizar: (c:Context) => Promise<Response>
};

export type controladores_favoritos = {
    decideAction: (c: Context) => Promise<Response>,
}