import { Hono } from "hono";
import usuarios_abc from "../controllers/ctrl_controllers.ts";

const route: Hono= new Hono()

route.post("/crear-usuario", usuarios_abc.crear)

export default route