// Importamos la libreria para poder conectarno a nuestra base de datos
// En este caso usaremos el objeto Client para poder realizar la conexion
import { DenoStdInternalError } from "https://deno.land/std@0.104.0/_util/assert.ts";
import { Client } from "https://deno.land/x/mysql/mod.ts";

//Inicializamos nuestra constante de tipo Client
const connection: Client=  new Client()

// Generamos una clase abstracta ya que no queremos que esta clase se llame y realice sus metodos sin estar heredado en algun otra clase
abstract class Consultas {
    // Generamos una propiedad db donde guardaremos la conexión a la base de datos esta estara protegida 
    // ya que no queremos que todos tengan acceso a esta propiedad y tambien avisamos que esa variable 
    // puede estar sin valor
    protected db!: Client;
    constructor() { 
        //Dentro de nuestro constructor llamamos al metodo oara inizializar la base de datos.
        this.initDB()
        .then( () => console.log("Si se conecta a la base de datos"))
        .catch( error => console.log(error));
    }
    //Creamos nuestro metodo que se encargará de inicializar la base de datos este metodo será asincrono
    //para mejor control de sus procesos mas adelante
    public async initDB():Promise<void>{
        //Generamos nuestro trycatch para asi tener mejor control sobre los posibles errores que se puedan tener dentro del proyecto
        try {
            //Llamamos a nuestra constante connection e ingresamos a su metodo connect y le damos los datos necesarios para poder realizar
            //la conexion que se espera
            await connection.connect({
                hostname: Deno.env.get("HOST"), //Nombre de donde se aloja la base de datos
                username: Deno.env.get("USR"),      //Nombre del usuario donde nos vamos a conectar
                db: Deno.env.get("DB"),       //Nombre de la base de datos a la que nos conectamos
                password: Deno.env.get("PASS"),  //Contraseña del usuario
            })
            
            this.db = connection    //Le damos a la propiedad db su valor que sera connection
        } catch (error) { //En caso de error ejecutara lo siguiente
            console.log(error)      //Imprimimos en consola el error que haya salido
            return                  //Retornamos un vacio para que pueda seguir con el ciclo demas del codigo
        }
    }

}

// Exportamos nuestra clase para que se pueda utilizar en otras clases
export default Consultas