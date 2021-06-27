import ConexionBD from '../../db/oracledbconnector.js';
import utility from '../../utilities/utilities.js';
import genericResponse from '../../shared/response.js';
import ex from '../../info/exceptions/exceptions.js';
import ObjetoVentaSimple from '../../entities/ObjetoVentaSimple.js';
import Venta from '../../entities/Venta.js';
import Ora from 'oracledb';
import ParProductoCantidad from '../../entities/ParProductoCantidad.js';

/**
 * 
 * Clase que posee las operaciones con las cuales gestionar 
 * ventas.
 * 
 * @param {Object} conexion Objeto que no tiene uso y que no debe 
 * tomarse en cuenta.
 * @return Una instancia de VentasRepository.
 */
function VentasRepository(conexion){
    
    /* Metodos de clase */
    function internalGetVentasDe(req,res,nombre_proc='OBTENER_PROCESO_2_SP'){
        
        try {
            
			var conn = new ConexionBD();

			var parametros = {
				datos_venta:{ name:'datos_venta', type: Ora.CURSOR, dir: ConexionBD.dbTypes.OUT},
			};

			conn.executeStoredProcedure(nombre_proc,
			parametros,{},
			function(e,results){
				
				if(e){

					res.status(500).json( { oraError : e, objErrorAPI: new ex.DatabaseErrorException()} );
                    console.log(e);

				} else if(results && results.outBinds) {

					//Recuperamos los cursores!
					var cursor_info_venta = results.outBinds.datos_venta;
					var arr_ventas_obtenidas = [];
					
					cursor_info_venta.getRows(65535,function(err,fila_venta){
						
                        if(err){
                            res.status(500).json( { oraError : e, objErrorAPI: new ex.DatabaseErrorException()} );
                            console.log(e);
                        }
						else if(fila_venta && fila_venta[0]){

							
							fila_venta.forEach( function( v, index, arr){ 
								
								
								var ventaObtenida = new ObjetoVentaSimple();
								ventaObtenida.buildFromArray(v);
								arr_ventas_obtenidas.push(ventaObtenida);
								
							});
							
							res.status(200).json({ ventas: arr_ventas_obtenidas });
							
							
						} else {

							if(err){console.log(err);}
							res.status(404).json(new ex.RecordNotFoundException());

						}

						/** Cerramos el cursor cursor_info_venta */
						cursor_info_venta.close(function(err){});
					});

				} else {

					res.status(404).json( new ex.RecordNotFoundException() );

				}

			});

			
			

        } catch(e) {

            res.status(500).json( e );
            console.error(e);

        }
    }

    function internalGetVentaSimple(req,res){
        
        try {

            var venta_id = Number(req.params.ventaid);

            if(req.params.ventaid && !isNaN(venta_id)){ 

                var conn = new ConexionBD();

                //'tobj_descripcion_producto_venta'
                var parametros = {
                    p_id_venta:{ name:'p_id_venta', type: ConexionBD.dbTypes.INT, val: venta_id, dir: ConexionBD.dbTypes.IN },
					datos_venta:{ name:'datos_venta', type: Ora.CURSOR, dir: ConexionBD.dbTypes.OUT},
                };

                conn.executeStoredProcedure('OBTENER_PROCESO_2_SP',
                parametros,{},
                function(e,results){
                    
                    if(e){

                        res.status(500).json( { oraError : e, objErrorAPI: new ex.DatabaseErrorException()} );
                        console.error(`Un error!: ${e.message}`);

                    } else if(results && results.outBinds) {

                        //Recuperamos los cursores!
                        var cursor_info_venta = results.outBinds.datos_venta;
						var ventaObtenida = new ObjetoVentaSimple();
                        
                        //Este cursor SIEMPRE tendrá una fila!
                        cursor_info_venta.getRows(1,function(err,fila_venta){
                            
							if(err){
								
								res.status(500).json( { oraError : e, objErrorAPI: new ex.DatabaseErrorException()} );
								
							} else if(fila_venta && fila_venta[0]){
  
								ventaObtenida.buildFromArray(fila_venta[0]);
									
                                res.status(200).json({ 
                                    venta: ventaObtenida
                                });								
								
                            } else {

                                if(err){console.log(err);}
                                res.status(404).json(new ex.RecordNotFoundException());

                            }

                            /** Cerramos el cursor cursor_info_venta */
                            cursor_info_venta.close(function(err){});
                        });

                    } else {

                        res.status(404).json( new ex.RecordNotFoundException() );

                    }

                });


            } else {

                res.status(400).json( new ex.InvalidArgumentException() );

            }

        } catch(e) {

            res.status(500).json( e );

        }


    }

    function internalGetVentaDetallada(req,res){

        try {

            var venta_id = Number(req.params.ventaid);

            if(req.params.ventaid && !isNaN(venta_id)){ 

                var conn = new ConexionBD();

                //'tobj_descripcion_producto_venta'
                var parametros = {
                    p_id_venta:{ name:'p_id_venta', type: ConexionBD.dbTypes.INT, val: venta_id, dir: ConexionBD.dbTypes.IN },
					datos_venta:{ name:'datos_venta', type: Ora.CURSOR, dir: ConexionBD.dbTypes.OUT},
					datos_productos_venta:{ name:'datos_productos_venta', type: Ora.CURSOR, dir: ConexionBD.dbTypes.OUT},
                };

                conn.executeStoredProcedure('OBTENER_DETALLE_PROCESO_2_PRODUCTOR_SP',
                parametros,{},
                function(e,results){
                    
                    if(e){

                        res.status(500).json( { oraError : e, objErrorAPI: new ex.DatabaseErrorException()} );
                        console.error(`Un error!: ${e.message}`);

                    } else if(results && results.outBinds) {

                        //Recuperamos los cursores!
                        var cursor_info_venta = results.outBinds.datos_venta;
						var cursor_productos = results.outBinds.datos_productos_venta;
						var ventaObtenida = new ObjetoVentaSimple();
						var lista_productos = [];
                        
                        //Este cursor SIEMPRE tendrá una fila!
                        cursor_info_venta.getRows(1,function(err,fila_venta){
                            
							if(err){
								
								res.status(500).json( { oraError : e, objErrorAPI: new ex.DatabaseErrorException()} );
								
							} else if(fila_venta && fila_venta[0]){
  
								ventaObtenida.buildFromArray(fila_venta[0]);
								
								cursor_productos.getRows(65535,function(err,filas_productos){
									
									if(err){
										
										res.status(500).json( { oraError : e, objErrorAPI: new ex.DatabaseErrorException()} );
										
									} else if (filas_productos){
										
										filas_productos.forEach( function(p, index, arr){									
										
											var productoNuevo = new Producto();
											productoNuevo.buildFromArray(p);
											lista_productos.push(productoNuevo);
										
										});
										
									}
									
									res.status(200).json({ 
										venta: ventaObtenida,
										productos: lista_productos
									});
									
									/** Cerramos el cursor cursor_info_venta */
									cursor_productos.close(function(err){});
								});
								
								
                            } else {

                                if(err){console.log(err);}
                                res.status(404).json(new ex.RecordNotFoundException());

                            }

                            /** Cerramos el cursor cursor_info_venta */
                            cursor_info_venta.close(function(err){});
                        });

                    } else {

                        res.status(404).json( new ex.RecordNotFoundException() );

                    }

                });


            } else {

                res.status(400).json( new ex.InvalidArgumentException() );

            }

        } catch(e) {

            res.status(500).json( e );

        }


    }

    /**
     * 
     * Función que permite crear una nueva Venta a la base de datos, iniciando 
     * el proceso de venta. Los datos de venta a crear deben estar en el 
     * cuerpo de la petición. Ahora mismo no hace nada. 
     * 
     * TODO: Crear la lógica para crear el objeto Venta para insertarla en 
     * la base de datos. 
     * 
     * @param {Request} req Objeto entregado por express para obtener datos 
     * de la petición.
     * @param {Response} res Objeto entregado por express para responder la 
     * petición.
     */
    function nuevaVenta(req,res){
        
        try {

            throw new ex.MethodGoneException();

        } catch(e) {

            res.status(401).json( e );

        }

    }

    /**
     * 
     * Función que permite obtener una venta por su ID. La información de 
     * venta es detallada, permitiendo obtener muchos más datos asociados, 
     * como el detalle de productos que son solicitados en la venta.
     * 
     * @param {Request} req Objeto entregado por express para obtener datos 
     * de la petición.
     * @param {Response} res Objeto entregado por express para responder la 
     * petición.
     */
    function getVenta(req,res){
       
        if(req.query.formato === 'detallado'){
            
            internalGetVentaDetallada(req,res);

        } else if(req.query.formato === 'simple' ) {
            
            internalGetVentaSimple(req,res);

        } else {

            res.status(401).json( new ex.InvalidArgumentException() );

        }

    }

    function getHistorialVentas(req,res){
        
        console.log('Paso por aqui??');
        internalGetVentasDe(req,res,'OBTENER_HISTORIAL_PROCESOS_2_SP');
    }

    /**
     * 
     * Función que busca las ventas asociadas al ID del usuario indicado en 
     * la ruta de la petición, y devuelve una lista de registros de venta 
     * encontrados, en formato JSON.
     * 
     * @param {Request} req Objeto entregado por express para obtener datos 
     * de la petición.
     * @param {Response} res Objeto entregado por express para responder la 
     * petición.
     */
    function getVentasPorUsuario(req,res){
        
        try {

            var usu_id = Number(req.params.usuarioid);

            if(req.params.usuarioid && !isNaN(usu_id)){

                var conn = new ConexionBD();

                var parametros = {
                    usuarioid:{ name:'usuarioid', type: ConexionBD.dbTypes.INT, val: usu_id, dir: ConexionBD.dbTypes.IN }
                };

                conn.executeQuery('',parametros,{},
                function(e,results){
                    
                    if(e){

                        res.status(500).json( new ex.DatabaseErrorException() );
                        console.error(`Un error!: ${e.message}`);

                    } else if(results && results.rows[0]) {

                        res.status(200).json( { ventas : results.rows } );

                    } else {

                        res.status(404).json( new ex.RecordNotFoundException());

                    }

                });


            } else {

                res.status(400).json( new ex.InvalidArgumentException() );

            }

        } catch(e) {

            res.status(500).json( e );

        }
    }


    /**
     * 
     * Función que retorna una lista de todas las ventas creadas hasta el 
     * momento en la base de datos. El resultado de venta es simple y no 
     * contiene los detalles de la venta como lo hace la función getVenta. 
     * 
     * 
     * 
     * @param {Request} req Objeto entregado por express para obtener datos 
     * de la petición.
     * @param {Response} res Objeto entregado por express para responder la 
     * petición.
     */
    function getVentas(req,res){

        var procedimientoALlamar;

        if(req.query.tipo === 'transportistas'){
            procedimientoALlamar = 'OBTENER_PROCESO_2_TRANSPORTISTA_SP';
            console.log('es transportista');
        }
        else if(req.query.tipo === 'productores'){
            procedimientoALlamar = 'OBTENER_PROCESO_2_PRODUCTOR_SP';
            console.log('es productor');
        }

        internalGetVentasDe(req,res,procedimientoALlamar);

    }

    /**
     * 
     * Función que actualiza el registro de venta, obteniendo los datos a 
     * modificar en el cuerpo de la petición. Ahora mismo no hace nada.
     * 
     * TODO: Agregar la lógica para modficar el registro de venta.
     * 
     * @param {Request} req Objeto entregado por express para obtener datos 
     * de la petición.
     * @param {Response} res Objeto entregado por express para responder la 
     * petición.
     */
    function updateVenta(req,res){

        try {

            res.status(501).json( new ex.MethodNotImplementedException() );

        } catch(e) {

            res.status(401).json( e );

        }

    }

    /* Campos de clase */
    return {
        nuevaVenta,
        getVenta,
        getVentas,
        updateVenta,
        getVentasPorUsuario,
        getHistorialVentas
    };
}

export default VentasRepository;