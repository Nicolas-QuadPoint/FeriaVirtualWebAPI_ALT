import ConexionBD from '../../db/oracledbconnector.js';
import utility from '../../utilities/utilities.js';
import genericResponse from '../../shared/response.js';
import ex from '../../info/exceptions/exceptions.js';
import ObjetoVentaSimple from '../../entities/ObjetoVentaSimple.js';
import OfertaSubastaProductor from '../../entities/OfertaSubastaProductor.js';
import OfertaSubastaTransportista from '../../entities/OfertaSubastaTransportista.js';
import Venta from '../../entities/Venta.js';
import Ora from 'oracledb';
import ParProductoCantidad from '../../entities/ParProductoCantidad.js';
import { json } from 'express';
import Subasta from '../../entities/Subasta.js';
import Producto from '../../entities/Producto.js';

/**
 * 
 * Clase que posee las operaciones con las cuales gestionar 
 * ventas.
 * 
 * @param {Object} conexion Objeto que no tiene uso y que no debe 
 * tomarse en cuenta.
 * @return Una instancia de VentasRepository.
 */
 function SubastasRepository(conexion){

    function interceptarSubasta(req,res,next){
        try {
			
            var idSubasta = Number(req.params.idsubasta);

            if(idSubasta && !isNaN(idSubasta)){ 
                
                var conn = new ConexionBD();
                var parametros = {
                   id_subasta: { name: "id_subasta", val: idSubasta, type: ConexionBD.dbTypes.INT  },
                   datos_subasta: { name: "datos_subasta", type: Ora.CURSOR, dir: ConexionBD.dbTypes.OUT  }
                };
                conn.executeStoredProcedure('OBTENER_PROCESO_2_SP',
                parametros,{},function(e,results){
                    
                    if(e){

                        res.status(500).json( { oraError : e, objErrorAPI: new ex.DatabaseErrorException()} );
                        console.error(`Un error!: ${e.message}`);

                    } else if ( results && results.outBinds ){
                        
                        var cursor_datos_subasta = results.outBinds.datos_subasta;
                        var subastaEncontrada = new ObjetoVentaSimple();
                        
                        /** Esta consulta SIEMPRE retorna una fila */
                        cursor_datos_subasta.getRows(1,function(error,filas_subasta){

                            if(error){
                                res.status(500).json( { oraError : e, objErrorAPI: new ex.DatabaseErrorException()} );
                                console.error(`Un error!: ${e.message}`);   
                            } else {

                                filas_subasta.forEach(function(sub,index,arr){
                                    
                                    subastaEncontrada.buildFromArray(sub);
                                    return;

                                });

                                req.data = {subasta : subastaEncontrada};
                                next();

                            }

                            cursor_datos_subasta.close(function(err){});

                        });

                        
                    } else {
                        
                        res.status(404).json(new ex.RecordNotFoundException());

                    }
                    
               
                });


            
            } else {
                res.status(404).json(new ex.InvalidArgumentException());
            }

        }catch(e){
            res.status(404).json(e);
        }
    }

    function getInfoSubasta(req,res){

        if(req.data && req.data.subasta){

            res.status(200).json(req.data);

        } else {

            res.status(404).json(new ex.RecordNotFoundException());

        }

    }
    
    function getPujasSubastaProductor(req,res){
        try{
            
            var idSubasta = Number(req.params.idsubasta);

            if(idSubasta && !isNaN(idSubasta)){ 
                
                var conn = new ConexionBD();
                var parametros = {
                   id_subasta: { name: "id_subasta", val: idSubasta, type: ConexionBD.dbTypes.INT  },
                   productos_subasta: { name: "productos_subasta", type: Ora.CURSOR, dir: ConexionBD.dbTypes.OUT  }
                };
                conn.executeStoredProcedure('OBTIENE_PRODUCTOS_PROCESO',
                parametros,{},function(e,results){
                    
                    if(e){

                        res.status(500).json( { oraError : e, objErrorAPI: new ex.DatabaseErrorException()} );
                        console.error(`Un error!: ${e.message}`);

                    } else if ( results && results.outBinds ){
                        
                        var cursor_productos_subasta = results.outBinds.productos_subasta;
                        var productosEncontrados = [];
                        
                        cursor_productos_subasta.getRows(65535,function(error,filas_productos){

                            if(error){
                                
                                res.status(500).json( { oraError : e, objErrorAPI: new ex.DatabaseErrorException()} );
                                console.error(`Un error!: ${e.message}`);

                            } else {

                                filas_productos.forEach(function(sub,index,arr){
                                    
                                    var p = new Producto();
                                    p.buildFromArray(sub);
                                    productosEncontrados.push(p);

                                });

                                res.status(200).json( { productos : productosEncontrados} );

                            }

                            cursor_productos_subasta.close(function(err){});

                        });

                        
                    } else {
                        
                        res.status(404).json(new ex.RecordNotFoundException());

                    }
                    
               
                });


            
            } else {
                res.status(404).json(new ex.InvalidArgumentException());
            }


        }catch(e){
            res.status(404).json(e);
        }
    }
    
    function getPujasSubastaTransportista(req,res){
        try{


        }catch(e){
            res.status(404).json(e);
        }
    }
    
    function getDetallePujaSubastaProductor(req,res){
        try{


        }catch(e){
            res.status(404).json(e);
        }
    }
    
    function getDetallePujaSubastaTransportista(req,res){
        try{
            
            

        }catch(e){
            res.status(404).json(e);
        }
    }
    
    function pujarSubastaProductor(req,res){
        
		try{
			
			var venta_id = Number(req.params.ventaid);
			var pujaProductor = new OfertaSubastaProductor();
            
            console.log('Vamos a pujar!');

            pujaProductor.clone(req.body);

            if(req.params.ventaid && !isNaN(venta_id) && pujaProductor.validate()){ 

                var conn = new ConexionBD();

                var parametros = {
                    p_id_proceso:{ name:'p_id_proceso', type: ConexionBD.dbTypes.INT, val: venta_id, dir: ConexionBD.dbTypes.IN },
					p_cantidad:{ name:'p_cantidad', type: ConexionBD.dbTypes.INT, val: pujaProductor.cantidad, dir: ConexionBD.dbTypes.IN },
                    p_tipo_venta:{ name:'p_tipo_venta', type: ConexionBD.dbTypes.INT, val: pujaProductor.tipoVenta.id_tipo_venta, dir: ConexionBD.dbTypes.IN },
                    p_id_producto:{ name:'p_id_producto', type: ConexionBD.dbTypes.INT, val: pujaProductor.producto.id_producto, dir: ConexionBD.dbTypes.IN }
                };

                conn.executeStoredProcedure('AGREGAR_DETALLE_PROCESO',
                parametros,{},
                function(e,results){
                    
                    if(e){

                        res.status(500).json( { oraError : e, objErrorAPI: new ex.DatabaseErrorException()} );
                        console.error(`Un error!: ${e.message}`);

					} else {
						
						res.status(200).json( { resultado: 1 } );
						
					}
					
				});
            
				
			} else {
				
				res.status(401).json( new ex.InvalidArgumentException() );
			}
					

        }catch(e){
            res.status(404).json(e);
        }

    }

    function removerPujaSubastaProductor(req,res){
        
        try{
            
            var idSubasta = Number(req.params.idsubasta);
            var idProducto = Number(req.body.idProducto);

            if(idSubasta && !isNaN(idSubasta) && idProducto && !isNaN(idProducto)){ 
                
                var conn = new ConexionBD();
                var parametros = {
                   id_subasta: { name: "id_subasta", val: idSubasta, type: ConexionBD.dbTypes.INT  },
                   id_producto: { name: "id_subasta", val: idProducto, type: ConexionBD.dbTypes.INT  },
                   productos_subasta: { name: "productos_subasta", type: Ora.CURSOR, dir: ConexionBD.dbTypes.OUT  }
                };
                
                conn.executeStoredProcedure('ELIMINAR_DETALLE_PROCESO_2_PRODUCTOR_SP',
                parametros,{},function(e,results){
                    
                    if(e){

                        res.status(500).json( { oraError : e, objErrorAPI: new ex.DatabaseErrorException()} );
                        console.error(`Un error!: ${e.message}`);

                    } else if ( results && results.outBinds ){
                        
                        var cursor_productos_subasta = results.outBinds.productos_subasta;
                        var productosEncontrados = [];
                        
                        cursor_productos_subasta.getRows(65535,function(error,filas_productos){

                            if(error){
                                
                                res.status(500).json( { oraError : e, objErrorAPI: new ex.DatabaseErrorException()} );
                                console.error(`Un error!: ${e.message}`);

                            } else {

                                filas_productos.forEach(function(sub,index,arr){
                                    
                                    var p = new Producto();
                                    p.buildFromArray(sub);
                                    productosEncontrados.push(p);

                                });

                                res.status(200).json( { productos : productosEncontrados} );

                            }

                            cursor_productos_subasta.close(function(err){});

                        });

                        
                    } else {
                        
                        res.status(404).json(new ex.RecordNotFoundException());

                    }
                    
               
                });


            
            } else {
                res.status(404).json(new ex.InvalidArgumentException());
            }


        }catch(e){
            res.status(404).json(e);
        }

    }
    
    function pujarSubastaTransportista(req,res){
        
        try{
			
			var venta_id = Number(req.params.ventaid);
			var pujaProductor = new OfertaSubastaTransportista();

            if(req.params.ventaid && !isNaN(venta_id)){ 

                var conn = new ConexionBD();

                //'tobj_descripcion_producto_venta'
                var parametros = {
                    p_id_venta:{ name:'p_id_venta', type: ConexionBD.dbTypes.INT, val: venta_id, dir: ConexionBD.dbTypes.IN },
					datos_venta:{ name:'datos_venta', type: Ora.CURSOR, dir: ConexionBD.dbTypes.OUT},
					datos_productos_venta:{ name:'datos_productos_venta', type: Ora.CURSOR, dir: ConexionBD.dbTypes.OUT}
                };

                conn.executeStoredProcedure('OBTENER_DETALLE_PROCESO_2_PRODUCTOR_SP',
                parametros,{},
                function(e,results){
                    
                    if(e){

                        res.status(500).json( { oraError : e, objErrorAPI: new ex.DatabaseErrorException()} );
                        console.error(`Un error!: ${e.message}`);

					} else {
						
						res.status(200).json( { resultado: 1 } );
						
					}
					
				});
            
				
			} else {
				
				res.status(401).json( new ex.InvalidArgumentException() );
			}
					

        }catch(e){
            res.status(404).json(e);
        }

    }
    
    function removerPujaSubastaTransportista(req,res){
        try{


        }catch(e){
            res.status(404).json(e);
        }
    }



 
    /* Campos de clase */
    return {
        interceptarSubasta,
        getInfoSubasta,
        getPujasSubastaProductor,
        getPujasSubastaTransportista,
        getDetallePujaSubastaProductor,
        getDetallePujaSubastaTransportista,
        pujarSubastaProductor,
        removerPujaSubastaProductor,
        pujarSubastaTransportista,
        removerPujaSubastaTransportista
    };
}

export default SubastasRepository;