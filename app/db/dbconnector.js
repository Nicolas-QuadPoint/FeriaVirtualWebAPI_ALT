/**
 * DBConnector
 * 
 * Clase base para los conectores a distintas base de datos,
 * utilizando una interfaz lo más genérica posible.
 * 
 * TODO: Crear versiones 'promesa' para estas funciones.
 * 
 */
class DBConnector {

    /**
     * Una variable especial que define tipos básicos 
     * para que los usuarios de las implementaciones de 
     * esta clase las utilicen en lugar de las específicas de 
     * las librerías de base de datos.
     */
    static dbTypes = {

        NUMBER : "NUMBER",
        INT: "INT",
        VARCHAR : "VARCHAR",
        CHAR : "CHAR",
        DATE : "DATE",
        DATETIME : "DATETIME",
        TIMESTAMP : "TIMESTAMP"
    
    };

    /**
     * Constructor que solo inicializa la variable conn, 
     * que debe ser usada pór las implementaciones para 
     * almacenar la conexión a la base de datos, y así realizar 
     * operaciones sobre esta. Cabe destacar que una conexión 
     * no tiene que ser estática en el tiempo, sino que su 
     * duración sea atómica (o solo para una petición) en lo 
     * posible. Este comportamiento será controlado por las 
     * implementaciones. 
     */
    constructor(){
        this.conn = '';
    }

    /**
     * Crea una nueva conexión para esta instancia. 
     * 
     * @param {Function} callbackToSQL funcion utilizada 
     * para actuar inmediatamente después de crearse la conexión. 
     * puede tambien ser utilizada para controlar el estado de 
     * la misma si llega a fallar. 
     */
    newConnection(callbackToSQL){
        this.conn = 'Connection';
    }

    /**
     * Cierra la conexión actual a demanda del usuario. 
     * Las implementaciones pueden finalizar la misma si es 
     * necesario. 
     */
    closeConnection(){
        console.log('DBConnector.closeConnection');
    }

    /**
     * Método que invoca un procedimiento almacenado en la 
     * conexión de base de datos creada. Cabe destacar que esto 
     * funcionará solamente si la conexión es válida, y el 
     * comportamiento de esto será diferente dependiendo de la 
     * implementación. 
     * 
     * @param {String} spName El nombre del procedimiento almacenado, cuya 
     * sintaxis varía dependiendo de la implementación.
     * @param {Object} params Objeto que encapsula variables para realizar 
     * el llamado 'binding' de variables. Necesarios para evitar insertar 
     * valores de forma arbirtraria en spName. La estructura de este objeto 
     * variará dependiendo de la implementación. 
     * @param {Object} options Objeto que contiene opciones adicionales que 
     * cambian el comportamiento de la ejecución del procedimiento almacenado, 
     * dependientes de la implementación. 
     * @param {Function} callback Funcion que será ejecutada por la implementación
     * en caso de que hayan resultados o errores en la consulta. Al igual que 
     * las anteriores, su estructura dependerá de la implementación.
     */
    executeStoredProcedure(spName,params,options,callback){
        console.log('DBConnector.executeStoredProcedure');
    }

    /**
     * Método que permite ejecutar una consulta sql como tal, con 
     * su sintaxis y demás. La estructura de la misma variará 
     * dependiendo de la implementación, y al igual que 
     * executeStoredProcedure, permite el 'binding' de variables. 
     * 
     * @param {String} query La consulta como tal.
     * @param {Object} params Objeto con los parámetros para enlazar a 
     * la consulta. Su estructura depende de la implementación. 
     * @param {Object} options Objeto con opciones adicionales para 
     * cambiar el comportamiento de la consulta. Dependiente de la 
     * implementación. 
     * @param {Function} callback Función llamada desde la 
     * implementación para procesar resultados o errores. 
     */
    executeQuery(query,params,options,callback){
        console.log('DBConnector.executeQuery');
    }

}



export default DBConnector;