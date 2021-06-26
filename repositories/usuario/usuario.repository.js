import ConexionBD from '../../db/oracledbconnector.js';
import Ora from 'oracledb';
import ex from '../../info/exceptions/exceptions.js';
import Usuario from '../../entities/Usuario.js';
import ResultadoID from '../../entities/ResultadoID.js';
import ObjetoCambiarContrasena from '../../entities/ObjetoCambiarContrasena.js';

/**
 * UsuarioRepository
 * 
 * Clase que contiene las operaciones que trabajan con usuarios.
 * Todas las rutinas están protegidas, requiriendo autenticación 
 * previa.
 * 
 * @see {Usuario}
 * @param {Object} conexion Objeto sin uso que no debe tomarse en cuenta 
 * por ahora.
 * @return Una instancia de UsuarioRepository.
 */
function UsuarioRepository(conexion){

    /* Metodos de clase */

    /**
     * 
     * Función que permite crear un usuario, obteniendo los datos desde 
     * el cuerpo de la petición, en forma de objeto JSON de Usuario.
     * Si la inserción en la base de datos falla, entonces un objeto 
     * Exception es devuelto al cliente, junto con su código http 
     * dependiendo del error generado.
     * 
     * Pero si la inserción es exitosa, un objeto ResultadoID es 
     * devuelto, que incluye el ID del objeto usuario recién creado. 
     * 
     * 
     * @param {Request} req Objeto entregado por express para obtener datos 
     * de la petición.
     * @param {Response} res Objeto entregado por express para responder la 
     * petición.
     */
    function nuevoUsuario(req,res){

        try {

            throw ex.MethodGoneException();

        } catch(e) {

            if(e instanceof ex.Exception)
                res.status(e.code).json( e );
            else
                res.status(500).json( new ex.APIException() );

            console.error(`Pasó algo!: ${e}`);

        }

    }

    /**
     * 
     * Función interceptor que se mete en el medio de toda petición que 
     * tenga /usuarios/:usuarioid en su ruta. Busca al usuario en la base 
     * de datos cuya ID proporcionada por :usuarioid corresponda con un 
     * registro almacenado.
     * 
     * @param {Request} req Objeto entregado por express para obtener datos 
     * de la petición.
     * @param {Response} res Objeto entregado por express para responder la 
     * petición.
     * @param {Function} next Función que permite continuar con la petición.
     */
    function interceptarUsuarioPorID(req,res,next){

        try {

            var bd = new ConexionBD();
            var usuarioid = Number(req.params.usuarioid);;

            if(req.params.usuarioid && !isNaN(usuarioid)){

                console.log('[GetUsuarioID]: ',usuarioid);
                
                var parametros = {
                    
                    idUsuario:{ name:'idUsuario', type: Ora.NUMBER, val: usuarioid, dir: ConexionBD.dbTypes.IN },
                    datos_usuario:{name:'datos_usuario', type: Ora.CURSOR, dir: ConexionBD.dbTypes.OUT }
                };
                
                bd.executeStoredProcedure('BUSCAR_USUARIO_ID', parametros,{},

                    function (e,result) {
                                                
                        if(e) { //Hay error?

                            var exception = new ex.DatabaseErrorException();
                            res.status(exception.code).json(exception.message);
                            console.error(`Un error!: ${e.message}`);

                        }
                        else if(result && result.outBinds){ 

                            
                             //Recuperamos los cursores!
                            var cursor_datos_usuario = result.outBinds.datos_usuario;
                        
                            //Este cursor SIEMPRE tendrá una fila!
                            cursor_datos_usuario.getRows(1,function(err,fila_usuario){
                                
                                if(fila_usuario[0]){

                                    /**
                                     * Aquí construyo el objeto de Ventas!!!
                                     */
                                    var usuarioRetornado = new Usuario();
                                    console.log(fila_usuario);
                                    usuarioRetornado.buildFromArray(fila_usuario[0]);
                                    req.data = usuarioRetornado;
                                    next();

                                } else {

                                    if(err){console.log(err);}
                                    res.status(404).json(new ex.RecordNotFoundException());

                                }

                                /** Cerramos el cursor cursor_datos_usuario */
                                cursor_datos_usuario.close(function(err){});

                            });

                        } else {
                            
                            res.status(404).json( new ex.RecordNotFoundException() );

                        }

                    }    
                );

            } else {

                throw ex.Exception.new(400,'ClientException','Debe indicar el parametro <usuarioid>, y tiene que ser numérico');

            }


        } catch(e){

            res.status(400).json(e);
        }
    }

    /**
     * 
     * Utiliza el resultado de la función interceptora interceptarUsuarioPorID
     * y retorna el resultado (éxito o fallo) que se obtuvo.
     * 
     * @param {Request} req Objeto entregado por express para obtener datos 
     * de la petición.
     * @param {Response} res Objeto entregado por express para responder la 
     * petición.
     */
    function getUsuario(req,res){

        res.status(200).json(req.data);
    }

    /**
     * 
     * Función que busca y retorna un array de objetos Usuario en forma 
     * de JSON, que correspondan a todos los registros de usuarios en la 
     * base de datos. 
     * 
     * @param {Request} req Objeto entregado por express para obtener datos 
     * de la petición.
     * @param {Response} res Objeto entregado por express para responder la 
     * petición.
     */
    function getUsuarios(req,res){
        
        try {

            var bd = new ConexionBD();
			var parametros = {
				datos_usuario:{name:'datos_usuario', type: Ora.CURSOR, dir: ConexionBD.dbTypes.OUT }
			};

            bd.executeStoredProcedure('OBTENER_USUARIO_SP', parametros,{},

				function (e,result) {

					if(e) {

						console.error("Un error!: %s",e.message);
						res.status(500).json( new DatabaseErrorException() );

					} else if(result && result.outBinds){
						
						let cursor_datos_usuario = result.outBinds.datos_usuario;
						cursor_datos_usuario.getRows(65535,function(err,filas_usuario){
							
							//console.log(fila_usuario);
							var arr_usuarios = [];
							
							if(err){
								res.status(500).json(new DatabaseErrorException());
							}
							else if(filas_usuario[0]){
								
								filas_usuario.forEach(function(usu,index,arr){
									
									var u = new Usuario();
									u.buildFromArray(usu);
									arr_usuarios.push(u);
									
								});				
								
								res.status(200).json( { usuarios: arr_usuarios } );

							} else {

								res.status(401).json(new ex.RecordNotFoundException());
							}
							
							cursor_datos_usuario.close(function(err){});

						});

						
					} else {

						res.status(401).json( new ex.RecordNotFoundException() );

					}

				}

			);

        } catch(e) {

            res.status(401).json( e );

        }


    }

    /**
     * 
     * TODO: Agregar la lógica necesaria para modificar el usuario entregado 
     * en el cuerpo de la petición. Ahora mismo no hace nada.
     * 
     * @param {Request} req Objeto entregado por express para obtener datos 
     * de la petición.
     * @param {Response} res Objeto entregado por express para responder la 
     * petición.
     */
    function modificarUsuario(req,res){

        try {

            throw new ex.MethodNotImplementedException();

        } catch(e) {

            res.status(e.code).json( e );

        }


    }

    /**
     * 
     * Función que permite cambiar la contraseña del usuario con los datos 
     * entregados en el cuerpo de la petición. La contraseña será cifrada en 
     * la base de datos, por lo que una reauntenticación por parte del cliente 
     * sería recomendable.
     * TODO: Hacer que la sesión del usuario se cierre (si el usuario que se 
     * cambia la contraseña es el mismo), invalidando el token.
     * 
     * @param {Request} req Objeto entregado por express para obtener datos 
     * de la petición.
     * @param {Response} res Objeto entregado por express para responder la 
     * petición.
     */
    function cambiarContrasenaUsuario(req,res){

        try {
            
            var bd = new ConexionBD();
            var objCambiarContrasena = new ObjetoCambiarContrasena();
            var p_exito = 0;

            objCambiarContrasena.clone(req.body,true);

            if(!objCambiarContrasena.validate()){
                throw new ex.InvalidArgumentException();
            }

            console.log(objCambiarContrasena);

            var parametros = {
                p_usuario_id :{ name:'p_usuario_id', type: ConexionBD.dbTypes.INT, val: objCambiarContrasena.id_usuario, dir: ConexionBD.dbTypes.IN },
                p_contrasena :{ name:'p_contrasena', type: ConexionBD.dbTypes.VARCHAR, val: objCambiarContrasena.nueva_contrasena, dir: ConexionBD.dbTypes.IN },
                exito :{ name:'exito', type: ConexionBD.dbTypes.INT, val: p_exito, dir: ConexionBD.dbTypes.INOUT }
            };

            bd.executeStoredProcedure('pkg_usuario.proc_cambiar_contrasena_usuario', parametros,
                { outFormat : Ora.OUT_FORMAT_ARRAY },

                function (e,result) {
                                            
                    if(e) { //Hay error?

                        var exception = new ex.DatabaseErrorException();
                        res.status(exception.code).json(exception);
                        console.error(`Un error!: ${e.message}`);

                    }
                    else if(result && result.outBinds){

                        var resultadoid = new ResultadoID();
                        resultadoid.id_resultado = result.outBinds.exito;

                        res.status(200).json( resultadoid );
                        

                    } else {
                        
                        res.status(404).json( new ex.OperationFailedException() );

                    }

                }    
            );

        } catch(e) {
            console.log(e);
            res.status(401).json( e );

        }

    }

    /**
     * 
     * Función que deshabilita (o bloquea) un usuario para que no vuelva 
     * a acceder al sistema. Ahora mismo no hace nada.
     * TODO: Hacer que la sesión del usuario se cierre (si el usuario que se 
     * cambia la contraseña es el mismo), invalidando el token.
     * 
     * @param {Request} req Objeto entregado por express para obtener datos 
     * de la petición.
     * @param {Response} res Objeto entregado por express para responder la 
     * petición.
     */
    function deshabilitarUsuario(req,res){

        try {

            throw new ex.MethodNotImplementedException();

        } catch(e) {

            res.status(401).json( e );

        }


    }

    /* Campos de clase */
    return {
        //Funciones interceptoras
        interceptarUsuarioPorID,
        //Funciones GET
        getUsuario,
        getUsuarios,
        //Funciones POST
        nuevoUsuario,
        cambiarContrasenaUsuario,
        //Funciones PUT
        modificarUsuario,
        //Funciones DELETE
        deshabilitarUsuario
    };
}

export default UsuarioRepository;