import Entity from './Entity.js';

class EstadoContrato extends Entity{

    id_estado_contrato = 0;
    descripcion = 'estado_contrato';

    constructor(){
        super();
    }

    clone(obj={},safe=false){
        
        if(safe){

            this.id_estado_contrato = util.isNullOrUndefined(obj.id_estado_contrato)? 0 : obj.id_estado_contrato;
            this.descripcion = util.isNullOrUndefined(obj.descripcion)? ' ' : obj.descripcion;

        } else {

            this.id_estado_contrato = obj.id_estado_contrato;
            this.descripcion = obj.descripcion;

        }

    }

    validate(){
        return true;
    }

}

export default EstadoContrato;