import { Hono, Context } from 'hono';
import { deleteCookie } from 'hono/cookie'
import { usuarios, productos }from '../controllers/ctrl_views.ts';

const route: Hono = new Hono()

route.get("/", usuarios.inicio);
route.get("/user_exist", usuarios.existe);
route.get("/productos", productos.todos);
route.get("/detalle/:producto", productos.detalle);
route.get("/cerrar-sesion", (c: Context): Response => {
    try {
        deleteCookie(c, "usuario_cookie");
        return c.redirect("/");
    } catch (error) {
        console.log(error);
        return c.redirect("/");
    }
})

export default route