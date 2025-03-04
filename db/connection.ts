import { Client } from "https://deno.land/x/mysql/mod.ts";


const connection: Client=  new Client()

abstract class Consultas {
    protected db!: Client;
    constructor() { 
        this.initDB()
        .then( () => console.log("Si se conecta a la base de datos"))
        .catch( error => console.log(error));
    }

    public async initDB():Promise<void>{
        try {
            await connection.connect({
                hostname: "localhost",
                username: "root",
                db: "ecommerce",
                password: "Neto_616",
            })
            
            this.db = connection
        } catch (error) {
            console.log(error)
            return
        }
    }

    // private async getUsuarios(): Promise<any>{
    //     try {
    //         const dataTable = await this.db.execute("select * from usuarios");
    //         console.log(dataTable);
    //         return dataTable.rows;
    //     } catch (error) {
    //         console.log(error);
    //         return [];
    //     }
    // }
}


export default Consultas