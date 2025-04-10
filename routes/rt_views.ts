import { Context, Hono } from 'hono';
import { getCookie } from 'hono/cookie'
import { usuarios, productos }from '../controllers/ctrl_views.ts';

const route: Hono = new Hono()

route.get("/", usuarios.inicio);
route.get("/productos", productos.todos);
route.get("/detalle/:producto", productos.detalle);

export default route