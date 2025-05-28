import { load } from 'https://deno.land/std/dotenv/mod.ts';
import { Client } from "https://deno.land/x/mysql/mod.ts";

// Inicializamos nuestra constante de tipo Client
const connection = new Client();

// Generamos una clase abstracta
abstract class Consultas {
  // Propiedad para la conexión a la base de datos
  protected db!: Client;

  constructor() {
    // Llamamos al método para inicializar la base de datos.
    this.initDB()
      .then(() => console.log("Conexión a la base de datos establecida"))
      .catch((error) =>
        console.error("Error al conectar a la base de datos:", error)
      );
  }

  // Método para inicializar la base de datos (asíncrono)
  public async initDB(): Promise<void> {
    try {
      // Carga las variables de entorno desde .env
      const env = await load({
        envPath: "./.env", // Especifica la ruta al archivo .env
        export: true,  // Exporta las variables al entorno de Deno
      });

      const hostname = env.HOST || "localhost";
      const username = env.USR || "root";
      const database = env.DB || "ecommerce";
      const password = env.PASS || "12345";
      const port = env.PORT || "3306";

      if (!hostname || !username || !database || !password) {
        throw new Error(
          "Error: Las variables de entorno HOST, USR, DB y PASS deben estar definidas en el archivo .env.",
        );
      }

      // Conecta a la base de datos
      await connection.connect({
        hostname,
        username,
        db: database,
        password,
        port: port ? parseInt(port, 10) : undefined,
      });

      this.db = connection;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

// Exportamos nuestra clase
export default Consultas;
