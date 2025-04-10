import { ResponseTimeoutError } from "https://deno.land/x/mysql@v2.12.1/src/constant/errors.ts";
import Consultas from "./connection.ts";

class Usuarios extends Consultas{
    constructor(
        public nombre: string = "", 
        public apellidos:string = "",
        public correo: string = "",
        private contrasena: string = "",
        public whatsapp?: string,
    ){ 
        super(); 
    }

    public async crearUsuario() {
        try {
            if (!this.db) { 
                await this.initDB();  // Asegurar que la conexión está lista
            }

            const {rows} = await this.db.execute(
                "call alta_usuarios(?, ?, ?, ?, ?)",
                [this.nombre, this.apellidos, (this?.whatsapp || ''), this.correo, this.contrasena])
            
            return {estatus: 1, result: rows}
        } catch (error) {
            console.log("Paso un error: ", error)
            return {estatus:0, result: {info: error}}
        }
    }

    public async actualizarUsuario(id: string) {
        try {
            if(!this.db) await this.initDB();
            const {rows} = await this.db.execute(
                "call actualizar_usuarios (?, ?, ?, ?, ?);",
                [id, this.nombre, this.contrasena, this.apellidos, this.whatsapp]
            )

            return {
                estatus: 1, 
                result: rows
            }

        } catch (error) {
            console.log(error);
            return {estatus:0, result: {info: error}}
        }
    }

    public static async iniciarSesion(correo: string, contrasena: string) {
        try {
            const conectar = new Usuarios();
            if(!conectar.db) await conectar.initDB();

            const {rows} = await conectar.db.execute(
                "select * from usuarios where correo like ? and contrasena like ?",
                [correo, contrasena]
            )

            return {
                estatus: 1,
                result: {
                    result: rows || [],
                }
            }
        } catch (error) {
            console.log(error);
            return {
                estatus: 0, 
                result: {
                    info: error,
                    result: []
                }
            }
        }
    }

    public static async eliminar(id:string){
        try {
            const conectar = new Usuarios();
            if(!conectar.db) await conectar.initDB();

            await conectar.db.execute("delete from usuarios where id = ?", [id])
            
            return {estatus: 1, result: {info: "Se elimino de manera correcta el usuario"}};
        } catch (error) {
            console.log(error);
            return {estatus: 0, result: {info: error}};
        }
    }
}

class Productos extends Consultas{
    constructor(){
        super();
    }

    public static async mostrarTodos(){
        try {
            const conectar = new Productos();
            if(!conectar.db) await conectar.initDB();

            const { rows } = await conectar.db.execute("select * from productos;");
            console.log("La consulta trajo: ", rows);
            return {estatus: 1, result: {info: "Listado de productos", data: rows}};
        } catch (error) {
            console.log(error);
            return {estatus: 0, result: {info: error}};
        }
    }

    public static async detalle(producto: string){
        try {
            const conectar = new Productos();
            if(!conectar.db) await conectar.initDB();

            const { rows } = await conectar.db.execute(
                "select * from productos where nombre like ? and estatus = 1",
                [producto]);

            console.log("Detalle del producto", rows);
            return {estatus: 1, result: {info: "Detalle de producto", data: rows}};
        } catch (error) {
            console.log(error);
            return {estatus: 0, result: {info: error}};
        }
    }
}

export { 
    Usuarios, 
    Productos 
};