import { Client } from "https://deno.land/x/mysql/mod.ts";
import mysql from "npm:mysql2@^2.3.3/promise";


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
            // await mysql.createPool({
            //     host: "localhost",
            //     user: "root",
            //     database: "ecommerce",
            //     password: "Neto_616",
            //     waitForConnections: true,
            //     connectionLimit: 10,
            //     maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
            //     idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
            //     queueLimit: 0,
            //     enableKeepAlive: true,
            //     keepAliveInitialDelay: 0,
            // });
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

}


export default Consultas