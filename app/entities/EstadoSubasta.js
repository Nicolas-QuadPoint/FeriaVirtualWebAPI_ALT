import Entity from './Entity.js';

class EstadoSubasta extends Entity{

    id_estado_subasta = 0;
    descripcion = 'estado_subasta';

    constructor(){
        super();
    }

    clone(obj={},safe=false){
        
        if(safe){

            this.id_estado_subasta = util.isNullOrUndefined(obj.id_estado_subasta)? 0 : obj.id_estado_subasta;
            this.descripcion = util.isNullOrUndefined(obj.descripcion)? ' ' : obj.descripcion;

        } else {

            this.id_estado_subasta = obj.id_estado_subasta;
            this.descripcion = obj.descripcion;

        }

    }

    validate(){
        return true;
    }

}

export default EstadoSubasta;