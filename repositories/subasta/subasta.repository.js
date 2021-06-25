import ConexionBD from '../../db/oracledbconnector.js';
import utility from '../../utilities/utilities.js';
import genericResponse from '../../shared/response.js';
import ex from '../../info/exceptions/exceptions.js';
import ObjetoVentaSimple from '../../entities/ObjetoVentaSimple.js';
import Venta from '../../entities/Venta.js';
import Ora from 'oracledb';
import ParProductoCantidad from '../../entities/ParProductoCantidad.js';
import { json } from 'express';
import Subasta from '../../entities/Subasta.js';

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

    function interceptarSubasta(req,res,next){
        try {
            
            var idSubasta = Number(req.params.idsubasta);

            if(idSubasta && !isNaN(idSubasta)){ 
                
                var conn = new ConexionBD();
                var parametros = {
                   id_subasta: { name: "id_subasta", val: idSubasta, type: ConexionBD.dbTypes.INT  }
                };
                conn.executeQuery('select * from table(pkg_subasta.func_get_subasta(:id_subasta))',
                parametros,{},function(e,results){
                    
                    if(e){
                        
                        console.error(e);
                        res.status(500).json(new ex.RecordNotFoundException());

                    } else if (results && results.rows){

                        var subastaEncontrada = new Subasta();
                        
                        /**
                         * No voy a comprobar errores ahora, puesto que ya no queda 
                         * tiempo. 
                         * TODO: Mejorar esto si hay oportunidad! 
                         */
                        subastaEncontrada.buildFromArray(results.rows[0]);
                        
                        req.data = {subasta : subastaEncontrada};
                        next();
                        
                    } else {

                        res.status(404).json(new ex.RecordNotFoundException());

                    }


                });


            
            } else {
                res.status(404).json(new ex.RecordNotFoundException());
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


        }catch(e){
            res.status(404).json(e);
        }
    }
    
    function removerPujaSubastaProductor(req,res){
        try{


        }catch(e){
            res.status(404).json(e);
        }
    }
    
    function pujarSubastaTransportista(req,res){
        try{


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

export default VentasRepository;