import ConexionBD from '../../db/oracledbconnector.js';
import Ora from 'oracledb';
import ex from '../../info/exceptions/exceptions.js';
import util from '../../utilities/utilities.js';

/* Información de entidades! */
import Entities from '../../entities/entities.js';

/**
 * InfoRepository
 * 
 * Contiene las operaciones de acceso para obtener 
 * información sobre tanto la estructura como algunos 
 * valores para distintos objetos entidad en la web api. 
 * 
 * Estas operaciones no son protegidas, por lo que 
 * cualquier usuario no autenticado tiene acceso a estos 
 * datos.
 * 
 * @param {Object} conexion Objeto sin usar que no debe tomarse 
 * en cuenta por ahora.
 * @return Una instancia de la clase InfoRepository
 */
function InfoRepository(conexion){

    /**
     * 
     * Funcion que ahorra unas cuantas líneas de código.
     * Permite realizar una petición a la base de datos requiriendo información
     * de forma genérica, procesando datos y creando objetos envoltorios para
     * dichos datos.
     * 
     * Finalmente, independiente del resultado, esta función finaliza la petición,
     * entregando los datos, o el objeto de error, de regreso al cliente.
     * 
     * @param {String} qry La consulta a hacer en la base de datos. 
     * @param {Object} tipo Definición de un tipo que extienda de Entity para crear objetos de este.
     * @param {String} claveResultado Una cadena que haga de 'key' para el array donde 
     * se almacenarán los resultados obtenidos. 
     * @param {Request} req Objeto entregado por express para obtener datos de petición
     * @param {Response} res Objeto entregado por express para responder a la petición.
     * 
     * @see Entity
     */
    function simpleRequestManager(qry,tipo,claveResultado,req,res){
        
        try {

            var resultados = [];
            
            util.oraSimpleQueryRequestHandler(
                qry,{},
                resultados,tipo,function(error,success){

                    if(error){
                        console.error(`Algo paso en simpleRequestManager!!: ${error}`);
                        res.status(500).json(new ex.DatabaseErrorException());
                    }
                    else if(success){

                        var respuesta = {};

                        respuesta[claveResultado] = resultados;

                        res.status(200).json( respuesta );

                    } else {
                        res.status(404).json(new ex.RecordNotFoundException());
                    }

                }
            );

        } catch(e) {
            res.status(500).json(new ex.APIException());
            console.error(`Algo paso en simpleRequestManager!!: ${e}`);
        }
        
    }

    /**
     * 
     * Esta funcion es la que corresponde a la ruta
     * /api-objects/:objectid.
     * 
     * A partir del valor entregado para :objectid, se genera
     * una respuesta que contenga información de la estructura de la 
     * clase entidad indicada, en forma de JSON, y la entrega al cliente.
     * 
     * 
     * @param {Request} req Objeto pasado por express para 
     * obtener datos de la petición.
     * @param {Response} res Objeto pasado por express para 
     * responder la petición.
     */
    function getAPIObjects(req,res){

        /* Con esto se ayuda a evitar cosas maliciosas! */
        var expresionSoloLetras = /^[A-Za-z0-9]{1,}$/;

        try {
            
            console.log(`Objeto a pedir: ${req.params.objectid}`);

            /**
             * TODO: ESTO ES PELIGROSO. NO USAR ESTE MÉTODO PARA BUSCAR EN PRODUCCIÓN!!!
             */
            if(req.params.objectid && expresionSoloLetras.test(req.params.objectid)){

                res.status(200).json(new Entities[req.params.objectid]());

            } else {

                res.status(400).json(new ex.InvalidArgumentException());

            }
            
        } catch(e) {

            console.error(`Paso algo!: ${e}`);

            if(e instanceof TypeError){

                res.status(404).json( new ex.RecordNotFoundException() );

            } else {

                res.status(500).json( new ex.APIException() );
                
            }

        }

    }

    /**
     * 
     * Permite obtener valores de nacionalidades en forma de
     * JSON al cliente. Esto es útil para llenar comboboxes o
     * demás.
     * 
     * @param {Request} req Objeto pasado por express para 
     * obtener datos de la petición.
     * @param {Response} res Objeto pasado por express para 
     * responder la petición.
     */
    function getNacionalidades(req,res){
        simpleRequestManager('select * from table( pkg_info.func_get_nacionalidades() )',
        Entities.Nacionalidad,'nacionalidades',req,res);
    }

    /**
     * 
     * Permite obtener valores de estados de usuario, en forma de
     * JSON, al cliente. Esto es útil para llenar comboboxes o
     * demás.
     * 
     * @param {Request} req Objeto pasado por express para 
     * obtener datos de la petición.
     * @param {Response} res Objeto pasado por express para 
     * responder la petición.
     */
    function getEstadosContrato(req,res){
        simpleRequestManager('select * from table( pkg_info.func_get_estados_contrato() )',
        Entities.ParClaveValor,'valores',req,res);
    }

    /**
     * 
     * Permite obtener valores de estados de usuario en forma de
     * JSON al cliente. Esto es útil para llenar comboboxes o
     * demás.
     * 
     * @param {Request} req Objeto pasado por express para 
     * obtener datos de la petición.
     * @param {Response} res Objeto pasado por express para 
     * responder la petición.
     */
    function getEstadosUsuario(req,res){
        simpleRequestManager('select * from table( pkg_info.func_get_estados_usuario() )',
        Entities.ParClaveValor,'valores',req,res);
    }

    /**
     * 
     * Permite obtener valores de estados de venta en forma de
     * JSON al cliente. Esto es útil para llenar comboboxes o
     * demás.
     * 
     * @param {Request} req Objeto pasado por express para 
     * obtener datos de la petición.
     * @param {Response} res Objeto pasado por express para 
     * responder la petición.
     */
    function getEstadosVenta(req,res){
        simpleRequestManager('select * from table( pkg_info.func_get_estados_venta() )',
        Entities.ParClaveValor,'valores',req,res);
    }

    /**
     * 
     * Permite obtener valores de estados de subasta en forma de
     * JSON al cliente. Esto es útil para llenar comboboxes o
     * demás.
     * 
     * @param {Request} req Objeto pasado por express para 
     * obtener datos de la petición.
     * @param {Response} res Objeto pasado por express para 
     * responder la petición.
     */
    function getEstadosSubasta(req,res){
        simpleRequestManager('select * from table( pkg_info.func_get_estados_subasta() )',
        Entities.ParClaveValor,'valores',req,res);
    }

    /**
     * 
     * Permite obtener valores de tipos de producto en forma de
     * JSON al cliente. Esto es útil para llenar comboboxes o
     * demás.
     * 
     * @param {Request} req Objeto pasado por express para 
     * obtener datos de la petición.
     * @param {Response} res Objeto pasado por express para 
     * responder la petición.
     */
    function getTiposProducto(req,res){
        simpleRequestManager('select * from table( pkg_info.func_get_tipos_producto() )',
        Entities.ParClaveValor,'valores',req,res);
    }

    /**
     * 
     * Permite obtener valores de tipos de subasta en forma de
     * JSON al cliente. Esto es útil para llenar comboboxes o
     * demás.
     * 
     * @param {Request} req Objeto pasado por express para 
     * obtener datos de la petición.
     * @param {Response} res Objeto pasado por express para 
     * responder la petición.
     */
    function getTiposSubasta(req,res){
        simpleRequestManager('select * from table( pkg_info.func_get_tipos_subasta() )',
        Entities.ParClaveValor,'valores',req,res);
    }

    /**
     * 
     * Permite obtener valores de tipos de venta en forma de
     * JSON al cliente. Esto es útil para llenar comboboxes o
     * demás.
     * 
     * @param {Request} req Objeto pasado por express para 
     * obtener datos de la petición.
     * @param {Response} res Objeto pasado por express para 
     * responder la petición.
     */
    function getTiposVenta(req,res){
        simpleRequestManager('select * from table( pkg_info.func_get_tipos_venta() )',
        Entities.ParClaveValor,'valores',req,res);
    }

    /**
     * 
     * Permite obtener valores de roles de usuario en forma de
     * JSON al cliente. Esto es útil para llenar comboboxes o
     * demás.
     * 
     * @param {Request} req Objeto pasado por express para 
     * obtener datos de la petición.
     * @param {Response} res Objeto pasado por express para 
     * responder la petición.
     */
    function getRolesUsuario(req,res){
        simpleRequestManager('select * from table( pkg_info.func_get_roles_usuario() )',
        Entities.ParClaveValor,'valores',req,res);
    }

    /* Campos de clase */
    return {
        getAPIObjects,
        getNacionalidades,
        getEstadosContrato,
        getEstadosUsuario,
        getEstadosVenta,
        getEstadosSubasta,
        getTiposProducto,
        getTiposSubasta,
        getTiposVenta,
        getRolesUsuario
    };
}

export default InfoRepository;