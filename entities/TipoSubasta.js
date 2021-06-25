import Entity from './Entity.js';

class TipoSubasta extends Entity{

    id_tipo_subasta = 0;
    descripcion = 'tipo_subasta';

    constructor(){
        super();
    }

    clone(obj={},safe=false){
        
        if(safe){

            this.id_tipo_subasta = util.isNullOrUndefined(obj.id_tipo_subasta)? 0 : obj.id_tipo_subasta;
            this.descripcion = util.isNullOrUndefined(obj.descripcion)? ' ' : obj.descripcion;

        } else {

            this.id_tipo_subasta = obj.id_tipo_subasta;
            this.descripcion = obj.descripcion;

        }

    }

}

export default TipoSubasta;