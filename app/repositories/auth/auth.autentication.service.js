import { json } from 'express';
import ConexionBD from '../../db/oracledbconnector.js';
import genericResponse from '../../shared/response.js';
import Usuario from '../../entities/Usuario.js';
import { DatabaseErrorException, 
    InvalidCredentialsException, 
    Exception, 
    MethodNotImplementedException, 
    RecordNotFoundException,
    InvalidAccessException,
    InvalidTokenException} from '../../info/exceptions/exceptions.js';


/* Para creacion de tokens de autenticacion!!! */
//import DotEnv from 'dotenv';
import JWT from 'jsonwebtoken';

/*
//Configuring enviromental values
DotEnv.config();

//Check for early errors
if(DotEnv.error){
    throw DotEnv.error;
}
*/


/**
 * 
 * Funcion que realiza una revisión de credenciales de acceso
 * del usuario que hace la petición a recursos protegidos.
 * Esto lo hace examinando el encabezado http que incluya
 * el llamado 'token' entregado por esta api cuando el usuario
 * se autentica con sus credenciales.
 * 
 * En caso de que el token coincida y siga siendo válido, entonces
 * se continuará con la petición, y en caso contrario, se
 * finalizará con un objeto de error.
 * 
 * @param {Request} req Objeto con los datos de la petición
 * @param {Response} res Objeto para finalizar la petición en
 * caso de que se requiera
 * @param {function} next Funcion entregada por express para que 
 * la peticion siga su curso 
 */
function checkAutenticatedToken(req,res,next){

    var token = req.headers['feriavirtual-webapi-auth-token'];
    
    /**
     * TODO: Solo des-comentar cuando se requiera depurar los métodos de la API
     * sin necesidad de autenticarse con la misma!!!
     */
    //next();
    //console.log('Autenticando el token!!');
    //return;    

    if(token){

        //Hay token en las cabeceras de la peticion, vamos a desencriptarlo!!
        JWT.verify(token,process.env.FVWAPI_WEBTOKEN_SECRET_KEY,function(err,dec){

            if(err){
                
                //No se pudo desencriptar el token, no avanzaremos!
                res.status(400).json(new InvalidTokenException());

            } else {
                
                
                //Todo en regla, sigamos con la petición!
                req.token_usuario_id = dec.id;
                next();

            }

        });

    } else {

        res.status(403).json(new InvalidTokenException());
    }

}

export default {
    checkAutenticatedToken : checkAutenticatedToken
}
