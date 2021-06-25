import Entity from './Entity.js';

class TipoVenta extends Entity{

    id_tipo_venta = 0;
    descripcion = 'tipo_venta';

    constructor(p_id_tipo_venta=0,p_descripcion='tipo_venta'){
        super();
        this.id_tipo_venta = p_id_tipo_venta;
        this.descripcion = p_descripcion;
    }

    clone(obj={},safe=false){
        
        if(safe){

            this.id_tipo_venta = util.isNullOrUndefined(obj.id_tipo_venta)? 0 : obj.id_tipo_venta;
            this.descripcion = util.isNullOrUndefined(obj.descripcion)? ' ' : obj.descripcion;

        } else {

            this.id_tipo_venta = obj.id_tipo_venta;
            this.descripcion = obj.descripcion;

        }

    }

}

export default TipoVenta;