import Entity from './Entity.js';

class EstadoVenta extends Entity{

    id_estado_venta = 0;
    descripcion = 'estado_venta';

    constructor(){
        super();
    }

    clone(obj={},safe=false){
        
        if(safe){

            this.id_estado_venta = util.isNullOrUndefined(obj.id_estado_venta)? 0 : obj.id_estado_venta;
            this.descripcion = util.isNullOrUndefined(obj.descripcion)? ' ' : obj.descripcion;

        } else {

            this.id_estado_venta = obj.id_estado_venta;
            this.descripcion = obj.descripcion;

        }

    }
}

export default EstadoVenta;