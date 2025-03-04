import { Hono } from 'hono'
import usuarios from '../controllers/ctrl_views.ts';


const route: Hono = new Hono()


route.get("/", usuarios.inicio)


export default route