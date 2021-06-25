import Entity from './Entity.js';

class ModoPago extends Entity{

    id_modo_pago = 0;
    descripcion = 'modo_pago';

    constructor(){
        super();
    }

    clone(obj={},safe=false){
        
        if(safe){

            this.id_modo_pago = util.isNullOrUndefined(obj.id_modo_pago)? 0 : obj.id_tipo_venta;
            this.descripcion = util.isNullOrUndefined(obj.descripcion)? ' ' : obj.descripcion;

        } else {

            this.id_modo_pago = obj.id_modo_pago;
            this.descripcion = obj.descripcion;

        }

    }

}

export default ModoPago;