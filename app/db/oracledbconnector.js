//Importing modules
import Ora from 'oracledb';
import dotenv from 'dotenv';
import DBConnector from './dbconnector.js';

//Configuring enviromental values
dotenv.config();
/*
//Check for early errors
if(dotenv.error){
    throw dotenv.error;
}
*/

//Con esto, los resultados serán mostrados como Arrays.
//Si quieres objetos JSON, entonces pon OUT_FORMAT_OBJECT
Ora.outFormat = Ora.OUT_FORMAT_ARRAY;

// Información de conector para una base de datos Oracle.
/*
const oraconfig = {
    user          : process.env.DB_USER,
    password      : process.env.DB_USER_PASSWD,
    connectString : process.env.DB_SERVER
};
*/

const oraconfig = {
    user          : process.env.FVWAPI_DB_USER,
    password      : process.env.FVWAPI_DB_USER_PASSWD,
    connectString : process.env.FVWAPI_DB_SERVER
};

function describeConnection(connection){
	console.log(
	`Objeto connection:
    Current schema: ${connection.currentSchema}
    Version: ${connection.oracleServerVersionString}`
	
	);
}


/**
 * OraDBConnector
 * 
 * Implementación de DBConnector, orientado a 
 * una conexión a una base de datos Oracle. 
 */
class OraDBConnector extends DBConnector{

    static dbTypes = {
        CHAR : Ora.DB_TYPE_CHAR,
        INT : Ora.DB_TYPE_NUMBER,
        VARCHAR : Ora.DB_TYPE_VARCHAR,
        DATE : Ora.DB_TYPE_DATE,
        DATETIME : Ora.DB_TYPE_DATE,
        TIMESTAMP : Ora.DB_TYPE_TIMESTAMP,
        IN : Ora.BIND_IN,
        OUT : Ora.BIND_OUT,
        INOUT : Ora.BIND_INOUT
    };
    
    newConnection(callbackToSQL){
    
        try {
    
            this.conn = Ora.getConnection(oraconfig,callbackToSQL);
    
    
        } catch(e) {
    
            console.error(error.errorNum,error.message)
    
        }
        
    }

    closeConnection(){

        try {
            
            this.conn.close();

        } catch(e){

            console.error("Un error en OracleDBConnector!: %s",e.message);

        }
    
    }

    executeStoredProcedure(spName,params,options,callback){
    
        this.newConnection(
    
            (e,connection) => {
    
                var data = [];
                var dataset = [];
                var resultset = 0;
                var strparams = "";
				
				if(e){
					console.log(`Error en OracleDBConnector!: ${e}`);
					callback(e,null);
				} else {
					
					//describeConnection(connection);
					
					//Iterando por items del objeto
					//https://attacomsian.com/blog/javascript-iterate-objects
					for (const key in params) {
						strparams = strparams.concat(`:${key},`);
					}

					//Quito la coma al final del string en caso de
					//https://stackoverflow.com/a/36630251
					strparams = strparams.replace(/.$/,"");                

					//console.log(`Params: ${strparams}`);
					
					//Se ejecuta la accion
					//Aqui uso interpolacion de cadenas para simular un tipico bloque de ejecucion
					//https://www.w3docs.com/snippets/javascript/how-to-do-string-interpolation-in-javascript.html
					connection.execute(
					   `BEGIN 
							${spName}(${strparams});
						END;`,
						params,
						options,
						callback
					);
						
				}
                    
            }
        );
        
    }

    executeQuery(query, params, options, callback){
    
        this.newConnection(
    
            (e,connection) => {
    
                var data = [];
                var dataset = [];
                var resultset = 0;
                var strparams = "";
				
				if(e){
					console.log(`Error en OracleDBConnector!: ${e}`);
					callback(e,null);
				} else {

					//Se ejecuta la accion
					connection.execute(query,params,options,callback);
					
				}
    
            }
        );
    
    }
    
}

export default OraDBConnector;
