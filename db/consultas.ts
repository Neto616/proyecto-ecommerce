import Consultas from "./connection.ts";

class Usuarios extends Consultas{
    constructor(
        public nombre: string, 
        public apellidos:string,
        public correo: string,
        private contrasena: string,
        public whatsapp?: string,
    ){ 
        super(); 
    }

    public async crearUsuario(){
        try {
            if (!this.db) { 
                await this.initDB();  // Asegurar que la conexión está lista
            }

            const result = await this.db.execute(
                "call alta_usuarios(?, ?, ?, ?, ?)",
                [this.nombre, this.apellidos, this.whatsapp, this.correo, this.contrasena])
            
            console.log(result.rows)
        } catch (error) {
            console.log("Paso un error: ", error)
            return error            
        }
    }
}

export default Usuarios