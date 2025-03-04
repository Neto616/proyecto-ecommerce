import { Context } from 'hono';

export type vistas_usuarios = {
    inicio: (c:Context) => Promise<Response>
}

export type controladores_usuario = {
    crear:      (c:Context) => Promise<Response>,
    actualizar: (c:Context) => Promise<Response>,
    eliminar:   (c:Context) => Promise<Response>,
}