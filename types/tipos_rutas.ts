import { Context } from 'hono';

// Dentro generamos los tipos de rutas que existen dentro de la API
// y definimos su nombre y lo que nos retornara dicha ruta
export type vistas_usuarios = {
    inicio: (c:Context) => Promise<Response>,
    existe: (c:Context) => Promise<Response>,
    iniciar_sesion: (c:Context) => Promise<Response>
};

export type vistas_productos = {
    todos: (c:Context) => Promise<Response>,
    detalle: (c:Context) => Promise<Response>,
};

export type controladores_usuario = {
    crear:      (c:Context) => Promise<Response>,
    actualizar: (c:Context) => Promise<Response>,
    eliminar:   (c:Context) => Promise<Response>,
    iniciar_sesion: (c: Context) => Promise<Response>
};

export type controladres_productos = {
    favorito: (c: Context) => Promise<Response>,
    agregar_carrito: (c: Context) => Promise<Response>
};