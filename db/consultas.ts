//Importamos nuestra clase abstracta para la conexión a nuestra base de datos
import Consultas from "./connection.ts";

//Creamos nuestra clase Usuarios que va a heredar de Consultas esto nos permitira acceder a la función para conectar la bd
//y a la variable db para realizar nuestras consultas
class Usuarios extends Consultas{
    //Generamos un constructor con cada uno de los atributos que tendra nuestro objeto
    constructor(
        public nombre: string = "", 
        public apellidos:string = "",
        public correo: string = "",
        private contrasena: string = "",
        public whatsapp?: string,
    ){ 
        //Llamamos al metodo super para que podamos ingresar a los datos de la clase Consultas
        super(); 
    }
    //Metodo asincrono que nos permite crear usuarios
    public async crearUsuario() {
        try {
            if (!this.db) {  //Verificamos que exista una conexion
                await this.initDB();  // Asegurar que la conexión está lista
            }
            //Llamamos al procedimiento almacenado que crea usuarios en el primer parametro
            //En el segundo parametro en un arreglo necesitamos poner cada uno de los valores en orden
            //para que se llamen en nuestro procedimiento almacenado y unicamente
            //vamos a obtener el atributo rows que nos traer la función execute
            const {rows} = await this.db.execute(
                "call alta_usuarios(?, ?, ?, ?, ?)",
                [this.nombre, this.apellidos, (this?.whatsapp || ''), this.correo, this.contrasena])
            //Retornamos un estado y los resultados de la consulta
            return {estatus: 1, result: rows}
        } catch (error) {
            console.log("Paso un error: ", error)
            return {estatus:0, result: {info: error}}
        }
    }
    //Metodo asincrono que nos permite actualizar los datos del usuario que recibe un identificador
    public async actualizarUsuario(id: string) {
        try {
            //En caso de que db no este inicializado llamamos a su metodo initDB para asignarle un valor
            if(!this.db) await this.initDB();
            //Nuevamente ejecutamos el procedimiento almacenado actualizar_usuarios y obtendremos los datos
            //que nos traiga el procedimiento
            const {rows} = await this.db.execute(
                "call actualizar_usuarios (?, ?, ?, ?, ?);",
                [id, this.nombre, this.contrasena, this.apellidos, this.whatsapp]
            );
            //Retornamos un estado y los resultados de la consulta
            return {
                estatus: 1, 
                result: rows
            }

        } catch (error) {
            //En caso de algun error se imprimira en pantalla
            console.log(error);
            //Se retorna un estado con el cual se podra manejar los errores en otra parte
            return {estatus:0, result: {info: error}}
        }
    }
    //Metodo estatico y asincrono para verificar que el usuario existe y en parametro se le pasa el correo
    public static async isExist(correo: string){
        try {
            //En caso de que el correo no traiga datos se retornara un estado, un resultado vacio y la información respectiva
            if(!correo) return { estatus: 2, result: [], info: "No hay correo"};
            //Creamps una varaiable de tipo usuario para poder realizar la conexion a la base de datos
            const conectar = new Usuarios();
            //Verificamos que db tenga valor en caso contrario inicializamos la conexion a la bd para que este tenga valor nuevamente
            if(!conectar.db) await conectar.initDB();
            //Traemos los resultados de la consulta de cada uno de los renglones y tambien guardamos en el arreglo
            //el valor que queremos que este en el ?
            const {rows} = await conectar.db.execute(
                `SELECT * FROM usuarios where correo like ?;`,
                [correo]
            )
            //retornamos el estado de 1 que nos dice que todo estabien y tambien daremos los resultados que obtuvimos en la consulta
            return {
                estatus: 1, 
                result: rows
            };
        } catch (error) {
            //En caso de algun error imprimimos el error en pantalla
            console.log(error);
            //Retornamos el estado 0 y en el result no pondremos nada
            return {
                estatus: 0,
                result: []
            };
        }
    }
    //Metodo estatico y asincrono encargado del inicio de sesión de los usuarios
    //En los parametros recibiremos el correo y la contraseña que seran strings
    public static async iniciarSesion(correo: string, contrasena: string) {
        try {
            //Creamos una variable de tipo usuarios para poder acceder a la base de datos
            const conectar = new Usuarios();
            //En caso de db no tenga algun valor procederemos a iniciar la conexión a la base de datos
            if(!conectar.db) await conectar.initDB();
            //Obtenemos los resulatdos de la consulta y en el arreglo pondremos los datos que necesitamos para la misma
            const {rows} = await conectar.db.execute(
                "select * from usuarios where correo like ? and contrasena like ?",
                [correo, contrasena]
            );
            //Retornaremos un JSON con el estatus 1 y los resultados que se encontraron
            return {
                estatus: 1,
                result: {
                    result: rows || [],
                }
            };
        } catch (error) {
            //En caso de error lo imprimimos en consola
            console.log(error);
            //Retornamos un estado 0 por ser un error y en la información pondremos el error que tenemos
            return {
                estatus: 0, 
                result: {
                    info: error,
                    result: []
                }
            }
        }
    }
    //Metodo estatico y asincrono
    public static async eliminar(id:string){
        try {
            //Generamos nuestra constante del objeto usuario
            const conectar = new Usuarios();
            //En caso de que db este nulo o vacio inicializamos la conexión a la base de datos
            if(!conectar.db) await conectar.initDB();
            //Ejecutamos nuestra consulta para eliminar al usuario con el identificador que le pasamos por parametro
            await conectar.db.execute("delete from usuarios where id = ?", [id])
            //Retornamos el estado 1 y mencionamos que el usuario fue eliminado
            return {estatus: 1, result: {info: "Se elimino de manera correcta el usuario"}};
        } catch (error) {
            //En caso de algun error lo imprimimos en pantalla
            console.log(error);
            //Retornamos un estado de cero por ser un error
            return {estatus: 0, result: {info: error}};
        }
    }
}
//Creamos nuestra clase producto que hereda de consultas para poder realizar la conexión a la base de datos.
class Productos extends Consultas{
    //Generamos nuestro metodo constructor le avisamos que nuestro identificador puede o no tener valor y si lo tiene
    //sera un valor numerico
    constructor(private id?: number){
        //Llamamos a super para poder ingresar a los metodos que tenga consultas
        super();
    }
    //Metodo asincrono para poder visualizar la existencia que tenga el producto con el identificador que tengamos en el constructor
    public async hasExistence(): Promise<number>{
        try {
            //En caso de que db no tenga valor mandamos a llamar a initDB para que pueda incializar la conexion a la base de datos
            if (!this.db) await this.initDB();
            //Traemos los valores de la consulta que este traera la existencia que tenga X producto
            const [rows] = await this.db.query(
                `select existencia 
                from productos
                where id = ?`
            ,[this.id]);
            //Retornamos el valor de su existencia en caso de no tener existencia retornara un valor de cero
            return rows?.existencia || 0; 
        } catch (error) {
            //En caso de error se imprimira en pantalla el error
            console.log(error);
            //Se retorna un cero para evitar errores cuando se mande a llamar este metodo
            return 0;
        }
    }
    //Metodo estatico asincorno que trae el listado de los produtos
    public static async mostrarTodos(){
        try {
            const conectar = new Productos();
            if(!conectar.db) await conectar.initDB(); //Conectamos a base de datos
            //Nos quedamos unicamente con los resultados de la consulta que tengamos
            const { rows } = await conectar.db.execute("select * from productos;");
            //Retonramos un estado 1 y el listado de cada uno de los productos que se tengan en base de datos
            return {estatus: 1, result: {info: "Listado de productos", data: rows}};
        } catch (error) {
            //En caso de algun error se imprimira en pantalla  el error
            console.log(error);
            //Retornamos un estado de cero y ern caso del data le daremos un arreglo vacio
            return {estatus: 0, result: {info: error, data: []}};
        }
    }
    //Metodo estatico asincrono que trae los detalles del producto que este en el parametro
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
//Creamos una clase Carrito que hereda Consultas
class Carrito extends Consultas {
    //Creamos nuestro constructor con un atributo privado usuarioId para poder ingresar al carrito de nuestro usuario.
    constructor(private usuarioId: number){
        super();
    }
    //Creamos un getter para obtener nuestro atributo privado (No es necesario pero se deja)
    //retornara un valor numerico
    public getUsuarioId(): number {
        return this.usuarioId;
    }
    //Metodo asincrono para obtener tods los productos que el usuario tenga en el carrito
    public async carrito(){
        try {
            //Verificamos la conexion en caso de no tener la conexion a la base de datos en caso de no tener conexion 
            //realizara el metodo para conectar la base de datos
            if(!this.db) await this.initDB();
            //Obtenemos los datos de la vista creada que nos daran los productos que el usuario tenga almacenado en el carrito
            const { rows } = await this.db.execute(`select * from vista_carrito where id_usuario = ?;`, [this.getUsuarioId()]);
            //Retornamos un JSON con estado 1 y con los datos listados de los objetos
            return {
                estatus: 1,
                info: {
                    message: "Listado de todos los productos dentro del carrito: ",
                    data: rows || []
                }
            };
        } catch (error) {
            //En caso de error lo imprimimos en consola
            console.log(error);
            //Retornamos un JSON con estado cero y con el data de los arreglos vacios
            return {
                estatus: 0,
                info: {
                    message: "Ha ocurrido un error: "+error,
                    data: []
                }
            };
        }
    }
    //Metodo asincrono para añadir productos en el carrito
    //Donde el parametro que tenemos es el identificador del producto y la cantidad numerica
    public async addToCart(producto: number, cantidad: number) { 
        try {
            //Obtendremos la conexion a la base de datos
            if(!this.db) await this.initDB();
            //Inicializamos un objeto de tipo Productos
            const productoConsulta: Productos = new Productos(producto);
            //Obtenemos el numero de existencia que tiene el producto
            const hasExistence: number = await productoConsulta.hasExistence();
            //En caso de que hasExistence sea cero retornamos un estado en 2 dando a entender que el producto ya no tiene existencia
            if(!hasExistence) return {estatus: 2, result: {message: "El producto no tiene existencia"}};
            //Si la existencia que tiene el producto es menor a la cantidad que quieren obtener se avisara de eso
            if(hasExistence < cantidad) return {estatus: 3, result: {message: "La cantidad es mayor a la existencia que se tiene"}};
            //Se ejecuta el procedimiento almacenado para guardar los productos en el carrito o crear el pedido y almacenando el carrit
            await this.db.execute(
                `call guardar_carrito(?,?,?, @estatus, @mensaje)`,
                [this.getUsuarioId(), producto, cantidad]
            )
            //Una vez se ejecuta el procedimiento anterior obtenemos las variables de salida
            //que tiene el procedimiento almacenado anterior
            const [output] = await this.db.query(`select @estatus as estatus, @mensaje as mensaje`);

            //En caso de que el estado sea 2 retornaremos un JSON dando a entender que el ocurrio un error en sql 
            if(output.estatus === 2) return { estatus: 0, result: { message: "Ocurrio un error favor de intentarlo nuevamente mas tarde" }};
            //En caso contrario retornamos un JSON de estado 1 avisando que el producto se ha guardado de manera correcta
            else
                return {
                    estatus: 1, 
                    result: {
                        message: "El producto se ha guardado de manera exitosa"
                    }
                };
        } catch (error) {
            //De lo contrario imprimimos en consola el error
            console.log(error)
            //Retornamos un JSON con estado 0 y el mensaje de error
            return {
                estatus: 0,
                result: {
                    message: "Ha ocurrido un error: "+error
                }
            };
        }
    }
    //Metodo asincrono para actualizar el carrito
    public async updateCart(producto: number, action: string){
        try {
            //Creamos la conexion a la base de datos
            if(!this.db) await this.initDB();
            //Ejecutamos la consulta para poder actualizar los datos del mismo carrito
            await this.db.query(
                `call actualizar_carrito(?, ?, ?, @estatus, @mensaje)`,
                [this.getUsuarioId(), producto, action]);
            //Obtenemos las variables de salida
            const [output] = await this.db.query(`select @estatus as estatus, @mensaje as mensaje`);
            //En caso del que estado sea cero avisamos que ocurrio un error
            if(output.estatus === 0) return { estatus: 2, info: { message: "Ha ocurrido un error favor de intentarlo nuevamente" } };
            //En caso contrario retornamos un estado 1 avisando que todo ha salido bien
            return {
                estatus: 1, 
                info: {
                    message: "Se ha actualizado el carrito"
                }
            };
        } catch (error) {
            //En caso de error se imprime en consola
            console.log(error);
            //Retornamos el estado 0 y un mensaje de error
            return {
                estatus: 0,
                info: {
                    message: "Ha ocurrido un erorr: "+error
                }
            };
        }
    }
    //Metodo asincrono para borrar un producto del carrito
    public async deleteCart(producto: number){
        try {
            //Realizamos la conexion a la base de datos
            if(!this.db) await this.initDB();
            //Llamamos al procedimiento almacenado
            await this.db.execute(
                `call eliminar_carrito(?, ?, @estatus, @mensaje)`
                ,[this.getUsuarioId(), producto]);
            //Obtenemos las variables de salida
            const [output] = await this.db.query(`select @estatus as estatus, @mensaje as mensaje`);
            //En caso de que el estado sea 0 se avisara por medio de un JSON
            if(output.estatus === 0) return { estatus: 2, info: { message: "Ha ocurrido nu error favor de intentarlo de nuevo" }};
            //En caso contrario retornamos un JSON con estado 1 avisando que el producto se elimino bien del carrito
            return {
                estatus: 1,
                info: {
                    message: "Se elimino el producto del carrito"
                }
            };
        } catch (error) {
            //En caos de error este se imprimira en consola
            console.log(error);
            //Se retorna un JSON con estado 0 avisando sobre el error que se tiene
            return {
                estatus: 0,
                info: {
                    message: "Ha ocurrido un error: "+error
                }
            };
        }
    }
}
//Se exportan cada uno de los objetos creados en la parte superior y asi poder utilizarlos en otros archivos
export { 
    Usuarios, 
    Productos,
    Carrito
};